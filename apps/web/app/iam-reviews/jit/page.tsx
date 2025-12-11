'use client';
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import {
    Card, CardContent, Typography, TextField, Button,
    Select, MenuItem, FormControl, InputLabel, Alert
} from '@mui/material';

export default function JitRequestPage() {
    const [role, setRole] = useState('');
    const [duration, setDuration] = useState(60);
    const [justification, setJustification] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app, POST to /api/rbac/jit/request
        setSubmitted(true);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Request JIT Access</h1>

                {submitted ? (
                    <Alert severity="success" className="mb-4">
                        Request Submitted! An admin will review your request shortly.
                    </Alert>
                ) : (
                    <Card className="dark:bg-zinc-900 max-w-xl">
                        <CardContent>
                            <Typography variant="h6" className="mb-4">New Access Request</Typography>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormControl fullWidth>
                                    <InputLabel>Requested Role</InputLabel>
                                    <Select
                                        value={role}
                                        label="Requested Role"
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value="admin">Platform Admin</MenuItem>
                                        <MenuItem value="editor">Resource Editor</MenuItem>
                                        <MenuItem value="billing">Billing Manager</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="Duration (Minutes)"
                                    type="number"
                                    fullWidth
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                />

                                <TextField
                                    label="Business Justification"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    required
                                    value={justification}
                                    onChange={(e) => setJustification(e.target.value)}
                                />

                                <Button type="submit" variant="contained" size="large" fullWidth>
                                    Submit Request
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
