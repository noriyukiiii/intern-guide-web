import API from "@/lib/axios";
const Page = async () => {
  const res = await API.get("/company/get_occpation");
  console.log(res.data);
  return (
    <div className="md:ml-[270px] w-full h-full bg-rose-100">
      this is dashboard 555
    </div>
  );
};

export default Page;
