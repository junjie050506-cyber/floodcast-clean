import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Navigation, 
  Droplets, 
  Moon,
  Info,
  Shield,
  Compass
} from 'lucide-react';

const renderHighlightedText = (text: string, isDarkMode: boolean) => {
  if (!text) return text;
  const highlightTerms = [
    // English
    "Normal river flow",
    "No immediate threat",
    "Water levels elevated",
    "roads are clear",
    "Street pooling likely",
    "impassable",
    "extreme caution",
    "higher ground immediately",
    "Life-threatening conditions",
    "Severe property submersion",
    "Evacuate immediately",
    
    // Malay
    "Aliran sungai normal",
    "Tiada ancaman serta-merta",
    "Paras air meningkat",
    "jalan raya safe",
    "Air bertakung",
    "tidak boleh dilalui",
    "berhati-hati",
    "kawasan tinggi segera",
    "Ancaman nyawa",
    "tenggelam teruk",
    "Pindah segera"
  ];
  
  const escapedTerms = highlightTerms.map(term => term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
  
  const parts = text.split(regex);
  return parts.map((part, i) => {
    const isMatch = highlightTerms.some(term => term.toLowerCase() === part.toLowerCase());
    if (isMatch) {
      return (
        <span key={i} className={isDarkMode ? "text-white font-black" : "text-gray-900 font-black"}>
          {part}
        </span>
      );
    }
    return part;
  });
};

interface FigmaWeatherLayoutProps {
  isDarkMode: boolean;
  profileName: string;
  currentLocation: string;
  simulateStorm: boolean;
  appPhase: string;
  scrubHour: number;
  setScrubHour: (h: number) => void;
  chartDisplayMode: 'river' | 'rainfall';
  setChartDisplayMode: (mode: 'river' | 'rainfall') => void;
  currentPoint: { rain: number; depth: number; h: number };
  currentImpact: { color: string; icon: React.ReactNode; title: string; text: string };
  setActiveTab: (tab: string) => void;
  textPrimary: string;
  textSecondary: string;
  systemRed: string;
  t: any;

  // Real-time meteorological parameters
  liveTemp?: number;
  liveHumidity?: number;
  liveWindSpeed?: number;
  liveWeatherCode?: number;
  hourlyTempList?: number[];
  hourlyWeatherCodeList?: number[];
  hourlyRainList?: number[];
  hourlyProbList?: number[];
}

// helper to get icon and description by WMO code
export const getWeatherInfoByCode = (code: number | undefined, size = 24) => {
  if (code === undefined) {
    return {
      description: "Cloudy",
      icon: <Cloud size={size} className="text-zinc-400 dark:text-zinc-500" />
    };
  }
  if (code === 0) {
    return {
      description: "Clear Sky",
      icon: <Sun size={size} className="text-amber-500 animate-[spin_50s_linear_infinite]" />
    };
  }
  if ([1, 2, 3].includes(code)) {
    return {
      description: code === 1 ? "Partly Cloudy" : code === 2 ? "Cloudy" : "Overcast",
      icon: <Cloud size={size} className="text-zinc-400 dark:text-zinc-500" />
    };
  }
  if ([45, 48].includes(code)) {
    return {
      description: "Foggy",
      icon: <Cloud size={size} className="text-zinc-300 dark:text-zinc-400 opacity-80" />
    };
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      description: "Light Drizzle",
      icon: <CloudRain size={size} className="text-[#0A84FF] opacity-80" />
    };
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      description: "Rain Showers",
      icon: <CloudRain size={size} className="text-[#0A84FF]" />
    };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      description: "Snow",
      icon: <Cloud size={size} className="text-blue-100" />
    };
  }
  if ([95, 96, 99].includes(code)) {
    return {
      description: "Thunderstorm",
      icon: <CloudLightning size={size} className="text-[#FF453A]" />
    };
  }
  return {
    description: "Cloudy",
    icon: <Cloud size={size} className="text-zinc-400 dark:text-zinc-500" />
  };
};

export const FigmaWeatherLayout: React.FC<FigmaWeatherLayoutProps> = ({
  isDarkMode,
  profileName,
  currentLocation,
  simulateStorm,
  appPhase,
  scrubHour,
  setScrubHour,
  chartDisplayMode,
  setChartDisplayMode,
  currentPoint,
  currentImpact,
  setActiveTab,
  textPrimary,
  textSecondary,
  systemRed,
  t,
  liveTemp,
  liveHumidity,
  liveWindSpeed,
  liveWeatherCode,
  hourlyTempList = [],
  hourlyWeatherCodeList = [],
  hourlyRainList = [],
  hourlyProbList = []
}) => {
  const [subTab, setSubTab] = useState<'today' | 'tomorrow' | 'next3'>('today');

  const [showEvacuate, setShowEvacuate] = useState(false);

  useEffect(() => {
    if (simulateStorm) {
      const interval = setInterval(() => {
        setShowEvacuate((prev) => !prev);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setShowEvacuate(false);
    }
  }, [simulateStorm]);

  // Smooth, continuous sum-of-Gaussians mountain curve (absolutely no sharp pointy angles - peak lower for label safety)
  const getFigmaY = (x: number) => {
    const base = 92;
    const mainPeak = 42 * Math.exp(-Math.pow((x - 200) / 45, 2));
    const leftHill = 12 * Math.exp(-Math.pow((x - 90) / 25, 2));
    const leftRipple = 5 * Math.exp(-Math.pow((x - 45) / 18, 2));
    const rightHill = 5 * Math.exp(-Math.pow((x - 310) / 35, 2));
    const tilt = (x / 400) * 8;
    return base - mainPeak - leftHill - leftRipple - rightHill + tilt;
  };

  const formatHourToUser = (date: Date): string => {
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' becomes '12'
    const strHours = hours < 10 ? '0' + hours : hours;
    return `${strHours}:00 ${ampm}`;
  };

  const activeX = 14 + (scrubHour / 48) * 372;
  const activeY = getFigmaY(activeX);

  // Generate dense path points for a high-fidelity smooth curve
  const pathPoints = useMemo(() => {
    return Array.from({ length: 121 }, (_, i) => {
      const x = (i / 120) * 400;
      return `${x.toFixed(1)},${getFigmaY(x).toFixed(1)}`;
    }).join(" L ");
  }, []);

  const dynamicArea = `M 0,120 L ${pathPoints} L 400,120 Z`;
  const dynamicLine = `M 0,${getFigmaY(0).toFixed(1)} L ${pathPoints}`;

  const stepTime = useMemo(() => {
    const timeVal = new Date();
    timeVal.setHours(timeVal.getHours() + Math.round((scrubHour * 6) / 48));
    timeVal.setMinutes(0);
    timeVal.setSeconds(0);
    timeVal.setMilliseconds(0);
    return formatHourToUser(timeVal);
  }, [scrubHour]);

  const tempAtPeak = useMemo(() => {
    return Math.round(15 + (96 - activeY) * 0.2);
  }, [activeY]);

  // Hourly forecast lists based on the subTab selection (with 6-8 items so that they can be swiped)
  const displayForecastList = useMemo(() => {
    if (subTab === 'today') {
      if (hourlyTempList && hourlyTempList.length > 0) {
        return Array.from({ length: 8 }).map((_, i) => {
          const idx = 3 + i;
          const tempVal = hourlyTempList[idx] !== undefined ? `${Math.round(hourlyTempList[idx])}°` : '20°';
          const codeVal = hourlyWeatherCodeList && hourlyWeatherCodeList[idx] !== undefined ? hourlyWeatherCodeList[idx] : 3;
          
          const timeLabel = new Date();
          timeLabel.setHours(timeLabel.getHours() + i);
          const timeStr = formatHourToUser(timeLabel);
          
          return {
            time: i === 0 ? 'Now' : timeStr,
            temp: tempVal,
            icon: getWeatherInfoByCode(codeVal, 24).icon
          };
        });
      }
      return [
        { time: '10:00 am', temp: '16°', icon: <Cloud size={24} className="text-zinc-400 dark:text-zinc-500" /> },
        { time: '11:00 am', temp: '17°', icon: <CloudRain size={24} className="text-[#0A84FF]" /> },
        { time: '12:00 pm', temp: '18°', icon: <Cloud size={24} className="text-zinc-400 dark:text-zinc-500" /> },
        { time: '01:00 pm', temp: '19°', icon: <Cloud size={24} className="text-zinc-400 dark:text-zinc-500" /> },
        { time: '02:00 pm', temp: '20°', icon: <Sun size={24} className="text-amber-500 animate-[spin_50s_linear_infinite]" /> },
        { time: '03:00 pm', temp: '20°', icon: <Sun size={24} className="text-amber-500 animate-[spin_50s_linear_infinite]" /> },
        { time: '04:00 pm', temp: '19°', icon: <Cloud size={24} className="text-zinc-400 dark:text-zinc-500" /> },
        { time: '05:00 pm', temp: '18°', icon: <Cloud size={24} className="text-zinc-400 dark:text-zinc-500" /> }
      ];
    } else if (subTab === 'tomorrow') {
      if (hourlyTempList && hourlyTempList.length > 24) {
        return Array.from({ length: 6 }).map((_, i) => {
          const idx = 3 + 24 + i * 3;
          const tempVal = hourlyTempList[idx] !== undefined ? `${Math.round(hourlyTempList[idx])}°` : '22°';
          const codeVal = hourlyWeatherCodeList && hourlyWeatherCodeList[idx] !== undefined ? hourlyWeatherCodeList[idx] : 3;
          
          const timeLabel = new Date();
          timeLabel.setDate(timeLabel.getDate() + 1);
          timeLabel.setHours(8 + i * 2, 0, 0, 0);
          const timeStr = formatHourToUser(timeLabel);

          return {
            time: timeStr,
            temp: tempVal,
            icon: getWeatherInfoByCode(codeVal, 24).icon
          };
        });
      }
      return [
        { time: '10:00 am', temp: '20°', icon: <Sun size={24} className="text-amber-500 animate-[spin_50s_linear_infinite]" /> },
        { time: '11:00 am', temp: '21°', icon: <Sun size={24} className="text-amber-500 animate-[spin_50s_linear_infinite]" /> },
        { time: '12:00 pm', temp: '22°', icon: <Cloud size={24} className="text-zinc-400 dark:text-zinc-500" /> },
        { time: '01:00 pm', temp: '21°', icon: <Cloud size={24} className="text-zinc-400 dark:text-zinc-500" /> },
        { time: '02:00 pm', temp: '22°', icon: <Sun size={24} className="text-amber-500 animate-[spin_50s_linear_infinite]" /> },
        { time: '03:00 pm', temp: '23°', icon: <Sun size={24} className="text-amber-500 animate-[spin_50s_linear_infinite]" /> }
      ];
    } else {
      if (hourlyTempList && hourlyTempList.length > 72) {
        return Array.from({ length: 5 }).map((_, i) => {
          const dayLabelDate = new Date();
          dayLabelDate.setDate(dayLabelDate.getDate() + i + 1);
          const dayName = dayLabelDate.toLocaleDateString([], { weekday: 'short' });
          
          const idx = 15 + 24 * (i + 1);
          const tempVal = hourlyTempList[idx] !== undefined ? `${Math.round(hourlyTempList[idx])}°` : '23°';
          const codeVal = hourlyWeatherCodeList && hourlyWeatherCodeList[idx] !== undefined ? hourlyWeatherCodeList[idx] : 3;

          return {
            time: dayName,
            temp: tempVal,
            icon: getWeatherInfoByCode(codeVal, 24).icon
          };
        });
      }
      return [
        { time: 'Mon', temp: '22°', icon: <Sun size={24} className="text-amber-500 animate-[spin_50s_linear_infinite]" /> },
        { time: 'Tue', temp: '19°', icon: <CloudRain size={24} className="text-[#0A84FF]" /> },
        { time: 'Wed', temp: '18°', icon: <CloudLightning size={24} className="text-[#FF453A]" /> },
        { time: 'Thu', temp: '21°', icon: <Cloud size={24} className="text-zinc-400 dark:text-zinc-500" /> },
        { time: 'Fri', temp: '20°', icon: <Cloud size={24} className="text-zinc-400 dark:text-zinc-500" /> },
        { time: 'Sat', temp: '22°', icon: <Sun size={24} className="text-amber-500 animate-[spin_50s_linear_infinite]" /> }
      ];
    }
  }, [subTab, hourlyTempList, hourlyWeatherCodeList]);

  return (
    <div className="w-full flex flex-col font-sans">
      
      {/* 1. Header Section */}
      <div className="flex justify-between items-end mb-6 relative z-10 animate-[fadeInUp_0.2s_ease-out]">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide">Welcome home,</span>
          <h2 className={`text-2xl font-black font-display tracking-tight leading-none mt-1 ${textPrimary}`}>
            {profileName || 'Saad Shaikh'}
          </h2>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`flex items-end justify-center space-x-1 p-2.5 rounded-full active:scale-95 transition-all ${
              isDarkMode ? 'bg-white/[0.04] border border-white/10' : 'bg-zinc-150/60 border border-zinc-200'
            }`}
          >
            <span className="w-0.5 h-3 bg-neutral-600 dark:bg-neutral-400 rounded-full"></span>
            <span className="w-0.5 h-4.5 bg-neutral-600 dark:bg-neutral-400 rounded-full"></span>
            <span className="w-0.5 h-3.5 bg-neutral-600 dark:bg-neutral-400 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* 2. Hero Weather Card */}
      <div className="rounded-[32px] mb-4 relative overflow-hidden h-[200px] shadow-lg">
        {/* Layer 1: Normal Background */}
        <motion.div
          className={`absolute inset-0 z-0 ${
            isDarkMode 
              ? 'bg-[#1C1C1E] border border-white/[0.05]' 
              : 'bg-white border border-zinc-100 shadow-[0_12px_32px_rgba(0,0,0,0.03)]'
          } rounded-[32px]`}
          animate={{ opacity: showEvacuate ? 0 : 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Layer 2: Emergency Alert Background */}
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-to-br from-[#E63946] via-[#D62828] to-[#9B2226] border border-red-500/30 shadow-[0_20px_50px_rgba(230,57,70,0.35)] rounded-[32px]"
          animate={{ opacity: showEvacuate ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="relative z-10 w-full h-full p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={showEvacuate ? "evac" : "normal"}
              initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(3px)" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              {showEvacuate ? (
                <div className="flex flex-col justify-between items-start w-full h-full relative">
                  {/* Ambient inner glow ring */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="flex justify-between items-start w-full relative z-10">
                    <div className="flex flex-col text-left">
                      <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full w-fit">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-[9px] font-black font-mono tracking-widest text-[#FFEB3B] uppercase">
                          SEVERE ALARM ACTIVE
                        </span>
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mt-2 text-white uppercase font-display leading-none select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                        EVACUATE NOW
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-medium text-red-100 mt-1.5 max-w-[240px] leading-snug opacity-95">
                        Critical water surge in your area! Move to safe high ground.
                      </p>
                    </div>
                    
                    <div className="relative group shrink-0">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-amber-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                      <div className="relative p-3 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-white flex items-center justify-center shadow-lg">
                        <Shield size={24} className="text-white fill-white/10 animate-[pulse_2s_infinite]" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Direct life-saving operational navigation button inside the alarm container */}
                  <button
                    onClick={() => {
                      setActiveTab('map');
                    }}
                    className="mt-3 w-full py-2.5 bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all rounded-2xl font-black text-xs tracking-wider uppercase flex items-center justify-center space-x-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.2)] text-[#D62828] pointer-events-auto relative z-10"
                  >
                    <Navigation size={13} className="fill-[#D62828] text-[#D62828]" />
                    <span>Safe Navigation to Shelter</span>
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-start w-full h-full">
                  <div className="flex flex-col text-left justify-between h-full">
                    <div>
                      <span className="text-[11px] font-bold font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                        {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </span>
                      <span className={`text-[17px] font-black tracking-tight mt-1 block ${textPrimary}`}>
                        {getWeatherInfoByCode(liveWeatherCode !== undefined ? liveWeatherCode : (simulateStorm ? 95 : appPhase === 'recovery' ? 2 : 3)).description}
                      </span>
                    </div>
                    <h1 className={`text-6xl font-black font-display tracking-tight flex items-start ${textPrimary}`}>
                      {liveTemp !== undefined ? Math.round(liveTemp) : (simulateStorm ? 14 : appPhase === 'recovery' ? 20 : 18)}
                      <span className="text-2xl font-bold font-display mt-1 ml-0.5">°C</span>
                    </h1>
                  </div>

                  <div className="relative w-28 h-20 select-none pointer-events-none flex items-center justify-end">
                    <div className="p-2">
                      {getWeatherInfoByCode(liveWeatherCode !== undefined ? liveWeatherCode : (simulateStorm ? 95 : appPhase === 'recovery' ? 2 : 3), 64).icon}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

          {/* 3. Weather Metrics Panel */}
          <div className={`p-5 rounded-[28px] mb-6 flex justify-between items-center transition-all duration-300 ${
            showEvacuate
              ? (isDarkMode ? 'bg-[#1C1C1E] border border-red-500/30' : 'bg-white border border-red-200 shadow-[0_8px_24px_rgba(255,69,58,0.05)]')
              : (isDarkMode ? 'bg-[#1C1C1E] border border-white/[0.05]' : 'bg-white border border-zinc-100 shadow-[0_8px_24px_rgba(0,0,0,0.02)]')
          }`}>
            <div className="flex flex-col items-center flex-1">
              <div className={`p-2.5 rounded-full transition-all duration-300 ${
                showEvacuate 
                  ? 'bg-white shadow-sm text-red-500' 
                  : 'bg-zinc-50 dark:bg-white/[0.03] text-zinc-400 dark:text-zinc-400'
              } mb-1.5`}>
                <Navigation size={18} className={`rotate-45 transition-colors duration-300 ${showEvacuate ? 'text-red-500' : 'text-amber-500 dark:text-amber-400'}`} />
              </div>
              <span className={`text-[13px] font-black font-display tracking-tight transition-colors duration-300 ${showEvacuate ? 'text-red-500' : textPrimary}`}>
                {liveWindSpeed !== undefined ? `${Math.round(liveWindSpeed)} km/h` : (simulateStorm ? '24 km/h' : appPhase === 'recovery' ? '8 km/h' : '10 km/h')}
              </span>
              <span className="text-[10px] text-zinc-400 font-bold font-sans tracking-wide mt-0.5">Wind</span>
            </div>

            <div className={`h-10 w-[1px] transition-colors duration-300 ${showEvacuate ? 'bg-red-500/15' : 'bg-zinc-100 dark:bg-white/[0.05]'}`}></div>

            <div className="flex flex-col items-center flex-1">
              <div className={`p-2.5 rounded-full transition-all duration-300 ${
                showEvacuate 
                  ? 'bg-white shadow-sm text-red-500' 
                  : 'bg-zinc-50 dark:bg-white/[0.03]'
              } mb-1.5`}>
                <Droplets size={18} className={`transition-colors duration-300 ${showEvacuate ? 'text-red-500' : 'text-[#0A84FF]'}`} />
              </div>
              <span className={`text-[13px] font-black font-display tracking-tight transition-colors duration-300 ${showEvacuate ? 'text-red-500' : textPrimary}`}>
                {liveHumidity !== undefined ? `${Math.round(liveHumidity)}%` : (simulateStorm ? '100%' : '98%')}
              </span>
              <span className="text-[10px] text-zinc-400 font-bold font-sans tracking-wide mt-0.5">Humidity</span>
            </div>

            <div className={`h-10 w-[1px] transition-colors duration-300 ${showEvacuate ? 'bg-red-500/15' : 'bg-zinc-100 dark:bg-white/[0.05]'}`}></div>

            <div className="flex flex-col items-center flex-1">
              <div className={`p-2.5 rounded-full transition-all duration-300 ${
                showEvacuate 
                  ? 'bg-white shadow-sm text-red-500' 
                  : 'bg-zinc-50 dark:bg-white/[0.03]'
              } mb-1.5`}>
                <CloudRain size={18} className={`transition-colors duration-300 ${showEvacuate ? 'text-red-500' : 'text-[#32D74B] dark:text-[#30D158]'}`} />
              </div>
              <span className={`text-[13px] font-black font-display tracking-tight transition-colors duration-300 ${showEvacuate ? 'text-red-500' : textPrimary}`}>
                {(hourlyProbList && hourlyProbList.length > 3) ? `${hourlyProbList[3]}%` : (simulateStorm ? '100%' : appPhase === 'recovery' ? '20%' : '85%')}
              </span>
              <span className="text-[10px] text-zinc-400 font-bold font-sans tracking-wide mt-0.5">Rain Prob</span>
            </div>
          </div>

          {/* 4. Forecasting Sub-tabs section */}
          <div className="flex space-x-6 mb-4 items-center pl-2 select-none relative z-10">
            <button
              onClick={() => setSubTab('today')}
              className={`text-sm font-extrabold tracking-tight transition-all relative pb-2 ${
                subTab === 'today' ? (isDarkMode ? 'text-white' : 'text-zinc-800') : 'text-zinc-400 dark:text-zinc-600'
              }`}
            >
              Today
              {subTab === 'today' && <span className="block w-1.5 h-1.5 bg-[#0A84FF] rounded-full mx-auto mt-1 absolute left-1/2 -translate-x-1/2 bottom-0"></span>}
            </button>
            
            <button
              onClick={() => setSubTab('tomorrow')}
              className={`text-sm font-extrabold tracking-tight transition-all relative pb-2 ${
                subTab === 'tomorrow' ? (isDarkMode ? 'text-white' : 'text-zinc-800') : 'text-zinc-400 dark:text-zinc-600'
              }`}
            >
              Tomorrow
              {subTab === 'tomorrow' && <span className="block w-1.5 h-1.5 bg-[#0A84FF] rounded-full mx-auto mt-1 absolute left-1/2 -translate-x-1/2 bottom-0"></span>}
            </button>

            <button
              onClick={() => setSubTab('next3')}
              className={`text-sm font-extrabold tracking-tight transition-all relative pb-2 ${
                subTab === 'next3' ? (isDarkMode ? 'text-white' : 'text-zinc-800') : 'text-zinc-400 dark:text-zinc-600'
              }`}
            >
              Next 3 Days
              {subTab === 'next3' && <span className="block w-1.5 h-1.5 bg-[#0A84FF] rounded-full mx-auto mt-1 absolute left-1/2 -translate-x-1/2 bottom-0"></span>}
            </button>
          </div>

          {/* 5. Hourly Forecast vertical capsules */}
          <div className="flex overflow-x-auto no-scrollbar space-x-3 pb-3 select-none mb-4 w-full">
            {displayForecastList.map((item, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 flex flex-col items-center justify-between py-4 rounded-[24px] w-[calc((100%-36px)/4)] min-w-[calc((100%-36px)/4)] h-[126px] border ${
                  isDarkMode 
                    ? 'bg-[#1C1C1E] border-white/[0.05] shadow' 
                    : 'bg-zinc-50 border-zinc-150/45 shadow-[0_4px_12px_rgba(0,0,0,0.015)]'
                }`}
              >
                <span className="text-[11.5px] font-bold tracking-tight text-zinc-400 dark:text-zinc-500">{item.time}</span>
                <div className="my-1.5">
                  {item.icon}
                </div>
                <span className={`text-[13px] font-black font-display ${textPrimary}`}>{item.temp}</span>
              </div>
            ))}
          </div>

          {/* 6. Landscape Scrub Curve Graphic Card - Transparent/Flat, Full-bleed */}
          <div className="flex flex-col select-none transition-all duration-300 mt-6 relative">
            
            <div className="flex justify-between items-center mb-4 relative z-20">
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0A84FF]">Scrub Timeline</span>
                <span className={`text-[13px] font-extrabold tracking-tight mt-0.5 ${textPrimary}`}>Hydro-Telemetry Curve</span>
              </div>
              {/* Beautiful 2-way Neumorphic Slider like Language Button but keeping blue accent/text */}
              <div 
                className={`relative w-[106px] h-[34px] rounded-full flex items-center p-[3px] cursor-pointer transition-all duration-500 overflow-hidden border select-none ${
                  isDarkMode 
                    ? "bg-[#13151a] border-white/5 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.85),_inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.05)]" 
                    : "bg-[#edf2f7] border-black/5 shadow-[inset_3px_3px_6px_#cbd5e1,_inset_-2px_-2px_5px_#ffffff]"
                }`}
              >
                {/* Overlay 2-way touch zones */}
                <div className="absolute inset-0 flex z-30">
                  <button onClick={() => setChartDisplayMode('river')} className="flex-1 h-full outline-none" title="Set Water Level"></button>
                  <button onClick={() => setChartDisplayMode('rainfall')} className="flex-1 h-full outline-none" title="Set Rainfall"></button>
                </div>

                {/* Static background text labels */}
                <div className="absolute inset-0 px-2.5 flex items-center justify-between pointer-events-none select-none z-10 w-full font-display font-black text-[8px] tracking-wider uppercase">
                  <span className={`transition-all duration-300 flex-1 text-center ${chartDisplayMode === 'river' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    WATER
                  </span>
                  <span className={`transition-all duration-300 flex-1 text-center ${chartDisplayMode === 'rainfall' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    RAIN
                  </span>
                </div>

                {/* Neumorphic Sliding Knob */}
                <div 
                  className={`w-[48px] h-[28px] rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute left-[3px] z-20 ${
                    isDarkMode
                      ? "bg-[#1c2025] shadow-[2px_2px_4px_rgba(0,0,0,0.85),_-1px_-1px_3px_rgba(255,255,255,0.07)] text-[#0A84FF]"
                      : "bg-[#f8fafc] shadow-[2px_2px_4px_#cbd5e1,_-2px_-2px_4px_#ffffff] text-[#0A84FF]"
                  }`}
                  style={{
                    transform: chartDisplayMode === 'river' 
                      ? 'translateX(0px)' 
                      : 'translateX(52px)'
                  }}
                >
                  <span className="text-[8.5px] font-black uppercase font-display tracking-wider">
                    {chartDisplayMode === 'river' ? 'WATER' : 'RAIN'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline space-x-1.5 relative z-20 mb-3">
              <span className={`text-4xl font-black font-mono tracking-tight leading-none ${textPrimary}`}>
                {chartDisplayMode === 'rainfall' ? currentPoint.rain.toFixed(1) : currentPoint.depth.toFixed(2)}
              </span>
              <span className={`text-xs font-bold ${textSecondary}`}>
                {chartDisplayMode === 'rainfall' ? 'mm/hr' : 'meters'}
              </span>
            </div>

            <input
              type="range" min="0" max="48" value={scrubHour}
              onChange={(e) => setScrubHour(parseInt(e.target.value))}
              className="timeline-slider w-full mt-2 cursor-pointer z-20"
              style={{
                background: `linear-gradient(to right, #0A84FF ${(scrubHour / 48) * 100}%, ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'} ${(scrubHour / 48) * 100}%)`
              }}
            />

            <div className="flex justify-between items-center text-[8.5px] font-mono font-bold text-zinc-400 mt-2 tracking-widest z-20">
              <span>NOW</span>
              <span>+12H</span>
              <span>+24H</span>
              <span>+36H</span>
              <span>+48H</span>
            </div>

            <div className={`mt-4 p-3.5 rounded-[22px] flex items-start space-x-2.5 z-20 transition-all ${
              isDarkMode ? 'bg-black/20 border-white/[0.04]' : 'bg-zinc-50 border-zinc-150/45'
            } border`}>
              <div className="p-1.5 rounded-full" style={{ backgroundColor: `${currentImpact.color}15`, color: currentImpact.color }}>
                {currentImpact.icon}
              </div>
              <div className="text-left">
                <div className="block text-[10px] font-black uppercase tracking-wider" style={{ color: currentImpact.color }}>
                  {currentImpact.title}
                </div>
                <p className={`text-[11px] leading-relaxed font-bold mt-0.5 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{renderHighlightedText(currentImpact.text, isDarkMode)}</p>
              </div>
            </div>

            {/* Full-bleed Edge to Edge Mountain Wave Curve */}
            <div className="relative h-[130px] select-none pointer-events-auto -mx-6 mt-5 w-[calc(100%+48px)] overflow-hidden">
              <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-0 w-full h-[120px] overflow-visible z-10">
                <defs>
                  <linearGradient id="figmaCurveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isDarkMode ? 'rgba(200, 200, 200, 0.25)' : 'rgba(0, 0, 0, 0.10)'} />
                    <stop offset="100%" stopColor={isDarkMode ? 'rgba(200, 200, 200, 0.05)' : 'rgba(0, 0, 0, 0.02)'} />
                  </linearGradient>
                </defs>

                <path d={dynamicArea} fill="url(#figmaCurveGradient)" className="transition-all duration-300 pointer-events-none" />

                <path 
                  d={dynamicLine} 
                  fill="none" 
                  stroke={isDarkMode ? 'rgba(255,255,255,0.48)' : 'rgba(0,0,0,0.35)'} 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="pointer-events-none" 
                />

                <g transform={`translate(${activeX}, ${activeY})`}>
                  <circle cx="0" cy="0" r="10" fill="transparent" stroke={isDarkMode ? '#ffffff' : '#000000'} strokeWidth="1.5" className="animate-[pulse_2.2s_infinite]" />
                  <circle cx="0" cy="0" r="6" fill="#ffffff" stroke={isDarkMode ? '#333333' : '#AEAEB2'} strokeWidth="1" />
                  <circle cx="0" cy="0" r="2.5" fill={isDarkMode ? '#ffffff' : '#000000'} />
                </g>
              </svg>

              {(() => {
                const percentX = (activeX / 400) * 100;
                const arrowLeft = Math.max(8, Math.min(92, percentX));
                return (
                  <div
                    className="absolute z-20 pointer-events-none"
                    style={{ 
                      left: `${percentX}%`, 
                      transform: `translateX(-${percentX}%)`, 
                      top: `${activeY - 45}px` 
                    }}
                  >
                    <div className="relative">
                      <div className={`px-3 py-1.5 rounded-xl border ${
                        isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-zinc-200'
                      } shadow-lg text-[10px] font-extrabold flex flex-col items-center leading-normal whitespace-nowrap`}>
                        <span className="text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-[8px] font-mono leading-none">{stepTime}</span>
                        <span className={`text-[11px] mt-0.5 font-display ${textPrimary}`}>
                          {chartDisplayMode === 'rainfall' ? `${currentPoint.rain.toFixed(1)} mm` : `${currentPoint.depth.toFixed(2)}m`} ({tempAtPeak}°C)
                        </span>
                      </div>
                      <div 
                        className={`w-1.5 h-1.5 rotate-45 absolute bottom-[-4px] border-r border-b ${
                          isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-zinc-200'
                        }`}
                        style={{ 
                          left: `${arrowLeft}%`, 
                          transform: 'translateX(-50%) rotate(45deg)' 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>

    </div>
  );
};
