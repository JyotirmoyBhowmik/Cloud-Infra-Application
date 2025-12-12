/**
 * Enterprise Top Navigation Header Component
 * 
 * Specifications:
 * - Height: 64px, sticky
 * - Background: #FFFFFF
 * - Border: 1px solid #E5E7EB
 * - Z-index: 1000
 * 
 * Features:
 * - Hamburger menu for sidebar toggle
 * - Platform logo with dashboard link
 * - Global unified search
 * - Notification bell with badge
 * - Help/docs icon
 * - User avatar with dropdown
 */

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
    Menu as MenuIcon,
    Search,
    Notifications,
    Help,
    AccountCircle,
    Dashboard as DashboardIcon,
} from '@mui/icons-material';

interface TopNavProps {
    onMenuToggle: () => void;
    sidebarCollapsed: boolean;
}

export default function TopNav({ onMenuToggle, sidebarCollapsed }: TopNavProps) {
    const [searchFocused, setSearchFocused] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [notificationCount] = useState(3);

    return (
        <header
            className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between"
            style={{ zIndex: 1000 }}
        >
            {/* Left Section */}
            <div className="flex items-center space-x-4">
                {/* Hamburger Menu */}
                <button
                    onClick={onMenuToggle}
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <MenuIcon className="w-5 h-5" />
                </button>

                {/* Platform Logo */}
                <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                >
                    <DashboardIcon className="w-8 h-8 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900 hidden lg:block">
                        Cloud Governance
                    </span>
                </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Global Search */}
                <div className="relative hidden md:block">
                    <div className={`
            flex items-center px-4 py-2 bg-gray-50 rounded-lg border transition-all
            ${searchFocused ? 'border-blue-500 bg-white w-96' : 'border-gray-200 w-80'}
          `}>
                        <Search className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search resources, policies, incidents..."
                            className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-500"
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                        <kbd className="hidden lg:inline-block px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Notification Bell */}
                <button className="relative p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors">
                    <Notifications className="w-5 h-5" />
                    {notificationCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full">
                            <span className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        </span>
                    )}
                </button>

                {/* Help/Docs Icon */}
                <Link
                    href="/docs"
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                    title="Documentation"
                >
                    <Help className="w-5 h-5" />
                </Link>

                {/* User Avatar & Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <AccountCircle className="w-8 h-8 text-gray-500" />
                        <span className="hidden lg:block text-sm font-medium text-gray-700">
                            Admin User
                        </span>
                    </button>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowUserMenu(false)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20">
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile Settings
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Platform Settings
                                </Link>
                                <hr className="my-1 border-gray-200" />
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    onClick={() => console.log('Logout')}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
