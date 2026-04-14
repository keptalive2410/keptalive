import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export const runtime = "nodejs";

export async function GET(request, context){
    try {
        const {slug} = await context.params;

        const query = `
          query getProductByHandle($handle: String!) {
            product(handle: $handle) {
              id
              title
              handle
              description
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
        `;

        const { body } = await shopifyFetch({
          query,
          variables: { handle: slug }
        });

        const node = body?.data?.product;
        
        if(!node){
            return NextResponse.json({
                success: false,
                message: 'Product not found !!'
            },{status: 404});
        }

        const firstVariant = node.variants.edges[0]?.node;
        const images = node.media.edges.map(e => ({ url: e.node?.image?.url })).filter(img => img.url);

        const sizes = [...new Set(
          node.variants.edges.map(v => 
            v.node.selectedOptions.find(opt => opt.name === 'Size' || opt.name === 'Title')?.value
          ).filter(Boolean)
        )];

        const stockMap = node.variants.edges.reduce((acc, v) => {
          const size = v.node.selectedOptions.find(opt => opt.name === 'Size' || opt.name === 'Title')?.value;
          if (size) acc[size] = v.node.availableForSale ? 10 : 0;
          return acc;
        }, {});

        const product = {
          _id: node.id,
          productName: node.title,
          slug: node.handle,
          productDescription: node.description,
          productSellingPrice: Number(firstVariant?.price?.amount || 0),
          productMrp: Number(firstVariant?.compareAtPrice?.amount || firstVariant?.price?.amount || 0),
          productImages: images,
          productStock: stockMap,
          productSize: sizes,
          variants: node.variants.edges.map(v => v.node)
        };

        return NextResponse.json({
            success: true,
            product
        },{status: 200});
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error'
        },{status: 500});
    }
}