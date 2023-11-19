import "@/styles/global.css";
import clsx from "clsx";
import { ReactNode } from "react";
import { Inter } from "@next/font/google";
// components
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
});

const DashboardRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={clsx(inter.variable, "dark")}>
      <head />
      <body className="w-screen h-screen candy-mesh p-6">
        <div className="h-full flex justify-between items-center gap-5">
          <Sidebar />
          <GlassPane className="h-full flex justify-center items-center flex-1 mx-auto p-6">
            <main className="w-full h-full pl-6">{children}</main>
          </GlassPane>
        </div>
      </body>
    </html>
  );
};

export default DashboardRootLayout;
