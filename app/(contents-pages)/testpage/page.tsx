"use client";
import { useEffect, useState } from 'react';

interface User {
  user_id: string;
  email: string;
  firstname: string;
  lastname: string;
  student_id: string;
  telephone: string;
  role: string;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/session');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data: User = await response.json();
        console.log('User data:', data);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex items-center w-fit h-fit bg-blue-100">
      <div className="w-full h-fit flex flex-col">
        <h1>User ID: {user ? user.user_id : "Loading..."}</h1>
        <h1>Email: {user ? user.email : "Loading..."}</h1>
        <h1>First Name: {user ? user.firstname : "Loading..."}</h1>
        <h1>Last Name: {user ? user.lastname : "Loading..."}</h1>
        <h1>Student ID: {user ? user.student_id : "Loading..."}</h1>
        <h1>Telephone: {user ? user.telephone : "Loading..."}</h1>
        <h1>Role: {user ? user.role : "Loading..."}</h1>
      </div>
    </div>
  );
}
