import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../constants';
import { ArrowRight, ArrowDown, CornerDownRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#151b26] border-t border-slate-800 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-retro text-white inline-block border-b-4 border-blue-500 pb-2">Nasıl Çalışır?</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-6">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div className="flex-1 flex flex-col group relative hover:-translate-y-2 transition-transform duration-300">
                
                {/* Header Part */}
                <div className="bg-gray-300 rounded-t-2xl p-6 flex justify-center items-center relative h-24 border-4 border-gray-400 border-b-black">
                  {/* Number Circle */}
                  <div className="w-14 h-14 rounded-full border-[3px] border-black flex items-center justify-center text-2xl font-bold text-black bg-white shadow-[4px_4px_0_rgba(0,0,0,0.2)] z-10">
                    {step.number}
                  </div>
                  {/* Decorative dots */}
                  <div className="absolute top-3 right-3 flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  </div>
                </div>

                {/* Body Part */}
                <div className="bg-gray-200 p-6 rounded-b-2xl min-h-[160px] flex items-center justify-center text-center border-4 border-gray-400 border-t-0 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                  <p className="text-black font-bold text-lg md:text-xl leading-relaxed font-sans">
                    {step.text}
                  </p>
                </div>
              </div>

              {/* Connector Arrow */}
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="flex items-center justify-center py-2 lg:py-0 opacity-60">
                  {/* Desktop Arrow (Right) */}
                  <div className="hidden lg:block text-gray-500 animate-pulse">
                     <ArrowRight size={48} strokeWidth={3} />
                  </div>
                  {/* Mobile Arrow (Down) */}
                  <div className="lg:hidden text-gray-500 animate-bounce">
                      <ArrowDown size={48} strokeWidth={3} />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};