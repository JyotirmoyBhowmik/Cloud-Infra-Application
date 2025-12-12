'use client';
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export interface ComplianceScoreGaugeProps {
    score: number; // 0-100
    label?: string;
    size?: number;
    showLabel?: boolean;
}

export default function ComplianceScoreGauge({
    score,
    label = 'Compliance Score',
    size = 200,
    showLabel = true,
}: ComplianceScoreGaugeProps) {
    // Determine color based on score
    const getColor = (score: number): string => {
        if (score >= 90) return '#10B981'; // Green
        if (score >= 70) return '#F59E0B'; // Yellow
        return '#EF4444'; // Red
    };

    // Determine status text
    const getStatus = (score: number): string => {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Good';
        if (score >= 70) return 'Fair';
        if (score >= 60) return 'Poor';
        return 'Critical';
    };

    const color = getColor(score);
    const status = getStatus(score);

    return (
        <div className="flex flex-col items-center">
            <Box
                sx={{
                    position: 'relative',
                    display: 'inline-flex',
                    width: size,
                    height: size,
                }}
            >
                {/* Background circle */}
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={size}
                    thickness={4}
                    sx={{
                        color: '#E5E7EB',
                        position: 'absolute',
                    }}
                />
                {/* Score circle */}
                <CircularProgress
                    variant="determinate"
                    value={score}
                    size={size}
                    thickness={4}
                    sx={{
                        color: color,
                        position: 'absolute',
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        },
                    }}
                />
                {/* Center text */}
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="h3"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            color: color,
                        }}
                    >
                        {score}%
                    </Typography>
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{
                            color: '#6B7280',
                            fontWeight: 500,
                        }}
                    >
                        {status}
                    </Typography>
                </Box>
            </Box>
            {showLabel && (
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 2,
                        color: '#374151',
                        fontWeight: 500,
                    }}
                >
                    {label}
                </Typography>
            )}
        </div>
    );
}
