// "use client"
// import React from 'react'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// interface User {
//   id: number
//   name: string
//   email: string
//   registrationDate: string
// }

// const initialUsers: User[] = [
//   { id: 1, name: "John Doe", email: "john@example.com", registrationDate: "2023-01-15" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", registrationDate: "2023-02-20" },
//   { id: 3, name: "Bob Johnson", email: "bob@example.com", registrationDate: "2023-03-10" },
// ]

// export default function UserManagement() {
//   const [users, setUsers] = React.useState<User[]>(initialUsers)
//   const [searchTerm, setSearchTerm] = React.useState('')

//   const filteredUsers = users.filter(user => 
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">User Management</h2>
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Search Users</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-2">
//             <Label htmlFor="search" className="sr-only">Search</Label>
//             <Input
//               id="search"
//               placeholder="Search by name or email"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle>User List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Registration Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredUsers.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.registrationDate}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

import React from 'react'

const usermanagement = () => {
  return (
    <div>
      
    </div>
  )
}

export default usermanagement
