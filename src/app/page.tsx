import { HomePage } from "@/components/component/home-page";
import {ModeToggle} from "../components/component/ModeToggle"
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
