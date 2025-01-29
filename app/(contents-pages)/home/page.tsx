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

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/banner/getActiveBanner"
        ); // ดึงข้อมูลแบนเนอร์จาก API
        setBanners(response.data); // ตั้งค่าข้อมูลแบนเนอร์ที่ได้รับจาก API
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        {/* Carousel สำหรับแสดงแบนเนอร์ */}
        
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <img
                    src={banner.image} // แสดงภาพแบนเนอร์จากข้อมูลที่ได้
                    alt={banner.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Banner />
        <Footer />
      </div>
    </>
  );
}
