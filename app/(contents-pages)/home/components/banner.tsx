"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col items-center pt-16 bg-white mx-4 md:mx-6">
      {/* หัวข้อ */}
      <div className="text-black font-Prompt font-bold text-xl md:text-2xl">
        <h1>ข่าวประชาสัมพันธ์</h1>
      </div>

      {/* เนื้อหาข่าว */}
      <div className="flex items-center justify-center w-full bg-white mt-6">
        <div className="container text-black overflow-hidden">
          {/* Grid สำหรับการ์ด */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {/* การ์ดข่าว */}
            <div className="card-item font-Sarabun">
              <Link
                href="https://www.sci.rmutt.ac.th/registration2-2024/"
                className="block w-full bg-white p-4 rounded-lg no-underline border border-transparent transition-all duration-200 ease-in-out border-black hover:border-[#FF5F00]"
              >
                {/* รูปภาพ */}
                <div className="relative w-full h-[200px] sm:h-[225px]">
                  <Image
                    src="/landing/new3-register.png"
                    alt="register rmutt Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                {/* หัวข้อ */}
                <h2 className="text-lg text-black mt-4">
                  ใบลงทะเบียนเรียน คณะวิทยาศาสตร์และเทคโนโลยี ภาคการศึกษาที่
                  2/2567
                </h2>
                {/* วันที่ */}
                <p className="text-gray-500 text-sm flex items-center mt-2">
                  25 October 2024
                </p>
                {/* ปุ่ม "อ่านต่อ" */}
                <div className="flex justify-end mt-4">
                  <button className="h-9 px-4 py-1 bg-transparent text-[#FF5F00] border border-[#FF5F00] rounded-lg hover:bg-[#FF5F00] hover:text-white transition-all">
                    อ่านต่อ →
                  </button>
                </div>
              </Link>
            </div>

            {/* การ์ดข่าวเพิ่มเติม */}
            <div className="card-item font-Sarabun">
              <Link
                href="https://it.rmutt.ac.th/?p=5562"
                className="block w-full bg-white p-4 rounded-lg no-underline border border-transparent transition-all duration-200 ease-in-out border-black hover:border-[#FF5F00]"
              >
                <div className="relative w-full h-[200px] sm:h-[225px]">
                  <Image
                    src="/landing/new1-mou.png"
                    alt="MOU Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h2 className="text-lg text-black mt-4">
                  รับสมัครสอบคัดเลือกบุคคลเข้าศึกษา <br />
                  ระดับปริญญาตรี ประจำปีการศึกษา 2568 รอบ MOU
                </h2>
                <p className="text-gray-500 text-sm flex items-center mt-2">
                  1 September 2024
                </p>
                <div className="flex justify-end mt-4">
                  <button className="h-9 px-4 py-1 bg-transparent text-[#FF5F00] border border-[#FF5F00] rounded-lg hover:bg-[#FF5F00] hover:text-white transition-all">
                    อ่านต่อ →
                  </button>
                </div>
              </Link>
            </div>

            <div className="card-item font-Sarabun">
              <Link
                href="https://it.rmutt.ac.th/?p=5463"
                className="block w-full bg-white p-4 rounded-lg no-underline border border-transparent transition-all duration-200 ease-in-out border-black hover:border-[#FF5F00]"
              >
                <div className="relative w-full h-[200px] sm:h-[225px]">
                  <Image
                    src="/landing/new2-rmutt.png"
                    alt="sci rmutt Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h2 className="text-lg text-black mt-4">
                  ช่องทางติดตามข้อมูลข่าวสารสำหรับนักศึกษาใหม่ <br />
                  ปีการศึกษา 2567
                </h2>
                <p className="text-gray-500 text-sm flex items-center mt-2">
                  29 May 2024
                </p>
                <div className="flex justify-end mt-4">
                  <button className="h-9 px-4 py-1 bg-transparent text-[#FF5F00] border border-[#FF5F00] rounded-lg hover:bg-[#FF5F00] hover:text-white transition-all">
                    อ่านต่อ →
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
