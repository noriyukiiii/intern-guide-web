    "use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/validations/forgot-password.validation";

import { Input } from "@/components/ui/inputtest";
import { Label } from "@/components/ui/label";
import { resetPasswordActions } from "@/actions/auth";

const ForgotPasswordPage = () => {
   const [message, setMessage] = useState("");
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<ForgotPasswordSchema>({
      resolver: zodResolver(forgotPasswordSchema),
   });

   const onSubmit = async (data: ForgotPasswordSchema) => {
      const response = await resetPasswordActions(data);
      setMessage(response.message);
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FFFAE6] p-4">
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 items-center w-full max-w-md p-8 bg-white rounded-3xl shadow-lg"
         >
            <h1 className="text-2xl font-bold">ลืมรหัสผ่าน?</h1>
            <p className="text-sm text-gray-500 text-center">
               กรุณากรอกอีเมลที่ลงทะเบียนไว้ ระบบจะส่งลิงก์สำหรับตั้งค่ารหัสผ่านใหม่ให้คุณ
            </p>

            <div className="w-full">
               <Label htmlFor="email">Email</Label>
               <Input {...register("email")} placeholder="Email" disabled={isSubmitting} className="w-full" />
               {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <button
               type="submit"
               className="bg-[#095890] rounded-xl px-4 py-4 text-white w-full"
               disabled={isSubmitting}
            >
               {isSubmitting ? "กำลังส่ง..." : "ส่งคำขอรีเซ็ตรหัสผ่าน"}
            </button>

            {message && <p className="text-green-600 text-sm">{message}</p>}
         </form>
      </div>
   );
};

export default ForgotPasswordPage;
