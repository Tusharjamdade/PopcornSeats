'use client'

import React, { useState } from 'react'
import { Button } from "../components/ui/button"


interface Seat {
  id: number
  row: string
  number: number
  isSelected: boolean
}

export function TheaterBooking() {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  const seatsPerRow = 10

  const [seats, setSeats] = useState<Seat[]>(
    rows.flatMap((row, rowIndex) =>
      Array.from({ length: seatsPerRow }, (_, seatIndex) => ({
        id: rowIndex * seatsPerRow + seatIndex,
        row,
        number: seatIndex + 1,
        isSelected: false,
      }))
    )
  )

  const toggleSeat = (id: number) => {
    setSeats(seats.map(seat =>
      seat.id === id ? { ...seat, isSelected: !seat.isSelected } : seat
    ))
  }

  const selectedSeatsCount = seats.filter(seat => seat.isSelected).length

  return (
    <div className="min-h-screen  text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#ffd700]">Grand Theater</h1>
        
        {/* Theater curtains */}
        <div className="relative mb-8">
          <div className="absolute top-0 left-0 w-1/2 h-4 bg-[#8B0000] rounded-br-full"></div>
          <div className="absolute top-0 right-0 w-1/2 h-4 bg-[#8B0000] rounded-bl-full"></div>
        </div>

        {/* Screen */}
        <div className="relative mb-32">
          <div className="w-full h-16 bg-[#4a4a4a] rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-sm text-gray-300">Screen</span>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-b from-[#4a4a4a] to-transparent"></div>
        </div>

        {/* Seating area */}
        <div className="mb-12">
          {rows.map((row, rowIndex) => (
            <div key={row} className="flex justify-center mb-2">
              <span className="w-6 text-right mr-2">{row}</span>
              {seats.slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow).map(seat => (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat.id)}
                  className={`w-8 h-8 mx-1 rounded-t-lg text-xs font-medium transition-colors ${
                    seat.isSelected
                      ? 'bg-[#ffd700] text-black'
                      : 'bg-[#4a4a4a] text-white hover:bg-[#5a5a5a]'
                  }`}
                  aria-label={`${seat.row}${seat.number} ${seat.isSelected ? 'Selected' : 'Not selected'}`}
                  aria-pressed={seat.isSelected}
                >
                  {seat.number}
                </button>
              ))}
              <span className="w-6 text-left ml-2">{row}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#4a4a4a] rounded-sm mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#ffd700] rounded-sm mr-2"></div>
            <span className="text-sm">Selected</span>
          </div>
        </div>

        {/* Booking summary and action */}
        <div className="text-center">
          <p className="mb-4 text-lg">Selected Seats: {selectedSeatsCount}</p>
          <Button
            size="lg"
            disabled={selectedSeatsCount === 0}
            className="bg-[#ffd700] text-black hover:bg-[#ffed4a] disabled:bg-gray-500 disabled:text-gray-300"
          >
            Proceed with {selectedSeatsCount} {selectedSeatsCount === 1 ? 'seat' : 'seats'}
          </Button>
        </div>
      </div>
    </div>
  )
}