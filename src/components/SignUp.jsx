"use client"
import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function SignUp() {
  const router = useRouter()
  const [inputData, setInputData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setInputData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const newErrors = {}
    if (!inputData.fullname) newErrors.fullname = "Full name is required"
    if (!inputData.email) newErrors.email = "Email is required"
    if (!inputData.password) newErrors.password = "Password is required"
    if (inputData.password && inputData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters"
    if (inputData.password !== inputData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      const { confirmPassword, ...dataToSend } = inputData
      const res = await axios.post("/api/sign-up", dataToSend)

      if (res.status === 201) {
        toast.success("Account created! Check your email for the OTP.")
        localStorage.setItem("pendingEmail", inputData.email)
        router.push("/verify-otp")
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong. Try again."
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-orange-500">Flavor</span>
            <span className="text-gray-900">Hub</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Create your free account today</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 px-8 py-10">

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create account</h2>
          <p className="text-gray-400 text-sm mb-8">Fill in your details to get started</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={inputData.fullname}
                onChange={handleOnChange}
                placeholder="John Doe"
                className={`w-full border ${errors.fullname ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all`}
              />
              {errors.fullname && (
                <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleOnChange}
                placeholder="you@example.com"
                className={`w-full border ${errors.email ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className={`flex items-center border ${errors.password ? "border-red-400" : "border-gray-200"} rounded-xl px-4 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all`}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={inputData.password}
                  onChange={handleOnChange}
                  placeholder="Min. 6 characters"
                  className="flex-1 py-3 text-sm outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-gray-400 hover:text-gray-600 text-xs font-medium ml-2 shrink-0"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={inputData.confirmPassword}
                onChange={handleOnChange}
                placeholder="Repeat your password"
                className={`w-full border ${errors.confirmPassword ? "border-red-400" : "border-gray-200"} rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-100 mt-2"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/signin" className="text-orange-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By signing up you agree to our{" "}
          <Link href="/terms" className="underline hover:text-orange-500">Terms of Service</Link>
        </p>

      </div>
    </div>
  )
}