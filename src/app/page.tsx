"use client"
import {MovieListComponent} from "../components/movie-list"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  const {  status } = useSession()
  if(status == "unauthenticated"){
    router.push("/app")
  }
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
