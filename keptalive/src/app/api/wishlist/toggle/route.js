import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { productID } = await req.json();

    const cookieStore = await cookies();
    const wishlistCookie = cookieStore.get("shopify_wishlist")?.value;
    
    let wishlistItems = wishlistCookie ? JSON.parse(wishlistCookie) : [];
    let action = "";

    const idx = wishlistItems.findIndex(id => id === productID);

    if (idx > -1) {
      wishlistItems.splice(idx, 1);
      action = "removed";
    } else {
      wishlistItems.push(productID);
      action = "added";
    }

    if (wishlistItems.length > 0) {
      cookieStore.set("shopify_wishlist", JSON.stringify(wishlistItems), { path: '/', maxAge: 60 * 60 * 24 * 30 });
    } else {
      cookieStore.delete("shopify_wishlist");
    }

    return NextResponse.json({
      success: true,
      action
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
