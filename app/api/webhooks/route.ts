import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';
import User from '@/models/User.model';
import { connectDB } from '@/lib/mongodb';
import Document from '@/models/Document.model';
  
interface ClerkUserData {
  clerkId: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created" && evt.data) {
      const emailAddress = evt.data.email_addresses?.[0]?.email_address;
      if (!emailAddress) throw new Error("Email not found");

      const name = `${evt.data.first_name || ''} ${evt.data.last_name || ''}`.trim();
      const data: ClerkUserData = {
        clerkId: evt.data.id,
        name: name || "Unknown",
        email: emailAddress,
        avatarUrl: evt.data.image_url,
      };

      const newUser = await createUserInDatabase(data);

      console.log(`Received webhook with ID ${evt.data.id}`);
      console.log('Webhook payload:', evt.data);

      if (newUser) {
        const result = await Document.updateMany(
              { "collaborators.email": emailAddress, "collaborators.userId": null },
              { $set: { "collaborators.$.userId": newUser.clerkId } }
            );
        return new Response('Webhook received', { status: 200 });
      }
    }

    return new Response('Event type not handled', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}

async function createUserInDatabase(data: ClerkUserData) {
  await connectDB();
  const existingUser = await User.findOne({ clerkId: data.clerkId });
  if (existingUser) {
    console.log("User already exists:", existingUser.clerkId);
    return existingUser;
  }

  const newUser = await User.create({ ...data, documents: [] });
  console.log("New user created:", newUser);
  return newUser;
}
