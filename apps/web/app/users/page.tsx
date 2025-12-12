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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [roles, setRoles] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    const tenantId = 'demo-tenant';

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        // Mock user data - in production, fetch from /api/users
        setUsers([
            { id: 'u1', email: 'admin@acme.com', name: 'Admin User', roles: ['Admin'] },
            { id: 'u2', email: 'viewer@acme.com', name: 'Viewer User', roles: ['Viewer'] },
            { id: 'u3', email: 'finops@acme.com', name: 'FinOps Manager', roles: ['FinOps Manager'] },
        ]);
    };

    const fetchRoles = async () => {
        // Fetch roles from RBAC service
        setRoles([
            { id: 'r1', name: 'Admin' },
            { id: 'r2', name: 'Viewer' },
            { id: 'r3', name: 'FinOps Manager' },
            { id: 'r4', name: 'Editor' },
        ]);
    };

    const handleAssignRole = async () => {
        if (!selectedUser || !selectedRole) return;

        try {
            await fetch('http://localhost:3001/rbac/assign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tenantId,
                    userId: selectedUser,
                    roleId: selectedRole,
                }),
            });
            setOpenDialog(false);
            fetchUsers();
        } catch (error) {
            console.error('Failed to assign role:', error);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <Button
                        variant="contained"
                        startIcon={<PersonAddIcon />}
                        onClick={() => setOpenDialog(true)}
                    >
                        Assign Role
                    </Button>
                </div>

                <Card>
                    <CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Roles</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.roles.map((role: string, idx: number) => (
                                                <Chip key={idx} label={role} size="small" sx={{ mr: 1 }} />
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Assign Role Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Assign Role to User</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>User</InputLabel>
                            <Select
                                value={selectedUser}
                                label="User"
                                onChange={(e) => setSelectedUser(e.target.value)}
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={selectedRole}
                                label="Role"
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleAssignRole} variant="contained">
                            Assign
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
