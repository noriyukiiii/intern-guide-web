"use client";
import { Role } from "@prisma/client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserProp {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    studentId: string;
    emailVerified: Date | null;
    image: string;
    password: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }[];
}

const UserTable = ({ user }: UserProp) => {
  const [page, selectPage] = useState("MEMBER");
  const [currentPage, setCurrentPage] = useState(1); // หน้าเริ่มต้น
  const [itemsPerPage, setItemsPerPage] = useState(5); // จำนวนรายการต่อหน้า

  // กรองและแบ่งข้อมูลตาม role และ pagination
  const filteredUsers = user.filter((u) => u.role === page);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="flex gap-2 mb-2 font-Prompt">
        <button
          onClick={() => {
            selectPage("MEMBER");
            setCurrentPage(1); // รีเซ็ตหน้าเมื่อเปลี่ยน role
          }}
          className={`px-4 py-2 border w-[100px] rounded-xl ${
            page === "MEMBER" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          MEMBER
        </button>
        <button
          onClick={() => {
            selectPage("ADMIN");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 border w-[100px] rounded-xl ${
            page === "ADMIN" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          ADMIN
        </button>
      </div>

      <div className="border rounded-md font-Sarabun">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">ลำดับ</TableHead>
              <TableHead className="w-[250px]">ชื่อ / email</TableHead>
              <TableHead className="w-[150px] text-left">โทรศัพท์</TableHead>
              <TableHead className="w-[200px]">รหัสนักศึกษา</TableHead>
              <TableHead className="w-[200px] text-center">สถานะ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex font-semibold">
                    {user.firstName} {user.lastName}
                  </div>
                  <span className="font-light">{user.email}</span>
                </TableCell>
                <TableCell className="text-left">{user.phone}</TableCell>
                <TableCell>{user.studentId}</TableCell>
                <TableCell className="flex justify-center items-center">
                  <div
                    className={`w-fit h-fit p-2 rounded-md ${
                      page === "MEMBER" ? "bg-green-300" : "bg-rose-300"
                    }`}
                  >
                    {user.role}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <div className="flex justify-between items-center p-2">
              {/* ตัวเลือกจำนวนที่แสดง */}
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // รีเซ็ตหน้าเมื่อเปลี่ยนจำนวนที่แสดง
                }}
                className="border p-2 rounded-md"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>

              {/* Pagination */}
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                  }`}
                >
                  ก่อนหน้า
                </button>
                <span className="px-2 items-center flex">
                  หน้า {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-300"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default UserTable;
