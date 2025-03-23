"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "@/hooks/use-session";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { updateUserApi } from "@/actions/updateUser";
import axios from "axios";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  firstname: z
    .string()
    .min(2, { message: "ชื่อจริงต้องมีอย่างน้อย 2 ตัวอักษร." }),
  lastname: z
    .string()
    .min(2, { message: "นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร." }),
  phone: z
    .string()
    .min(10, { message: "เบอร์โทรศัพท์ต้องมีอย่างน้อย 10 ตัว" }),
  studentId: z
    .string()
    .min(13, { message: "รหัสนักศึกษาต้องมีอย่างน้อย 13 ตัว" })
    .max(14, { message: "รหัสนักศึกษามีได้มากสุด 14 ตัว" }),
  avatar: z.string(),
  occupation: z.string().optional(),
  benefit: z.string().optional(),
  province: z.string().optional(),
  position: z.string().optional(),
});

const occupationOptions = ["database", "Network"];
const benefitOptions = ["มีสวัสดิการ", "ไม่มีสวัสดิการ"];

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
  const [position, setPosition] = useState([]);
  const [province, setProvice] = useState([]);
  // โหลดข้อมูล Province และ Position จาก API
  console.log(session.user);
  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_RES_API}/user/edit-form-options`
        );
        console.log("Options:", res.data);
        setPosition(res.data.position);
        setProvice(res.data.province);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    }
    fetchOptions();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      studentId: "",
      avatar: "/userimage/chef.png",
      occupation: "",
      benefit: "",
      province: "",
      position: "",
    },
  });

  useEffect(() => {
    if (session?.user?.email) {
      form.reset({
        email: session.user.email,
        firstname: session.user.firstName,
        lastname: session.user.lastName,
        phone: session.user.phone,
        studentId: session.user.studentId,
        avatar: session.user.image || "/userimage/chef.png",
        occupation: session.user.occupation || "",
        benefit: session.user.benefit ? "มีสวัสดิการ" : "ไม่มีสวัสดิการ",
        province: session.user.province || "",
        position: session.user.position || "",
      });
    }
  }, [session, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
      const result = await updateUserApi(data);
      if (result.success) {
        toast.success("อัพเดทโปรไฟล์สำเร็จ!");
        setTimeout(() => {
          router.push("/");
          setTimeout(() => {
            window.location.reload();
          }, 500); // รอให้ push ทำงานก่อน
        }, 2000);
      } else {
        toast.error(result.message || "Failed to update user.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the user.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFAE6] overflow-hidden font-Prompt">
      <ToastContainer />
      <div className="m-0 p-10 flex items-center justify-center">
        <h1 className="text-4xl font-bold">แก้ไขโปรไฟล์</h1>
      </div>
      <div className="grid grid-cols-1  bg-[#FFFAE6] h-full p-4 bg-opacity-50 items-center w-full mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-2xl p-6 mx-auto space-y-6 bg-white rounded-xl shadow-md"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-5 items-center">
                    <FormLabel className="col-span-2">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3 bg-gray-200 w-full"
                        disabled
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-5 text-red-600 mt-2" />{" "}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-5 items-center ">
                  <FormLabel className="col-span-2">
                  ชื่อจริง</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3 w-full focus:bg-gray-100"
                        placeholder="Firstname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-5 text-red-600 mt-2" />{" "}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-5 items-center">
                    <FormLabel className="col-span-2">นามสกุล</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3 w-full focus:bg-gray-100"
                        placeholder="Lastname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-5 text-red-600 mt-2" />{" "}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-5 items-center">
                    <FormLabel className="col-span-2">โทรศัพท์</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3 w-full focus:bg-gray-100"
                        placeholder="Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-5 text-red-600 mt-2" />{" "}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-5 items-center">
                    <FormLabel className="col-span-2 ">
                      รหัสนักศึกษา
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3 w-full focus:ring-2 focus:ring-green-500 p-3 rounded-lg"
                        placeholder="Student ID"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-5 text-red-600 mt-2" />{" "}
                    {/* แสดงข้อความ error ในตำแหน่งที่เหมาะสม */}
                  </div>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สายการเรียน</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""} // ใช้ค่า field.value ที่รีเซ็ตจาก session
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกสายการเรียน" />
                      </SelectTrigger>
                      <SelectContent>
                        {occupationOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="benefit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>สวัสดิการ</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""} // ใช้ค่า field.value ที่รีเซ็ตจาก session
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกสวัสดิการ" />
                      </SelectTrigger>
                      <SelectContent>
                        {benefitOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>จังหวัด</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""} // ใช้ค่า field.value ที่รีเซ็ตจาก session
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกจังหวัด" />
                      </SelectTrigger>
                      <SelectContent>
                        {province.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ตำแหน่ง</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""} // ใช้ค่า field.value ที่รีเซ็ตจาก session
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกตำแหน่ง" />
                      </SelectTrigger>
                      <SelectContent>
                        {position.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-green-700 px-6 py-2 rounded-lg text-white"
              >
                บันทึก
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
