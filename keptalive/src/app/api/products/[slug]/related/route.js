import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export const runtime = "nodejs";

export async function GET(request, context) {
  const { slug } = await context.params;

  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 4;

    const idQuery = `
      query getProductByHandle($handle: String!) {
        product(handle: $handle) {
          id
          productType
        }
      }
    `;

    const { body: idBody } = await shopifyFetch({
      query: idQuery,
      variables: { handle: slug }
    });

    const product = idBody?.data?.product;

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found !!",
        },
        { status: 404 },
      );
    }

    const recommendationsQuery = `
      query productRecommendations($productId: ID!) {
        productRecommendations(productId: $productId) {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
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
    `;

    const { body: relatedBody } = await shopifyFetch({
      query: recommendationsQuery,
      variables: { productId: product.id }
    });

    let recommendedNodes = relatedBody?.data?.productRecommendations || [];

    // Fallback if Shopify's engine doesn't have enough data
    if (recommendedNodes.length === 0) {
      const fallbackQuery = `
        query fallbackProducts($query: String!) {
          products(first: ${limit + 1}, sortKey: CREATED_AT, reverse: true, query: $query) {
            edges {
              node {
                id
                title
                handle
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
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
        }
      `;

      const { body: fallbackBody } = await shopifyFetch({
        query: fallbackQuery,
        variables: { query: product.productType ? `product_type:'${product.productType}'` : "" }
      });

      recommendedNodes = (fallbackBody?.data?.products?.edges || [])
        .map(edge => edge.node)
        .filter(n => n.id !== product.id);
    }

    const relatedProducts = recommendedNodes.slice(0, limit).map(node => {
      const price = node.priceRange?.minVariantPrice?.amount;
      const imageUrl = node.media?.edges?.[0]?.node?.image?.url;

      return {
        _id: node.id,
        productName: node.title,
        slug: node.handle,
        productSellingPrice: Number(price || 0),
        productImages: imageUrl ? [{ url: imageUrl }] : []
      };
    });

    return NextResponse.json({
        success: true,
        relatedProducts,
    }, {status: 200});
  } catch (error) {
    console.error("Related Error:", error);

    return NextResponse.json({
        success: false,
        message: 'Internal Server Error'
    }, {status: 500});
  }
}
