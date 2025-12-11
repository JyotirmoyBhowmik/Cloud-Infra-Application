'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardContent, Button, Typography, Chip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function PlaybooksPage() {
    const [playbooks, setPlaybooks] = useState<any[]>([]);

    useEffect(() => {
        // Mock fetch
        setPlaybooks([
            { id: '1', name: 'Restart VM', description: 'Restarts a stuck VM', trigger_type: 'MANUAL', requires_approval: true },
            { id: '2', name: 'Scale ASG', description: 'Increases ASG capacity (AWS)', trigger_type: 'ALERT', requires_approval: false },
            { id: '3', name: 'Rotate Access Keys', description: 'Rotates IAM User Keys > 90 days', trigger_type: 'SCHEDULED', requires_approval: false },
        ]);
    }, []);

    const handleRun = (id: string) => {
        alert(`Triggering Playbook ID: ${id}`);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Automation & Playbooks</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playbooks.map((pb) => (
                        <Card key={pb.id} className="dark:bg-zinc-900 flex flex-col justify-between">
                            <CardContent>
                                <div className="flex justify-between items-start mb-2">
                                    <Typography variant="h6" component="div">{pb.name}</Typography>
                                    <Chip
                                        label={pb.trigger_type}
                                        size="small"
                                        color={pb.trigger_type === 'ALERT' ? 'error' : 'default'}
                                    />
                                </div>
                                <Typography variant="body2" color="text.secondary" className="mb-4">
                                    {pb.description}
                                </Typography>
                                {pb.requires_approval && (
                                    <Chip label="Requires Approval" size="small" variant="outlined" color="warning" className="mb-4" />
                                )}
                            </CardContent>
                            <div className="p-4 pt-0">
                                <Button
                                    variant="contained"
                                    startIcon={<PlayArrowIcon />}
                                    onClick={() => handleRun(pb.id)}
                                    fullWidth
                                >
                                    Run Playbook
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
