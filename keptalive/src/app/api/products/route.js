import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/Models/ProductModel";
import '@/Models/CategoryModel';

export const runtime = "nodejs";

export async function GET(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const displayAt = searchParams.get("displayAt");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPric");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";

    let filter = {};

    if (displayAt) {
      filter.displayAt = displayAt;
    }

    if(category){
        filter.productCategory = category;
    }

    if (minPrice || maxPrice) {
      filter.productSellingPrice = {};

      if (minPrice) filter.productSellingPrice.$gte = Number(minPrice);
      if (maxPrice) filter.productSellingPrice.$lte = Number(maxPrice);
    }

    if (search) {
      filter.productName = { $regex: search, $options: "i" };
    }

    let sortOption = {};

    switch (sort) {
      case "price-low-high":
        sortOption = { productSellingPrice: 1 };
        break;
      case "price-high-low":
        sortOption = { productSellingPrice: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = { createdAt: -1 }; // newest
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("productCategory", "name")
        .sort(sortOption)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
