import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export async function POST(req) {
  try {
    /**
     * 🔐 1. Get token from cookie
     */
    const token = req.cookies.get("shopify_customer_token")?.value;

    /**
     * 🔐 2. Revoke token from Shopify (IMPORTANT)
     */
    if (token) {
      const logoutMutation = `
        mutation customerAccessTokenDelete($token: String!) {
          customerAccessTokenDelete(customerAccessToken: $token) {
            deletedAccessToken
            userErrors {
              message
            }
          }
        }
      `;

      await shopifyFetch({
        query: logoutMutation,
        variables: {
          token: token,
        },
      });
    }

    /**
     * 🔐 3. Delete cookie
     */
    const response = NextResponse.json({
      message: "Logged out successfully",
    });

    response.cookies.set("shopify_customer_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error");

    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}