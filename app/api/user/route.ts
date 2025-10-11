import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User.model";

export async function GET() {
  await connectDB();
  const allUsers = await User.find().sort({ createdAt: -1 });
  return NextResponse.json(allUsers);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const newUser = await User.create({
    clerkId: body.clerkId,
    name: body.name,
    email: body.email,
    avatarUrl: body.avatarUrl,
    documents:[]
  });

  return NextResponse.json(newUser, { status: 201 });
}

