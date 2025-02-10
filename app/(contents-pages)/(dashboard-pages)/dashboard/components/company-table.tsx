import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Company } from "@/lib/dashboardtype";

// สร้าง interface สำหรับ props ของ CompanyTable
interface CompanyTableProps {
  allData: Company[]; // รับข้อมูลเฉพาะบริษัทเป็น array ของ Company
}

export default function CompanyTable({ allData }: CompanyTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>ลำดับ</TableHead>
            <TableHead>Company Name (TH)</TableHead>
            <TableHead>Company Name (EN)</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Province</TableHead>
            <TableHead>Website</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[400px] overflow-y-auto block bg-sky-50">
          {allData.map((company: Company, index: number) => (
            <TableRow key={company.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{company.companyNameTh}</TableCell>
              <TableCell>{company.companyNameEn}</TableCell>
              <TableCell>{company.description}</TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell>{company.province}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
