import type { Metadata } from "next";

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
      <head>
        <ThemeModeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
