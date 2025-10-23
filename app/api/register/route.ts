import { LoginUser } from "@/lib/services/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const dataJson = request.json();
  const { email, password } = await dataJson;
  const result = await LoginUser(email, password);
  if (result) {
    return NextResponse.json({
      success: "true",
      message: "Login created successful",
    });
  } else {
    return NextResponse.json({
      success: "false",
      message: "Login created failed",
    });
  }
}
