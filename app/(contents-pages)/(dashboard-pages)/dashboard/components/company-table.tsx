import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Company } from "@/lib/dashboardtype";

interface CompanyTableProps {
  allData: Company[];
}

export default function CompanyTable({ allData }: CompanyTableProps) {
  return (
    <div className="m-6 border rounded-lg shadow-md overflow-hidden font-Prompt">
      <div className="max-h-[500px] overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white z-10 shadow-md">
            <tr>
              <th className="p-3 text-left border-b">ลำดับ</th>
              <th className="p-3 text-left border-b">ชื่อบริษัท (TH)</th>
              <th className="p-3 text-left border-b">ชื่อบริษัท (EN)</th>
              <th className="p-3 text-center border-b w-[150px]">สวัสดิการ</th>
              <th className="p-3 text-left border-b">ที่ตั้ง</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((company: Company, index: number) => (
              <tr key={company.id} className="even:bg-gray-100">
                <td className="p-3 border-b">{index + 1}</td>
                <td className="p-3 border-b truncate max-w-[150px]">{company.companyNameTh}</td>
                <td className="p-3 border-b truncate max-w-[150px]">{company.companyNameEn}</td>
                <td>
                  <div
                    className={`flex justify-center mx-6 rounded-2xl p-2 truncate max-w-[120px] ${
                      company.benefit
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {company.benefit ? "มีสวัสดิการ" : "ไม่มีข้อมูล"}
                  </div>
                </td>
                <td className="p-3 border-b truncate max-w-[200px]">{company.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
