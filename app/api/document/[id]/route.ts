import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Document from "@/models/Document.model";

export async function GET(req: Request) {
  await connectDB();
  const {searchParams} = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
  }
  const document = await Document.findById(id);
  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
  return NextResponse.json(document);
}

export async function DELETE(req: Request) {
  await connectDB();
  const {searchParams} = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
  }
  const document = await Document.findByIdAndDelete(id);
  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
  return NextResponse.json(document);
}