import { NextResponse } from "next/server";

export async function POST() {
  // In a Headless Shopify setup, orders are NEVER created on your custom backend.
  // When a user clicks "Checkout", they are redirected to their Shopify checkoutUrl.
  // Once payment completes on Shopify's domain, Shopify automatically creates the Order 
  // in your Admin dashboard and clears the cart. 
  // 
  // This endpoint is now obsolete and should NOT be called.
  return NextResponse.json({
    success: false,
    message: "Order creation must happen via Shopify Checkout directly. Use the checkoutUrl."
  }, { status: 400 });
}
