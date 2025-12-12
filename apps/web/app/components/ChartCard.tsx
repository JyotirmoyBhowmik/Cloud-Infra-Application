'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Menu,
    MenuItem,
    Select,
    FormControl,
} from '@mui/material';
import { MoreVert, FileDownload, Share, Fullscreen } from '@mui/icons-material';
import { components } from '../design-system/tokens';

export interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    timeRange?: string;
    onTimeRangeChange?: (range: string) => void;
    timeRangeOptions?: { label: string; value: string }[];
    onExport?: () => void;
    onShare?: () => void;
    loading?: boolean;
    error?: string;
}

export default function ChartCard({
    title,
    subtitle,
    children,
    timeRange,
    onTimeRangeChange,
    timeRangeOptions = [
        { label: 'Last 7 days', value: '7d' },
        { label: 'Last 30 days', value: '30d' },
        { label: 'Last 90 days', value: '90d' },
        { label: 'Year to date', value: 'ytd' },
    ],
    onExport,
    onShare,
    loading = false,
    error,
}: ChartCardProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            elevation={0}
            className="border border-gray-200 rounded-lg overflow-hidden"
            style={{
                background: components.card.background,
            }}
        >
            <CardHeader
                title={
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                            {subtitle && (
                                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            {timeRange && onTimeRangeChange && (
                                <FormControl size="small" variant="outlined">
                                    <Select
                                        value={timeRange}
                                        onChange={(e) => onTimeRangeChange(e.target.value)}
                                        className="text-sm"
                                    >
                                        {timeRangeOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <IconButton size="small" onClick={handleMenuOpen}>
                                <MoreVert />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                {onExport && (
                                    <MenuItem
                                        onClick={() => {
                                            onExport();
                                            handleMenuClose();
                                        }}
                                    >
                                        <FileDownload className="mr-2" fontSize="small" />
                                        Export
                                    </MenuItem>
                                )}
                                {onShare && (
                                    <MenuItem
                                        onClick={() => {
                                            onShare();
                                            handleMenuClose();
                                        }}
                                    >
                                        <Share className="mr-2" fontSize="small" />
                                        Share
                                    </MenuItem>
                                )}
                                <MenuItem onClick={handleMenuClose}>
                                    <Fullscreen className="mr-2" fontSize="small" />
                                    Fullscreen
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                }
                className="border-b border-gray-200"
            />
            <CardContent className="p-6">
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                ) : error ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-red-500 font-medium">Error loading chart</p>
                            <p className="text-sm text-gray-500 mt-1">{error}</p>
                        </div>
                    </div>
                ) : (
                    children
                )}
            </CardContent>
        </Card>
    );
}
