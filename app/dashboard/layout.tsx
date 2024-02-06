import React from "react";
import SignOut from "./components/SignOut";

export const metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-auto bg-ocean-300">
      {/* <SideBar /> */}

      <div className="sticky top-0 z-50 flex min-w-full items-center justify-end gap-x-4 p-4">
        <SignOut />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
