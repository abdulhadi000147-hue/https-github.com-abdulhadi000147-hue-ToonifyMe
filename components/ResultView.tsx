import React from 'react';
import { Download, RefreshCcw, ArrowRight } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ResultViewProps {
  result: GeneratedImage;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result.processed;
    link.download = `toonified-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        {/* Original */}
        <div className="relative group w-full md:w-1/2 max-w-sm">
          <div className="absolute -inset-2 bg-gray-200 rounded-[2rem] blur-sm opacity-50"></div>
          <div className="relative bg-white p-3 rounded-[1.5rem] shadow-xl">
             <div className="aspect-[3/4] md:aspect-square w-full rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src={result.original} 
                  alt="Original" 
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute top-6 left-6 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                Original
             </div>
          </div>
        </div>

        {/* Arrow for Desktop */}
        <div className="hidden md:flex text-gray-300">
          <ArrowRight className="w-12 h-12" />
        </div>

        {/* Generated */}
        <div className="relative group w-full md:w-1/2 max-w-sm">
          <div className="absolute -inset-2 bg-gradient-to-br from-primary via-secondary to-accent rounded-[2rem] blur-md opacity-75 animate-pulse"></div>
          <div className="relative bg-white p-3 rounded-[1.5rem] shadow-2xl">
             <div className="aspect-[3/4] md:aspect-square w-full rounded-2xl overflow-hidden bg-gray-100">
                <img 
                  src={result.processed} 
                  alt="Toonified" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
             </div>
             <div className="absolute top-6 left-6 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {result.style}
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-gray-600 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all border border-gray-100 w-full sm:w-auto justify-center"
        >
          <RefreshCcw className="w-5 h-5" />
          Try Another
        </button>
        
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:translate-y-[-2px] transition-all w-full sm:w-auto justify-center"
        >
          <Download className="w-5 h-5" />
          Download Cartoon
        </button>
      </div>
    </div>
  );
};