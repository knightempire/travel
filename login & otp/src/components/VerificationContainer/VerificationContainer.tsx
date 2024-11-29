import { useState, FormEvent } from 'react';
import { PhoneInput } from '../PhoneInput/PhoneInput';
import { OTPVerification } from '../OTPVerification/OTPVerification';

type VerificationStep = 'phone' | 'otp';

export const VerificationContainer = () => {
  const [step, setStep] = useState<VerificationStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      // Here you would typically make an API call to send the OTP
      setStep('otp');
      setError('');
    } else {
      setError('Please enter a valid phone number');
    }
  };

  const handleVerificationComplete = () => {
    // Handle successful verification
    console.log('Verification completed for:', phoneNumber);
  };

  const handleBack = () => {
    setStep('phone');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        {step === 'phone' ? (
          <>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Enter Your Phone Number</h1>
              <p className="text-gray-500">
                We'll send you a verification code to verify your phone number
              </p>
            </div>
            <PhoneInput
              phoneNumber={phoneNumber}
              onChange={setPhoneNumber}
              onSubmit={handlePhoneSubmit}
              error={error}
            />
          </>
        ) : (
          <>
            <button
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            <OTPVerification
              phoneNumber={phoneNumber}
              onComplete={handleVerificationComplete}
            />
          </>
        )}
      </div>
    </div>
  );
};