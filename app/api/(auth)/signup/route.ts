// import { User } from "@/lib/models/User";
// import connectDB from "@/lib/utils/mongodb";
// import bcrypt from "bcrypt";
// import { NextResponse } from "next/server";
// export const POST = async (request: Request) => {
//   await connectDB();
//   const body = await request.json();
//   const { email, password } = body;
//   const hashPassword = bcrypt.hashSync(password, 10);
//   console.log("MY PASSWORD", password);
//   console.log("HASHPASSWORD", password);
//   const user = await User.create({
//     email: email,
//     password: hashPassword,
//     role: "USER",
//   });
//   return NextResponse.json({ message: "Successfully created user", user });
// };

import { SignUp } from "@/lib/services/user";
import connectDB from "@/lib/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const { email, password } = body;
  const hashPassword = bcrypt.hashSync(password, 10);
  console.log("MY PASSWORD", password);
  console.log("HASHPASSWORD", password);
  const result = await SignUp(email, password);
  if (result) {
    return NextResponse.json({
      success: "true",
      message: "Login successful",
    });
  } else {
    return NextResponse.json({
      success: "false",
      message: "Login failed",
    });
  }
}
