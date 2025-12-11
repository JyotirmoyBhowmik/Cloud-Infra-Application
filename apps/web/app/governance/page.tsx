'use client';
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardContent, Typography, LinearProgress } from '@mui/material';

export default function GovernancePage() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Governance & Compliance</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="dark:bg-zinc-900 border-l-4 border-green-500">
                        <CardContent>
                            <Typography color="text.secondary">CIS Benchmark</Typography>
                            <Typography variant="h4">85%</Typography>
                            <LinearProgress variant="determinate" value={85} color="success" className="mt-2" />
                        </CardContent>
                    </Card>
                    <Card className="dark:bg-zinc-900 border-l-4 border-yellow-500">
                        <CardContent>
                            <Typography color="text.secondary">SOC 2 Type II</Typography>
                            <Typography variant="h4">72%</Typography>
                            <LinearProgress variant="determinate" value={72} color="warning" className="mt-2" />
                        </CardContent>
                    </Card>
                    <Card className="dark:bg-zinc-900 border-l-4 border-red-500">
                        <CardContent>
                            <Typography color="text.secondary">Policy Violations</Typography>
                            <Typography variant="h4">12</Typography>
                            <Typography variant="caption" color="error">Critical: 3</Typography>
                        </CardContent>
                    </Card>
                </div>

                <h2 className="text-xl font-bold mb-4">Active Policy Actions</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-white dark:bg-zinc-900 rounded shadow">
                        <div className="font-bold text-red-500">Storage Accounts with Public Access</div>
                        <div className="text-sm text-gray-500">Detected 3 resources in Azure (sub-123)</div>
                        <button className="mt-2 text-blue-500 text-sm hover:underline">View Remediation</button>
                    </div>
                    <div className="p-4 bg-white dark:bg-zinc-900 rounded shadow">
                        <div className="font-bold text-yellow-500">AWS IAM Roles with AdminAccess</div>
                        <div className="text-sm text-gray-500">Detected 5 roles in AWS (acct-999)</div>
                        <button className="mt-2 text-blue-500 text-sm hover:underline">View Remediation</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
