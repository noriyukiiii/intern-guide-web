const Page = () => {
  const verificationUrl = "https://example.com/verify"; // Replace with actual verification URL

  return (
    <div className="font-sans max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-gray-100">
      <h2 className="text-center text-green-600 text-2xl font-bold">Verify Your Email</h2>
      <p className="text-lg text-gray-700 mt-4">Hello,</p>
      <p className="text-lg text-gray-700 mt-2">
        Thank you for registering with our service. Please click the button
        below to verify your email address and complete your registration.
      </p>
      <div className="text-center my-6">
        <a
          href={verificationUrl}
          className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg"
        >
          Verify Email
        </a>
      </div>
      <p className="text-lg text-gray-700 mt-2">
        If you did not create an account, no further action is required.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        Best regards,
        <br />
        The MyApp Team
      </p>
    </div>
  );
};

export default Page;
