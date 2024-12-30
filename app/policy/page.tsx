import React from "react";
import Nav from "../components/Nav";
import PrivacyPolicy from "./PrivacyPolicy";

const page = () => {
  return (
    <div className="paddingX bg-white mx-auto min-h-dvh mt-20 md:mt-15 md:p-8 flex flex-col items-center text-pretty">
      {/* <Nav /> */}
      <PrivacyPolicy />
    </div>
  );
};

export default page;
