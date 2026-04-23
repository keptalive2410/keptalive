import { shopifyFetch } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("shopify_customer_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const ordersQuery = `
      query customerOrders($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                orderNumber
                processedAt
                totalPrice {
                  amount
                }
                financialStatus
                fulfillmentStatus
                lineItems(first: 10) {
                  edges {
                    node {
                      title
                      quantity
                      variant {
                        product {
                          id
                          handle
                        }
                        title
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
      }
    `;

    const { body } = await shopifyFetch({
      query: ordersQuery,
      variables: { customerAccessToken: token }
    });

    const shopifyOrders = body?.data?.customer?.orders?.edges || [];

    const formattedOrders = shopifyOrders.map(({ node }) => {
      const items = node.lineItems.edges.map(li => ({
        productID: {
          productName: li.node.title,
          slug: li.node.variant?.product?.handle,
          productImages: [{ url: li.node.variant?.image?.url }]
        },
        productSize: li.node.variant?.title,
        quantity: li.node.quantity
      }));

      return {
        _id: node.id,
        orderNumber: `#${node.orderNumber}`,
        orderDate: node.processedAt,
        totalAmount: Number(node.totalPrice?.amount || 0),
        status: node.fulfillmentStatus || "UNFULFILLED",  
        paymentStatus: node.financialStatus,
        items
      };
    });

    return NextResponse.json({
      success: true,
      orders: formattedOrders,
    });
  } catch (error) {
    console.error("Shopify Orders Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
