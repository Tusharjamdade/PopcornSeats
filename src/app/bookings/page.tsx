"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import SeatDetailsPayment   from "../../components/seat-details-payment";
const page = () => {
  const searchParams = useSearchParams()
  return (
    <div>
      {/* <SeatDetailsPayment/> */}
      {/* hi there
      {searchParams.toString()} */}
      <SeatDetailsPayment/>

    </div>
  )
}

export default page
