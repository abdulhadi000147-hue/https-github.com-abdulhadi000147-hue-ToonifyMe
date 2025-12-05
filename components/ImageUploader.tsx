import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { fileToBase64 } from '../utils/imageUtils';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }
    // Simple size check (e.g., limit to 5MB to avoid browser freeze on base64)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Please upload an image under 5MB.');
      return;
    }
    try {
      const base64 = await fileToBase64(file);
      onImageSelected(base64);
    } catch (e) {
      console.error(e);
      alert('Error reading file');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 mb-8">
      <div
        className={`
          relative border-4 border-dashed rounded-3xl p-8 transition-all duration-300
          flex flex-col items-center justify-center text-center cursor-pointer
          min-h-[300px] group overflow-hidden
          ${isDragging 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isLoading}
        />
        
        <div className="bg-secondary/10 p-6 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
          {isLoading ? (
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          ) : (
            <Upload className="w-12 h-12 text-secondary" />
          )}
        </div>

        <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
          {isLoading ? 'Processing...' : 'Upload your Photo'}
        </h3>
        <p className="text-gray-500 max-w-xs">
          {isLoading 
            ? 'Making magic happen! This might take a few seconds.' 
            : 'Click to browse or drag and drop your image here'
          }
        </p>
      </div>
    </div>
  );
};