import connectDB from "../utils/mongodb";
import { Category } from "../models/Category";

export const updateFoodCatergories = async (id: string) => {
  await connectDB();
  const updateCategory = new Category({ id });
  await updateCategory.save();
  return updateCategory;
};

export const createCategory = async (name: string) => {
  await connectDB();
  const newCategory = new Category({ name });
  await newCategory.save();
  return newCategory;
};

export const getAllCategories = async () => {
  await connectDB();
  return await Category.find();
};
