"use client";

import LoginForm from "@/components/login & otp/LoginForm";
import { auth } from "../firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import OtpForm from "@/components/login & otp/OtpForm";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: any;
  }
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false); // Loading boolean... just created not in use currently
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  useEffect(() => {
    if (phoneNumber) {
      // Only call onLogin after phoneNumber has been updated
      onLogin(phoneNumber);
    }
  }, [phoneNumber]); // This useEffect triggers whenever phoneNumber changes

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          // Here, we don't need to call onLogin because it's already handled by useEffect
        },
        expiredCallback: () => {
          // Handle reCAPTCHA expiration
        },
      });
    }
  }

  function onLogin(phoneNumber: string) {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPhone = `+91${phoneNumber.trim()}`;
    console.log("Formatted Phone Number:", formatPhone);

    signInWithPhoneNumber(auth, formatPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP Sent Successfully!");
      })
      .catch((error) => {
        console.error("Error during phone number sign-in:", error);
        setLoading(false);
        toast.error("Error sending OTP. Please check the phone number and try again.");
      });
  }

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>

        <div className="container">
          {showOTP ? (
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <OtpForm />
              </div>
            </div>
          ) : (
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                  <LoginForm onLogin={setPhoneNumber} />
              </div>
            </div>
          )
          }
        </div>

        {/* Background SVG - same as original component */}
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content from the original component */}
          </svg>
        </div>
      </div>
    </section>
  );
}
