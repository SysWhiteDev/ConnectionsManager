"use client";
import React from "react";
import { LuQrCode } from "react-icons/lu";
import { LuArrowRight } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { createClient } from "@/utils/supabase/client";

export default function AuthPage(): React.JSX.Element {
  const supabase = createClient();
  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin.toString()}/auth/callback`,
      },
    });
  }

  return (
    <div
      style={{ backgroundImage: "url('/assets/noise-light.png')" }}
      className="text-white h-dvh"
    >
      <div className="blur-[120px] absolute z-[-1] top-0 bottom-0 right-0 left-0">
        <div className="bg-primary h-60 w-1/4 absolute right-0 bottom-0" />
      </div>
      <div className="bg-background bg-opacity-75 h-full flex items-center justify-center">
        <div className="flex w-full h-full items-center">
          <div className="flex-[1.1] h-full bg-background shadow-xl shadow-neutral-800 flex justify-center items-center flex-col">
            <div className="mx-4 flex items-center flex-col">
              <LuQrCode
                className="mb-6 rotate-12 opacity-80 text-accent"
                size={64}
              />
              <p className="text-3xl font-bold text-primary">Welcome back!</p>
              <p className="text-md mt-1 text-secondary">Please authenticate</p>
              {/* <div className="w-full mt-12 text-secondary">
                <p className="text-sm font-semibold mb-1">Email</p>
                <input type="text" placeholder="help@syswhite.dev" />
              </div>
              <div className="w-full mt-4 text-secondary">
                <p className="text-sm font-semibold mb-1">Password</p>
                <input type="password" placeholder="********" />
              </div>
              <div className="my-6 flex w-full justify-between items-center">
                <label className="text-sm flex cursor-pointer text-text  justify-center items-center gap-1.5 text-textfont-semibold whitespace-nowrap">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="accent-primary cursor-pointer"
                    value="value"
                  />
                  Remember me
                </label>

                <Link
                  className="text-sm font-bold text-text hover:opacity-85 underline"
                  href={"?action=recovery"}
                >
                  Forgot Password
                </Link>
              </div>
              <button className="group transiton-all text-sm font-semibold bg-accent text-neutral-900 hover:bg-opacity-90 cursor-pointer w-full rounded-md px-4 py-2.5 flex items-center justify-center gap-2">
                Log in
                <LuArrowRight
                  size={14}
                  className="w-0 transition-all group-hover:w-[14px]"
                />
              </button>
            </div>
            <p className="mt-6 text-sm text-text">
              Not a member yet? <Link href={"#"} className="hover:opacity-85 font-semibold underline">Register now</Link>
            </p> */}
              <div className="w-full mt-12 min-w-[325px] text-secondary">
                <button
                  onClick={() => signInWithGithub()}
                  className="group flex items-center justify-between transiton-all text-sm shadow font-semibold bg-neutral-800 text-white hover:bg-opacity-70 cursor-pointer w-full rounded-md px-3  py-3 gap-2"
                >
                  <FaGithub size={20} />
                  <span className="flex items-center">
                    Authenticate with GitHub
                    <LuArrowRight
                      size={14}
                      className="w-0 group-hover:ml-1.5 transition-all group-hover:w-[14px]"
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1"></div>
        </div>
      </div>
    </div>
  );
}
