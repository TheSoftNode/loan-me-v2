import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import { Providers } from "./providers/provider";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Loan App | Fast & Easy Financial Solutions",
  description: "Apply for personal and business loans with flexible terms and competitive rates. Get quick approvals and manage your loans all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[500px]`}
      >
        <Providers>
          <Navbar />
          <Toaster />

          <main className="mt-10">
            <Suspense fallback={<div className="flex justify-center items-center min-h-[50vh]">Loading...</div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </Providers>

      </body>
    </html>
  );
}
