import { HomePage } from "@/components/component/home-page";
import Image from "next/image";
import {TheaterBooking} from "../components/theater-booking"
import {ModeToggle} from "../components/component/ModeToggle"
export default function Home() {
  return (
    <div>
      <ModeToggle/>
      <HomePage/>
      <TheaterBooking/>
    </div>
  );
}
