'use client';
import React, { useState, useEffect } from 'react';
import EnterpriseLayout from '../components/EnterpriseLayout';
import PageHeader from '../components/PageHeader';
import MetricCard, { MetricCardsGrid } from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import DataTable, { Column } from '../components/DataTable';
import CostTrendChart, { CostDataPoint } from '../components/charts/CostTrendChart';
import ResourcePieChart, { ResourceData } from '../components/charts/ResourcePieChart';
import BudgetComparisonChart, { BudgetData } from '../components/charts/BudgetComparisonChart';
import {
    AttachMoney,
    TrendingUp,
    AccountBalance,
    Savings,
} from '@mui/icons-material';
import { Tabs, Tab, Box } from '@mui/material';

// Mock data generators
const generateCostTrend = (): CostDataPoint[] => {
    const data: CostDataPoint[] = [];
    const startDate = new Date('2024-11-01');

    for (let i = 0; i < 45; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);

        const baseAws = 15000 + Math.random() * 5000;
        const baseAzure = 12000 + Math.random() * 4000;
        const baseGcp = 8000 + Math.random() * 3000;

        data.push({
            date: date.toISOString().split('T')[0],
            aws: Math.round(baseAws),
            azure: Math.round(baseAzure),
            gcp: Math.round(baseGcp),
            total: Math.round(baseAws + baseAzure + baseGcp),
            forecast: i >= 30 ? Math.round((baseAws + baseAzure + baseGcp) * 1.1) : undefined,
        });
    }
    return data;
};

const generateProviderBreakdown = (): ResourceData[] => [
    { name: 'AWS', value: 45320, color: '#FF9900' },
    { name: 'Azure', value: 36250, color: '#0078D4' },
    { name: 'GCP', value: 24100, color: '#4285F4' },
];

const generateServiceBreakdown = (): ResourceData[] => [
    { name: 'Compute (EC2/VMs)', value: 35000 },
    { name: 'Storage (S3/Blob)', value: 18000 },
    { name: 'Database', value: 22000 },
    { name: 'Networking', value: 12000 },
    { name: 'Analytics', value: 8000 },
    { name: 'Other', value: 10670 },
];

const generateBudgetData = (): BudgetData[] => [
    { name: 'Production', budget: 50000, actual: 45320, forecast: 48000 },
    { name: 'Development', budget: 20000, actual: 18500, forecast: 19200 },
    { name: 'Staging', budget: 15000, actual: 16200, forecast: 16800 },
    { name: 'Testing', budget: 10000, actual: 8500 },
];

interface CostDriver {
    resource: string;
    service: string;
    provider: string;
    monthlyCost: number;
    trend: number;
    potentialSavings: number;
}

const generateTopCostDrivers = (): CostDriver[] => [
    {
        resource: 'prod-app-cluster',
        service: 'EKS',
        provider: 'AWS',
        monthlyCost: 8400,
        trend: 5.2,
        potentialSavings: 1200,
    },
    {
        resource: 'analytics-db-cluster',
        service: 'RDS PostgreSQL',
        provider: 'AWS',
        monthlyCost: 6800,
        trend: -2.1,
        potentialSavings: 0,
    },
    {
        resource: 'data-warehouse',
        service: 'Azure Synapse',
        provider: 'Azure',
        monthlyCost: 5200,
        trend: 12.5,
        potentialSavings: 800,
    },
    {
        resource: 'ml-training-vms',
        service: 'Compute Engine',
        provider: 'GCP',
        monthlyCost: 4900,
        trend: 8.3,
        potentialSavings: 1500,
    },
    {
        resource: 'cdn-distribution',
        service: 'CloudFront',
        provider: 'AWS',
        monthlyCost: 3200,
        trend: 1.5,
        potentialSavings: 0,
    },
];

export default function FinOpsPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [timeRange, setTimeRange] = useState('30d');

    const costTrendData = generateCostTrend();
    const providerBreakdown = generateProviderBreakdown();
    const serviceBreakdown = generateServiceBreakdown();
    const budgetData = generateBudgetData();
    const topDrivers = generateTopCostDrivers();

    const totalSpend = providerBreakdown.reduce((sum, item) => sum + item.value, 0);
    const forecastedSpend = Math.round(totalSpend * 1.08);
    const potentialSavings = topDrivers.reduce((sum, item) => sum + item.potentialSavings, 0);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'FinOps' },
    ];

    const costDriverColumns: Column<CostDriver>[] = [
        { id: 'resource', label: 'Resource Name', minWidth: 180 },
        { id: 'service', label: 'Service', minWidth: 120 },
        {
            id: 'provider',
            label: 'Provider',
            minWidth: 100,
            format: (value) => (
                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                    {value}
                </span>
            ),
        },
        {
            id: 'monthlyCost',
            label: 'Monthly Cost',
            align: 'right',
            format: (value) => `$${value.toLocaleString()}`,
        },
        {
            id: 'trend',
            label: 'Trend',
            align: 'right',
            format: (value) => (
                <span className={value > 0 ? 'text-red-600' : 'text-green-600'}>
                    {value > 0 ? '+' : ''}{value}%
                </span>
            ),
        },
        {
            id: 'potentialSavings',
            label: 'Potential Savings',
            align: 'right',
            format: (value) =>
                value > 0 ? (
                    <span className="text-green-600 font-semibold">
                        ${value.toLocaleString()}
                    </span>
                ) : (
                    <span className="text-gray-400">-</span>
                ),
        },
    ];

    return (
        <EnterpriseLayout>
            <PageHeader
                title="FinOps & Cost Management"
                subtitle="Cloud cost analytics, forecasting, and optimization"
                breadcrumbs={breadcrumbs}
                actions={
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        Generate Report
                    </button>
                }
            />

            {/* Key Metrics */}
            <MetricCardsGrid>
                <MetricCard
                    icon={<AttachMoney className="w-6 h-6" />}
                    label="Total Monthly Spend"
                    value={`$${totalSpend.toLocaleString()}`}
                    trend={{ value: 5.2, isPositive: false, label: 'vs last month' }}
                    sparklineData={costTrendData.slice(-30).map(d => d.total || 0)}
                />
                <MetricCard
                    icon={<TrendingUp className="w-6 h-6" />}
                    label="Forecasted Next Month"
                    value={`$${forecastedSpend.toLocaleString()}`}
                    comparison={{ label: 'Confidence', value: '92%' }}
                />
                <MetricCard
                    icon={<Savings className="w-6 h-6" />}
                    label="Potential Savings"
                    value={`$${potentialSavings.toLocaleString()}`}
                    trend={{ value: 3.8, isPositive: true, label: 'optimization opportunities' }}
                />
                <MetricCard
                    icon={<AccountBalance className="w-6 h-6" />}
                    label="Budget Utilization"
                    value="89.2%"
                    comparison={{ label: 'Of allocated budget', value: '$95,000' }}
                />
            </MetricCardsGrid>

            {/* Tabs */}
            <Box className="mb-6">
                <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v)}>
                    <Tab label="Overview" />
                    <Tab label="By Provider" />
                    <Tab label="By Service" />
                    <Tab label="Budgets" />
                </Tabs>
            </Box>

            {/* Tab Content */}
            {selectedTab === 0 && (
                <div className="space-y-6">
                    {/* Cost Trend */}
                    <ChartCard
                        title="Cost Trend Analysis"
                        subtitle="Multi-cloud spend over time with forecast"
                        timeRange={timeRange}
                        onTimeRangeChange={setTimeRange}
                    >
                        <CostTrendChart
                            data={costTrendData}
                            showForecast={true}
                            showIndividualClouds={true}
                        />
                    </ChartCard>

                    {/* Provider and Service Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartCard title="Cost by Provider" subtitle="Monthly spend distribution">
                            <ResourcePieChart data={providerBreakdown} height={300} />
                        </ChartCard>
                        <ChartCard title="Cost by Service" subtitle="Service category breakdown">
                            <ResourcePieChart data={serviceBreakdown} height={300} />
                        </ChartCard>
                    </div>

                    {/* Top Cost Drivers */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Top Cost Drivers
                        </h2>
                        <DataTable
                            columns={costDriverColumns}
                            data={topDrivers}
                            defaultRowsPerPage={5}
                        />
                    </div>
                </div>
            )}

            {selectedTab === 1 && (
                <div className="space-y-6">
                    <ChartCard title="Cost Trend by Provider">
                        <CostTrendChart
                            data={costTrendData}
                            showIndividualClouds={true}
                            showForecast={false}
                        />
                    </ChartCard>
                    <ChartCard title="Provider Distribution">
                        <ResourcePieChart data={providerBreakdown} height={400} />
                    </ChartCard>
                </div>
            )}

            {selectedTab === 2 && (
                <div className="space-y-6">
                    <ChartCard title="Service Category Breakdown">
                        <ResourcePieChart data={serviceBreakdown} height={400} />
                    </ChartCard>
                </div>
            )}

            {selectedTab === 3 && (
                <div className="space-y-6">
                    <ChartCard
                        title="Budget vs Actual Comparison"
                        subtitle="Monthly budget tracking across environments"
                    >
                        <BudgetComparisonChart data={budgetData} />
                    </ChartCard>
                </div>
            )}
        </EnterpriseLayout>
    );
}
