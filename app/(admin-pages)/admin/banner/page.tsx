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

export const dynamic = 'force-dynamic';

const Page = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555';
    const res = await axios.get(`${apiUrl}/banner`);
    const data_format = res.data;

    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <BannerPage banners={data_format} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching banners:', error);
    return <div>Error loading banners</div>;
  }
};

export default Page;
