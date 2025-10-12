import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import User from '@/models/User.model';
import { connectDB } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    const newUser = await createUserInDatabse(evt.data);
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    if (newUser) return new Response('Webhook received', { status: 200 });


    return new Response('Error verifying webhook', { status: 400 })

  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}

async function createUserInDatabse(data: any) {
  await connectDB();
  const name = `${data.first_name} ${data.last_name}`;
  const body = {
    clerkId: data.id,
    email: data.email_addresses[0].email_address,
    name,
    avatarUrl: data.profile_image_url,
    documents: []
  }

  const newUser = await User.create(body);
  console.log("new user created : ", newUser);
  return newUser;
}