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
    Chip,
    LinearProgress,
    Box,
    Button,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function CompliancePage() {
    const [score, setScore] = useState<any | null>(null);
    const [results, setResults] = useState<any[]>([]);
    const [scanning, setScanning] = useState(false);
    const tenantId = 'demo-tenant';

    useEffect(() => {
        fetchScore();
    }, []);

    const fetchScore = async () => {
        try {
            const response = await fetch(`http://localhost:3001/compliance/score?tenantId=${tenantId}`);
            const data = await response.json();
            setScore(data);
        } catch (error) {
            console.error('Failed to fetch compliance score:', error);
        }
    };

    const runScan = async () => {
        setScanning(true);
        try {
            const response = await fetch(`http://localhost:3001/compliance/scan?tenantId=${tenantId}`, {
                method: 'POST',
            });
            const data = await response.json();
            setResults(data);
            await fetchScore();
        } catch (error) {
            console.error('Failed to run scan:', error);
        } finally {
            setScanning(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Compliance Dashboard</h1>
                    <Button
                        variant="contained"
                        startIcon={<PlayArrowIcon />}
                        onClick={runScan}
                        disabled={scanning}
                    >
                        {scanning ? 'Scanning...' : 'Run Scan'}
                    </Button>
                </div>

                {/* Compliance Score */}
                {score && (
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Compliance Score
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={score.score}
                                        color={score.score >= 80 ? 'success' : score.score >= 50 ? 'warning' : 'error'}
                                        sx={{ height: 10, borderRadius: 5 }}
                                    />
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {score.score.toFixed(0)}%
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {score.passed} passed, {score.failed} failed out of {score.total} checks
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                {/* Scan Results */}
                {results.length > 0 && (
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Scan Results
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Rule ID</TableCell>
                                        <TableCell>Resource</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Findings</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {results.map((result, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{result.ruleId}</TableCell>
                                            <TableCell>
                                                {result.resourceType} ({result.resourceId})
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={result.status}
                                                    size="small"
                                                    color={result.status === 'PASS' ? 'success' : 'error'}
                                                />
                                            </TableCell>
                                            <TableCell>{result.findings || '-'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
