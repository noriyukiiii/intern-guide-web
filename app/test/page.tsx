"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const TestPage = () => {
   const { data, status } = useSession();

   console.log({
      data,
      status,
   });


   return <div onClick={() => signOut()}>{JSON.stringify(data)}</div>;
};

export default TestPage;
