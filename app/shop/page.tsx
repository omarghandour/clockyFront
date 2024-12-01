import React from "react";
import Products from "../components/Products";
import Nav from "../components/Nav";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Footer from "../components/Footer";

const page = () => {
  return (
    <div className="bg-main min-h-[100dvh] center flex flex-col">
      {/* <Nav /> */}
      {/* <SidebarProvider> */}
      {/* <AppSidebar /> */}
      {/* <SidebarTrigger className="z-50" /> */}
      <Products />
      {/* </SidebarProvider> */}
    </div>
  );
};

export default page;
