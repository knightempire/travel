import Select from 'react-select';
import ReactCountryFlag from 'react-country-flag';

interface CountryOption {
  value: string;
  label: string;
  code: string;
  phone: string;
}

const countries: CountryOption[] = [
  { value: 'IN', label: 'India', code: 'IN', phone: '+91' },
  { value: 'US', label: 'United States', code: 'US', phone: '+1' },
  { value: 'GB', label: 'United Kingdom', code: 'GB', phone: '+44' },
  { value: 'CA', label: 'Canada', code: 'CA', phone: '+1' },
  { value: 'AU', label: 'Australia', code: 'AU', phone: '+61' },
  { value: 'DE', label: 'Germany', code: 'DE', phone: '+49' },
  { value: 'FR', label: 'France', code: 'FR', phone: '+33' },
  { value: 'IT', label: 'Italy', code: 'IT', phone: '+39' },
  { value: 'JP', label: 'Japan', code: 'JP', phone: '+81' },
  { value: 'SG', label: 'Singapore', code: 'SG', phone: '+65' },
];

interface CountrySelectProps {
  value: CountryOption;
  onChange: (option: CountryOption) => void;
}

export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const formatOptionLabel = ({ value, label, phone }: CountryOption) => (
    <div className="flex items-center gap-2">
      <ReactCountryFlag countryCode={value} svg />
      <span>{label}</span>
      <span className="text-gray-500">{phone}</span>
    </div>
  );

  return (
    <Select
      value={value}
      onChange={(option) => onChange(option as CountryOption)}
      options={countries}
      formatOptionLabel={formatOptionLabel}
      className="w-full"
      classNamePrefix="country-select"
      isSearchable={true}
      styles={{
        control: (base) => ({
          ...base,
          border: '2px solid #E5E7EB',
          borderRadius: '0.5rem',
          padding: '0.25rem',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#93C5FD',
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? '#2563EB' : state.isFocused ? '#DBEAFE' : 'white',
          color: state.isSelected ? 'white' : '#1F2937',
          cursor: 'pointer',
          '&:active': {
            backgroundColor: '#2563EB',
          },
        }),
      }}
    />
  );
};