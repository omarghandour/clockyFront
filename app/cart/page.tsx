import React from "react";
import Cart from "../components/Cart";
import Loading from "../components/Loading";

const page = () => {
  return (
    <div className="center bg-white mt-20 min-h-[100dvh]">
      <Cart />
      {/* <Loading /> */}
    </div>
  );
};

export default page;
