import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../../globals.css";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SmoothScrolling from "@/components/SmoothScrolling";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Sidebar>
      <SessionWrapper>
        {/* <body className={inter.className}> */}
          <SmoothScrolling> {children} </SmoothScrolling>
        <Toaster />
        {/* </body>  */}
      </SessionWrapper>
    </Sidebar>
    </>
    // <html lang="en">
   
  );
}
