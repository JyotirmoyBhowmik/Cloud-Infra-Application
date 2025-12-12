'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import {
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function AlertsPage() {
    const [rules, setRules] = useState([]);
    const [events, setEvents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newRule, setNewRule] = useState({
        name: '',
        metric_type: 'COST',
        threshold: 1000,
        operator: 'GT',
        notification_channels: [{ type: 'email', config: { to: 'admin@example.com' } }],
        tenant_id: 'demo-tenant',
        enabled: true,
    });

    const tenantId = 'demo-tenant';

    useEffect(() => {
        fetchRules();
        fetchEvents();
    }, []);

    const fetchRules = async () => {
        try {
            const response = await fetch(`http://localhost:3001/alerts/rules?tenantId=${tenantId}`);
            const data = await response.json();
            setRules(data);
        } catch (error) {
            console.error('Failed to fetch rules:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await fetch(`http://localhost:3001/alerts/events?tenantId=${tenantId}`);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    const handleCreateRule = async () => {
        try {
            await fetch('http://localhost:3001/alerts/rules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRule),
            });
            setOpenDialog(false);
            fetchRules();
        } catch (error) {
            console.error('Failed to create rule:', error);
        }
    };

    const handleAcknowledge = async (eventId: string) => {
        try {
            await fetch(`http://localhost:3001/alerts/events/${eventId}/acknowledge`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: 'demo-user' }),
            });
            fetchEvents();
        } catch (error) {
            console.error('Failed to acknowledge alert:', error);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Alert Management</h1>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
                        Create Rule
                    </Button>
                </div>

                <Grid container spacing={3}>
                    {/* Alert Rules */}
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Alert Rules
                                </Typography>
                                {rules.length === 0 ? (
                                    <Typography color="text.secondary">No rules configured</Typography>
                                ) : (
                                    rules.map((rule: any) => (
                                        <Card key={rule.id} variant="outlined" sx={{ mb: 2 }}>
                                            <CardContent>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <Typography variant="subtitle1">{rule.name}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {rule.metric_type} {rule.operator} {rule.threshold}
                                                        </Typography>
                                                    </div>
                                                    <Chip
                                                        label={rule.enabled ? 'Enabled' : 'Disabled'}
                                                        color={rule.enabled ? 'success' : 'default'}
                                                        size="small"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Alert Events */}
                    <Grid item xs={12} lg={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Recent Alerts
                                </Typography>
                                {events.length === 0 ? (
                                    <Typography color="text.secondary">No alerts triggered</Typography>
                                ) : (
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Message</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {events.slice(0, 10).map((event: any) => (
                                                <TableRow key={event.id}>
                                                    <TableCell>{event.message}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={event.status}
                                                            size="small"
                                                            color={event.status === 'ACTIVE' ? 'error' : 'default'}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        {event.status === 'ACTIVE' && (
                                                            <Button
                                                                size="small"
                                                                onClick={() => handleAcknowledge(event.id)}
                                                                startIcon={<CheckCircleIcon />}
                                                            >
                                                                Ack
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Create Rule Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Create Alert Rule</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Rule Name"
                            value={newRule.name}
                            onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Metric Type</InputLabel>
                            <Select
                                value={newRule.metric_type}
                                label="Metric Type"
                                onChange={(e) => setNewRule({ ...newRule, metric_type: e.target.value })}
                            >
                                <MenuItem value="COST">Cost</MenuItem>
                                <MenuItem value="CPU">CPU</MenuItem>
                                <MenuItem value="MEMORY">Memory</MenuItem>
                                <MenuItem value="DISK">Disk</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Operator</InputLabel>
                            <Select
                                value={newRule.operator}
                                label="Operator"
                                onChange={(e) => setNewRule({ ...newRule, operator: e.target.value })}
                            >
                                <MenuItem value="GT">Greater Than (&gt;)</MenuItem>
                                <MenuItem value="LT">Less Than (&lt;)</MenuItem>
                                <MenuItem value="EQ">Equal (=)</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            type="number"
                            label="Threshold"
                            value={newRule.threshold}
                            onChange={(e) => setNewRule({ ...newRule, threshold: Number(e.target.value) })}
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleCreateRule} variant="contained">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
