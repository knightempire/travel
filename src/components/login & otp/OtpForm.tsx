"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export default function OtpForm() {
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
  );
}