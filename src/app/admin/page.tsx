"use client";

import React from "react";
import { AdminPageComponent } from "../../components/admin-page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => { // Updated to uppercase 'Page'
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/app");
    return null; // Ensure no further rendering happens during navigation
  }

  return (
    <div>
      {/* Add your components here */}
      <AdminPageComponent />
    </div>
  );
};

export default Page;
