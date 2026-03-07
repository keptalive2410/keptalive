import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import User from "@/Models/UserModel"
import bcrypt from "bcryptjs"

export async function POST(req){
    await connectDB()

    const {userName, userEmail, userPassword} = await req.json()

    const existing = await User.findOne({userEmail})
    if(existing)
        return NextResponse.json({message: "Email is already registered, "},{status:400})

    const hashed = await bcrypt.hash(userPassword, 10)
    await User.create({
        userName,
        userEmail,
        userPassword: hashed,
    })

    return NextResponse.json({message: "Registration Successfull"})
}