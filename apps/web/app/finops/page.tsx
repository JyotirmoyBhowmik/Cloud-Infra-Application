'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function FinOpsPage() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // setData([{ month: '2025-01', cost: 1250, provider: 'aws' }]);
        // In real app, fetch from NestJS
        setData([
            { month: '2025-01', cost: 1250.00, provider: 'aws' },
            { month: '2025-01', cost: 980.50, provider: 'azure' },
            { month: '2025-02', cost: 1300.00, provider: 'aws' },
            { month: '2025-02', cost: 1050.00, provider: 'azure' },
        ]);
    }, []);

    const totalCost = data.reduce((acc, curr) => acc + curr.cost, 0);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">FinOps & Cost Management</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Card className="dark:bg-zinc-900">
                        <CardContent>
                            <Typography color="text.secondary">Total Spend (YTD)</Typography>
                            <Typography variant="h3">${totalCost.toFixed(2)}</Typography>
                        </CardContent>
                    </Card>
                    <Card className="dark:bg-zinc-900">
                        <CardContent>
                            <Typography color="text.secondary">Next Month Forecast</Typography>
                            <Typography variant="h3">$2,800.00</Typography>
                            <Typography color="success.main" variant="caption">Confidence: 95%</Typography>
                        </CardContent>
                    </Card>
                </div>

                <h2 className="text-xl font-bold mb-4">Cost Breakdown</h2>
                <div className="grid gap-4">
                    {data.map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-zinc-900 p-4 rounded shadow flex justify-between">
                            <div>
                                <span className="font-bold uppercase">{item.provider}</span>
                                <span className="text-gray-500 text-sm ml-2">{item.month}</span>
                            </div>
                            <div className="font-mono">${item.cost.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
