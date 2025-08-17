import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";
import { UserProvider } from "./context/UserContext";


export const metadata: Metadata = {
  title: "LeetProgress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
