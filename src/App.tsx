import React, { useState } from 'react';
import Header from './components/Header';
import PhotoUploader from './components/PhotoUploader';
import CountrySelector from './components/CountrySelector';
import ValidationResults from './components/ValidationResults';
import Guidelines from './components/Guidelines';
import { fetchCountrySpec } from './services/api';
import { analyzeImage } from './services/geminiService';
import { CountrySpec, ImageAnalysisResult } from './types';
import { CheckCircle } from 'lucide-react';

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [countrySpec, setCountrySpec] = useState<CountrySpec | null>(null);
  const [validationResult, setValidationResult] = useState<ImageAnalysisResult | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const handleImageSelect = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setValidationResult(null);
  };

  const handleClearImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
    setValidationResult(null);
  };

  const handleCountrySelect = async (country: string) => {
    setSelectedCountry(country);
    setValidationResult(null);
    
    if (country) {
      const spec = await fetchCountrySpec(country);
      setCountrySpec(spec);
    } else {
      setCountrySpec(null);
    }
  };

  const validateImage = async () => {
    if (!image || !selectedCountry || !countrySpec) return;
    
    try {
      setIsValidating(true);
      const result = await analyzeImage(image, countrySpec);
      setValidationResult(result);
    } catch (error) {
      console.error('Error validating image:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const canValidate = !!image && !!selectedCountry && !!countrySpec;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Validate Your Passport Photo
              </h2>
              
              <div className="space-y-8">
                <PhotoUploader 
                  onImageSelect={handleImageSelect}
                  previewUrl={preview}
                  onClearImage={handleClearImage}
                />
                
                <CountrySelector 
                  onCountrySelect={handleCountrySelect}
                  selectedCountry={selectedCountry}
                  disabled={isValidating}
                />
                
                <div className="mt-8">
                  <button
                    onClick={validateImage}
                    disabled={!canValidate || isValidating}
                    className={`flex items-center justify-center w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
                      canValidate && !isValidating
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isValidating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing Photo...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Validate Photo
                      </>
                    )}
                  </button>
                </div>
                
                <ValidationResults 
                  result={validationResult} 
                  isLoading={isValidating}
                />
                
                {countrySpec && <Guidelines countrySpec={countrySpec} />}
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              This tool validates passport photos against The Dummy Guidelines Made for this Project Only .This Project Is Created for Learning Purpose
              Results are provided for informational purposes only.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
