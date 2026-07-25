// src/app/dashboard/layout.jsx
"use client"
import Sidebar from "@/components/dashboard/Sidebar"
import RoleSwitcher from "@/components/dashboard/RoleSwitcher"
import { RoleProvider } from "@/context/RoleContext"

export default function DashboardLayout({ children }) {
  return (
    <RoleProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="h-\[70px\] bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10">
            <h1 className="font-bold text-gray-900 dark:text-white text-lg">Dashboard</h1>
            <RoleSwitcher />
          </header>
          {/* Page content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </RoleProvider>
  )
}