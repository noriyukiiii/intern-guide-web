"use client";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputtest";
import { Label } from "@/components/ui/label";
import {
  companySchema,
  CompanySchema,
} from "@/validations/company-insert.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import CreatableSelect from "react-select/creatable";
import { X } from "lucide-react";
import Select from "react-select";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { UploadButton } from "@/utils/uploadthing";
import { Textarea } from "@/components/ui/textarea";

interface Tool {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
  tools: Tool[]; // tools for each skill
}

interface PositionDescription {
  id: string;
  description: string;
  skills: Skill[]; // skills associated with this description
}

interface Position {
  id: string;
  name: string;
  position_description: PositionDescription[]; // position description contains skills and tools
}
type Option = {
  skill: string[];
  tool: string[];
  province: string[];
  position: string[];
  positiondescription: string[];
};

export function InsertForm({ optionData }: { optionData: Option }) {
  const { session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [positions, setPositions] = useState<Position[]>([]); // Specify the type of positions
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const user_id = session.user?.id;
  const router = useRouter();

  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanySchema>({ resolver: zodResolver(companySchema) });

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

  // Handle change of position
  const { fields, append, remove } = useFieldArray({
    control,
    name: "positions", // ชื่อฟิลด์ positions
  });

  const deletePosition = (positionId: string) => {
    const updatedPositions = fields.filter(
      (position) => position.id !== positionId
    );
    setValue("positions", updatedPositions); // อัปเดตค่าในฟอร์ม
  };

  // ฟังก์ชันการลบคำอธิบาย
  const deletePositionDescription = (positionId: string, descId: string) => {
    const updatedPositions = [...fields];
    const position = updatedPositions.find((p) => p.id === positionId);
    if (position) {
      position.position_description = position.position_description.filter(
        (desc) => desc.id !== descId
      );
    }
    setValue("positions", updatedPositions); // อัปเดตค่าในฟอร์ม
  };

  // ฟังก์ชันการลบทักษะ
  const deleteSkill = (positionId: string, descId: string, skillId: string) => {
    const updatedPositions = [...fields];
    const position = updatedPositions.find((p) => p.id === positionId);
    const description = position?.position_description.find(
      (d) => d.id === descId
    );
    if (description) {
      description.skills = description.skills.filter(
        (skill) => skill.id !== skillId
      );
    }
    setValue("positions", updatedPositions); // อัปเดตค่าในฟอร์ม
  };

  // ฟังก์ชันการลบเครื่องมือ
  const deleteTool = (
    positionId: string,
    descId: string,
    skillId: string,
    toolId: string
  ) => {
    const updatedPositions = [...fields];
    const position = updatedPositions.find((p) => p.id === positionId);
    const description = position?.position_description.find(
      (d) => d.id === descId
    );
    const skill = description?.skills.find((s) => s.id === skillId);
    if (skill) {
      skill.tools = skill.tools.filter((tool) => tool.id !== toolId);
    }
    setValue("positions", updatedPositions); // อัปเดตค่าในฟอร์ม
  };

  // Add new position
  // ฟังก์ชันสำหรับการเพิ่มตำแหน่ง
  const addPosition = () => {
    append({
      id: `new-${Date.now()}`,
      name: "",
      position_description: [],
    });
  };

  // ฟังก์ชันสำหรับการเพิ่มคำอธิบาย
  const addDescription = (positionId: string) => {
    const updatedPositions = [...fields];
    const position = updatedPositions.find((p) => p.id === positionId);
    if (position) {
      position.position_description.push({
        id: `new-${Date.now()}`,
        description: "",
        skills: [],
      });
      setValue("positions", updatedPositions); // อัปเดตค่าในฟอร์ม
    }
  };

  // ฟังก์ชันสำหรับการเพิ่มทักษะ
  const addSkill = (positionId: string, descId: string) => {
    const updatedPositions = [...fields];
    const position = updatedPositions.find((p) => p.id === positionId);
    const description = position?.position_description.find(
      (d) => d.id === descId
    );
    if (description) {
      description.skills.push({
        id: `new-${Date.now()}`,
        name: "",
        tools: [],
      });
      setValue("positions", updatedPositions); // อัปเดตค่าในฟอร์ม
    }
  };

  // ฟังก์ชันสำหรับการเพิ่มเครื่องมือ
  const addTool = (positionId: string, descId: string, skillId: string) => {
    const updatedPositions = [...fields];
    const position = updatedPositions.find((p) => p.id === positionId);
    const description = position?.position_description.find(
      (d) => d.id === descId
    );
    const skill = description?.skills.find((s) => s.id === skillId);
    if (skill) {
      skill.tools.push({
        id: `new-${Date.now()}`,
        name: "",
      });
      setValue("positions", updatedPositions); // อัปเดตค่าในฟอร์ม
    }
  };

  const handleNavigation = () => {
    router.push("/company-list"); // นำไปยังหน้าที่ต้องการ
  };

  const onSubmit = () => {
    const formData = watch(); // รับข้อมูลจาก watch

    const requestData = {
      ...formData,
      approvalStatus: "pending", // ตั้งค่าสถานะให้รออนุมัติ
      userId: user_id, // เพิ่ม userId ของคนที่เพิ่ม
    };

    console.log("Form Submitted with values:", requestData);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/createCompany`,
        requestData
      )
      .then((response) => {
        console.log(response);
        toast.success("เพิ่มสถานประกอบการสำเร็จ \nกำลังกลับสู่หน้าหลัก", {
          position: "top-center",
          autoClose: 3000,
        });

        setTimeout(() => {
          router.push("/company-list");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error adding company:", error);
        toast.error("Error adding company. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      });
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

  useEffect(() => {
    // Check if window object is available
    setIsClient(typeof window !== "undefined");
  }, []);

  if (!session.user?.id) {
    return <div>loading</div>;
  }

  if (!isClient) {
    return null;
  }
  return (
    <div className="m-10 md:my-10 md:mx-56 bg-gray-200 border-black border-2 p-6 gap-4 font-Prompt rounded-md">
      <ToastContainer />
      <form className="mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 font-Prompt rounded-md">
        <div className="col-span-1">
          <Label>ชื่อบริษัท (TH) *</Label>
          <Input
            {...register("companyNameTh")}
            placeholder="Enter company name (TH)"
            error={errors.companyNameTh?.message}
            disabled={isPending}
            className="w-full"
          />
        </div>

        <div className="col-span-1">
          <Label>ชื่อบริษัท (EN) *</Label>
          <Input
            {...register("companyNameEn")}
            placeholder="Enter company name (EN)"
            error={errors.companyNameEn?.message}
            disabled={isPending}
            className="w-full"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label>คำอธิบายบริษัท</Label>
          <textarea
            {...register("description")}
            placeholder="คำอธิบายบริษัท"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <Label>จังหวัด</Label>
          <Controller
            name="province"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                inputId="province"
                className="p-2"
                options={transformedOptions.province} // options ที่ใช้สำหรับจังหวัด
                value={
                  transformedOptions.province.find(
                    (option) => option.value === field.value
                  ) || null
                }
                onChange={
                  (selectedOption) => field.onChange(selectedOption?.value) // เมื่อเลือกค่าจาก Select, อัปเดต field value
                }
                isClearable
                placeholder="จังหวัด"
              />
            )}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label>ที่อยู่บริษัท</Label>
          <Input
            {...register("location")}
            placeholder="Enter company location"
            error={errors.location?.message}
            disabled={isPending}
            className="w-full"
          />
        </div>

        <div className="col-span-1">
          <Label>ชื่อผู้ติดต่อ:</Label>
          <Input
            {...register("contractName")}
            placeholder="Enter contract name"
            error={errors.contractName?.message}
            disabled={isPending}
            className="w-full"
          />
        </div>

        <div className="col-span-1">
          <Label>เบอร์โทรผู้ติดต่อ</Label>
          <Input
            {...register("contractTel")}
            placeholder="Enter contract tel"
            error={errors.contractTel?.message}
            disabled={isPending}
            className="w-full"
          />
        </div>

        <div className="col-span-1">
          <Label>อีเมลผู้ติดต่อ</Label>
          <Input
            {...register("contractEmail")}
            placeholder="Enter contract email"
            error={errors.contractEmail?.message}
            disabled={isPending}
            className="w-full"
          />
        </div>

        <div className="col-span-1">
          <Label>ช่องทางการติดต่อ Line</Label>
          <Input
            {...register("contractSocial_line")}
            placeholder="กรอก ID LINE"
            error={errors.contractSocial_line?.message}
            disabled={isPending}
            className="w-full"
          />
        </div>

        <div className="col-span-1">
          <Label>ช่องทางการติดต่อ (ลิงก์ Facebook)</Label>
          <Input
            {...register("contractSocial")}
            placeholder="ลิงก์ Facebook ผู้ติดต่อ หรือ บริษัท"
            error={errors.contractSocial?.message}
            disabled={isPending}
            className="w-full"
          />
        </div>

        <div className="col-span-1">
          <Label>สังกัดหน่วยงาน</Label>
          <Controller
            name="establishment" // ชื่อฟิลด์สำหรับ "Establishment Year"
            control={control} // ใช้ control จาก useForm
            render={({ field }) => (
              <Select
                {...field} // เชื่อมโยง field กับ react-hook-form
                className="p-2"
                inputId="establishment-year"
                options={transformedOptions.establishment} // options ที่ใช้สำหรับปี
                value={
                  transformedOptions.establishment.find(
                    (option) => option.value === field.value
                  ) || null
                } // กำหนดค่า value จาก field.value
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value)
                } // เมื่อเลือกค่าจาก Select, อัปเดต field value
                isClearable
                placeholder="สังกัดหน่วยงาน"
              />
            )}
          />
        </div>

        <div className="col-span-1">
          <Label>สายการเรียน</Label>
          <Controller
            name="occupation" // ชื่อฟิลด์
            control={control} // ใช้ control จาก useForm
            render={({ field }) => (
              <Select
                {...field} // เชื่อมโยง field กับ react-hook-form
                inputId="aria-example-input"
                name="aria-live-color"
                options={transformedOptions.occupation} // options ที่ใช้
                value={
                  transformedOptions.occupation.find(
                    (option) => option.value === field.value
                  ) || null
                } // กำหนดค่า value จาก field.value
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value)
                } // เมื่อเลือกค่าจาก Select, อัปเดต field value
                isClearable
                placeholder="เลือกสายการเรียน"
                className="p-2"
              />
            )}
          />
        </div>

        <div className="col-span-1">
          <Label>อยู่ใน MOU</Label>
          <Controller
            name="isMou"
            control={control}
            defaultValue={false} // Default value as "false"
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { label: "อยู่", value: "true" },
                  { label: "ไม่อยู่", value: "false" },
                ]}
                // Convert the field.value (boolean) to a string value for the Select component
                value={
                  transformedOptions.isMou.find(
                    (option) =>
                      option.value === (field.value ? "true" : "false")
                  ) || null
                }
                onChange={(selectedOption) => {
                  // Convert "true" to true and "false" to false
                  field.onChange(selectedOption?.value === "true");
                }}
                isClearable
                placeholder="อยู่ใน MOU?"
                className="p-2"
              />
            )}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label>ลิ้งก์เว็บไซต์ของบริษัท</Label>
          <Input
            {...register("website")}
            placeholder="ลิ้งก์เว็บไซต์ของบริษัท"
            error={errors.website?.message}
            disabled={isPending}
            className="w-full"
          />
        </div>

        {/* <div className="col-span-1 md:col-span-2">
          <Label>สวัสดิการบริษัท</Label>
          <Input
            {...register("benefit")}
            placeholder="สวัสดิการบริษัท"
            error={errors.benefit?.message}
            disabled={isPending}
            className="w-full"
          />
        </div> */}
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="benefit">สวัสดิการบริษัท</Label>
          <Textarea
            id="benefit"
            {...register("benefit")}
            placeholder="สวัสดิการบริษัท"
            disabled={isPending}
            className={`w-full ${errors.benefit ? "border-red-500" : ""}`}
            aria-invalid={errors.benefit ? "true" : "false"}
            onChange={(e) => {
              // แยกข้อความเป็นบรรทัด
              let lines = e.target.value.split("\n");

              // ลบบรรทัดที่เป็นแค่ "-" ออก
              lines = lines.filter((line) => line.trim() !== "-");

              // ตรวจสอบและเติม "-" ถ้าบรรทัดไหนไม่มี
              lines = lines.map((line) =>
                line.startsWith("- ") ? line : `- ${line.trim()}`
              );

              // อัปเดตค่าข้อความใหม่
              e.target.value = lines.join("\n");
            }}
          />
          {errors.benefit && (
            <p className="text-red-500 text-sm mt-1">
              {errors.benefit.message}
            </p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="w-full justify-center">
            <div className="text-center">อัพโหลดโลโก้บริษัท</div>
          </div>
          {uploadedImageUrl && (
            <div className="mt-4 flex justify-center items-center">
              <img
                src={uploadedImageUrl}
                alt="Uploaded"
                className="max-w-[200px] h-auto rounded-md shadow-lg"
              />
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // ลบภาพเก่า (ถ้ามี)
              if (uploadedImageUrl) {
                deleteOldImage(uploadedImageUrl); // ลบภาพเก่าก่อน
              }

              // เก็บ URL ของภาพใหม่
              setUploadedImageUrl(res[0].url); // เก็บ URL ของภาพใหม่
              setValue("imgLink", res[0].url);
              toast.success("อัพโหลดรูปสำเร็จ", {
                position: "top-center", // ใช้ตำแหน่งเป็น string
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

        <div className="col-span-1 md:col-span-2">
          {fields.map((position, positionIndex) => (
            <div key={position.id} className="mb-4">
              {/* Position Input */}
              <label htmlFor={`position-${positionIndex}`}>
                ตำแหน่งที่ {positionIndex + 1}
              </label>
              <div className="flex items-center gap-4">
                <CreatableSelect
                  id={`position-${positionIndex}`}
                  value={
                    position.name
                      ? { label: position.name, value: position.name }
                      : null
                  }
                  onChange={(newValue) => {
                    const updatedPositions = [...fields];
                    updatedPositions[positionIndex].name =
                      newValue?.value || "";
                    setValue("positions", updatedPositions); // อัปเดตค่าในฟอร์ม
                  }}
                  options={transformedOptions.position}
                  placeholder="เลือก หรือ พิมพ์เพื่อเพิ่ม"
                  isClearable
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => deletePosition(position.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Render Position Descriptions */}
              {position.position_description.map((description, descIndex) => (
                <div key={description.id} className="pl-10 mt-2">
                  <label htmlFor={`description-${descIndex}`}>
                    ตำแหน่งงาน {descIndex + 1}
                  </label>
                  <div className="flex items-center gap-4">
                    <CreatableSelect
                      id={`description-${descIndex}`}
                      value={
                        description.description
                          ? {
                              label: description.description,
                              value: description.description,
                            }
                          : null
                      }
                      onChange={(newValue) => {
                        const updatedPositions = [...fields];
                        updatedPositions[positionIndex].position_description[
                          descIndex
                        ].description = newValue?.value || "";
                        setValue("positions", updatedPositions);
                      }}
                      options={transformedOptions.positiondescription}
                      placeholder="เลือก หรือ พิมพ์เพื่อเพิ่ม"
                      isClearable
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        deletePositionDescription(position.id, description.id)
                      }
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Render Skills */}
                  {description.skills.map((skill, skillIndex) => (
                    <div key={skill.id} className="pl-10">
                      <label htmlFor={`skill-${descIndex}`}>
                        ทักษะ {skillIndex + 1}
                      </label>
                      <div className="flex items-center gap-4">
                        <CreatableSelect
                          id={`skill-${descIndex}`}
                          value={
                            skill.name
                              ? { label: skill.name, value: skill.name }
                              : null
                          }
                          onChange={(newValue) => {
                            const updatedPositions = [...fields];
                            updatedPositions[
                              positionIndex
                            ].position_description[descIndex].skills[
                              skillIndex
                            ].name = newValue?.value || "";
                            setValue("positions", updatedPositions);
                          }}
                          options={transformedOptions.skill}
                          placeholder="เลือก หรือ พิมพ์เพื่อเพิ่ม"
                          isClearable
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            deleteSkill(position.id, description.id, skill.id)
                          }
                          className="p-2 bg-red-500 text-white rounded"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Render Tools */}
                      {skill.tools.map((tool, toolIndex) => (
                        <div key={tool.id} className="pl-10">
                          <label htmlFor={`tool-${descIndex}`}>
                            เครื่องมือ {toolIndex + 1}
                          </label>
                          <div className="flex items-center gap-4">
                            <CreatableSelect
                              id={`tool-${descIndex}`}
                              value={
                                tool.name
                                  ? { label: tool.name, value: tool.name }
                                  : null
                              }
                              onChange={(newValue) => {
                                const updatedPositions = [...fields];
                                updatedPositions[
                                  positionIndex
                                ].position_description[descIndex].skills[
                                  skillIndex
                                ].tools[toolIndex].name = newValue?.value || "";
                                setValue("positions", updatedPositions);
                              }}
                              options={transformedOptions.tool}
                              placeholder="เลือก หรือ พิมพ์เพื่อเพิ่ม"
                              isClearable
                              className="flex-1"
                            />
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
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          addTool(position.id, description.id, skill.id)
                        }
                        className="mt-2 ml-10 p-2 px-4 bg-green-500 text-white rounded"
                      >
                        เพิ่มเครื่องมือ
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addSkill(position.id, description.id)}
                    className="mt-2 ml-10 p-2 px-4 bg-green-500 text-white rounded"
                  >
                    เพิ่มทักษะ
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addDescription(position.id)}
                className="mt-2 ml-10 p-2 px-4 bg-green-500 text-white rounded"
              >
                เพิ่มคำอธิบาย
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addPosition}
            className="mt-4 px-4 p-2 bg-blue-500 text-white rounded"
          >
            เพิ่มตำแหน่ง
          </button>
        </div>
      </form>
      <div className="flex w-full justify-center gap-4">
        <div className="flex justify-end">
          <button
            onClick={() => {
              deleteOldImage(uploadedImageUrl); // ลบภาพเก่า
              handleNavigation(); // ทำการนำทาง
            }}
            className="p-2 bg-white md:w-[200px] rounded-md border-2 border-gray-400 hover:bg-gray-300 transition"
          >
            <div className="text-center text-black">ยกเลิก</div>
          </button>
        </div>
        <div className="flex justify-start">
          <button
            onClick={onSubmit}
            className="p-2 bg-green-500 md:w-[200px] rounded-md border-2 border-gray-400 hover:bg-green-600 transition"
          >
            <div className="text-center text-white">เพิ่มสถานประกอบการ</div>
          </button>
        </div>
      </div>
    </div>
  );
}
