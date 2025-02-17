import { Card, CardContent, CardTitle } from "@/components/ui/card";
import SelectCompanyCard from "./SelectCompanyCard";
type Position = {
  companyId: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  updatedAt: string;
};
type Company = {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string | null;
  otherDescription: string | null;
  location: string | null;
  province: string | null;
  contractName: string | null;
  contractTel: string | null;
  contractEmail: string | null;
  contractSocial: string | null;
  contractSocial_line: string | null;
  establishment: string | null;
  website: string | null;
  benefit: string | null;
  occupation: string | null;
  imgLink: string | null;
  isMou: boolean | null;
  approvalStatus: string;
  createdAt: string; // or Date, depending on your preference
  updatedAt: string; // or Date
  deletedAt: string | null; // 'null' if not deleted
  status : string
  positions: Position[]; // Array of positions
};

const SelectCompany = ({
  data,
  userid,
}: {
  data: Company[] | null;
  userid: string;
}) => {
  if (!data || data.length === 0) {
    return (
      <div>
        <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
          <Card className="p-4 w-fit">
            <CardTitle>บริษัทที่เลือก</CardTitle>
          </Card>
          <div className="my-2 border w-full"></div>
          <Card>
            <CardContent className="p-6">
              <CardTitle className="text-lg font-normal text-center">
                ไม่มีบริษัทที่เลือกอยู่
              </CardTitle>
            </CardContent>
          </Card>
        </div>
      </div>
    ); // หากไม่มีข้อมูลหรือ array ว่าง
  }

  return (
    <div>
      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
        <Card className="p-4 w-fit">
          <CardTitle>บริษัทที่เลือก</CardTitle>
        </Card>
        <div className="my-2 border w-full"></div>
        {data?.map((company) => (
          <SelectCompanyCard
            key={company.id}
            company={company}
            userid={userid}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectCompany;
