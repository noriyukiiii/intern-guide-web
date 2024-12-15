"use client";

import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  signUpSchema,
  SignUpSchema,
  partialSignUpSchema,
} from "@/validations/sign-up.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { signUpAction } from "@/actions/sign-up";
import Link from "next/link";
import { isValid } from "zod";

export default function page() {
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(1); // ตั้งค่า step ของฟอร์ม

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      lastname: "",
      firstname: "",
      telephone: "",
      student_id: "",
    },
  });

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (data: SignUpSchema) => {
    const result = signUpSchema.safeParse(data);

    if (result.success) {
      startTransition(async () => {
        const result = await signUpAction(data);
        if (result.success) {
          console.log("user created successfully");
        } else {
          console.log(result?.error);
        }
      });
    } else {
      console.log("Validation errors:", result.error.flatten().fieldErrors); // แสดงข้อผิดพลาด
    }
  };

  const nextStep = () => {
    const values = getValues(); // ดึงค่าจากฟอร์ม
    const result = partialSignUpSchema.safeParse({
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });

    if (result.success) {
      console.log("Validation passed:", result.data); // ข้อมูลผ่านการ validate
      setCurrentStep(2); // เปลี่ยนไป Step 2
    } else {
      console.log("Validation errors:", result.error.flatten().fieldErrors); // แสดงข้อผิดพลาด
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="relative w-full mx-auto bg-[#FFFAE6]">
        <Image src="/authpage/testbg.svg" alt="register rmutt Image" fill />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-[#FFFAE6] flex items-center font-Prompt"
      >
        <div className="flex flex-col gap-8 items-center h-fit min-w-[570px] min-h-[600px] mx-auto px-16 pt-16 pb-4 border border-gr bg-white rounded-3xl">
          <h1 className="text-3xl font-bold">ลงทะเบียน</h1>

          {/* หน้าแรก (Step 1) */}
          {currentStep === 1 && (
            <>
              <div className="w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  placeholder="Email Address"
                  error={errors.email?.message}
                  disabled={isPending}
                  className="w-full"
                />
              </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              <div className="w-full">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  placeholder="Password"
                  error={errors.password?.message}
                  disabled={isPending}
                  type={showPassword.password ? "text" : "password"}
                  className="w-full"
                  endContent={
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                    >
                      {showPassword.password ? "Hide" : "Show"}
                    </button>
                  }
                />
              </div>
              <div className="w-full">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  error={errors.confirmPassword?.message}
                  className="w-full"
                  disabled={isPending}
                  type={showPassword.confirmPassword ? "text" : "password"}
                  endContent={
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      {showPassword.confirmPassword ? "Hide" : "Show"}
                    </button>
                  }
                />
              </div>
              <button
                type="button"
                className="bg-[#095890] rounded-full px-4 py-4 text-foreground w-full text-white"
                disabled={isPending}
                onClick={nextStep} // ไปยังขั้นตอนถัดไปหลังจาก validate
              >
                ถัดไป
              </button>
            </>
          )}

          {/* หน้าสอง (Step 2) */}
          {currentStep === 2 && (
            <>
              <div className="w-full">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  {...register("firstname")}
                  placeholder="First Name"
                  error={errors.firstname?.message}
                  disabled={isPending}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  {...register("lastname")}
                  placeholder="Last Name"
                  error={errors.lastname?.message}
                  disabled={isPending}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="telephone">Telephone</Label>
                <Input
                  {...register("telephone")}
                  placeholder="Telephone"
                  error={errors.telephone?.message}
                  disabled={isPending}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="student_id">Student ID</Label>
                <Input
                  {...register("student_id")}
                  placeholder="Student ID"
                  error={errors.student_id?.message}
                  disabled={isPending}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 w-full gap-4">
                <button
                  type="button" // ใช้ type="button" แทน "submit" เพื่อไม่ให้ฟอร์มถูกส่งเมื่อกดปุ่ม
                  className="bg-[#c2c2c2] rounded-full px-4 py-4 text-foreground w-full text-white"
                  disabled={isPending}
                  onClick={() => setCurrentStep(1)} // เมื่อกดปุ่มจะตั้งค่า currentStep เป็น 1
                >
                  ย้อนกลับ
                </button>
                <button
                  type="submit"
                  className="bg-[#095890] rounded-full px-4 py-4 text-foreground w-full text-white"
                  disabled={isPending}
                >
                  ยืนยัน
                </button>
              </div>
            </>
          )}

          <div className="flex gap-2">
            <p>มีบัญชีอยู่แล้ว?</p>
            <Link href="/sign-in" className="text-[#095890]">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
