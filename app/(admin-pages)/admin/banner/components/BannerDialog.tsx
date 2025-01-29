// components/BannerDialog.tsx
"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface BannerDialogProps {
  open: boolean;
  onClose: () => void;
  image: string;
  title: string;
}

const BannerDialog = ({ open, onClose, image, title }: BannerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* รูปภาพเป็น trigger ที่เปิด dialog */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {/* แสดงรูปภาพขนาดใหญ่ใน Dialog */}
        <img src={image} alt={title} className="max-w-full h-auto" />
      </DialogContent>
    </Dialog>
  );
};

export default BannerDialog;
