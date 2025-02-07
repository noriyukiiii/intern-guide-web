"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
interface Company {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  contractEmail: string;
  contractName: string;
  contractSocial: string;
  contractSocial_line: string;
  contractTel: string;
  description: string;
  establishment: string;
  imgLink: string;
  location: string;
  occupation: string;
  province: string;
  website: string;
  approvalStatus: string;
  benefit: string;
  isMou: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  otherDescription: string | null;
  companyId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    studentId: string;
  };
  userId: string;
}

interface CompanyData {
  company: Company;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    studentId: string;
  };
  companyId: string;
  createdAt: string;
  id: string;
  userId: string;
}


export default function CompanyTable() {
  const [companyData, setCompanyData] = useState<CompanyData[]>([]); // เก็บข้อมูลบริษัท
  const [loading, setLoading] = useState<boolean>(true); // เช็คสถานะการโหลด
  const [error, setError] = useState<string | null>(null); // เก็บ error ถ้ามี

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5555/compCreater");
        setCompanyData(response.data); // เก็บข้อมูลจาก API
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false); // เปลี่ยนสถานะเมื่อโหลดเสร็จ
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div>
        <Button
          onClick={() => {
            console.log(companyData);
          }}
        >
          console log
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ผู้ยื่นคำขอ</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead>Contact Email</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Approval Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companyData.map((compcreater) => (
            <TableRow key={compcreater.id}>
              <TableCell>
                <div>
                  <div className="flex flex-col">
                    <div>
                      {compcreater.user.firstName} {compcreater.user.lastName}
                    </div>
                    <div>{compcreater.user.studentId}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{compcreater.company.companyNameTh}</TableCell>
              <TableCell>{compcreater.company.location}</TableCell>
              <TableCell>{compcreater.company.contractName}</TableCell>
              <TableCell>{compcreater.company.contractEmail}</TableCell>
              <TableCell>
                <a
                  href={compcreater.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {compcreater.company.website}
                </a>
              </TableCell>
              <TableCell>{compcreater.company.approvalStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
