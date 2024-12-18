"use client"
import {MovieListComponent} from "../components/movie-list"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  const {  status } = useSession()
  console.log(status)
  if(status == "unauthenticated"){
    router.push("/app")
  }
  return (
    <div>
      <MovieListComponent/>
    </div>
  );
}
