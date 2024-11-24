// 'use client';

// import { useState, useMemo, useEffect } from 'react';
// import axios from 'axios';  // Import axios
// import { Card, CardContent } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import Image from 'next/image';
// import Link from 'next/link';

// // Define the Movie type/interface
// interface Movie {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   time: string;
//   director: string;
//   type?: string;  // Category or type of the movie
//   image?: {
//     type: string;
//     data: Buffer;
//   };
// }

// // Define the type for the image to be used in the getImageSrc function
// interface ImageBuffer {
//   type: string;
//   data: Buffer;
// }

// export function MovieListComponent() {
//   const [movies, setMovies] = useState<Movie[]>([]);  // Apply Movie[] type
//   const [filter, setFilter] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // Fetch movies from the backend using Axios
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(`https://popcornseat-backend.tusharnjamdade.workers.dev/api/movies`);
//         setMovies(response.data.data);  // Assuming the data is in response.data.data
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const categories = useMemo(() => {
//     return ['All', ...Array.from(new Set(movies.map(movie => movie.type || "Unknown")))];
//   }, [movies]);

//   const filteredMovies = useMemo(() => {
//     return movies.filter(movie => 
//       (filter === 'All' || movie.type === filter) &&
//       movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [filter, searchQuery, movies]);

//   const getImageSrc = (image?: ImageBuffer) => { // Use ImageBuffer type
//     if (image && image.type === 'Buffer' && image.data) {
//       // Convert buffer to base64
//       const base64String = Buffer.from(image.data).toString('base64');
//       return `data:image/jpeg;base64,${base64String}`;
//     }
//     return '/placeholder.svg';  // Fallback if no image is present
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Movie List</h1>

//       <div className="mb-6">
//         <Input
//           type="text"
//           placeholder="Search movies..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full max-w-md"
//         />
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">
//         <div className="lg:w-3/4">
//           <div className="mb-6">
//             <Select onValueChange={setFilter} value={filter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories.map(category => (
//                   <SelectItem key={category} value={category}>
//                     {category}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-6">
//             {filteredMovies.map(movie => (
//               <Link key={movie.id} href={`https://popcornseats.vercel.app/movie?movieid=${movie.id}&&name=${movie.title}&&time=${movie.time}&&date=${movie.date}`}>
//                 <Card key={movie.id}>
//                   <CardContent className="p-4">
//                     <div className="flex flex-col sm:flex-row">
//                       <div className="sm:w-1/3 mb-4 sm:mb-0 sm:pr-4">
//                         <Image
//                           src={getImageSrc(movie.image)} // Pass the image object here
//                           alt={movie.title}
//                           width={300}
//                           height={200}
//                           className="w-full h-48 object-cover rounded"
//                         />
//                       </div>
//                       <div className="sm:w-2/3">
//                         <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
//                         <p className="text-sm text-gray-600 mb-1">Date: {movie.date}</p>
//                         <p className="text-sm text-gray-600 mb-1">Time: {movie.time}</p>
//                         <p className="text-sm text-gray-600 mb-2">Director: {movie.director}</p>
//                         <p className="text-sm text-gray-700 mb-2">{movie.description}</p>
//                         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
//                           {movie.type || 'Unknown'} {/* Display category or fallback to 'Unknown' */}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         </div>

//         <div className="lg:w-1/4">
//           <Card>
//             <CardContent className="p-4">
//               <h2 className="text-xl font-semibold mb-4">Categories</h2>
//               <ul className="space-y-2">
//                 {categories.map(category => (
//                   <li key={category}>
//                     <button
//                       onClick={() => setFilter(category)}
//                       className={`w-full text-left px-2 py-1 rounded ${
//                         filter === category ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  director: string;
  type?: string;
  image?: {
    type: string;
    data: Buffer;
  };
}

interface ImageBuffer {
  type: string;
  data: Buffer;
}

export function MovieListComponent() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://popcornseat-backend.tusharnjamdade.workers.dev/api/movies`
        );
        setMovies(data.data || []); // Handle possible undefined data
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  // Dynamically compute categories
  const categories = useMemo(() => ['All', ...new Set(movies.map(movie => movie.type || 'Unknown'))], [movies]);

  // Filter and search logic
  const filteredMovies = useMemo(() => {
    return movies.filter(
      movie =>
        (filter === 'All' || movie.type === filter) &&
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filter, searchQuery, movies]);

  // Convert image buffer to a usable source
  const getImageSrc = (image?: ImageBuffer) => {
    if (image?.type === 'Buffer' && image.data) {
      const base64String = Buffer.from(image.data).toString('base64');
      return `data:image/jpeg;base64,${base64String}`;
    }
    return '/placeholder.svg';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Movie List</h1>

      <Input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md mb-6"
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Movie List Section */}
        <div className="lg:w-3/4">
          <Select onValueChange={setFilter} value={filter}>
            <SelectTrigger className="w-[180px] mb-6">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-6">
            {filteredMovies.map(movie => (
              <Link
                key={movie.id}
                href={`/movie?movieid=${movie.id}&name=${movie.title}&time=${movie.time}&date=${movie.date}`}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 mb-4 sm:mb-0 sm:pr-4">
                        <Image
                          src={getImageSrc(movie.image)}
                          alt={movie.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                      <div className="sm:w-2/3">
                        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                        <p className="text-sm text-gray-600">Date: {movie.date}</p>
                        <p className="text-sm text-gray-600">Time: {movie.time}</p>
                        <p className="text-sm text-gray-600">Director: {movie.director}</p>
                        <p className="text-sm text-gray-700 mb-2">{movie.description}</p>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                          {movie.type || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Section */}
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
                        filter === category
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-gray-100'
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
  );
}

