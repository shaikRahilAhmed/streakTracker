import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from '@/lib/userStorage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = createUser(email, name, hashedPassword);

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }
}
