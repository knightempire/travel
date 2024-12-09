"use client";
import React, { useState } from "react";
import Link from "next/link";
import Flag from "react-world-flags"; // Import the Flag component



const Login = () => {
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<{
    phone?: string;
  }>({});

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);

    if (value && !validatePhone(value)) {
      setErrors(prev => ({
        ...prev,
        phone: "Please enter a valid 10-digit Indian mobile number"
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        phone: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { phone?: string } = {};

    if (!phone) {
      validationErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      validationErrors.phone = "Invalid phone number format";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Submitting phone:", phone);
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Create your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                Get AI-driven travel recommendations and schedule your next adventure                </p>
                
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-6">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Phone Number
                    </label>
                    <div className="flex mt-2">
                      <span className="inline-flex items-center px-4 rounded-l-sm bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        <Flag code="IN" className="w-5 h-5 mr-2" /> +91
                      </span>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={10}
                        className={`block w-full rounded-r-sm px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm dark:bg-gray-800 dark:text-white 
                          ${errors.phone 
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-primary focus:border-primary dark:border-gray-700'
                          }`}
                        placeholder="Enter your 10-digit phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <button 
                      type="submit" 
                      className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-50"
                      disabled={!phone || !!errors.phone}
                    >
                      Continue
                    </button>
                  </div>
                </form>
                
                
                {/* <p className="text-center text-base font-medium text-body-color">
                  Already using Startup?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p> */}
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

export default Login;