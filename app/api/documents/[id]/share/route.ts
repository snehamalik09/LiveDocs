import { NextResponse } from 'next/server';
import User from '@/models/User.model';
import Document from '@/models/Document.model';
import { connectDB } from '@/lib/mongodb';
import nodemailer from 'nodemailer';


export async function PATCH(req: Request, context: { params: { id: string } }) {
    try {
        console.log("Share API called");
        await connectDB();
        console.log("DB connected");

        const { email, role } = await req.json();
        const { id } = context.params;

        console.log("Email:", email, "Role:", role, "Document ID:", id);

        const user = await User.findOne({ email });
        console.log("User found:", !!user);

        let updatedDoc;
        if (user) {
            updatedDoc = await Document.findByIdAndUpdate(
                id,
                { $addToSet: { collaborators: { email, role, userId: user.clerkId } } },
                { new: true }
            );
        } else {
            updatedDoc = await Document.findByIdAndUpdate(
                id,
                { $addToSet: { collaborators: { email, role } } },
                { new: true }
            );
        }

        console.log("Document updated:", !!updatedDoc);

        if (!updatedDoc) {
            return NextResponse.json({ error: 'Error updating Document' }, { status: 400 });
        }

        try {
            await sendEmail(email, role, updatedDoc.title, id);
            console.log("Email sent successfully");
        } catch (err) {
            console.error("Email sending failed:", err);
        }

        return NextResponse.json(updatedDoc, { status: 200 });
    } catch (error: any) {
        console.error("Error sharing document:", error);
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

    console.log("Sending email to:", email);

    await transporter.sendMail({
  from: `"Docs Workspace" <${process.env.SMTP_USER}>`,
  to: email,
  subject: `📄 Invitation to collaborate on "${title}"`,
  html: `
    <div style="
      font-family: Arial, sans-serif; 
      background-color: #f9fafb; 
      padding: 20px;
      color: #111827;
    ">
      <div style="
        max-width: 500px; 
        margin: auto; 
        background: #ffffff; 
        border-radius: 10px; 
        padding: 25px; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      ">
        <h2 style="color: #1d4ed8;">You've been invited to collaborate!</h2>
        <p style="font-size: 15px; line-height: 1.5;">
          Hi there 👋,<br/>
          You’ve been added as a <strong>${role}</strong> to the document 
          <strong>"${title}"</strong>.
        </p>

        <p style="font-size: 15px; line-height: 1.5;">
          Click the button below to open the document and start collaborating:
        </p>

        <div style="text-align: center; margin: 25px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/document/${id}"
            style="
              background-color: #2563eb; 
              color: white; 
              text-decoration: none; 
              padding: 10px 18px; 
              border-radius: 6px;
              font-weight: 500;
              display: inline-block;
            ">
            Open Document
          </a>
        </div>

        <p style="font-size: 13px; color: #6b7280; text-align: center;">
          If the button doesn’t work, copy and paste this link in your browser:<br/>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/document/${id}" style="color: #2563eb;">
            ${process.env.NEXT_PUBLIC_APP_URL}/document/${id}
          </a>
        </p>
      </div>
    </div>
  `,
});

}




