"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { SingleValue } from "react-select";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/utils/uploadthing";

interface Company {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string | null;
  location: string | null;
  province: string | null;
  contractName?: string | null;
  contractTel?: string | null;
  contractEmail?: string | null;
  contractSocial?: string | null;
  contractSocial_line?: string | null;
  establishment: string | null;
  imgLink: string | null;
  isMou: boolean;
  occupation: string | null;
  benefit: string | null;
  website: string | null;
  positions: Position[];
}

interface Position {
  id: string;
  name: string;
  position_description: PositionDescription[];
  isDelete?: boolean;
}

interface PositionDescription {
  id: string;
  description: string;
  skills: Skill[];
  isDelete?: boolean;
}

interface Skill {
  id: string;
  name: string;
  tools: Tool[];
  isDelete?: boolean;
}

interface Tool {
  id: string;
  name: string;
  isDelete?: boolean;
}

type Option = {
  skill: string[];
  tool: string[];
  province: string[];
  position: string[];
  positiondescription: string[];
};

const EditForm = ({
  company,
  optionData,
}: {
  company: Company;
  optionData: Option;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<Company>({
    id: "",
    companyNameTh: "",
    companyNameEn: "",
    description: null,
    location: null,
    province: null,
    contractName: null,
    contractTel: null,
    contractEmail: null,
    contractSocial: null,
    contractSocial_line: null,
    establishment: null,
    imgLink: null,
    isMou: false,
    occupation: null,
    benefit: null,
    website: null,
    positions: [],
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const [positions, setPositions] = useState<Position[]>([]);
  const router = useRouter();
  const { session } = useSession();
  if (!session) {
    return <>Loading</>;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const datauserid = session?.user?.id; // รับค่า userId จาก session
    const companyId = company.id; // รับค่า companyId จากตัวแปร company
    if (!datauserid || !companyId) {
      // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบหรือไม่
      alert("userId and companyId are required");
      return;
    }

    // Clone the data to avoid mutating the original object
    const updatedData = JSON.parse(JSON.stringify(formData));

    console.log(
      "Updated Data:",
      updatedData,
      "UserId : ",
      datauserid,
      "CompId : ",
      companyId
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/userUpdateCompany`, // URL ของ API
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: datauserid, // ส่ง userId
            companyId: companyId, // ส่ง companyId
            Data: updatedData, // ส่งข้อมูลที่แก้ไข
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Response from server:", result);
        // แสดง toast เมื่ออัปเดตข้อมูลสำเร็จ
        toast.success("คำขอแก้ไขข้อมูลบริษัทได้ถูกส่งแล้ว", {
          position: "top-center",
          autoClose: 3000,
        });

        // รอ 2 วินาทีก่อนที่จะทำการ push
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        console.error("Failed to update data. Status:", response.status);
        toast.error("เซิฟเวอร์มีปัญหา กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      console.error("Error occurred while updating data:", error);
      toast.error("เซิฟเวอร์มีปัญหา กรุณาลองใหม่อีกครั้ง");
    }
  };

  useEffect(() => {
    setIsClient(true); // Set isClient to true once the client loads
  }, []);

  useEffect(() => {
    if (formData) {
      setFormData({
        ...formData,
        positions,
      });
    }
  }, [positions]);

  useEffect(() => {
    if (company) {
      setFormData(company); // Set formData when company data is available
      setPositions(company.positions || []); // Set positions
    }
  }, [company]);

  if (!isClient) {
    return null; // Or show a loading spinner
  }

  // Transformed options
  const transformedOptions = {
    skill: (optionData.skill || []).map((item) => ({
      label: item,
      value: item,
    })),
    tool: (optionData.tool || []).map((item) => ({ label: item, value: item })),
    province: [
      { label: "กรุงเทพมหานคร", value: "กรุงเทพมหานคร" },
      { label: "กระบี่", value: "กระบี่" },
      { label: "กาญจนบุรี", value: "กาญจนบุรี" },
      { label: "กาฬสินธุ์", value: "กาฬสินธุ์" },
      { label: "กำแพงเพชร", value: "กำแพงเพชร" },
      { label: "ขอนแก่น", value: "ขอนแก่น" },
      { label: "จันทบุรี", value: "จันทบุรี" },
      { label: "ฉะเชิงเทรา", value: "ฉะเชิงเทรา" },
      { label: "ชัยนาท", value: "ชัยนาท" },
      { label: "ชัยภูมิ", value: "ชัยภูมิ" },
      { label: "ชุมพร", value: "ชุมพร" },
      { label: "ชลบุรี", value: "ชลบุรี" },
      { label: "เชียงใหม่", value: "เชียงใหม่" },
      { label: "เชียงราย", value: "เชียงราย" },
      { label: "ตรัง", value: "ตรัง" },
      { label: "ตราด", value: "ตราด" },
      { label: "ตาก", value: "ตาก" },
      { label: "นครนายก", value: "นครนายก" },
      { label: "นครปฐม", value: "นครปฐม" },
      { label: "นครพนม", value: "นครพนม" },
      { label: "นครราชสีมา", value: "นครราชสีมา" },
      { label: "นครศรีธรรมราช", value: "นครศรีธรรมราช" },
      { label: "นครสวรรค์", value: "นครสวรรค์" },
      { label: "นราธิวาส", value: "นราธิวาส" },
      { label: "น่าน", value: "น่าน" },
      { label: "นนทบุรี", value: "นนทบุรี" },
      { label: "บึงกาฬ", value: "บึงกาฬ" },
      { label: "บุรีรัมย์", value: "บุรีรัมย์" },
      { label: "ประจวบคีรีขันธ์", value: "ประจวบคีรีขันธ์" },
      { label: "ปทุมธานี", value: "ปทุมธานี" },
      { label: "ปราจีนบุรี", value: "ปราจีนบุรี" },
      { label: "ปัตตานี", value: "ปัตตานี" },
      { label: "พะเยา", value: "พะเยา" },
      { label: "พระนครศรีอยุธยา", value: "พระนครศรีอยุธยา" },
      { label: "พังงา", value: "พังงา" },
      { label: "พิจิตร", value: "พิจิตร" },
      { label: "พิษณุโลก", value: "พิษณุโลก" },
      { label: "เพชรบุรี", value: "เพชรบุรี" },
      { label: "เพชรบูรณ์", value: "เพชรบูรณ์" },
      { label: "แพร่", value: "แพร่" },
      { label: "พัทลุง", value: "พัทลุง" },
      { label: "ภูเก็ต", value: "ภูเก็ต" },
      { label: "มหาสารคาม", value: "มหาสารคาม" },
      { label: "มุกดาหาร", value: "มุกดาหาร" },
      { label: "แม่ฮ่องสอน", value: "แม่ฮ่องสอน" },
      { label: "ยโสธร", value: "ยโสธร" },
      { label: "ยะลา", value: "ยะลา" },
      { label: "ร้อยเอ็ด", value: "ร้อยเอ็ด" },
      { label: "ระนอง", value: "ระนอง" },
      { label: "ระยอง", value: "ระยอง" },
      { label: "ราชบุรี", value: "ราชบุรี" },
      { label: "ลพบุรี", value: "ลพบุรี" },
      { label: "ลำปาง", value: "ลำปาง" },
      { label: "ลำพูน", value: "ลำพูน" },
      { label: "เลย", value: "เลย" },
      { label: "ศรีสะเกษ", value: "ศรีสะเกษ" },
      { label: "สกลนคร", value: "สกลนคร" },
      { label: "สงขลา", value: "สงขลา" },
      { label: "สมุทรสาคร", value: "สมุทรสาคร" },
      { label: "สมุทรปราการ", value: "สมุทรปราการ" },
      { label: "สมุทรสงคราม", value: "สมุทรสงคราม" },
      { label: "สระแก้ว", value: "สระแก้ว" },
      { label: "สระบุรี", value: "สระบุรี" },
      { label: "สิงห์บุรี", value: "สิงห์บุรี" },
      { label: "สุโขทัย", value: "สุโขทัย" },
      { label: "สุพรรณบุรี", value: "สุพรรณบุรี" },
      { label: "สุราษฎร์ธานี", value: "สุราษฎร์ธานี" },
      { label: "สุรินทร์", value: "สุรินทร์" },
      { label: "สตูล", value: "สตูล" },
      { label: "หนองคาย", value: "หนองคาย" },
      { label: "หนองบัวลำภู", value: "หนองบัวลำภู" },
      { label: "อำนาจเจริญ", value: "อำนาจเจริญ" },
      { label: "อุดรธานี", value: "อุดรธานี" },
      { label: "อุตรดิตถ์", value: "อุตรดิตถ์" },
      { label: "อุทัยธานี", value: "อุทัยธานี" },
      { label: "อุบลราชธานี", value: "อุบลราชธานี" },
      { label: "อ่างทอง", value: "อ่างทอง" },
      { label: "อื่นๆ", value: "อื่นๆ" },
    ],
    occupation: [
      { label: "Network", value: "Network" },
      { label: "Database", value: "database" },
      { label: "Both", value: "both" },
      { label: "ไม่มีข้อมูล", value: "No_Info" },
    ],
    establishment: [
      { label: "เอกชน", value: "เอกชน" },
      { label: "รัฐบาล", value: "รัฐบาล" },
      { label: "รัฐวิสาหกิจ", value: "รัฐวิสาหกิจ" },
    ],
    isMou: [
      { label: "อยู่", value: "true" }, // แปลงเป็น string
      { label: "ไม่อยู่", value: "false" }, // แปลงเป็น string
    ],
    position: (optionData.position || []).map((item) => ({
      label: item,
      value: item,
    })),
    positiondescription: (optionData.positiondescription || []).map((item) => ({
      label: item,
      value: item,
    })),
  };

  const deletePosition = (positionId: string) => {
    setPositions((prevPositions) =>
      prevPositions.filter((position) => position.id !== positionId)
    );
  };

  const deletePositionDescription = (
    positionId: string,
    descriptionId: string
  ) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.id === positionId
          ? {
              ...position,
              position_description: position.position_description.filter(
                (desc) => desc.id !== descriptionId
              ),
            }
          : position
      )
    );
  };

  const deleteSkill = (
    positionId: string,
    descriptionId: string,
    skillId: string
  ) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.id === positionId
          ? {
              ...position,
              position_description: position.position_description.map((desc) =>
                desc.id === descriptionId
                  ? {
                      ...desc,
                      skills: desc.skills.filter(
                        (skill) => skill.id !== skillId
                      ),
                    }
                  : desc
              ),
            }
          : position
      )
    );
  };

  const deleteTool = (
    positionId: string,
    descriptionId: string,
    skillId: string,
    toolId: string
  ) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.id === positionId
          ? {
              ...position,
              position_description: position.position_description.map((desc) =>
                desc.id === descriptionId
                  ? {
                      ...desc,
                      skills: desc.skills.map((skill) =>
                        skill.id === skillId
                          ? {
                              ...skill,
                              tools: skill.tools.filter(
                                (tool) => tool.id !== toolId
                              ),
                            }
                          : skill
                      ),
                    }
                  : desc
              ),
            }
          : position
      )
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Company
  ) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  const handleSelectChange = (
    selectedOption: SingleValue<{ label: string; value: string }>,
    field: keyof Company
  ) => {
    setFormData((prevFormData: Company | null) => ({
      ...prevFormData!,
      [field]: selectedOption ? selectedOption.value : "", // ใช้ prevFormData! เพื่อหลีกเลี่ยงปัญหา null
    }));
  };
  const handleChange2 = (e: any, fieldName: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData!,
      [fieldName || name]: value,
    });
  };

  const handleNavigation = () => {
    router.push("/portfolio"); // นำไปยังหน้าที่ต้องการ
  };

  const handleChangePosition = (newValue: any, positionId: string) => {
    if (newValue && newValue.value) {
      const updatedPositions = [...positions];
      const position = updatedPositions.find((p) => p.id === positionId);
      if (position) {
        position.name = newValue.value; // Update position name
        setPositions(updatedPositions);
      }
    }
  };
  // Handle changes in description select
  const handleChangePositionDescription = (
    newValue: any,
    positionId: string,
    descId: string
  ) => {
    if (newValue && newValue.value) {
      const updatedPositions = [...positions];
      const position = updatedPositions.find((p) => p.id === positionId);
      const description = position?.position_description.find(
        (d) => d.id === descId
      );
      if (description) {
        description.description = newValue.value; // Update description
        setPositions(updatedPositions);
      }
    }
  };

  // Handle changes in skill name
  const handleChangeSkill = (
    newValue: any,
    positionId: string,
    descId: string,
    skillId: string
  ) => {
    if (newValue && newValue.value) {
      const updatedPositions = [...positions];
      const position = updatedPositions.find((p) => p.id === positionId);
      const description = position?.position_description.find(
        (d) => d.id === descId
      );
      const skill = description?.skills.find((s) => s.id === skillId);
      if (skill) {
        skill.name = newValue.value; // Update skill name
        setPositions(updatedPositions);
      }
    }
  };

  // Handle changes in tool name
  const handleChangeTool = (
    newValue: any,
    positionId: string,
    descId: string,
    skillId: string,
    toolId: string
  ) => {
    if (newValue && newValue.value) {
      const updatedPositions = [...positions];
      const position = updatedPositions.find((p) => p.id === positionId);
      const description = position?.position_description.find(
        (d) => d.id === descId
      );
      const skill = description?.skills.find((s) => s.id === skillId);
      const tool = skill?.tools.find((t) => t.id === toolId);
      if (tool) {
        tool.name = newValue.value; // Update tool name
        setPositions(updatedPositions);
      }
    }
  };

  // Add new position
  const addPosition = () => {
    const newPosition = {
      id: `new-${Date.now()}`, // ใช้ "new-" เพื่อระบุว่าเป็นตำแหน่งใหม่
      name: "",
      position_description: [],
    };
    setPositions([...positions, newPosition]);
  };

  const addDescription = (positionId: any) => {
    const updatedPositions = [...positions];
    const position = updatedPositions.find((p) => p.id === positionId);
    if (position) {
      position.position_description.push({
        id: `new-${Date.now()}`, // ใช้ "new-" เพื่อระบุว่าเป็นคำอธิบายใหม่
        description: "",
        skills: [],
      });
      setPositions(updatedPositions);
    }
  };

  const addSkill = (positionId: any, descId: any) => {
    const updatedPositions = [...positions];
    const position = updatedPositions.find((p) => p.id === positionId);
    const description = position?.position_description.find(
      (d) => d.id === descId
    );
    if (description) {
      description.skills.push({
        id: `new-${Date.now()}`, // ใช้ "new-" เพื่อระบุว่าเป็นทักษะใหม่
        name: "",
        tools: [],
      });
      setPositions(updatedPositions);
    }
  };

  const addTool = (positionId: any, descId: any, skillId: any) => {
    const updatedPositions = [...positions];
    const position = updatedPositions.find((p) => p.id === positionId);
    const description = position?.position_description.find(
      (d) => d.id === descId
    );
    const skill = description?.skills.find((s) => s.id === skillId);
    if (skill) {
      skill.tools.push({
        id: `new-${Date.now()}`, // ใช้ "new-" เพื่อระบุว่าเป็นเครื่องมือใหม่
        name: "",
      });
      setPositions(updatedPositions);
    }
  };

  const deleteOldImage = async (oldImageUrl: string) => {
    try {
      // เอาแค่ชื่อไฟล์จาก URL ที่ส่งมา (ตัด https://utfs.io/ ออก)
      const fileName = oldImageUrl.split("/").pop(); // ใช้ .split() เพื่อดึงแค่ชื่อไฟล์จาก URL

      if (fileName) {
        const deleteUrl = `${process.env.NEXT_PUBLIC_BASE_RES_API}/uploadthing/delete/${fileName}`;
        await fetch(deleteUrl, { method: "DELETE" });
        toast.success("ลบรูปภาพเก่าเรียบร้อยแล้ว", {
          position: "top-center",
          autoClose: 1000,
        });
      } else {
        throw new Error("ไม่พบชื่อไฟล์ที่ต้องการลบ");
      }
    } catch (error) {
      toast.error("ไม่สามารถลบรูปภาพเก่าได้", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="mx-auto">
      <ToastContainer />
      <form className="bg-gray-200 border-black border-2 mx-auto p-6 grid grid-cols-8 gap-4 font-Prompt rounded-md">
        <div className="col-span-4">
          <label htmlFor="companyNameTh">Company Name (TH):</label>
          <input
            type="text"
            id="companyNameTh"
            name="companyNameTh"
            value={formData?.companyNameTh || ""}
            onChange={(e) => handleChange(e, "companyNameTh")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>

        <div className="col-span-4">
          <label htmlFor="companyNameEn">Company Name (EN):</label>
          <Input
            type="text"
            id="companyNameEn"
            placeholder="Company Name (EN)"
            value={formData?.companyNameEn || ""}
            onChange={(e) => handleChange(e, "companyNameEn")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-4">
          <label htmlFor="description">คำอธิบายบริษัท :</label>
          <Input
            type="text"
            id="description"
            placeholder="คำอธิบายบริษัท"
            value={formData?.description || ""}
            onChange={(e) => handleChange(e, "description")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-4">
          <label htmlFor="province">จังหวัด :</label>
          <Select
            isClearable
            options={transformedOptions.province} // ใช้ options จาก transformedOptions.province
            value={
              formData?.province
                ? { label: formData.province, value: formData.province }
                : null
            } // ใช้ค่า province จาก formData
            onChange={(selectedOption) => {
              handleSelectChange(selectedOption, "province"); // เรียกฟังก์ชัน handleSelectChange
            }}
            placeholder="Select or Create Province" // ข้อความในช่องเลือก
          />
        </div>
        <div className="col-span-8">
          <label htmlFor="location">ที่อยู่บริษัท:</label>
          <Input
            type="text"
            id="location"
            placeholder="location"
            value={formData?.location || ""}
            onChange={(e) => handleChange(e, "location")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>

        <div className="col-span-4">
          <label htmlFor="contractName">ชื่อผู้ติดต่อ:</label>
          <Input
            type="text"
            id="contractName"
            placeholder="ชื่อผู้ติดต่อ"
            value={formData?.contractName || ""}
            onChange={(e) => handleChange(e, "contractName")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-4">
          <label htmlFor="contractTel">เบอร์โทรผู้ติดต่อ:</label>
          <Input
            type="text"
            id="contractTel"
            placeholder="เบอร์โทรผู้ติดต่อ"
            value={formData?.contractTel || ""}
            onChange={(e) => handleChange(e, "contractTel")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-4">
          <label htmlFor="contractSocial">ช่องทางการติดต่อ Social:</label>
          <Input
            type="text"
            id="contractSocial"
            placeholder="ช่องทางการติดต่อ"
            value={formData?.contractSocial || ""}
            onChange={(e) => handleChange(e, "contractSocial")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-4">
          <label htmlFor="contractSocial_line">ช่องทางการติดต่อ Line:</label>
          <Input
            type="text"
            id="contractSocial_line"
            placeholder="Line ID : xxx"
            value={formData?.contractSocial_line || ""}
            onChange={(e) => handleChange(e, "contractSocial_line")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-4">
          <label htmlFor="establishment">สังกัดหน่วยงาน:</label>
          <Select
            isClearable
            options={transformedOptions.establishment} // ใช้ options จาก transformedOptions.province
            value={
              formData?.establishment
                ? {
                    label: formData.establishment,
                    value: formData.establishment,
                  }
                : null
            } // ใช้ค่า province จาก formData
            onChange={(selectedOption) => {
              handleSelectChange(selectedOption, "establishment"); // เรียกฟังก์ชัน handleSelectChange
            }}
            placeholder="Select or Create Province" // ข้อความในช่องเลือก
          />
        </div>
        <div className="col-span-4">
          <label htmlFor="establishment">สายการเรียน:</label>
          <Select
            isClearable
            options={transformedOptions.occupation} // ใช้ options จาก transformedOptions.province
            value={
              formData?.occupation
                ? { label: formData.occupation, value: formData.occupation }
                : null
            } // ใช้ค่า province จาก formData
            onChange={(selectedOption) => {
              handleSelectChange(selectedOption, "occupation"); // เรียกฟังก์ชัน handleSelectChange
            }}
            placeholder="สายการเรียนที่รับ" // ข้อความในช่องเลือก
          />
        </div>
        <div className="col-span-4">
          <label htmlFor="benefit">อยู่ใน Mou :</label>
          <select
            id="isMou"
            name="isMou"
            value={formData?.isMou?.toString() || ""}
            onChange={(e) =>
              handleChange2(
                { target: { name: "isMou", value: e.target.value === "true" } },
                "isMou"
              )
            }
            className="border p-2 w-full"
          >
            <option value="true">อยู่</option>
            <option value="false">ไม่อยู่</option>
          </select>
        </div>
        <div className="col-span-8">
          <label htmlFor="website">ลิ้งค์เว็บไซต์ของบริษัท:</label>
          <Input
            type="text"
            id="website"
            placeholder="ลิ้งเว็บไซต์บริษัท"
            value={formData?.website || ""}
            onChange={(e) => handleChange(e, "website")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>
        
        {/* <div className="col-span-4">
          <label htmlFor="benefit">สวัสดิการบริษัท:</label>
          <Input
            type="text"
            id="benefit"
            placeholder="สวัสดิการบริษัท"
            value={formData?.benefit || ""}
            onChange={(e) => handleChange(e, "benefit")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div> */}
        <div className="col-span-8">
          <label htmlFor="benefit">สวัสดิการบริษัท:</label>
          <Textarea
            id="benefit"
            placeholder="สวัสดิการบริษัท"
            value={formData?.benefit || ""}
            onChange={(e) => {
              // แยกข้อความเป็นบรรทัด
              let lines = e.target.value.split("\n");

              // ลบบรรทัดที่เป็นแค่ "-" ออก
              lines = lines.filter((line) => line.trim() !== "-");

              // ตรวจสอบและเติม "-" ถ้าบรรทัดไหนไม่มี
              lines = lines.map((line) =>
                line.startsWith("- ") ? line : `- ${line.trim()}`
              );

              // อัปเดตค่าของ benefit ใน formData
              setFormData((prevData) => ({
                ...prevData,
                benefit: lines.join("\n"), // อัปเดตค่า benefit
              }));
            }}
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-8 ">
          <div className="w-full justify-center">
            <div className="text-center">อัพโหลดโลโก้บริษัท</div>
          </div>

          {/* แสดงโลโก้ที่อัพโหลด ถ้ามี */}
          {(uploadedImageUrl || formData?.imgLink) && (
            <div className="mt-4 flex justify-center items-center">
              <img
                src={uploadedImageUrl || formData?.imgLink || ""}
                alt="Uploaded"
                className="max-w-[200px] h-auto rounded-md shadow-lg"
              />
            </div>
          )}
        </div>

        {/* ปุ่มอัพโหลดภาพ */}
        <div className="col-span-8">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // ลบภาพเก่า (ถ้ามี)
              if (uploadedImageUrl) {
                deleteOldImage(uploadedImageUrl); // ลบภาพเก่าก่อน
              }

              // เก็บ URL ของภาพใหม่
              const imageUrl = res[0].url;
              setUploadedImageUrl(imageUrl); // เก็บ URL ของภาพใหม่
              setFormData((prevData) => ({
                ...prevData,
                imgLink: imageUrl,
                id: prevData?.id ?? "", // ใช้ nullish coalescing เพื่อตรวจสอบค่าที่เป็น null หรือ undefined
              }));
              toast.success("อัพโหลดรูปสำเร็จ", {
                position: "top-center",
                autoClose: 1000,
              });
            }}
            onUploadError={(error) => {
              toast.error("อัพโหลดรูปภาพไม่สำเร็จ", {
                position: "top-center",
                autoClose: 1000,
              });
            }}
          />
        </div>


        {/* Render Positions */}
        <div className="col-span-8">
          {positions?.map((position, positionIndex) => (
            <div key={position.id} className="mb-4">
              <label htmlFor={`position-${positionIndex}`}>
                ตำแหน่งที่ {positionIndex + 1}
              </label>
              <div className="col-span-4">
                <div className="flex items-center gap-4">
                  <CreatableSelect
                    id={`position-${positionIndex}`}
                    name={`position-${positionIndex}`}
                    value={
                      position.name
                        ? { label: position.name, value: position.name }
                        : null
                    }
                    onChange={(newValue) =>
                      handleChangePosition(newValue, position.id)
                    }
                    options={transformedOptions.position}
                    placeholder="Select or type to add"
                    isClearable
                    className="flex-1" // ให้ Select ใช้พื้นที่ที่เหลือ
                  />
                  <button
                    type="button"
                    onClick={() => deletePosition(position.id)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    <X size={20} />
                  </button>
                  {/* Delete Position */}
                </div>
              </div>
              {/* Render Position Descriptions */}
              {position.position_description
                ?.filter((description) => !description.isDelete) // กรองคำอธิบายที่ไม่ได้ถูกลบ
                .map((description, descIndex) => (
                  <div key={description.id} className="pl-10 mt-2">
                    <label htmlFor={`description-${descIndex}`}>
                      ตำแหน่งงาน {descIndex + 1}
                    </label>
                    <div className="col-span-4">
                      <div className="flex items-center gap-4">
                        <CreatableSelect
                          id={`description-${descIndex}`}
                          name={`description-${descIndex}`}
                          value={
                            description.description
                              ? {
                                  label: description.description,
                                  value: description.description,
                                }
                              : null
                          }
                          onChange={(newValue) =>
                            handleChangePositionDescription(
                              newValue,
                              position.id,
                              description.id
                            )
                          }
                          options={transformedOptions.positiondescription}
                          placeholder="Select or type to add"
                          className="flex-1"
                          isClearable
                        />
                        {/* Delete Position Description */}

                        <button
                          type="button"
                          onClick={() =>
                            deletePositionDescription(
                              position.id,
                              description.id
                            )
                          }
                          className="p-2 bg-red-500 text-white rounded "
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Render Skills and Tools */}
                    {description.skills
                      ?.filter((skill) => !skill.isDelete) // กรองทักษะที่ไม่ได้ถูกลบ
                      .map((skill, skillIndex) => (
                        <div key={skill.id} className="pl-10">
                          <label htmlFor={`skill-${descIndex}`}>
                            ทักษะ {skillIndex + 1}
                          </label>
                          <div className="col-span-4">
                            <div className="flex items-center gap-4">
                              <CreatableSelect
                                id={`skill-${descIndex}`}
                                name={`skill-${descIndex}`}
                                value={
                                  skill.name
                                    ? { label: skill.name, value: skill.name }
                                    : null
                                }
                                onChange={(newValue) =>
                                  handleChangeSkill(
                                    newValue,
                                    position.id,
                                    description.id,
                                    skill.id
                                  )
                                }
                                options={transformedOptions.skill}
                                placeholder="Select or type to add"
                                className="flex-1"
                                isClearable
                              />
                              {/* Delete Skill */}
                              <button
                                type="button"
                                onClick={() =>
                                  deleteSkill(
                                    position.id,
                                    description.id,
                                    skill.id
                                  )
                                }
                                className=" p-2 bg-red-500 text-white rounded"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                          {/* Render Tools */}
                          {skill.tools
                            ?.filter((tool) => !tool.isDelete) // กรองเครื่องมือที่ไม่ได้ถูกลบ
                            .map((tool, toolIndex) => (
                              <div key={tool.id} className="pl-10">
                                <label htmlFor={`tool-${descIndex}`}>
                                  เครื่องมือ {toolIndex + 1}
                                </label>
                                <div className="col-span-4">
                                  <div className="flex items-center gap-4">
                                    <CreatableSelect
                                      id={`tool-${descIndex}`}
                                      name={`tool-${descIndex}`}
                                      value={
                                        tool.name
                                          ? {
                                              label: tool.name,
                                              value: tool.name,
                                            }
                                          : null
                                      }
                                      onChange={(newValue) =>
                                        handleChangeTool(
                                          newValue,
                                          position.id,
                                          description.id,
                                          skill.id,
                                          tool.id
                                        )
                                      }
                                      options={transformedOptions.tool}
                                      placeholder="Select or type to add"
                                      className="flex-1"
                                      isClearable
                                    />
                                    {/* Delete Tool */}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteTool(
                                          position.id,
                                          description.id,
                                          skill.id,
                                          tool.id
                                        )
                                      }
                                      className="p-2 bg-red-500 text-white rounded"
                                    >
                                      <X size={20} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}

                          <button
                            type="button"
                            onClick={() =>
                              addTool(position.id, description.id, skill.id)
                            } // ส่ง positionId, descId, skillId
                            className="mt-2 px-4 p-2 ml-10 bg-green-500 text-white rounded"
                          >
                            เพิ่มเครื่องมือ
                          </button>
                        </div>
                      ))}

                    <button
                      type="button"
                      onClick={() => addSkill(position.id, description.id)} // ส่ง positionId และ descId
                      className="mt-2 p-2 px-4 ml-10  bg-green-500 text-white rounded"
                    >
                      เพิ่มทักษะ
                    </button>
                  </div>
                ))}

              <button
                type="button"
                onClick={() => addDescription(position.id)} // ส่ง positionId
                className="mt-2 ml-10 p-2 px-4 bg-green-500 text-white rounded"
              >
                เพิ่มตำแหน่งงาน
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addPosition}
            className="mt-4 px-4 p-2 bg-blue-500 text-white rounded"
          >
            เพื่มตำแหน่ง
          </button>
        </div>

        <div className="col-span-4 flex justify-end">
          <Button
            type="button"
            className="p-2 bg-white w-[120px] text-black rounded-md border-2 border-gray-400 hover:bg-gray-300 transition"
            onClick={handleNavigation}
          >
            <div className="text-center">ยกเลิก</div>
          </Button>
        </div>
        <div className="col-span-4 flex justify-start">
          <Button
            className="p-2 bg-green-500 w-[120px] rounded-md border-2 border-gray-400 hover:bg-green-600 transition"
            onClick={handleSubmit}
          >
            <div className="text-center text-white">ยืนยันการแก้ไข</div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
