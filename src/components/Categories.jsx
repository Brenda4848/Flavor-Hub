"use client"
import Link from "next/link"
import Image from "next/image"
import categories from "../data/categories"
import { useState, useEffect } from "react"

function CategoryCard({ category }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || []
    setLiked(saved.includes(category.id))
  }, [category.id])

  const toggleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()  // stops the Link from navigating when clicking the heart
    let saved = JSON.parse(localStorage.getItem("favorites")) || []

    if (saved.includes(category.id)) {
      saved = saved.filter((id) => id !== category.id)
      setLiked(false)
    } else {
      saved.push(category.id)
      setLiked(true)
    }

    localStorage.setItem("favorites", JSON.stringify(saved))
  }

  return (
    <Link
      href={`/category/${category.id}`}
      className="relative h-72 overflow-hidden bg-orange-50 hover:bg-orange-500 p-4 sm:p-5 rounded-3xl transition-all duration-200 group cursor-pointer"
    >
      {/* Image circle */}
      <div className="w-14 h-14 rounded-full overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-200">
        <Image
          src={category.image}
          alt={category.label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Like button */}
      <button
        onClick={toggleLike}
        className="absolute top-3 right-3 bg-white text-red-400 p-2 rounded-full shadow z-10"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-5 left-5 text-white z-10">
        <h3 className="text-2xl font-bold">{category.label}</h3>
        <p className="text-sm text-gray-300">{category.count} dishes</p>
      </div>
    </Link>
  )
}

export default function Categories() {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-6 py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Explore
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Browse by category
            </h2>
          </div>
          <Link
            href="/categories"
            className="hidden sm:block text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors whitespace-nowrap"
          >
            View all categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}