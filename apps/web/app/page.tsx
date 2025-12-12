'use client';
import React from 'react';
import Link from 'next/link';
import {
    Dashboard,
    AttachMoney,
    Security,
    Inventory2,
    Notifications,
    AccountBalance,
    People,
    Assessment,
    CloudQueue
} from '@mui/icons-material';
import './globals.css';

export default function Home() {
    const features = [
        {
            title: 'Multi-Cloud Dashboard',
            description: 'Unified view across AWS, Azure, and GCP with real-time metrics',
            icon: <Dashboard className="text-5xl text-blue-600" />,
            link: '/dashboard',
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'FinOps & Cost Management',
            description: 'Budget tracking, forecasting, and optimization recommendations',
            icon: <AttachMoney className="text-5xl text-green-600" />,
            link: '/finops',
            color: 'from-green-500 to-green-600'
        },
        {
            title: 'Compliance & Governance',
            description: 'CIS benchmarks, policy enforcement, and compliance scoring',
            icon: <Security className="text-5xl text-purple-600" />,
            link: '/compliance',
            color: 'from-purple-500 to-purple-600'
        },
        {
            title: 'Cloud Inventory',
            description: 'Discover and track resources across all cloud providers',
            icon: <Inventory2 className="text-5xl text-orange-600" />,
            link: '/inventory',
            color: 'from-orange-500 to-orange-600'
        },
        {
            title: 'Alerting & Notifications',
            description: 'Threshold-based alerts with Email, Slack, and webhook support',
            icon: <Notifications className="text-5xl text-red-600" />,
            link: '/alerts',
            color: 'from-red-500 to-red-600'
        },
        {
            title: 'Budget Management',
            description: 'Create budgets, set thresholds, and track spending in real-time',
            icon: <AccountBalance className="text-5xl text-teal-600" />,
            link: '/budgets',
            color: 'from-teal-500 to-teal-600'
        },
        {
            title: 'User & Access Management',
            description: 'RBAC, JIT access, and role-based permissions',
            icon: <People className="text-5xl text-indigo-600" />,
            link: '/users',
            color: 'from-indigo-500 to-indigo-600'
        },
        {
            title: 'Audit Logs',
            description: 'Comprehensive event tracking and compliance auditing',
            icon: <Assessment className="text-5xl text-pink-600" />,
            link: '/audit',
            color: 'from-pink-500 to-pink-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <CloudQueue className="text-4xl text-blue-600" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Enterprise Multicloud Governance Platform
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Unified governance across AWS, Azure, and GCP
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 hover:shadow-lg"
                        >
                            Launch Platform →
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Comprehensive Cloud Governance at Your Fingertips
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Manage costs, ensure compliance, and optimize resources across multiple cloud providers
                        with our enterprise-grade governance platform.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <Link
                            key={index}
                            href={feature.link}
                            className="group"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 h-full border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transform hover:-translate-y-1">
                                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-10 mb-4`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                                <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    Explore →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Key Capabilities */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Platform Capabilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">14</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Dashboard Pages
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">3</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Cloud Providers Supported
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Software Implementation
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link
                        href="/onboarding"
                        className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                        <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                            Tenant Onboarding
                        </div>
                    </Link>
                    <Link
                        href="/iam-reviews/jit"
                        className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    >
                        <div className="text-sm font-semibold text-green-700 dark:text-green-300">
                            JIT Access Request
                        </div>
                    </Link>
                    <Link
                        href="/settings"
                        className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                    >
                        <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                            Platform Settings
                        </div>
                    </Link>
                    <Link
                        href="/support"
                        className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                    >
                        <div className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                            Support & Help
                        </div>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-sm text-gray-400">
                        <p>Enterprise Multicloud Governance Platform © 2025</p>
                        <p className="mt-2">Powered by NestJS, Next.js, and PostgreSQL</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
