/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { toast } from "react-toastify";

import { RxClipboardCopy } from "react-icons/rx";
import { LuQrCode } from "react-icons/lu";

export default function QRanalyticsHome() {
  const supabase = createClient();
  const qrId = useParams().qrid;
  const [loading, setLoading] = useState<boolean>(true);
  const [qrData, setQrData] = useState<any>();
  const [qrCodeImage, setQrCodeImage] = useState<any>();

  const getQrData = async () => {
    const response: any = await supabase
      .from("qr_codes")
      .select("*")
      .eq("id", qrId)
      .single();

    if (response.data.type === "qr_code") {
      QRCode.toDataURL(
        `${window.location.origin.toString()}/qr?id=${qrId}`,
        { width: 1000 },
        function (err, url) {
          setQrCodeImage(url);
        }
      );
    }
    setQrData(response.data);
    setLoading(false);
  };

  const copyActualUrl = () => {
    navigator.clipboard.writeText(
      `${window.location.origin.toString()}/qr?id=${qrId}`
    );
    toast("URL copied to clipboard", {
      type: "success",
    });
  };

  useEffect(() => {
    getQrData();
  }, []);
  return (
    <>
      {!loading ? (
        <div className="transition-all px-6 opacity-100 py-4 text-text">
          <div className="max-w-7xl mt-4 mx-auto flex lg:flex-row flex-col justify-between gap-6 md:gap-12">
            <div>
              <p className="text-5xl truncate mb-4">{qrData?.name}</p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 w-full">
                {qrData?.type === "qr_code" ? (
                  <span className="text-xs shadow flex justify-center items-center whitespace-nowrap bg-accent text-background px-2 py-1 font-bold rounded-full">
                    QR Code
                  </span>
                ) : (
                  <span className="text-xs shadow flex justify-center items-center whitespace-nowrap bg-accent text-background px-2 py-1 font-bold rounded-full">
                    Link
                  </span>
                )}
                {qrData?.password !== null && (
                  <span className="text-xs shadow flex justify-center items-center whitespace-nowrap bg-red-500 text-background px-2 py-1 font-bold rounded-full">
                    Password protected
                  </span>
                )}
              </div>
            </div>
            <div className="rounded-lg overflow-hidden flex flex-col md:flex-row lg:flex-col gap-4 shadow bg-accent bg-opacity-5 border border-border p-4">
              {qrData?.type === "qr_code" ? (
                <Image
                  width={1000}
                  height={1000}
                  alt="QR Code"
                  src={qrCodeImage}
                  className="w-[400px] rounded-md"
                />
              ) : (
                <div className="w-full  md:min-w-[400px]">
                  <span className="font-semibold mb-2">URL</span>
                  <div className="w-full flex justify-between shadow items-center gap-4 truncate p-2 bg-accent bg-opacity-5 rounded-md border border-border">
                    <span className="overflow-x-auto">{`${window.location.origin.toString()}/qr?id=${qrId}`}</span>
                    <RxClipboardCopy
                      onClick={copyActualUrl}
                      className="opacity-70 flex-shrink-0 cursor-pointer hover:opacity-100 right-0 top-0 bottom-0"
                      size={20}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="transition-all px-6 flex justify-center items-center opacity-100 h-[calc(100dvh-117px)] py-4 text-text">
          <LuQrCode className="rotate-12 animate-pulse" size={84} />
        </div>
      )}
    </>
  );
}
