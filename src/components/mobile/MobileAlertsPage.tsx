import React from 'react';
import { 
  Bell, HelpCircle, Sparkles, Volume2, ShieldAlert, Clock, 
  MapPin, AlertTriangle, Play, RefreshCw, Star,
  CloudLightning, ShieldCheck, CheckCircle, Loader2, Radio, X
} from 'lucide-react';

interface MobileAlertsPageProps {
  isDarkMode: boolean;
  glassCardClass: string;
  textPrimary: string;
  textSecondary: string;
  t: any;
  sosRequests: any[];
  isGeneratingPlan: boolean;
  handleGenerateActionPlan: () => void;
  handleListenToSatLinkVoice: () => void;
  handleQuickQuestion: (q: string, label: string) => void;
  residentActionPlan: string | null;
  checkedCount: number;
  checklist: any[];
  toggleCheck: (id: string) => void;
  isPlayingAudio: boolean;
  isPreparingVoice: boolean;
  globalAlerts: any[];
  dynamicAccentColor: string;
  aiStatus: string;
  currentLocation: string;
  timeToCritical: string;
  onDismissAlert: (id: string) => void;
}

export const MobileAlertsPage: React.FC<MobileAlertsPageProps> = ({
  isDarkMode,
  glassCardClass,
  textPrimary,
  textSecondary,
  t,
  sosRequests,
  isGeneratingPlan,
  handleGenerateActionPlan,
  handleListenToSatLinkVoice,
  handleQuickQuestion,
  residentActionPlan,
  checkedCount,
  checklist,
  toggleCheck,
  isPlayingAudio,
  isPreparingVoice,
  globalAlerts,
  dynamicAccentColor,
  aiStatus,
  currentLocation,
  timeToCritical,
  onDismissAlert
}) => {
  return (
              <div className={`absolute inset-0 overflow-y-auto pb-40 px-6 pt-24 no-scrollbar animate-[fadeIn_0.4s_ease-out] z-10`}>
                <div className="flex justify-between items-end mb-8 font-sans flex-wrap gap-2">
                  {/* Standardized heading to text-3xl font-extrabold */}
                  <h2 className={`text-3xl font-extrabold font-display tracking-tighter ${textPrimary} drop-shadow-md`}>{t.alerts}</h2>
                  <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full ${isDarkMode ? 'bg-[#0A84FF]/10 border-[#0A84FF]/20' : 'bg-blue-50 border-blue-200'} border`}>
                    <CloudLightning size={14} className={isDarkMode ? 'text-[#0A84FF]' : 'text-blue-700'} />
                    <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-[#0A84FF]' : 'text-blue-700'}`}>Cloud Synced</span>
                  </div>
                </div>

                <div className={`mb-6 p-6 rounded-[32px] flex flex-col relative overflow-hidden transition-all duration-300 shadow-lg border ${isDarkMode ? 'border-white/10 bg-[#1C1C1E]' : 'border-black/5 bg-white'} animate-[fadeInUp_0.35s_ease-out]`}>
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl shadow-sm ${isDarkMode ? 'bg-[#32D74B]/20' : 'bg-green-100'}`}>
                        <ShieldCheck size={20} className={isDarkMode ? 'text-[#32D74B]' : 'text-green-700'} />
                      </div>
                      {/* Standardized typography size to text-base */}
                      <h4 className={`font-bold font-display text-base tracking-tight ${textPrimary}`}>{t.checklistTitle}</h4>
                    </div>
                    {/* Standardized typography size to text-xs with tracking */}
                    <span className={`text-xs font-bold tracking-wider uppercase ${textSecondary}`}>{checkedCount}/{checklist.length} {t.packed}</span>
                  </div>

                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 mb-5">
                    <div className="bg-[#32D74B] h-1.5 rounded-full transition-all duration-500" style={{ width: `${(checkedCount / checklist.length) * 100}%` }}></div>
                  </div>

                  <div className="space-y-3.5">
                    {checklist.map(item => (
                      <div key={item.id} onClick={() => toggleCheck(item.id)} 
                        className={`flex items-center space-x-4 p-3 rounded-2xl cursor-pointer group transition-all duration-300
                          ${item.checked 
                            ? (isDarkMode ? 'bg-[#32D74B]/5 border border-[#32D74B]/10 opacity-75' : 'bg-green-50/40 border border-green-100/50 opacity-75') 
                            : 'border border-transparent'
                          }`}>
                        <div className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center border-2 transition-all duration-300 scale-100 group-active:scale-90
                          ${item.checked ? 'bg-[#32D74B] border-[#32D74B] ' : 'bg-transparent border-gray-400 dark:border-gray-600'}`}>
                          {item.checked ? (
                            <CheckCircle size={14} className="text-white animate-[fadeIn_0.2s_ease-out_forwards]" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-transparent transition-colors" />
                          )}
                        </div>
                        {/* Standardized typography size to text-sm */}
                        <span className={`text-sm font-medium transition-all duration-300 ${item.checked ? 'line-through text-gray-400 dark:text-gray-500 font-normal' : textPrimary}`}>{t[item.key]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="safety-advisor-card" className={`mb-6 p-6 rounded-[32px] flex flex-col relative overflow-hidden transition-all duration-300 shadow-lg border ${isDarkMode ? 'border-[#0A84FF]/30' : 'border-[#0A84FF]/40'} ${glassCardClass} animate-[fadeInUp_0.4s_ease-out]`}>
                  <div className="absolute right-0 top-0 w-32 h-32 bg-[#0A84FF]/10 blur-[40px] rounded-full pointer-events-none"></div>
                  <div className="flex items-center space-x-3 mb-4 relative z-10">
                    <div className={`p-2.5 rounded-2xl shadow-sm ${isDarkMode ? 'bg-[#0A84FF]/20' : 'bg-blue-100'}`}>
                      <Sparkles size={20} className={isDarkMode ? 'text-[#0A84FF]' : 'text-blue-700'} />
                    </div>
                    <div>
                      <h4 className={`font-bold font-display text-[18px] tracking-tight ${textPrimary}`}>Safety Advisor</h4>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <button
                        id="btn-safety-emergency-steps"
                        onClick={() => handleQuickQuestion("What should I do first when river level peaks?", "Emergency Steps")}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-100 border-black/10 text-black'}`}
                      >
                        Emergency steps
                      </button>
                      <button
                        id="btn-safety-driving-limits"
                        onClick={() => handleQuickQuestion("Is standard sedan driving safe in 0.25m water?", "Driving Safety")}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-100 border-black/10 text-black'}`}
                      >
                        Driving limits
                      </button>
                    </div>

                    {!residentActionPlan ? (
                      <div className="space-y-4">
                        <p className={`text-[14px] leading-relaxed font-medium ${textSecondary}`}>
                          Not sure what to do next? Tap below to generate a personalized, real-time safety plan based on your current zone's telemetry data.
                        </p>
                        <button id="btn-generate-safety-plan" onClick={handleGenerateActionPlan} disabled={isGeneratingPlan} className={`w-full py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 shadow-sm disabled:opacity-50 ${isDarkMode ? 'bg-[#0A84FF]/10 text-[#0A84FF]' : 'bg-blue-50 text-blue-700'} font-bold`}>
                          {isGeneratingPlan ? <Loader2 size={20} className="animate-spin" /> : <><Sparkles size={18} /><span>Generate Action Plan</span></>}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className={`rounded-2xl p-4 border shadow-sm ${isDarkMode ? 'bg-black/30 border-white/5' : 'bg-white/50 border-black/5'}`}>
                          <p id="safety-plan-text" className={`text-[14px] leading-relaxed font-medium ${textPrimary} whitespace-pre-line`}>{residentActionPlan}</p>
                        </div>
                        
                        {isPlayingAudio && (
                          <div id="safety-vocalization-status" className="p-4 rounded-2xl flex flex-col space-y-3 bg-[#32D74B]/5 border border-[#32D74B]/15 animate-pulse">
                            <style>{`
                              @keyframes sonicWaveBar {
                                0% { transform: scaleY(0.2); }
                                100% { transform: scaleY(1.4); }
                              }
                            `}</style>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#32D74B] animate-ping" />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Broadcasting Natural Vocalization</span>
                              </div>
                              <span className={`text-[9px] font-mono font-black uppercase tracking-wider ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                                Sat-Link Audio (Direct Synthesis)
                              </span>
                            </div>
                            
                            <div className="flex items-end justify-center space-x-1.5 h-10 w-full overflow-hidden bg-black/10 dark:bg-black/35 rounded-xl px-4 py-2">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((v) => (
                                <div 
                                  key={v}
                                  className="w-1 bg-[#32D74B] rounded-full origin-bottom"
                                  style={{
                                    height: `${30 + Math.sin(v) * 50}%`,
                                    animation: `sonicWaveBar ${0.4 + (v % 4) * 0.15}s ease-in-out infinite alternate`,
                                    animationDelay: `${v * 0.03}s`
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <button id="btn-regenerate-safety-plan" onClick={handleGenerateActionPlan} disabled={isGeneratingPlan} className={`flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#0A84FF]' : 'text-blue-700'}`}>
                            {isGeneratingPlan ? <Loader2 size={16} className="animate-spin" /> : <span>Regenerate Advice</span>}
                          </button>
                          <button
                            id="btn-speak-safety-advice"
                            onClick={handleListenToSatLinkVoice}
                            disabled={isPreparingVoice}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 text-[11px] font-black uppercase tracking-widest ${isPreparingVoice ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed opacity-75' : isDarkMode ? 'bg-green-400/10 text-green-400' : 'bg-green-100 text-green-700'}`}
                          >
                            {isPreparingVoice ? (
                              <>
                                <Loader2 size={13} className="animate-spin text-green-400" />
                                <span>Waiting for Response...</span>
                              </>
                            ) : (
                              <span>{isPlayingAudio ? "Stop Voice" : "Speak Advice"}</span>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {globalAlerts.map((alert, idx) => (
                    <div key={alert.id} className={`p-5 rounded-[32px] flex items-start space-x-4 relative overflow-hidden transition-all duration-300 shadow-md border ${isDarkMode ? 'border-[#FF453A]/30 bg-[#FF453A]/10' : 'border-[#FF453A]/40 bg-[#FF453A]/5'} ${glassCardClass}`} style={{ animation: `fadeInUp ${0.3 + (idx * 0.1)}s ease-out` }}>
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF453A]"></div>
                      <div className="p-3 rounded-2xl bg-[#FF453A]/20 relative z-10">
                        <Radio size={20} className="text-[#FF453A] animate-pulse" />
                      </div>
                      <div className="flex-1 pr-6 pt-0.5 relative z-10">
                        <div className="flex justify-between items-start mb-1.5 pr-2">
                          <h4 className={`font-bold text-[16px] tracking-tight ${textPrimary}`}>{alert.type}</h4>
                          <span className="text-[11px] font-black text-[#FF453A] uppercase tracking-widest px-2 py-1 rounded bg-[#FF453A]/10 mr-6">ADMIN</span>
                        </div>
                        <p className={`text-[14px] leading-relaxed font-medium ${textPrimary} opacity-90 pr-2`}>{alert.message}</p>
                      </div>

                      {/* Swipe or Click to Clear / Dismiss Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDismissAlert(alert.id);
                        }}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 ${textSecondary} hover:${textPrimary} active:scale-90 z-20`}
                        title="Dismiss alert"
                      >
                        <X size={16} className="text-red-500/80 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  ))}

                  <div className={`p-5 rounded-[32px] flex items-start space-x-4 relative overflow-hidden transition-all duration-300 shadow-md ${glassCardClass} animate-[fadeInUp_0.5s_ease-out]`}>
                    <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: dynamicAccentColor }}></div>
                    <div className="p-3 rounded-2xl relative z-10" style={{ backgroundColor: `${dynamicAccentColor}20` }}>
                      {aiStatus === t.safe ? <CheckCircle size={20} style={{ color: dynamicAccentColor }} /> : <AlertTriangle size={20} style={{ color: dynamicAccentColor }} />}
                    </div>
                    <div className="flex-1 pr-2 pt-0.5 relative z-10">
                      <div className="flex justify-between items-start mb-1.5">
                        <h4 className={`font-bold text-[16px] tracking-tight ${textPrimary}`}>
                          {aiStatus === t.safe ? 'Clear Weather' : 'Flood Warning'}
                        </h4>
                        <span className={`text-[11px] font-bold ${textSecondary}`}>Just now</span>
                      </div>
                      <p className={`text-[14px] leading-relaxed font-medium ${textPrimary} opacity-90`}>
                        {aiStatus === t.safe
                          ? `API confirms no significant rainfall in the ${currentLocation} zone. Conditions normal.`
                          : `Telemetry predicts critical overflow in ${timeToCritical} minutes in the ${currentLocation} zone. Please prepare for evacuation.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  );
};
