'use client';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';

export interface ResourceData {
    name: string;
    value: number;
    color?: string;
}

export interface ResourcePieChartProps {
    data: ResourceData[];
    height?: number;
    showLegend?: boolean;
    innerRadius?: number;
    outerRadius?: number;
}

const DEFAULT_COLORS = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
];

export default function ResourcePieChart({
    data,
    height = 300,
    showLegend = true,
    innerRadius = 60,
    outerRadius = 100,
}: ResourcePieChartProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Ensure colors are assigned
    const chartData = data.map((item, index) => ({
        ...item,
        color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }));

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(null);
    };

    // Active shape rendering for hover effect
    const renderActiveShape = (props: any) => {
        const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
        } = props;

        return (
            <g>
                <text x={cx} y={cy - 10} dy={8} textAnchor="middle" className="fill-gray-900 font-semibold text-lg">
                    {payload.name}
                </text>
                <text x={cx} y={cy + 10} dy={8} textAnchor="middle" className="fill-gray-600 text-sm">
                    {value.toLocaleString()} ({(percent * 100).toFixed(1)}%)
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 10}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{data.name}</p>
                    <p className="text-sm font-mono">
                        Count: <span className="font-semibold">{data.value.toLocaleString()}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                        {data.payload.percent ? `${(data.payload.percent * 100).toFixed(1)}%` : ''}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom legend
    const renderLegend = (props: any) => {
        const { payload } = props;
        return (
            <div className="flex flex-wrap justify-center gap-3 mt-4">
                {payload.map((entry: any, index: number) => (
                    <div key={`legend-${index}`} className="flex items-center space-x-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs text-gray-700">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart>
                <Pie
                    activeIndex={activeIndex !== null ? activeIndex : undefined}
                    activeShape={renderActiveShape}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    paddingAngle={2}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                {showLegend && <Legend content={renderLegend} />}
            </PieChart>
        </ResponsiveContainer>
    );
}
