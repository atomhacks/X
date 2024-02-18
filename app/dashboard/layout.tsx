import React from "react";
import NavBarDash from "../components/NavBarDash";

export const metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-auto bg-ocean-300">
      {}
      <NavBarDash />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
