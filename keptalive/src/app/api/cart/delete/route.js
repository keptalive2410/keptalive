import { shopifyFetch } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function DELETE(req) {
  try {
    const { productID, productSize, lineId } = await req.json();

    const cookieStore = await cookies();
    const cartId = cookieStore.get("shopify_cart_id")?.value;

    if (!cartId) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    let targetLineId = lineId;

    // If the frontend didn't pass lineId, we must look it up on Shopify
    if (!targetLineId) {
      const getCartQuery = `
        query {
          cart(id: "${cartId}") {
            lines(first: 100) {
              edges {
                node {
                  id
                  merchandise {
                    ... on ProductVariant {
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

      const { body } = await shopifyFetch({ query: getCartQuery });
      const lines = body?.data?.cart?.lines?.edges || [];

      const lineToRemove = lines.find(({ node }) => {
        const isMatchProduct = node.merchandise.product.id === productID;
        const isMatchSize = node.merchandise.selectedOptions.some(opt => opt.name === 'Size' && opt.value === productSize);
        return isMatchProduct && isMatchSize;
      });

      if (!lineToRemove) {
        return NextResponse.json({ success: false, message: "Line not found" }, { status: 404 });
      }
      targetLineId = lineToRemove.node.id;
    }

    // Now remove the line
    const removeLineMutation = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
          }
        }
      }
    `;

    await shopifyFetch({
      query: removeLineMutation,
      variables: { cartId, lineIds: [targetLineId] }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Shopify Cart Delete Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
