interface CompanyDetailProps {
  company: {
    company_id: string;
    company_name_th: string;
    company_name_en: string;
    company_description: string | null;
    company_location: string | null;
    company_province: string | null;
    company_website: string | null;
    company_logo: string | null;
    position_descriptions: string | null;
    position_names: string;
    skill_names: string;
    tools_names: string;
  };
}

const CompDetail = ({ company }: CompanyDetailProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg p-6 gap-6">
      {/* รูปภาพ */}
      <div className="flex w-full h-full md:w-1/3 items-center justify-center">
        <img
          src={
            company.company_logo ||
            "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
          }
          alt="Company Logo"
          className="max-w-full max-h-full object-contain rounded-lg border border-gray-200"
        />
      </div>

      {/* ข้อมูลบริษัท */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {company.company_name_en || "Unknown Company"}
        </h1>
        <h2 className="text-xl text-gray-600 mb-2">
          {company.company_name_th || "ชื่อบริษัท (ภาษาไทย)"}
        </h2>

        {/* รายละเอียดบริษัท */}
        {company.company_description && (
          <p className="text-gray-700 mb-4">{company.company_description}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* ที่อยู่และจังหวัด */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">ที่ตั้ง</h3>
            <p className="text-gray-700">
              {company.company_location || "ไม่ระบุ"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">จังหวัด</h3>
            <p className="text-gray-700">
              {company.company_province || "ไม่ระบุ"}
            </p>
          </div>
        </div>

        {/* เว็บไซต์ */}
        {company.company_website && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">เว็บไซต์</h3>
            <a
              href={company.company_website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {company.company_website}
            </a>
          </div>
        )}


        {/* ทักษะและเครื่องมือ */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">ทักษะที่ต้องการ</h3>
          <p className="text-gray-700 mb-4">
            {company.skill_names || "ไม่ระบุ"}
          </p>

          <h3 className="text-lg font-semibold text-gray-800">เครื่องมือ</h3>
          <p className="text-gray-700">{company.tools_names || "ไม่ระบุ"}</p>
        </div>
      </div>
    </div>
  );
};

export default CompDetail;
