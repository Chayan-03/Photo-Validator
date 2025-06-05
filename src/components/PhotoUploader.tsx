import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface PhotoUploaderProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
  onClearImage: () => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ 
  onImageSelect, 
  previewUrl, 
  onClearImage 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-gray-700">
        1. Upload Passport Size Photo
      </label>
      
      {!previewUrl ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop your passport photo here, or click to browse
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Accepts JPG, PNG formats
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png"
            className="hidden"
          />
        </div>
      ) : (
        <div className="mt-4 relative">
          <div className="flex items-start gap-4">
            <div className="relative border rounded-md shadow-sm overflow-hidden">
              <img 
                src={previewUrl} 
                alt="Passport photo preview" 
                className="h-48 w-auto object-contain bg-gray-100"
              />
              <button
                type="button"
                onClick={onClearImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Your uploaded photo</h3>
              <p className="text-sm text-gray-600 mt-1">
                This photo will be validated against the selected country's requirements.
              </p>
              <button
                type="button"
                onClick={triggerFileInput}
                className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <ImageIcon size={16} className="mr-1" /> Change photo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png"
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;