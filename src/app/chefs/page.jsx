// src/app/chefs/page.jsx
"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import chefss from "@/data/chefss"  

export default function ChefsPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = chefss.filter(chef => {
    const matchSearch =
      chef.name.toLowerCase().includes(search.toLowerCase()) ||
      chef.specialty.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === "all" ||
      (filter === "available" && chef.available) ||
      (filter === "top" && chef.rating >= 4.9)
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />

      {/* Hero */}
      <div className="bg-linear-to-r from-orange-500 to-red-500 px-6 py-16 text-center">
        <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-2">
          Meet the Team
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Our World-Class Chefs
        </h1>
        <p className="text-orange-100 mt-3 max-w-lg mx-auto text-sm">
          Hand-picked culinary artists ready to bring extraordinary dining experiences to your table
        </p>

        {/* Search */}
        <div className="mt-8 max-w-md mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search by name or cuisine..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-gray-900 text-sm font-medium focus:outline-none shadow-lg"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          {[
            { key: "all", label: "All Chefs" },
            { key: "available", label: "Available Now" },
            { key: "top", label: "Top Rated ⭐" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === tab.key
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400">
            {filtered.length} chef{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Chefs grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-5xl">👨‍🍳</span>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium">
              No chefs found for "{search}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(chef => (
              <Link
                key={chef.id}
                href={`/chefs/${chef.id}`}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Chef avatar image */}
                <div className="relative h-56 overflow-hidden bg-orange-100 dark:bg-orange-900/20">
                  <Image
                    src={chef.avatar}
                    alt={chef.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                  {/* Available badge */}
                  <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                    chef.available
                      ? "bg-green-500 text-white"
                      : "bg-gray-600 text-white"
                  }`}>
                    {chef.available ? "✅ Available" : "⏳ Booked"}
                  </div>

                  {/* Name overlay on image */}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-extrabold text-xl leading-tight drop-shadow-lg">
                      {chef.name}
                    </p>
                    <p className="text-orange-300 font-semibold text-sm drop-shadow">
                      {chef.specialty}
                    </p>
                  </div>
                </div>

                {/* Info below image */}
                <div className="p-5">
                  {/* Rating + experience */}
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>⭐ {chef.rating} ({chef.reviews})</span>
                    <span>🎓 {chef.experience}</span>
                    <span>📍 {chef.location.split("/")[0].trim()}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {chef.badges.slice(0, 2).map(badge => (
                      <span key={badge} className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-semibold px-2.5 py-1 rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                    <div>
                      <p className="text-xs text-gray-400">Starting from</p>
                      <p className="text-orange-500 font-extrabold text-lg">${chef.price}</p>
                    </div>
                    <span className="bg-orange-500 group-hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                      View Profile →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}