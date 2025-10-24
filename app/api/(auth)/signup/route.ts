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
  const result = await SignUp(email, hashPassword);
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
