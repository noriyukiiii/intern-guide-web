"use client";

import Homepage from "./(contents-pages)/home/page";
import { NavbarMain } from "./(contents-pages)/components/navbar/components/navbar-main";

const Page = () => {
  return (
    <div className="">
      <NavbarMain />
      <Homepage />
    </div>
  );
};

export default Page;
