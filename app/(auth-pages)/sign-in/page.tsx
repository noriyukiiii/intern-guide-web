"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchema } from "@/validations/sign-in.validation";

import { Input } from "@/components/ui/inputtest";
import { Label } from "@/components/ui/label";
import { signInActions } from "@/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { button } from "@nextui-org/theme";

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

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
        const response = await signInActions(data);

        if (!response?.success) {
          toast.warning(response.message);
          return;
        }

        // ใช้ redirectTo ที่ส่งมาจาก signInActions
        const redirectTo = response.redirectTo || "/";
        window.location.href = redirectTo;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", error);
        alert("เกิดข้อผิดพลาดในระบบ กรุณาลองอีกครั้ง");
      }
    });
  };

  return (
    <div className="flex flex-row h-screen">
      <ToastContainer />
      <div className="relative lg:w-1/2 bg-[#FFFAE6]">
        <Image src="/authpage/testbg.svg" alt="Sign in Background" fill />
      </div>
      <div className="lg:w-1/2 flex items-center justify-center h-full w-full bg-[#FFFAE6] p-4 lg:p-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 items-center w-full max-w-md p-8 bg-white rounded-3xl shadow-lg"
        >
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
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"} // 👁️ เปลี่ยน type
              disabled={isPending}
              className="w-full pr-10"
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <div className="w-full flex justify-end mt-2">
              <Link href="/forgot-password" className="text-sm text-[#095890]">
                ลืมรหัสผ่าน?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#095890] rounded-xl px-4 py-4 text-white w-full"
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
        </form>
      </div>
    </div>
  );
};

export default Page;
