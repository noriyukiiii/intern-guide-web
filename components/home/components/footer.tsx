"use client";
import { LuMapPin } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineFax } from "react-icons/md";
import { LuCopyright } from "react-icons/lu";

const Footer = () => {
  return (
    <footer>
      <div className="w-full min-h-[400px] bg-[#002379] grid grid-cols-2 gap-8 py-16 px-[300px] text-white font-semibold font-Sarabun">
        <div>
          <h3>สาขาวิชาเทคโนโลยีคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี</h3>
          <h3>มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี</h3>
        </div>
        <div>
          <h3>ติดต่อเรา</h3>
          <h3 className="flex gap-1 items-center">
            <LuMapPin />
            39 หมู่ที่ 1 ตำบลคลองหก อำเภอคลองหลวง จังหวัดปทุมธานี 12110
          </h3>
          <h3 className="flex gap-1 items-center">
            <BsTelephone />0 2549 4168, 0 2549 4197, 0 2549 4198
          </h3>
          <h3 className="flex gap-1 items-center">
            <MdOutlineFax />0 2549 4119
          </h3>
        </div>
        <div>
          <h3>
            Division of Computer Technology, Faculty of Science and Technology
          </h3>
          <h3>Rajamangala University of Technology Thanyaburi</h3>
        </div>
        <div className="font-medium">
          <h3>Contact</h3>
          <h3 className="flex gap-1 items-center">
            <LuMapPin />
            39 หมู่ที่ 1 ตำบลคลองหก อำเภอคลองหลวง จังหวัดปทุมธานี 12110
          </h3>
          <h3 className="flex gap-1 items-center">
            <BsTelephone />0 2549 4168, 0 2549 4197, 0 2549 4198
          </h3>
          <h3 className="flex gap-1 items-center">
            <MdOutlineFax />0 2549 4119
          </h3>
        </div>
      </div>
      <div className="w-full h-auto bg-[#FF5F00]">
        <div className="text-white font-semibold font-Sarabun flex justify-center">
            <h3 className="p-8 flex gap-1 items-center">
            <LuCopyright />
            2024 สาขาวิชาเทคโนโลยีคอมพิวเตอร์ | CT SCI RMUTT. All rights reserved.
            </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
