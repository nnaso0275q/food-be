
import { Food } from "../models/Food";
import { FoodType } from "../types/types";
import connectDB from "../utils/mongodb";

export const getAllFoods =async(): Promise<FoodType[]>=>{
   await connectDB()
   const allFoods=await Food.find({})
   return allFoods
}