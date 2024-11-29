import { ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface OTPDigitInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  focus: boolean;
  autoFocus?: boolean;
}

export const OTPDigitInput = ({ 
  value, 
  onChange, 
  onKeyDown, 
  focus, 
  autoFocus 
}: OTPDigitInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value;
    if (digit.match(/^\d?$/)) {
      onChange(digit);
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      maxLength={1}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
      className={clsx(
        "w-12 h-14 text-2xl font-bold text-center rounded-lg border-2",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "transition-all duration-200",
        value ? "border-green-500 bg-green-50" : "border-gray-300",
        "hover:border-blue-400"
      )}
    />
  );
};