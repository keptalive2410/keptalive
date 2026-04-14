import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const wishlistCookie = cookieStore.get("shopify_wishlist")?.value;
    
    if (!wishlistCookie) {
      return NextResponse.json({ wishlistCount: 0 });
    }

    const wishlistItems = JSON.parse(wishlistCookie);
    return NextResponse.json({ wishlistCount: wishlistItems.length });
    
  } catch (err) {
    return NextResponse.json({ wishlistCount: 0 });
  }
}
