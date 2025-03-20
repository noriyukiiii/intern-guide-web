"use client";

import React, { useEffect, useState } from "react";
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
  const [banners, setBanners] = useState<any[]>([]); // เก็บข้อมูลแบนเนอร์
  const [loading, setLoading] = useState(true); // กำหนด loading state

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_RES_API}/banner/getActiveBanner`
        );
        setBanners(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-screen">
      {/* 📌 ปรับขนาด Carousel ให้ไม่ล้น */}
      <div className="flex justify-center items-center w-full max-w-screen mx-auto">
        <Carousel className="w-full  overflow-hidden relative">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index} className="w-full h-[20vh] md:h-[80vh] flex items-center justify-center">
                <div className="p-1 w-full h-full">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 text-white" />
          <CarouselNext className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 text-white" />
        </Carousel>
      </div>
      <Banner />
      <Footer />
    </div>
  );
}
