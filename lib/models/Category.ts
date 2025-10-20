import mongoose, { Schema } from "mongoose";
import { CategorySchematype } from "../types/types";

const CategorySchema = new Schema({
  name: String,
});

export const Category =
  mongoose.models.Category ||
  mongoose.model<CategorySchematype>("Category", CategorySchema);
