/**
 * Enterprise Data Table Component
 * 
 * Features:
 * - Sortable columns
 * - Provider-tagged rows
 * - Action buttons (View/Edit/Delete)
 * - Pagination
 * - Export functionality
 * - Row selection
 */

'use client';
import React, { useState } from 'react';
import {
    ArrowUpward,
    ArrowDownward,
    MoreVert,
    FileDownload,
    Visibility,
    Edit,
    Delete,
} from '@mui/icons-material';
import { colors, components } from '../design-system/tokens';
import StatusBadge, { StatusType } from './StatusBadge';

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: any) => React.ReactNode;
}

export interface TableAction {
    label: string;
    icon: React.ReactNode;
    onClick: (row: any) => void;
    variant?: 'default' | 'danger';
}

interface DataTableProps {
    columns: TableColumn[];
    data: any[];
    actions?: TableAction[];
    onRowClick?: (row: any) => void;
    showPagination?: boolean;
    showExport?: boolean;
    pageSize?: number;
}

export default function DataTable({
    columns,
    data,
    actions,
    onRowClick,
    showPagination = true,
    showExport = true,
    pageSize = 10,
}: DataTableProps) {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [showActionsMenu, setShowActionsMenu] = useState<number | null>(null);

    // Sorting logic
    const handleSort = (columnKey: string) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    // Sorted and paginated data
    let processedData = [...data];
    if (sortColumn) {
        processedData.sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];
            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const totalPages = Math.ceil(processedData.length / pageSize);
    const paginatedData = showPagination
        ? processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        : processedData;

    // Export to CSV
    const handleExport = () => {
        const headers = columns.map(col => col.label).join(',');
        const rows = data.map(row =>
            columns.map(col => row[col.key] || '').join(',')
        );
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.csv';
        a.click();
    };

    return (
        <div>
            {/* Table Header Actions */}
            {showExport && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleExport}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <FileDownload className="w-4 h-4 mr-2" />
                        Export CSV
                    </button>
                </div>
            )}

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                            }`}
                                        onClick={() => column.sortable && handleSort(column.key)}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>{column.label}</span>
                                            {column.sortable && sortColumn === column.key && (
                                                <span>
                                                    {sortDirection === 'asc' ? (
                                                        <ArrowUpward className="w-4 h-4" />
                                                    ) : (
                                                        <ArrowDownward className="w-4 h-4" />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {actions && actions.length > 0 && (
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''
                                        }`}
                                    onClick={() => onRowClick && onRowClick(row)}
                                >
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </td>
                                    ))}
                                    {actions && actions.length > 0 && (
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowActionsMenu(showActionsMenu === index ? null : index);
                                                    }}
                                                    className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                                                >
                                                    <MoreVert className="w-5 h-5 text-gray-500" />
                                                </button>

                                                {showActionsMenu === index && (
                                                    <>
                                                        <div
                                                            className="fixed inset-0 z-10"
                                                            onClick={() => setShowActionsMenu(null)}
                                                        />
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                                                            {actions.map((action, i) => (
                                                                <button
                                                                    key={i}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        action.onClick(row);
                                                                        setShowActionsMenu(null);
                                                                    }}
                                                                    className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 hover:bg-gray-50 ${action.variant === 'danger' ? 'text-red-600' : 'text-gray-700'
                                                                        }`}
                                                                >
                                                                    <span>{action.icon}</span>
                                                                    <span>{action.label}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {showPagination && totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {(currentPage - 1) * pageSize + 1} to{' '}
                            {Math.min(currentPage * pageSize, data.length)} of {data.length} results
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 text-sm border rounded-md ${page === currentPage
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
