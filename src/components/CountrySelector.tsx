import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { fetchCountries } from '../services/api';
import { Country } from '../types';

interface CountrySelectorProps {
  onCountrySelect: (country: string) => void;
  selectedCountry: string;
  disabled?: boolean;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  onCountrySelect, 
  selectedCountry,
  disabled = false
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError('Failed to load countries. Please try again.');
        console.error('Error loading countries:', err);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCountrySelect(e.target.value);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-gray-700">
        2. Select Country
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Globe size={18} className="text-gray-500" />
        </div>
        
        <select
          value={selectedCountry}
          onChange={handleChange}
          disabled={disabled || loading}
          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <option value="">-- Choose a Country --</option>
          {countries.map((country, idx) => (
            <option key={idx} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {loading && (
        <p className="mt-1 text-sm text-gray-500">Loading countries...</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default CountrySelector;