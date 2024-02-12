import React from "react";
import SignOut from "./components/SignOut";
import DashNav from "./components/DashNav";

export const metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-auto bg-ocean-300">
      {/* <SideBar /> */}

      <DashNav />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
