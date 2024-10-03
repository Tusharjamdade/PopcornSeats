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

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault()

    // Create form data to include the image
    const formData = new FormData()
    formData.append("title", movieName)
    formData.append("directorName", directorName)
    formData.append("description", description)
    formData.append("showTime", showTime)
    formData.append("showDate", showDate)
    if (image) {
      formData.append("image", image)
    }

    try {
      // Make the POST request to the API
      const response = await axios.post("http://localhost:3000/api/movies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Movie added successfully:", response.data)

      // Reset form fields
      setMovieName("")
      setDirectorName("")
      setDescription("")
      setShowTime("")
      setShowDate("")
      setImage(null)
    } catch (error) {
      console.error("Error adding movie:", error)
    }
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
                  <div className="space-y-2">
                    <Label htmlFor="dropzone-file">Upload Image</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG, or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
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
                <CardDescription>List of users registered in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Gender</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
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
                <CardTitle className="text-2xl font-bold text-blue-600">Bookings</CardTitle>
                <CardDescription>List of all movie bookings.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Movie Name</TableHead>
                      <TableHead>Show Time</TableHead>
                      <TableHead>Show Date</TableHead>
                      <TableHead>Tickets Booked</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
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
