import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ResultView } from './components/ResultView';
import { generateCartoonImage } from './services/geminiService';
import { CartoonStyle, GenerationState } from './types';

const App: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<CartoonStyle>(CartoonStyle.Pixar3D);
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const handleImageSelected = useCallback(async (base64Image: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const processedImage = await generateCartoonImage(base64Image, selectedStyle);
      
      setState({
        isLoading: false,
        error: null,
        result: {
          original: base64Image,
          processed: processedImage,
          style: selectedStyle
        }
      });
    } catch (error: any) {
      console.error("Generation failed", error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to generate cartoon. Please try again."
      }));
    }
  }, [selectedStyle]);

  const handleReset = () => {
    setState({
      isLoading: false,
      error: null,
      result: null
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-start pt-4 md:pt-8">
        
        {state.error && (
           <div className="w-full max-w-md mx-auto mb-6 px-4">
             <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 flex items-center gap-3 text-sm font-medium">
               <span className="text-xl">⚠️</span>
               {state.error}
             </div>
           </div>
        )}

        {!state.result ? (
          <>
            <StyleSelector 
              selectedStyle={selectedStyle} 
              onSelect={setSelectedStyle}
              disabled={state.isLoading}
            />
            <ImageUploader 
              onImageSelected={handleImageSelected} 
              isLoading={state.isLoading}
            />
            
            {/* Features/Trust Section */}
            {!state.isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4 mt-8 mb-16 text-center">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="font-bold text-gray-800 mb-1">Fast & Easy</h3>
                  <p className="text-sm text-gray-500">Instant transformation powered by Google Gemini AI.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-3xl mb-3">🎨</div>
                  <h3 className="font-bold text-gray-800 mb-1">Multiple Styles</h3>
                  <p className="text-sm text-gray-500">From 3D animation to anime and comic books.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                   <div className="text-3xl mb-3">🔒</div>
                  <h3 className="font-bold text-gray-800 mb-1">Private & Secure</h3>
                  <p className="text-sm text-gray-500">Your photos are processed instantly and secure.</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <ResultView result={state.result} onReset={handleReset} />
        )}
      </main>
      
      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} ToonifyMe. Powered by Gemini 2.5 Flash Image.</p>
      </footer>
    </div>
  );
};

export default App;