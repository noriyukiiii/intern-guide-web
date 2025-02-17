"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, X } from "lucide-react";
const PdpaConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("pdpa_consent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("pdpa_consent", "accepted");
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
        <DialogContent className="bg-white shadow-xl rounded-2xl max-w-lg p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <DialogHeader className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-blue-500" />
                <DialogTitle className="text-lg font-semibold">
                  นโยบายความเป็นส่วนตัว & คุกกี้
                </DialogTitle>
              </div>
    
            </DialogHeader>
            <p className="text-gray-600 text-sm leading-relaxed">
              เราใช้คุกกี้เพื่อมอบประสบการณ์ที่ดีที่สุด โปรดอ่าน{" "}
              <a href="/privacy-policy" className="text-blue-500 underline">
                นโยบายความเป็นส่วนตัว
              </a>{" "}
              ของเรา
            </p>
            <div className="flex justify-end space-x-3 mt-5">
              <Button
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 flex items-center"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                ยอมรับ
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* ปุ่มทดสอบเปิด PDPA */}
      {/* <Button onClick={() => setOpen(true)}>test pdpa</Button> */}
    </>
  );
};

export default PdpaConsent;
