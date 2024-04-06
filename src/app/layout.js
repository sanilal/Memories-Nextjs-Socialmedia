import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SessionWraper from "@/components/SessionWraper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Memories - Everlasting Joyful Moments",
  description: "Memories - Everlasting Joyful Moments - Capture Life: Cherish Moments",
};

export default function RootLayout({ children }) {
  return (
    <SessionWraper>
      <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}</body>
    </html>
    </SessionWraper>
  );
}
