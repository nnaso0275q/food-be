import { createCategory, getAllCategories } from "@/lib/services/categoryService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const categories = await getAllCategories();
   console.log(categories)
  return new NextResponse(JSON.stringify({ data: categories }), {
   
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log(body)
  await createCategory(body.name)
  return new NextResponse(JSON.stringify({message: "Category created"}),{
    status: 200,
  })
}

// export async function POST(req: Request) {
//   console.log("Category Post");
//   const body = await req.json();
//   const { newCategory } = body;
//   categories.push(newCategory);

//   const response = NextResponse.json({ data: categories }, { status: 200 });

//   return response;
// }
