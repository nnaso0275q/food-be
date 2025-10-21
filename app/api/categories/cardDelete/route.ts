import { NextRequest, NextResponse } from "next/server";
import mongodb from "@/lib/utils/mongodb";
import { Food } from "@/lib/models/Food";

export async function POST(req: NextRequest) {
  try {
    await mongodb();

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Missing menu card ID" },
        { status: 400 }
      );
    }

    const menuCardDelete = await Food.findByIdAndDelete(id);

    if (!menuCardDelete) {
      return NextResponse.json(
        { message: "Menu card not found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      { message: "Menu card deleted successfully" },
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
    console.error("Error deleting menu card:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
