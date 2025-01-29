"use server";
import axios from "axios";
import BannerPage from "./components/BannerPage";

interface Banner {
  id: string;
  title: string;
  image: string;
  order: number;
  isActive: boolean;
  userID: string;
}

// ใช้ async function ในการดึงข้อมูลแบบ server-side
const Page = async () => {
  const res = await axios.get("http://localhost:5555/banner");
  const data_format = await res.data;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <BannerPage banners={data_format} />
    </div>
  );
};

export default Page;
