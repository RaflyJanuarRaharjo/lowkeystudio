import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lowkey Studio",
  description:
    "From brands to digital products, we turn ideas into experiences that connect and inspire",
};

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400;500&family=Geist+Mono:wght@500&family=Hanken+Grotesk:wght@500&family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS_URL} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
