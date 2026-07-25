// src/app/chefs/[id]/page.jsx
"use client"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import chefss from "@/data/chefss"

export default function ChefProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const chef = chefss.find(c => c.id === id)

  if (!chef) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <span className="text-5xl mb-4">👨‍🍳</span>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Chef not found</h1>
      <Link href="/chefs" className="mt-4 text-orange-500 hover:underline">
        ← Back to Chefs
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />

      {/* Hero banner with real image */}
      <div className="relative h-80 sm:h-96">
        <Image
          src={chef.avatar}
          alt={chef.name}
          fill
          className="object-cover object-top"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

        {/* Content over image */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-12 pb-8 max-w-5xl mx-auto w-full left-0 right-0">
          <button
            onClick={() => router.back()}
            className="text-white/70 text-sm hover:text-white mb-4 w-fit"
          >
            ← Back to Chefs
          </button>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
                {chef.name}
              </h1>
              <p className="text-orange-300 text-lg font-semibold mt-1">{chef.specialty}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="text-white/80 text-sm">⭐ {chef.rating} · {chef.reviews} reviews</span>
                <span className="text-white/80 text-sm">🎓 {chef.experience}</span>
                <span className="text-white/80 text-sm">📍 {chef.location}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  chef.available ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                }`}>
                  {chef.available ? "✅ Available" : "⏳ Currently Booked"}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/70 text-sm">Starting from</p>
              <p className="text-4xl font-extrabold text-white">${chef.price}</p>
              <Link
                href="/book-a-chef"
                className="mt-2 inline-block bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-2xl transition-colors shadow-lg"
              >
                Book Now →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Badges row */}
        <div className="flex flex-wrap gap-2">
          {chef.badges.map(badge => (
            <span key={badge} className="text-sm bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-semibold px-4 py-2 rounded-full border border-orange-100 dark:border-orange-800">
              {badge}
            </span>
          ))}
        </div>

        {/* About + Contact row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Bio */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
            <h2 className="font-extrabold text-gray-900 dark:text-white text-xl mb-4">
              About {chef.name.split(" ")[1]}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              {chef.bio}
            </p>

            {/* Dish image gallery */}
            <div className="grid grid-cols-4 gap-3 mt-6">
              {chef.dishes.map((dish, i) => (
                <div key={i} className="relative h-20 rounded-2xl overflow-hidden group">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
            <h2 className="font-extrabold text-gray-900 dark:text-white text-xl mb-4">
              Contact
            </h2>
            <div className="space-y-4">
              {[
                { icon: "📞", label: "Phone", value: chef.phone },
                { icon: "✉️", label: "Email", value: chef.email },
                { icon: "📍", label: "Based in", value: chef.location },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white break-all">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-3 text-center">
                <p className="text-2xl font-extrabold text-orange-500">{chef.rating}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Rating</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-3 text-center">
                <p className="text-2xl font-extrabold text-orange-500">{chef.reviews}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Signature dishes with images */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
          <h2 className="font-extrabold text-gray-900 dark:text-white text-xl mb-6">
            🍽️ Signature Dishes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chef.dishes.map((dish, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors group"
              >
                {/* Dish image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white text-sm">
                    {dish.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {dish.description}
                  </p>
                </div>
                <p className="text-orange-500 font-extrabold text-sm shrink-0">
                  ${dish.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Book CTA */}
        <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-extrabold text-white mb-2">
            Ready to book {chef.name.split(" ")[1]}?
          </h3>
          <p className="text-orange-100 text-sm mb-6 max-w-md mx-auto">
            Experience world-class dining at home. Starting from just ${chef.price} per session.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book-a-chef"
              className="bg-white text-orange-500 font-extrabold px-8 py-3 rounded-2xl hover:bg-orange-50 transition-colors"
            >
              Book Now →
            </Link>
            <Link
              href="/chefs"
              className="bg-white/20 text-white font-bold px-8 py-3 rounded-2xl hover:bg-white/30 transition-colors"
            >
              ← Browse All Chefs
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}