import { createFood, getAllFoods } from "@/lib/food/foodService"
import { FoodType } from "@/lib/types/types";
import { uploadImageToCloudinary } from "@/lib/utils/uploadimage";
import { NextRequest, NextResponse } from "next/server"

// export async function GET() {
//   const foods = await getAllFoods();
//   return Response.json({ data: foods });
// }

export async function POST(request: NextRequest) {
  
    // Parse the formData from the request
    const formData = await request.formData();

    // Extract food fields from formdata
    const name = formData.get("name") as string;
    const ingredients = formData.get("ingredients") as string;
    const price = formData.get("price") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File;

    // Console log the received data
    console.log("-----Received Food Data-----");
    console.log("Name:", name);
    console.log("Ingredients:", ingredients);
    console.log("Price", price);
    console.log("Category:", categoryId);
    console.log(
      "Image:",
      image ? `${image.name} (${image.size} bytes)` : "No image"
    );
    console.log("----------------------------");

    return NextResponse.json(
      {message: "Food item received successfully"},
      {status: 200}
    )

  //   // Validate required fields
  //   if (!name || !ingredients || !price) {
  //     return NextResponse.json(
  //       { error: "Missing required fields" },
  //       { status: 400 }
  //     );
  //   }

  //   // Handle image upload if image exists
  //   let imageUrl = "";
  //   if (image) {
  //     imageUrl = await uploadImageToCloudinary(image);
  //   }

  //   // Prepare the food data object
  //   const foodData: FoodType = {
  //     name,
  //     ingredients,
  //     price: parseFloat(price),
  //     categoryId,
  //     image: imageUrl,
  //   };
  //   await createFood(foodData);
  //   console.log("Final Food Data:", foodData);

  //   // Return success response
  //   return NextResponse.json(
  //     {
  //       success: true,
  //       message: "Food item received and image uploaded successfully",
  //       data: foodData,
  //     },
  //     { status: 201 }
  //   );
 }



export const GET =async()=>{
  const foods = await getAllFoods()
  console.log(foods)
  return NextResponse.json({message: "hello"}, {status: 200})
}