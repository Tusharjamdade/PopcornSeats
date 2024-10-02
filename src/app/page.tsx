import { HomePage } from "@/components/component/home-page";
import Image from "next/image";
import TheaterBooking from "../components/theater-booking"
import {ModeToggle} from "../components/component/ModeToggle"
import SeatDetailsPaymen from "../components/seat-details-payment"
export default function Home() {
  return (
    <div>
      <ModeToggle/>
      <HomePage/>
      {/* <TheaterBooking/> */}
      
      {/* <SeatDetailsPayment/> */}
    </div>
  );
}
