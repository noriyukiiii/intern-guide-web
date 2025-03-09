"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "@/hooks/use-session";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
    email: string;
  };
};

const Comment = ({ companyId }: { companyId: string }) => {
  const { session } = useSession();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const userId = session?.user?.id;
  // ฟังก์ชันดึงคอมเมนต์จาก API
  const fetchComments = async () => {
    try {
      const res = await axios.get("https://api-sigma-azure-86.vercel.app/comment/getComments", {
        params: { compId: companyId }, // ส่ง ID บริษัทใน query string
      });
      setComments(res.data); // อัปเดตคอมเมนต์
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // ดึงคอมเมนต์เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    fetchComments();
  }, []);

  // ฟังก์ชันเพิ่มคอมเมนต์
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const commentData = {
      comment: newComment,
      userId: userId, // ตรวจสอบว่า userId มีค่าจริง
      compId: companyId, // ตรวจสอบว่า companyId มีค่าจริง
    };

    try {
      const res = await axios.post(
        "https://api-sigma-azure-86.vercel.app/comment/CreateComment",
        commentData
      );

      if (res.data.success) {
        setNewComment(""); // ล้างช่องพิมพ์
        fetchComments(); // โหลดคอมเมนต์ใหม่
      } else {
        console.error("Error adding comment:", res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteComment = async (compId: string) => {
    try {
      const res = await axios.delete(
        "https://api-sigma-azure-86.vercel.app/comment/deleteComment",
        {
          data: { commentId: compId },
        }
      );

      if (res.data.success) {
        fetchComments();
        toast.success("ลบความคิดเห็นสำเร็จ"),
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          };
      } else {
        console.error("Error deleting comment:", res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditComment = (commentId: string) => {
    // ฟังก์ชันสำหรับการแก้ไขคอมเมนต์
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-8 bg-gray-100 rounded-xl border border-gray-300 font-sarabun">
      <h1 className="text-[24px] font-bold">ความคิดเห็น</h1>
      {session?.user ? (
        <div className="flex flex-col gap-2 my-4">
          <textarea
            placeholder="แสดงความคิดเห็น..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                // กด Enter แล้วไม่กด Shift จะส่งความคิดเห็น
                handleAddComment();
              }
            }}
            className="flex-1 p-2 border rounded-lg resize-none"
            rows={4} // จำนวนบรรทัดที่แสดง
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-2"
          >
            เพิ่มความคิดเห็น
          </button>
        </div>
      ) : (
        <h3 className="text-lg text-gray-500">Loading</h3>
      )}

      {/* ใช้ ScrollArea */}
      <ScrollArea className="h-[500px] overflow-auto">
        <div className="flex flex-col gap-4">
          {comments.map((comment) => {
            const formattedDate = new Date(comment.createdAt);
            const date = formattedDate.toLocaleDateString("en-US"); // 3/9/2025
            const time = formattedDate.toLocaleTimeString("en-US"); // 12:39:13 AM

            return (
              <div
                key={comment.id}
                className="flex items-start gap-4 border p-2 rounded-xl bg-white"
              >
                <Image
                  src={comment.user.image || "/userimage/boy.png"} // ใช้ภาพจากฐานข้อมูลหรือรูปภาพเริ่มต้น
                  alt="user image"
                  width={40}
                  height={40}
                  className="border rounded-full"
                />
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex flex-row justify-between mr-2">
                    <h3 className="font-bold text-blue-600 text-md">
                      {comment.user.firstName} {comment.user.lastName}
                    </h3>
                    <div className="flex gap-2">
                      <h3 className="text-gray-500">
                        {date} {time}
                      </h3>
                      {session?.user?.id === comment.user.id && (
                        <Button className="bg-rose-400" onClick={() => handleDeleteComment(comment.id)}>
                          ลบ
                        </Button>
                      )}
                    </div>
                    {/* แสดงวันที่และเวลา */}
                  </div>
                  <p className="text-sm break-words whitespace-pre-wrap max-w-full w-full">
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Comment;
