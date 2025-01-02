import React from "react";
import FavoritesPage from "../components/FavoritesPage";
import Nav from "../components/Nav";

const page = () => {
  return (
    <div className="min-h-[100dvh] bg-white mt-20 w-full center">
      {/* <Nav /> */}
      <FavoritesPage />
    </div>
  );
};

export default page;
