"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ExporeIQ",
  description: "Explore Beyond Boundaries",
};

const Otp = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState<string>("");
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value)) || value.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      // Move focus to the next input
      inputRefs.current[index + 1]?.focus();
    }

    // Validate OTP when all inputs are filled
    if (updatedOtp.join("").length === 6 && updatedOtp.every((digit) => digit !== "")) {
      setOtpError("");
    } else {
      setOtpError("Please enter a valid 6-digit OTP");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 6 || isNaN(Number(otpValue))) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    console.log("Submitting OTP:", otpValue);
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px] h-[100vh]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Verify Your Phone
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Enter the code sent to your phone.
                </p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-6 flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el!)}
                        maxLength={1}
                        className={`w-12 h-12 text-center text-lg font-bold border rounded-md focus:outline-none focus:ring-2 ${
                          otpError
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-primary"
                        }`}
                      />
                    ))}
                  </div>
                  {otpError && (
                    <p className="mb-4 text-sm text-red-600 dark:text-red-500">
                      {otpError}
                    </p>
                  )}
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-50"
                      disabled={otp.join("").length !== 6 || !!otpError}
                    >
                      Verify
                    </button>
                  </div>
                </form>
                <p className="mb-6 text-center text-base font-medium text-body-color">
                    Didn&apos;t receive the code?{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Resend
                    </Link>
                  </p>



                
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Otp;
