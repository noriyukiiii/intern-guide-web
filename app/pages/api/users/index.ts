// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'

// ประเภทข้อมูลที่เราจะใช้
interface User {
  user_id: string
  firstname: string
  lastname: string
}

let users: User[] = [
  { user_id: '1', firstname: 'John', lastname: 'Doe' },
  { user_id: '2', firstname: 'Jane', lastname: 'Smith' },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(200).json(users)
  } else if (req.method === 'POST') {
    const newUser: User = req.body
    users.push(newUser)
    res.status(201).json(newUser)
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
