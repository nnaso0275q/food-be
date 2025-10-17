import mongoose, { Schema } from "mongoose";

type FoodSchematype = {
  name: string;
  price: string;
  ingredients: string;
  category: string;
  image: string;
};

const FoodSchema = new Schema({
  name: String,
  price: String,
  ingredients: String,
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: String,
});

export const Food =
  mongoose.models.Food || mongoose.model<FoodSchematype>("Food", FoodSchema);
