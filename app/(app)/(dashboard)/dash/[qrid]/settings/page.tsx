/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs-react";

export default function QRSettings(): React.JSX.Element {
  const qrId = useParams().qrid;
  const supabase = createClient();

  const [qrData, setQrData] = useState<any>();
  const [newQrData, setNewQrData] = useState<any>();
  const getQrData = async () => {
    const response: any = await supabase
      .from("qr_codes")
      .select("*")
      .eq("id", qrId)
      .single();
    setQrData(response.data);
    setNewQrData(response.data);
  };

  const postQrSettings = async () => {
    const { data, error } = await supabase
      .from("qr_codes")
      .update(newQrData)
      .eq("id", qrId);
    if (error) {
      console.error(error);
      toast("Something went wrong while updating the settings", {
        type: "error",
      });
      return;
    }
    getQrData();
    setIsChangingPassword(false);
    setNewPasswd("");
    toast("Settings were updated with success", { type: "success" });
  };

  // password change
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [newPasswd, setNewPasswd] = useState<string>("");

  useEffect(() => {
    if (isChangingPassword) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPasswd, salt);
      setNewQrData({ ...newQrData, password: hash });
    }
  }, [newPasswd]);

  useEffect(() => {
    getQrData();
  }, []);

  return (
    <div className="px-6 py-4 mt-4 text-text mx-auto max-w-7xl">
      <h1 className="text-5xl mb-6">Settings</h1>
      <div className="flex flex-col gap-4">
        {qrData !== newQrData && (
          <div className="rounded-lg overflow-hidden flex flex-col gap-4 shadow bg-accent bg-opacity-20 border border-border p-4">
            <span className="text-md font-semibold">
              Please save the new changes to apply them!
            </span>
          </div>
        )}

        <div className="rounded-lg overflow-hidden flex flex-col gap-4 shadow bg-accent bg-opacity-5 border border-border p-4">
          <span className="text-md font-semibold">Name</span>
          <input
            type="text"
            placeholder="Meticulous QR"
            value={newQrData?.name}
            onChange={(e) =>
              setNewQrData({ ...newQrData, name: e.target.value })
            }
          />
        </div>
        <div className="rounded-lg overflow-hidden flex flex-col gap-4 shadow bg-accent bg-opacity-5 border border-border p-4">
          <span className="text-md font-semibold">Target URL</span>
          <input
            type="text"
            placeholder="https://syswhite.dev/"
            value={newQrData?.target}
            onChange={(e) =>
              setNewQrData({ ...newQrData, target: e.target.value })
            }
          />
        </div>
        <div className="rounded-lg overflow-hidden flex flex-col  gap-4 shadow bg-accent bg-opacity-5 border border-border p-4">
          <span className="text-md font-semibold">Password access</span>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <span className="text-sm">
              Password access is{" "}
              <u>{qrData?.password !== null ? "enabled" : "disabled"}</u> on
              this {qrData?.type === "qr_code" ? "QR code" : "link"}
            </span>
            <div className="flex gap-2 mt-4 md:mt-0 items-center">
              {qrData?.password !== null ? (
                <>
                  {" "}
                  <button
                    onClick={() => {
                      setNewQrData({ ...qrData, password: null });
                    }}
                    className={`${
                      newQrData?.password != qrData?.password
                        ? "opacity-40 pointer-events-none"
                        : ""
                    } px-2.5 py-1 text-sm  border-border border bg-accent bg-opacity-10 hover:bg-opacity-15 rounded-md`}
                  >
                    {newQrData?.password !== qrData?.password
                      ? "Save to disable password access"
                      : "Disable password access"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className={`${
                      isChangingPassword ? "opacity-40 pointer-events-none" : ""
                    } px-2.5 py-1 text-sm bg-accent bg-opacity-100 hover:bg-opacity-75 text-border rounded-md`}
                  >
                    {isChangingPassword
                      ? "Save to change the password"
                      : "Enable password access"}
                  </button>
                </>
              )}
            </div>
          </div>
          {isChangingPassword && (
            <div className="mt-8">
              <span className="text-sm">New password</span>
              <input
                type="password"
                className="mt-1"
                placeholder="Please enter the new qr password"
                value={newPasswd}
                onChange={(e) => setNewPasswd(e.target.value)}
              />
            </div>
          )}
        </div>
        <div
          className={`tranition-all ${
            newQrData !== qrData
              ? "opacity-100 pointer-events-auto"
              : "opacity-40 pointer-events-none"
          }  ml-auto flex justify-end items-center gap-2`}
        >
          <button
            className="px-2.5 py-1 text-sm  border-border border bg-accent bg-opacity-10 hover:bg-opacity-15 rounded-md"
            onClick={() => {
              setIsChangingPassword(false);
              setNewPasswd("");
              getQrData();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => postQrSettings()}
            className="px-2.5 py-1 text-sm  bg-accent bg-opacity-100 hover:bg-opacity-75 text-border rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
