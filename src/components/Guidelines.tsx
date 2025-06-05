import React from 'react';
import { CountrySpec } from '../types';
import { Info, Check } from 'lucide-react';

interface GuidelinesProps {
  countrySpec: CountrySpec | null;
}

const Guidelines: React.FC<GuidelinesProps> = ({ countrySpec }) => {
  if (!countrySpec) return null;

  return (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
      <div className="bg-blue-100 px-4 py-3 border-b border-blue-200">
        <div className="flex items-center">
          <Info className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-medium text-blue-800">
            Official Photo Requirements for {countrySpec.country}
          </h3>
        </div>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>
              <strong>Dimensions:</strong> {countrySpec.width} × {countrySpec.height} pixels
            </span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>
              <strong>Maximum file size:</strong> {countrySpec.maxSizeKB} KB
            </span>
          </li>
          {countrySpec.backgroundColor && (
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>
                <strong>Background color:</strong> {countrySpec.backgroundColor}
              </span>
            </li>
          )}
          {countrySpec.additionalRequirements && countrySpec.additionalRequirements.length > 0 && (
            <>
              <li className="font-medium mt-2">Additional requirements:</li>
              {countrySpec.additionalRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start ml-4">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Guidelines;