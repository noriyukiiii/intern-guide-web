"use client";

import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "@/validations/sign-up.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/actions/sign-up";
export default function page() {
  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "mmtstst@gmail.com",
      password: "123456321",
      confirmPassword: "123456321",
      lastname: "mm",
      firstname: "mm",
      telephone: "0789456123",
      student_id: "123456",
    },
  });

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (data: SignUpSchema) => {
    startTransition(async () => {
      const result = await signUpAction(
        data,
      );

      if (result.success) {
        console.log("user created successfully");
      } else {
        console.log(result?.error);
      }
    });
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 items-center max-w-[400px] mx-auto w-full p-4">
          <h1>Sign-up</h1>
          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              placeholder="you@example.com"
              error={errors.email?.message}
              disabled={isPending}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="password">password</Label>
            <Input
              {...register("password")}
              placeholder="password"
              error={errors.password?.message}
              disabled={isPending}
              className="w-full"
              type={showPassword.password ? "text" : "password"}
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
            <Label htmlFor="confirmPassword">confirmPassword</Label>
            <Input
              {...register("confirmPassword")}
              placeholder="confirmPassword"
              error={errors.confirmPassword?.message}
              className="w-full"
              disabled={isPending}
              type={showPassword.confirmPassword ? "text" : "password"}
              endContent={
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword ? "Hide" : "Show"}
                </button>
              }
            />
          </div>
          <div className="w-full">
            <Label htmlFor="firstname">firstname</Label>
            <Input
              {...register("firstname")}
              placeholder="firstname"
              error={errors.firstname?.message}
              className="w-full"
              disabled={isPending}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="lastname">lastname</Label>
            <Input
              {...register("lastname")}
              placeholder="lastname"
              error={errors.lastname?.message}
              className="w-full"
              disabled={isPending}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="telephone">telephone</Label>
            <Input
              {...register("telephone")}
              placeholder="telephone"
              error={errors.telephone?.message}
              className="w-full"
              disabled={isPending}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="student_id">student_id</Label>
            <Input
              {...register("student_id")}
              placeholder="student_id"
              error={errors.student_id?.message}
              className="w-full"
              disabled={isPending}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 rounded-md px-4 py-2 text-foreground w-full"
            disabled={isPending}
          >
            Sign up
          </button>
        </div>
      </form>
    </main>
  );
}
