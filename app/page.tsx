"use client";


import React, { useRef, useState } from "react";
import Image from "next/image";
import Banner from "../components/home/components/banner";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Footer from "@/components/home/components/footer";

export default function Homepage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 2; // จำนวนภาพทั้งหมด

  // (admin-pages)/admin/something

  // /admin/something
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.offsetWidth;

      const newIndex = Math.max(currentIndex - 1, 0); // ลด index เพื่อเลื่อนซ้าย
      setCurrentIndex(newIndex);
      container.scrollTo({
        left: newIndex * containerWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      const containerWidth = container.offsetWidth;

      const newIndex = Math.min(
        currentIndex + 1,
        Math.floor(scrollWidth / containerWidth) - 1
      ); // เพิ่ม index เพื่อเลื่อนขวา
      setCurrentIndex(newIndex);
      container.scrollTo({
        left: newIndex * containerWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.offsetWidth;

      setCurrentIndex(index);
      container.scrollTo({
        left: index * containerWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen mt-1">
        {/* ปุ่มเลื่อน */}
        <div className="relative w-full h-[800px]">
          {/* ปุ่มเลื่อนซ้าย */}
          <div
            onClick={scrollLeft}
            className="absolute left-0 h-full top-1/2 transform -translate-y-1/2 z-10 w-16 bg-gradient-to-r from-[#ff7731] to-transparent opacity-30 cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#ff7731] hover:to-transparent hover:opacity-80  hover:shadow-orange-300"
          >
            <IoIosArrowBack
              className="text-orange-500 mx-auto opacity-100 "
              size={60}
            />
          </div>
          <div
            onClick={scrollRight}
            className="absolute right-0 h-full top-1/2 transform -translate-y-1/2 z-10 w-16 bg-gradient-to-r from-transparent via-transparent to-orange-500 opacity-30 cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-transparent hover:to-orange-600 hover:opacity-80  hover:shadow-orange-300"
          >
            <IoIosArrowForward
              className="text-orange-500 mx-auto opacity-100 "
              size={60}
            />
          </div>

          {/* คอนเทนเนอร์เลื่อน */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden  w-full h-[800px]"
          >
            <div className="flex-shrink-0 w-full h-full relative">
              <Image
                src="/landing/homepage_recommend.png"
                alt="Homepage Recommendation"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-shrink-0 w-full h-full relative">
              <Image
                src="/landing/commingsoon.jpg"
                alt="Another Recommendation"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* จุดนำทาง */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {Array.from({ length: totalImages }).map((_, index) => (
              <div
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-orange-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <Banner />
        <Footer />
      </div>
    </>
  );
}
