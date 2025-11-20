import React from 'react';
import { ABOUT_TEXT } from '../constants';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0f141a] relative overflow-hidden">
      {/* Background Map/Texture effect */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-gray-800/20 to-transparent opacity-30 pointer-events-none clip-path-polygon"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="mb-10">
           <h2 className="text-5xl md:text-7xl font-pixel text-white mb-2">HAKKIMIZDA</h2>
           <div className="h-1 w-full bg-gradient-to-r from-white via-gray-500 to-transparent"></div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-sans text-justify md:text-left">
            {ABOUT_TEXT}
          </p>
        </div>

        <div className="mt-12 flex gap-4">
            <div className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-help" title="Team Member">
                <span className="font-pixel text-2xl">?</span>
            </div>
            <div className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-help" title="Team Member">
                 <span className="font-pixel text-2xl">?</span>
            </div>
        </div>
      </div>
    </section>
  );
};