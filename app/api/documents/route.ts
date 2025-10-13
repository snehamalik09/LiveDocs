import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Document from "@/models/Document.model";
import User from "@/models/User.model";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const newDoc = await Document.create({
    title: body.title,
    content: body.content || {},
    ownerId: body.ownerId,
    collaborators: body.collaborators || [],
  });

  await addDocumentToUser(body.ownerId, newDoc._id);
  return NextResponse.json(newDoc, { status: 201 });
}

async function addDocumentToUser(clerkId: string, documentId: string) {
  await User.findOneAndUpdate(
    { clerkId },
    { $push: { documents: documentId } }
  );
}

export async function GET() {
  await connectDB();
  const documents = await Document.find().sort({ updatedAt: -1 });
  return NextResponse.json(documents);
}
