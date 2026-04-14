import { shopifyFetch } from "@/lib/shopify";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    try {
        const query = `
          query getCollections {
            collections(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  image {
                    url
                  }
                }
              }
            }
          }
        `;

        const { body } = await shopifyFetch({ query });
        
        const shopifyCollections = body?.data?.collections?.edges || [];
        
        const categories = shopifyCollections.map(({ node }) => ({
            _id: node.id,
            name: node.title,
            slug: node.handle,
            image: node.image?.url || null
        }));

        if(!categories || categories.length === 0){
            return NextResponse.json({
                success: false,
                message: 'Categories Not Found!!'
            }, {status: 404});
        }

        return NextResponse.json({
            success: true,
            categories
        }, {status: 200});
    } catch (error) {
        console.error("Shopify Categories Error:", error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, {status: 500});
    }
}