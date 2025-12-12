/**
 * Enterprise Dashboard Page
 * Demonstrates the new tri-section layout with:
 * - Page header (32px title, 16px subtitle, breadcrumb)
 * - Quick stats grid (4 columns)
 * - Status badges
 * - Professional design tokens
 */

'use client';
import React from 'react';
import EnterpriseLayout from '../components/EnterpriseLayout';
import PageHeader from '../components/PageHeader';
import QuickStatCard, { QuickStatsGrid } from '../components/QuickStatCard';
import StatusBadge from '../components/StatusBadge';
import {
    Cloud,
    AttachMoney,
    Notifications,
    Security,
} from '@mui/icons-material';

export default function DashboardPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Dashboard' },
    ];

    return (
        <EnterpriseLayout>
            <PageHeader
                title="Multi-Cloud Governance Dashboard"
                subtitle="Unified view across AWS, Azure, and GCP"
                breadcrumbs={breadcrumbs}
                actions={
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        Add Cloud Account
                    </button>
                }
            />

            {/* Quick Stats Grid */}
            <QuickStatsGrid>
                <QuickStatCard
                    icon={<Cloud className="w-6 h-6" />}
                    label="Total Resources"
                    value="1,247"
                    trend={{ value: 12, isPositive: true }}
                    subtitle="Across all cloud providers"
                />
                <QuickStatCard
                    icon={<AttachMoney className="w-6 h-6" />}
                    label="Monthly Spend"
                    value="$45,320"
                    trend={{ value: 5, isPositive: false }}
                    subtitle="Current billing period"
                />
                <QuickStatCard
                    icon={<Notifications className="w-6 h-6" />}
                    label="Active Alerts"
                    value="23"
                    trend={{ value: 8, isPositive: false }}
                    subtitle="Requires attention"
                />
                <QuickStatCard
                    icon={<Security className="w-6 h-6" />}
                    label="Compliance Score"
                    value="94%"
                    trend={{ value: 3, isPositive: true }}
                    subtitle="CIS Benchmark avg"
                />
            </QuickStatsGrid>

            {/* Resource Summary */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Resource Summary</h2>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resources</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Cost</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AWS</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">543</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$21,450</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status="active" />
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Azure</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">412</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$15,870</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status="active" />
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GCP</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">292</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$8,000</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status="warning" label="1 Alert" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Alerts */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts</h2>
                <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <StatusBadge status="error" label="Critical" />
                                <span className="text-sm font-medium text-gray-900">Budget threshold exceeded</span>
                            </div>
                            <span className="text-xs text-gray-500">2 minutes ago</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            AWS production account has exceeded 90% of monthly budget
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <StatusBadge status="warning" label="Warning" />
                                <span className="text-sm font-medium text-gray-900">Compliance drift detected</span>
                            </div>
                            <span className="text-xs text-gray-500">15 minutes ago</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            3 resources in Azure are non-compliant with CIS benchmarks
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <StatusBadge status="active" label="Info" />
                                <span className="text-sm font-medium text-gray-900">Optimization opportunity</span>
                            </div>
                            <span className="text-xs text-gray-500">1 hour ago</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            12 EC2 instances eligible for rightsizing - potential savings: $1,200/month
                        </p>
                    </div>
                </div>
            </div>
        </EnterpriseLayout>
    );
}
