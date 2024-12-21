// app/api/users/sign-up/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, password, telephone, student_id }: 
      { firstname: string, lastname: string, email: string, password: string, telephone: string, student_id: string } = await req.json()

    // ตรวจสอบว่าอีเมลนี้ถูกใช้งานแล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: 'Email is already taken' }, { status: 400 })
    }

    // เข้ารหัสรหัสผ่านก่อนเก็บในฐานข้อมูล
    const hashedPassword = await bcrypt.hash(password, 10)

    // สร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        telephone,
        student_id
      }
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 })
  }
}
