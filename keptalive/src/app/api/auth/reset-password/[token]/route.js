import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import User from "@/Models/UserModel"
import connectDB from "@/lib/db"

export async function POST(req, { params }) {

  try {

    await connectDB()

    const { token } = await params
    const { userPassword } = await req.json()

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      )
    }

    user.userPassword = await bcrypt.hash(userPassword, 10)

    user.resetToken = undefined
    user.resetTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
      message: "Password reset successful",
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )

  }
}