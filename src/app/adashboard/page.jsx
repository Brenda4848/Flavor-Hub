// src/app/dashboard/page.jsx
"use client"
import StaffManagement from "@/components/StaffManagement";
import Link from "next/link"
import { CiLogout } from "react-icons/ci";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import StatCard from "@/components/dashboard/StatCard"
import {
  statsData, revenueData, categoryData,
  weeklyData, recentOrders, topDishes
} from "@/data/dashboardData"
import { useAuth } from "@/context/AuthContext"

const statusStyles = {
  delivered: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  preparing: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  "out-for-delivery": "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  pending: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  cancelled: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
}

const statusLabels = {
  delivered: "✅ Delivered",
  preparing: "👨‍🍳 Preparing",
  "out-for-delivery": "🛵 On the way",
  pending: "⏳ Pending",
  cancelled: "❌ Cancelled",
}

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">

      {/* Exit dashboard button */}
      <div className="flex justify-end">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold shadow-sm hover:shadow-md hover:border-red-300 hover:text-red-500 dark:hover:border-red-500/40 dark:hover:text-red-400 transition-all duration-200"
        >
          <CiLogout size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          Exit Dashboard
        </Link>
      </div>

      {/* Welcome banner */}
      <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-3xl p-6 text-white">
        <p className="text-orange-100 text-sm font-medium mb-1">Good Day 👋</p>
        <h2 className="text-2xl font-extrabold">Welcome back, {user?.name?.split(" ")[0]}!</h2>
        <p className="text-orange-100 text-sm mt-1">Here's what's happening with FlavorHub today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={statsData.revenue.value} change={statsData.revenue.change} up={statsData.revenue.up} icon="💰" />
        <StatCard label="Total Orders" value={statsData.orders.value} change={statsData.orders.change} up={statsData.orders.up} icon="🧾" />
        <StatCard label="Total Users" value={statsData.users.value} change={statsData.users.change} up={statsData.users.up} icon="👥" />
        <StatCard label="Deliveries" value={statsData.deliveries.value} change={statsData.deliveries.change} up={statsData.deliveries.up} icon="🛵" />
      </div>

      {/* Revenue line chart + Pie chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Revenue line chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-50 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-extrabold text-gray-900 dark:text-white">Revenue Overview</h3>
              <p className="text-xs text-gray-400 mt-0.5">Monthly revenue vs orders</p>
            </div>
            <select className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ fill: "#f97316", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-50 dark:border-gray-800">
          <h3 className="font-extrabold text-gray-900 dark:text-white mb-1">Sales by Category</h3>
          <p className="text-xs text-gray-400 mb-4">Distribution this month</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="space-y-2 mt-2">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{cat.name}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly bar chart + Top dishes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Weekly orders bar chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-50 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-extrabold text-gray-900 dark:text-white">Weekly Orders</h3>
              <p className="text-xs text-gray-400 mt-0.5">Orders per day this week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                }}
              />
              <Bar dataKey="orders" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top dishes */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-50 dark:border-gray-800">
          <h3 className="font-extrabold text-gray-900 dark:text-white mb-1">Top Dishes</h3>
          <p className="text-xs text-gray-400 mb-5">Best sellers this month</p>
          <div className="space-y-4">
            {topDishes.map((dish, i) => (
              <div key={dish.name} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-xs font-extrabold text-orange-500 shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{dish.name}</p>
                  <p className="text-xs text-gray-400">{dish.orders} orders</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{dish.revenue}</p>
                  <p className={`text-xs font-bold ${dish.trend === "↑" ? "text-green-500" : "text-red-500"}`}>
                    {dish.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-50 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-extrabold text-gray-900 dark:text-white">Recent Orders</h3>
            <p className="text-xs text-gray-400 mt-0.5">Latest customer orders</p>
          </div>
          <button className="text-xs text-orange-500 font-semibold hover:underline">
            View all →
          </button>
        </div>

       

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Order ID", "Customer", "Items", "Amount", "Status", "Time"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3.5 pr-4">
                    <span className="text-sm font-bold text-orange-500">{order.id}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.customer}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{order.items}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{order.amount}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className="text-xs text-gray-400">{order.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <StaffManagement />
      </div>

    </div>
  )
}