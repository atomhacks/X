import React from "react";
import NavBarDash from "../components/nav/NavBarDash";

export const metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-auto">
      {}
      <NavBarDash />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
