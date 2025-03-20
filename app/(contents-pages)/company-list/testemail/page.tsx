const Page = () => {
  const verificationUrl = "https://example.com/verify"; // Replace with actual verification URL

  return (
    <div className="font-sans max-w-xl flex flex-col gap-2 mx-auto p-8 border border-gray-300 rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-lg">
      <h2 className="text-center text-orange-600 text-3xl font-extrabold">
        👋 Hello,
      </h2>
      <p className="text-lg text-gray-700 mt-4 leading-relaxed text-center">
        Thank you for registering! If you submitted this request, please click
        the button below to complete the verification process.
      </p>
      <div className="text-center my-6">
        <a
          href={verificationUrl}
          className="bg-orange-600 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 hover:bg-orange-700 hover:shadow-lg"
        >
          ✅ Verify Email
        </a>
      </div>
      <p className="text-lg text-gray-700 mt-6 text-center">
        Sincerely,
        <br />
        <span className="font-semibold text-gray-900">
          Information Technology, RMUTT
        </span>
      </p>
    </div>
  );
};

export default Page;
