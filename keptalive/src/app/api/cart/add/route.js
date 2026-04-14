import { shopifyFetch } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { productID, productQuantity, productSize } = await req.json();
    const qty = Math.max(1, Number(productQuantity) || 1);

    // 1. Fetch the correct Variant ID based on Product ID and Size
    const productQuery = `
      query getProductVariants($id: ID!) {
        product(id: $id) {
          variants(first: 50) {
            edges {
              node {
                id
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `;

    const productRes = await shopifyFetch({ query: productQuery, variables: { id: productID } });
    const variants = productRes.body?.data?.product?.variants?.edges || [];
    
    // Find the variant matching the selected size, default to first available
    let targetVariant = variants.find(v => 
      v.node.selectedOptions.some(opt => opt.name === 'Size' && opt.value === productSize)
    )?.node;

    if (!targetVariant && variants.length > 0) {
      targetVariant = variants[0].node;
    }

    if (!targetVariant || !targetVariant.availableForSale) {
      return NextResponse.json(
        { success: false, message: "Selected product or size is out of stock" },
        { status: 400 }
      );
    }

    const merchandiseId = targetVariant.id;

    // 2. Handle Cart (Create new or use existing)
    let cookieStore = await cookies();
    let cartId = cookieStore.get("shopify_cart_id")?.value;
    
    let cartCount = 0;

    if (!cartId) {
      // Create new cart
      const createCartMutation = `
        mutation createCart($lineItems: [CartLineInput!]) {
          cartCreate(input: { lines: $lineItems }) {
            cart {
              id
              totalQuantity
            }
          }
        }
      `;
      const cartRes = await shopifyFetch({
        query: createCartMutation,
        variables: { lineItems: [{ merchandiseId, quantity: qty }] }
      });
      
      cartId = cartRes.body?.data?.cartCreate?.cart?.id;
      cartCount = cartRes.body?.data?.cartCreate?.cart?.totalQuantity || qty;

      if (cartId) {
        cookieStore.set("shopify_cart_id", cartId, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // 30 days
      }
    } else {
      // Add lines to existing cart
      const addLinesMutation = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              totalQuantity
            }
            userErrors {
              message
            }
          }
        }
      `;
      const cartRes = await shopifyFetch({
        query: addLinesMutation,
        variables: { cartId, lines: [{ merchandiseId, quantity: qty }] }
      });
      
      cartCount = cartRes.body?.data?.cartLinesAdd?.cart?.totalQuantity || 0;
    }

    return NextResponse.json({
      success: true,
      message: "Product added to Shopify cart",
      cartCount,
    });
  } catch (error) {
    console.error("Shopify Cart Add Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
