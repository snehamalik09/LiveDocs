import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Document from "@/models/Document.model";

interface Params{
  params : {id:string};
}

export async function GET(req: Request,  {params}:Params) {
  await connectDB();
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
  }
  const document = await Document.findById(id);
  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
  return NextResponse.json(document);
}

export async function PATCH(req: Request, {params}:Params) {
  await connectDB();
  const id = params.id;
  const body = await req.json();

  const updatedDoc = await Document.findByIdAndUpdate(id, 
    {$set : {content:body.content}},
    { new: true }
  );
  return NextResponse.json(updatedDoc, { status: 200 });
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