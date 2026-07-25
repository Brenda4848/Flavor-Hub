// src/app/categories/page.jsx
"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import categories from "@/data/categories"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AllCategoriesPage() {
  const [search, setSearch] = useState("")

  const filtered = categories.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-orange-500 hover:underline">← Back to Home</Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-3">All Categories</h1>
          <p className="text-gray-500 mt-1">{categories.length} categories available</p>

          {/* Search */}
          <div className="mt-6 relative max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl">🍽️</span>
            <p className="text-gray-500 mt-4">No categories found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(category => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="relative h-52 rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-bold text-lg leading-tight">{category.label}</p>
                  <p className="text-white/70 text-sm">{category.count} dishes</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}