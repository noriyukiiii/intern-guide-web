"use client";

import Homepage from "./(contents-pages)/home/page";
import { NavbarMain } from "./(contents-pages)/components/navbar/components/navbar-main";
import { array } from "zod";
const Page = () => {
  return (
    <>
      <NavbarMain />
      {/* <div>
        {Array.from({ length: 20 }).map((_, idx) => (
          <div key={idx} className="w-full h-[50px] bg-rose-200 mt-1">

          </div>
        ))}
      </div> */}
      <Homepage />
    </>
  );
};

export default Page;
