"use client";
import { useState } from "react";
import StepIndicator from "./stepIndicator";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { BiCheck } from "react-icons/bi";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function NewConnectorPage(): React.JSX.Element {
  const supabase = createClient();
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [submitData, setSubmitData] = useState<any>({
    name: "Supernova",
    type: "qr_code",
    target: "https://",
  });

  const submitConnector = async () => {
    const { data, error } = await supabase.from("qr_codes").insert([
      {
        name: submitData.name,
        type: submitData.type,
        target: submitData.target,
      },
    ]);
    if (error) {
      console.error(error);
      toast("Something went wrong while creating the connector.", {type: "error"});
      return;
    } else {
      toast("New connector created with success", {type: "success"});
      router.push("/dash");
    }
  };
  return (
    <div className="flex max-w-7xl px-4 mx-auto flex-col items-center justify-center h-[calc(100dvh-61px)]">
      <StepIndicator total={3} step={step} />
      <div className="border-border flex flex-col md:flex-row text-text bg-accent p-4 bg-opacity-5 rounded-md mt-12 border w-full max-w-4xl">
        {step === 1 && (
          <div>
            <p className="text-5xl max-w-[500px]">
              Let&apos;s give your new connector a name
            </p>
            <div className="mt-12 flex flex-col">
              <span className="text-md font-semibold">Name</span>
              <input
                type="text"
                value={submitData.name}
                onChange={(e) =>
                  setSubmitData({ ...submitData, name: e.target.value })
                }
                className="max-w-[350px]"
                placeholder="Enter a name"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <p className="text-5xl max-w-[500px]">Select your connector type</p>
            <div className="mt-12 flex flex-col">
              <span className="text-md font-semibold">Type</span>
              <select
                value={submitData.type}
                onChange={(e) =>
                  setSubmitData({ ...submitData, type: e.target.value })
                }
                className="max-w-[350px] cursor-pointer"
              >
                <option value={"qr_code"}>QR Code</option>
                <option value={"link"}>Link</option>
              </select>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <p className="text-5xl max-w-[500px]">
              What&apos;s the final URL your{" "}
              <span className="underline">
                {submitData.type === "qr_code" ? "QR Code" : "link"}
              </span>{" "}
              should hit?
            </p>
            <div className="mt-12 flex flex-col">
              <span className="text-md font-semibold">URL</span>
              <input
                value={submitData.target}
                onChange={(e) =>
                  setSubmitData({ ...submitData, target: e.target.value })
                }
                type="text"
                className="max-w-[350px]"
                placeholder="Target URL"
              />
            </div>
          </div>
        )}
        <div className="flex mt-2 md:mt-0 justify-start md:justify-end items-end flex-1 gap-2">
          <div
            onClick={() => {
              if (!(step <= 1)) setStep(step - 1);
            }}
            className={`${
              step <= 1 ? " opacity-40" : "cursor-pointer hover:opacity-75"
            } w-[40px] h-[40px]  bg-border shadown  rounded-md flex justify-center items-center text-text`}
          >
            <MdNavigateBefore size={24} />
          </div>
          <div
            onClick={() => {
              if (!(step >= 3)) {
                setStep(step + 1);
              } else submitConnector();
            }}
            className="w-[40px] h-[40px] cursor-pointer hover:opacity-75 bg-accent shadown rounded-md flex justify-center items-center text-border"
          >
            {step >= 3 ? <BiCheck size={22} /> : <MdNavigateNext size={24} />}
          </div>
        </div>
      </div>
    </div>
  );
}
