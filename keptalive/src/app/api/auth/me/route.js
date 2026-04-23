import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopify_customer_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const meQuery = `
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
    `;

    const { body } = await shopifyFetch({
      query: meQuery,
      variables: { customerAccessToken: token }
    });

    const customer = body?.data?.customer;

    if (!customer) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Map back to your frontend's expected user structure
    const user = {
      _id: customer.id,
      userName: `${customer.firstName || ""} ${customer.lastName || ""}`.trim() || "User",
      userEmail: customer.email,
      userPhone: customer.phone,
      totalOrders: customer.numberOfOrders
    };

    return NextResponse.json({ user });

  } catch (error) {
    console.error("Shopify Me Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
