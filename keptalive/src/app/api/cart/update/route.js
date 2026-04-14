import { shopifyFetch } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function PATCH(req) {
  try {
    const { productID, productSize, action, lineId } = await req.json();

    const cookieStore = await cookies();
    const cartId = cookieStore.get("shopify_cart_id")?.value;

    if (!cartId) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    // Since the frontend didn't pass lineId + current quantity, we must fetch the cart line
    const getCartQuery = `
      query getCartLines($cartId: ID!) {
        cart(id: $cartId) {
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    quantityAvailable
                    product { id }
                    selectedOptions { name value }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const { body } = await shopifyFetch({ query: getCartQuery, variables: { cartId } });
    const lines = body?.data?.cart?.lines?.edges || [];

    const targetLine = lines.find(({ node }) => {
      if (lineId) return node.id === lineId;
      const isMatchProduct = node.merchandise.product.id === productID;
      const isMatchSize = node.merchandise.selectedOptions.some(opt => opt.name === 'Size' && opt.value === productSize);
      return isMatchProduct && isMatchSize;
    });

    if (!targetLine) {
      return NextResponse.json({ success: false, message: "Item not found" });
    }

    const currentQty = targetLine.node.quantity;
    const available = targetLine.node.merchandise.quantityAvailable || 10;
    
    let newQty = currentQty;

    if (action === "inc") {
      if (currentQty >= available) {
        return NextResponse.json({ success: false, message: "Stock limit reached" });
      }
      newQty += 1;
    } else if (action === "dec") {
      newQty -= 1;
    }

    if (newQty <= 0) {
      // Remove line
      const removeLineMutation = `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart { id }
          }
        }
      `;
      await shopifyFetch({ query: removeLineMutation, variables: { cartId, lineIds: [targetLine.node.id] } });
    } else {
      // Update line
      const updateLineMutation = `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { id }
          }
        }
      `;
      await shopifyFetch({
        query: updateLineMutation,
        variables: { cartId, lines: [{ id: targetLine.node.id, quantity: newQty }] }
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Shopify Cart Update Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
