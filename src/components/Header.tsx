import React from 'react';
import { Camera } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera size={28} className="text-white" />
          <h1 className="text-xl md:text-2xl font-bold">Passport Photo Validator</h1>
        </div>
        <div>
          <p className="text-sm text-blue-100">
            Powered by <span className="font-semibold">AI</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;