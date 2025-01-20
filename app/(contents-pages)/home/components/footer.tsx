"use client";
import { LuMapPin } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineFax } from "react-icons/md";
import { LuCopyright } from "react-icons/lu";

const Footer = () => {
  return (
    <footer>
      <div className="w-full bg-[#002379] text-white font-semibold font-Sarabun py-16 px-8 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Section 1 */}
          <div>
            <h3>สาขาวิชาเทคโนโลยีคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี</h3>
            <h3>มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี</h3>
          </div>
          {/* Section 2 */}
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
          {/* Section 3 */}
          <div>
            <h3>
              Division of Computer Technology, Faculty of Science and Technology
            </h3>
            <h3>Rajamangala University of Technology Thanyaburi</h3>
          </div>
          {/* Section 4 */}
          <div>
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
      </div>
      {/* Copyright Section */}
      <div className="w-full bg-[#FF5F00]">
        <div className="text-white font-semibold font-Sarabun flex justify-center py-8">
          <h3 className="flex gap-1 items-center">
            <LuCopyright />
            2024 สาขาวิชาเทคโนโลยีคอมพิวเตอร์ | CT SCI RMUTT. All rights
            reserved.
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
