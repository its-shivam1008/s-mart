import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../../globals.css";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
import SidebarForAdmin from "@/components/SidebarForAdmin";
import SmoothScrolling from "@/components/SmoothScrolling";



export const metadata = {
  title: 's-mart | Admin Dashboard',
  description:
    "Admin dashboard for s-mart. Monitor site activity, manage users, oversee transactions, and ensure smooth operations. Keep s-mart running seamlessly with advanced controls.",
};


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <SidebarForAdmin>
      
      {children} 
        
    </SidebarForAdmin>
    </>
    // <html lang="en">
   
  );
}
