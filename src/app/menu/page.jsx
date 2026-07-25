// src/app/menu/page.jsx
"use client"
import { useState, useMemo } from "react"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import categories from "@/data/categories"
import { useCart } from "@/context/CartContext"
import CartSidebar from "@/components/CartSidebar"

// Flatten all dishes with their category label
const ALL_DISHES = categories.flatMap(cat =>
  cat.dishes.map(dish => ({ ...dish, category: cat.id, categoryLabel: cat.label }))
)

const MAX_PRICE = Math.max(...ALL_DISHES.map(d => d.price))

export default function MenuPage() {
  const { addToCart, itemCount, setIsOpen } = useCart()
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [sortBy, setSortBy] = useState("default")
  const [added, setAdded] = useState(null)

  const handleAdd = (dish) => {
    addToCart(dish)
    setAdded(dish.id)
    setTimeout(() => setAdded(null), 1500)
  }

  const filtered = useMemo(() => {
    let dishes = activeTab === "all"
      ? ALL_DISHES
      : ALL_DISHES.filter(d => d.category === activeTab)

    if (search.trim()) {
      dishes = dishes.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    dishes = dishes.filter(d => d.price <= maxPrice)

    if (sortBy === "price-asc") dishes = [...dishes].sort((a, b) => a.price - b.price)
    if (sortBy === "price-desc") dishes = [...dishes].sort((a, b) => b.price - a.price)
    if (sortBy === "name") dishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name))

    return dishes
  }, [activeTab, search, maxPrice, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      {/* Floating cart */}
      {itemCount > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-30 bg-orange-500 text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all"
        >
          🛒 View Order · {itemCount}
        </button>
      )}

      {/* Hero */}
      <div className="bg-linear-to-r from-orange-500 to-red-500 px-6 py-14 text-center">
        <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-2">
          Explore
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Today's Menu
        </h1>
        <p className="text-orange-100 mt-3 max-w-lg mx-auto text-sm">
          Fresh dishes crafted daily by our world-class chefs
        </p>

        {/* Search bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm">

          {/* Price slider */}
          <div className="flex items-center gap-4 flex-1">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
              💰 Max Price
            </span>
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={0.5}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="flex-1 accent-orange-500 cursor-pointer"
            />
            <span className="text-orange-500 font-extrabold text-sm min-w-\[50px\]">
              ${maxPrice.toFixed(0)}
            </span>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === "all"
                ? "bg-orange-500 text-white shadow-md shadow-orange-200 dark:shadow-orange-900"
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-700"
            }`}
          >
            🍽️ All ({ALL_DISHES.length})
          </button>
          {categories.map(cat => {
            const count = ALL_DISHES.filter(d => d.category === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                  activeTab === cat.id
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200 dark:shadow-orange-900"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-700"
                }`}
              >
                {cat.label} ({count})
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> dishes
            {search && <span> for "<span className="text-orange-500">{search}</span>"</span>}
          </p>
          {(search || maxPrice < MAX_PRICE || activeTab !== "all") && (
            <button
              onClick={() => { setSearch(""); setMaxPrice(MAX_PRICE); setActiveTab("all"); setSortBy("default") }}
              className="text-sm text-orange-500 hover:text-orange-600 font-semibold"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Dishes grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-6xl">🍽️</span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">No dishes found</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setMaxPrice(MAX_PRICE); setActiveTab("all") }}
              className="mt-6 bg-orange-500 text-white font-bold px-6 py-3 rounded-2xl hover:bg-orange-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(dish => (
              <div
                key={dish.id}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 dark:bg-gray-900/90 text-orange-500 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                      {dish.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                      {dish.name}
                    </h3>
                    <span className="text-orange-500 font-extrabold text-base shrink-0">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 line-clamp-2">
                    {dish.description}
                  </p>

                  <button
                    onClick={() => handleAdd(dish)}
                    className={`w-full font-bold py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      added === dish.id
                        ? "bg-green-500 text-white scale-95"
                        : "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-md hover:shadow-orange-200 dark:hover:shadow-orange-900"
                    }`}
                  >
                    {added === dish.id ? "✓ Added!" : "+ Add to Order"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CartSidebar />
      <Footer/>
    </div>
  )
}