"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchema } from "@/validations/sign-in.validation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInActions } from "@/actions/auth";

const Page = () => {
   const [isPending, startTransition] = useTransition();
   const router = useRouter();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SignInSchema>({
      resolver: zodResolver(signInSchema), // เชื่อม Zod validation schema
   });
   const onSubmit = (data: SignInSchema) => {
      startTransition(async () => {
         try {
            // เรียก API เพื่อเข้าสู่ระบบ
            signInActions(data).then((data) => {
               if (!data?.success) {
                  alert(data.message);
               }

               window.location.href = "/";
            });
         } catch (error) {
            console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", error);
            alert("เกิดข้อผิดพลาดในระบบ กรุณาลองอีกครั้ง");
         }
      });
   };
   return (
      <div className="grid grid-cols-2 h-screen">
         <div className="relative w-full mx-auto bg-[#FFFAE6]">
            <Image src="/authpage/testbg.svg" alt="Sign in Background" fill />
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)} // เพิ่ม handleSubmit
            className="w-full bg-[#FFFAE6] flex items-center font-Prompt"
         >
            <div className="flex flex-col gap-8 items-center h-fit min-w-[570px] mx-auto px-16 pt-16 pb-16 border bg-white rounded-3xl">
               <h1 className="text-3xl font-bold">เข้าสู่ระบบ</h1>
               <div className="w-full">
                  <Label htmlFor="email">Email</Label>
                  <Input
                     {...register("email")}
                     placeholder="Email"
                     disabled={isPending}
                     className="w-full"
                  />
                  {errors.email && (
                     <p className="text-red-500 text-sm">
                        {errors.email.message}
                     </p>
                  )}
               </div>
               <div className="w-full">
                  <Label htmlFor="password">Password</Label>
                  <Input
                     {...register("password")}
                     placeholder="Password"
                     type="password"
                     disabled={isPending}
                     className="w-full"
                  />
                  {errors.password && (
                     <p className="text-red-500 text-sm">
                        {errors.password.message}
                     </p>
                  )}
               </div>
               <button
                  type="submit"
                  className="bg-[#095890] rounded-full px-4 py-4 text-white w-full"
                  disabled={isPending}
               >
                  {isPending ? "Signing in..." : "Sign In"}
               </button>
               <div className="flex gap-2">
                  <p>ยังไม่มีบัญชีผู้ใช้?</p>
                  <Link href="/sign-up" className="text-[#095890]">
                     ลงทะเบียน
                  </Link>
               </div>
            </div>
         </form>
      </div>
   );
};

export default Page;
