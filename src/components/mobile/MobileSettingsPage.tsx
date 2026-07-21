import React from 'react';
import { 
  Settings, User, MapPin, Shield, Info, LogOut, Globe, Languages,
  Siren, Bell, Eye, Volume2, ShieldAlert, ChevronRight, Sun, Moon, Clock, CloudRain
} from 'lucide-react';

interface MobileSettingsPageProps {
  isDarkMode: boolean;
  glassCardClass: string;
  textPrimary: string;
  textSecondary: string;
  t: any;
  currentLocation: string;
  profileName: string;
  profileEmail: string;
  profileCountry: string;
  profilePhone: string;
  profileAvatar: string;
  setTempProfileName: (val: string) => void;
  setTempProfileEmail: (val: string) => void;
  setTempProfileCountry: (val: string) => void;
  setTempProfilePhone: (val: string) => void;
  setTempProfileAvatar: (val: string) => void;
  setShowProfileEditModal: (val: boolean) => void;
  locationMode: 'auto' | 'manual';
  setLocationMode: (val: 'auto' | 'manual') => void;
  fetchLiveLocation: () => void;
  setShowLocationModal: (val: boolean) => void;
  handleLogout: () => void;
  isSirenActive: boolean;
  isLeveeDamDeployed: boolean;
  setIsSirenActiveWithSync: (val: boolean) => void;
  setIsLeveeDamDeployedWithSync: (val: boolean) => void;
  setAuthError: (val: string) => void;
  setShowAdminPin: (val: boolean) => void;
  simulateStorm: boolean;
  rainfall: number;
  riverLevel: number;
  showToast: (msg: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  soundBeep: (freq: number, type?: OscillatorType, duration?: number) => void;
  language: string;
  setLanguage: (lang: string) => void;
  systemRed: string;
  systemAmber: string;
  systemGreen: string;
  changeLanguage: (lang: string) => void;
  themeMode: string;
  changeThemeMode: (mode: 'light' | 'dark' | 'auto') => void;
  toggleNotifications: () => void;
  notificationsEnabled: boolean;
  toggleSimulateStorm: () => void;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const renderAvatar = (avatarValue: string, name: string, sizeClass = "w-16 h-16 text-xl", shrink = true) => {
  if (avatarValue?.startsWith('custom:')) {
    const src = avatarValue.substring(7);
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden border border-white/10 dark:border-white/20 shadow-lg ${shrink ? 'shrink-0' : ''} bg-black/5 flex items-center justify-center`}>
        <img src={src} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
      </div>
    );
  }

  if (avatarValue?.startsWith('emoji:')) {
    const textCode = avatarValue.substring(6);
    const EMOJI_MAP: Record<string, string> = {
      'AT': '👨‍🚀',
      'RS': '👷',
      'MD': '🧑‍⚕️',
      'OB': '👁️',
      'KL': '🐨',
      'CT': '🐱'
    };
    const emojiToShow = EMOJI_MAP[textCode] || textCode;
    const isRealEmoji = !!EMOJI_MAP[textCode];
    const customGradients = [
      'from-orange-400 to-red-500',
      'from-pink-500 to-rose-600',
      'from-teal-400 to-emerald-600',
      'from-amber-400 to-orange-600',
      'from-fuchsia-500 to-purple-700',
      'from-blue-400 to-indigo-500',
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const bgGrad = customGradients[hash % customGradients.length];
    return (
      <div className={`${sizeClass} rounded-full bg-gradient-to-tr ${bgGrad} flex items-center justify-center shadow-lg ${shrink ? 'shrink-0' : ''}`}>
        <span className={`select-none leading-none ${isRealEmoji ? 'text-2xl' : 'text-xs font-black text-white'}`}>{emojiToShow}</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-tr from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center shadow-lg ${shrink ? 'shrink-0' : ''}`}>
      <span className="text-white font-black">{getInitials(name || 'User')}</span>
    </div>
  );
};

export const MobileSettingsPage: React.FC<MobileSettingsPageProps> = ({
  isDarkMode,
  glassCardClass,
  textPrimary,
  textSecondary,
  t,
  currentLocation,
  profileName,
  profileEmail,
  profileCountry,
  profilePhone,
  profileAvatar,
  setTempProfileName,
  setTempProfileEmail,
  setTempProfileCountry,
  setTempProfilePhone,
  setTempProfileAvatar,
  setShowProfileEditModal,
  locationMode,
  setLocationMode,
  fetchLiveLocation,
  setShowLocationModal,
  handleLogout,
  isSirenActive,
  isLeveeDamDeployed,
  setIsSirenActiveWithSync,
  setIsLeveeDamDeployedWithSync,
  setAuthError,
  setShowAdminPin,
  simulateStorm,
  rainfall,
  riverLevel,
  showToast,
  soundBeep,
  language,
  setLanguage,
  systemRed,
  systemAmber,
  systemGreen,
  changeLanguage,
  themeMode,
  changeThemeMode,
  toggleNotifications,
  notificationsEnabled,
  toggleSimulateStorm
}) => {
  return (
              <div className={`absolute inset-0 overflow-y-auto pb-40 px-6 pt-24 no-scrollbar animate-[fadeIn_0.4s_ease-out] z-10`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-[36px] font-black font-display tracking-tighter ${textPrimary} drop-shadow-md`}>{t.settings}</h2>
                </div>

                <div 
                  onClick={() => {
                    setTempProfileName(profileName);
                    setTempProfileEmail(profileEmail);
                    setTempProfileCountry(profileCountry);
                    setTempProfilePhone(profilePhone);
                    setTempProfileAvatar(profileAvatar);
                    setShowProfileEditModal(true);
                  }}
                  className={`p-5 rounded-[28px] flex items-center justify-between shadow-sm cursor-pointer transition-all active:scale-[0.99] group ${glassCardClass} mb-8 animate-[fadeInUp_0.3s_ease-out]`}
                >
                  <div className="flex items-center space-x-4">
                    {renderAvatar(profileAvatar, profileName, "w-16 h-16 text-xl")}
                    <div>
                      <h3 className={`font-bold font-display text-[20px] tracking-tight ${textPrimary} transition-colors line-clamp-1`}>{profileName}</h3>
                      <p className={`text-[13px] font-medium mt-0.5 ${textSecondary} line-clamp-1`}>{profileEmail}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                        <span className="inline-block px-2 py-0.5 rounded bg-[#0A84FF]/10 text-[9px] font-black text-[#0A84FF] uppercase tracking-widest">{profileCountry}</span>
                        <span className={`inline-block px-2 py-0.5 rounded ${isDarkMode ? 'bg-white/10' : 'bg-black/5'} text-[9px] font-black uppercase tracking-widest ${textSecondary}`}>Role: Resident</span>
                        {profilePhone && <span className={`inline-block px-2 py-0.5 rounded ${isDarkMode ? 'bg-white/10' : 'bg-black/5'} text-[9px] font-mono opacity-80 ${textSecondary}`}>{profilePhone}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5 bg-gray-500/10 rounded-full text-gray-400 transition-colors shrink-0">
                    <ChevronRight size={16} />
                  </div>
                </div>

                <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">

                  <div>
                    <h4 className={`text-[11px] font-black uppercase tracking-widest mb-2 ml-4 ${textSecondary}`}>{t.prefs}</h4>
                    <div className={`rounded-[32px] overflow-hidden shadow-sm ${glassCardClass} flex flex-col`}>
                      <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b gap-3 md:gap-0 ${isDarkMode ? 'border-white/10' : 'border-black/5'}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-xl bg-[#5E5CE6]`}>
                            <Globe size={18} className="text-white" />
                          </div>
                          {/* Standardized typography size to text-sm */}
                          <span className={`font-semibold text-sm tracking-tight ${textPrimary}`}>{t.lang}</span>
                        </div>
                        {/* Beautiful Neumorphic Language Slider */}
                        <div 
                          className={`relative w-[150px] h-[42px] rounded-full flex items-center p-1 cursor-pointer transition-all duration-500 overflow-hidden border select-none ${
                            isDarkMode 
                              ? "bg-[#13151a] border-white/5 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.8),_inset_-2px_-2px_6px_rgba(255,255,255,0.05)]" 
                              : "bg-[#edf2f7] border-black/5 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-3px_-3px_7px_#ffffff]"
                          }`}
                        >
                          {/* Overlay 3-way touch zones */}
                          <div className="absolute inset-0 flex z-30">
                            <button onClick={() => changeLanguage('ms')} className="flex-1 h-full outline-none" title="Set BM"></button>
                            <button onClick={() => changeLanguage('en')} className="flex-1 h-full outline-none" title="Set EN"></button>
                            <button onClick={() => changeLanguage('cn')} className="flex-1 h-full outline-none" title="Set CN"></button>
                          </div>

                          {/* Static background text labels */}
                          <div className="absolute inset-0 px-3.5 flex items-center justify-between pointer-events-none select-none z-10 w-full font-black text-[10px] tracking-wider font-sans uppercase">
                            <span className={`transition-all duration-300 flex-1 text-center ${language === 'ms' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              BM
                            </span>
                            <span className={`transition-all duration-300 flex-1 text-center ${language === 'en' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              EN
                            </span>
                            <span className={`transition-all duration-300 flex-1 text-center ${language === 'cn' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              CN
                            </span>
                          </div>

                          {/* Neumorphic Sliding Knob */}
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute top-[4px] left-[4px] z-20 ${
                              isDarkMode
                                ? "bg-[#1c2025] shadow-[3px_3px_6px_rgba(0,0,0,0.85),_-2px_-2px_6px_rgba(255,255,255,0.07)] text-[#FF9F0A]"
                                : "bg-[#f8fafc] shadow-[2.5px_2.5px_5px_#cbd5e1,_-2.5px_-2.5px_5px_#ffffff] text-[#0A84FF]"
                            }`}
                            style={{
                              transform: language === 'ms' 
                                ? 'translateX(0px)' 
                                : language === 'en' 
                                  ? 'translateX(55px)' 
                                  : 'translateX(110px)'
                            }}
                          >
                            <span className="text-[10px] font-black uppercase font-sans tracking-wider">
                              {language === 'ms' ? 'BM' : language === 'en' ? 'EN' : 'CN'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b gap-3 md:gap-0 ${isDarkMode ? 'border-white/10' : 'border-black/5'}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-800'}`}>
                            {themeMode === 'light' ? (
                              <Sun size={18} className="text-white" />
                            ) : themeMode === 'dark' ? (
                              <Moon size={18} className="text-white" />
                            ) : (
                              <Clock size={18} className="text-white" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className={`font-semibold text-sm tracking-tight ${textPrimary}`}>{t.themeLabel}</span>
                            {themeMode === 'auto' && (
                              <span className="text-[10px] text-gray-400 font-medium tracking-tight mt-0.5 animate-pulse">
                                {new Date().getHours() >= 7 && new Date().getHours() < 19 ? 'Light (7am - 7pm)' : 'Dark (7pm - 7am)'}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* Beautiful Neumorphic Theme Slider */}
                        <div 
                          className={`relative w-[150px] h-[42px] rounded-full flex items-center p-1 cursor-pointer transition-all duration-500 overflow-hidden border select-none ${
                            isDarkMode 
                              ? "bg-[#13151a] border-white/5 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.8),_inset_-2px_-2px_6px_rgba(255,255,255,0.05)]" 
                              : "bg-[#edf2f7] border-black/5 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-3px_-3px_7px_#ffffff]"
                          }`}
                        >
                          {/* Overlay 3-way touch zones */}
                          <div className="absolute inset-0 flex z-30">
                            <button onClick={() => changeThemeMode('light')} className="flex-1 h-full outline-none" title="Set Light Theme"></button>
                            <button onClick={() => changeThemeMode('auto')} className="flex-1 h-full outline-none" title="Set Auto Theme"></button>
                            <button onClick={() => changeThemeMode('dark')} className="flex-1 h-full outline-none" title="Set Dark Theme"></button>
                          </div>

                          {/* Static background text labels */}
                          <div className="absolute inset-0 px-3.5 flex items-center justify-between pointer-events-none select-none z-10 w-full font-black text-[10px] tracking-tight font-sans uppercase">
                            <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'light' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {t.themeLight}
                            </span>
                            <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'auto' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {t.themeAuto}
                            </span>
                            <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'dark' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {t.themeDark}
                            </span>
                          </div>

                          {/* Neumorphic Sliding Knob */}
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute top-[4px] left-[4px] z-20 ${
                              isDarkMode
                                ? "bg-[#1c2025] shadow-[3px_3px_6px_rgba(0,0,0,0.85),_-2px_-2px_6px_rgba(255,255,255,0.07)] text-[#FF9F0A]"
                                : "bg-[#f8fafc] shadow-[2.5px_2.5px_5px_#cbd5e1,_-2.5px_-2.5px_5px_#ffffff] text-[#0A84FF]"
                            }`}
                            style={{
                              transform: themeMode === 'light' 
                                ? 'translateX(0px)' 
                                : themeMode === 'auto' 
                                  ? 'translateX(55px)' 
                                  : 'translateX(110px)'
                            }}
                          >
                            {themeMode === 'light' ? (
                              <Sun size={15} strokeWidth={2.5} className="animate-[spin_12s_linear_infinite]" />
                            ) : themeMode === 'dark' ? (
                              <Moon size={15} strokeWidth={2.5} />
                            ) : (
                              <Clock size={15} strokeWidth={2.5} className="animate-[pulse_2s_ease-in-out_infinite]" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className={`flex items-center justify-between p-4 ${isDarkMode ? 'border-white/10' : 'border-black/5'}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-xl bg-[#30B0C7]`}>
                            <MapPin size={18} className="text-white" />
                          </div>
                          <div className="flex flex-col">
                            <span className={`font-semibold text-sm tracking-tight ${textPrimary}`}>{t.fetchLoc}</span>
                            <span className={`text-[10px] ${textSecondary} font-medium tracking-tight mt-0.5`}>
                              Current: {currentLocation}
                            </span>
                          </div>
                        </div>
                        {/* Beautiful Neumorphic Location Slider */}
                        <div 
                          className={`relative w-[110px] h-[42px] rounded-full flex items-center p-1 cursor-pointer transition-all duration-500 overflow-hidden border select-none ${
                            isDarkMode 
                              ? "bg-[#13151a] border-white/5 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.8),_inset_-2px_-2px_6px_rgba(255,255,255,0.05)]" 
                              : "bg-[#edf2f7] border-black/5 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-3px_-3px_7px_#ffffff]"
                          }`}
                        >
                          {/* Overlay 2-way touch zones */}
                          <div className="absolute inset-0 flex z-30">
                            <button onClick={() => { setLocationMode('auto'); fetchLiveLocation(); }} className="flex-1 h-full outline-none" title="Set Auto Mode"></button>
                            <button onClick={() => { setLocationMode('manual'); setShowLocationModal(true); }} className="flex-1 h-full outline-none" title="Set Manual Mode"></button>
                          </div>

                          {/* Static background text labels */}
                          <div className="absolute inset-0 px-2 flex items-center justify-between pointer-events-none select-none z-10 w-full font-black text-[10px] tracking-tight font-sans uppercase">
                            <span className={`transition-all duration-300 flex-1 text-center ${locationMode === 'auto' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              AUTO
                            </span>
                            <span className={`transition-all duration-300 flex-1 text-center ${locationMode === 'manual' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              MANUAL
                            </span>
                          </div>

                          {/* Neumorphic Sliding Knob */}
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute top-[4px] left-[4px] z-20 ${
                              isDarkMode
                                ? "bg-[#1c2025] shadow-[3px_3px_6px_rgba(0,0,0,0.85),_-2px_-2px_6px_rgba(255,255,255,0.07)] text-[#0A84FF]"
                               : "bg-[#f8fafc] shadow-[2.5px_2.5px_5px_#cbd5e1,_-2.5px_-2.5px_5px_#ffffff] text-[#0A84FF]"
                            }`}
                            style={{
                              transform: locationMode === 'auto' 
                                ? 'translateX(0px)' 
                                : 'translateX(70px)'
                            }}
                          >
                            <MapPin size={15} className={isDarkMode ? "text-[#0A84FF] fill-[#0A84FF]/20" : "text-[#0A84FF] fill-[#0A84FF]/10"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-[11px] font-black uppercase tracking-widest mb-2 ml-4 ${textSecondary}`}>{t.demoMode}</h4>
                    <div className={`rounded-[32px] overflow-hidden shadow-sm ${glassCardClass} flex flex-col`}>
                      {/* Simulate Storm Toggle */}
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-xl bg-[#ff453a]/10 text-[#ff453a]`}>
                            <CloudRain size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className={`font-semibold text-sm tracking-tight ${textPrimary}`}>{t.simStorm}</span>
                            <span className="text-[10px] text-zinc-400 font-medium tracking-tight mt-0.5">
                              {simulateStorm ? "Active Emergency Mode" : "Normal Mode"}
                            </span>
                          </div>
                        </div>
                        <button onClick={toggleSimulateStorm} className={`w-12 h-7 rounded-full transition-colors relative flex items-center px-0.5 shadow-inner ${simulateStorm ? 'bg-[#ff453a]' : 'bg-gray-400 dark:bg-gray-600'}`}>
                          <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform ${simulateStorm ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button onClick={handleLogout} className={`w-full p-4 rounded-[32px] flex items-center justify-center space-x-2 active:scale-95 transition-all shadow-sm ${glassCardClass}`}>
                    <LogOut size={18} style={{ color: systemRed }} />
                    {/* Standardized typography size to text-sm */}
                    <span className="font-bold text-sm tracking-wide" style={{ color: systemRed }}>{t.logout}</span>
                  </button>

                  <div className="text-center mt-8 pb-4">
                    <p className={`text-[13px] font-bold tracking-tight ${textPrimary}`}>Project FloodCast</p>
                    <p className={`text-[11px] font-medium ${textSecondary} mt-0.5 uppercase tracking-widest`}>Version 1.0</p>
                  </div>
                </div>
              </div>
  );
};
