"use server";

import { createClient } from "@/utils/supabase/server"; // นำเข้า createClient

export async function register(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const lastname = formData.get("lastname");
  const firstname = formData.get("firstname");
  const telephone = formData.get("telephone");
  console.log('email:' + email, 'password:' + password, "name" + firstname, lastname, telephone);

  // สร้าง Supabase client
  const supabase = await createClient(); // ใช้ await กับ createClient() เพื่อรอให้ client ถูกสร้าง
  
  // ทำการ insert ข้อมูลผู้ใช้
  const { data, error } = await supabase
  .from("users")
  .insert([{
    role: 'member', // ตัวอย่างการใส่ข้อมูล role
    firstname,
    lastname,
    tel: telephone, // แก้จาก 'telephone' เป็น 'tel' ตามชื่อคอลัมน์ในฐานข้อมูล
    email,
    student_id: 12345, // ตัวอย่างการใส่ข้อมูล student_id
    password,
  }]);


  // ตรวจสอบผลลัพธ์
  if (error) {
    console.log('Found some error', error);
    return;
  }

  console.log("register successful!", data);
}
