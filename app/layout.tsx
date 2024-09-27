import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
import SmoothScrolling from "@/components/SmoothScrolling";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'S-mart | Your Online Shopping Destination',
  description:
    "Welcome to s-mart, your go-to online store for quality products at great prices. Shop electronics, fashion, home essentials, and more with secure payments and fast delivery.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={inter.className}>
        <ConditionalNavbar />
          <SmoothScrolling> {children} </SmoothScrolling>
        <Toaster />
        <Footer/>
        </body> 
      </SessionWrapper>

    </html>
  );
}
