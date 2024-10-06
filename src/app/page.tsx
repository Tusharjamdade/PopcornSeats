"use client"
import { HomePage } from "@/components/component/home-page";
import {ModeToggle} from "../components/component/ModeToggle"
import {MovieListComponent} from "../components/movie-list"
import { useSession } from "next-auth/react"
export default function Home() {
  const { data: session, status } = useSession()
  return (
    <div>
      {/* <ModeToggle/> */}
      {/* <HomePage/> */}
      {/* {session?.user?.email}
      {session?.user?.role} */}
      <MovieListComponent/>
      {/* <TheaterBooking/> */}
      
      {/* <SeatDetailsPayment/> */}
    </div>
  );
}
