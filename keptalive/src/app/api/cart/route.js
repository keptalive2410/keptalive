import { shopifyFetch } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("shopify_cart_id")?.value;

    if (!cartId) {
      return NextResponse.json({
        success: true,
        cart: [],
        cartCount: 0,
        cartTotal: 0,
        checkoutUrl: null
      });
    }

    const query = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    availableForSale
                    quantityAvailable
                    price {
                      amount
                    }
                    compareAtPrice {
                      amount
                    }
                    image {
                      url
                    }
                    product {
                      id
                      title
                      handle
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const { body } = await shopifyFetch({
      query,
      variables: { cartId }
    });

    const shopifyCart = body?.data?.cart;

    if (!shopifyCart) {
      return NextResponse.json({
        success: true,
        cart: [],
        cartCount: 0,
        cartTotal: 0,
        checkoutUrl: null
      });
    }

    const cartCount = shopifyCart.totalQuantity || 0;
    const cartTotal = Number(shopifyCart.cost?.subtotalAmount?.amount || 0);
    const checkoutUrl = shopifyCart.checkoutUrl;

    const formattedCart = shopifyCart.lines.edges.map(({ node }) => {
      const variant = node.merchandise;
      const product = variant.product;
      const price = Number(variant.price?.amount || 0);

      return {
        lineId: node.id,
        productID: product.id,
        variantID: variant.id,
        productName: product.title,
        slug: product.handle,
        image: variant.image?.url || null,
        price: price,
        originalPrice: Number(variant.compareAtPrice?.amount || price),
        size: variant.selectedOptions?.find(opt => opt.name === 'Size')?.value || variant.title,
        quantity: node.quantity,
        availableStock: variant.availableForSale ? (variant.quantityAvailable || 10) : 0,
      };
    });

    return NextResponse.json({
      success: true,
      cart: formattedCart,
      cartCount,
      cartTotal,
      checkoutUrl
    });
  } catch (error) {
    console.error("Shopify Cart Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
