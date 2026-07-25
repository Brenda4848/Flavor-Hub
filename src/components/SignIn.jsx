"use client"
import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function SignIn() {
  const router = useRouter()
  const [inputData, setInputData] = useState({ email: "", password: "" })
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
    if (!inputData.email) newErrors.email = "Email is required"
    if (!inputData.password) newErrors.password = "Password is required"
    return newErrors
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const validationErrors = validate()
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors)
  //     return
  //   }

  //   setLoading(true)
  //   try {
  //     const res = await axios.post("/api/sign-in", inputData)

  //     localStorage.setItem("token", res.data.data.token)

  //     toast.success("Welcome back! 🎉")

  //     if (res.data.data.userRole === "admin") {
  //       router.push("/dashboard")
  //     } else {
  //       router.push("/")
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       toast.error(error.response.data.message || "Invalid credentials")
  //     } else if (error.request) {
  //       toast.error("Network error. Check your connection.")
  //     } else {
  //       toast.error("Something went wrong. Try again.")
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      const res = await axios.post("/api/sign-in", inputData)

      const { token, userRole } = res.data.data

      // ✅ Store token — AuthContext will pick this up automatically
      localStorage.setItem("token", token)

      toast.success("Welcome back! 🎉")

      // ✅ Check if we were redirected here from somewhere (e.g. /menu or /book-a-chef)
      const redirectTo = sessionStorage.getItem("redirectAfterLogin")
      sessionStorage.removeItem("redirectAfterLogin") // clean up

      if (redirectTo) {
        router.push(redirectTo) // send them back where they came from
      } else if (userRole === "admin") {
        router.push("/adashboard")
      } else {
        router.push("/")
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials")
      } else if (error.request) {
        toast.error("Network error. Check your connection.")
      } else {
        toast.error("Something went wrong. Try again.")
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">
            <span className="text-orange-500">Flavor</span>
            <span className="text-gray-900">Hub</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Welcome back! Sign in to continue</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 px-8 py-10">

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h2>
          <p className="text-gray-400 text-sm mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-5">

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
              <div className={`flex items-center border ${errors.password ? "border-red-400" : "border-gray-200"} rounded-xl px-4 transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100`}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={inputData.password}
                  onChange={handleOnChange}
                  placeholder="••••••••"
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

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-orange-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-100"
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-orange-500 font-semibold hover:underline">
              Sign up free
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}