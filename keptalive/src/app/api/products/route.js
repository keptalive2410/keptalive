import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const first = Number(searchParams.get("limit")) || 20;
    // Note: Shopify uses cursor-based pagination, so "page" is a bit tricky. We'll simulate fetching first X products.
    // In a real headless setup, you'd pass "after: cursor" instead of "page".

    const sort = searchParams.get("sort") || "newest";
    const category = searchParams.get("categories");
    let sortKey = "CREATED_AT";
    let reverse = true;

    if (sort === "Price: Low to High") {
      sortKey = "PRICE";
      reverse = false;
    }
    if (sort === "Price: High to Low") {
      sortKey = "PRICE";
      reverse = true;
    }

    let query;
    let variables;

    if (category) {
      query = `
    query getProductsByCollection(
      $handle: String!,
      $first: Int!,
      $sortKey: ProductCollectionSortKeys!,
      $reverse: Boolean!
    ) {
      collection(handle: $handle) {
        products(first: $first, sortKey: $sortKey, reverse: $reverse) {
          edges {
            node {
              id
              title
              handle
              description
              createdAt
              media(first: 5) {
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
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
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
        }
      }
    }
  `;

      variables = {
        handle: category,
        first,
        sortKey: sortKey === "PRICE" ? "PRICE" : "CREATED",
        reverse,
      };
    } else {
      query = `
    query getProducts(
      $first: Int!,
      $sortKey: ProductSortKeys!,
      $reverse: Boolean!
    ) {
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            handle
            description
            createdAt
            media(first: 5) {
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
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
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
      }
    }
  `;

      variables = { first, sortKey, reverse };
    }

    const { body } = await shopifyFetch({
      query,
      variables,
    });

    // Map Shopify response to the exact shape expected by the frontend
    const shopifyProducts = category
      ? body?.data?.collection?.products?.edges || []
      : body?.data?.products?.edges || [];
    const products = shopifyProducts.map(({ node }) => {
      const firstVariant = node.variants.edges[0]?.node;
      const images = node.media.edges
        .map((e) => ({ url: e.node?.image?.url }))
        .filter((img) => img.url);

      const sizes = [
        ...new Set(
          node.variants.edges
            .map(
              (v) =>
                v.node.selectedOptions.find(
                  (opt) => opt.name === "Size" || opt.name === "Title",
                )?.value,
            )
            .filter(Boolean),
        ),
      ];

      return {
        _id: node.id,
        productName: node.title,
        slug: node.handle,
        productDescription: node.description,
        productSellingPrice: Number(firstVariant?.price?.amount || 0),
        productMrp: Number(
          firstVariant?.compareAtPrice?.amount ||
            firstVariant?.price?.amount ||
            0,
        ),
        productImages: images,
        productStock: firstVariant?.availableForSale ? 10 : 0,
        productSize: sizes,
        createdAt: node.createdAt,
      };
    });

    return NextResponse.json(
      {
        success: true,
        products,
        totalPages: 1, // Cursor pagination should be used to support actual paginations in Shopify
        currentPage: 1,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Shopify Products Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
