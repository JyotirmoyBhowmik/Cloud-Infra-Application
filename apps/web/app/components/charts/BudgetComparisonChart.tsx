'use client';
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';

export interface BudgetData {
    name: string;
    actual: number;
    budget: number;
    forecast?: number;
}

export interface BudgetComparisonChartProps {
    data: BudgetData[];
    height?: number;
}

export default function BudgetComparisonChart({ data, height = 350 }: BudgetComparisonChartProps) {
    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const actual = payload.find((p: any) => p.dataKey === 'actual')?.value || 0;
            const budget = payload.find((p: any) => p.dataKey === 'budget')?.value || 0;
            const variance = actual - budget;
            const percentUsed = budget > 0 ? (actual / budget) * 100 : 0;

            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between space-x-4">
                            <span className="text-xs text-blue-600">Budget:</span>
                            <span className="text-xs font-mono font-semibold">
                                ${budget.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <span className="text-xs text-green-600">Actual:</span>
                            <span className="text-xs font-mono font-semibold">
                                ${actual.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <span className="text-xs text-gray-600">Variance:</span>
                            <span
                                className={`text-xs font-mono font-semibold ${variance > 0 ? 'text-red-600' : 'text-green-600'
                                    }`}
                            >
                                {variance > 0 ? '+' : ''}${variance.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <span className="text-xs text-gray-600">Used:</span>
                            <span
                                className={`text-xs font-mono font-semibold ${percentUsed > 100
                                        ? 'text-red-600'
                                        : percentUsed > 90
                                            ? 'text-yellow-600'
                                            : 'text-green-600'
                                    }`}
                            >
                                {percentUsed.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '12px' }} />
                <YAxis
                    stroke="#6B7280"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="budget" fill="#3B82F6" name="Budget" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="#10B981" name="Actual Spend" radius={[4, 4, 0, 0]} />
                {data.some((d) => d.forecast) && (
                    <Bar
                        dataKey="forecast"
                        fill="#F59E0B"
                        name="Forecast"
                        radius={[4, 4, 0, 0]}
                        fillOpacity={0.6}
                    />
                )}
            </BarChart>
        </ResponsiveContainer>
    );
}
