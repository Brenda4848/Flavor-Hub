// src/data/dashboardData.js
export const statsData = {
  revenue: { value: "$24,563", change: "+12.5%", up: true },
  orders: { value: "1,284", change: "+8.2%", up: true },
  users: { value: "3,920", change: "+5.1%", up: true },
  deliveries: { value: "1,102", change: "-2.3%", up: false },
}

export const revenueData = [
  { month: "Jan", revenue: 4200, orders: 240 },
  { month: "Feb", revenue: 5800, orders: 320 },
  { month: "Mar", revenue: 4900, orders: 280 },
  { month: "Apr", revenue: 7200, orders: 410 },
  { month: "May", revenue: 6100, orders: 350 },
  { month: "Jun", revenue: 8900, orders: 490 },
  { month: "Jul", revenue: 7600, orders: 430 },
  { month: "Aug", revenue: 9200, orders: 520 },
  { month: "Sep", revenue: 8400, orders: 470 },
  { month: "Oct", revenue: 10500, orders: 580 },
  { month: "Nov", revenue: 11200, orders: 630 },
  { month: "Dec", revenue: 13800, orders: 750 },
]

export const categoryData = [
  { name: "Pizza", value: 35, color: "#f97316" },
  { name: "Burgers", value: 28, color: "#ef4444" },
  { name: "Pasta", value: 18, color: "#8b5cf6" },
  { name: "Desserts", value: 12, color: "#ec4899" },
  { name: "Drinks", value: 10, color: "#06b6d4" },
]

export const weeklyData = [
  { day: "Mon", orders: 48 },
  { day: "Tue", orders: 62 },
  { day: "Wed", orders: 55 },
  { day: "Thu", orders: 78 },
  { day: "Fri", orders: 95 },
  { day: "Sat", orders: 112 },
  { day: "Sun", orders: 88 },
]

export const recentOrders = [
  { id: "ORD-001", customer: "Joseph Brandon", items: "BBQ Chicken x2", amount: "$31.98", status: "delivered", time: "2 min ago" },
  { id: "ORD-002", customer: "Dave Roland", items: "Margherita Pizza x1", amount: "$12.99", status: "preparing", time: "8 min ago" },
  { id: "ORD-003", customer: "Anita Davis", items: "Pepperoni x1, Drinks x2", amount: "$24.97", status: "out-for-delivery", time: "15 min ago" },
  { id: "ORD-004", customer: "Manu Silva", items: "Carbonara x2", amount: "$27.98", status: "delivered", time: "22 min ago" },
  { id: "ORD-005", customer: "Dami Yusuf", items: "Smash Burger x3", amount: "$32.97", status: "pending", time: "31 min ago" },
  { id: "ORD-006", customer: "Cosmos Elewo", items: "Wagyu Steak x1", amount: "$35.99", status: "delivered", time: "45 min ago" },
  { id: "ORD-007", customer: "Isaac Odum", items: "Tiramisu x2, Coffee x2", amount: "$28.96", status: "cancelled", time: "1 hr ago" },
]

export const topDishes = [
  { name: "BBQ Chicken Pizza", orders: 234, revenue: "$3,042", trend: "↑" },
  { name: "Truffle Smash Burger", orders: 198, revenue: "$3,267", trend: "↑" },
  { name: "Carbonara Pasta", orders: 176, revenue: "$2,463", trend: "↓" },
  { name: "Chocolate Lava Cake", orders: 154, revenue: "$1,232", trend: "↑" },
  { name: "Classic Margherita", orders: 143, revenue: "$1,858", trend: "↑" },
]