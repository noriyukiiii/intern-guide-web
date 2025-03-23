"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateBannerForm from "./createbanner";
import { ToastContainer } from "react-toastify";
import TableComponent from "./table";

const BannerPage = ({ banners }: { banners: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2">
      <ToastContainer />
      <h1 className="text-2xl font-bold">แบนเนอร์</h1>
      <div className="flex justify-start w-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="">สร้างแบนเนอร์</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Banner</DialogTitle>
            </DialogHeader>

            {/* ✅ ปิด Dialog เมื่อสร้างสำเร็จ */}
            <CreateBannerForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full max-h-[800px] overflow-y-auto">
        <TableComponent data={banners} />
      </div>
    </div>
  );
};

export default BannerPage;
