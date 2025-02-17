"use client";
import { LuMapPin } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineFax } from "react-icons/md";
import { LuCopyright } from "react-icons/lu";

const Footer = () => {
  return (
    <footer>
      <div className="w-full bg-[#002379] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-12 px-6 lg:px-20 text-white font-semibold font-Sarabun mt-4">
        {/* Column 1 */}
        <div >
          <h3 className="text-lg mb-4">
            สาขาวิชาเทคโนโลยีคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี
          </h3>
          <h3>มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี</h3>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg mb-4">ติดต่อเรา</h3>
          <h3 className="flex gap-2 items-start mb-2">
            <LuMapPin />
            39 หมู่ที่ 1 ตำบลคลองหก อำเภอคลองหลวง จังหวัดปทุมธานี 12110
          </h3>
          <h3 className="flex gap-2 items-center mb-2">
            <BsTelephone /> 0 2549 4168, 0 2549 4197, 0 2549 4198
          </h3>
          <h3 className="flex gap-2 items-center">
            <MdOutlineFax /> 0 2549 4119
          </h3>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg mb-4">
            Division of Computer Technology, Faculty of Science and Technology
          </h3>
          <h3>Rajamangala University of Technology Thanyaburi</h3>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg mb-4">Contact</h3>
          <h3 className="flex gap-2 items-start mb-2">
            <LuMapPin />
            39 หมู่ที่ 1 ตำบลคลองหก อำเภอคลองหลวง จังหวัดปทุมธานี 12110
          </h3>
          <h3 className="flex gap-2 items-center mb-2">
            <BsTelephone /> 0 2549 4168, 0 2549 4197, 0 2549 4198
          </h3>
          <h3 className="flex gap-2 items-center">
            <MdOutlineFax /> 0 2549 4119
          </h3>
        </div>
      </div>

      {/* Section 2: Footer Bottom */}
      <div className="w-full bg-[#FF5F00]">
        <div className="text-white font-semibold font-Sarabun flex justify-center items-center p-4 text-center">
          <h3 className="flex items-center gap-2">
            <LuCopyright /> 2024 สาขาวิชาเทคโนโลยีคอมพิวเตอร์ | CT SCI RMUTT. All rights reserved.
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
