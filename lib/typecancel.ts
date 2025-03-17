export interface Tool {
    id: string;
    name: string;
    skillId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }
  
  export interface Skill {
    id: string;
    name: string;
    pos_des_id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    tools: Tool[];
  }
  
  export interface PositionDescription {
    id: string;
    positionId: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    skills: Skill[];
  }
  
  export interface Position {
    id: string;
    name: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    position_description: PositionDescription[];
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
    positions: Position[];
  }
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    studentId: string;
  }
  
  export interface Appeal {
    id: string;
    companyId: string;
    userId: string;
    student_name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    company: Company;
    user: User;
  }
  
  export type Appeals = Appeal[];
  