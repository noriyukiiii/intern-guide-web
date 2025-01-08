// "use client";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { useTransition } from "react";
// import Select from "react-select";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { CompanySchema, companySchema } from "@/validations/company.validation";
// import { useForm } from "react-hook-form";
// import { insertCompanyActions } from "@/actions/company";

// const provinces = [
//   { value: "bangkok", label: "กรุงเทพมหานคร" },
//   { value: "chiang_mai", label: "เชียงใหม่" },
//   { value: "phuket", label: "ภูเก็ต" },
//   { value: "nakhon_ratchasima", label: "นครราชสีมา" },
//   { value: "chiang_rai", label: "เชียงราย" },
//   { value: "songkhla", label: "สงขลา" },
//   { value: "surat_thani", label: "สุราษฎร์ธานี" },
//   { value: "nonthaburi", label: "นนทบุรี" },
//   { value: "pathum_thani", label: "ปทุมธานี" },
//   { value: "samut_prakan", label: "สมุทรปราการ" },
//   { value: "samut_sakhon", label: "สมุทรสาคร" },
//   { value: "samut_songkhram", label: "สมุทรสงคราม" },
//   { value: "rayong", label: "ระยอง" },
//   { value: "chachoengsao", label: "ฉะเชิงเทรา" },
//   { value: "ratchaburi", label: "ราชบุรี" },
//   { value: "kanchanaburi", label: "กาญจนบุรี" },
//   { value: "kanchanaburi", label: "กาญจนบุรี" },
//   { value: "prachuap_khiri_khan", label: "ประจวบคีรีขันธ์" },
//   { value: "phetchaburi", label: "เพชรบุรี" },
//   { value: "pattani", label: "ปัตตานี" },
//   { value: "yala", label: "ยะลา" },
//   { value: "narathiwat", label: "นราธิวาส" },
//   { value: "phatthalung", label: "พัทลุง" },
//   { value: "trang", label: "ตรัง" },
//   { value: "krabi", label: "กระบี่" },
//   { value: "nakhon_sawan", label: "นครสวรรค์" },
//   { value: "chaiyaphum", label: "ชัยภูมิ" },
//   { value: "amnat_charoen", label: "อำนาจเจริญ" },
//   { value: "buri_ram", label: "บุรีรัมย์" },
//   { value: "mahasarakham", label: "มหาสารคาม" },
//   { value: "khon_kaen", label: "ขอนแก่น" },
//   { value: "surin", label: "สุรินทร์" },
//   { value: "kalasin", label: "กาฬสินธุ์" },
//   { value: "roiet", label: "ร้อยเอ็ด" },
//   { value: "sakon_nakhon", label: "สกลนคร" },
//   { value: "nakhon_phanom", label: "นครพนม" },
//   { value: "udon_thani", label: "อุดรธานี" },
//   { value: "loei", label: "เลย" },
//   { value: "nong_bua_lamphu", label: "หนองบัวลำภู" },
//   { value: "nong_khai", label: "หนองคาย" },
//   { value: "mae_hong_son", label: "แม่ฮ่องสอน" },
//   { value: "phayao", label: "พะเยา" },
//   { value: "lamphun", label: "ลำพูน" },
//   { value: "lampang", label: "ลำปาง" },
//   { value: "tak", label: "ตาก" },
//   { value: "sukhothai", label: "สุโขทัย" },
//   { value: "phitsanulok", label: "พิษณุโลก" },
//   { value: "phichit", label: "พิจิตร" },
//   { value: "nakhon_sri_thammarat", label: "นครศรีธรรมราช" },
//   { value: "chumphon", label: "ชุมพร" },
//   { value: "suphan_buri", label: "สุพรรณบุรี" },
//   { value: "phrae", label: "แพร่" },
//   { value: "northern", label: "ภาคเหนือ" },
//   { value: "central", label: "ภาคกลาง" },
//   { value: "northeastern", label: "ภาคตะวันออกเฉียงเหนือ" },
//   { value: "southern", label: "ภาคใต้" }
// ];

// export default function page() {
//   const [isPending, startTransition] = useTransition();
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     setValue,
//     getValues,
//   } = useForm<CompanySchema>({
//     resolver: zodResolver(companySchema),
//   });

//   const onSubmit = async (data: CompanySchema) => {
//     try {
//       const result = companySchema.safeParse(data);

//       if (!result.success) {
//         console.error(result.error);
//         return;
//       }

//       const response = await insertCompanyActions(result.data);
//       alert("บันทึกข้อมูลสำเร็จ");
//       if (!response.success) {
//         console.error(response.message);
//         return;
//       }

//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="w-full h-full flex flex-col gap-4 items-center justify-center p-10">
//         <h1 className="text-4xl font-bold text-center">เพิ่มบริษัท</h1>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="w-full bg-[#FFFAE6] h-full items-center font-Prompt flex flex-col gap-2"
//         >
//           <div className="w-full">
//             <Label htmlFor="companynameTH">companynameTH</Label>
//             <Input
//               {...register("companyNameTh")}
//               placeholder="ชื่อสถานประกอบการ(TH)"
//               error={errors.companyNameTh?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="companyNameEn">companyNameEn</Label>
//             <Input
//               {...register("companyNameEn")}
//               placeholder="ชื่อสถานประกอบการ(ENG)"
//               error={errors.companyNameEn?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="location">location</Label>
//             <Input
//               {...register("location")}
//               placeholder="ที่อยู่"
//               error={errors.location?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full grid grid-cols-2 gap-4">
//             <div className="w-full">
//               <Label htmlFor="province">จังหวัด</Label>
//               <Select
//                 {...register("province")}
//                 options={provinces}
//                 onChange={(selectedOption) =>
//                   setValue("province", selectedOption?.value)
//                 }
//                 placeholder="เลือกจังหวัด"
//                 isDisabled={isPending}
//                 getOptionLabel={(e) => e.label} // ใช้ค่า label ในการแสดง
//                 getOptionValue={(e) => e.value} // ใช้ค่า value ในการเก็บ
//               />
//             </div>
//           </div>
//           <div className="w-full grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="occupation">สายการเรียน</Label>
//               <select
//                 {...register("occupation")}
//                 disabled={isPending}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="network">Network</option>
//                 <option value="database">Database</option>
//                 <option value="both">Both</option>
//               </select>
//               {errors.occupation && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.occupation.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <Label htmlFor="establishment">ประเภทสถานประกอบการ</Label>
//               <select
//                 {...register("establishment")}
//                 disabled={isPending}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="เอกชน">เอกชน</option>
//                 <option value="รัฐบาล">รัฐบาล</option>
//                 <option value="รัฐวิสาหกิจ">รัฐวิสาหกิจ</option>
//               </select>
//             </div>
//           </div>
//           <div className="w-full">
//             <Label htmlFor="description">description</Label>
//             <Input
//               {...register("description")}
//               placeholder="คำอธิบาย"
//               error={errors.description?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="other_description">other_description</Label>
//             <Input
//               {...register("other_description")}
//               placeholder="คำอธิบาย"
//               error={errors.other_description?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="contractName">contractName</Label>
//             <Input
//               {...register("contractName")}
//               placeholder="ชื่อผู้ติดต่อ"
//               error={errors.contractName?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="contractTel">contractTel</Label>
//             <Input
//               {...register("contractTel")}
//               placeholder="เบอร์โทร"
//               error={errors.contractTel?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="contractEmail">contractEmail</Label>
//             <Input
//               {...register("contractEmail")}
//               placeholder="อีเมล"
//               error={errors.contractEmail?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="contractSocial">contractSocial</Label>
//             <Input
//               {...register("contractSocial")}
//               placeholder="Social"
//               error={errors.contractSocial?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>

//           <div className="w-full">
//             <Label htmlFor="website">website</Label>
//             <Input
//               {...register("website")}
//               placeholder="เว็บไซต์"
//               error={errors.website?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="position">position</Label>
//             <Input
//               {...register("position")}
//               placeholder="ตำแหน่ง"
//               error={errors.position?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="benefit">benefit</Label>
//             <Input
//               {...register("benefit")}
//               placeholder="สวัสดิการ"
//               error={errors.benefit?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>

//           <div className="w-full">
//             <Label htmlFor="imgLink">imgLink</Label>
//             <Input
//               {...register("imgLink")}
//               placeholder="รูป"
//               error={errors.imgLink?.message}
//               disabled={isPending}
//               className="w-full"
//             />
//           </div>
//           <div className="w-full">
//             <Label htmlFor="mou">MOU</Label>
//             <div className="flex gap-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="true"
//                   {...register("isMou")}
//                   disabled={isPending}
//                 />
//                 <span className="ml-2">Yes</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="false"
//                   {...register("isMou")}
//                   disabled={isPending}
//                 />
//                 <span className="ml-2">No</span>
//               </label>
//             </div>
//           </div>
//           <div className="w-full gap-4">
//             <button
//               type="submit"
//               className="bg-[#095890] rounded-full px-4 py-4 text-foreground w-full text-white"
//               disabled={isPending}
//             >
//               {isPending ? "กำลังส่งข้อมูล..." : "สร้างข้อมูล company"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
