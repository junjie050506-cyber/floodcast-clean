import React from 'react';
import { 
  LockKeyhole, MapPin, HeartHandshake, FileText, ChevronRight, 
  AlertTriangle, Waves, Droplet, Compass, ChevronDown, Check, Zap,
  Activity, Users, Home, AlertOctagon, Info, Siren, Plus, Minus,
  MessageSquare, Bell, Settings, Eye, HelpCircle, Heart, Phone, Trash2, User, Play, RotateCcw, Volume2, VolumeX,
  ShieldCheck, Truck, ShieldAlert, Radio, UserCheck, CheckCircle, Loader2, Navigation, Shield, CloudLightning
} from 'lucide-react';
import { FigmaWeatherLayout } from '../FigmaWeatherLayout';
import { Sector, SECTORS, IncidentCitizen } from '../eocTypes';

interface MobileHomePageProps {
  isDarkMode: boolean;
  currentLocation: string;
  simulateStorm: boolean;
  appPhase: 'disaster' | 'recovery' | 'monitoring' | 'evacuation';
  glassCardClass: string;
  textPrimary: string;
  textSecondary: string;
  handleTabChange: (tab: string) => void;
  riverLevel: number;
  rainfall: number;
  activeAlertCount: number;
  sosRequests: any[];
  citizens: IncidentCitizen[];
  isVolunteerMode: boolean;
  setIsVolunteerMode: (val: boolean) => void;
  handleAcceptRescue: (id: string) => void;
  handleUpdateMissionStatus: (id: string, status: string) => void;
  handleCancelMySos: () => void;
  hourlyRainList: number[];
  hourlyProbList: number[];
  hourlyTempList: number[];
  hourlyWeatherCodeList: number[];
  liveTemp: number;
  liveWeatherCode: number;
  liveHumidity: number;
  liveWindSpeed: number;
  t: any;
  aiStatus: any;
  showToast: (msg: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  soundBeep: (freq: number, type?: OscillatorType, duration?: number) => void;
  activeMissions: any[];
  setAppPhase: (phase: 'disaster' | 'recovery' | 'monitoring' | 'evacuation') => void;
  setShowHazardModal: (show: boolean) => void;
  setShowJkmModal: (show: boolean) => void;
  isSirenActive: boolean;
  isLeveeDamDeployed: boolean;
  setIsSirenActive: (active: boolean) => void;
  setIsLeveeDamDeployed: (deployed: boolean) => void;
  systemRed: string;
  systemAmber: string;
  systemGreen: string;
  visualTab: string;
  chartDisplayMode: 'rain' | 'level';
  setChartDisplayMode: (mode: 'rain' | 'level') => void;
  currentPoint: any;
  currentImpact: any;
  setAuthError: (err: string) => void;
  setShowAdminPin: (show: boolean) => void;
  myActiveSos: any;
  user: any;
  acceptingId: string | null;
  profileName: string;
  scrubHour: number;
  setScrubHour: (val: number) => void;
}

export const MobileHomePage: React.FC<MobileHomePageProps> = ({
  isDarkMode,
  currentLocation,
  simulateStorm,
  appPhase,
  glassCardClass,
  textPrimary,
  textSecondary,
  handleTabChange,
  riverLevel,
  rainfall,
  activeAlertCount,
  sosRequests,
  citizens,
  isVolunteerMode,
  setIsVolunteerMode,
  handleAcceptRescue,
  handleUpdateMissionStatus,
  handleCancelMySos,
  hourlyRainList,
  hourlyProbList,
  hourlyTempList,
  hourlyWeatherCodeList,
  liveTemp,
  liveWeatherCode,
  liveHumidity,
  liveWindSpeed,
  t,
  aiStatus,
  showToast,
  soundBeep,
  activeMissions,
  setAppPhase,
  setShowHazardModal,
  setShowJkmModal,
  isSirenActive,
  isLeveeDamDeployed,
  setIsSirenActive,
  setIsLeveeDamDeployed,
  systemRed,
  systemAmber,
  systemGreen,
  visualTab,
  chartDisplayMode,
  setChartDisplayMode,
  currentPoint,
  currentImpact,
  setAuthError,
  setShowAdminPin,
  myActiveSos,
  user,
  acceptingId,
  profileName,
  scrubHour,
  setScrubHour
}) => {
  return (
              <div className="absolute inset-0 overflow-y-auto pb-40 px-6 pt-24 no-scrollbar animate-[fadeIn_0.4s_ease-out] z-10">

                <div className="flex justify-between items-center mb-4 relative z-10 animate-[fadeInUp_0.15s_ease-out] flex-wrap gap-2">
                  <div 
                    onClick={() => handleTabChange('settings')}
                    className={`flex items-center space-x-1.5 ${textSecondary} text-xs font-bold cursor-pointer transition-all active:scale-95`}
                    title="Go to Settings"
                  >
                    <MapPin size={13} className="text-[#0A84FF]" />
                    <span>{currentLocation}</span>
                  </div>
                  <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full ${isDarkMode ? 'bg-white/[0.04]' : 'bg-black/[0.03]'} text-[10px] font-black uppercase tracking-widest`}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${simulateStorm ? 'bg-[#FF453A]' : 'bg-[#32D74B]'}`}></span>
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${simulateStorm ? 'bg-[#FF453A]' : 'bg-[#32D74B]'}`}></span>
                    </span>
                    <span className={textPrimary}>{simulateStorm ? 'SIMULATION' : 'LIVE'}</span>
                  </div>
                </div>

                {appPhase === 'recovery' && (
                  <div className="space-y-4 mb-6 animate-[fadeInUp_0.3s_ease-out]">
                    <div className={`col-span-2 rounded-[32px] p-6 text-center relative overflow-hidden transition-all duration-500 ${glassCardClass} border border-[#0A84FF]/30`}>
                      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A84FF] to-[#005bb5] absolute inset-0 text-white flex flex-col justify-center items-center p-8 z-20 font-sans">
                        <HeartHandshake size={40} className="mb-3 drop-shadow-md" />
                        {/* Standardized size to text-3xl or text-4xl */}
                        <h1 className="text-4xl font-extrabold font-display tracking-tighter leading-tight mb-2 drop-shadow-lg text-white">RECOVERY PHASE</h1>
                        {/* Standardized text size to text-sm */}
                        <p className="text-sm font-bold opacity-90 tracking-wide text-white drop-shadow-sm">Water receding. Safe to proceed with cleanup.</p>
                      </div>
                      <div className="h-40"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button className={`p-5 rounded-[32px] ${glassCardClass} flex flex-col items-center justify-center space-y-3 transition-transform active:scale-95`}>
                        <div className="p-3 rounded-full bg-[#32D74B]/20 text-[#32D74B]"><FileText size={24} /></div>
                        {/* Standardized to text-sm */}
                        <span className={`text-sm font-bold ${textPrimary}`}>Bantuan Banjir</span>
                      </button>
                      <button className={`p-5 rounded-[32px] ${glassCardClass} flex flex-col items-center justify-center space-y-3 transition-transform active:scale-95`}>
                        <div className="p-3 rounded-full bg-[#FF9F0A]/20 text-[#FF9F0A]"><ShieldCheck size={24} /></div>
                        {/* Standardized to text-sm */}
                        <span className={`text-sm font-bold ${textPrimary}`}>Insurance Claims</span>
                      </button>
                      <button className={`col-span-2 p-5 rounded-[32px] ${glassCardClass} flex items-center justify-between transition-transform active:scale-95`}>
                        <div className="flex items-center space-x-3">
                          <div className="p-3 rounded-full bg-[#0A84FF]/20 text-[#0A84FF]"><Truck size={22} /></div>
                          <div className="text-left">
                            {/* Standardized custom text-sizes */}
                            <span className={`block text-sm font-bold ${textPrimary}`}>Cleanup Resources</span>
                            <span className={`block text-xs font-medium ${textSecondary}`}>Request debris removal</span>
                          </div>
                        </div>
                        <ChevronRight size={20} className={textSecondary} />
                      </button>
                    </div>
                  </div>
                )}

                {isVolunteerMode && myActiveSos && appPhase !== 'recovery' && (
                  <div className={`mb-6 rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'border-[#0A84FF]/40 bg-[#0A84FF]/10' : 'border-[#0A84FF]/40 bg-[#0A84FF]/20'} animate-[fadeInUp_0.25s_ease-out] backdrop-blur-xl`}>
                    <div className="p-5 flex items-center justify-between border-b border-[#0A84FF]/20 bg-[#0A84FF]/20 font-sans">
                      <div className="flex items-center space-x-2">
                        <ShieldAlert size={20} className="text-[#0A84FF]" />
                        <span className={`font-black text-lg ${textPrimary} tracking-tight`}>Active Rescue Mission</span>
                      </div>
                      <span className="bg-[#0A84FF] text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-full">{myActiveSos.status.replace('_', ' ')}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-4 font-sans">
                        <div className="flex flex-col">
                          <span className="text-[#0A84FF] font-black text-xs uppercase tracking-widest">Target Location</span>
                          <span className={`font-bold text-sm ${textPrimary}`}>{myActiveSos.zone} Area</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Requested</span>
                          {/* Checked: Clocks and timestamps use monospace */}
                          <span className={`font-bold text-xs ${textPrimary} font-mono bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded`}>{new Date(myActiveSos.timestamp && typeof myActiveSos.timestamp.toDate === 'function' ? myActiveSos.timestamp.toDate() : (myActiveSos.timestamp || Date.now())).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {myActiveSos.status === 'ACCEPTED' && (
                          <button onClick={() => handleUpdateMissionStatus('EN_ROUTE')} className="flex-1 py-3 rounded-full bg-[#0A84FF] text-white font-black text-sm shadow-md transition-transform active:scale-95">Mark En Route</button>
                        )}
                        {myActiveSos.status === 'EN_ROUTE' && (
                          <button onClick={() => handleUpdateMissionStatus('ARRIVED')} className="flex-1 py-3 rounded-full bg-[#FF9F0A] text-white font-black text-sm shadow-md transition-transform active:scale-95">Mark Arrived</button>
                        )}
                        {myActiveSos.status === 'ARRIVED' && (
                          <button onClick={() => handleUpdateMissionStatus('RESOLVED')} className="flex-1 py-3 rounded-full bg-[#32D74B] text-white font-black text-sm shadow-md transition-transform active:scale-95">Mark Secured (Resolved)</button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {!isVolunteerMode && myActiveSos && myActiveSos.userId === (user?.uid || 'guest_resident') && appPhase !== 'recovery' && (
                  <div className={`mb-6 rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'border-[#FF453A]/40 bg-[#FF453A]/10' : 'border-[#FF453A]/40 bg-[#FF453A]/20'} animate-[fadeInUp_0.25s_ease-out] backdrop-blur-xl`}>
                    <div className="p-6 text-center space-y-3 font-sans">
                      <Radio size={36} className="text-[#FF453A] mx-auto animate-pulse" />
                      {/* Standardized text-[20px] to text-xl */}
                      <h3 className={`text-xl font-bold font-display ${textPrimary}`}>S.O.S Broadcast Active</h3>
                      {/* Standardized text-[14px] to text-sm */}
                      <p className={`text-sm font-medium ${textPrimary} opacity-90`}>
                        {myActiveSos.status === 'PENDING' ? 'Waiting for a responder to accept your request...' :
                          myActiveSos.status === 'EN_ROUTE' ? 'Responder is EN ROUTE to your location. Stay safe.' :
                            myActiveSos.status === 'ARRIVED' ? 'Responder has ARRIVED at your location.' : 'Help is on the way.'}
                      </p>
                      <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 mt-2">
                        <div className="bg-[#FF453A] h-1.5 rounded-full transition-all duration-500"
                          style={{ width: myActiveSos.status === 'PENDING' ? '33%' : myActiveSos.status === 'EN_ROUTE' ? '66%' : '100%' }}></div>
                      </div>
                      
                      <button 
                        onClick={handleCancelMySos}
                        className="mt-2 w-full py-3 rounded-full bg-[#FF453A] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                      >
                        Deactivate / Turn Off S.O.S
                      </button>
                    </div>
                  </div>
                )}

                {isVolunteerMode && !myActiveSos && appPhase !== 'recovery' && (
                  <div className={`mb-6 rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'border-[#FF9F0A]/30 bg-[#FF9F0A]/10' : 'border-[#FF9F0A]/40 bg-[#FF9F0A]/20'} animate-[fadeInUp_0.25s_ease-out] backdrop-blur-xl`}>
                    <div className="p-5 flex items-center justify-between border-b border-[#FF9F0A]/20">
                      <div className="flex items-center space-x-2">
                        <UserCheck size={20} className="text-[#FF9F0A]" />
                        <span className={`font-black text-lg ${textPrimary} tracking-tight`}>{t.activeMissions}</span>
                      </div>
                      <span className="bg-[#FF9F0A] text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-full">{sosRequests.filter(s => s.status === 'PENDING').length} Pending</span>
                    </div>
                    <div className="p-5 space-y-3">
                      {sosRequests.filter(s => s.status === 'PENDING').length === 0 ? (
                        <div className="text-center py-4 opacity-70">
                          <CheckCircle size={24} className="mx-auto mb-2 text-[#32D74B]" />
                          <span className={`text-sm font-bold ${textPrimary}`}>No active civilian requests.</span>
                        </div>
                      ) : (
                        sosRequests.filter(s => s.status === 'PENDING').map(sos => (
                          <div key={sos.id} className={`p-4 rounded-[32px] ${isDarkMode ? 'bg-[#1C1C1E]' : 'bg-white'} shadow-sm`}>
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex flex-col">
                                <span className="text-[#FF453A] font-black text-xs uppercase tracking-widest">S.O.S Triggered</span>
                                <span className={`font-bold text-sm ${textPrimary}`}>{sos.zone} Area</span>
                              </div>
                              {/* Numeric time text uses font-mono */}
                              <span className="text-xs font-mono font-bold text-gray-500">{new Date(sos.timestamp && typeof sos.timestamp.toDate === 'function' ? sos.timestamp.toDate() : (sos.timestamp || Date.now())).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <button 
                              onClick={() => handleAcceptRescue(sos.id)} 
                              disabled={acceptingId !== null}
                              className="w-full py-3 rounded-full bg-[#FF9F0A] text-white font-black text-sm flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-md disabled:opacity-75"
                            >
                              {acceptingId === sos.id ? (
                                <div className="flex items-center space-x-2">
                                  <Loader2 size={16} className="animate-spin text-white" />
                                  <span>Waiting for Response Accept...</span>
                                </div>
                              ) : (
                                <>
                                  <Navigation size={16} /><span>{t.acceptTask}</span>
                                </>
                              )}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                <FigmaWeatherLayout
                  isDarkMode={isDarkMode}
                  profileName={profileName}
                  currentLocation={currentLocation}
                  simulateStorm={simulateStorm}
                  appPhase={appPhase}
                  scrubHour={scrubHour}
                  setScrubHour={setScrubHour}
                  chartDisplayMode={chartDisplayMode}
                  setChartDisplayMode={setChartDisplayMode}
                  currentPoint={currentPoint}
                  currentImpact={currentImpact}
                  setActiveTab={handleTabChange}
                  textPrimary={textPrimary}
                  textSecondary={textSecondary}
                  systemRed={systemRed}
                  t={t}
                  liveTemp={liveTemp}
                  liveHumidity={liveHumidity}
                  liveWindSpeed={liveWindSpeed}
                  liveWeatherCode={liveWeatherCode}
                  hourlyTempList={hourlyTempList}
                  hourlyWeatherCodeList={hourlyWeatherCodeList}
                  hourlyRainList={hourlyRainList}
                  hourlyProbList={hourlyProbList}
                />

                <div className="animate-[fadeInUp_0.6s_ease-out] mt-2">
                  <button
                    onClick={() => {
                      if (!user) return;
                      showToast('Route cached for offline use.', 'success');
                      handleTabChange('map');
                    }}
                    className={`w-full py-5 rounded-[28px] flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 shadow-xl border-t border-white/20
                      ${aiStatus === t.safe && appPhase !== 'recovery' ? 'opacity-60 cursor-not-allowed border-transparent' : ''}`}
                    disabled={aiStatus === t.safe && appPhase !== 'recovery'}
                    style={{ backgroundColor: aiStatus === t.safe && appPhase !== 'recovery' ? (isDarkMode ? '#1C1C1E' : '#E5E5EA') : systemRed, boxShadow: aiStatus === t.safe && appPhase !== 'recovery' ? 'none' : (isDarkMode ? '0 15px 35px -5px rgba(255, 69, 58, 0.5)' : '0 15px 35px -5px rgba(255, 59, 48, 0.4)') }}
                  >
                    <Shield size={22} className={aiStatus === t.safe && appPhase !== 'recovery' ? textSecondary : 'text-white'} />
                    {/* Standardized typography size to text-base */}
                    <span className={`font-black text-base tracking-wide ${aiStatus === t.safe && appPhase !== 'recovery' ? textSecondary : 'text-white'}`}>{aiStatus === t.safe && appPhase !== 'recovery' ? t.evacNotReq : t.viewRoutes}</span>
                  </button>
                  <div className="text-center mt-3">
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${textSecondary}`}>
                      <CloudLightning size={10} className="inline mr-1 mb-0.5" /> Automatically cached for offline use
                    </span>
                  </div>
                </div>
              </div>
  );
};
