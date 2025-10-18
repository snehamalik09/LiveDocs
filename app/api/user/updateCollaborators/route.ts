import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Document from "@/models/Document.model";
import { connectDB } from "@/lib/mongodb";

export async function POST() {
  await connectDB();

  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const email = sessionClaims?.email;
  if (!email) {
    return NextResponse.json({ error: "Email not found" }, { status: 400 });
  }

  try {
    const result = await Document.updateMany(
      { "collaborators.email": email, "collaborators.userId": null },
      { $set: { "collaborators.$.userId": userId } }
    );

    return NextResponse.json({ success: true, updatedCount: result.modifiedCount });
  } catch (err) {
    console.error("Error updating collaborators:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
