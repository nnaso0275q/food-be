// import mongoose, { Schema } from "mongoose";
// import { UserSchemaType } from "../types/types";

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     require: true,
//     unique: true,
//   },
//   password: String,
// });

// export const User =
//   mongoose.models.User || mongoose.model<UserSchemaType>("User", UserSchema);

import { model, models, Schema } from "mongoose";
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model("User", UserSchema);
