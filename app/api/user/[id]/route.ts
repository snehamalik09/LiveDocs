import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Document from "@/models/Document.model";

interface Params{
  params : {id:string};
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();


  if (!id) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const documents = await Document.find({
    $or: [
      { ownerId: id },
      { "collaborators.userId": id }
    ],
  }).sort({ updatedAt: -1 });

  return NextResponse.json(documents);
}
