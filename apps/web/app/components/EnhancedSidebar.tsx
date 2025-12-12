/**
 * Enterprise Sidebar Navigation
 * 
 * Specifications:
 * - Width: 256px (expanded) → 64px (collapsed)
 * - Transition: 300ms cubic-bezier
 * - Z-index: 900
 * - Multi-level tree navigation
 * - Provider scoping (AWS/Azure/GCP)
 * 
 * 9 Top-Level Sections:
 * 1. Dashboard
 * 2. Inventory & Assets
 * 3. Monitoring & Metrics
 * 4. Cost & FinOps
 * 5. Policy & Compliance
 * 6. Automation (Playbooks)
 * 7. Reports & Audits
 * 8. Identity & Access
 * 9. Settings
 */

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Dashboard,
    Inventory2,
    Assessment,
    AttachMoney,
    Security,
    AutoFixHigh,
    Description,
    People,
    Settings,
    ExpandMore,
    ChevronRight,
} from '@mui/icons-material';
import { colors, layout, transitions, zIndex } from '../design-system/tokens';

interface SidebarProps {
    collapsed: boolean;
}

interface NavSection {
    id: string;
    label: string;
    icon: React.ReactNode;
    href?: string;
    children?: NavItem[];
}

interface NavItem {
    label: string;
    href: string;
    badge?: string;
}

export default function EnhancedSidebar({ collapsed }: SidebarProps) {
    const pathname = usePathname();
    const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard']);

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const isActive = (href: string) => pathname === href;
    const isSectionActive = (section: NavSection) => {
        if (section.href && isActive(section.href)) return true;
        return section.children?.some(child => isActive(child.href)) || false;
    };

    // Navigation sections (9 top-level as specified)
    const sections: NavSection[] = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <Dashboard className="w-5 h-5" />,
            href: '/dashboard',
        },
        {
            id: 'inventory',
            label: 'Inventory & Assets',
            icon: <Inventory2 className="w-5 h5" />,
            children: [
                { label: 'All Resources', href: '/inventory' },
                { label: 'AWS Resources', href: '/inventory/aws' },
                { label: 'Azure Resources', href: '/inventory/azure' },
                { label: 'GCP Resources', href: '/inventory/gcp' },
                { label: 'Resource Groups', href: '/inventory/groups' },
            ],
        },
        {
            id: 'monitoring',
            label: 'Monitoring & Metrics',
            icon: <Assessment className="w-5 h-5" />,
            children: [
                { label: 'Overview', href: '/monitoring' },
                { label: 'Performance', href: '/monitoring/performance' },
                { label: 'Health Checks', href: '/monitoring/health' },
                { label: 'Metrics Explorer', href: '/monitoring/metrics' },
            ],
        },
        {
            id: 'finops',
            label: 'Cost & FinOps',
            icon: <AttachMoney className="w-5 h-5" />,
            children: [
                { label: 'Cost Explorer', href: '/finops' },
                { label: 'Budgets', href: '/budgets' },
                { label: 'Forecasting', href: '/finops/forecasting' },
                { label: 'Optimization', href: '/finops/optimization' },
                { label: 'Anomaly Detection', href: '/finops/anomalies' },
            ],
        },
        {
            id: 'compliance',
            label: 'Policy & Compliance',
            icon: <Security className="w-5 h-5" />,
            children: [
                { label: 'Compliance Dashboard', href: '/compliance' },
                { label: 'Policies', href: '/governance' },
                { label: 'CIS Benchmarks', href: '/compliance/cis' },
                { label: 'SOC2 Controls', href: '/compliance/soc2' },
                { label: 'ISO27001', href: '/compliance/iso27001' },
            ],
        },
        {
            id: 'automation',
            label: 'Automation (Playbooks)',
            icon: <AutoFixHigh className="w-5 h-5" />,
            children: [
                { label: 'Playbook Library', href: '/playbooks' },
                { label: 'Execution History', href: '/playbooks/history' },
                { label: 'Create Playbook', href: '/playbooks/create' },
                { label: 'Scheduled Jobs', href: '/playbooks/scheduled' },
            ],
        },
        {
            id: 'reports',
            label: 'Reports & Audits',
            icon: <Description className="w-5 h-5" />,
            children: [
                { label: 'Report Builder', href: '/reports' },
                { label: 'Audit Logs', href: '/audit' },
                { label: 'Scheduled Reports', href: '/reports/scheduled' },
                { label: 'Export History', href: '/reports/exports' },
            ],
        },
        {
            id: 'identity',
            label: 'Identity & Access',
            icon: <People className="w-5 h-5" />,
            children: [
                { label: 'Users', href: '/users' },
                { label: 'Roles & Permissions', href: '/iam-reviews' },
                { label: 'JIT Access', href: '/iam-reviews/jit' },
                { label: 'Tenant Management', href: '/onboarding' },
                { label: 'Cloud Connectors', href: '/connectors' },
            ],
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: <Settings className="w-5 h-5" />,
            children: [
                { label: 'General', href: '/settings' },
                { label: 'Notifications', href: '/settings/notifications' },
                { label: 'Security', href: '/settings/security' },
                { label: 'Integrations', href: '/settings/integrations' },
            ],
        },
    ];

    return (
        <aside
            className="fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 overflow-y-auto"
            style={{
                width: collapsed ? layout.sidebar.widthCollapsed : layout.sidebar.widthExpanded,
                transition: transitions.base,
                zIndex: zIndex.sidebar,
            }}
        >
            <nav className="py-4">
                {sections.map((section) => (
                    <div key={section.id} className="mb-1">
                        {/* Section Header */}
                        {section.href ? (
                            // Single-level section with direct link
                            <Link
                                href={section.href}
                                className={`
                  flex items-center px-4 py-2.5 text-sm font-medium transition-colors
                  ${isActive(section.href)
                                        ? 'bg-blue-50 text-blue-700 border-l-3 border-l-blue-600'
                                        : 'text-gray-700 hover:bg-gray-100 border-l-3 border-l-transparent'
                                    }
                `}
                            >
                                <span className="flex-shrink-0" style={{ color: colors.gray[500] }}>
                                    {section.icon}
                                </span>
                                {!collapsed && (
                                    <span className="ml-3 flex-1">{section.label}</span>
                                )}
                            </Link>
                        ) : (
                            // Multi-level section with expandable children
                            <>
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className={`
                    w-full flex items-center px-4 py-2.5 text-sm font-medium transition-colors
                    ${isSectionActive(section)
                                            ? 'text-blue-700 bg-blue-50'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                  `}
                                >
                                    <span className="flex-shrink-0" style={{ color: colors.gray[500] }}>
                                        {section.icon}
                                    </span>
                                    {!collapsed && (
                                        <>
                                            <span className="ml-3 flex-1 text-left">{section.label}</span>
                                            {expandedSections.includes(section.id) ? (
                                                <ExpandMore className="w-4 h-4" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4" />
                                            )}
                                        </>
                                    )}
                                </button>

                                {/* Children */}
                                {!collapsed && expandedSections.includes(section.id) && section.children && (
                                    <div className="mt-1">
                                        {section.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={`
                          flex items-center pl-12 pr-4 py-2 text-sm transition-colors
                          ${isActive(child.href)
                                                        ? 'bg-blue-50 text-blue-700 font-medium border-l-3 border-l-blue-600'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-3 border-l-transparent'
                                                    }
                        `}
                                            >
                                                <span className="flex-1">{child.label}</span>
                                                {child.badge && (
                                                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
                                                        {child.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
