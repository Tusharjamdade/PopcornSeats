'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

interface Seat {
  id: number
  row: string
  number: number
}

interface SeatDetails {
  name: string
  age: string
  gender: string
  contactNumber: string
}

const PRICE_PER_SEAT = 15 // Price in dollars

function Demo() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieid");
  const selectedSeatsParam = searchParams.get('seats') ?? '[]';
  let parsedSelectedSeats: Seat[] = [];

  // Safely parse selected seats from query parameter
  try {
    parsedSelectedSeats = JSON.parse(decodeURIComponent(selectedSeatsParam)) || [];
  } catch (error) {
    console.error('Error parsing selected seats:', error);
    parsedSelectedSeats = [];
  }

  const [seatDetails, setSeatDetails] = useState<SeatDetails[]>(parsedSelectedSeats.map(() => ({
    name: '',
    age: '',
    gender: '',
    contactNumber: '',
  })));

  useEffect(() => {
    if (parsedSelectedSeats.length > 0 && seatDetails.length === 0) {
      setSeatDetails(parsedSelectedSeats.map(() => ({
        name: '',
        age: '',
        gender: '',
        contactNumber: '',
      })));
    }
  }, [parsedSelectedSeats, seatDetails.length]);

  const handleInputChange = (index: number, field: keyof SeatDetails, value: string) => {
    const newSeatDetails = [...seatDetails];
    newSeatDetails[index] = { ...newSeatDetails[index], [field]: value };
    setSeatDetails(newSeatDetails);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the bookings data for POST request
    const bookings = parsedSelectedSeats.map((seat, index) => ({
      movieId: movieId || '',
      seatId: seat.id,
      // row: seat.row, // Add seat row
      seatname : seat.row +seat.number,
      // number: seat.number, // Add seat number
      name: seatDetails[index].name,
      age: seatDetails[index].age,
      gender: seatDetails[index].gender,
      contactNumber: seatDetails[index].contactNumber,
    }));

    try {
      const response = await axios.post('http://localhost:3000/api/booking', bookings);
      console.log('Booking response:', response.data);
      // Optionally redirect the user or show a success message
    } catch (error) {
      console.error('Error during booking:', error);
      // Optionally show an error message to the user
    }
  }

  const totalAmount = parsedSelectedSeats.length * PRICE_PER_SEAT;

  if (!parsedSelectedSeats || parsedSelectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#ffd700]">No seats selected</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#ffd700]">Seat Details & Payment</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {parsedSelectedSeats.map((seat, index) => (
            <div key={seat.id} className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-[#ffd700]">
                Seat {seat.row}{seat.number}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${seat.id}`}>Name</Label>
                  <Input
                    id={`name-${seat.id}`}
                    value={seatDetails[index]?.name || ''}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    required
                    className="bg-[#3a3a3a] border-[#4a4a4a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`age-${seat.id}`}>Age</Label>
                  <Input
                    id={`age-${seat.id}`}
                    type="number"
                    value={seatDetails[index]?.age || ''}
                    onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                    required
                    className="bg-[#3a3a3a] border-[#4a4a4a] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`gender-${seat.id}`}>Gender</Label>
                  <Select
                    value={seatDetails[index]?.gender || ''}
                    onValueChange={(value) => handleInputChange(index, 'gender', value)}
                  >
                    <SelectTrigger className="bg-[#3a3a3a] border-[#4a4a4a] text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`contactNumber-${seat.id}`}>Contact Number</Label>
                  <Input
                    id={`contactNumber-${seat.id}`}
                    value={seatDetails[index]?.contactNumber || ''}
                    onChange={(e) => handleInputChange(index, 'contactNumber', e.target.value)}
                    required
                    className="bg-[#3a3a3a] border-[#4a4a4a] text-white"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-[#ffd700] mb-4">Total Amount: ${totalAmount}</h2>
            <Button type="submit" className="bg-[#ffd700] text-black hover:bg-[#ffed4a]">
              Proceed to Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SeatDetailsPayment() {
  return (
    <Suspense fallback={<></>}>
      <Demo />
    </Suspense>
  );
}
