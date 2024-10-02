"use client"

import { useState } from "react"
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

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ movieName, directorName, description, showTime, showDate })
    // Reset form fields
    setMovieName("")
    setDirectorName("")
    setDescription("")
    setShowTime("")
    setShowDate("")
  }

  return (
    <div className="min-h-screen  p-8">
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
                  <Button type="submit" className="w-full">Add Movie</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-details">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600">User Details</CardTitle>
                <CardDescription>View all registered users in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact Number</TableHead>
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600">Ticket Bookings</CardTitle>
                <CardDescription>View the number of tickets booked for each show.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}