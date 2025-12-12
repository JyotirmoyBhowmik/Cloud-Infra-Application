/**
 * Breadcrumb Navigation Component
 * 
 * Specifications:
 * - Font size: 13px
 * - Inactive color: #6B7280
 * - Active color: #111827
 * - Chevron separators
 * - Last level bold, previous clickable
 * 
 * Example: Home > Inventory > Azure > VMs
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from '@mui/icons-material';
import { colors, typography } from '../design-system/tokens';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    if (!items || items.length === 0) return null;

    return (
        <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <ChevronRight
                                    className="w-4 h-4 mx-2"
                                    style={{ color: colors.gray[400] }}
                                />
                            )}

                            {isLast || !item.href ? (
                                <span
                                    className="font-semibold"
                                    style={{
                                        fontSize: typography.fontSize.sm,
                                        color: colors.gray[900],
                                    }}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:underline transition-colors"
                                    style={{
                                        fontSize: typography.fontSize.sm,
                                        color: colors.gray[500],
                                    }}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
