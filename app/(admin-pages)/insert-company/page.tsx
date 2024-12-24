"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanySchema, companySchema } from "@/validations/company.validation";
import { useForm } from "react-hook-form";
import { insertCompanyActions } from "@/actions/company";
import { useTransition } from "react";
export default function page() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = async (data: CompanySchema) => {
    try {
      const result = companySchema.safeParse(data);

      if (!result.success) {
        console.error(result.error);
        return;
      }

      const response = await insertCompanyActions(result.data);

      if (!response.success) {
        console.error(response.message);
        return;
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center p-10">
        <h1 className="text-4xl font-bold text-center">เพิ่มบริษัท</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-[#FFFAE6] h-full items-center font-Prompt flex flex-col gap-2"
        >
          <div className="w-full">
            <Label htmlFor="companynameTH">companynameTH</Label>
            <Input
              {...register("companyNameTh")}
              placeholder="ชื่อสถานประกอบการ(TH)"
              error={errors.companyNameTh?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="companyNameEn">companyNameEn</Label>
            <Input
              {...register("companyNameEn")}
              placeholder="ชื่อสถานประกอบการ(ENG)"
              error={errors.companyNameEn?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="description">description</Label>
            <Input
              {...register("description")}
              placeholder="คำอธิบาย"
              error={errors.description?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>

          <div className="w-full">
            <Label htmlFor="location">location</Label>
            <Input
              {...register("location")}
              placeholder="ที่อยู่"
              error={errors.location?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="contractName">contractName</Label>
            <Input
              {...register("contractName")}
              placeholder="ชื่อผู้ติดต่อ"
              error={errors.contractName?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="contractTel">contractTel</Label>
            <Input
              {...register("contractTel")}
              placeholder="เบอร์โทร"
              error={errors.contractTel?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="contractEmail">contractEmail</Label>
            <Input
              {...register("contractEmail")}
              placeholder="อีเมล"
              error={errors.contractEmail?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="contractSocial">contractSocial</Label>
            <Input
              {...register("contractSocial")}
              placeholder="Social"
              error={errors.contractSocial?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="establishment">establishment</Label>
            <Input
              {...register("establishment")}
              placeholder="ประเภท"
              error={errors.establishment?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="website">website</Label>
            <Input
              {...register("website")}
              placeholder="เว็บไซต์"
              error={errors.website?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="position">position</Label>
            <Input
              {...register("position")}
              placeholder="ตำแหน่ง"
              error={errors.position?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="benefit">benefit</Label>
            <Input
              {...register("benefit")}
              placeholder="สวัสดิการ"
              error={errors.benefit?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="occupation">occupation</Label>
            <Input
              {...register("occupation")}
              placeholder="อาชีพ"
              error={errors.occupation?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="imgLink">imgLink</Label>
            <Input
              {...register("imgLink")}
              placeholder="รูป"
              error={errors.imgLink?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
            <div className="w-full">
            <Label htmlFor="mou">MOU</Label>
            <div className="flex gap-4">
              <label className="flex items-center">
              <input
                type="radio"
                value="true"
                {...register("isMou")}
                disabled={isPending}
              />
              <span className="ml-2">Yes</span>
              </label>
              <label className="flex items-center">
              <input
                type="radio"
                value="false"
                {...register("isMou")}
                disabled={isPending}
              />
              <span className="ml-2">No</span>
              </label>
            </div>
            </div>
          <div className="w-full gap-4">
            <button
              type="submit"
              className="bg-[#095890] rounded-full px-4 py-4 text-foreground w-full text-white"
              disabled={isPending}
            >
             {isPending ? "กำลังส่งข้อมูล..." : "สร้างข้อมูล company"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
