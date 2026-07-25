"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function VerifyOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = window.localStorage.getItem("pendingEmail") || ""
      setEmail(storedEmail)
    }
  }, [])

  const handleVerify = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (!otp.trim() || !email) {
      setError("Please enter the OTP and make sure your email is available")
      return
    }

    setLoading(true)

    try {
      const res = await axios.post("/api/verify-otp", { otp, email })

      if (res.status === 200) {
        setMessage("Email verified successfully")
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("pendingEmail")
        }
        setTimeout(() => router.push("/signin"), 1000)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      setError("Email is missing")
      return
    }

    setLoading(true)
    setError("")
    setMessage("")

    try {
      const res = await axios.post("/api/resend-otp", { email })
      if (res.status === 200) {
        setMessage("A new OTP has been sent to your email")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">Verify your email</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter the OTP we sent to <span className="font-medium text-slate-800">{email || "your email"}</span>.
        </p>

        <form onSubmit={handleVerify} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900">OTP Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none focus:border-orange-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-orange-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="text-sm font-medium text-orange-600 hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  )
}
