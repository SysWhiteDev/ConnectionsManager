/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

import { BiSearch } from "react-icons/bi";
export default function DashboardHome(): React.JSX.Element {
  const supabase = createClient();
  const [qrCodes, setQrCodes] = useState<any>([]);
  const [qrUses, setQrUses] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQrCodes = async () => {
      const { data, error } = await supabase.from("qr_codes").select("*");
      if (error) {
        console.error(error);
        return;
      } else {
        setQrCodes(data);
      }
      const qrUsesReq = await supabase.from("qr_uses").select("qr_id");
      if (qrUsesReq.error) {
        console.error(error);
        return;
      } else {
        setQrUses(qrUsesReq.data);
      }
      setIsLoading(false);
    };
    fetchQrCodes();
  }, [supabase.auth]);

  // search bar
  const [searchFilter, setSearchFilter] = useState<string>("");

  return (
    <div className="p-4 max-w-7xl mx-auto px-6 text-text">
      <div className="mb-6 flex items-center gap-3 h-[45px]">
        <div className="flex items-center gap-1 input !py-0.5 !px-3">
          <BiSearch size={24} className="opacity-60" />
          <input
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search..."
            type="text"
            className="bg-transparent border-none"
          />
        </div>
        {/* <Link
          className="text-sm whitespace-nowrap flex items-center justify-center border-border border bg-accent hover:bg-opacity-80 text-border h-full px-3 rounded-md"
          href={"/"}
        >
          Add connector
        </Link> */}
      </div>

      <p className="font-semibold mb-2">QR Code Connectors</p>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2.5">
        {!isLoading
          ? qrCodes
              .filter(
                (qr: any) =>
                  qr.type === "qr_code" &&
                  qr.name.toLowerCase().includes(searchFilter.toLowerCase())
              )
              .map((data: any, index: number) => {
                return (
                  <Link
                    href={`/dash/${data.id}`}
                    key={index}
                    className="transition-opacity overflow-hidden cursor-pointer flex flex-col gap-6 p-3 rounded-md border-border bg-secondary hover:bg-opacity-10 bg-opacity-5 border"
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between items-start">
                      <div>
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm opacity-60">{data.target}</p>
                      </div>
                      <div className="flex mt-1 lg:mt-0 gap-1.5">
                        {data.password !== null && (
                          <span className="text-xs shadow whitespace-nowrap truncate bg-red-500 text-background px-2 py-1 font-bold rounded-full">
                            Password protected
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-accent opacity-95 text-sm flex justify-between gap-1.5">
                      <span className="font-semibold">
                        {qrUses.filter((r: any) => r.qr_id === data.id).length}{" "}
                        use
                        {qrUses.filter((r: any) => r.qr_id === data.id)
                          .length === 1
                          ? ""
                          : "s"}
                      </span>
                      <span className="opacity-40">
                        Created on{" "}
                        {new Date(data.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </Link>
                );
              })
          : Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden animate-pulse flex flex-col gap-6 p-3 rounded-md bg-secondary bg-opacity-10"
              >
                <div className="flex justify-between blur-[1000px] items-start">
                  <div>
                    <p className="font-semibold">Loading...</p>
                    <p className="text-sm opacity-60">Loading...</p>
                  </div>
                  <div className="flex gap-1.5"></div>
                </div>
                <div className="text-accent blur-[1000px] opacity-95 text-sm flex justify-between gap-1.5">
                  <span className="font-semibold">...</span>
                  <span className="opacity-40">...</span>
                </div>
              </div>
            ))}
      </div>
      {!isLoading &&
        qrCodes.filter(
          (qr: any) =>
            qr.type === "qr_code" &&
            qr.name.toLowerCase().includes(searchFilter.toLowerCase())
        ).length === 0 && (
          <div className="w-full flex flex-col bg-accent opacity-95 bg-opacity-5 justify-center items-center h-[150px] border-border border rounded-md">
            <h1 className="font-semibold">No QR Code connectors found.</h1>
          </div>
        )}
      <p className="font-semibold mb-2 mt-6">Link Connectors</p>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-2.5">
        {!isLoading
          ? qrCodes
              .filter(
                (qr: any) =>
                  qr.type === "link" &&
                  qr.name.toLowerCase().includes(searchFilter.toLowerCase())
              )
              .map((data: any, index: number) => {
                return (
                  <Link
                    href={`/dash/${data.id}`}
                    key={index}
                    className="transition-opacity overflow-hidden cursor-pointer flex flex-col gap-6 p-3 rounded-md border-border bg-secondary hover:bg-opacity-10 bg-opacity-5 border"
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between items-start">
                      <div>
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm opacity-60">{data.target}</p>
                      </div>
                      <div className="flex mt-1 lg:mt-0 gap-1.5">
                        {data.password !== null && (
                          <span className="text-xs shadow bg-red-500 text-background px-2 py-1 font-bold rounded-full">
                            Password protected
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-accent opacity-95 text-sm flex justify-between gap-1.5">
                      <span className="font-semibold">
                        {qrUses.filter((r: any) => r.qr_id === data.id).length}{" "}
                        use
                        {qrUses.filter((r: any) => r.qr_id === data.id)
                          .length === 1
                          ? ""
                          : "s"}
                      </span>
                      <span className="opacity-40 text-right">
                        Created on{" "}
                        {new Date(data.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </Link>
                );
              })
          : Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden animate-pulse flex flex-col gap-6 p-3 rounded-md bg-secondary bg-opacity-10"
              >
                <div className="flex justify-between blur-[1000px] items-start">
                  <div>
                    <p className="font-semibold">Loading...</p>
                    <p className="text-sm opacity-60">Loading...</p>
                  </div>
                  <div className="flex gap-1.5"></div>
                </div>
                <div className="text-accent blur-[1000px] opacity-95 text-sm flex justify-between gap-1.5">
                  <span className="font-semibold">...</span>
                  <span className="opacity-40">...</span>
                </div>
              </div>
            ))}
      </div>
      {!isLoading &&
        qrCodes.filter(
          (qr: any) =>
            qr.type === "link" &&
            qr.name.toLowerCase().includes(searchFilter.toLowerCase())
        ).length === 0 && (
          <div className="w-full flex flex-col bg-accent  opacity-95 bg-opacity-5 justify-center items-center h-[150px] border-border border rounded-md">
            <h1 className="font-semibold">No link connectors found.</h1>
          </div>
        )}
    </div>
  );
}
