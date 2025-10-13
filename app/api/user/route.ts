import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User.model";

export async function GET() {
  await connectDB();
  const allUsers = await User.find().sort({ createdAt: -1 });
  return NextResponse.json(allUsers);
}
