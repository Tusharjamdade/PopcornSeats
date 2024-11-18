"use client";
import React, { Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

interface Seat {
  id: number;
  row: string;
  number: number;
  isSelected: boolean;
  isBooked: boolean;
  seatname: string; // Every seat has a unique identifier (e.g., A1, B3)
}

interface APIResponse {
  success: boolean;
  movie: {
    id: number;
    title: string;
    director: string;
    description: string;
    time: string;
    date: string;
    seats: {
      id: number;
      seatname: string;
      name: string;
      mobile: string;
      age: string;
      gender: string;
      MoveId: number;
    }[];
  };
}

function Demo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieid = searchParams.get("movieid");
  const movieName = searchParams.get("name");
  const movieTime = searchParams.get("time");
  const movieDate = searchParams.get("date");

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 10;

  const [seats, setSeats] = useState<Seat[]>(() =>
    rows.flatMap((row, rowIndex) =>
      Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
        id: rowIndex * seatsPerRow + seatIndex,
        row,
        number: seatIndex + 1,
        isSelected: false,
        isBooked: false,
        seatname: `${row}${seatIndex + 1}`, // Generate unique seat name like A1, B2
      }))
    )
  );

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!movieid) return;

      try {
        const response = await axios.post<APIResponse>(
          "http://127.0.0.1:8787/api/seats",
          { movieid }
        );
        const bookedSeats = response.data.movie.seats;

        // Extract all booked seat names
        const bookedSeatNames = bookedSeats.map((seat) => seat.seatname);

        // Mark seats as booked based on seat names
        const updatedSeats = seats.map((seat) => ({
          ...seat,
          isBooked: bookedSeatNames.includes(seat.seatname),
        }));
        setSeats(updatedSeats);
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      }
    };

    fetchBookedSeats();
  }, [movieid]);

  const toggleSeat = (id: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === id ? { ...seat, isSelected: !seat.isSelected } : seat
      )
    );
  };

  const selectedSeats = seats.filter((seat) => seat.isSelected);
  const selectedSeatsCount = selectedSeats.length;

  return (
    <div className="min-h-screen text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#ffd700]">Grand Theater</h1>
        <h2 className="text-xl font-semibold mb-8 text-center">
          {movieName} | {movieDate} | {movieTime}
        </h2>

        <div className="relative mb-12">
          <div className="w-full h-16 bg-[#4a4a4a] rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-sm text-gray-300">Screen</span>
          </div>
        </div>

        <div className="mb-12">
          {rows.map((row, rowIndex) => (
            <div key={row} className="flex justify-center mb-2">
              <span className="w-6 text-right mr-2">{row}</span>
              {seats
                .slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow)
                .map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => !seat.isBooked && toggleSeat(seat.id)}
                    className={`w-8 h-8 mx-1 rounded-t-lg text-xs font-medium transition-colors ${
                      seat.isBooked
                        ? "bg-red-600 text-white cursor-not-allowed"
                        : seat.isSelected
                        ? "bg-[#ffd700] text-black"
                        : "bg-[#4a4a4a] text-white hover:bg-[#5a5a5a]"
                    }`}
                    disabled={seat.isBooked}
                  >
                    {seat.number}
                  </button>
                ))}
              <span className="w-6 text-left ml-2">{row}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-4 text-lg">Selected Seats: {selectedSeatsCount}</p>
          <Button
            size="lg"
            disabled={selectedSeatsCount === 0}
            className="bg-[#ffd700] text-black hover:bg-[#ffed4a] disabled:bg-gray-400"
            onClick={() => {
              router.push(
                `/bookings?movieid=${movieid}&seats=${encodeURIComponent(
                  JSON.stringify(selectedSeats.map((seat) => seat.seatname))
                )}`
              );
            }}
          >
            Proceed with {selectedSeatsCount} {selectedSeatsCount === 1 ? "seat" : "seats"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function TheaterBooking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Demo />
    </Suspense>
  );
}
