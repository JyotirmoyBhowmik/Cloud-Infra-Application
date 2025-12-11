'use client';
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardContent, Typography, Chip, Button } from '@mui/material';

export default function SupportPage() {
    const tickets = [
        { id: 'INC-1001', title: 'High Latency in US-East', status: 'In Progress', priority: 'High', service: 'AWS EC2' },
        { id: 'REQ-2044', title: 'Request Quota Increase', status: 'Open', priority: 'Medium', service: 'GCP Compute' },
        { id: 'INC-1002', title: 'Backup Failure', status: 'Resolved', priority: 'Critical', service: 'Azure Backup' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Support & Ticketing</h1>

                <div className="flex justify-between mb-4">
                    <div className="text-gray-500">Integrated with ServiceNow / Jira</div>
                    <Button variant="contained" color="primary">New Ticket</Button>
                </div>

                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <Card key={ticket.id} className="dark:bg-zinc-900">
                            <CardContent className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Typography variant="h6">{ticket.id}</Typography>
                                        <Chip label={ticket.priority} size="small" color={ticket.priority === 'Critical' ? 'error' : 'secondary'} />
                                    </div>
                                    <Typography color="text.secondary">{ticket.title}</Typography>
                                    <Typography variant="caption" className="text-gray-400">{ticket.service}</Typography>
                                </div>
                                <Chip label={ticket.status} variant="outlined" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
