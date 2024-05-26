"use client";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRightCircle } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import NavbarAuthButtons from "./NavbarAuthButtons";
export default function Home() {
  return (
    <main className="text-white">
      <div className="bg-background bg-opacity-75  px-auto flex items-center justify-center">
        <div className="relative w-full  max-w-[1536px]">
          <div className="relative h-[calc(100dvh-162px)] 2xl:border-x-border 2xl:border-x flex justify-center items-center w-full gap-[35vw]">
            <div className="z-0 left-36 text-text before:top-50% ">
              <p
                className={`text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-extrabold`}
              >
                Make{" "}
                <span className="font-mono underline text-accent">Links</span>{" "}
                and QR Codes smart.
              </p>
              <div className="flex justify-center mx-auto max-w-[300px] gap-2 mt-10">
                <Link
                  href={"/auth"}
                  className="transiton-all bg-accent text-neutral-900 hover:bg-opacity-90 cursor-pointer w-3/4 rounded-md px-4 py-2.5 flex items-center justify-between gap-2"
                >
                  Get Started <LuArrowRightCircle size={20} />
                </Link>
                <Link
                  href={"https://github.com/SysWhiteDev"}
                  target="blank"
                  className="transiton-all bg-neutral-800 shadow text-secondary hover:bg-opacity-75 cursor-pointer  rounded-md px-4 py-2.5 flex items-center justify-between gap-2"
                >
                  <FaGithub size={20} />
                </Link>
              </div>
            </div>
            {/* <Image
              src={"/assets/showcase1.png"}
              alt="QR-Logo"
              className="hidden lg:block absolute w-[500px] z-0 right-[9.5%] top-50%"
              width={1182}
              height={1266}
            /> */}
          </div>
        </div>
      </div>
      <div className="z-50 border-t-border text-white bg-background bg-opacity-75 min-h-[79px] border-t">
        <div className="flex items-center justify-between px-6 mx-auto 2xl:border-x-border 2xl:border-x border-y-0 w-full h-[80px] border-0 max-w-[1536px]"></div>
      </div>
    </main>
  );
}
