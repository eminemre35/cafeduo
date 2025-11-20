import React from 'react';
import { GameCardProps } from '../types';
import { Scissors, Scroll, Circle, Sword, Skull, Trophy, Coins } from 'lucide-react';

const GameCard: React.FC<GameCardProps> = ({ title, content, disabled }) => {
  return (
    <div className="relative group h-full">
      {/* Rainbow Gradient Border Animation */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
      
      <div className="relative h-full w-full bg-[#131720] rounded-xl p-1 flex flex-col overflow-hidden">
        {/* Inner Border */}
        <div className="h-full w-full border border-gray-700 rounded-lg bg-[#131720] p-6 flex flex-col items-center justify-center min-h-[280px] relative">
            
            {/* Corner Pixel Decor */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-gray-600"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-gray-600"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-gray-600"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-600"></div>

            {content}

            {/* Title for Active Cards */}
            {!disabled && title && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#131720] px-4 py-1 border border-gray-700 rounded-full z-20">
                    <span className="font-pixel text-sm text-gray-400 tracking-wider whitespace-nowrap">{title}</span>
                </div>
            )}

            {/* Overlay for Disabled Cards */}
            {disabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[2px] rounded-lg z-30">
                    <div className="bg-gray-800 px-6 py-2 rounded border-2 border-gray-600 transform -rotate-12 shadow-xl">
                        <span className="font-pixel text-gray-400 text-xl animate-pulse">YAKINDA...</span>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export const Games: React.FC = () => {
  return (
    <section id="games" className="py-24 bg-[#0f141a] relative">
      
      {/* Section Title */}
      <div className="flex justify-center mb-16 relative z-10">
            <div className="flex items-center gap-4 bg-black/40 px-8 py-4 rounded-full border border-gray-800 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
            <h2 className="text-4xl md:text-5xl font-pixel text-white text-center tracking-widest">OYUNLAR</h2>
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse delay-75"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Rock Paper Scissors */}
          <GameCard 
            title="TAS KAGIT MAKAS"
            content={
              <div className="flex flex-col items-center justify-center w-full h-full relative group-hover:scale-105 transition-transform duration-300">
                <div className="relative z-10 text-center">
                    <h3 className="text-4xl md:text-5xl font-serif italic font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] mb-2">
                        Taş
                    </h3>
                    <div className="flex items-center justify-center gap-4 my-2">
                        <Scissors size={48} className="text-pink-500 rotate-[135deg] drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                        <span className="text-2xl font-pixel text-gray-500">VS</span>
                        <Scroll size={48} className="text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif italic font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                        Kağıt
                    </h3>
                    <h3 className="text-5xl md:text-6xl font-serif italic font-black text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 scale-150 pointer-events-none">
                        MAKAS
                    </h3>
                </div>
                
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-16 h-16 border-4 border-purple-500/30 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-4 border-blue-500/30 rounded-full"></div>
              </div>
            }
          />

          {/* Card 2: Word/Icon Grid */}
          <GameCard 
            title="KELIME ESLESTIRME"
            content={
               <div className="flex flex-col items-center gap-4 w-full group-hover:scale-105 transition-transform duration-300">
                 <div className="grid grid-cols-4 gap-3 p-3 bg-gray-800/80 rounded-xl border-2 border-gray-600 shadow-inner">
                   {['E', 'Ş', 'L', 'E'].map((l, i) => (
                       <div key={`1-${i}`} className="bg-white text-black font-black w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded shadow-[0_4px_0_#999] active:shadow-none active:translate-y-1 transition-all font-pixel text-xl border border-gray-300">{l}</div>
                   ))}
                   {['Ş', 'T', 'İ', 'R'].map((l, i) => (
                       <div key={`2-${i}`} className="bg-white text-black font-black w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded shadow-[0_4px_0_#999] font-pixel text-xl border border-gray-300">{l}</div>
                   ))}
                   
                   {/* Icons row */}
                   <div className="bg-blue-100 p-1 rounded border border-blue-300 flex items-center justify-center shadow-sm"><Sword size={24} className="text-blue-600" /></div>
                   <div className="bg-yellow-100 p-1 rounded border border-yellow-300 flex items-center justify-center shadow-sm"><span className="text-xs font-bold">duck</span></div>
                   <div className="bg-white p-1 rounded border border-gray-300 flex flex-col items-center justify-center shadow-sm leading-none">
                      <span className="text-[10px] font-bold">+1</span>
                      <span className="text-[8px] font-bold">PUAN</span>
                   </div>
                   <div className="bg-red-100 p-1 rounded border border-red-300 flex items-center justify-center shadow-sm"><div className="w-6 h-4 bg-black rounded-sm relative overflow-hidden"><div className="absolute inset-0 bg-gray-800 m-[1px]"></div></div></div>
                 </div>
               </div>
            }
          />

          {/* Card 3: Placeholder */}
          <GameCard title="YAKINDA" disabled content={<div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-50"></div>} />
          
          {/* Card 4: Placeholder */}
          <GameCard title="YAKINDA" disabled content={<div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 opacity-50"></div>} />

        </div>
      </div>
    </section>
  );
};