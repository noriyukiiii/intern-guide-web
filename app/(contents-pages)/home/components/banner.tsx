"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [newsBanners, setNewsBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/newsbanner/getActiveBanner"
        );
        setNewsBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsBanners();
  }, []);

  return (
    <div className="flex flex-col items-center pt-16 bg-white mx-4 md:mx-6">
      {/* หัวข้อ */}
      <div className="text-black font-Prompt font-bold text-xl md:text-2xl">
        <h1>ข่าวประชาสัมพันธ์</h1>
      </div>

      {/* เนื้อหาข่าว */}
      <div className="flex items-center justify-center w-full bg-white mt-6">
        <div className="container text-black overflow-hidden">
          {loading ? (
            <p>กำลังโหลด...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {newsBanners.map((banner, index) => (
                <div key={index} className="w-full max-w-sm mx-auto">
                  <Link
                    href={banner.linkUrl}
                    className="block bg-white p-4 rounded-lg no-underline border border-transparent transition-all duration-200 ease-in-out border-black hover:border-[#FF5F00]"
                  >
                    {/* รูปภาพ */}
                    <div className="relative w-full h-[200px] sm:h-[225px]">
                      <Image
                        src={banner.image}
                        alt={banner.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    {/* หัวข้อ */}
                    <h2 className="text-lg text-black mt-4">{banner.title}</h2>
                    {/* วันที่ */}
                    <p className="text-gray-500 text-sm flex items-center mt-2">
                      {/* {banner.date} */}
                    </p>
                    {/* ปุ่ม "อ่านต่อ" */}
                    <div className="flex justify-end mt-4">
                      <button className="h-9 px-4 py-1 bg-transparent text-[#FF5F00] border border-[#FF5F00] rounded-lg hover:bg-[#FF5F00] hover:text-white transition-all">
                        อ่านต่อ →
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
