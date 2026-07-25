// src/app/dashboard/layout.jsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ADashboardLayout({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.replace("/signin")
      return
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const isExpired = payload.exp < Date.now() / 1000

      if (isExpired) {
        localStorage.removeItem("token")
        router.replace("/signin")
        return
      }

      if (payload.role !== "admin") {
        router.replace("/") // customer — go home, not signin
        return
      }

      setAuthorized(true)
    } catch {
      localStorage.removeItem("token")
      router.replace("/signin")
    } finally {
      setChecking(false)
    }
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!authorized) return null

  return <>{children}</>
}