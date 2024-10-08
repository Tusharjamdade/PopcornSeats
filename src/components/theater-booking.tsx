"use client";
import React, { Suspense, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

interface Seat {
  id: number;
  row: string;
  number: number;
  isSelected: boolean;
  isBooked: boolean;
  seatname?: string;
}

interface BookedSeat {
  seatname: string;
}

function Demo() {
  const router = useRouter();
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;

  const [seats, setSeats] = useState<Seat[]>(() =>
    rows.flatMap((row, rowIndex) =>
      Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
        id: rowIndex * seatsPerRow + seatIndex,
        row,
        number: seatIndex + 1,
        isSelected: false,
        isBooked: false,
        seatname: `${row}${seatIndex + 1}`, // Generate seatname like A1, A2, etc.
      }))
    )
  );

  const param = useSearchParams();
  const movieid = param.get("movieid");

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!movieid) return; // Ensure movieid is present
      try {
        const response = await axios.post<{ seats: BookedSeat[] }>(`http://popcornseats.vercel.app/api/seats`, { movieid });
        const bookedSeatsData = response.data.seats; 

        // Update the seats state to reflect booked status
        const updatedSeats = seats.map(seat => ({
          ...seat,
          isBooked: bookedSeatsData.some(bookedSeat => bookedSeat.seatname === seat.seatname), // Compare seatname
        }));
        setSeats(updatedSeats);
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };

    fetchBookedSeats();
  }, [movieid]); // Only rerun when movieid changes

  const toggleSeat = (id: number) => {
    setSeats(seats.map(seat =>
      seat.id === id ? { ...seat, isSelected: !seat.isSelected } : seat
    ));
  };

  const selectedSeats = seats.filter(seat => seat.isSelected);
  const selectedSeatsCount = selectedSeats.length;

  const movieName = param.get("name");
  const movieTime = param.get("time");
  const movieDate = param.get("date");

  return (
    <div className="min-h-screen  text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#ffd700]">Grand Theater</h1>
        <h1 className="text-3xl font-bold mb-8 text-center text-[#ffd700]">Movie Name: {movieName} Time: {movieTime} Date: {movieDate}</h1>

        <div className="relative mb-8">
          <div className="absolute top-0 left-0 w-1/2 h-4 bg-[#8B0000] rounded-br-full"></div>
          <div className="absolute top-0 right-0 w-1/2 h-4 bg-[#8B0000] rounded-bl-full"></div>
        </div>

        <div className="relative mb-12">
          <div className="w-full h-16 bg-[#4a4a4a] rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-sm text-gray-300">Screen</span>
          </div>
        </div>

        <div className="mb-12">
          {rows.map((row, rowIndex) => (
            <div key={row} className="flex justify-center mb-2">
              <span className="w-6 text-right mr-2">{row}</span>
              {seats.slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow).map(seat => (
                <button
                  key={seat.id}
                  onClick={() => !seat.isBooked && toggleSeat(seat.id)} // Only toggle if not booked
                  className={`w-8 h-8 mx-1 rounded-t-lg text-xs font-medium transition-colors ${
                    seat.isBooked
                      ? 'bg-red-600 text-white cursor-not-allowed'
                      : seat.isSelected
                        ? 'bg-[#ffd700] text-black'
                        : 'bg-[#4a4a4a] text-white hover:bg-[#5a5a5a]'
                  }`}
                  aria-label={`${seat.row}${seat.number} ${seat.isBooked ? 'Booked' : (seat.isSelected ? 'Selected' : 'Not selected')}`}
                  aria-pressed={seat.isSelected}
                  disabled={seat.isBooked} // Disable booked seats
                >
                  {seat.number}
                </button>
              ))}
              <span className="w-6 text-left ml-2">{row}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#4a4a4a] rounded-sm mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#ffd700] rounded-sm mr-2"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#a81414] rounded-sm mr-2"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-4 text-lg">Selected Seats: {selectedSeatsCount}</p>
          <Button
            size="lg"
            disabled={selectedSeatsCount === 0}
            className="bg-[#ffd700] text-black hover:bg-[#ffed4a] disabled:bg-[#dc3c4a] disabled:text-gray-300"
            onClick={() => {
              router.push(`/bookings?movieid=${movieid}&&seats=${encodeURIComponent(JSON.stringify(selectedSeats))}`);
            }}
          >
            Proceed with {selectedSeatsCount} {selectedSeatsCount === 1 ? 'seat' : 'seats'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function TheaterBooking() {
  return (
    <Suspense fallback={<></>}>
      <Demo />
    </Suspense>
  );
}
