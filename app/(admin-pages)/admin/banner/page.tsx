"use server";
import axios from "axios";
import TableComponent from "./components/table";

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
  console.log(data_format);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold">Banner</h1>
      </div>
      <div className="w-full max-h-[800px] overflow-y-auto">
        <TableComponent data={data_format} />
      </div>
    </div>
  );
};

export default Page;
