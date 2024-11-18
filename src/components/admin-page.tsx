// "use client"

// import { useEffect, useState } from "react"
// import axios from "axios"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Film, Users, Ticket } from "lucide-react"

// export function AdminPageComponent() {

//   // Custom hook to fetch users
//   const useUsers = () => {
//     const [users, setUsers] = useState([]);
  
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8787/api/users");
//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
  
//     useEffect(() => {
//       fetchUsers();
//     }, []);
  
//     return users;
//   };
  
//   // Custom hook to fetch bookings
//   const useBookings = () => {
//     const [bookings, setBookings] = useState([]); // Initialize as array
//     const [loading, setLoading] = useState(true); // Loading state
  
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8787/api/getmovies");
//         if (!response.ok) {
//           throw new Error("Failed to fetch bookings");
//         }
//         const data = await response.json();
//         setBookings(data || []); // Ensure fallback to array
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       fetchBookings();
//     }, []);
  
//     return { bookings, loading };
//   };

//   // Example usage of hooks
//   const users = useUsers(); // Hook to fetch users
//   const { bookings, loading } = useBookings(); // Hook to fetch bookings

//   // Form states for adding movies
//   const [movieName, setMovieName] = useState("")
//   const [directorName, setDirectorName] = useState("")
//   const [description, setDescription] = useState("")
//   const [showTime, setShowTime] = useState("")
//   const [showDate, setShowDate] = useState("")
//   const [image, setImage] = useState<File | null>(null)
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const [selectedType, setSelectedType] = useState("Sci-fi") // Default value for type

//   const movieTypes = ["Hollywood", "Bollywood", "Sci-fi", "Action", "Comedy", "Drama"]

//   const handleAddMovie = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const formData = new FormData()
//     formData.append("title", movieName)
//     formData.append("directorName", directorName)
//     formData.append("description", description)
//     formData.append("showTime", showTime)
//     formData.append("showDate", showDate)
//     formData.append("type", selectedType) // Include selected movie type
//     if (image) {
//       formData.append("image", image)
//     }

//     try {
//       const response = await axios.post(`http://127.0.0.1:8787/api/movies`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       console.log("Movie added successfully:", response.data)

//       // Reset form fields
//       setMovieName("")
//       setDirectorName("")
//       setDescription("")
//       setShowTime("")
//       setShowDate("")
//       setImage(null)
//       setSelectedType("") // Reset dropdown to default value
//     } catch (error) {
//       console.error("Error adding movie:", error)
//     }
//   }

//   // Toggle dropdown for movie type
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen)
//   }

//   // Handle movie type selection
//   const handleSelectType = (type: string) => {
//     setSelectedType(type)
//     setDropdownOpen(false) // Close the dropdown after selecting
//   }

//   return (
//     <div className="min-h-screen p-8">
//       <div className="container mx-auto">
//         <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Movie Booking Admin Panel</h1>
        
//         <Tabs defaultValue="add-movie" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-3 gap-4">
//             <TabsTrigger value="add-movie" className="flex items-center justify-center space-x-2">
//               <Film className="w-5 h-5" />
//               <span>Add Movie</span>
//             </TabsTrigger>
//             <TabsTrigger value="user-details" className="flex items-center justify-center space-x-2">
//               <Users className="w-5 h-5" />
//               <span>User Details</span>
//             </TabsTrigger>
//             <TabsTrigger value="bookings" className="flex items-center justify-center space-x-2">
//               <Ticket className="w-5 h-5" />
//               <span>Bookings</span>
//             </TabsTrigger>
//           </TabsList>

//           {/* Add Movie Tab */}
//           <TabsContent value="add-movie">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-blue-600">Add New Movie</CardTitle>
//                 <CardDescription>Enter the details of the new movie to add it to the system.</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleAddMovie} className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="movieName">Movie Name</Label>
//                       <Input
//                         id="movieName"
//                         value={movieName}
//                         onChange={(e) => setMovieName(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="directorName">Director Name</Label>
//                       <Input
//                         id="directorName"
//                         value={directorName}
//                         onChange={(e) => setDirectorName(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="showTime">Show Time</Label>
//                       <Input
//                         id="showTime"
//                         type="time"
//                         value={showTime}
//                         onChange={(e) => setShowTime(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="showDate">Show Date</Label>
//                       <Input
//                         id="showDate"
//                         type="date"
//                         value={showDate}
//                         onChange={(e) => setShowDate(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="description">Description</Label>
//                     <Textarea
//                       id="description"
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       required
//                     />
//                   </div>

//                   {/* Movie Type Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={toggleDropdown}
//                       id="dropdownDefaultButton"
//                       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full"
//                       type="button"
//                     >
//                       {selectedType} {/* Display selected movie type */}
//                       <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4"/>
//                       </svg>
//                     </button>
//                     {dropdownOpen && (
//                       <div id="dropdown" className="z-10 absolute w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
//                         <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                           {movieTypes.map((type) => (
//                             <li key={type}>
//                               <button
//                                 type="button"
//                                 onClick={() => handleSelectType(type)}
//                                 className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                               >
//                                 {type}
//                               </button>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>

//                   {/* Movie Image */}
//                   <div className="space-y-2">
//                     <Label htmlFor="image">Upload Movie Image</Label>
//                     <Input
//                       id="image"
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
//                     />
//                   </div>

//                   <Button type="submit" className="w-full mt-6">Add Movie</Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* User Details Tab */}
//           <TabsContent value="user-details">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-blue-600">User Details</CardTitle>
//                 <CardDescription>View and manage registered users.</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Id</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead>Password</TableHead>
//                       <TableHead>Role</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {users.map((user) => (
//                       <TableRow key={user.id}>
//                         <TableCell>{user.id}</TableCell>
//                         <TableCell>{user.email}</TableCell>
//                         <TableCell>{user.password}</TableCell>
//                         <TableCell>{user.role}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Bookings Tab */}
//           <TabsContent value="bookings">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-blue-600">Booking Details</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {loading ? (
//                   <p>Loading bookings...</p>
//                 ) : bookings.length === 0 ? (
//                   <p>No bookings available.</p>
//                 ) : (
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Movie Name</TableHead>
//                         <TableHead>Show Time</TableHead>
//                         <TableHead>Show Date</TableHead>
//                         <TableHead>Tickets Booked</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {bookings.map((booking) => (
//                         <TableRow key={booking.id}>
//                           <TableCell>{booking.movieName}</TableCell>
//                           <TableCell>{booking.showTime}</TableCell>
//                           <TableCell>{booking.showDate}</TableCell>
//                           <TableCell>{booking.ticketsBooked}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Users, Ticket } from "lucide-react";

export function AdminPageComponent() {
  // Custom hook to fetch users
  const useUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8787/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    useEffect(() => {
      fetchUsers();
    }, []);

    return users;
  };

  // Custom hook to fetch bookings
  const useBookings = () => {
    const [bookings, setBookings] = useState([]); // Initialize as array
    const [loading, setLoading] = useState(true); // Loading state

    const fetchBookings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8787/api/getmovies");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data.data || []); // Extract the 'data' array from the response
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchBookings();
    }, []);

    return { bookings, loading };
  };

  // Example usage of hooks
  const users = useUsers(); // Hook to fetch users
  const { bookings, loading } = useBookings(); // Hook to fetch bookings

  // Form states for adding movies
  const [movieName, setMovieName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [description, setDescription] = useState("");
  const [showTime, setShowTime] = useState("");
  const [showDate, setShowDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Sci-fi"); // Default value for type

  const movieTypes = ["Hollywood", "Bollywood", "Sci-fi", "Action", "Comedy", "Drama"];

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", movieName);
    formData.append("directorName", directorName);
    formData.append("description", description);
    formData.append("showTime", showTime);
    formData.append("showDate", showDate);
    formData.append("type", selectedType); // Include selected movie type
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8787/api/movies`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Movie added successfully:", response.data);

      // Reset form fields
      setMovieName("");
      setDirectorName("");
      setDescription("");
      setShowTime("");
      setShowDate("");
      setImage(null);
      setSelectedType(""); // Reset dropdown to default value
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // Toggle dropdown for movie type
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle movie type selection
  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setDropdownOpen(false); // Close the dropdown after selecting
  };

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

          {/* Add Movie Tab */}
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

                  {/* Movie Image */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Upload Movie Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    />
                  </div>

                  <Button type="submit" className="w-full mt-6">Add Movie</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Details Tab */}
          <TabsContent value="user-details">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600">User Details</CardTitle>
                <CardDescription>View and manage registered users.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.password}</TableCell>
                        <TableCell>{user.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600">Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading bookings...</p>
                ) : bookings.length === 0 ? (
                  <p>No bookings available.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Movie id</TableHead>
                        <TableHead>Movie Name</TableHead>
                        <TableHead>Director</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.id}</TableCell>
                          <TableCell>{booking.title}</TableCell>
                          <TableCell>{booking.director}</TableCell>
                          <TableCell>{booking.type}</TableCell>
                          <TableCell>{booking.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
