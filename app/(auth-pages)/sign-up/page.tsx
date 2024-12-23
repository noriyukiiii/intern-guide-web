"use client";

import React, { useState, useTransition, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
   signUpSchema,
   SignUpSchema,
   signUpEmailPasswordConfirmSchema,
} from "@/validations/sign-up.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { signUp } from "@/actions/auth/sign-up";

export default function page() {
   const [isPending, startTransition] = useTransition();
   const [currentStep, setCurrentStep] = useState(1);
   const router = useRouter();
   const [showPassword, setShowPassword] = useState({
      password: false,
      confirmPassword: false,
   });
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState<string>("");
   const [confirmPasswordError, setConfirmPasswordError] = useState("");

   const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      getValues,
   } = useForm<SignUpSchema>({
      resolver: zodResolver(signUpSchema),
   });

   const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
      setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
   };

   const onSubmit = async (data: SignUpSchema) => {
      try {
         const result = signUpSchema.safeParse(data);

         if (!result.success) {
            console.error(result.error);
            return;
         }

         const response = await signUp(result.data);

         if (!response.success) {
            console.error(response.message);
            return;
         }

         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   const nextStep = async () => {
      // ดึงข้อมูลจากฟอร์ม
      const data = getValues();

      // ใช้ signUpEmailPasswordConfirmSchema ในการตรวจสอบข้อมูล
      const result = signUpEmailPasswordConfirmSchema.safeParse({
         email: data.email,
         password: data.password,
         confirmPassword: data.confirmPassword,
      });

      if (result.success) {
         console.log("Validation passed:", result.data);
         setCurrentStep(2); // ถ้า validation ผ่านให้ไป Step 2
      } else {
         // ดึงข้อผิดพลาดจาก email
         const emailErrors = result.error.flatten().fieldErrors.email;
         const emailErrorMessage = emailErrors ? emailErrors[0] : "";

         // ดึงข้อผิดพลาดจาก password
         const passwordErrors = result.error.flatten().fieldErrors.password;
         const passwordErrorMessage = passwordErrors ? passwordErrors[0] : "";

         // ดึงข้อผิดพลาดจาก confirmPassword
         const confirmPasswordErrors =
            result.error.flatten().fieldErrors.confirmPassword;
         const confirmPasswordErrorMessage = confirmPasswordErrors
            ? confirmPasswordErrors[0]
            : "";

         // แสดงข้อผิดพลาดในคอนโซล
         console.log("Validation errors:");
         console.log("Email errors:", emailErrorMessage);
         console.log("Password errors:", passwordErrorMessage);
         console.log("Confirm Password errors:", confirmPasswordErrorMessage);

         // ส่งข้อผิดพลาดไปยัง Input components
         // สมมติว่าเราจะอัปเดต state หรือใช้ในแบบอื่นๆ เพื่อนำไปแสดงใน Input component
         setEmailError(emailErrorMessage);
         setPasswordError(passwordErrorMessage);
         setConfirmPasswordError(confirmPasswordErrorMessage);
      }
   };
   useEffect(() => {
      // รีเซ็ตข้อผิดพลาดเมื่อกลับไปที่ step 1
      if (currentStep === 1) {
         setEmailError("");
         setPasswordError("");
         setConfirmPasswordError("");
      }
   }, [currentStep]);

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
                           error={emailError}
                           disabled={isPending}
                           className="w-full"
                           onChange={(e) => {
                              // เช็ค email ที่กรอก
                              const emailValue = e.target.value;
                              const result =
                                 signUpEmailPasswordConfirmSchema.safeParse({
                                    email: emailValue,
                                    password: getValues().password,
                                    confirmPassword:
                                       getValues().confirmPassword,
                                 });

                              // ถ้า email ไม่มีข้อผิดพลาดก็ให้รีเซ็ต error
                              if (result.success) {
                                 setEmailError(""); // รีเซ็ต error
                              } else {
                                 // ถ้ามีข้อผิดพลาดแสดง error ตามปกติ
                                 const emailErrors =
                                    result.error.flatten().fieldErrors.email;
                                 const emailErrorMessage = emailErrors
                                    ? emailErrors[0]
                                    : "";
                                 setEmailError(emailErrorMessage);
                              }
                           }}
                        />
                     </div>
                     <div className="w-full">
                        <Label htmlFor="password">Password</Label>
                        <Input
                           {...register("password")}
                           placeholder="Password"
                           error={passwordError}
                           disabled={isPending}
                           type={showPassword.password ? "text" : "password"}
                           className="w-full"
                           onChange={(e) => {
                              const passwordValue = e.target.value;
                              const result =
                                 signUpEmailPasswordConfirmSchema.safeParse({
                                    email: getValues().email,
                                    password: passwordValue,
                                    confirmPassword:
                                       getValues().confirmPassword,
                                 });

                              // ถ้า validation ผ่านก็ให้รีเซ็ต error
                              if (result.success) {
                                 setPasswordError("");
                              } else {
                                 const passwordErrors =
                                    result.error.flatten().fieldErrors.password;
                                 const passwordErrorMessage = passwordErrors
                                    ? passwordErrors[0]
                                    : "";
                                 setPasswordError(passwordErrorMessage);
                              }
                           }}
                           endContent={
                              <button
                                 type="button"
                                 onClick={() =>
                                    togglePasswordVisibility("password")
                                 }
                              >
                                 {showPassword.password ? "Hide" : "Show"}
                              </button>
                           }
                        />
                     </div>
                     <div className="w-full">
                        <Label htmlFor="confirmPassword">
                           Confirm Password
                        </Label>
                        <Input
                           {...register("confirmPassword")}
                           placeholder="Confirm Password"
                           error={confirmPasswordError}
                           className="w-full"
                           disabled={isPending}
                           type={
                              showPassword.confirmPassword ? "text" : "password"
                           }
                           onChange={(e) => {
                              const confirmPasswordValue = e.target.value;
                              const result =
                                 signUpEmailPasswordConfirmSchema.safeParse({
                                    email: getValues().email,
                                    password: getValues().password,
                                    confirmPassword: confirmPasswordValue,
                                 });

                              // ถ้า validation ผ่านก็ให้รีเซ็ต error
                              if (result.success) {
                                 setConfirmPasswordError("");
                              } else {
                                 const confirmPasswordErrors =
                                    result.error.flatten().fieldErrors
                                       .confirmPassword;
                                 const confirmPasswordErrorMessage =
                                    confirmPasswordErrors
                                       ? confirmPasswordErrors[0]
                                       : "";
                                 setConfirmPasswordError(
                                    confirmPasswordErrorMessage
                                 );
                              }
                           }}
                           endContent={
                              <button
                                 type="button"
                                 onClick={() =>
                                    togglePasswordVisibility("confirmPassword")
                                 }
                              >
                                 {showPassword.confirmPassword
                                    ? "Hide"
                                    : "Show"}
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
                           สมัคร
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
