import { useState } from 'react';
import { LoginLayout } from './components/LoginLayout/LoginLayout';
import { PhoneInput } from './components/PhoneInput/PhoneInput';
import { OTPVerification } from './components/OTPVerification/OTPVerification';

type LoginStep = 'phone' | 'otp';

function App() {
  const [step, setStep] = useState<LoginStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setStep('otp');
      setError('');
    } else {
      setError('Please enter a valid phone number');
    }
  };

  const handleVerificationComplete = () => {
    console.log('Verification completed for:', phoneNumber);
  };

  const handleBack = () => {
    setStep('phone');
    setError('');
  };

  return (
    <LoginLayout>
      {step === 'phone' ? (
        <PhoneInput
          phoneNumber={phoneNumber}
          onChange={setPhoneNumber}
          onSubmit={handlePhoneSubmit}
          error={error}
        />
      ) : (
        <OTPVerification
          phoneNumber={phoneNumber}
          onComplete={handleVerificationComplete}
          onBack={handleBack}
        />
      )}
    </LoginLayout>
  );
}

export default App;