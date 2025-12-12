/**
 * Quick Stats Card Component
 * 
 * Specifications:
 * - 4-column grid layout (responsive)
 * - Shows: icon, metric, trend
 * - Border: 1px solid #E5E7EB
 * - Subtle hover shadow
 */

import React from 'react';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { components, boxShadow } from '../design-system/tokens';

export interface QuickStatProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    trend?: {
        value: number;
        isPositive?: boolean;
    };
    subtitle?: string;
}

export default function QuickStatCard({ icon, label, value, trend, subtitle }: QuickStatProps) {
    return (
        <div
            className="p-6 transition-shadow duration-200 cursor-pointer"
            style={{
                ...components.card,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = boxShadow.md;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = boxShadow.sm;
            }}
        >
            {/* Icon */}
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-600">{icon}</span>
                </div>

                {/* Trend Indicator */}
                {trend && (
                    <div
                        className={`flex items-center text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {trend.isPositive ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span>{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </div>

            {/* Label */}
            <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>

            {/* Value */}
            <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>

            {/* Subtitle */}
            {subtitle && (
                <div className="text-xs text-gray-500">{subtitle}</div>
            )}
        </div>
    );
}

/**
 * Quick Stats Grid Container
 * 4-column responsive grid
 */
export function QuickStatsGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {children}
        </div>
    );
}
