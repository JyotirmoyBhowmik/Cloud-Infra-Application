/**
 * Status Badge Component
 * 
 * Color codes (exact specification):
 * - Active: Green (#10B981)
 * - Warning/Anomalous: Yellow (#F59E0B)
 * - Error: Red (#EF4444)
 * - Inactive: Gray (#6B7280)
 */

import React from 'react';
import { CheckCircle, Warning, Error, Cancel } from '@mui/icons-material';
import { components } from '../design-system/tokens';

export type StatusType = 'active' | 'warning' | 'error' | 'inactive';

interface StatusBadgeProps {
    status: StatusType;
    label?: string;
    showIcon?: boolean;
}

const statusConfig = {
    active: {
        icon: <CheckCircle className="w-4 h-4" />,
        defaultLabel: 'Active',
        styles: components.badge.active,
    },
    warning: {
        icon: <Warning className="w-4 h-4" />,
        defaultLabel: 'Anomalous',
        styles: components.badge.warning,
    },
    error: {
        icon: <Error className="w-4 h-4" />,
        defaultLabel: 'Error',
        styles: components.badge.error,
    },
    inactive: {
        icon: <Cancel className="w-4 h-4" />,
        defaultLabel: 'Inactive',
        styles: components.badge.inactive,
    },
};

export default function StatusBadge({ status, label, showIcon = true }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{
                backgroundColor: config.styles.background,
                color: config.styles.color,
                border: config.styles.border,
            }}
        >
            {showIcon && <span className="mr-1">{config.icon}</span>}
            {label || config.defaultLabel}
        </span>
    );
}
