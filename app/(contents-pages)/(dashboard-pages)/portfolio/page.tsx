"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "@/hooks/use-session";
import FavoriteContent from "./components/FavoriteContent";
import UserProfile from "./components/userprofile";
import SelectCompany from "./components/SelectCompany";
import "./style.css";
import { ToastContainer } from "react-toastify";
import RecommendContent from "./components/Recommend";
type Position = {
  companyId: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  updatedAt: string;
};
type CompanyIntern = {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string | null;
  otherDescription: string | null;
  location: string | null;
  province: string | null;
  contractName: string | null;
  contractTel: string | null;
  contractEmail: string | null;
  contractSocial: string | null;
  contractSocial_line: string | null;
  establishment: string | null;
  website: string | null;
  benefit: string | null;
  occupation: string | null;
  imgLink: string | null;
  isMou: boolean | null;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string;
  positions: Position[]; // Array of positions
};
type Company = {
  id: string;
  companyNameTh: string;
  companyNameEn: string;
  description: string | null;
  otherDescription: string | null;
  location: string | null;
  province: string | null;
  contractName: string | null;
  contractTel: string | null;
  contractEmail: string | null;
  contractSocial: string | null;
  contractSocial_line: string | null;
  establishment: string | null;
  website: string | null;
  benefit: string | null;
  occupation: string | null;
  imgLink: string | null;
  isMou: boolean | null;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  positions: Position[];
};

interface FavoriteContentProps {
  data: Company[];
}

const Page = () => {
  const { session } = useSession();
  const [favoriteComp, setFavoriteComp] = useState<Company[] | null>(null);
  const [selectedComp, setSelectedComp] = useState<CompanyIntern[] | null>(
    null
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session?.user?.id) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/getFavoriteCompany/${session.user.id}`
        );
        setFavoriteComp(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [session?.user?.id]);

  useEffect(() => {
    const fetchCompanyIntern = async () => {
      if (!session?.user?.id) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_RES_API}/company/getInternedCompany/${session.user.id}`
        );
        setSelectedComp(response.data);
      } catch (error) {
        console.error("Error fetching company intern:", error);
      }
    };

    fetchCompanyIntern();
  }, [session?.user?.id]);

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!session.user?.id) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="font-Prompt bg-gray-100 w-full h-full overflow-y-auto">
      <div className="flex flex-col m-4 md:mx-20 gap-4">
        <ToastContainer />
        <UserProfile data={{ session }} />
        {selectedComp ? (
          <SelectCompany data={selectedComp} userid={session.user.id} />
        ) : (
          <p>Loading company...</p>
        )}
        <FavoriteContent
          data={favoriteComp}
          userid={session.user?.id || ""}
          selectedComp={selectedComp || null}
        />
        <RecommendContent />
      </div>
    </div>
  );
};

export default Page;
