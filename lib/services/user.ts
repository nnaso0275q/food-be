import connectDB from "../utils/mongodb";
import { User } from "../models/User";

export const SignUp = async (email: string, password: string) => {
  await connectDB();
  const newUser = new User({ email, password });
  await newUser.save();
  return newUser;
};

export const LoginUser = async (email: string, password: string) => {
  await connectDB();
  const user = await User.findOne({ email, password });
  if (user) {
    return true;
  } else {
    return false;
  }
};
