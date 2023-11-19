import "@/styles/global.css";

import clsx from "clsx";
import { ReactNode } from "react";

// components
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";
import { Inter } from "@next/font/google";

const inter = Inter({
  variable: "--font-inter",
});

const DashboardRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={clsx(inter.variable, "dark")}>
      <head />
      <body className="w-screen h-screen candy-mesh p-6">
        <div className="w-full h-full flex items-center">
          <GlassPane className="w-full h-full flex justify-between items-center mx-auto p-6">
            <Sidebar />
            <main className="w-full h-full basis-full">{children}</main>
          </GlassPane>
        </div>
      </body>
    </html>
  );
};

export default DashboardRootLayout;
