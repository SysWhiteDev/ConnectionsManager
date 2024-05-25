import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { LuQrCode } from "react-icons/lu";
import Link from "next/link";
import NavbarAuthButtons from "./NavbarAuthButtons";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConnectionsManager",
  description: "The new way to lead people around online ⛓️‍💥",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundImage: "url('/assets/noise-light.png')" }}
      >
        <nav className=" border-b-border text-white bg-background bg-opacity-75 sticky top-0 min-h-[79px] border-b">
          <div className="flex items-center justify-between px-2 lg:px-6 mx-auto 2xl:border-x-border 2xl:border-x border-y-0 w-full h-[80px] border-0 max-w-[1536px]">
            <div className="flex text-primary items-center gap-2.5">
              <LuQrCode className="rotate-12" size={32} />
              <p className="font-semibold leading-5 text-lg">Connections<br />Manager</p>
            </div>
            <NavbarAuthButtons />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
