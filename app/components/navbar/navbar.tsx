//app/componet
"use client";

import { useSession } from "@/hooks/use-session";
import UserNav from "./components/usernav";

export default function Navbar() {
  const { session } = useSession();
  

  return (
    <>
      {session?.user?.role === "ADMIN" ? (
        <UserNav /> // แสดง navbar สำหรับ admin
      ) : (
        <UserNav /> // แสดง navbar สำหรับ admin
      )}
    </>
  );
}
