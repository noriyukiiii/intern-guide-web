export interface ChartMainData {
  [key: string]: number; // รองรับค่าต่างๆ ที่มีจำนวน
}
export interface Company {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string;
  otherDescription: string;
  location: string;
  province: string;
  contractName: string;
  contractTel: string;
  contractEmail: string;
  contractSocial: string;
  contractSocial_line: string;
  establishment: string;
  website: string;
  benefit: string;
  occupation: string;
  imgLink: string;
  isMou: boolean;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  positions: Array<{
    id: string;
    name: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}

export interface ChartData {
  occupation: ChartMainData;
  position: ChartMainData;
  benefit: ChartMainData;
  province: ChartMainData;
  company: Company[];
}
