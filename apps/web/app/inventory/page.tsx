/**
 * Enhanced Inventory Page with Enterprise Layout
 * Provider-tagged resources with data table
 */

'use client';
import React, { useState } from 'react';
import EnterpriseLayout from '../components/EnterpriseLayout';
import PageHeader from '../components/PageHeader';
import DataTable, { TableColumn, TableAction } from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { Visibility, Edit, Delete, Cloud, Storage, Computer } from '@mui/icons-material';

export default function InventoryPage() {
    const [selectedProvider, setSelectedProvider] = useState<string>('all');

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Inventory & Assets' },
    ];

    // Mock inventory data
    const inventoryData = [
        {
            id: '1',
            name: 'prod-web-server-01',
            type: 'EC2 Instance',
            provider: 'AWS',
            region: 'us-east-1',
            status: 'active',
            cost: '$145.20',
            lastUpdate: '2 mins ago',
            tags: ['production', 'web'],
        },
        {
            id: '2',
            name: 'appvm-prod-001',
            type: 'Virtual Machine',
            provider: 'Azure',
            region: 'eastus',
            status: 'active',
            cost: '$98.50',
            lastUpdate: '5 mins ago',
            tags: ['production', 'app'],
        },
        {
            id: '3',
            name: 'gke-cluster-prod',
            type: 'GKE Cluster',
            provider: 'GCP',
            region: 'us-central1',
            status: 'active',
            cost: '$320.00',
            lastUpdate: '1 hour ago',
            tags: ['production', 'kubernetes'],
        },
        {
            id: '4',
            name: 'rds-mysql-prod',
            type: 'RDS Database',
            provider: 'AWS',
            region: 'us-west-2',
            status: 'warning',
            cost: '$210.00',
            lastUpdate: '10 mins ago',
            tags: ['production', 'database'],
        },
    ];

    const columns: TableColumn[] = [
        {
            key: 'name',
            label: 'Resource Name',
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center space-x-2">
                    <Computer className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{value}</span>
                </div>
            ),
        },
        {
            key: 'type',
            label: 'Type',
            sortable: true,
        },
        {
            key: 'provider',
            label: 'Provider',
            sortable: true,
            render: (value) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {value}
                </span>
            ),
        },
        {
            key: 'region',
            label: 'Region',
            sortable: true,
        },
        {
            key: 'cost',
            label: 'Monthly Cost',
            sortable: true,
            render: (value) => <span className="font-medium">{value}</span>,
        },
        {
            key: 'status',
            label: 'Status',
            render: (value) => <StatusBadge status={value as any} />,
        },
        {
            key: 'lastUpdate',
            label: 'Last Update',
            render: (value) => <span className="text-gray-500">{value}</span>,
        },
    ];

    const actions: TableAction[] = [
        {
            label: 'View Details',
            icon: <Visibility className="w-4 h-4" />,
            onClick: (row) => console.log('View', row),
        },
        {
            label: 'Edit Tags',
            icon: <Edit className="w-4 h-4" />,
            onClick: (row) => console.log('Edit', row),
        },
        {
            label: 'Delete',
            icon: <Delete className="w-4 h-4" />,
            onClick: (row) => console.log('Delete', row),
            variant: 'danger',
        },
    ];

    const filteredData = selectedProvider === 'all'
        ? inventoryData
        : inventoryData.filter(item => item.provider.toLowerCase() === selectedProvider);

    return (
        <EnterpriseLayout>
            <PageHeader
                title="Cloud Inventory & Assets"
                subtitle="Unified view of resources across all cloud providers"
                breadcrumbs={breadcrumbs}
                actions={
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        Add Resource
                    </button>
                }
            />

            {/* Provider Filter Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {['all', 'aws', 'azure', 'gcp'].map((provider) => (
                        <button
                            key={provider}
                            onClick={() => setSelectedProvider(provider)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${selectedProvider === provider
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {provider === 'all' ? 'All Providers' : provider.toUpperCase()}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredData}
                actions={actions}
                onRowClick={(row) => console.log('Row clicked:', row)}
                showPagination={true}
                showExport={true}
                pageSize={10}
            />
        </EnterpriseLayout>
    );
}
