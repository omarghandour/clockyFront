import React from "react";
import { CheckCircle } from "lucide-react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
        <CheckCircle className="text-main w-16 h-16 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 mt-2">
          Clocky has received your request and is preparing it for shipment.
        </p>
        <p className="text-gray-600 mt-1">
          We appreciate your trust and thank you for being part of our journey!
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-main text-white font-medium py-2 px-4 rounded-lg hover:bg-two hover:text-main transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default page;
