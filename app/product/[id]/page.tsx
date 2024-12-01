import React from "react";
import ProductById from "@/app/components/ProductById";
import Nav from "@/app/components/Nav";
const Page = () => {
  return (
    <div className="min-h-screen w-full justify-evenly bg-white">
      {/* <Nav /> */}
      <ProductById />
    </div>
  );
};

export default Page;
