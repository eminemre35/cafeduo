import React from 'react';
import { RetroButton } from './RetroButton';
import { Gamepad, ChevronDown, Trophy, Star } from 'lucide-react';

interface HeroProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLogin, onRegister }) => {
  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f141a]">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
        
        {/* Retro Grid Floor */}
        <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-[#0f141a] to-transparent opacity-50" 
             style={{
               backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
               backgroundSize: '50px 50px',
               transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)'
             }}>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center gap-10">
        
        {/* Floating Pixel Icons */}
        <div className="absolute top-20 left-10 md:left-20 text-yellow-400 opacity-60 animate-bounce delay-100 hidden md:block">
           <Trophy size={48} />
        </div>
        <div className="absolute bottom-40 right-10 md:right-20 text-purple-400 opacity-60 animate-bounce hidden md:block">
           <Star size={48} />
        </div>

        {/* Main Title Block */}
        <div className="relative text-center">
          
          {/* Glowing Text Container */}
          <div className="relative font-black leading-[0.9] tracking-tighter select-none">
            <h1 className="text-7xl sm:text-8xl md:text-[10rem] text-white mix-blend-screen filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] flex flex-col items-center gap-2">
              <span className="font-pixel text-4xl md:text-6xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                YENİ
              </span>
              <span className="block relative">
                <span className="absolute -inset-1 blur-md bg-blue-500/30 rounded-lg"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 glitch-text" data-text="NESİL">
                  NESİL
                </span>
              </span>
              <span className="block text-5xl md:text-7xl text-gray-300 font-pixel mt-2">
                KAFE
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-lg">
                DENEYİMİ
              </span>
            </h1>
          </div>

        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center w-full max-w-lg gap-8 mt-8">
          
          {/* Animated Indicator */}
          <div className="flex items-center justify-center gap-4 text-gray-300 font-pixel text-lg animate-pulse">
             <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[12px] border-t-white border-r-[8px] border-r-transparent"></div>
             <span className="uppercase tracking-widest text-blue-300">Hemen kazanmaya başla</span>
             <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[12px] border-t-white border-r-[8px] border-r-transparent"></div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-stretch sm:items-center">
            <RetroButton variant="primary" className="flex-1 shadow-blue-500/20" onClick={onRegister}>
              Kayıt Ol
            </RetroButton>
            <RetroButton variant="secondary" className="flex-1 shadow-purple-500/20" onClick={onLogin}>
              Giriş Yap
            </RetroButton>
          </div>
        </div>

      </div>
    </div>
  );
};