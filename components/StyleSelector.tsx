import React from 'react';
import { CartoonStyle } from '../types';
import { Sparkles, Zap, PenTool, Smile, Grid, Box, Cpu, Feather } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: CartoonStyle;
  onSelect: (style: CartoonStyle) => void;
  disabled: boolean;
}

const styles = [
  { id: CartoonStyle.Pixar3D, icon: Sparkles, color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { id: CartoonStyle.Anime, icon: Zap, color: 'bg-pink-100 text-pink-600 border-pink-200' },
  { id: CartoonStyle.ComicBook, icon: PenTool, color: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
  { id: CartoonStyle.Caricature, icon: Smile, color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { id: CartoonStyle.PixelArt, icon: Grid, color: 'bg-green-100 text-green-600 border-green-200' },
  { id: CartoonStyle.Claymation, icon: Box, color: 'bg-orange-100 text-orange-600 border-orange-200' },
  { id: CartoonStyle.Cyberpunk, icon: Cpu, color: 'bg-indigo-100 text-indigo-600 border-indigo-200' },
  { id: CartoonStyle.Sketch, icon: Feather, color: 'bg-gray-100 text-gray-600 border-gray-200' },
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, disabled }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <h3 className="text-center text-gray-700 font-bold mb-4 font-display text-lg">Choose Your Style</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {styles.map((style) => {
          const Icon = style.icon;
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style.id)}
              disabled={disabled}
              className={`
                relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200
                ${isSelected 
                  ? `${style.color} ring-2 ring-offset-2 ring-primary/30 border-transparent shadow-md transform scale-105` 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'animate-bounce' : ''}`} />
              <span className="font-bold text-sm">{style.id}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};