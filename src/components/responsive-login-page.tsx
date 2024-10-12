// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react"; // Use next-auth signIn
// import { useRouter } from "next/navigation"; // Import useRouter for redirection
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// export default function SignInPage() {
//   const [userType, setUserType] = useState("user");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [adminCode, setAdminCode] = useState("");
//   const router = useRouter(); // Initialize router

//   const handleSignIn = async (event: React.FormEvent) => {
//     event.preventDefault();
    
//     const result = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//       userType,
//       adminCode: userType === "admin" ? adminCode : undefined, // Send admin code if user selects admin
//     });

//     if (result?.error) {
//       console.error("Sign in failed:", result.error);
//     } else {
//       console.log("Sign in successful");
//       router.push("/"); // Redirect to home page after successful sign-in
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
//       <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle>Sign In</CardTitle>
//             <CardDescription>Enter your credentials to access your account</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSignIn} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="userType">User Type</Label>
//                 <Select onValueChange={setUserType} defaultValue={userType}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select user type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="user">User</SelectItem>
//                     <SelectItem value="admin">Admin</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               {userType === "admin" && (
//                 <div className="space-y-2">
//                   <Label htmlFor="adminCode">Admin Code</Label>
//                   <Input
//                     id="adminCode"
//                     type="text"
//                     placeholder="Enter admin code"
//                     required={userType === "admin"}
//                     value={adminCode}
//                     onChange={(e) => setAdminCode(e.target.value)}
//                   />
//                 </div>
//               )}
//               <Button type="submit" className="w-full">
//                 Sign In
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="hidden lg:flex w-1/2 bg-cover bg-center items-center justify-center p-8" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
//         <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg">
//           <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome Back!</h2>
//           <p className="text-xl text-gray-700">
//           &quot;The future belongs to those who believe in the beauty of their dreams.&quot;
//           </p>
//           <p className="text-lg mt-2 text-gray-600">- Eleanor Roosevelt</p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // Use next-auth signIn
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SignInPage() {
  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const router = useRouter(); // Initialize router

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      userType,
      adminCode: userType === "admin" ? adminCode : undefined, // Send admin code if user selects admin
    });

    if (result?.error) {
      setError(result.error); // Set error message
    } else {
      // Redirect based on user role
      if (result?.user?.role === 'admin') {
        router.push("/admin-dashboard"); // Redirect admin to dashboard
      } else {
        router.push("/"); // Redirect regular users to home
      }
    }
  };

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
              {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    placeholder="Enter admin code"
                    required={userType === "admin"}
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                Sign In
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
  );
}
