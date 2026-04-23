import { NextResponse } from "next/server";

export async function GET() {
  // In a Headless Shopify setup, your Admin dashboard is moved entirely
  // to the shopify.com merchant admin interface.
  // 
  // You should be using Shopify's native Admin UI to fetch and view orders,
  // fulfillments, and customer data, NOT a custom Admin frontend.
  // 
  // Therefore, this endpoint (and the custom Admin dashboard it powered)
  // is now obsolete and should be securely DELETED.
  return NextResponse.json({
    success: false,
    message: "Admin operations moved to Shopify backend. Endpoint deprecated."
  }, { status: 410 });
}