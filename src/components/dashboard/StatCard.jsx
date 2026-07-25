// src/components/dashboard/StatCard.jsx
export default function StatCard({ label, value, change, up, icon }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-50 dark:border-gray-800 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
          up
            ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
            : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
        }`}>
          {change}
        </span>
      </div>
      <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  )
}