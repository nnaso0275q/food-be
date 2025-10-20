import {
  createFood,
  getAllFoods,
  updateFoods,
} from "@/lib/services/foodService";
import { FoodType } from "@/lib/types/types";
import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/utils/uploadimage";

export const GET = async () => {
  const foods = await getAllFoods();
  return NextResponse.json({ message: "hello", data: foods }, { status: 200 });
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const ingredients = formData.get("ingredients") as string;
    const price = formData.get("price") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File;

    if (!name || !ingredients || !price || !categoryId) {
      console.log("Bad request data:", {
        name,
        ingredients,
        price,
        categoryId,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let uploadedUrl = "";
    if (image instanceof File) {
      uploadedUrl = await uploadImageToCloudinary(image);
    }

    const foodData: FoodType = {
      name,
      ingredients,
      image: uploadedUrl || "",
      price: parseFloat(price),
      categoryId,
    };

    const result = await createFood(foodData);

    return NextResponse.json(
      { message: "Food item created successfully", data: result },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to create food:", err);
    return NextResponse.json(
      { error: "Failed to create food" },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {
//   const formData = await request.formData();

//   const name = formData.get("name") as string;
//   const ingredients = formData.get("ingredients") as string;
//   const price = formData.get("price") as string;
//   const categoryId = formData.get("categorId") as string;
//   const image = formData.get("image") as File;

//   // Console log the received data
//   console.log("----------------Received Food Data----------------");
//   console.log("Name:", name);
//   console.log("Ingredients:", ingredients);
//   console.log("Price", price);
//   console.log("CategoryId:", categoryId);
//   console.log(
//     "Image:",
//     image ? `${image.name} (${image.size} bytes)` : "No image"
//   );
//   console.log("-------------------------------------------------");

//   const uploadedUrl = await uploadImageToCloudinary(image);
//   console.log(uploadedUrl);

//   // Prepare data
//   const foodData: FoodType = {
//     name: name || "",
//     ingredients: ingredients || "",
//     image: uploadedUrl || "",
//     price: parseFloat(price || "0"),
//     categoryId: categoryId || "",
//   };
//   // Save to mongoDB
//   const result = await createFood(foodData);

//   return NextResponse.json(
//     { message: "Food item received successfully" },
//     { status: 200 }
//   );
// }

export const PUT = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const foodId = formData.get("foodId") as string;
    const name = formData.get("name") as string;
    const ingredients = formData.get("ingredients") as string;
    const price = formData.get("price") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File | string;

    // const id = formData.get("id") as string;
    // const name = formData.get("name") as string;
    // const ingredients = formData.get("ingredients") as string;
    // const price = formData.get("price") as string;
    // const categoryId = formData.get("categoryId") as string;
    // const image = formData.get("image") as File;
    // const foodId = formData.get("foodId") as string;
    if (!foodId) {
      return NextResponse.json(
        { error: "foodId is required" },
        { status: 400 }
      );
    }

    let uploadedUrl = "";
    if (image instanceof File) {
      uploadedUrl = await uploadImageToCloudinary(image);
    } else if (typeof image === "string") {
      uploadedUrl = image;
    }
    const foodData: FoodType = {
      name: name || "",
      ingredients: ingredients || "",
      image: uploadedUrl || "",
      price: parseFloat(price || "0"),
      categoryId: categoryId || "",
    };

    await updateFoods(foodId, foodData);

    return NextResponse.json(
      { message: "Food updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to update food:", err);
    return NextResponse.json(
      { error: "Failed to update food" },
      { status: 500 }
    );
  }
};
