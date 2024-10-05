import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../client"; // Adjust the import path as necessary

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);

    try {
        // Loop through the booking entries and save each to the database
        const results = await Promise.all(body.map(async (element) => {
            const resp = await prisma.seat.create({
                data: {
                    // MovieId: element.movieId,          // movieId from the request
                    seatname: element.seatname,        // seat name from the request
                    name: element.name,                 // name from the request
                    age: element.age,           // age from the request (converted to number)
                    gender: element.gender,             // gender from the request
                    mobile: element.contactNumber,      // contact number from the request
                    Movie: {                            // Linking to Movie relation
                        connect: {
                            id: Number(element.movieId),      // Assuming movieId is the ID field in the Movie model
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
        
    } catch (error) {
        console.error('Error creating bookings:', error);
        return NextResponse.json({
            msg: "Failed to create bookings.",
            error: error.message || "Internal server error",
        }, { status: 500 });
    }
}
