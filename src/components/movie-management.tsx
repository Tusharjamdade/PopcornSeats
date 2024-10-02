'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Movie {
  id: number
  title: string
  director: string
  releaseDate: string
}

export function MovieManagementComponent() {
  const [movies, setMovies] = useState<Movie[]>([
    { id: 1, title: "Inception", director: "Christopher Nolan", releaseDate: "2010-07-16" },
    { id: 2, title: "The Godfather", director: "Francis Ford Coppola", releaseDate: "1972-03-24" },
  ])

  const [newMovie, setNewMovie] = useState({ title: '', director: '', releaseDate: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value })
  }

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault()
    setMovies([...movies, { id: movies.length + 1, ...newMovie }])
    setNewMovie({ title: '', director: '', releaseDate: '' })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Movie Management</h2>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Movie</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMovie} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={newMovie.title} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="director">Director</Label>
              <Input id="director" name="director" value={newMovie.director} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="releaseDate">Release Date</Label>
              <Input id="releaseDate" name="releaseDate" type="date" value={newMovie.releaseDate} onChange={handleInputChange} required />
            </div>
            <Button type="submit">Add Movie</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Movie List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Director</TableHead>
                <TableHead>Release Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>{movie.id}</TableCell>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.director}</TableCell>
                  <TableCell>{movie.releaseDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}