"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function IntroductionPageComponent() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    "/bg.jpg",
    "/bg2.png",
    "/bg3.jpeg",
    // "/placeholder.svg?height=1080&width=1920&text=Movie+2",
    // "/placeholder.svg?height=1080&width=1920&text=Movie+3"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {images.map((src, index) => (
        <motion.div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
            Welcome to PopcornSeats
          </h1>
          <p className="text-xl sm:text-2xl mb-8" style={{ color: "#D1D5DB" }}>
            Your premier destination for booking movie experiences
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row"
        >
          <Button asChild className="bg-[#ee5151] rounded-lg hover:bg-[#B91C1C] text-white px-8 py-3  text-lg">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild className="bg-[#578de3] rounded-lg hover:bg-[#2563EB] text-white px-8 py-3 text-lg">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4" style={{ color: "#FFFFFF" }}>
            Why Choose PopcornSeats?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#FFFFFF] bg-opacity-10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#FFFFFF" }}>
                Wide Selection
              </h3>
              <p style={{ color: "#D1D5DB" }}>
                Access to the latest movies and exclusive premieres
              </p>
            </div>
            <div className="bg-[#FFFFFF] bg-opacity-10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#FFFFFF" }}>
                Easy Booking
              </h3>
              <p style={{ color: "#D1D5DB" }}>
                Simple and fast ticket reservation process
              </p>
            </div>
            <div className="bg-[#FFFFFF] bg-opacity-10 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2" style={{ color: "#FFFFFF" }}>
                Great Deals
              </h3>
              <p style={{ color: "#D1D5DB" }}>
                Regular discounts and special offers for movie lovers
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
