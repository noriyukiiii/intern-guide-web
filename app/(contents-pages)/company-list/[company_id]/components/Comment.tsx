"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "@/hooks/use-session";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
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
  const [selectedYear, setSelectedYear] = useState<string>(""); // ปีที่เลือก
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // คอมเมนต์ที่กำลังแก้ไข
  const [editedComment, setEditedComment] = useState<string>(""); // ข้อความที่แก้ไข
  const userId = session?.user?.id;

  // ฟังก์ชันดึงคอมเมนต์จาก API
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/comment/getComments`,
        {
          params: { compId: companyId },
        }
      );
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    const trimmedComment = newComment.trim();
    if (trimmedComment === "") return;

    const commentData = {
      comment: trimmedComment, // Trim ก่อนส่งค่า
      userId,
      compId: companyId,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/comment/CreateComment`,
        commentData
      );

      if (res.data.success) {
        setNewComment("");
        fetchComments();
      } else {
        console.error("Error adding comment:", res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/comment/deleteComment`,
        { data: { commentId } }
      );

      if (res.data.success) {
        fetchComments();
        toast.success("ลบความคิดเห็นสำเร็จ");
      } else {
        console.error("Error deleting comment:", res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateComment = async () => {
    const trimmedComment = editedComment.trim();
    if (editedComment.trim() === "") return;

    const commentData = {
      commentId: editingCommentId,
      comment: trimmedComment,
    };

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_RES_API}/comment/updateComment`,
        commentData
      );

      if (res.data.success) {
        setEditingCommentId(null);
        setEditedComment("");
        fetchComments();
      } else {
        console.error("Error updating comment:", res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ดึงปีที่มีคอมเมนต์
  const commentYears = Array.from(
    new Set(
      comments.map((comment) => new Date(comment.createdAt).getFullYear())
    )
  ).sort((a, b) => b - a); // เรียงจากใหม่ -> เก่า

  // กรองคอมเมนต์ตามปีที่เลือก
  const filteredComments = selectedYear
    ? comments.filter(
        (comment) =>
          new Date(comment.createdAt).getFullYear().toString() === selectedYear
      )
    : comments;

  return (
    <div className="max-w-4xl w-full mx-auto p-8 bg-gray-100 rounded-xl border border-gray-300 font-Prompt">
      <div className="flex w-full justify-between items-center gap-2">
        <h1 className="text-[24px] font-bold">ความคิดเห็น
          ({filteredComments.length})
        </h1>
        {/* Dropdown เลือกปี */}
        <select
          className="border p-2 rounded-lg my-4"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">แสดงทุกปี</option>
          {commentYears.map((year) => {
            const thaiYear = year + 543; // แปลงปีเป็นปีไทย (พ.ศ.)
            return (
              <option key={year} value={year}>
                {thaiYear} {/* แสดงปีไทย */}
              </option>
            );
          })}
        </select>
      </div>

      {session?.user ? (
        <div className="flex flex-col gap-2 my-4">
          <textarea
            placeholder="แสดงความคิดเห็น..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter" && !e.shiftKey) handleAddComment();
            // }}
            className="flex-1 p-2 border rounded-lg resize-none"
            rows={4}
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            เพิ่มความคิดเห็น
          </button>
        </div>
      ) : (
        <h3 className="text-lg text-gray-500">Loading</h3>
      )}

      {/* ใช้ ScrollArea */}
      <ScrollArea className="h-fit max-h-[500px] overflow-auto">
        <div className="flex flex-col gap-4">
          {filteredComments.length === 0 ? (
            <p className="text-gray-500 bg-white text-center border w-full p-4 rounded-xl">
              ไม่มีความคิดเห็น
            </p>
          ) : (
            filteredComments.map((comment) => {
              const formattedDate = new Date(comment.createdAt);
              const date = formattedDate.toLocaleDateString("th-TH");
              return (
                <div
                  key={comment.id}
                  className="relative flex items-start gap-4 border p-4 rounded-xl bg-white"
                >
                  {/* รูปโปรไฟล์ */}
                  <div className="absolute top-3 left-3 h-10 w-10 rounded-full overflow-hidden border bg-gray-300 shadow-md">
                    <img
                      src={`https://ui-avatars.com/api/?name=${comment.user.firstName}+${comment.user.lastName}&background=random&color=fff&length=1&bold=true&font-size=0.40&font=Roboto&format=svg`}
                      alt="user image"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* คอนเทนต์ของ Comment */}
                  <div className="flex flex-col gap-1 w-full ml-12">
                    <div className="flex flex-row justify-between">
                      <h3 className="font-bold text-blue-600 text-md">
                        {comment.user.firstName} {comment.user.lastName}
                      </h3>
                      <div className="flex gap-2">
                        <h3 className="text-gray-500">{date}</h3>
                        {session?.user?.id === comment.user.id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button className="bg-gray-400 w-8 h-8 rounded-lg">
                                <Ellipsis />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuGroup>
                                <DropdownMenuLabel>
                                  จัดการความคิดเห็น
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingCommentId(comment.id);
                                    setEditedComment(comment.content);
                                  }}
                                >
                                  แก้ไขความคิดเห็น
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                  className="text-red-500"
                                >
                                  ลบความคิดเห็น
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                    {editingCommentId === comment.id ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          value={editedComment}
                          onChange={(e) => setEditedComment(e.target.value)}
                          className="p-2 border rounded-lg resize-none"
                          rows={4}
                        />
                        <Button
                          onClick={handleUpdateComment}
                          className="bg-blue-600 text-white"
                        >
                          บันทึกการแก้ไข
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm break-words whitespace-pre-wrap">
                        {comment.content}
                        {comment.createdAt !== comment.updatedAt && (
                          <span className="text-gray-500 text-xs ml-2">
                            (แก้ไข)
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Comment;
