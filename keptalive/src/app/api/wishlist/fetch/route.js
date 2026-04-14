import { shopifyFetch } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const wishlistCookie = cookieStore.get("shopify_wishlist")?.value;
    
    if (!wishlistCookie) {
      return NextResponse.json({ success: true, wishlist: [] });
    }

    const wishlistItems = JSON.parse(wishlistCookie);

    if (wishlistItems.length === 0) {
      return NextResponse.json({ success: true, wishlist: [] });
    }

    // Build query to fetch multiple products by their GraphQL IDs natively from Shopify
    // In Shopify, the IDs are base64 encoded strings like gid://shopify/Product/12345
    
    const query = `
      query getWishlistProducts($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on Product {
            id
            title
            handle
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                }
              }
            }
            media(first: 1) {
              edges {
                node {
                  ... on MediaImage {
                    image {
                      url
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
      variables: { ids: wishlistItems }
    });

    const nodes = body?.data?.nodes || [];
    
    // Clean out nulls if a product was deleted in Shopify
    const activeNodes = nodes.filter(n => n !== null && n.id);

    const wishlistData = activeNodes.map(node => {
      const firstVariant = node.variants?.edges[0]?.node;
      const images = node.media?.edges?.map(e => ({ url: e.node?.image?.url })) || [];

      return {
        _id: node.id,
        productName: node.title,
        slug: node.handle,
        productSellingPrice: Number(firstVariant?.price?.amount || 0),
        productOriginalPrice: Number(firstVariant?.compareAtPrice?.amount || firstVariant?.price?.amount || 0),
        productImages: images
      };
    });

    return NextResponse.json({
      success: true,
      wishlist: wishlistData
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
