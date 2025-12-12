'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    TextField,
    Typography,
    Paper,
    Card,
    CardContent,
    Alert,
} from '@mui/material';

const steps = ['Organization Details', 'Review & Create'];

export default function OnboardingPage() {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        billing_group: '',
        data_retention_days: 365,
        userId: 'demo-user-123', // In real app, get from auth context
    });

    const handleNext = () => {
        if (activeStep === 0 && !formData.name) {
            setError('Organization name is required');
            return;
        }
        setError('');
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/tenants/onboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to create tenant');

            // Redirect to dashboard on success
            router.push('/dashboard');
        } catch (err) {
            setError('Failed to create organization. Please try again.');
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ mt: 3, maxWidth: 500 }}>
                        <TextField
                            fullWidth
                            required
                            label="Organization Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            margin="normal"
                            placeholder="e.g., Acme Corporation"
                        />
                        <TextField
                            fullWidth
                            label="Billing Group (Optional)"
                            value={formData.billing_group}
                            onChange={(e) => setFormData({ ...formData, billing_group: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Data Retention (Days)"
                            value={formData.data_retention_days}
                            onChange={(e) => setFormData({ ...formData, data_retention_days: Number(e.target.value) })}
                            margin="normal"
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Review Your Organization
                        </Typography>
                        <Card variant="outlined" sx={{ mt: 2 }}>
                            <CardContent>
                                <Typography><strong>Name:</strong> {formData.name}</Typography>
                                <Typography><strong>Billing Group:</strong> {formData.billing_group || 'None'}</Typography>
                                <Typography><strong>Data Retention:</strong> {formData.data_retention_days} days</Typography>
                            </CardContent>
                        </Card>
                        <Alert severity="info" sx={{ mt: 2 }}>
                            A default Admin role will be created and assigned to you automatically.
                        </Alert>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black p-4">
            <Paper elevation={3} sx={{ p: 4, maxWidth: 700, width: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Welcome to CloudGov
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                    Let's set up your organization
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {renderStepContent(activeStep)}

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                        variant="contained"
                        onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    >
                        {activeStep === steps.length - 1 ? 'Create Organization' : 'Next'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
