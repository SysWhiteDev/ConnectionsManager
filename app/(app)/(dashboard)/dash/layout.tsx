/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { LuQrCode } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

import { BiLogOut } from "react-icons/bi";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): React.JSX.Element {
  const supabase = createClient();
  const path = usePathname();
  const qrId = path.match(/\/[^\/]+\/(\d+)/)?.[1];
  const [userData, setUserData] = React.useState<any>(null);

  const [userPopup, setUserPopup] = React.useState<any>(null);
  const logOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = (await supabase.auth.getUser()).data;
      setUserData(res);
    };
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="z-50 pb-4 h-auto overflow-hidden text-text bg-background sticky py-4 shadow border-b border-b-border top-0 right-0 left-0">
        <div className="flex px-6 items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5">
            <Link href={"/dash"}>
              <LuQrCode className="rotate-12 text-primary" size={28} />
            </Link>
            <span className="text-border text-md text-lg">{"/"}</span>
            <span className=" font-semibold">Dashboard</span>
          </div>
          <div>
            <div>
              <Image
                onClick={() => setUserPopup(true)}
                className="rounded-full cursor-pointer hover:opacity-80 z-50 overflow-hidden border-border border"
                height={28}
                width={28}
                src={
                  userData?.user
                    ? userData?.user?.user_metadata?.avatar_url
                    : "/"
                }
                alt="Profile Picture"
              />
              {userPopup && (
                <>
                  <div
                    onClick={() => setUserPopup(false)}
                    className="fixed top-0 bottom-0 z-30 right-0 left-0"
                  />
                  <div className="fixed flex items-center z-30 flex-col shadow-black shadow left-4 md:left-auto right-4 top-[calc(16px+28px+12px)] bg-border border-border border rounded-md p-4">
                    <span className="text-xs px-12 text-center mx-auto">
                      {userData?.user?.user_metadata?.email}
                    </span>
                    <div
                      onClick={() => logOut()}
                      className="text-sm w-full hover:opacity-80 cursor-pointer flex items-center justify-between rounded-md px-4 py-2.5 mt-4 bg-black bg-opacity-20"
                    >
                      Sign out
                      <div className="w-[30px] h-[30px] bg-black bg-opacity-40 flex justify-center items-center rounded-full">
                        <BiLogOut
                          className="inline-block -translate-x-[2px]"
                          size={18}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          {path !== "/dash/nc" &&
            (!qrId ? (
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
                  href={"https://github.com/syswhitedev/ConnectionsManager"}
                  target="blank"
                  className={`${
                    path == "/dash/activity"
                      ? "bg-secondary bg-opacity-20"
                      : "hover:bg-secondary hover:bg-opacity-10"
                  } transition-all px-3 py-1.5 text-sm rounded whitespace-nowrap`}
                >
                  Please star us on GitHub!
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
            ))}
        </div>
      </div>
      <div className="overflow-x-hidden">{children}</div>
    </div>
  );
}
