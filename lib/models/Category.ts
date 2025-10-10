import mongoose, { Schema } from "mongoose";

type CategorySchematype = {
  name: string;
};

const CategorySchema = new Schema({
  name: String,
});

export const Category =
  mongoose.models.Category ||
  mongoose.model<CategorySchematype>("Category", CategorySchema);
