import { Food } from "../models/Food";
import { FoodType } from "../types/types";
import connectDB from "../utils/mongodb";

export const updateFoods = async (foodId: string, foodData: FoodType) => {
  await connectDB();
  const updateFood = new Food(foodId, foodData);
  await updateFood.save();
  return await Food.findByIdAndUpdate(foodId, foodData, { new: true });
};

export const createFood = async (foodData: FoodType) => {
  await connectDB();
  const newFood = new Food(foodData);
  await newFood.save();
  return true;
};

export const getAllFoods = async (): Promise<FoodType[]> => {
  await connectDB();
  const allFoods = await Food.find({}).populate("categoryId");
  return allFoods;
};
