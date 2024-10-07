import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../client"; // Adjust the import path as necessary

// Define the type for the booking element
type BookingElement = {
    movieId: number;
    seatname: string;
    name: string;
    age: number;
    gender: string;
    contactNumber: string;
};

export async function POST(req: NextRequest) {
    const body: BookingElement[] = await req.json();  // Explicitly type the body array
    console.log(body);

    try {
        // Loop through the booking entries and save each to the database
        const results = await Promise.all(body.map(async (element: BookingElement) => {
            const resp = await prisma.seat.create({
                data: {
                    seatname: element.seatname,        // seat name from the request
                    name: element.name,               // name from the request
                    age: String(element.age),                 // age from the request (converted to number)
                    gender: element.gender,           // gender from the request
                    mobile: element.contactNumber,    // contact number from the request
                    Movie: {                          // Linking to Movie relation
                        connect: {
                            id: element.movieId,      // Assuming movieId is the ID field in the Movie model
                        },
                    },
                },
            });
            return resp; // Return the response for each created seat
        }));

        return NextResponse.json({
            msg: "All bookings created successfully.",
            bookings: results // Return the results of created bookings
        }, { status: 200 });
        
    } catch (error:unknown) {
        // console.error('Error creating bookings:', error);
        console.log(error)
        return NextResponse.json({
            msg: "Failed to create bookings.",
        }, { status: 500 });
    }
}
