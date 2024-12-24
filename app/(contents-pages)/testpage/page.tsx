"use client";
import { useSession } from "@/hooks/use-session";
import { useEffect, useState } from "react";

export default function Page() {
  const { session } = useSession();


  return (
    <div className="flex items-center w-fit h-fit bg-blue-100">
      <div className="w-full h-fit flex flex-col">
        <h1>User ID: {session?.user?.id}</h1>
        <h1>Email: {session?.user?.email}</h1>
        <h1>First Name: {session?.user?.firstName}</h1>
        <h1>Last Name: {session?.user?.lastName}</h1>
        <h1>Student ID: {session?.user?.studentId}</h1>
        <h1>Telephone: {session?.user?.phone}</h1>
        <h1>Role: {session?.user?.role}</h1>
      </div>
    </div>
  );
}
