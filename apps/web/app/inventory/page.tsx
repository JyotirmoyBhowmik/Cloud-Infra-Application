'use client';
import React, { useState } from 'react';
import EnterpriseLayout from '../components/EnterpriseLayout';
import PageHeader from '../components/PageHeader';
import MetricCard, { MetricCardsGrid } from '../components/MetricCard';
import DataTable, { Column } from '../components/DataTable';
import FilterPanel, { FilterOption } from '../components/FilterPanel';
import StatusBadge from '../components/StatusBadge';
import { Cloud, Storage, CloudQueue, Security } from '@mui/icons-material';
import { Chip } from '@mui/material';

// Define Interface matching the API response
interface InventoryEntity {
    id: string;
    provider: string;
    native_id: string;
    type: string;
    state: string;
    region: string;
    cost_monthly: number;
    tags: Record<string, string>;
}

// Generate comprehensive mock data
const generateInventoryData = (): InventoryEntity[] => {
    const providers = ['aws', 'azure', 'gcp'];
    const types = [
        'ec2_instance', 'rds_database', 's3_bucket', 'lambda_function',
        'azure_vm', 'azure_sql', 'blob_storage', 'azure_function',
        'gce_instance', 'cloud_sql', 'cloud_storage', 'cloud_function'
    ];
    const states = ['running', 'stopped', 'terminated', 'pending'];
    const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-south-1'];
    const envs = ['Production', 'Development', 'Staging', 'Testing'];

    const data: InventoryEntity[] = [];
    for (let i = 1; i <= 50; i++) {
        const provider = providers[Math.floor(Math.random() * providers.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const region = regions[Math.floor(Math.random() * regions.length)];
        const env = envs[Math.floor(Math.random() * envs.length)];

        data.push({
            id: `res-${i}`,
            provider,
            native_id: `${provider}-${type.split('_')[0]}-${Math.random().toString(36).substring(7)}`,
            type,
            state,
            region,
            cost_monthly: Math.round(Math.random() * 1000),
            tags: { Environment: env, Team: `team-${i % 5}` },
        });
    }
    return data;
};

export default function InventoryPage() {
    const [inventoryData] = useState(generateInventoryData());
    const [filteredData, setFilteredData] = useState(inventoryData);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Inventory' },
    ];

    // Calculate metrics
    const totalResources = filteredData.length;
    const runningResources = filteredData.filter(r => r.state === 'running').length;
    const stoppedResources = filteredData.filter(r => r.state === 'stopped').length;
    const totalMonthlyCost = filteredData.reduce((sum, r) => sum + r.cost_monthly, 0);

    // Filter configuration
    const filterOptions: FilterOption[] = [
        {
            id: 'provider',
            label: 'Cloud Provider',
            type: 'multiselect',
            options: [
                { label: 'AWS', value: 'aws' },
                { label: 'Azure', value: 'azure' },
                { label: 'GCP', value: 'gcp' },
            ],
        },
        {
            id: 'state',
            label: 'Resource State',
            type: 'multiselect',
            options: [
                { label: 'Running', value: 'running' },
                { label: 'Stopped', value: 'stopped' },
                { label: 'Terminated', value: 'terminated' },
                { label: 'Pending', value: 'pending' },
            ],
        },
        {
            id: 'region',
            label: 'Region',
            type: 'multiselect',
            options: [
                { label: 'US East 1', value: 'us-east-1' },
                { label: 'US West 2', value: 'us-west-2' },
                { label: 'EU West 1', value: 'eu-west-1' },
                { label: 'AP South 1', value: 'ap-south-1' },
            ],
        },
    ];

    const handleApplyFilters = (filters: Record<string, any>) => {
        let filtered = inventoryData;

        if (filters.provider && filters.provider.length > 0) {
            filtered = filtered.filter(r => filters.provider.includes(r.provider));
        }
        if (filters.state && filters.state.length > 0) {
            filtered = filtered.filter(r => filters.state.includes(r.state));
        }
        if (filters.region && filters.region.length > 0) {
            filtered = filtered.filter(r => filters.region.includes(r.region));
        }

        setFilteredData(filtered);
    };

    const handleResetFilters = () => {
        setFilteredData(inventoryData);
    };

    // Table columns configuration
    const columns: Column<InventoryEntity>[] = [
        {
            id: 'provider',
            label: 'Provider',
            minWidth: 100,
            format: (value: string) => {
                const colors: Record<string, string> = {
                    aws: '#FF9900',
                    azure: '#0078D4',
                    gcp: '#4285F4',
                };
                return (
                    <Chip
                        label={value.toUpperCase()}
                        size="small"
                        style={{
                            backgroundColor: colors[value] + '20',
                            color: colors[value],
                            fontWeight: 600,
                        }}
                    />
                );
            },
        },
        {
            id: 'type',
            label: 'Resource Type',
            minWidth: 150,
            format: (value: string) => (
                <span className="text-sm font-medium text-gray-700">
                    {value.replace(/_/g, ' ').toUpperCase()}
                </span>
            ),
        },
        {
            id: 'native_id',
            label: 'Resource ID',
            minWidth: 180,
            format: (value: string) => (
                <span className="text-xs font-mono text-gray-600">{value}</span>
            ),
        },
        {
            id: 'state',
            label: 'State',
            minWidth: 100,
            format: (value: string) => {
                const statusMap: Record<string, 'active' | 'warning' | 'error' | 'inactive'> = {
                    running: 'active',
                    stopped: 'inactive',
                    terminated: 'error',
                    pending: 'warning',
                };
                return <StatusBadge status={statusMap[value] || 'inactive'} label={value} />;
            },
        },
        {
            id: 'region',
            label: 'Region',
            minWidth: 120,
        },
        {
            id: 'cost_monthly',
            label: 'Monthly Cost',
            minWidth: 120,
            align: 'right',
            format: (value: number) => `$${value.toLocaleString()}`,
        },
        {
            id: 'tags',
            label: 'Tags',
            minWidth: 200,
            sortable: false,
            format: (value: Record<string, string>) => (
                <div className="flex flex-wrap gap-1">
                    {Object.entries(value || {}).slice(0, 2).map(([k, v]) => (
                        <Chip
                            key={k}
                            label={`${k}: ${v}`}
                            size="small"
                            variant="outlined"
                            className="text-xs"
                        />
                    ))}
                </div>
            ),
        },
    ];

    return (
        <EnterpriseLayout>
            <PageHeader
                title="Cloud Resource Inventory"
                subtitle="Unified view of all resources across AWS, Azure, and GCP"
                breadcrumbs={breadcrumbs}
                actions={
                    <div className="flex space-x-2">
                        <FilterPanel
                            filters={filterOptions}
                            onApply={handleApplyFilters}
                            onReset={handleResetFilters}
                        />
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                            Add Resource
                        </button>
                    </div>
                }
            />

            {/* Key Metrics */}
            <MetricCardsGrid>
                <MetricCard
                    icon={<Cloud className="w-6 h-6" />}
                    label="Total Resources"
                    value={totalResources.toLocaleString()}
                    comparison={{ label: 'Across all clouds', value: '50 total' }}
                />
                <MetricCard
                    icon={<CloudQueue className="w-6 h-6" />}
                    label="Active Resources"
                    value={runningResources.toLocaleString()}
                    trend={{
                        value: 5,
                        isPositive: true,
                        label: 'vs last week',
                    }}
                />
                <MetricCard
                    icon={<Storage className="w-6 h-6" />}
                    label="Stopped Resources"
                    value={stoppedResources.toLocaleString()}
                    trend={{
                        value: 12,
                        isPositive: false,
                        label: 'potential savings',
                    }}
                />
                <MetricCard
                    icon={<Security className="w-6 h-6" />}
                    label="Total Monthly Cost"
                    value={`$${totalMonthlyCost.toLocaleString()}`}
                    comparison={{ label: 'Allocated resources', value: totalResources }}
                />
            </MetricCardsGrid>

            {/* Resource Table */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Resource Directory
                </h2>
                <DataTable
                    columns={columns}
                    data={filteredData}
                    defaultRowsPerPage={10}
                    onRowClick={(row) => console.log('Clicked row:', row)}
                />
            </div>
        </EnterpriseLayout>
    );
}

