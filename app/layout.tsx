import type { Metadata } from "next";
import React from "react";
import NavbarComponent from "@/components/navbar";
import FooterComponent from "@/components/footer";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";

export const metadata: Metadata = {
  title: "Buzz Nest",
  description:
    "Buzz Nest is the best place to find the latest news and trends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavbarComponent />
        <ThemeModeScript />
        {children}
      </body>
      <footer className="fixed bottom-0 w-full">
        <FooterComponent />
      </footer>
    </html>
  );
}
