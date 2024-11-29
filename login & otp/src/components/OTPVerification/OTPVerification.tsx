import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OTPInput } from '../OTPInput/OTPInput';
import { IoArrowBack } from 'react-icons/io5';

interface OTPVerificationProps {
  phoneNumber: string;
  onComplete: () => void;
  onBack: () => void;
}

export const OTPVerification = ({ phoneNumber, onComplete, onBack }: OTPVerificationProps) => {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOTPComplete = (otp: string) => {
    if (otp === '123456') {
      setVerificationStatus('success');
      onComplete();
    } else {
      setVerificationStatus('error');
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    setVerificationStatus('idle');
  };

  const formatPhoneNumber = (phone: string) => {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <IoArrowBack />
        <span>Back</span>
      </button>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Phone</h2>
        <p className="text-gray-500">
          Enter the code sent to{' '}
          <span className="font-medium text-gray-900">
            {formatPhoneNumber(phoneNumber)}
          </span>
        </p>
      </div>

      <div className="flex justify-center">
        <OTPInput length={6} onComplete={handleOTPComplete} />
      </div>

      {verificationStatus === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-center text-sm"
        >
          Invalid code. Please try again.
        </motion.p>
      )}

      <div className="text-center space-y-4">
        <p className="text-sm text-gray-500">
          Didn't receive the code?{' '}
          {timer > 0 ? (
            <span className="text-gray-700 font-medium">
              Resend in {timer}s
            </span>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-blue-600 font-medium hover:text-blue-500 transition-colors"
            >
              Resend Code
            </button>
          )}
        </p>
      </div>
    </motion.div>
  );
};