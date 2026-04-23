import { NextResponse } from "next/server"
import { shopifyFetch } from "@/lib/shopify"

export async function POST(req) {
    try {
        const { userName, userEmail, userPassword } = await req.json()

        // Split name into first and last for Shopify
        const nameParts = userName.split(" ")
        const firstName = nameParts[0] || ""
        const lastName = nameParts.slice(1).join(" ") || ""

        const registerMutation = `
          mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
              customer {
                id
                email
              }
              customerUserErrors {
                message
              }
            }
          }
        `

        const { body } = await shopifyFetch({
            query: registerMutation,
            variables: {
                input: {
                    firstName,
                    lastName,
                    email: userEmail,
                    password: userPassword
                }
            }
        });

        const errors = body?.data?.customerCreate?.customerUserErrors;
        
        if (errors && errors.length > 0) {
            return NextResponse.json({ message: errors[0].message || "Registration failed" }, { status: 400 })
        }

        // Technically, Shopify doesn't log them in automatically upon creation. 
        // The user will either need to log in immediately after, or we do a login mutation here as well.
        // For now, we return success and standard flow will push them to login
        return NextResponse.json({ message: "Registration successful" })

    } catch (error) {
        console.error("Shopify Register Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}
