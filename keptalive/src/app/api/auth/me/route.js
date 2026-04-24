import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify";

export async function GET() {
  try {
    /**
     * 🔐 FIX: await cookies()
     */
    const cookieStore = await cookies();
    const token = cookieStore.get("shopify_customer_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    /**
     * 🔐 Fetch customer
     */
    const { body } = await shopifyFetch({
      query: `
        query customer($customerAccessToken: String!) {
          customer(customerAccessToken: $customerAccessToken) {
            id
            firstName
            lastName
            email
            phone
            numberOfOrders
          }
        }
      `,
      variables: { customerAccessToken: token }
    });

    const customer = body?.data?.customer;

    if (!customer) {
      const response = NextResponse.json(
        { error: "Invalid token" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );

      /**
       * 🔐 delete invalid cookie
       */
      response.cookies.set("shopify_customer_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      });

      return response;
    }

    const user = {
      _id: customer.id,
      userName:
        `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
        "User",
      userEmail: customer.email,
      userPhone: customer.phone || null,
      totalOrders: customer.numberOfOrders || 0,
    };

    return NextResponse.json(
      { user },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Auth/me error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}