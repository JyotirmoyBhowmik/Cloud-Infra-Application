'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SecurityIcon from '@mui/icons-material/Security';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { name: 'Inventory', href: '/inventory', icon: InventoryIcon },
    { name: 'FinOps', href: '/finops', icon: AttachMoneyIcon },
    { name: 'Governance', href: '/governance', icon: SecurityIcon },
    { name: 'Playbooks', href: '/playbooks', icon: AutoFixHighIcon },
    { name: 'Access Reviews', href: '/iam-reviews', icon: FactCheckIcon },
    { name: 'Support', href: '/support', icon: SupportAgentIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-white text-gray-800 dark:bg-zinc-900 dark:text-gray-200">
            <div className="flex items-center justify-center py-6 border-b border-gray-200 dark:border-zinc-800">
                <h1 className="text-xl font-bold">CloudGov</h1>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${isActive
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-zinc-800 dark:hover:text-white'
                                }`}
                        >
                            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
