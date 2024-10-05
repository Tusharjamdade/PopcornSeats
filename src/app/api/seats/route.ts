import { prisma } from "../../../../client";

export async function POST(request: Request) {
    try {
        // Parse the incoming request body
        const { movieid } = await request.json(); // Ensure your request contains a body

        if (!movieid) {
            return Response.json({ msg: "Movie ID is required." }, { status: 400 });
        }

        // Fetch booked seats based on the movieId
        const seats = await prisma.seat.findMany({
            where: {
                MoveId: Number(movieid), // Assuming movieId is a number
            },
        });

        return Response.json({
            msg: "Success",
            seats,
        });
    } catch (error) {
        console.error("Error fetching seats:", error);
        return Response.json({ msg: "Internal server error." }, { status: 500 });
    }
}
