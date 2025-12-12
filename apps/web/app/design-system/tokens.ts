/**
 * Enterprise Design System Tokens
 * Defines colors, spacing, typography, and component standards
 * Aligned with WCAG 2.1 AA accessibility requirements
 */

export const designTokens = {
    // Color Palette
    colors: {
        // Primary
        primary: {
            50: '#EFF6FF',
            100: '#DBEAFE',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#1D4ED8',
        },

        // Neutrals
        white: '#FFFFFF',
        gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
        },

        // Status Colors
        status: {
            active: '#10B981',    // Green
            warning: '#F59E0B',   // Yellow
            error: '#EF4444',     // Red
            inactive: '#6B7280',  // Gray
        },

        // Semantic
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
    },

    // Typography
    typography: {
        fontFamily: {
            sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            mono: "'Fira Code', 'Courier New', monospace",
        },
        fontSize: {
            xs: '0.75rem',      // 12px
            sm: '0.8125rem',    // 13px
            base: '0.875rem',   // 14px
            md: '1rem',         // 16px
            lg: '1.125rem',     // 18px
            xl: '1.25rem',      // 20px
            '2xl': '1.5rem',    // 24px
            '3xl': '2rem',      // 32px
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },

    // Spacing (8px base unit)
    spacing: {
        0: '0',
        1: '0.25rem',   // 4px
        2: '0.5rem',    // 8px
        3: '0.75rem',   // 12px
        4: '1rem',      // 16px
        6: '1.5rem',    // 24px
        8: '2rem',      // 32px
        10: '2.5rem',   // 40px
        12: '3rem',     // 48px
        16: '4rem',     // 64px
    },

    // Layout Dimensions
    layout: {
        headerHeight: '64px',
        sidebarWidth: '256px',
        sidebarCollapsedWidth: '64px',
        minContentWidth: '1024px',
    },

    // Z-Index Layers
    zIndex: {
        content: 1,
        dropdown: 100,
        sticky: 200,
        sidebar: 900,
        header: 1000,
        modal: 1100,
        toast: 1200,
    },

    // Border Radius
    borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
    },

    // Shadows
    boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },

    // Transitions
    transitions: {
        fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
        slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Icon Sizes
    iconSize: {
        sm: '16px',
        md: '20px',
        lg: '24px',
        xl: '32px',
    },
};

// Component-specific styles
export const componentStyles = {
    // Header
    header: {
        height: '64px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '0 24px',
        zIndex: 1000,
    },

    // Sidebar
    sidebar: {
        width: '256px',
        collapsedWidth: '64px',
        background: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 900,
    },

    // Buttons
    button: {
        primary: {
            background: '#3B82F6',
            hover: '#2563EB',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '0.375rem',
        },
        secondary: {
            background: '#F3F4F6',
            hover: '#E5E7EB',
            color: '#374151',
            padding: '8px 16px',
            borderRadius: '0.375rem',
        },
    },

    // Cards
    card: {
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '0.5rem',
        padding: '16px',
        shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        hoverShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },

    // Status Badges
    badge: {
        active: {
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#10B981',
            border: '1px solid rgba(16, 185, 129, 0.2)',
        },
        warning: {
            background: 'rgba(245, 158, 11, 0.1)',
            color: '#F59E0B',
            border: '1px solid rgba(245, 158, 11, 0.2)',
        },
        error: {
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#EF4444',
            border: '1px solid rgba(239, 68, 68, 0.2)',
        },
        inactive: {
            background: 'rgba(107, 114, 128, 0.1)',
            color: '#6B7280',
            border: '1px solid rgba(107, 114, 128, 0.2)',
        },
    },
};

export default designTokens;
