import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../client"; // adjust the import path if necessary

// Main POST function handling dynamic user creation
export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get email, password, and role
    const body = await req.json(); // await needed to handle async operation
    const { email, password, role } = body;

    // Check if a user with the same email already exists
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // Ensure the password is hashed in production for security
        role,     // role can be 'admin' or 'user'
      },
    });

    // Return a success response
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    // Handle any errors that occur during the creation process
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
