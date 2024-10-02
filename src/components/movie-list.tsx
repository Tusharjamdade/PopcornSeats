'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// Sample movie data
const movies = [
  {
    id: 1,
    name: "Inception",
    image: "/placeholder.svg",
    showDate: "2023-10-15",
    showTime: "19:30",
    producer: "Christopher Nolan",
    description: "A thief who enters the dreams of others to steal secrets from their subconscious.",
    category: "Hollywood"
  },
  {
    id: 2,
    name: "3 Idiots",
    image: "/placeholder.svg",
    showDate: "2023-10-16",
    showTime: "18:00",
    producer: "Vidhu Vinod Chopra",
    description: "Two friends search for their long lost companion who inspired them to think differently.",
    category: "Bollywood"
  },
  {
    id: 3,
    name: "The Martian",
    image: "/placeholder.svg",
    showDate: "2023-10-17",
    showTime: "20:00",
    producer: "Ridley Scott",
    description: "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",
    category: "Sci-Fi"
  },
  {
    id: 4,
    name: "Interstellar",
    image: "/placeholder.svg",
    showDate: "2023-10-18",
    showTime: "21:00",
    producer: "Christopher Nolan",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    category: "Sci-Fi"
  },
  {
    id: 5,
    name: "Lagaan",
    image: "/placeholder.svg",
    showDate: "2023-10-19",
    showTime: "17:30",
    producer: "Aamir Khan",
    description: "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
    category: "Bollywood"
  }
]

export function MovieListComponent() {
  const [filter, setFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = useMemo(() => {
    return ["All", ...new Set(movies.map(movie => movie.category))]
  }, [])

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => 
      (filter === "All" || movie.category === filter) &&
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [filter, searchQuery])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Movie List</h1>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <div className="mb-6">
            <Select onValueChange={setFilter} value={filter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {filteredMovies.map(movie => (
              <Card key={movie.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 mb-4 sm:mb-0 sm:pr-4">
                      <Image
                        src={movie.image}
                        alt={movie.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                    <div className="sm:w-2/3">
                      <h2 className="text-xl font-semibold mb-2">{movie.name}</h2>
                      <p className="text-sm text-gray-600 mb-1">Date: {movie.showDate}</p>
                      <p className="text-sm text-gray-600 mb-1">Time: {movie.showTime}</p>
                      <p className="text-sm text-gray-600 mb-2">Producer: {movie.producer}</p>
                      <p className="text-sm text-gray-700 mb-2">{movie.description}</p>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        {movie.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:w-1/4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => setFilter(category)}
                      className={`w-full text-left px-2 py-1 rounded ${
                        filter === category ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}