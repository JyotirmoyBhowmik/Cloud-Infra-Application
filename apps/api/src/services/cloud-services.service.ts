import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CloudServiceEntity } from '../entities/cloud-service.entity';
import { CLOUD_SERVICES_DATA, CloudServiceMapping } from '../data/cloud-services.data';

@Injectable()
export class CloudServicesService {
    constructor(
        @InjectRepository(CloudServiceEntity)
        private cloudServiceRepository: Repository<CloudServiceEntity>,
    ) { }

    /**
     * Get all cloud services with optional filtering
     */
    async findAll(filters?: {
        category?: string;
        provider?: string;
        serviceType?: string;
    }): Promise<CloudServiceEntity[]> {
        const where: any = {};

        if (filters?.category) {
            where.category = filters.category;
        }

        if (filters?.serviceType) {
            where.service_type = filters.serviceType;
        }

        return this.cloudServiceRepository.find({ where });
    }

    /**
     * Get all unique categories
     */
    async getCategories(): Promise<string[]> {
        const result = await this.cloudServiceRepository
            .createQueryBuilder('service')
            .select('DISTINCT service.category', 'category')
            .getRawMany();

        return result.map(r => r.category);
    }

    /**
     * Get services by category
     */
    async findByCategory(category: string): Promise<CloudServiceEntity[]> {
        return this.cloudServiceRepository.find({
            where: { category },
            order: { subcategory: 'ASC' }
        });
    }

    /**
     * Find equivalent services across providers
     * @param provider - The source provider (aws, azure, gcp)
     * @param serviceName - The service name to find equivalents for
     */
    async findEquivalent(provider: string, serviceName: string): Promise<CloudServiceEntity | null> {
        const providerColumn = `${provider.toLowerCase()}_service`;

        const queryBuilder = this.cloudServiceRepository.createQueryBuilder('service');

        // Search for the service in the appropriate provider column
        const result = await queryBuilder
            .where(`service.${providerColumn} LIKE :serviceName`, {
                serviceName: `%${serviceName}%`
            })
            .getOne();

        return result;
    }

    /**
     * Search services by keyword
     */
    async search(query: string): Promise<CloudServiceEntity[]> {
        return this.cloudServiceRepository
            .createQueryBuilder('service')
            .where('service.aws_service LIKE :query', { query: `%${query}%` })
            .orWhere('service.azure_service LIKE :query', { query: `%${query}%` })
            .orWhere('service.gcp_service LIKE :query', { query: `%${query}%` })
            .orWhere('service.category LIKE :query', { query: `%${query}%` })
            .orWhere('service.subcategory LIKE :query', { query: `%${query}%` })
            .orWhere('service.description LIKE :query', { query: `%${query}%` })
            .getMany();
    }

    /**
     * Get service by ID
     */
    async findOne(id: string): Promise<CloudServiceEntity | null> {
        return this.cloudServiceRepository.findOne({ where: { id } });
    }

    /**
     * Seed the database with cloud services data
     * This should be called once during initial setup
     */
    async seedDatabase(): Promise<{ count: number; message: string }> {
        try {
            // Clear existing data
            await this.cloudServiceRepository.clear();

            // Insert all services from reference data
            const entities = CLOUD_SERVICES_DATA.map(data =>
                this.cloudServiceRepository.create(data)
            );

            await this.cloudServiceRepository.save(entities);

            return {
                count: entities.length,
                message: `Successfully seeded ${entities.length} cloud services`
            };
        } catch (error) {
            throw new Error(`Failed to seed database: ${error.message}`);
        }
    }

    /**
     * Get service mapping in a structured format for a specific category
     */
    async getServiceMatrix(category?: string): Promise<any[]> {
        let services: CloudServiceEntity[];

        if (category) {
            services = await this.findByCategory(category);
        } else {
            services = await this.findAll();
        }

        // Group by category and subcategory
        const grouped = services.reduce((acc, service) => {
            if (!acc[service.category]) {
                acc[service.category] = [];
            }
            acc[service.category].push({
                subcategory: service.subcategory,
                aws: service.aws_service,
                azure: service.azure_service,
                gcp: service.gcp_service,
                description: service.description,
                type: service.service_type
            });
            return acc;
        }, {});

        return Object.entries(grouped).map(([category, items]) => ({
            category,
            services: items
        }));
    }

    /**
     * Get statistics about the service catalog
     */
    async getStats(): Promise<{
        totalServices: number;
        categoriesCount: number;
        servicesPerProvider: {
            aws: number;
            azure: number;
            gcp: number;
        }
    }> {
        const total = await this.cloudServiceRepository.count();
        const categories = await this.getCategories();

        const awsCount = await this.cloudServiceRepository
            .createQueryBuilder('service')
            .where('service.aws_service IS NOT NULL')
            .getCount();

        const azureCount = await this.cloudServiceRepository
            .createQueryBuilder('service')
            .where('service.azure_service IS NOT NULL')
            .getCount();

        const gcpCount = await this.cloudServiceRepository
            .createQueryBuilder('service')
            .where('service.gcp_service IS NOT NULL')
            .getCount();

        return {
            totalServices: total,
            categoriesCount: categories.length,
            servicesPerProvider: {
                aws: awsCount,
                azure: azureCount,
                gcp: gcpCount
            }
        };
    }
}
