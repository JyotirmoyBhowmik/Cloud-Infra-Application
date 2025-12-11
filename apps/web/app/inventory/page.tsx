'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';

// Define Interface matching the API response
interface InventoryEntity {
    id: string;
    provider: string;
    native_id: string;
    type: string;
    state: string;
    tags: Record<string, string>;
}

export default function InventoryPage() {
    const [data, setData] = useState<InventoryEntity[]>([]);

    useEffect(() => {
        // In a real app, this would fetch from the NestJS API
        // fetch('http://localhost:3001/inventory').then(res => res.json()).then(setData);

        // Using mock data for demo since backend might not be running
        setData([
            { id: '1', provider: 'aws', native_id: 'i-01923', type: 'ec2_instance', state: 'running', tags: { Env: 'Prod' } },
            { id: '2', provider: 'azure', native_id: 'vm-db-01', type: 'azure_vm', state: 'stopped', tags: { Env: 'Dev' } },
        ]);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Global Inventory</h1>

                <TableContainer component={Paper} className="dark:bg-zinc-900">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Provider</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Resource ID</TableCell>
                                <TableCell>State</TableCell>
                                <TableCell>Tags</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Chip label={row.provider} size="small" color={row.provider === 'aws' ? 'warning' : 'primary'} />
                                    </TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell className="font-mono text-xs">{row.native_id}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.state === 'running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {row.state}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {Object.entries(row.tags || {}).map(([k, v]) => (
                                            <span key={k} className="text-xs text-gray-500 mr-2">{k}:{v}</span>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
