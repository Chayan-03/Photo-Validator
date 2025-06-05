import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { ImageAnalysisResult, ValidationError } from '../types';

interface ValidationResultsProps {
  result: ImageAnalysisResult | null;
  isLoading: boolean;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin mb-2" />
        <p>Analyzing your photo...</p>
        <p className="text-sm mt-1">This may take a few moments</p>
      </div>
    );
  }

  if (!result) return null;

  const { passed, errors } = result;

  const getErrorIcon = (severity: ValidationError['severity']) => {
    return severity === 'error' ? (
      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
    ) : (
      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
    );
  };

  return (
    <div className="mt-6 border rounded-lg overflow-hidden">
      <div className={`p-4 ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="flex items-center">
          {passed ? (
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500 mr-2" />
          )}
          <h3 className="text-lg font-semibold">
            {passed 
              ? 'Your photo meets all requirements!' 
              : 'Your photo doesn\'t meet all requirements'}
          </h3>
        </div>
      </div>

      {!passed && errors.length > 0 && (
        <div className="p-4 border-t">
          <h4 className="font-medium mb-2">Issues found:</h4>
          <ul className="space-y-2">
            {errors.map((error, index) => (
              <li key={index} className="flex items-start">
                {getErrorIcon(error.severity)}
                <span className="ml-2">{error.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {passed && (
        <div className="p-4 border-t bg-white">
          <p className="text-green-700">
            Your passport photo meets all the specified requirements and should be acceptable
            for official use. You can now proceed with your application.
          </p>
        </div>
      )}

      {!passed && (
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-700">
            Please address the issues above and upload a new photo to meet the requirements.
          </p>
        </div>
      )}
    </div>
  );
};

export default ValidationResults;