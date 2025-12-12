/**
 * Enterprise Design System - Color Tokens
 * Exact specifications from enterprise UI/UX standards
 * WCAG 2.1 AA compliant color contrasts
 */

export const colors = {
    // Base Colors
    white: '#FFFFFF',
    black: '#000000',

    // Grays (Primary neutral palette)
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

    // Status Colors (from specification)
    status: {
        active: '#10B981',     // Green - Active resources
        warning: '#F59E0B',    // Yellow - Anomalous
        error: '#EF4444',      // Red - Error state
        inactive: '#6B7280',   // Gray - Inactive
    },

    // Semantic Colors
    primary: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
    },

    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
};

/**
 * Typography System
 */
export const typography = {
    fontFamily: {
        sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        mono: "'Fira Code', 'Courier New', monospace",
    },

    fontSize: {
        xs: '0.75rem',      // 12px
        sm: '0.8125rem',    // 13px - Breadcrumb
        base: '0.875rem',   // 14px
        md: '1rem',         // 16px - Subtitle
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px - Icons
        '2xl': '1.5rem',    // 24px
        '3xl': '2rem',      // 32px - H1 Title
    },

    fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },
};

/**
 * Layout Dimensions (Exact specifications)
 */
export const layout = {
    header: {
        height: '64px',
        padding: '24px',
    },

    sidebar: {
        widthExpanded: '256px',
        widthCollapsed: '64px',
        transition: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },

    content: {
        minWidth: '1024px',
    },
};

/**
 * Z-Index Layers (Exact specifications)
 */
export const zIndex = {
    content: 1,
    dropdown: 100,
    sticky: 200,
    sidebar: 900,
    header: 1000,
    modal: 1100,
    toast: 1200,
};

/**
 * Spacing Scale (8px grid system)
 */
export const spacing = {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
};

/**
 * Border Radius
 */
export const borderRadius = {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    full: '9999px',
};

/**
 * Shadows
 */
export const boxShadow = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

/**
 * Transitions (Exact specification: 300ms)
 */
export const transitions = {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
};

/**
 * Icon Sizes
 */
export const iconSize = {
    sm: '16px',
    md: '20px',  // Specification default
    lg: '24px',
    xl: '32px',
};

/**
 * Component-Specific Styles
 */
export const components = {
    // Top Navigation Bar (Exact specification)
    header: {
        background: colors.white,
        borderBottom: `1px solid ${colors.gray[200]}`,
        height: layout.header.height,
        padding: layout.header.padding,
        iconColor: colors.gray[500],
        iconSize: iconSize.md,
        hoverBackground: colors.gray[100],
    },

    // Sidebar (Exact specification)
    sidebar: {
        background: colors.white,
        borderRight: `1px solid ${colors.gray[200]}`,
        width: layout.sidebar.widthExpanded,
        collapsedWidth: layout.sidebar.widthCollapsed,
        transition: layout.sidebar.transition,
    },

    // Breadcrumb (Exact specification)
    breadcrumb: {
        fontSize: typography.fontSize.sm,    // 13px
        inactiveColor: colors.gray[500],     // #6B7280
        activeColor: colors.gray[900],       // #111827
    },

    // Status Badges
    badge: {
        active: {
            background: 'rgba(16, 185, 129, 0.1)',
            color: colors.status.active,
            border: `1px solid rgba(16, 185, 129, 0.2)`,
        },
        warning: {
            background: 'rgba(245, 158, 11, 0.1)',
            color: colors.status.warning,
            border: `1px solid rgba(245, 158, 11, 0.2)`,
        },
        error: {
            background: 'rgba(239, 68, 68, 0.1)',
            color: colors.status.error,
            border: `1px solid rgba(239, 68, 68, 0.2)`,
        },
        inactive: {
            background: 'rgba(107, 114, 128, 0.1)',
            color: colors.status.inactive,
            border: `1px solid rgba(107, 114, 128, 0.2)`,
        },
    },

    // Cards (Specification)
    card: {
        background: colors.white,
        border: `1px solid ${colors.gray[200]}`,
        borderRadius: borderRadius.lg,
        padding: spacing[4],
        shadow: boxShadow.sm,
        hoverShadow: boxShadow.md,
    },
};

// Default export
const designTokens = {
    colors,
    typography,
    layout,
    zIndex,
    spacing,
    borderRadius,
    boxShadow,
    transitions,
    iconSize,
    components,
};

export default designTokens;
