// src/components/dashboard/DashboardTopbar.jsx
"use client"
import { useAuth } from "@/context/AuthContext"
import { roleLabels } from "@/data/sidebarConfig"

export default function DashboardTopbar() {
  const { user, logout } = useAuth()
  const roleInfo = roleLabels[user?.role] || {}

  return (
    <header className="h-\[70px\] bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
      {/* Left */}
      <div>
        <h1 className="font-extrabold text-gray-900 dark:text-white text-lg">
          {roleInfo.icon} {roleInfo.title} Dashboard
        </h1>
        <p className="text-xs text-gray-400 hidden sm:block">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Dark mode */}
        <button
        
          className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
       
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          🔔
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-100 dark:border-gray-800">
          <div className={`w-9 h-9 rounded-xl ${roleInfo.color} flex items-center justify-center text-white font-bold text-sm`}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="ml-2 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}