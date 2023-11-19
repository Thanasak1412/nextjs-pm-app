import "@/styles/global.css";
import { ReactNode } from "react";
import { Inter } from "@next/font/google";
// components
import GlassPane from "@/components/GlassPane";

type Props = {
  children: ReactNode;
};

const inter = Inter({
  variable: "--font-inter",
});

export default function AuthRootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="w-screen h-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
