"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function SignUp() {
  const router = useRouter()
  const [userType, setUserType] = useState("user")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminCode, setAdminCode] = useState("")

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault()

    if (userType === "admin" && adminCode !== "786123") {
      alert("Invalid admin code")
      return
    }

    const role = userType === "admin" ? "admin" : "user"

    const data = { email, password, role }

    try {
      const response = await axios.post("http://localhost:3000/api/signup", data)
      if(response){
        router.push("/signin")
      }
      if (response.status === 200) {
        console.log("User signed up successfully")
        
        // Redirect the user or show a success message here
      } else {
        console.error("Failed to sign up")
      }
    } catch (error) {
      console.error("Error signing up:", error)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select onValueChange={setUserType} defaultValue={userType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {userType === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="adminCode">Admin Code</Label>
                  <Input
                    id="adminCode"
                    type="text"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Enter admin code"
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:flex w-1/2 bg-cover bg-center items-center justify-center p-8" style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}>
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome Back!</h2>
          <p className="text-xl text-gray-700">
          &quot;The future belongs to those who believe in the beauty of their dreams.&quot;
          </p>
          <p className="text-lg mt-2 text-gray-600">- Eleanor Roosevelt</p>
        </div>
      </div>
    </div>
  )
}
