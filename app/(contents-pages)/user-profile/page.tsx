"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "@/hooks/use-session";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  firstname: z.string().min(2, {
    message: "Firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  studentId: z.string().min(13, {
    message: "Student ID must be at least 13 characters.",
  }),
  avatar: z.string(),
});

const avatarOptions = [
  "/userimage/witch.png",
  "/userimage/soldier.png",
  "/userimage/elf.png",
  "/userimage/thief.png",
  "/userimage/boy.png",
  "/userimage/chef.png",
];

export default function Page() {
  const router = useRouter(); // Initialize useRouter
  const { session } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      studentId: "",
      avatar: avatarOptions[0],
    },
  });

  useEffect(() => {
    if (session?.user?.email) {
      form.reset({
        email: session?.user?.email,
        firstname: session?.user?.firstName,
        lastname: session?.user?.lastName,
        phone: session?.user?.phone,
        studentId: session?.user?.studentId,
        avatar: session?.user?.image || avatarOptions[0],
      });
    }
  }, [session, form]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFAE6] overflow-hidden font-Prompt">
      <div className="m-10 p-10 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-black">ข้อมูลผู้ใช้</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-[#FFFAE6] h-full p-4 bg-opacity-50 items-center w-full">
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <ToastContainer />
          <div className="flex justify-center gap-4 bg-white p-10 rounded-3xl shadow-xl">
            <Image
              src={form.watch("avatar")}
              alt={`Avatar`}
              width={80}
              height={80}
              className="object-cover rounded-full border-4 border-[#4A90E2]"
            />
          </div>
          <p className="mt-2 text-lg text-gray-600">รูป Avatar</p>
        </div>
        <Form {...form}>
          <form className="w-full md:w-2/3 space-y-6 bg-white h-fit p-8 rounded-3xl shadow-lg">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-6 text-xl ">
                      Email : {session.user?.email}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-6 text-xl ">
                      ชื่อ : {session.user?.firstName} {session.user?.lastName}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-6 text-xl">
                      โทรศัพท์ : {session.user?.phone}
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-6 text-xl">
                      รหัสนักศึกษา : {session.user?.studentId}
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-6 flex gap-2 text-xl">
                      สถานะ :
                      {session.user?.status === "No_Intern" && (
                        <p>ยังไม่ออกสหกิจ</p>
                      )}
                      {session.user?.status === "Interning" && (
                        <p>กำลังอยู่ระหว่างออกสหกิจ</p>
                      )}
                      {session.user?.status === "InternSuccess" && (
                        <p>ออกสหกิจเสร็จสิ้น</p>
                      )}
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
