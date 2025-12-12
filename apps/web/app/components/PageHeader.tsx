/**
 * Page Header Component
 * 
 * Specifications:
 * - H1 title: 32px bold
 * - Subtitle: 16px gray
 * - Optional breadcrumb navigation
 * - Optional action buttons
 */

import React from 'react';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';
import { typography, colors } from '../design-system/tokens';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, breadcrumbs, actions }: PageHeaderProps) {
    return (
        <div className="mb-8">
            {/* Breadcrumb */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="mb-4">
                    <Breadcrumb items={breadcrumbs} />
                </div>
            )}

            {/* Title and Actions */}
            <div className="flex items-start justify-between">
                <div>
                    <h1
                        className="font-bold"
                        style={{
                            fontSize: typography.fontSize['3xl'],
                            color: colors.gray[900],
                        }}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p
                            className="mt-2"
                            style={{
                                fontSize: typography.fontSize.md,
                                color: colors.gray[600],
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                {actions && (
                    <div className="flex items-center space-x-3">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
