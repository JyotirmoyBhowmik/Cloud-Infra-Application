'use client';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Global Overview</h1>

            {/* Top Row: KPI Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {['Total Spend', 'Active Alerts', 'Compliance Score', 'Resource Count'].map((title) => (
                    <Card key={title} className="dark:bg-zinc-900">
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="h4" component="div" className="font-bold">
                                --
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Middle Row: Charts Placeholder */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="h-96 dark:bg-zinc-900">
                    <CardContent className="h-full flex items-center justify-center border-dashed border-2 m-4 rounded">
                        <Typography color="text.secondary">Spend Trend (Chart)</Typography>
                    </CardContent>
                </Card>
                <Card className="h-96 dark:bg-zinc-900">
                    <CardContent className="h-full flex items-center justify-center border-dashed border-2 m-4 rounded">
                        <Typography color="text.secondary">Resource Health (Chart)</Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
