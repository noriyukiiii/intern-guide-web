"use server";

import ContentChart from "./components/content-chart";

const Page = async () => {

  return (
    <div className="flex w-full h-fit bg-gray-100 flex-col">
      <ContentChart />
    </div>
  );
};

export default Page;
