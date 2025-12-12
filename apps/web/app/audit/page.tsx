'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
} from '@mui/material';

export default function AuditPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [filter, setFilter] = useState('');
    const tenantId = 'demo-tenant';

    useEffect(() => {
        fetchAuditEvents();
    }, []);

    const fetchAuditEvents = async () => {
        try {
            const response = await fetch(`http://localhost:3001/audit?tenantId=${tenantId}`);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch audit events:', error);
            // Mock data for demonstration
            setEvents([
                {
                    id: 1,
                    actor: 'admin@acme.com',
                    action: 'CREATE',
                    resource_type: 'Budget',
                    resource_id: 'b123',
                    timestamp: new Date(),
                    status: 'SUCCESS',
                },
                {
                    id: 2,
                    actor: 'user@acme.com',
                    action: 'UPDATE',
                    resource_type: 'AlertRule',
                    resource_id: 'ar456',
                    timestamp: new Date(Date.now() - 3600000),
                    status: 'SUCCESS',
                },
                {
                    id: 3,
                    actor: 'admin@acme.com',
                    action: 'DELETE',
                    resource_type: 'CloudAccount',
                    resource_id: 'ca789',
                    timestamp: new Date(Date.now() - 7200000),
                    status: 'FAILED',
                },
            ]);
        }
    };

    const filteredEvents = events.filter((event) =>
        filter ? event.action === filter : true
    );

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>

                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <FormControl fullWidth>
                            <InputLabel>Filter by Action</InputLabel>
                            <Select
                                value={filter}
                                label="Filter by Action"
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="CREATE">Create</MenuItem>
                                <MenuItem value="UPDATE">Update</MenuItem>
                                <MenuItem value="DELETE">Delete</MenuItem>
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Timestamp</TableCell>
                                    <TableCell>Actor</TableCell>
                                    <TableCell>Action</TableCell>
                                    <TableCell>Resource</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEvents.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell>
                                            {new Date(event.timestamp).toLocaleString()}
                                        </TableCell>
                                        <TableCell>{event.actor}</TableCell>
                                        <TableCell>
                                            <Chip label={event.action} size="small" color="primary" />
                                        </TableCell>
                                        <TableCell>
                                            {event.resource_type} ({event.resource_id})
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={event.status}
                                                size="small"
                                                color={event.status === 'SUCCESS' ? 'success' : 'error'}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
