"use client";
import { useEffect, useState } from "react";
import { approvalStatus } from "@prisma/client";
import { useSession } from "@/hooks/use-session";
import axios from "axios";

const MyAppealsPage = () => {
  const [appeals, setAppeals] = useState<any[]>([]);
  const { session } = useSession();
  const [currentPage, setCurrentPage] = useState(1); // page number
  const [itemsPerPage] = useState(10); // กำหนดจำนวนรายการที่จะแสดงต่อหน้า

  useEffect(() => {
    async function fetchAppeals() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_RES_API}/appeal/getAppeal/${session?.user?.id}`
        );
        setAppeals(response.data);
        console.log("Updated Appeals:", response.data);
      } catch (error) {
        console.error("Failed to fetch appeals", error);
      }
    }
    if (session.user?.id) {
      fetchAppeals();
    }
  }, [session?.user?.id]);

  // การคำนวณข้อมูลที่จะแสดงในแต่ละหน้า
  const indexOfLastAppeal = currentPage * itemsPerPage;
  const indexOfFirstAppeal = indexOfLastAppeal - itemsPerPage;
  const currentAppeals = appeals.slice(indexOfFirstAppeal, indexOfLastAppeal);

  // ฟังก์ชันการเปลี่ยนหน้า
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">คำร้องขอ</h1>
      {appeals.length === 0 ? (
        <p>No appeals found</p>
      ) : (
        <>
          <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr className="text-left">
                <th className="px-6 py-3 border-b">ชื่อบริษัท</th>
                <th className="px-6 py-3 border-b text-center">คำขอ</th>
                <th className="px-6 py-3 border-b text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentAppeals.map((appeal) => (
                <tr key={appeal.id} className="hover:bg-gray-100 transition">
                  <td className="px-6 py-4">{appeal.companyName}</td>
                  <td className="px-6 py-4 text-center">{appeal.content}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        appeal.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : appeal.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {appeal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 disabled:bg-gray-400"
            >
              Prev
            </button>
            {Array.from(
              { length: Math.ceil(appeals.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 mx-1 border border-blue-500 rounded-md ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(appeals.length / itemsPerPage)
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyAppealsPage;
