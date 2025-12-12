'use client';
import React, { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    TextField,
    IconButton,
    Chip,
    Box,
    Paper,
} from '@mui/material';
import {
    FileDownload,
    FilterList,
    Search,
} from '@mui/icons-material';

export interface Column<T> {
    id: keyof T | string;
    label: string;
    minWidth?: number;
    align?: 'left' | 'right' | 'center';
    format?: (value: any, row: T) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
    exportable?: boolean;
    searchable?: boolean;
    defaultRowsPerPage?: number;
    stickyHeader?: boolean;
}

export default function DataTable<T extends Record<string, any>>({
    columns,
    data,
    onRowClick,
    exportable = true,
    searchable = true,
    defaultRowsPerPage = 10,
    stickyHeader = true,
}: DataTableProps<T>) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [orderBy, setOrderBy] = useState<keyof T | string>('');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState('');

    // Sorting logic
    const handleSort = (columnId: keyof T | string) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
    };

    // Filtered and sorted data
    const processedData = useMemo(() => {
        let result = [...data];

        // Apply search filter
        if (searchQuery) {
            result = result.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        // Apply sorting
        if (orderBy) {
            result.sort((a, b) => {
                const aVal = a[orderBy];
                const bVal = b[orderBy];

                if (aVal < bVal) return order === 'asc' ? -1 : 1;
                if (aVal > bVal) return order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, searchQuery, orderBy, order]);

    // Pagination
    const paginatedData = useMemo(() => {
        return processedData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    }, [processedData, page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Export to CSV
    const handleExport = () => {
        const headers = columns.map((col) => col.label).join(',');
        const rows = processedData.map((row) =>
            columns
                .map((col) => {
                    const value = row[col.id];
                    return typeof value === 'string' && value.includes(',')
                        ? `"${value}"`
                        : value;
                })
                .join(',')
        );

        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export-${Date.now()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Paper elevation={0} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Toolbar */}
            {(searchable || exportable) && (
                <Box className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    {searchable && (
                        <TextField
                            size="small"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: <Search className="mr-2 text-gray-400" />,
                            }}
                            className="w-64"
                        />
                    )}
                    <div className="flex items-center space-x-2">
                        {exportable && (
                            <IconButton size="small" onClick={handleExport} title="Export to CSV">
                                <FileDownload />
                            </IconButton>
                        )}
                    </div>
                </Box>
            )}

            {/* Table */}
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader={stickyHeader}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={String(column.id)}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    className="bg-gray-50 font-semibold text-gray-700"
                                >
                                    {column.sortable !== false ? (
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={() => handleSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center" className="py-8">
                                    <div className="text-gray-500">No data available</div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((row, index) => (
                                <TableRow
                                    hover
                                    key={index}
                                    onClick={() => onRowClick?.(row)}
                                    className={onRowClick ? 'cursor-pointer' : ''}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={String(column.id)} align={column.align}>
                                                {column.format ? column.format(value, row) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={processedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="border-t border-gray-200"
            />
        </Paper>
    );
}
