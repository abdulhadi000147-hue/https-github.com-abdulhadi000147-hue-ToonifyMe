import React from 'react';
import { Palette } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-primary p-2 rounded-xl shadow-lg rotate-3">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-display font-bold text-dark tracking-tight">
          Toonify<span className="text-primary">Me</span>
        </h1>
      </div>
      <p className="text-gray-500 font-medium max-w-md">
        Turn your photos into magical cartoons in seconds with AI.
      </p>
    </header>
  );
};