import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../client";

// Handle GET request to fetch all movies
export async function GET() {
    try {
        const movies = await prisma.movie.findMany();
        return NextResponse.json({
            success: true,
            data: movies
        });
    } catch (error) {
        console.error("Error fetching movies:", error);
        return NextResponse.json({
            success: false,
            message: "Error fetching movies"
        }, { status: 500 });
    }
}

// Handle POST request to add a new movie
export async function POST(req: NextRequest) {
    try {
        // Extracting form data from the request
        const formData = await req.formData();
        
        const title = formData.get("title") as string;
        const director = formData.get("directorName") as string;
        const description = formData.get("description") as string;
        const time = formData.get("showTime") as string;
        const date = formData.get("showDate") as string;
        const imageFile = formData.get("image"); // Get the image file from the form data

        // If image is not provided, handle it
        let imageBuffer = null;
        if (imageFile && typeof imageFile !== "string") {
            imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        }

        // Save the movie to the database
        const newMovie = await prisma.movie.create({
            data: {
                title,
                director,
                description,
                time,
                date,
                image: imageBuffer || undefined, // Only insert image if it exists
            },
        });

        return NextResponse.json({
            success: true,
            message: "Movie added successfully",
            data: newMovie
        });
    } catch (error) {
        console.error("Error adding movie:", error);
        return NextResponse.json({
            success: false,
            message: "Error adding movie"
        }, { status: 500 });
    }
}