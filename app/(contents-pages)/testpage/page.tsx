"use client";

import { useEffect, useState } from "react";

interface User {
  user_id: string;
  firstname: string;
  lastname: string;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:2546/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex items-center w-fit h-[100px] bg-blue-100">
      {users.map(user => (
        <div key={user.user_id} className="w-full h-fit flex flex-col">
          <h1>id: {user.user_id}</h1>
          <h1>ชื่อ: {user.firstname}</h1>
          <h1>นามสกุล: {user.lastname}</h1>
        </div>
      ))}
    </div>
  );
}
