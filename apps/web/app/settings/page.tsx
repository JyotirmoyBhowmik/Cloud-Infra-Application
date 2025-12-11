'use client';
import React from 'react';
import Sidebar from '../components/Sidebar';
import { TextField, Button, Divider } from '@mui/material';

export default function SettingsPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Settings</h1>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow max-w-2xl">
                    <h2 className="text-lg font-semibold mb-4">Tenant Configuration</h2>
                    <div className="space-y-4">
                        <TextField label="Tenant Name" fullWidth defaultValue="Acme Corp" />
                        <TextField label="Billing Group" fullWidth defaultValue="Finance-Global" />
                        <Divider />
                        <h3 className="font-medium">Data Retention</h3>
                        <TextField label="Days" type="number" defaultValue={365} />
                        <Button variant="contained" color="primary">Save Changes</Button>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow max-w-2xl mt-6">
                    <h2 className="text-lg font-semibold mb-4">Cloud Connectors</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center border p-3 rounded">
                            <span className="font-bold">AWS (Account 123..89)</span>
                            <span className="text-green-500 text-sm">Active</span>
                        </div>
                        <div className="flex justify-between items-center border p-3 rounded">
                            <span className="font-bold">Azure (Sub abc..xyz)</span>
                            <span className="text-green-500 text-sm">Active</span>
                        </div>
                        <Button variant="outlined" className="w-full">+ Add Connector</Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
