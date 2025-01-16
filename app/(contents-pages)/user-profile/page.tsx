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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { updateUserApi } from "@/actions/updateUser";

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

  const handleAvatarSelect = (avatar: string) => {
    form.setValue("avatar", avatar);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const result = await updateUserApi(data);
      if (result.success) {
        toast.success("User updated successfully!");
        setTimeout(() => {
          router.push("/");
        }, 2000); // หน่วงเวลา 2 วินาที
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
      <div className="m-10 p-10 flex items-center justify-center">
        <h1 className="text-4xl font-bold">User Profile</h1>
      </div>
      <div className="grid grid-cols-2 bg-[#FFFAE6] h-full p-4 bg-opacity-50 items-center w-full">
        <div className="flex flex-col items-center">
          <ToastContainer />
          <div className="flex justify-center gap-4 bg-white p-20 rounded-3xl ">
            <Image
              src="/userimage/boy.png"
              alt={`Avatar`}
              width={64}
              height={64}
              className="object-cover"
            />
            {/* {avatarOptions.map((avatar, index) => (
              <div
                key={index}
                className={`h-16 w-16 rounded-full border-2 ${
                  form.watch("avatar") === avatar
                    ? "border-blue-500"
                    : "border-gray-300"
                } cursor-pointer overflow-hidden`}
                onClick={() => handleAvatarSelect(avatar)}
              >
                <Image
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            ))} */}
          </div>
          <p className="mt-2 text-sm text-gray-600">รูป Avatar</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6 bg-white h-fit p-8 rounded-3xl"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-6 text-xl">
                      Email : {session.user?.email}
                    </FormLabel>
                    {/* <FormControl>
                      <Input
                        className="col-span-5 bg-gray-200"
                        disabled
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage /> */}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-6 text-xl">
                      ชื่อ : {session.user?.firstName} {session.user?.lastName}
                    </FormLabel>
                    {/* <FormControl>
                      <Input
                        className="col-span-5 focus:bg-gray-100"
                        placeholder="Firstname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage /> */}
                  </div>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-1">Lastname</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-5 focus:bg-gray-100"
                        placeholder="Lastname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-6 text-xl">
                      Phone : {session.user?.phone}
                    </FormLabel>
                    {/* <FormControl>
                      <Input
                        className="col-span-5 focus:bg-gray-100"
                        placeholder="Phone"
                        {...field}
                      />
                    </FormControl> */}
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
                  <div className="grid grid-cols-6 items-center justify-center">
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
                  <div className="grid grid-cols-6 items-center justify-center">
                    <FormLabel className="col-span-6 text-xl">
                      สถานะ : ยังไม่ออกสหกิจ
                    </FormLabel>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {/* <Button type="submit" className="bg-green-700">
                Submit
              </Button> */}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
