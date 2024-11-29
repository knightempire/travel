import { ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CountrySelect } from '../CountrySelect/CountrySelect';

interface PhoneInputProps {
  phoneNumber: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  error?: string;
}

export const PhoneInput = ({ phoneNumber, onChange, onSubmit, error }: PhoneInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      onChange(value);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country/Region
          </label>
          <CountrySelect
            value={{ value: 'IN', label: 'India', code: 'IN', phone: '+91' }}
            onChange={(country) => console.log('Selected country:', country)}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={handleChange}
              className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="(555) 555-5555"
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={phoneNumber.length !== 10}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Continue
      </button>
    </motion.form>
  );
};