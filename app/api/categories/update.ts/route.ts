import { NextRequest, NextResponse } from "next/server";
import mongodb from "@/lib/utils/mongodb";
import { Category } from "@/lib/models/Category";

export async function PUT(req: NextRequest) {
  try {
    await mongodb();

    const body = await req.json();
    const { id, name, category, ingredients, price, image } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Missing category ID" },
        { status: 400 }
      );
    }

    const updateCategory = await Category.findByIdAndUpdate(
      id,
      { name, category, ingredients, price, image },
      { new: true }
    );

    if (!updateCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      { message: "Category updated successfully" },
      { status: 200 }
    );

    // CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
