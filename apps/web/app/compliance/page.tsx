'use client';
import React, { useState } from 'react';
import EnterpriseLayout from '../components/EnterpriseLayout';
import PageHeader from '../components/PageHeader';
import MetricCard, { MetricCardsGrid } from '../components/MetricCard';
import DataTable, { Column } from '../components/DataTable';
import ChartCard from '../components/ChartCard';
import ComplianceScoreGauge from '../components/charts/ComplianceScoreGauge';
import StatusBadge from '../components/StatusBadge';
import {
    Security,
    WarningAmber,
    CheckCircle,
    Error,
} from '@mui/icons-material';
import { Tabs, Tab, Box, Chip, LinearProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ComplianceViolation {
    id: string;
    control: string;
    framework: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    resource: string;
    description: string;
    status: 'open' | 'in_progress' | 'resolved';
    daysOpen: number;
}

interface ControlStatus {
    category: string;
    total: number;
    passed: number;
    failed: number;
    notApplicable: number;
}

// Generate mock data
const generateViolations = (): ComplianceViolation[] => [
    {
        id: 'V001',
        control: 'CIS 1.3 - Root Account MFA',
        framework: 'CIS AWS',
        severity: 'critical',
        resource: 'aws-root-account',
        description: 'Root account does not have MFA enabled',
        status: 'open',
        daysOpen: 45,
    },
    {
        id: 'V002',
        control: 'SOC2 CC6.1 - Security Monitoring',
        framework: 'SOC2',
        severity: 'high',
        resource: 'prod-vpc-123',
        description: 'VPC flow logs are not enabled',
        status: 'in_progress',
        daysOpen: 12,
    },
    {
        id: 'V003',
        control: 'CIS 2.1 - CloudTrail Enabled',
        framework: 'CIS AWS',
        severity: 'high',
        resource: 'aws-account-prod',
        description: 'CloudTrail is not enabled in all regions',
        status: 'open',
        daysOpen: 8,
    },
    {
        id: 'V004',
        control: 'ISO 27001 A.9.2.3 - Access Reviews',
        framework: 'ISO 27001',
        severity: 'medium',
        resource: 'iam-users',
        description: 'Periodic access review not conducted',
        status: 'open',
        daysOpen: 30,
    },
    {
        id: 'V005',
        control: 'CIS 3.7 - S3 Bucket Encryption',
        framework: 'CIS AWS',
        severity: 'medium',
        resource: 's3://prod-data-bucket',
        description: 'S3 bucket does not have encryption enabled',
        status: 'resolved',
        daysOpen: 0,
    },
];

const generateControlStatus = (): ControlStatus[] => [
    { category: 'Identity & Access', total: 25, passed: 20, failed: 3, notApplicable: 2 },
    { category: 'Logging & Monitoring', total: 18, passed: 15, failed: 2, notApplicable: 1 },
    { category: 'Network Security', total: 22, passed: 18, failed: 4, notApplicable: 0 },
    { category: 'Data Protection', total: 20, passed: 17, failed: 2, notApplicable: 1 },
    { category: 'Incident Response', total: 15, passed: 14, failed: 1, notApplicable: 0 },
];

const generateTrendData = () => {
    const data = [];
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            score: 85 + Math.random() * 10,
        });
    }
    return data;
};

export default function CompliancePage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const violations = generateViolations();
    const controlStatus = generateControlStatus();
    const trendData = generateTrendData();

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Compliance' },
    ];

    // Calculate metrics
    const totalViolations = violations.filter(v => v.status !== 'resolved').length;
    const criticalViolations = violations.filter(v => v.severity === 'critical' && v.status !== 'resolved').length;
    const inProgressRemediation = violations.filter(v => v.status === 'in_progress').length;

    const totalControls = controlStatus.reduce((sum, c) => sum + c.total, 0);
    const passedControls = controlStatus.reduce((sum, c) => sum + c.passed, 0);
    const overallScore = Math.round((passedControls / totalControls) * 100);

    // Table columns
    const violationColumns: Column<ComplianceViolation>[] = [
        {
            id: 'severity',
            label: 'Severity',
            minWidth: 100,
            format: (value: string) => {
                const severityColors = {
                    critical: 'error',
                    high: 'error',
                    medium: 'warning',
                    low: 'inactive',
                };
                return <StatusBadge status={severityColors[value as keyof typeof severityColors] as any} label={value.toUpperCase()} />;
            },
        },
        { id: 'control', label: 'Control', minWidth: 200 },
        {
            id: 'framework',
            label: 'Framework',
            minWidth: 120,
            format: (value: string) => (
                <Chip label={value} size="small" variant="outlined" />
            ),
        },
        { id: 'resource', label: 'Resource', minWidth: 180 },
        { id: 'description', label: 'Description', minWidth: 250 },
        {
            id: 'status',
            label: 'Status',
            minWidth: 120,
            format: (value: string) => {
                const statusMap = {
                    open: { status: 'error', label: 'Open' },
                    in_progress: { status: 'warning', label: 'In Progress' },
                    resolved: { status: 'active', label: 'Resolved' },
                };
                const config = statusMap[value as keyof typeof statusMap];
                return <StatusBadge status={config.status as any} label={config.label} />;
            },
        },
        {
            id: 'daysOpen',
            label: 'Days Open',
            align: 'right',
            format: (value: number) => value > 0 ? `${value} days` : '-',
        },
    ];

    return (
        <EnterpriseLayout>
            <PageHeader
                title="Compliance & Governance"
                subtitle="Multi-framework compliance monitoring and violation management"
                breadcrumbs={breadcrumbs}
                actions={
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        Run Scan
                    </button>
                }
            />

            {/* Key Metrics */}
            <MetricCardsGrid>
                <MetricCard
                    icon={<Security className="w-6 h-6" />}
                    label="Overall Compliance Score"
                    value={`${overallScore}%`}
                    trend={{ value: 2.3, isPositive: true, label: 'vs last scan' }}
                />
                <MetricCard
                    icon={<WarningAmber className="w-6 h-6" />}
                    label="Open Violations"
                    value={totalViolations}
                    comparison={{ label: 'Critical', value: criticalViolations }}
                />
                <MetricCard
                    icon={<CheckCircle className="w-6 h-6" />}
                    label="Passed Controls"
                    value={passedControls}
                    comparison={{ label: `of ${totalControls} total`, value: `${overallScore}%` }}
                />
                <MetricCard
                    icon={<Error className="w-6 h-6" />}
                    label="In Remediation"
                    value={inProgressRemediation}
                    trend={{ value: 15, isPositive: true, label: 'completion rate' }}
                />
            </MetricCardsGrid>

            {/* Tabs */}
            <Box className="mb-6">
                <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v)}>
                    <Tab label="Overview" />
                    <Tab label="Violations" />
                    <Tab label="Controls" />
                    <Tab label="Frameworks" />
                </Tabs>
            </Box>

            {/* Tab Content */}
            {selectedTab === 0 && (
                <div className="space-y-6">
                    {/* Compliance Score Trend */}
                    <ChartCard title="Compliance Score Trend" subtitle="Last 30 days">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
                                <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} domain={[75, 100]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    {/* Control Status by Category */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Control Status by Category
                        </h2>
                        <div className="space-y-4">
                            {controlStatus.map((category) => {
                                const passRate = (category.passed / category.total) * 100;
                                return (
                                    <div key={category.category} className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-sm font-semibold text-gray-900">{category.category}</h3>
                                            <span className="text-sm text-gray-600">
                                                {category.passed}/{category.total} passed
                                            </span>
                                        </div>
                                        <LinearProgress
                                            variant="determinate"
                                            value={passRate}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: '#E5E7EB',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: passRate >= 90 ? '#10B981' : passRate >= 70 ? '#F59E0B' : '#EF4444',
                                                },
                                            }}
                                        />
                                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                            <span className="text-green-600">{category.passed} passed</span>
                                            <span className="text-red-600">{category.failed} failed</span>
                                            <span className="text-gray-400">{category.notApplicable} N/A</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 1 && (
                <div className="space-y-6">
                    <DataTable
                        columns={violationColumns}
                        data={violations}
                        defaultRowsPerPage={10}
                    />
                </div>
            )}

            {selectedTab === 2 && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {controlStatus.map((category) => (
                            <div key={category.category} className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Total Controls</span>
                                        <span className="font-semibold">{category.total}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600">Passed</span>
                                        <span className="font-semibold text-green-600">{category.passed}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-red-600">Failed</span>
                                        <span className="font-semibold text-red-600">{category.failed}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Not Applicable</span>
                                        <span className="font-semibold text-gray-400">{category.notApplicable}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 3 && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <ComplianceScoreGauge score={94} label="CIS Benchmark" />
                        </div>
                        <div className="flex flex-col items-center">
                            <ComplianceScoreGauge score={87} label="SOC 2 Type II" />
                        </div>
                        <div className="flex flex-col items-center">
                            <ComplianceScoreGauge score={91} label="ISO 27001" />
                        </div>
                    </div>
                </div>
            )}
        </EnterpriseLayout>
    );
}

