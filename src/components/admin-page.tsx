"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Film, Users, Ticket } from "lucide-react"

// Mock data for demonstration
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", contact: "1234567890", gender: "Male" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", contact: "9876543210", gender: "Female" },
]

const bookings = [
  { id: 1, movieName: "Inception", showTime: "7:00 PM", showDate: "2023-07-15", ticketsBooked: 50 },
  { id: 2, movieName: "The Dark Knight", showTime: "9:00 PM", showDate: "2023-07-16", ticketsBooked: 75 },
]

export function AdminPageComponent() {
  const [movieName, setMovieName] = useState("")
  const [directorName, setDirectorName] = useState("")
  const [description, setDescription] = useState("")
  const [showTime, setShowTime] = useState("")
  const [showDate, setShowDate] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("Sci-fi") // Default value for type

  const movieTypes = ["Hollywood", "Bollywood", "Sci-fi", "Action", "Comedy", "Drama"]

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", movieName)
    formData.append("directorName", directorName)
    formData.append("description", description)
    formData.append("showTime", showTime)
    formData.append("showDate", showDate)
    formData.append("type", selectedType) // Include selected movie type
    if (image) {
      formData.append("image", image)
    }

    try {
      const response = await axios.post("http://localhost:3000/api/movies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Movie added successfully:", response.data)

      setMovieName("")
      setDirectorName("")
      setDescription("")
      setShowTime("")
      setShowDate("")
      setImage(null)
      setSelectedType("Sci-fi") // Reset dropdown to default value
    } catch (error) {
      console.error("Error adding movie:", error)
    }
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleSelectType = (type: string) => {
    setSelectedType(type)
    setDropdownOpen(false) // Close the dropdown after selecting
  }

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Movie Booking Admin Panel</h1>
        
        <Tabs defaultValue="add-movie" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 gap-4">
            <TabsTrigger value="add-movie" className="flex items-center justify-center space-x-2">
              <Film className="w-5 h-5" />
              <span>Add Movie</span>
            </TabsTrigger>
            <TabsTrigger value="user-details" className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>User Details</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center justify-center space-x-2">
              <Ticket className="w-5 h-5" />
              <span>Bookings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add-movie">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600">Add New Movie</CardTitle>
                <CardDescription>Enter the details of the new movie to add it to the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMovie} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="movieName">Movie Name</Label>
                      <Input
                        id="movieName"
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="directorName">Director Name</Label>
                      <Input
                        id="directorName"
                        value={directorName}
                        onChange={(e) => setDirectorName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="showTime">Show Time</Label>
                      <Input
                        id="showTime"
                        type="time"
                        value={showTime}
                        onChange={(e) => setShowTime(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="showDate">Show Date</Label>
                      <Input
                        id="showDate"
                        type="date"
                        value={showDate}
                        onChange={(e) => setShowDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  {/* Movie Type Dropdown */}
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      id="dropdownDefaultButton"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full"
                      type="button"
                    >
                      {selectedType} {/* Display selected movie type */}
                      <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4"/>
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div id="dropdown" className="z-10 absolute w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                          {movieTypes.map((type) => (
                            <li key={type}>
                              <button
                                type="button"
                                onClick={() => handleSelectType(type)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                {type}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dropzone-file">Upload Image</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16V4a2 2 0 012-2h6a2 2 0 012 2v12M7 16l-2 2m2-2h10m0 0l2 2M9 20h6"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Add Movie
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-details">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600">User Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Gender</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.contact}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600">Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Movie Name</TableHead>
                      <TableHead>Show Time</TableHead>
                      <TableHead>Show Date</TableHead>
                      <TableHead>Tickets Booked</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.movieName}</TableCell>
                        <TableCell>{booking.showTime}</TableCell>
                        <TableCell>{booking.showDate}</TableCell>
                        <TableCell>{booking.ticketsBooked}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
