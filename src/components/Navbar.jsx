// src/components/Navbar.jsx
"use client"

import Link from "next/link"
import Image from "next/image"
import CartSidebar from "./CartSidebar"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Navbar() {
  const { itemCount, setIsOpen } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

const navLinks = [
    { label: "Menu", href: "/menu" },
    { label: "Categories", href: "/categories" },
    { label: "Chefs", href: "/chefs" },
    { label: "Book a Chef", href: "/book-a-chef" },
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/flavhub.png"
            alt="FlavorHub Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-2xl font-extrabold">
            <span className="text-orange-500">Flavor</span>
            <span className="text-gray-900 dark:text-white">Hub</span>
          </span>
        </Link>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* ✅ Dashboard button — ONLY shows when user is signed in as admin */}
          {isAuthenticated && user?.role === "admin" && (
            <Link
              href="/adashboard"
              className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full transition-all duration-200"
            >
              🛠 Dashboard
            </Link>
          )}
          {/* ✅ Show user name + logout when signed in, show Sign in when not */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                👋 {user?.email?.split("@")[0]}
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link href="/signin">
              <button className="hidden md:block text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
                Sign in
              </button>
            </Link>
          )}
          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors"
          >
            🛒
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-orange-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-3">

          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 py-2 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex flex-col gap-3">

            {/* ✅ Mobile Dashboard button — admin only */}
            {isAuthenticated && user?.role === "admin" && (
              <Link
                href="/adashboard"
                onClick={() => setMenuOpen(false)}
                className="bg-orange-500 text-white text-sm font-bold px-4 py-2.5 rounded-full text-center"
              >
                🛠 Dashboard
              </Link>
            )}

            {/* ✅ Mobile sign in / sign out */}
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                className="text-sm font-medium text-red-500 py-2 text-left"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-orange-500 py-2"
              >
                Sign in
              </Link>
            )}

          </div>
        </div>
      )}

      <CartSidebar />
    </nav>
  )
}

// "use client"

// import { useState } from "react"
// import { CiSearch } from "react-icons/ci";
// import Link from "next/link"
// import CartSidebar from "./CartSidebar";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false)

//   const navLinks = [
//     { label: "Menu", href: "#menu" },
//     { label: "Categories", href: "#categories" },
//     { label: "Chefs", href: "#chefs" },
//     { label: "Book a Chef", href: "#booking" },
//     { label: "Mobile App", href: "#mobile" },
//   ]

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-orange-100 shadow-sm">
//       <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

//         <Link href="/" className="text-2xl font-bold text-orange-500 tracking-tight">
//           Flavor<span className="text-gray-900">Hub</span>
//         </Link>

//         <ul className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <Link
//                 href={link.href}
//                 className="text-md font-medium text-gray-600 hover:text-black transition-colors font-\[1000\]"
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>


//         <div className="flex items-center gap-3">

//             <span><CiSearch/> </span>
//           <button className="hidden md:block text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">
//             Sign in
//           </button>
//           <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all">
//             Order now
//           </button>
//           <button
//             className="md:hidden text-gray-700"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? "✕" : "☰"}
//           </button>

//           <CartSidebar/>
//         </div>

//       </div>

//       {menuOpen && (
//         <div className="md:hidden bg-white border-t border-orange-100 px-6 py-4 flex flex-col gap-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>
//       )}

//     </nav>
//   )
// }