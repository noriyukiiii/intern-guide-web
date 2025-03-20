"use client";

const mockdata = [
  {
    id: "cm58dro6f002lqfmctnraak04",
    companyNameTh: "บริษัท อาร์ วี คอนเน็กซ์ จำกัด",
    companyNameEn: "R V CONNEX COMPANY LIMITED",
    description: "การผลิตอากาศยานยานอวกาศและเครื่องจักรที่เกี่ยวข้อง",
    location:
      "30/1 หมู่ที่ 1 ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง จ.ปทุมธานี 12120",
    province: "ปทุมธานี",
    contractName: "ผู้จัดการฝ่ายบุคคล",
    contractTel: "02-090-9510 ต่อ 2201",
    contractEmail: "admin.hr@rvconnex.com",
    contractSocial: "https://www.facebook.com/RVConnexOfficial",
    contractSocial_line: "",
    establishment: "เอกชน",
    website: "https://www.rvconnex.com/en/home",
    benefit: "- เบี้ยเลี้ยง\n- อาหารกลางวัน\n- fitness",
    isMou: true,
    occupation: "both",
    imgLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ47B_nfBX9Mn3EpUMrz-FikoBvW-KqfpILg&s",
    positions: [
      {
        id: "cm5f0ea6v006pqfek6gt9cqd4",
        name: "อื่นๆ",
        position_description: [
          {
            id: "cm5f1yypz007xqf948e0euqph",
            description: "Cyber Security",
            skills: [
              {
                id: "cm5f2xpv20097qfdgypdphzl9",
                name: "Unknown",
                tools: [
                  {
                    id: "cm5f3yx2000a1qfpk86d6dkmt",
                    name: "Unknown",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "cm5f0ea6v006rqfekxujpymac",
        name: "IT Support",
        position_description: [
          {
            id: "cm5f1yyq1007zqf94ftbgz3r1",
            description: "IT Support",
            skills: [
              {
                id: "cm5f2xpv20099qfdgtspcmq18",
                name: "Unknown",
                tools: [
                  {
                    id: "cm5f3yx2000a3qfpkht5m20l0",
                    name: "Unknown",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "cm5f0ea6v006tqfeklsqj2r1a",
        name: "Developer",
        position_description: [
          {
            id: "cm5f1yyq20081qf94g9xh8nfb",
            description: "Web Development",
            skills: [
              {
                id: "cm5f2xpv2009bqfdg1thf2zkj",
                name: "Unknown",
                tools: [
                  {
                    id: "cm5f3yx2000a5qfpkfea374pw",
                    name: "Unknown",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "cm5f0ea6v006vqfek4pdx8osh",
        name: "Software Tester",
        position_description: [
          {
            id: "cm5f1yyq50083qf941xahu6ho",
            description: "Tester",
            skills: [],
          },
        ],
      },
    ],
  },
];

const Page = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ข้อมูลบริษัท</h1>

      {mockdata.map((company) => (
        <div key={company.id} className="border rounded-lg p-4 shadow-md mb-6">
          {/* Header */}
          <div className="flex gap-4">
            <img
              src={company.imgLink}
              alt={company.companyNameTh}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{company.companyNameTh}</h2>
              <p className="text-gray-600">{company.companyNameEn}</p>
            </div>
          </div>

          {/* ข้อมูลบริษัท */}
          <p className="mt-4 text-gray-700">{company.description}</p>
          <p className="text-sm text-gray-500 mt-2">{company.location}</p>
          <p className="text-sm text-gray-500">
            <strong>โทร:</strong> {company.contractTel}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Email:</strong> {company.contractEmail}
          </p>

          {/* ลิงก์และสวัสดิการ */}
          <div className="mt-4">
            <a
              href={company.website}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              เว็บไซต์บริษัท
            </a>
          </div>
          <p className="text-sm text-gray-500 whitespace-pre-wrap">
            <strong>สวัสดิการ:</strong> {company.benefit}
          </p>

          {/* แสดงตำแหน่งงาน */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">ตำแหน่งที่เปิดรับ</h3>
            {company.positions.map((position) => (
              <div key={position.id} className="border p-3 rounded-lg mt-2">
                <p className="font-medium">{position.name}</p>
                {position.position_description.map((desc) => (
                  <div key={desc.id} className="mt-2">
                    <p className="text-sm text-gray-600">
                      <strong>สาขา:</strong> {desc.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>ทักษะ:</strong>{" "}
                      {desc.skills.map((skill) => skill.name).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
