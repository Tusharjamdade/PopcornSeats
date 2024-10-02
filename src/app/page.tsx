import { HomePage } from "@/components/component/home-page";
import {ModeToggle} from "../components/component/ModeToggle"
import {MovieListComponent} from "../components/movie-list"
export default function Home() {
  return (
    <div>
      <ModeToggle/>
      {/* <HomePage/> */}
      <MovieListComponent/>
      {/* <TheaterBooking/> */}
      
      {/* <SeatDetailsPayment/> */}
    </div>
  );
}
