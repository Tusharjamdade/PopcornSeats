import { MovieManagementComponent } from '@/components/movie-management'
import UserManagement from '@/hooks/user-management'
import React from 'react'
import {AdminPageComponent}  from "../../components/admin-page";
const page = () => {
  return (
    <div>
      {/* <MovieManagementComponent/>
      <UserManagement/> */}
      <AdminPageComponent/>
      
    </div>
  )
}

export default page
