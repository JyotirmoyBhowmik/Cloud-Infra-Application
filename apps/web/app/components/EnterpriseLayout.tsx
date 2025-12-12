/**
 * Enterprise Layout Wrapper
 * 
 * Tri-section layout with:
 * - Top Navigation (64px, sticky, z-index 1000)
 * - Sidebar (256px → 64px collapsible, z-index 900)
 * - Main Content (auto-fill, min-width 1024px)
 */

'use client';
import React, { useState } from 'react';
import TopNav from './TopNav';
import EnhancedSidebar from './EnhancedSidebar';
import { layout, zIndex } from '../design-system/tokens';

interface EnterpriseLayoutProps {
    children: React.ReactNode;
}

export default function EnterpriseLayout({ children }: EnterpriseLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50" style={{ minWidth: layout.content.minWidth }}>
            {/* Top Navigation */}
            <TopNav onMenuToggle={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />

            {/* Main Container with Sidebar and Content */}
            <div className="flex flex-1 overflow-hidden" style={{ paddingTop: layout.header.height }}>
                {/* Sidebar */}
                <EnhancedSidebar collapsed={sidebarCollapsed} />

                {/* Main Content Area */}
                <main
                    className="flex-1 overflow-y-auto bg-gray-50"
                    style={{
                        marginLeft: sidebarCollapsed ? layout.sidebar.widthCollapsed : layout.sidebar.widthExpanded,
                        transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
