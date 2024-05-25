/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { MdScheduleSend } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { CgLockUnlock } from "react-icons/cg";
import Link from "next/link";
import "./style.css";
import Spinner from "@/components/Spinner";

type qrData = {
  target: string;
  id: number;
  passwdAuth: boolean;
  type: string;
};

export default function QrPage(): React.JSX.Element {
  const [qrData, setQrData] = useState<qrData | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwdLoading, setPasswdLoading] = useState<boolean>(false);
  const passwdInputContainer = useRef<HTMLDivElement | undefined | any>();

  const router = useRouter();
  const id = useSearchParams().get("id");

  const getQrInfo = async () => {
    const response = await (await fetch(`/api/qr?id=${id}`)).json();
    if (response?.target !== "") {
      setQrData(response);
    }
  };

  const tryQrPassword = async () => {
    setPasswdLoading(true);
    const response = await (
      await fetch(`/api/qr?id=${id}`, {
        method: "POST",
        body: JSON.stringify({
          password: password,
        }),
      })
    ).json();
    setPasswdLoading(false);
    if (response?.target) {
      setQrData(response);
    } else {
      passwdInputContainer.current?.classList.add("wrong-passwd");
      setTimeout(() => {
        passwdInputContainer.current?.classList.remove("wrong-passwd");
      }, 400);
    }
  };

  useEffect(() => {
    if (!id) {
      return router.push("/");
    }

    if (!qrData) {
      getQrInfo();
    }

    if (qrData?.target !== undefined) {
      router.push(qrData?.target as string);
    }
  }, [qrData]);

  return (
    <>
      <div className="flex items-center justify-center h-dvh text-text">
        {!qrData?.passwdAuth ? (
          <div
            className={`${
              qrData?.target ? "opacity-100" : "opacity-0"
            } transition-all bg-accent mx-4 rounded-lg p-8 bg-opacity-5 border-border border`}
          >
            <MdScheduleSend size={56} className="mx-auto mb-6" />
            <div className="text-center">
              <p className="font-bold">
                We are taking you to your destination...
              </p>
              <p className="opacity-75 text-sm">
                Please wait or{" "}
                {qrData?.target && (
                  <Link className="underline" href={qrData?.target as string}>
                    click here
                  </Link>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`transition-all bg-accent mx-4 rounded-lg p-6 bg-opacity-5 border-border border`}
          >
            <FaLock size={56} className="mx-auto mb-6" />
            <div className="text-center">
              <p className="font-bold">
                This {qrData?.type === "qr_code" ? "QR Code" : "link"} is
                protected by a password
              </p>
              <div
                ref={passwdInputContainer}
                className="mt-3 flex items-center justify-between gap-1.5 h-[41.56px]"
              >
                <input
                  className="h-full"
                  placeholder="Insert password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  onClick={() => tryQrPassword()}
                  className="transtion-all p-3 box-border bg-accent flex items-center justify-center cursor-pointer hover:bg-opacity-80 text-background rounded-md h-[41.56px] w-[45px]"
                >
                  {passwdLoading ? (
                    <Spinner size={18} className="fill-black" />
                  ) : (
                    <CgLockUnlock size={18} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <span className="fixed bottom-0 left-[50%] translate-x-[-50%] text-center text-sm mb-2">
          Powered by <Link className="underline opacity-75" href={"https://qr.syswhite.dev/"}>ConnectionsManager</Link>
        </span>
      </div>
    </>
  );
}
