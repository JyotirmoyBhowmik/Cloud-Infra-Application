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
    LinearProgress,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Budget {
    id: string;
    name: string;
    amount: number;
    period: string;
    scope: string;
    alert_thresholds: number[];
}

interface BudgetStatus {
    budget: Budget;
    currentSpend: number;
    percentageUsed: number;
    remaining: number;
}

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [budgetStatuses, setBudgetStatuses] = useState<{ [key: string]: BudgetStatus }>({});
    const [openDialog, setOpenDialog] = useState(false);
    const [newBudget, setNewBudget] = useState({
        name: '',
        amount: 10000,
        period: 'MONTHLY',
        scope: 'provider:aws',
        alert_thresholds: [80, 100],
        tenant_id: 'demo-tenant',
    });

    const tenantId = 'demo-tenant';

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await fetch(`http://localhost:3001/budgets?tenantId=${tenantId}`);
            const data = await response.json();
            setBudgets(data);

            // Fetch status for each budget
            for (const budget of data) {
                fetchBudgetStatus(budget.id);
            }
        } catch (error) {
            console.error('Failed to fetch budgets:', error);
        }
    };

    const fetchBudgetStatus = async (budgetId: string) => {
        try {
            const response = await fetch(`http://localhost:3001/budgets/${budgetId}/status`);
            const status = await response.json();
            setBudgetStatuses((prev) => ({ ...prev, [budgetId]: status }));
        } catch (error) {
            console.error('Failed to fetch budget status:', error);
        }
    };

    const handleCreate = async () => {
        try {
            await fetch('http://localhost:3001/budgets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBudget),
            });
            setOpenDialog(false);
            fetchBudgets();
        } catch (error) {
            console.error('Failed to create budget:', error);
        }
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 100) return 'error';
        if (percentage >= 80) return 'warning';
        return 'success';
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Budget Management</h1>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenDialog(true)}
                    >
                        Create Budget
                    </Button>
                </div>

                <Grid container spacing={3}>
                    {budgets.map((budget) => {
                        const status = budgetStatuses[budget.id];
                        return (
                            <Grid item xs={12} md={6} key={budget.id}>
                                <Card>
                                    <CardContent>
                                        <div className="flex justify-between items-start mb-3">
                                            <Typography variant="h6">{budget.name}</Typography>
                                            <Chip label={budget.period} size="small" color="primary" />
                                        </div>

                                        {status && (
                                            <>
                                                <Box sx={{ mb: 2 }}>
                                                    <div className="flex justify-between mb-1">
                                                        <Typography variant="body2" color="text.secondary">
                                                            ${status.currentSpend.toFixed(2)} / ${status.budget.amount}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {status.percentageUsed.toFixed(1)}%
                                                        </Typography>
                                                    </div>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={Math.min(status.percentageUsed, 100)}
                                                        color={getProgressColor(status.percentageUsed)}
                                                    />
                                                </Box>

                                                <Typography variant="body2" color="text.secondary">
                                                    Remaining: ${status.remaining.toFixed(2)}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                    Scope: {budget.scope}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Alerts at: {budget.alert_thresholds.join('%, ')}%
                                                </Typography>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Create Budget Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Create New Budget</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Budget Name"
                            value={newBudget.name}
                            onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Amount ($)"
                            value={newBudget.amount}
                            onChange={(e) => setNewBudget({ ...newBudget, amount: Number(e.target.value) })}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Period</InputLabel>
                            <Select
                                value={newBudget.period}
                                label="Period"
                                onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value })}
                            >
                                <MenuItem value="MONTHLY">Monthly</MenuItem>
                                <MenuItem value="QUARTERLY">Quarterly</MenuItem>
                                <MenuItem value="ANNUAL">Annual</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Scope</InputLabel>
                            <Select
                                value={newBudget.scope}
                                label="Scope"
                                onChange={(e) => setNewBudget({ ...newBudget, scope: e.target.value })}
                            >
                                <MenuItem value="provider:aws">AWS</MenuItem>
                                <MenuItem value="provider:azure">Azure</MenuItem>
                                <MenuItem value="provider:gcp">GCP</MenuItem>
                                <MenuItem value="">All Providers</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handleCreate} variant="contained">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
