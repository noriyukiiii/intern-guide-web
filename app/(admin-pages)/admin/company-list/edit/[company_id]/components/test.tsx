type Company = {
  company_id: string;
  company_NameTh: string;
  company_NameEn: string;
  description: string | null;
  location: string | null;
  province: string | null;
  contactName: string | null;
  contactTel: string | null;
  contactEmail: string | null;
  contactSocial: string | null;
  contactSocial_line: string | null;
  establishment: string | null;
  website: string | null;
  benefit: string | null;
  occupation: string | null;
  image: string | null;
};

type Option = {
    skill: string[];
    tool: string[];
    province: string[];
    position: string[];
    positiondescription: string[];
  };
  
const HelloTest = ({ company , optionData}: { company: Company; optionData : Option }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p>{company.company_NameTh}</p>
        <p>{company.company_NameEn}</p>
        {optionData.position.map((position, index)=>(
            <div key={index}>
                {position}
            </div>
        ))}

      </div>
    </>
  );
};

export default HelloTest;
