import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify";

export async function PUT(req) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("shopify_customer_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Split name for Shopify
    const nameParts = body.userName?.split(" ") || [""];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const updateMutation = `
      mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
          customer {
            id
            firstName
            lastName
            email
            phone
          }
          customerUserErrors {
            message
          }
        }
      }
    `;

    const { body: response } = await shopifyFetch({
      query: updateMutation,
      variables: {
        customerAccessToken: token,
        customer: {
          firstName,
          lastName,
          phone: body.userNumber || undefined
        }
      }
    });

    const errors = response?.data?.customerUpdate?.customerUserErrors;
    
    if (errors && errors.length > 0) {
      return NextResponse.json(
        { message: errors[0].message || "Update failed" },
        { status: 400 }
      );
    }

    const customer = response?.data?.customerUpdate?.customer;

    if (!customer) {
      return NextResponse.json(
        { message: "Update failed" },
        { status: 400 }
      );
    }

    const user = {
      _id: customer.id,
      userName: `${customer.firstName || ""} ${customer.lastName || ""}`.trim(),
      userEmail: customer.email,
      userNumber: customer.phone
    };

    return NextResponse.json({ success: true, user });

  } catch (err) {
    console.error("Shopify Update Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}