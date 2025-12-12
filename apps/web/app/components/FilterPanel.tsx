'use client';
import React, { useState } from 'react';
import {
    Drawer,
    IconButton,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Autocomplete,
    Divider,
} from '@mui/material';
import { FilterList, Close, Refresh } from '@mui/icons-material';

export interface FilterOption {
    id: string;
    label: string;
    type: 'select' | 'multiselect' | 'text' | 'date' | 'daterange';
    options?: { label: string; value: string }[];
    value?: any;
}

export interface FilterPanelProps {
    filters: FilterOption[];
    onApply: (filters: Record<string, any>) => void;
    onReset: () => void;
}

export default function FilterPanel({ filters, onApply, onReset }: FilterPanelProps) {
    const [open, setOpen] = useState(false);
    const [filterValues, setFilterValues] = useState<Record<string, any>>(() => {
        const initial: Record<string, any> = {};
        filters.forEach((filter) => {
            initial[filter.id] = filter.value || (filter.type === 'multiselect' ? [] : '');
        });
        return initial;
    });

    const handleFilterChange = (filterId: string, value: any) => {
        setFilterValues((prev) => ({
            ...prev,
            [filterId]: value,
        }));
    };

    const handleApply = () => {
        onApply(filterValues);
        setOpen(false);
    };

    const handleReset = () => {
        const reset: Record<string, any> = {};
        filters.forEach((filter) => {
            reset[filter.id] = filter.type === 'multiselect' ? [] : '';
        });
        setFilterValues(reset);
        onReset();
        setOpen(false);
    };

    const activeFiltersCount = Object.values(filterValues).filter((value) => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== '' && value != null;
    }).length;

    return (
        <>
            {/* Filter Button */}
            <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setOpen(true)}
                className="relative"
            >
                Filters
                {activeFiltersCount > 0 && (
                    <Chip
                        label={activeFiltersCount}
                        size="small"
                        color="primary"
                        className="ml-2"
                        style={{ height: 20, minWidth: 20 }}
                    />
                )}
            </Button>

            {/* Filter Drawer */}
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    style: { width: 400 },
                }}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                        <IconButton size="small" onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </div>

                    {/* Filter Controls */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {filters.map((filter) => (
                            <div key={filter.id}>
                                {filter.type === 'select' && (
                                    <FormControl fullWidth size="small">
                                        <InputLabel>{filter.label}</InputLabel>
                                        <Select
                                            value={filterValues[filter.id] || ''}
                                            label={filter.label}
                                            onChange={(e) =>
                                                handleFilterChange(filter.id, e.target.value)
                                            }
                                        >
                                            <MenuItem value="">All</MenuItem>
                                            {filter.options?.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                                {filter.type === 'multiselect' && (
                                    <Autocomplete
                                        multiple
                                        size="small"
                                        options={filter.options || []}
                                        getOptionLabel={(option) => option.label}
                                        value={
                                            filter.options?.filter((opt) =>
                                                (filterValues[filter.id] || []).includes(opt.value)
                                            ) || []
                                        }
                                        onChange={(_, newValue) =>
                                            handleFilterChange(
                                                filter.id,
                                                newValue.map((v) => v.value)
                                            )
                                        }
                                        renderInput={(params) => (
                                            <TextField {...params} label={filter.label} />
                                        )}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    label={option.label}
                                                    size="small"
                                                    {...getTagProps({ index })}
                                                    key={option.value}
                                                />
                                            ))
                                        }
                                    />
                                )}

                                {filter.type === 'text' && (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label={filter.label}
                                        value={filterValues[filter.id] || ''}
                                        onChange={(e) =>
                                            handleFilterChange(filter.id, e.target.value)
                                        }
                                    />
                                )}

                                {filter.type === 'date' && (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="date"
                                        label={filter.label}
                                        InputLabelProps={{ shrink: true }}
                                        value={filterValues[filter.id] || ''}
                                        onChange={(e) =>
                                            handleFilterChange(filter.id, e.target.value)
                                        }
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <Divider />

                    {/* Footer Actions */}
                    <div className="p-4 space-y-2">
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleApply}
                        >
                            Apply Filters
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Refresh />}
                            onClick={handleReset}
                        >
                            Reset All
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    );
}
