'use client';
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardContent, Typography, Button, Avatar, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function IamReviewsPage() {
    const reviews = [
        { user: 'alice@example.com', role: 'Admin', resource: 'All Resources', status: 'Pending' },
        { user: 'bob@example.com', role: 'Viewer', resource: 'Billing Reports', status: 'Approved' },
        { user: 'service-app-01', role: 'Contributor', resource: 'AKS Cluster', status: 'Pending' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">IAM Access Reviews</h1>

                <Card className="dark:bg-zinc-900 mb-8">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Q4 2025 Attestation Campaign</Typography>
                        <div className="flex items-center gap-4 mb-2">
                            <LinearProgress variant="determinate" value={33} className="w-full h-4 rounded" />
                            <span className="text-sm font-bold">33% Complete</span>
                        </div>
                        <Typography variant="body2" color="text.secondary">Deadline: Dec 31, 2025</Typography>
                    </CardContent>
                </Card>

                <h2 className="text-xl font-bold mb-4">Pending Reviews</h2>
                <div className="grid gap-4">
                    {reviews.map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-zinc-900 p-4 rounded shadow flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar>{item.user[0].toUpperCase()}</Avatar>
                                <div>
                                    <div className="font-bold">{item.user}</div>
                                    <div className="text-sm text-gray-500">{item.role} on {item.resource}</div>
                                </div>
                            </div>
                            {item.status === 'Pending' ? (
                                <div className="flex gap-2">
                                    <Button startIcon={<CheckCircleIcon />} color="success" variant="outlined">Approve</Button>
                                    <Button startIcon={<CancelIcon />} color="error" variant="outlined">Revoke</Button>
                                </div>
                            ) : (
                                <div className="text-green-500 flex items-center gap-1">
                                    <CheckCircleIcon fontSize="small" /> Approved
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
