import { Food } from "../models/Food";
import { FoodType } from "../types/types";
import connectDB from "../utils/mongodb";

export const UpdateFoods = async (foodId: string, foodData: FoodType) => {
  await connectDB();
  return await Food.findByIdAndUpdate(foodId, foodData, { new: true });
};

export const CreateFood = async (foodData: FoodType) => {
  await connectDB();
  const newFood = new Food(foodData);
  await newFood.save();
  return true;
};

export const GetAllFoods = async (): Promise<FoodType[]> => {
  await connectDB();
  const allFoods = await Food.find({}).populate("categoryId");
  return allFoods;
};
