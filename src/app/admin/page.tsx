"use client"
import React from 'react'
import {AdminPageComponent}  from "../../components/admin-page";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const page = () => {
  const {status,data} = useSession()
  const router = useRouter()
  console.log(data)
  if(status == "unauthenticated"){
    router.push("/app")
  }
  return (
    <div>
      {/* <MovieManagementComponent/>
      <UserManagement/> */}
      <AdminPageComponent/>
      
    </div>
  )
}

export default page
