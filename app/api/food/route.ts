import { createFood, getAllFoods } from "@/lib/services/foodService";
import { FoodType } from "@/lib/types/types";
import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/utils/uploadimage";

export const GET = async () => {
  const foods = await getAllFoods();
  return NextResponse.json({ message: "hello", data: foods }, { status: 200 });
};

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
  console.log("----------------Received Food Data----------------");
  console.log("Name:", name);
  console.log("Ingredients:", ingredients);
  console.log("Price", price);
  console.log("Category:", categoryId);
  console.log(
    "Image:",
    image ? `${image.name} (${image.size} bytes)` : "No image"
  );
  console.log("-------------------------------------------------");

  const uploadedUrl = await uploadImageToCloudinary(image);
  console.log(uploadedUrl);

  // Prepare data
  const foodData: FoodType = {
    name,
    ingredients,
    image: uploadedUrl,
    price: parseFloat(price),
    categoryId,
  };
  // Save to mongoDB
  const result = await createFood(foodData);

  return NextResponse.json(
    { message: "Food item received successfully" },
    { status: 200 }
  );
}

//   // Validate required fields
//   if (!name || !ingredients || !price) {
//     return NextResponse.json(
//       { error: "Missing required fields" },
//       { status: 400 }
//     );
//   }

//   // Return success response
//   return NextResponse.json(
//     {
//       success: true,
//       message: "Food item received and image uploaded successfully",
//       data: foodData,
//     },
//     { status: 201 }
//   );
// }
