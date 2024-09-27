import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../../globals.css";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SmoothScrolling from "@/components/SmoothScrolling";



export const metadata:Metadata = {
  title: 's-mart | Store Management',
  description:
    "Manage your store on s-mart with ease. Track sales, upload products, and grow your business. Join the s-mart seller community and reach a wider audience today!",
};


export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Sidebar>
      
      {children} 
        
    </Sidebar>
    </>
    // <html lang="en">
   
  );
}
