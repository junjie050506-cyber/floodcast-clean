import React from 'react';
import { 
  MapPin, Search, X, ShieldAlert, Navigation, Eye, EyeOff, 
  Car, Footprints, ChevronDown, ChevronUp, Phone, Tent, Map, Sparkles, AlertTriangle,
  Loader2, AlertOctagon, LifeBuoy, CloudLightning, ChevronLeft, Users, ShieldCheck, Shield, Info
} from 'lucide-react';
import { IncidentCitizen } from '../eocTypes';

interface MobileMapPageProps {
  isDarkMode: boolean;
  currentLocation: string;
  glassCardClass: string;
  textPrimary: string;
  textSecondary: string;
  t: any;
  baseShelters: any[];
  simulateStorm: boolean;
  rainfall: number;
  riverLevel: number;
  mapSearchQuery: string;
  setMapSearchQuery: (val: string) => void;
  interactiveMapShelterId: string | null;
  setInteractiveMapShelterId: (val: string | null) => void;
  mapSearchResults: any[];
  setMapSearchResults: (val: any[]) => void;
  setCurrentLocation: (val: string) => void;
  setCurrentCoords: (val: { lat: number; lon: number }) => void;
  setLocationMode: (val: 'auto' | 'manual') => void;
  setShowHazardModal: (val: boolean) => void;
  showCycloneOverlay: boolean;
  setShowCycloneOverlay: (val: boolean) => void;
  travelMode: 'drive' | 'walk';
  setTravelMode: (val: 'drive' | 'walk') => void;
  showAllCentersOnMap: boolean;
  setShowAllCentersOnMap: (val: boolean) => void;
  handleStartNavigation: () => void;
  showRouteSteps: boolean;
  setShowRouteSteps: (val: boolean) => void;
  shelterTagFilter: string;
  setShelterTagFilter: (val: string) => void;
  getShelterOccupancy: (shelter: any) => { cap: number; pct: number };
  showToast: (msg: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  isVolunteerMode: boolean;
  isSirenActive: boolean;
  isLeveeDamDeployed: boolean;
  sosRequests: any[];
  activeMissions: any[];
  myActiveSosRequest: any;
  citizens: IncidentCitizen[];
  soundBeep: (freq: number, type?: OscillatorType, duration?: number) => void;
  setSelectedRouteGeoJson?: (geo: any) => void;
  mapPills?: { id: string; label: string }[];
  mapViewType: string;
  aiStatus: string;
  appPhase: 'monitoring' | 'evacuation' | 'disaster' | 'recovery';
  currentCoords: { lat: number; lon: number };
  activeShelter: any;
  showHazardsOverlay: boolean;
  globalHazards: any[];
  isSearchingMap: boolean;
  addLog: (msg: string) => void;
  triggerSos: () => void;
  getTravelTime: (shelter: any, mode: string) => string;
}

export const MobileMapPage: React.FC<MobileMapPageProps> = ({
  isDarkMode,
  currentLocation,
  glassCardClass,
  textPrimary,
  textSecondary,
  t,
  baseShelters,
  simulateStorm,
  rainfall,
  riverLevel,
  mapSearchQuery,
  setMapSearchQuery,
  interactiveMapShelterId,
  setInteractiveMapShelterId,
  mapSearchResults,
  setMapSearchResults,
  setCurrentLocation,
  setCurrentCoords,
  setLocationMode,
  setShowHazardModal,
  showCycloneOverlay,
  setShowCycloneOverlay,
  travelMode,
  setTravelMode,
  showAllCentersOnMap,
  setShowAllCentersOnMap,
  handleStartNavigation,
  showRouteSteps,
  setShowRouteSteps,
  shelterTagFilter,
  setShelterTagFilter,
  getShelterOccupancy,
  showToast,
  isVolunteerMode,
  isSirenActive,
  isLeveeDamDeployed,
  sosRequests,
  activeMissions,
  myActiveSosRequest,
  citizens,
  soundBeep,
  mapViewType,
  aiStatus,
  appPhase,
  currentCoords,
  activeShelter,
  showHazardsOverlay,
  globalHazards,
  isSearchingMap,
  addLog,
  triggerSos,
  getTravelTime
}) => {
  return (
              <div className="absolute inset-0 flex flex-col bg-[#e5e5ea] dark:bg-[#1a1a1c] animate-[fadeIn_0.4s_ease-out] z-10 overflow-hidden">
                <div className="absolute inset-0 pointer-events-auto overflow-hidden">
                  <iframe
                    src={showAllCentersOnMap
                      ? `https://maps.google.com/maps?q=${encodeURIComponent("SMK Seri Garing Rawang OR Dewan MBSA Seksyen 4 Shah Alam OR MPK Klang OR SK Bukit Beruntung OR Dewan Beringin Batu Caves Selangor")}&t=${mapViewType === 'satellite' ? 'k' : mapViewType === 'terrain' ? 'p' : ''}&z=10&ie=UTF8&iwloc=near&output=embed`
                      : (aiStatus === t.safe && appPhase !== 'recovery') && !interactiveMapShelterId
                        ? `https://maps.google.com/maps?q=${currentCoords.lat},${currentCoords.lon}&t=${mapViewType === 'satellite' ? 'k' : mapViewType === 'terrain' ? 'p' : ''}&z=14&ie=UTF8&iwloc=near&output=embed`
                        : `https://maps.google.com/maps?saddr=${currentCoords.lat},${currentCoords.lon}&daddr=${encodeURIComponent(activeShelter.address)}&dirflg=${travelMode === 'walk' ? 'w' : 'd'}&t=${mapViewType === 'satellite' ? 'k' : mapViewType === 'terrain' ? 'p' : ''}&z=14&ie=UTF8&iwloc=near&output=embed`
                    }
                    width="100%" height="100%"
                    style={{
                      border: 0,
                      filter: (isDarkMode && mapViewType === 'roadmap') ? 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(90%) saturate(80%)' : 'none',
                      transition: 'filter 0.5s ease',
                      marginTop: '-130px',
                      marginLeft: '-15px',
                      width: 'calc(100% + 30px)',
                      height: 'calc(100% + 150px)',
                      position: 'relative'
                    }}
                    allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps"
                  />
                </div>



                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {!showAllCentersOnMap && (
                    <svg width="100%" height="100%" className="absolute inset-0 z-20 pointer-events-none">


                      {showHazardsOverlay && globalHazards.map(h => {
                        if (h.x === undefined || h.y === undefined || h.x === null || h.y === null || (h.x === 0 && h.y === 0)) return null;
                        return (
                          <g key={h.id} transform={`translate(${h.x}%, ${h.y}%)`}>
                            <circle cx="0" cy="0" r="8" fill="#FF9F0A" stroke="#fff" strokeWidth="2" />
                            <path d="M -2 -3 L 2 -3 L 0 2 Z" fill="#fff" /><circle cx="0" cy="4" r="1.5" fill="#fff" />
                          </g>
                        );
                      })}

                      {showCycloneOverlay && (
                        <g transform="translate(68%, 32%)" className="pointer-events-auto cursor-pointer" onClick={() => showToast('Cyclone Eye Vortex Locked', 'info')}>
                          <circle cx="0" cy="0" r="120" fill="none" stroke="#FF453A" strokeWidth="1" strokeDasharray="6 8" opacity="0.3" className="animate-spin" style={{ animationDuration: '30s' }} />
                          <circle cx="0" cy="0" r="70" fill="none" stroke="#FF453A" strokeWidth="1.5" opacity="0.5" className="animate-pulse" />
                          <circle cx="0" cy="0" r="25" fill="rgba(255, 69, 58, 0.08)" stroke="#FF453A" strokeWidth="1" opacity="0.4" />

                          <path d="M 0,0 Q 25,-25 45,-15 T 85,-35 M 0,0 Q -25,25 -45,15 T -85,35 M 0,0 Q -25,-25 -15,-45 T -35,-85 M 0,0 Q 25,25 15,45 T 35,85"
                            fill="none" stroke="#FF453A" strokeWidth="5" strokeLinecap="round" opacity="0.5" className="animate-spin" style={{ animationDuration: '8s' }} />

                          <circle cx="0" cy="0" r="8" fill="#FF453A" stroke="#fff" strokeWidth="2" />
                          <text x="0" y="-16" fill="#FF453A" fontSize="11" fontWeight="bold" textAnchor="middle" className="drop-shadow-lg uppercase tracking-wider">Cyclone Eye</text>
                        </g>
                      )}
                    </svg>
                  )}
                </div>

                {showCycloneOverlay && (
                  <div className={`absolute top-[180px] left-4 right-4 z-30 p-5 rounded-[32px] border shadow-2xl animate-[fadeInUp_0.35s_ease-out] ${isDarkMode ? 'bg-[#1C1C1E]' : 'bg-white'}`}>
                    <div className="flex justify-between items-center mb-2.5">
                      <div className="flex items-center space-x-2">
                        <Sparkles size={16} className="text-[#FF453A] animate-pulse" />
                        <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Google Weather Lab</span>
                      </div>
                      <span className="bg-[#FF453A] text-white text-[11px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider animate-pulse">Category 1</span>
                    </div>
                    {/* Standardized typography size to text-base */}
                    <h4 className={`text-base font-black font-display tracking-tight ${textPrimary}`}>Severe Cyclone Mawar (Simulated)</h4>
                    {/* Standardized typography size to text-xs */}
                    <p className={`text-xs font-semibold mt-1 ${textSecondary}`}>Tracking active atmospheric pressure vortex moving towards the Selangor Basin.</p>

                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-gray-500/20 text-center">
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase block tracking-wider">Max Wind</span>
                        {/* Numerical metrics use standard text-sm with font-mono */}
                        <span className={`text-sm font-mono font-black ${textPrimary} mt-0.5 block`}>145 km/h</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase block tracking-wider">Pressure</span>
                        {/* Numerical metrics use standard text-sm with font-mono */}
                        <span className={`text-sm font-mono font-black ${textPrimary} mt-0.5 block`}>975 hPa</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase block tracking-wider">Velocity</span>
                        {/* Numerical metrics use standard text-sm with font-mono */}
                        <span className={`text-sm font-mono font-black ${textPrimary} mt-0.5 block`}>18 km/h</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute top-16 left-4 right-4 z-20 animate-[fadeInUp_0.4s_ease-out] pointer-events-none flex flex-col space-y-2">
                  <div className={`px-4 py-3 rounded-full flex items-center space-x-3 shadow-lg ${isDarkMode ? 'bg-[#1C1C1E]' : 'bg-white'} pointer-events-auto relative z-30`}>
                    <Search size={18} className={textSecondary} />
                    <div className="flex-1">
                      {aiStatus === t.safe && !interactiveMapShelterId ? (
                        <input
                          type="text"
                          value={mapSearchQuery}
                          onChange={(e) => setMapSearchQuery(e.target.value)}
                          placeholder="Search location to center map..."
                          className={`w-full bg-transparent border-none outline-none text-sm p-0 font-medium ${textPrimary} placeholder-gray-500`}
                          onFocus={() => {
                            if (!mapSearchQuery) {
                              setMapSearchQuery(currentLocation === 'Live Zone' ? '' : currentLocation);
                            }
                          }}
                        />
                      ) : (
                        <span className={`text-sm font-medium ${textPrimary} truncate block`}>{`Route to ${activeShelter.name}`}</span>
                      )}
                    </div>
                    {isSearchingMap && <Loader2 size={16} className="text-[#0A84FF] animate-spin" />}
                    {(interactiveMapShelterId || (mapSearchQuery && mapSearchQuery !== currentLocation)) && (
                      <button
                        onClick={() => {
                          if (interactiveMapShelterId) {
                            setInteractiveMapShelterId(null);
                          } else {
                            setMapSearchQuery('');
                            setMapSearchResults([]);
                          }
                        }}
                        className="pointer-events-auto bg-[#FF453A]/20 p-1.5 rounded-full text-[#FF453A]"
                      >
                        <X size={14} />
                      </button>
                    )}

                    {mapSearchResults.length > 0 && (
                      <div className={`absolute top-full left-0 right-0 mt-2 rounded-[24px] shadow-xl border overflow-hidden max-h-60 overflow-y-auto z-40 ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/10'}`}>
                        {mapSearchResults.map((result, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setCurrentLocation(result.isApi ? result.name.split(',')[0] : result.name);
                              setCurrentCoords({ lat: result.lat, lon: result.lon });
                              setLocationMode('manual');
                              setMapSearchQuery('');
                              setMapSearchResults([]);
                              showToast(`Map centered to ${result.isApi ? result.name.split(',')[0] : result.name}`, 'success');
                              addLog(`[SYSTEM] Map center updated: ${result.name}`);
                            }}
                            className={`w-full px-5 py-3 text-left flex items-center space-x-3 transition-colors ${isDarkMode ? 'hover:bg-white/5 border-b border-white/5' : 'hover:bg-black/5 border-b border-black/5'} last:border-none`}
                          >
                            <MapPin size={16} className="text-[#0A84FF] shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold truncate ${textPrimary}`}>{result.name}</p>
                              <p className="text-[11px] text-gray-500 font-mono">{result.lat.toFixed(4)}, {result.lon.toFixed(4)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {(simulateStorm || aiStatus !== t.safe) && (
                  <div className={`absolute right-4 z-20 animate-[fadeInUp_0.5s_ease-out] transition-all duration-300 ${aiStatus === t.safe && appPhase !== 'recovery' && !interactiveMapShelterId ? 'bottom-[250px]' : 'bottom-[330px]'}`}>
                    <button onClick={() => setShowHazardModal(true)} className="pointer-events-auto w-12 h-12 bg-[#FF9F0A] rounded-full shadow-md flex items-center justify-center transition-transform active:scale-95 border border-white/20 group">
                      <AlertOctagon size={22} className="text-white drop-shadow-md transition-transform" />
                    </button>
                    <button onClick={triggerSos} className="pointer-events-auto w-12 h-12 bg-[#FF453A] rounded-full shadow-md flex items-center justify-center transition-transform active:scale-95 border border-white/20 mt-4 group">
                      <LifeBuoy size={22} className="text-white drop-shadow-md transition-transform" />
                    </button>

                    <button
                      onClick={() => {
                        setShowCycloneOverlay(!showCycloneOverlay);
                        showToast(!showCycloneOverlay ? 'Google Weather Lab: Cyclone Tracking Enabled' : 'Weather Lab Overlay Disabled', 'info');
                      }}
                      className={`pointer-events-auto w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-transform active:scale-95 border border-white/20 mt-4 group ${showCycloneOverlay ? 'bg-[#FF453A]' : 'bg-gray-800'}`}
                    >
                      <CloudLightning size={22} className="text-white drop-shadow-md transition-transform" />
                    </button>
                  </div>
                )}

                {/* Bottom navigation panel for active routing or emergency state */}
                {(aiStatus !== t.safe || appPhase === 'recovery' || interactiveMapShelterId) ? (
                  <div className={`absolute bottom-0 left-0 right-0 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-20 animate-[fadeInUp_0.6s_ease-out] ${isDarkMode ? 'bg-[#1C1C1E]' : 'bg-white'} flex flex-col overflow-hidden border-t ${isDarkMode ? 'border-white/10' : 'border-black/5'} pointer-events-auto pb-[92px]`}>

                    {activeShelter.isFallback && !interactiveMapShelterId && (
                      <div className="bg-[#FF453A] w-full py-2.5 px-6 flex items-center space-x-2 text-white">
                        <AlertTriangle size={14} className="animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">{activeShelter.originalName} is OVERCROWDED. Rerouting to safest shelter...</span>
                      </div>
                    )}

                    <div className="p-6 pt-4">
                      <div className={`w-10 h-1.5 rounded-full mx-auto mb-5 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>

                      {/* Clean Back Button link for route overview departure */}
                      {(interactiveMapShelterId || aiStatus !== t.safe || appPhase === 'recovery') && (
                        <div className="flex items-center justify-between mb-4 animate-[fadeIn_0.25s_ease-out]">
                          <button
                            onClick={() => {
                              setInteractiveMapShelterId(null);
                              showToast("Returned to map overview", "info");
                            }}
                            className={`px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 border text-xs font-black select-none shadow-sm transition-all active:scale-95 outline-none
                              ${isDarkMode 
                                ? 'bg-white/10 border-white/5 text-gray-200' 
                                : 'bg-black/5 border-black/5 text-gray-700'}`}
                          >
                            <ChevronLeft size={16} strokeWidth={2.5} className="text-[#0A84FF]" />
                            <span>BACK</span>
                          </button>
                          <span className={`text-[10px] font-black tracking-widest uppercase opacity-75 ${textSecondary}`}>
                            Route Overview
                          </span>
                        </div>
                      )}

                      <div className={`flex items-center space-x-6 border-b pb-3 mb-5 ${isDarkMode ? 'border-white/10' : 'border-black/10'} overflow-x-auto no-scrollbar`}>
                        {/* Drive Tab */}
                        <button
                          onClick={() => setTravelMode('drive')}
                          className={`flex items-center space-x-1.5 pb-2 cursor-pointer whitespace-nowrap border-b-2 transition-all duration-200 outline-none
                            ${travelMode === 'drive'
                              ? 'text-[#0A84FF] border-[#0A84FF] font-bold'
                              : `border-transparent opacity-65 ${textSecondary} font-medium`
                            }`}
                        >
                          <Navigation size={18} className="rotate-45" />
                          <span className="text-sm">Drive ({getTravelTime(activeShelter, 'drive')})</span>
                        </button>

                        {/* Walk Tab */}
                        <button
                          onClick={() => setTravelMode('walk')}
                          className={`flex items-center space-x-1.5 pb-2 cursor-pointer whitespace-nowrap border-b-2 transition-all duration-200 outline-none
                            ${travelMode === 'walk'
                              ? 'text-[#0A84FF] border-[#0A84FF] font-bold'
                              : `border-transparent opacity-65 ${textSecondary} font-medium`
                            }`}
                        >
                          <Footprints size={18} />
                          <span className="text-sm">Walk ({getTravelTime(activeShelter, 'walk')})</span>
                        </button>
                      </div>

                      <div className="flex flex-col mb-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline space-x-2 font-sans">
                            <span className={`text-3xl font-black font-mono tracking-tight ${travelMode === 'walk' ? 'text-amber-500' : 'text-[#0A84FF]'}`}>
                              {getTravelTime(activeShelter, travelMode)}
                            </span>
                          </div>
                          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border shadow-sm`} style={{ backgroundColor: `${activeShelter.occColor}15`, borderColor: `${activeShelter.occColor}30`, color: activeShelter.occColor }}>
                            <Users size={12} />
                            <span className="text-xs font-black font-mono tracking-wider uppercase">{activeShelter.currentCapacity} / {activeShelter.maxCapacity} ({activeShelter.occupancyLabel})</span>
                          </div>
                        </div>

                        <span className={`text-sm mt-1 font-bold ${textPrimary}`}>Routing to {activeShelter.name}</span>
                        <span className={`text-xs flex items-center space-x-1.5 mt-1.5 font-medium ${textSecondary}`}>
                          <span>{activeShelter.distance}</span><span>·</span>
                          {interactiveMapShelterId ? (
                            <span className="text-[#0A84FF] flex items-center"><ShieldCheck size={12} className="mr-1" /> User Selected Route</span>
                          ) : (
                            <span className="text-[#32D74B] flex items-center"><Shield size={12} className="mr-1" /> Optimized Safe Route</span>
                          )}
                        </span>
                      </div>

                      {/* Multi-PPS Interactive Alternatives Board */}
                      <div className="mb-6 pt-4 border-t border-gray-500/10">
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#0A84FF] flex items-center space-x-1">
                            <span>Available PPS Networks</span>
                          </span>
                          <span className={`text-[9px] font-medium ${textSecondary} opacity-60`}>Tap route to update</span>
                        </div>
                        <div className="flex space-x-2.5 overflow-x-auto pb-2 no-scrollbar select-none z-10 relative">
                          {baseShelters
                            .map(s => {
                              const occ = getShelterOccupancy(s);
                              return { ...s, occ };
                            })
                            .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                            .map((s) => {
                              const isCurrent = s.id === activeShelter.id;
                              const isOvercrowded = s.occ.pct >= 85; 
                              return (
                                <div
                                  key={s.id}
                                  onClick={() => {
                                    setInteractiveMapShelterId(s.id);
                                    setShowAllCentersOnMap(false);
                                    showToast(`Routing redirected to ${s.name}`, 'info');
                                  }}
                                  className={`flex-shrink-0 w-[145px] p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden
                                    ${isCurrent 
                                      ? 'border-[#0A84FF] bg-[#0A84FF]/10' 
                                      : isOvercrowded 
                                        ? 'border-red-500/10 bg-red-500/5 opacity-55' 
                                        : isDarkMode ? 'bg-[#18181B] border-white/5' : 'bg-zinc-50 border-zinc-200/80'
                                    }`}
                                >
                                  <div>
                                    <div className="flex justify-between items-start">
                                      <h6 className={`font-black text-[10px] truncate max-w-[85px] ${isCurrent ? 'text-[#0A84FF]' : textPrimary}`}>{s.name}</h6>
                                      {isOvercrowded && <span className="text-[7px] font-black font-mono text-red-500 bg-red-500/10 px-1 rounded-sm">FULL</span>}
                                    </div>
                                    <span className={`text-[9px] font-mono mt-0.5 block ${textSecondary}`}>{s.distance} • {s.time.replace('Est. ', '').replace(' drive', '')}</span>
                                  </div>
                                  <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-gray-500/10 text-[8px] font-bold font-mono">
                                    <span style={{ color: s.occ.color }}>{s.occ.pct.toFixed(0)}% LOAD</span>
                                    {isCurrent ? (
                                      <span className="text-[#0A84FF] font-black">ACTIVE</span>
                                    ) : (
                                      <span className={`${textSecondary} opacity-60`}>SELECT</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button onClick={handleStartNavigation} className="flex-[2] py-3.5 rounded-full flex items-center justify-center space-x-2 transition-all active:scale-95 bg-[#0A84FF] text-white shadow-lg">
                          <Navigation size={18} fill="white" className="rotate-45" />
                          <span className="font-bold text-sm">Start</span>
                        </button>
                        <button 
                          onClick={() => {
                            setShowRouteSteps(!showRouteSteps);
                            showToast(showRouteSteps ? "Steps collapsed" : "Showing turn-by-turn steps", "info");
                          }}
                          className={`flex-1 py-3.5 rounded-full flex items-center justify-center space-x-1.5 transition-all active:scale-95 ${showRouteSteps ? 'bg-[#0A84FF]/20 text-[#0A84FF]' : isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-gray-900'}`}
                        >
                           <Info size={16} />
                           <span className="font-bold text-sm">{showRouteSteps ? 'Hide' : 'Steps'}</span>
                        </button>
                      </div>

                      {showRouteSteps && (
                        <div className="mt-4 pt-4 border-t border-gray-500/10 max-h-[160px] overflow-y-auto no-scrollbar space-y-3 z-10 relative select-none animate-[fadeInUp_0.2s_ease-out] transition-all">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#0A84FF] flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#32D74B] animate-ping"></span>
                            <span>Live Turn-by-Turn Directions (GPS Safe)</span>
                          </span>
                          {[
                            { step: '01', desc: 'Proceed Northwest on main boulevard toward higher altitude corridors.', dist: '200m' },
                            { step: '02', desc: 'Slight right before the river bridge. Bridge is flagged as flooded and impassable.', dist: '450m' },
                            { step: '03', desc: 'Turn left onto the well-illuminated emergency highway connector lane.', dist: '600m' },
                            { step: '04', desc: `Arrive at ${activeShelter.name} safehouse gates. Approach registration desks.`, dist: 'Arrived' }
                          ].map((s, idx) => (
                            <div key={idx} className="flex items-start space-x-3 text-xs leading-snug">
                              <span className="font-mono font-black text-[#32D74B] bg-[#32D74B]/10 px-1.5 py-0.5 rounded text-[9px] mt-0.5">{s.step}</span>
                              <div className="flex-1">
                                <p className={`font-semibold ${textPrimary}`}>{s.desc}</p>
                                <span className={`text-[9px] ${textSecondary} font-mono mt-0.5 block`}>{s.dist}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Bottom evacuation network lookup tray during non-emergency conditions */
                  <div className={`absolute bottom-0 left-0 right-0 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.25)] z-20 animate-[fadeInUp_0.5s_ease-out] ${isDarkMode ? 'bg-[#1C1C1E]' : 'bg-white'} flex flex-col overflow-hidden border-t ${isDarkMode ? 'border-white/10' : 'border-black/5'} pointer-events-auto pb-[92px]`}>
                    <div className="p-6 pt-4 pb-5">
                      <div className={`w-10 h-1.5 rounded-full mx-auto mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="min-w-0 flex-1">
                          <h4 className={`text-sm sm:text-base font-extrabold tracking-tight ${textPrimary} flex items-center space-x-1.5`}>
                            <Tent size={18} className="text-[#32D74B] shrink-0" />
                            <span>Nearest Evacuation Centers</span>
                          </h4>
                          <p className={`text-[11px] font-medium ${textSecondary} mt-0.5`}>
                            All safehouse networks are ready & operational. Tap any to preview route.
                          </p>
                        </div>
                        <span className="px-2.5 py-1 text-[10px] font-black tracking-wider uppercase rounded-full bg-[#32D74B]/10 text-[#32D74B] border border-[#32D74B]/20">
                          Nominal
                        </span>
                      </div>

                      {/* Interactive Resource Tags Filtering Bar */}
                      <div className="flex space-x-1.5 overflow-x-auto pb-3 pt-0.5 no-scrollbar select-none z-10 relative">
                        {[
                          { id: 'all', label: 'All Safehouses' },
                          { id: 'medical', label: 'Medical support' },
                          { id: 'generator', label: 'Power Backup' },
                          { id: 'food', label: 'Warm Meals' },
                          { id: 'pets', label: 'Pet Friendly' }
                        ].map((pill) => {
                          const isActive = shelterTagFilter === pill.id;
                          return (
                            <button
                              key={pill.id}
                              onClick={() => setShelterTagFilter(pill.id)}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
                                isActive 
                                  ? 'bg-[#32D74B] text-white shadow-sm scale-102' 
                                  : isDarkMode ? 'bg-white/5 border border-white/5 text-gray-400' : 'bg-gray-100 border border-black/5 text-gray-600'
                              }`}
                            >
                              <span>{pill.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Scrollable grid tray of nearest evacuation centers */}
                      <div className="flex space-x-4 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-2 px-2">
                        {baseShelters
                          .filter(s => shelterTagFilter === 'all' || s.tags?.includes(shelterTagFilter))
                          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                          .map((shelter) => {
                            const occ = getShelterOccupancy(shelter);
                            const isFull = occ.pct >= 100;
                            return (
                              <div
                                key={shelter.id}
                                onClick={() => {
                                  setInteractiveMapShelterId(shelter.id);
                                  setShowAllCentersOnMap(false);
                                  showToast(`Previewing route to ${shelter.name}`, 'info');
                                }}
                                className={`flex-shrink-0 w-[240px] p-4 rounded-3xl border transition-all duration-300 cursor-pointer shadow-sm relative overflow-hidden
                                  ${isDarkMode
                                    ? 'bg-[#18181B] border-white/5'
                                    : 'bg-zinc-50 border-zinc-200/80'
                                  }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="max-w-[70%]">
                                    <h5 className={`font-black text-xs truncate ${textPrimary}`}>{shelter.name}</h5>
                                    <p className={`text-[10px] mt-0.5 font-sans font-medium truncate ${textSecondary} opacity-80`}>{shelter.address}</p>
                                    
                                    {/* Shelter Resource Tag Pills inside Card */}
                                    <div className="flex gap-1 mt-1.5 flex-wrap">
                                      {shelter.tags?.map(t => {
                                        const tagInfo = {
                                          medical: { bg: 'bg-[#FF453A]/10 text-[#FF453A]', label: 'MEDICINE' },
                                          generator: { bg: 'bg-[#FF9F0A]/10 text-[#FF9F0A]', label: 'Power' },
                                          food: { bg: 'bg-[#30B0C7]/10 text-[#30B0C7]', label: 'Food' },
                                          pets: { bg: 'bg-[#AF52DE]/10 text-[#AF52DE]', label: 'Pets' }
                                        }[t] || { bg: 'bg-gray-100 text-gray-500', label: t };
                                        return (
                                          <span key={t} className={`px-1 rounded text-[7px] font-black uppercase tracking-wider ${tagInfo.bg}`}>
                                            {tagInfo.label}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <span className="px-2 py-0.5 text-[8px] font-mono font-black rounded-md" style={{ backgroundColor: `${occ.color}15`, color: occ.color }}>
                                    {isFull ? 'FULL' : `${occ.pct.toFixed(0)}% LOAD`}
                                  </span>
                                </div>

                                <div className={`flex items-center justify-between mt-3 pt-2.5 border-t border-gray-500/10 text-[10px] font-mono ${textSecondary}`}>
                                  <div className="flex items-center space-x-1">
                                    <MapPin size={10} className="text-[#0A84FF]" />
                                    <span className="font-bold">{shelter.distance}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-[#0A84FF] font-black uppercase tracking-wider text-[9px]">
                                    <span>View Route</span>
                                    <Navigation size={9} className="rotate-45" fill="currentColor" />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
  );
};
