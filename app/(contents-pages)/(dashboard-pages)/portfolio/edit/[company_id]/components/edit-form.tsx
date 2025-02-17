"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { SingleValue } from "react-select";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [formData, setFormData] = useState<Company | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clone the data to avoid mutating the original object
    const updatedData = JSON.parse(JSON.stringify(formData));

    // Recursive function to process positions
    function processPositions(positions: any) {
      return positions.map((position: any) => {
        if (position.isDelete) {
          delete position.name; // Remove the name field if isDelete is true
        }

        if (position.position_description) {
          position.position_description = processDescriptions(
            position.position_description
          );
        }

        return position;
      });
    }

    // Recursive function to process position descriptions
    function processDescriptions(descriptions: any) {
      return descriptions.map((description: any) => {
        if (description.isDelete) {
          delete description.description; // Remove positionId if isDelete is true
        }

        if (description.skills) {
          description.skills = processSkills(description.skills);
        }

        return description;
      });
    }

    // Recursive function to process skills
    function processSkills(skills: any) {
      return skills.map((skill: any) => {
        if (skill.isDelete) {
          delete skill.name; // Remove skill name if isDelete is true
        }

        if (skill.tools) {
          skill.tools = processTools(skill.tools);
        }

        return skill;
      });
    }

    // Recursive function to process tools
    function processTools(tools: any) {
      return tools.map((tool: any) => {
        if (tool.isDelete) {
          delete tool.name; // Remove tool name if isDelete is true
        }
        return tool;
      });
    }

    // Process positions in the form data
    if (updatedData.positions) {
      updatedData.positions = processPositions(updatedData.positions);
    }

    console.log("Updated Data:", updatedData);

    try {
      const response = await fetch("http://localhost:5555/company/update_company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // แปลงข้อมูลเป็น JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response from server:", result);
        // แสดง toast เมื่ออัปเดตข้อมูลสำเร็จ
        toast.success("Data updated successfully!", {
          position: "top-center", // ใช้ตำแหน่งเป็น string
          autoClose: 3000, // ปิดเองภายใน 3 วินาที
        });

        // รอ 2 วินาทีก่อนที่จะทำการ push
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        console.error("Failed to update data. Status:", response.status);
        alert("Failed to update data.");
      }
    } catch (error) {
      console.error("Error occurred while updating data:", error);
      alert("An error occurred. Please try again.");
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
    const updatedPositions = [...positions];
    const positionIndex = updatedPositions.findIndex(
      (position) => position.id === positionId
    );

    if (positionIndex !== -1) {
      const position = updatedPositions[positionIndex];

      if (position.id.startsWith("new")) {
        // ถ้าเป็นตำแหน่งใหม่ (ที่ยังไม่ได้บันทึกในฐานข้อมูล)
        updatedPositions.splice(positionIndex, 1);
      } else {
        // ถ้าเป็นตำแหน่งเก่า (ที่มีในฐานข้อมูล)
        updatedPositions[positionIndex] = {
          ...position,
          isDelete: true, // ตั้งค่าเป็นถูกลบ
        };
      }

      setPositions(updatedPositions);
    }
  };

  const deletePositionDescription = (
    positionId: string,
    descriptionId: string
  ) => {
    const updatedPositions = [...positions];
    const positionIndex = updatedPositions.findIndex(
      (position) => position.id === positionId
    );

    if (positionIndex !== -1) {
      const position = updatedPositions[positionIndex];
      const descriptionIndex = position.position_description.findIndex(
        (description) => description.id === descriptionId
      );

      if (descriptionIndex !== -1) {
        const description = position.position_description[descriptionIndex];

        if (description.id.startsWith("new")) {
          position.position_description.splice(descriptionIndex, 1);
        } else {
          const deletedDescription = {
            ...description,
            isDelete: true,
          };
          position.position_description[descriptionIndex] = deletedDescription;
        }

        setPositions(updatedPositions);
      }
    }
  };

  const deleteSkill = (
    positionId: string,
    descriptionId: string,
    skillId: string
  ) => {
    const updatedPositions = [...positions];
    const positionIndex = updatedPositions.findIndex(
      (position) => position.id === positionId
    );

    if (positionIndex !== -1) {
      const position = updatedPositions[positionIndex];
      const descriptionIndex = position.position_description.findIndex(
        (description) => description.id === descriptionId
      );

      if (descriptionIndex !== -1) {
        const description = position.position_description[descriptionIndex];
        const skillIndex = description.skills.findIndex(
          (skill) => skill.id === skillId
        );

        if (skillIndex !== -1) {
          const skill = description.skills[skillIndex];

          if (skill.id.startsWith("new")) {
            description.skills.splice(skillIndex, 1);
          } else {
            const deletedSkill = {
              ...skill,
              isDelete: true,
            };
            description.skills[skillIndex] = deletedSkill;
          }

          setPositions(updatedPositions);
        }
      }
    }
  };

  const deleteTool = (
    positionId: string,
    descriptionId: string,
    skillId: string,
    toolId: string
  ) => {
    const updatedPositions = [...positions];
    const positionIndex = updatedPositions.findIndex(
      (position) => position.id === positionId
    );

    if (positionIndex !== -1) {
      const position = updatedPositions[positionIndex];
      const descriptionIndex = position.position_description.findIndex(
        (description) => description.id === descriptionId
      );

      if (descriptionIndex !== -1) {
        const description = position.position_description[descriptionIndex];
        const skillIndex = description.skills.findIndex(
          (skill) => skill.id === skillId
        );

        if (skillIndex !== -1) {
          const skill = description.skills[skillIndex];
          const toolIndex = skill.tools.findIndex((tool) => tool.id === toolId);

          if (toolIndex !== -1) {
            const tool = skill.tools[toolIndex];

            if (tool.id.startsWith("new")) {
              skill.tools.splice(toolIndex, 1);
            } else {
              const deletedTool = {
                ...tool,
                isDelete: true,
              };
              skill.tools[toolIndex] = deletedTool;
            }

            setPositions(updatedPositions);
          }
        }
      }
    }
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
        <div className="col-span-4">
          <label htmlFor="benefit">สวัสดิการบริษัท:</label>
          <Input
            type="text"
            id="benefit"
            placeholder="สวัสดิการบริษัท"
            value={formData?.benefit || ""}
            onChange={(e) => handleChange(e, "benefit")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-4">
          <label htmlFor="benefit">ลิ้งภาพบริษัท :</label>
          <Input
            type="text"
            id="imgLink"
            placeholder="Link ภาพของ บริษัท"
            value={formData?.imgLink || ""}
            onChange={(e) => handleChange(e, "imgLink")} // เรียกฟังก์ชัน handleChange
            className="border p-2 w-full"
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

        {/* Render Positions */}
        <div className="col-span-8">
          {positions
            ?.filter((position) => !position.isDelete) // กรองเฉพาะตำแหน่งที่ไม่ได้ถูกลบ
            .map((position, positionIndex) => (
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
            className="p-2 bg-white w-[120px] rounded-md border-2 border-gray-400 hover:bg-gray-300 transition"
            onPress={handleNavigation}
          >
            <div className="text-center">ยกเลิก</div>
          </Button>
        </div>
        <div className="col-span-4 flex justify-start">
          <button
            className="p-2 bg-red-400 w-[120px] rounded-md border-2 border-gray-400 hover:bg-red-600 transition"
            onClick={handleSubmit}
          >
            <div className="text-center text-white">ยืนยันการแก้ไข</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
