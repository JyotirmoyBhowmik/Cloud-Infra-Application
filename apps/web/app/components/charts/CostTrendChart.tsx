'use client';
import React from 'react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';

export interface CostDataPoint {
    date: string;
    aws?: number;
    azure?: number;
    gcp?: number;
    forecast?: number;
    total?: number;
}

export interface CostTrendChartProps {
    data: CostDataPoint[];
    showForecast?: boolean;
    showIndividualClouds?: boolean;
    height?: number;
}

export default function CostTrendChart({
    data,
    showForecast = false,
    showIndividualClouds = true,
    height = 350,
}: CostTrendChartProps) {
    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center justify-between space-x-4">
                            <span className="text-xs" style={{ color: entry.color }}>
                                {entry.name}:
                            </span>
                            <span className="text-xs font-mono font-semibold">
                                ${entry.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorAws" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF9900" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FF9900" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAzure" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0078D4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0078D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGcp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                    dataKey="date"
                    stroke="#6B7280"
                    style={{ fontSize: '12px' }}
                />
                <YAxis
                    stroke="#6B7280"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    wrapperStyle={{ fontSize: '12px' }}
                    iconType="circle"
                />

                {showIndividualClouds ? (
                    <>
                        <Area
                            type="monotone"
                            dataKey="aws"
                            stroke="#FF9900"
                            fillOpacity={1}
                            fill="url(#colorAws)"
                            name="AWS"
                            strokeWidth={2}
                        />
                        <Area
                            type="monotone"
                            dataKey="azure"
                            stroke="#0078D4"
                            fillOpacity={1}
                            fill="url(#colorAzure)"
                            name="Azure"
                            strokeWidth={2}
                        />
                        <Area
                            type="monotone"
                            dataKey="gcp"
                            stroke="#4285F4"
                            fillOpacity={1}
                            fill="url(#colorGcp)"
                            name="GCP"
                            strokeWidth={2}
                        />
                    </>
                ) : (
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#10B981"
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                        name="Total Cost"
                        strokeWidth={2}
                    />
                )}

                {showForecast && (
                    <>
                        <ReferenceLine
                            x={data[data.length - 1]?.date}
                            stroke="#9CA3AF"
                            strokeDasharray="3 3"
                            label={{ value: 'Forecast', position: 'top', fill: '#6B7280' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="forecast"
                            stroke="#EF4444"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                            name="Forecast"
                            dot={false}
                        />
                    </>
                )}
            </AreaChart>
        </ResponsiveContainer>
    );
}
