import User from "@/app/models/userModel"
import connectToDb from "@/lib/connection"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const POST = async (req) => {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return Response.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    await connectToDb()

    const user = await User.findOne({ email })

    if (!user) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    if (!user.isEmailVerified) {
      return Response.json(
        { message: "Please verify your email before signing in" },
        { status: 403 }
      )
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.userRole,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    return Response.json(
      {
        message: "Sign-in successful",
        error: false,
        data: {
          token,
          userRole: user.userRole,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("SIGN_IN API ERROR:", error)
    return Response.json({ message: "Internal Server Error" }, { status: 500 })
  }
}