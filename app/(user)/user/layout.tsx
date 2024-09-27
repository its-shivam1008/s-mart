import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../../globals.css";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
import SmoothScrolling from "@/components/SmoothScrolling";
import SidebarForUser from "@/components/SidebarForUser";



export const metadata = {
  title: 's-mart | My Account',
  description:
    "Access your s-mart account. View your orders, update your profile, and manage your wishlist. Enjoy personalized shopping at s-mart, where convenience meets quality.",
};


export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <SidebarForUser>
      
      {children} 
        
    </SidebarForUser>
    </>
    // <html lang="en">
   
  );
}
