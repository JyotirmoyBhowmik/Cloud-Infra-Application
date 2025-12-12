'use client';
import React from 'react';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { components, boxShadow } from '../design-system/tokens';

export interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    trend?: {
        value: number;
        isPositive?: boolean;
        label?: string;
    };
    comparison?: {
        label: string;
        value: string | number;
    };
    sparklineData?: number[];
    onClick?: () => void;
}

export default function MetricCard({
    icon,
    label,
    value,
    trend,
    comparison,
    sparklineData,
    onClick,
}: MetricCardProps) {
    return (
        <div
            className={`p-6 transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
            style={{
                ...components.card,
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = boxShadow.md;
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = boxShadow.sm;
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <div className="flex items-start justify-between mb-4">
                {/* Icon */}
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <span className="text-blue-600">{icon}</span>
                </div>

                {/* Trend Indicator */}
                {trend && (
                    <div
                        className={`flex items-center text-sm font-semibold px-2 py-1 rounded-md ${trend.isPositive
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
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
            <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>

            {/* Value */}
            <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>

            {/* Comparison or Trend Label */}
            {comparison && (
                <div className="text-xs text-gray-500">
                    {comparison.label}: <span className="font-medium">{comparison.value}</span>
                </div>
            )}
            {trend?.label && (
                <div className="text-xs text-gray-500">{trend.label}</div>
            )}

            {/* Sparkline */}
            {sparklineData && sparklineData.length > 0 && (
                <div className="mt-4" style={{ height: 40 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData.map((value, index) => ({ value, index }))}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={trend?.isPositive !== false ? '#10B981' : '#EF4444'}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

/**
 * Metric Cards Grid Container
 */
export function MetricCardsGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {children}
        </div>
    );
}
