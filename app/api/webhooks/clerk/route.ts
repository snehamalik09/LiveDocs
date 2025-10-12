import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User.model';

interface ClerkWebhookUserEvent {
  type: 'user.created' | 'user.updated';
  data: {
    id: string;
    first_name?: string;
    last_name?: string;
    email_addresses?: { email_address: string }[];
    image_url?: string;
  };
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  // Get Svix headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  // Get raw body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: ClerkWebhookUserEvent;
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkWebhookUserEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  // Only handle user created or updated events
  const eventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    try {
      await connectDB();

      const emailAddress = evt.data.email_addresses?.[0]?.email_address;
      if (!emailAddress) throw new Error('Email address not found');

      // Check if user exists
      const existingUser = await User.findOne({ email: emailAddress });

      if (existingUser) {
        // Update existing user
        existingUser.name = evt.data.first_name || existingUser.name;
        existingUser.avatarUrl = evt.data.image_url || existingUser.avatarUrl;
        await existingUser.save();
        console.log('User updated successfully');
      } else {
        // Create new user
        await User.create({
          clerkId: evt.data.id,
          name: evt.data.first_name || 'Unknown',
          email: emailAddress,
          avatarUrl: evt.data.image_url || '',
          documents: [], // Initialize empty documents array
        });
        console.log('User created successfully');
      }

      return new Response('User processed successfully', { status: 200 });
    } catch (error) {
      console.error('Failed to process user:', error);
      return new Response('Failed to process user', { status: 500 });
    }
  }

  // If event type is not handled
  return new Response('Event type not handled', { status: 200 });
}
