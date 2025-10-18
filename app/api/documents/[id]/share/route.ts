import { NextResponse } from 'next/server';
import User from '@/models/User.model';
import Document from '@/models/Document.model';
import { connectDB } from '@/lib/mongodb';
import nodemailer from 'nodemailer';


export async function PATCH(req: Request, context: { params: { id: string } }) {
    try {
        console.log("🟢 Share API called");
        await connectDB();
        console.log("✅ DB connected");

        const { email, role } = await req.json();
        const { id } = context.params;

        console.log("📧 Email:", email, "Role:", role, "Document ID:", id);

        const user = await User.findOne({ email });
        console.log("👤 User found:", !!user);

        let updatedDoc;
        if (user) {
            updatedDoc = await Document.findByIdAndUpdate(
                id,
                { $addToSet: { collaborators: { email, role, userId: user._id } } },
                { new: true }
            );
        } else {
            updatedDoc = await Document.findByIdAndUpdate(
                id,
                { $addToSet: { collaborators: { email, role } } },
                { new: true }
            );
        }

        console.log("📄 Document updated:", !!updatedDoc);

        if (!updatedDoc) {
            return NextResponse.json({ error: 'Error updating Document' }, { status: 400 });
        }

        try {
            await sendEmail(email, role, updatedDoc.title, id);
            console.log("📨 Email sent successfully");
        } catch (err) {
            console.error("❌ Email sending failed:", err);
        }

        return NextResponse.json(updatedDoc, { status: 200 });
    } catch (error: any) {
        console.error("🔥 Error sharing document:", error);
        console.error(error.stack);
        return NextResponse.json({ error: error.message || 'Failed to share document' }, { status: 500 });
    }
}

async function sendEmail(email: string, role: string, title: string, id: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false, 
        },
    });

    console.log("🚀 Sending email to:", email);

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `You've been invited to collaborate on a document`,
        text: `You have been added as a ${role} to the document "${title}". Click here to open: ${process.env.NEXT_PUBLIC_APP_URL}/documents/${id}`,
    });
}




