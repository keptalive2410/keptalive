import { shopifyFetch } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("shopify_cart_id")?.value;

    if (!cartId) {
      return NextResponse.json({ cartCount: 0 });
    }

    const query = `
      query getCartCount($cartId: ID!) {
        cart(id: $cartId) {
          totalQuantity
        }
      }
    `;

    const { body } = await shopifyFetch({
      query,
      variables: { cartId }
    });

    const cartCount = body?.data?.cart?.totalQuantity || 0;

    return NextResponse.json({ cartCount });

  } catch (err) {
    console.error("Shopify Cart Count Error:", err);
    return NextResponse.json({ cartCount: 0 });
  }
}