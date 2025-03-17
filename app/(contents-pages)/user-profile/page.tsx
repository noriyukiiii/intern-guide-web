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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        {/* <h1 className="text-4xl font-bold text-black">ข้อมูลผู้ใช้</h1> */}
      </div>
      <Card className="mx-auto w-fit rounded-xl">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-center">User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center justify-center gap-12">
              <div className="border h-24 w-24 rounded-full overflow-hidden">
                <img
                  src={session.user?.image}
                  alt="user image"
                  className="bg-gray-300"
                />
              </div>
              <div className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-2">
                  <p className="font-bold">ชื่อ-นามสกุล :</p>
                  <p>
                    {session.user?.firstName || "loading"}{" "}
                    {session.user?.lastName || "loading"}
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-bold">รหัสนักศึกษา :</p>
                  <p>{session.user?.studentId || "loading"}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-bold">โทรศัพท์ :</p>
                  <p>{session.user?.phone || "loading"}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-bold">Email :</p>
                  <p>{session.user?.email || "loading"}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p className="font-bold">สถานะ :</p>
                  <p>
                    {session.user?.status === "No_Intern" ? (
                      <p> ยังไม่เลือกสถานประกอบการ</p>
                    ) : session.user?.status === "Interning" ? (
                      <p> กำลังดำเนินการเลือกสถานประกอบการ</p>
                    ) : session.user?.status === "InternSuccess" ? (
                      <p> เลือกสถานประกอบการแล้ว</p>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
}
