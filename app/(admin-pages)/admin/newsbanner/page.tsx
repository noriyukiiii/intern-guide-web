import axios from "axios";
import BannerPage from "./components/BannerPage";
import { ToastContainer } from "react-toastify";

interface Banner {
  id: string;
  title: string;
  image: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
  userID: string;
}

export const dynamic = "force-dynamic";

const Page = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5555";
    const res = await axios.get(`${apiUrl}/newsbanner`);
    const data_format = res.data;

    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <ToastContainer />

        <BannerPage banners={data_format} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching banners:", error);
    return <div>Error loading banners</div>;
  }
};

export default Page;
