// In your page.tsx file

"use server";

import { getOptionAction } from "@/actions/optionAction";
import { InsertForm } from "./components/form";
import { Label } from "@/components/ui/label";
export default async function Page() {

  const optionData = await getOptionAction(); // ดึงข้อมูล option

  return (
    <div className="mt-4 font-Prompt ">
      <div className="w-full flex items-center justify-center">
        <div className="w-fit bg-slate-200 p-4 rounded-lg">
          <Label className="font-bold text-2xl">เพิ่มสถานประกอบการ</Label>
        </div>
      </div>
      <InsertForm optionData={optionData}/>
    </div>
  );
}
