import React from 'react';

interface WeatherBackgroundProps {
  isRaining: boolean;
  isDarkMode: boolean;
  aiStatus: string;
  tCritical: string;
  tWarning: string;
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ isRaining, isDarkMode, aiStatus, tCritical, tWarning }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {isRaining ? (
        <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-1000 ${isDarkMode ? 'from-[#1C1C1E]' : 'from-[#94a3b8] via-[#cbd5e1] to-[#f1f5f9]'}`}>
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {Array.from({ length: 20 }).map((_, i) => {
              const left = -20 + Math.random() * 140 + '%';
              const duration = 0.4 + Math.random() * 0.4 + 's';
              const delay = Math.random() * 2 + 's';
              const opacity = 0.05 + Math.random() * 0.15;
              return (
                <div key={`bg-rain-${i}`} className="absolute bg-gradient-to-b from-transparent to-white rounded-full"
                  style={{ left, top: '-20%', width: '1px', height: `${40 + Math.random() * 60}px`, opacity, animation: `backgroundRainfall ${duration} linear ${delay} infinite` }} />
              );
            })}
          </div>

          {aiStatus === tCritical && <div className="absolute top-0 w-full h-full bg-[#FF453A]/10 blur-[150px] animate-[pulseGlow_1s_ease-in-out_infinite]"></div>}
          {aiStatus === tWarning && <div className="absolute top-0 w-full h-full bg-[#FF9F0A]/10 blur-[120px]"></div>}
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-1000 ${isDarkMode ? 'from-[#050505] to-[#000]' : 'from-[#38bdf8] to-[#bae6fd]'}`}>
          {isDarkMode ? (
            <>
              <div className="absolute top-[15%] right-[15%] w-[80px] h-[80px] bg-indigo-200/10 blur-[20px] rounded-full"></div>
            </>
          ) : (
            <>
              <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] bg-yellow-300/30 blur-[80px] rounded-full animate-[pulseGlow_6s_ease-in-out_infinite]/30 pointer-events-none"></div>
              <div className="absolute top-[8%] right-[12%] w-[80px] h-[80px] bg-gradient-to-tr from-white via-yellow-200 to-orange-400 rounded-full shadow-[0_0_50px_rgba(253,224,71,0.6)]">
                <div className="absolute inset-0 bg-white rounded-full blur-[4px] opacity-40"></div>
              </div>
              <div className="absolute top-[18%] left-[5%] w-[140px] h-[45px] bg-white/60 blur-[12px] rounded-full animate-[float_10s_ease-in-out_infinite]"></div>
              <div className="absolute top-[28%] right-[25%] w-[100px] h-[35px] bg-white/50 blur-[10px] rounded-full animate-[float_8s_ease-in-out_infinite_reverse]"></div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
