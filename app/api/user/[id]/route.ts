import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User.model";

export async function GET(req: Request) {
  await connectDB();
  const {searchParams} = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}