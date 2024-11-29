import { useState, KeyboardEvent } from 'react';
import { OTPDigitInput } from './OTPDigitInput';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

export const OTPInput = ({ length = 6, onComplete }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [activeInput, setActiveInput] = useState<number>(0);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '') {
      setActiveInput(Math.min(index + 1, length - 1));
    }

    const otpValue = newOtp.join('');
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (otp[index] === '') {
        setActiveInput(Math.max(index - 1, 0));
      } else {
        handleChange('', index);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveInput(Math.max(index - 1, 0));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveInput(Math.min(index + 1, length - 1));
    }
  };

  return (
    <div className="flex gap-3">
      {otp.map((digit, index) => (
        <OTPDigitInput
          key={index}
          value={digit}
          onChange={(value) => handleChange(value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          focus={index === activeInput}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};