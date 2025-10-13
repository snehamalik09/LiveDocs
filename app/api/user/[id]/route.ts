import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Document from "@/models/Document.model";

interface Params{
  params : {id:string};
}

export async function GET(req: Request, {params}:Params) {
  await connectDB();

  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const documents = await Document.find({
    $or: [
      { ownerId: userId },
      { "collaborators.userId": userId }
    ],
  }).sort({ updatedAt: -1 });

  return NextResponse.json(documents);
}
