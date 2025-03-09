"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Banner from "./components/banner";
import Footer from "@/components/home/components/footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Homepage() {
  const [banners, setBanners] = useState<any[]>([]); // สถานะสำหรับเก็บข้อมูลแบนเนอร์
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // เพิ่ม loading state

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "https://api-sigma-azure-86.vercel.app/banner/getActiveBanner"
        ); // ดึงข้อมูลแบนเนอร์จาก API
        setBanners(response.data); // ตั้งค่าข้อมูลแบนเนอร์ที่ได้รับจาก API
        setLoading(false); // เปลี่ยนค่า loading เป็น false เมื่อการดึงข้อมูลเสร็จสิ้น
      } catch (error) {
        console.error("Error fetching banners:", error);
        setLoading(false); // เปลี่ยนค่า loading เป็น false เมื่อเกิดข้อผิดพลาด
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    ); // แสดง "Loading..." ขณะโหลดข้อมูล
  }

  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        {/* Carousel สำหรับแสดงแบนเนอร์ */}
        <div className="flex justify-center items-center ">
          <Carousel className="w-full max-w-[1700px] h-[720px]">
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem key={index} className="h-[720px]">
                  <div className="p-1 h-full">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-3" />
            <CarouselNext className="absolute right-3" />
          </Carousel>
        </div>
        <Banner />
        <Footer />
      </div>
    </>
  );
}
