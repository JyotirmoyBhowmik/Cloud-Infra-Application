import { Controller, Get, Post, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CloudServicesService } from '../services/cloud-services.service';

@Controller('cloud-services')
export class CloudServicesController {
    constructor(private readonly cloudServicesService: CloudServicesService) { }

    /**
     * GET /cloud-services
     * List all cloud services with optional filters
     * Query params: category, provider, serviceType
     */
    @Get()
    async findAll(
        @Query('category') category?: string,
        @Query('provider') provider?: string,
        @Query('serviceType') serviceType?: string,
    ) {
        try {
            return await this.cloudServicesService.findAll({
                category,
                provider,
                serviceType
            });
        } catch (error) {
            throw new HttpException(
                'Failed to fetch cloud services',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * GET /cloud-services/categories
     * Get all unique service categories
     */
    @Get('categories')
    async getCategories() {
        try {
            return await this.cloudServicesService.getCategories();
        } catch (error) {
            throw new HttpException(
                'Failed to fetch categories',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * GET /cloud-services/category/:category
     * Get all services in a specific category
     */
    @Get('category/:category')
    async getByCategory(@Param('category') category: string) {
        try {
            const services = await this.cloudServicesService.findByCategory(category);

            if (!services || services.length === 0) {
                throw new HttpException(
                    `No services found for category: ${category}`,
                    HttpStatus.NOT_FOUND
                );
            }

            return services;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new HttpException(
                'Failed to fetch services by category',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * GET /cloud-services/equivalent
     * Find equivalent services across providers
     * Query params: provider (aws|azure|gcp), service (service name)
     */
    @Get('equivalent')
    async findEquivalent(
        @Query('provider') provider: string,
        @Query('service') service: string,
    ) {
        if (!provider || !service) {
            throw new HttpException(
                'Both provider and service query parameters are required',
                HttpStatus.BAD_REQUEST
            );
        }

        const validProviders = ['aws', 'azure', 'gcp'];
        if (!validProviders.includes(provider.toLowerCase())) {
            throw new HttpException(
                `Invalid provider. Must be one of: ${validProviders.join(', ')}`,
                HttpStatus.BAD_REQUEST
            );
        }

        try {
            const result = await this.cloudServicesService.findEquivalent(provider, service);

            if (!result) {
                throw new HttpException(
                    `No equivalent services found for ${service} in ${provider}`,
                    HttpStatus.NOT_FOUND
                );
            }

            return {
                query: { provider, service },
                result: {
                    category: result.category,
                    subcategory: result.subcategory,
                    aws: result.aws_service,
                    azure: result.azure_service,
                    gcp: result.gcp_service,
                    description: result.description
                }
            };
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new HttpException(
                'Failed to find equivalent services',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * GET /cloud-services/search
     * Search services by keyword
     * Query param: q (search query)
     */
    @Get('search')
    async search(@Query('q') query: string) {
        if (!query || query.trim().length === 0) {
            throw new HttpException(
                'Search query (q) is required',
                HttpStatus.BAD_REQUEST
            );
        }

        try {
            return await this.cloudServicesService.search(query);
        } catch (error) {
            throw new HttpException(
                'Failed to search services',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * GET /cloud-services/matrix
     * Get service matrix grouped by category
     * Query param: category (optional)
     */
    @Get('matrix')
    async getMatrix(@Query('category') category?: string) {
        try {
            return await this.cloudServicesService.getServiceMatrix(category);
        } catch (error) {
            throw new HttpException(
                'Failed to generate service matrix',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * GET /cloud-services/stats
     * Get statistics about the service catalog
     */
    @Get('stats')
    async getStats() {
        try {
            return await this.cloudServicesService.getStats();
        } catch (error) {
            throw new HttpException(
                'Failed to fetch statistics',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * POST /cloud-services/seed
     * Seed the database with cloud services data (admin only)
     */
    @Post('seed')
    async seedDatabase() {
        try {
            const result = await this.cloudServicesService.seedDatabase();
            return {
                success: true,
                ...result
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to seed database',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * GET /cloud-services/:id
     * Get a specific service by ID
     */
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const service = await this.cloudServicesService.findOne(id);

            if (!service) {
                throw new HttpException(
                    `Service with ID ${id} not found`,
                    HttpStatus.NOT_FOUND
                );
            }

            return service;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new HttpException(
                'Failed to fetch service',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
