'use client';
import React from 'react';
import Sidebar from '../components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
            <Sidebar />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <main className="w-full h-full p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
