import { NextRequest, NextResponse } from "next/server";
import mongodb from "@/lib/utils/mongodb";
import { Category } from "@/lib/models/Category";

export async function POST(req: NextRequest) {
  try {
    await mongodb();

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Missing category ID" },
        { status: 400 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      { message: "Category deleted successfully" },
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
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// // import { categories } from "../data";

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { category } = body;

//   const response = NextResponse.json({ data: categories._id }, { status: 200 });
//   response.headers.set("Access-Control-Allow-Origin", "*"); // Or '*' for all origins
//   response.headers.set(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   response.headers.set(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );
//   return response;
// }
