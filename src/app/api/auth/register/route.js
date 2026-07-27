// src/app/api/auth/register/route.js
// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import { connectDB } from "@/lib/connectToDb"
// import User from "@/models/User"
// import { signToken } from "@/lib/jwt"

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json()

//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       )
//     }

//     if (password.length < 6) {
//       return NextResponse.json(
//         { error: "Password must be at least 6 characters" },
//         { status: 400 }
//       )
//     }

//     await connectDB()

//     const existing = await User.findOne({ email })
//     if (existing) {
//       return NextResponse.json(
//         { error: "Email already registered" },
//         { status: 400 }
//       )
//     }

//     const hashed = await bcrypt.hash(password, 12)
//     const user = await User.create({ name, email, password: hashed })
//     const token = await signToken({ userId: user._id, role: user.role })

//     const response = NextResponse.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     }, { status: 201 })

//     response.cookies.set("auth_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//       path: "/",
//     })

//     return response
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json({ error: "Server error" }, { status: 500 })
//   }
// }