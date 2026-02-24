import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { uploadToCloudinary } from "@/lib/services/uploadservice";
import { createProduct } from "@/lib/services/productService";
import cloudinary from "@/lib/services/cloudinary";

export const runtime = "nodejs";             // Dont know why

export async function POST(request) {
  await connectDB();

  let uploadedImages = [];

  try {
    const formData = await request.formData();

    const productName = formData.get("productName");
    const productSellingPrice = Number(formData.get("productSellingPrice"));
    const productOriginalPrice = Number(formData.get("productOriginalPrice"));
    const productCategory = formData.get("productCategory");
    const productDescription = formData.get("productDescription");
    const displayAt = formData.get("displayAt");
    const exchangePolicy = formData.get("exchangePolicy") === "true";

    const productSize = JSON.parse(formData.get("productSize"));
    const productColour = JSON.parse(formData.get("productColour"));
    const productStock = JSON.parse(formData.get("productStock"));

    const files = formData.getAll("images");

    // ---------- VALIDATION ----------
    if (!productName || !productSellingPrice || !productCategory) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    if (productOriginalPrice && productOriginalPrice < productSellingPrice) {
      return NextResponse.json(
        { success: false, message: "Original price must be greater than selling price" },
        { status: 400 }
      );
    }

    if (!files.length) {
      return NextResponse.json(
        { success: false, message: "At least one image required" },
        { status: 400 }
      );
    }

    // ---------- IMAGE UPLOAD ----------
    for (const file of files) {
      const result = await uploadToCloudinary(file);

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id
      });
    }

    // ---------- CREATE PRODUCT ----------
    const product = await createProduct({
      productName,
      productSellingPrice,
      productOriginalPrice,
      productCategory,
      productSize,
      productColour,
      productDescription,
      productImages: uploadedImages,
      productStock,
      displayAt,
      exchangePolicy
    });

    return NextResponse.json({
      success: true,
      product
    });

  } catch (error) {

    // 🔥 Rollback images if DB fails
    for (const img of uploadedImages) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    console.error(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}