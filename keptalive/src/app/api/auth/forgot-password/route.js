import { NextResponse } from "next/server"
import crypto from "crypto"
import User from "@/Models/UserModel"
import connectDB from "@/lib/db"
import { sendEmail } from "@/lib/sendEmail"

export async function POST(req) {

  try {

    await connectDB()

    const { userEmail } = await req.json()

    const user = await User.findOne({ userEmail })

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    const resetToken = crypto.randomBytes(32).toString("hex")

    user.resetToken = resetToken
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000

    await user.save()

    const resetUrl = `${process.env.FRONTEND_URL}/Reset-Password/${resetToken}`

    const html = `
      <h2>Password Reset</h2>
      <p>You requested a password reset.</p>

      <a href="${resetUrl}"
      style="padding:10px 20px;background:black;color:white;text-decoration:none;">
      Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    `

    await sendEmail({
      to: user.userEmail,
      subject: "Reset your password",
      html,
    })

    return NextResponse.json({
      message: "Reset link sent to email",
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )

  }
}