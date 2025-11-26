import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/app/api/config/database.config';
import Subscribe from '@/app/api/model/Subscribe';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await Subscribe.findOne({
      email: email.toLowerCase(),
    });
    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, message: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Create new subscriber
    const subscriber = await Subscribe.create({ email });

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!', data: subscriber },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscribe error:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
