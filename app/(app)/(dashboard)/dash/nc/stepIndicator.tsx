"use client";
import React from "react";

type StepIndicatorProps = {
  step: number;
  total: number;
};

export default function StepIndicator({
  step,
  total,
}: StepIndicatorProps): React.JSX.Element {
  return (
    <>
      <div className="relative px-4 sm:px-0 text-border flex justify-around max-w-4xl w-full">
        <div className="-z-10 h-[15px] overflow-hidden w-[100%] absolute bg-border left-0 top-1/2 translate-y-[-50%] rounded-full">
          <div
            style={{
              width: `${(step / total) * 100}%`,
              transition: "all 0.1s linear",
            }}
            className="-z-10 h-[15px] w-[60%] absolute bg-accent left-0 top-1/2 translate-y-[-50%] rounded-full"
          />
        </div>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i + 1}
            className={`transition-all font-mono ${
              step > i ? "bg-accent" : "bg-border text-text"
            } w-[40px] text-xl h-[40px] flex justify-center items-center rounded-full `}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </>
  );
}
