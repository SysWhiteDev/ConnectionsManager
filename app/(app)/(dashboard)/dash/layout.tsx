"use client";
import Link from "next/link";
import React from "react";
import { LuQrCode } from "react-icons/lu";
import { usePathname } from "next/navigation";
type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): React.JSX.Element {
  const path = usePathname();
  const qrId = path.match(/\/[^\/]+\/(\d+)/)?.[1];
  return (
    <div className="flex flex-col">
      <div className="z-50 pb-4 h-auto overflow-hidden text-text bg-background sticky py-4 shadow border-b border-b-border top-0 right-0 left-0">
        <div className="flex px-6 items-center gap-3.5">
          <Link href={"/dash"}>
            <LuQrCode className="rotate-12 text-primary" size={28} />
          </Link>
          <span className="text-border text-md text-lg">{"/"}</span>
          <span className=" font-semibold">Dashboard</span>
        </div>
        <div>
          {!qrId ? (
            <div className="pt-6 px-6 overflow-x-auto flex gap-1.5">
              <Link
                href={"/dash"}
                className={`${
                  path == "/dash"
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                } transition-all px-3 py-1.5 text-sm rounded whitespace-nowrap`}
              >
                Your Connectors
              </Link>
              <Link
                href={"/dash/activity"}
                className={`${
                  path == "/dash/activity"
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                } transition-all px-3 py-1.5 text-sm rounded whitespace-nowrap`}
              >
                Activity
              </Link>
              <Link
                href={"/dash/domains"}
                className={`${
                  path == "/dash/domains"
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                } transition-all px-3 py-1.5 text-sm rounded whitespace-nowrap`}
              >
                Domains
              </Link>
            </div>
          ) : (
            <div className="pt-6 px-6 overflow-x-auto flex gap-1.5">
              <Link
                href={`/dash/${qrId}`}
                className={`${
                  path == `/dash/${qrId}`
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                } transition-all px-3 py-1.5 text-sm rounded whitespace-nowrap`}
              >
                Overview
              </Link>
              <Link
                href={`/dash/${qrId}/settings`}
                className={`${
                  path == `/dash/${qrId}/settings`
                    ? "bg-secondary bg-opacity-20"
                    : "hover:bg-secondary hover:bg-opacity-10"
                } transition-all px-3 py-1.5 text-sm rounded whitespace-nowrap`}
              >
                Settings
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-hidden">{children}</div>
    </div>
  );
}
