import { NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify"

export async function POST(req) {
    try {
        const { userEmail, userPassword } = await req.json()

        const loginMutation = `
          mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
              customerAccessToken {
                accessToken
                expiresAt
              }
              customerUserErrors {
                message
              }
            }
          }
        `

        const { body } = await shopifyFetch({
            query: loginMutation,
            variables: {
                input: {
                    email: userEmail,
                    password: userPassword
                }
            }
        });

        const errors = body?.data?.customerAccessTokenCreate?.customerUserErrors;
        
        if (errors && errors.length > 0) {
            return NextResponse.json({ message: errors[0].message || "Invalid Credentials, Please Try Again" }, { status: 400 })
        }

        const tokenData = body?.data?.customerAccessTokenCreate?.customerAccessToken;

        if (!tokenData?.accessToken) {
            return NextResponse.json({ message: "Invalid Credentials, Please Try Again" }, { status: 400 })
        }

        const response = NextResponse.json({ message: "Login successful", success: true })

        response.cookies.set({
            name: "shopify_customer_token",
            value: tokenData.accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(tokenData.expiresAt).getTime()
        })

        return response
    } catch (error) {
        console.error("Shopify Login Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}
