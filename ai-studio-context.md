This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.GoogleAntigravity/
  settings.json
public/
  flood pictures 10.jpg
  flood pictures 11.jpg
  flood pictures 12.jpg
  flood pictures 13.jpg
  flood pictures 14.jpg
  flood pictures 15.jpg
  flood pictures 16.jpg
  flood pictures 17.jpg
  flood pictures 18.jpg
  flood pictures 19.jpg
  flood pictures 2.jpg
  flood pictures 20.jpg
  flood pictures 3.jpg
  flood pictures 4.jpg
  flood pictures 5.jpg
  flood pictures 6.jpg
  flood pictures 7.jpg
  flood pictures 8.jpg
  flood pictures 9.jpg
  flood pictures.jpg
src/
  components/
    desktop/
      DashboardOverview.tsx
      ResidentDirectory.tsx
    mobile/
      MobileAlertsPage.tsx
      MobileCommunityPage.tsx
      MobileHomePage.tsx
      MobileMapPage.tsx
      MobileSettingsPage.tsx
    BrandIcons.tsx
    EocDispatchView.tsx
    EocHydrologyView.tsx
    EocMutualAidView.tsx
    EocShelterView.tsx
    eocTypes.ts
    ExplorerSidebar.tsx
    FigmaWeatherLayout.tsx
    InspectorSidebar.tsx
    LiquidGlassFluidEngine.tsx
    PhysicalRainForeground.tsx
    SciFiCommandCenter.tsx
    TerminalPanel.tsx
    WeatherBackground.tsx
  utils/
    audio.ts
  App.tsx
  constants.ts
  index.css
  main.tsx
  types.ts
  vite-env.d.ts
.env.example
.gitignore
firebase-applet-config.json
firebase-blueprint.json
firestore.rules
index.html
metadata.json
package.json
README.md
server.ts
tsconfig.json
vite.config.ts
```

# Files

## File: .GoogleAntigravity/settings.json
```json
{
    "css.lint.unknownAtRules": "ignore"
}
```

## File: src/components/desktop/DashboardOverview.tsx
```typescript
import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CloudRain,
  AlertTriangle,
  Users,
  Tent,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Waves,
  TrendingUp,
  AlertOctagon,
  Download,
  Info,
  Siren,
  Search,
  X,
  MapPin,
  Flame,
  Wind,
  Navigation,
  CheckCircle,
  HelpCircle,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  User,
  Activity,
  Zap,
  Plus,
  Minus,
  MessageSquare,
  FileText,
  Map,
  Map as MapIcon,
  LifeBuoy,
  BarChart3,
  Compass,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  LockKeyhole,
  ArrowLeft,
  Bookmark,
  Share2,
  Loader2,
  Truck,
  ChevronRight,
  Edit,
  Radio,
  Crosshair
} from 'lucide-react';

let sharedAudioCtxDashboard: AudioContext | null = null;

const getAudioContextDashboard = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioCtxDashboard) {
    sharedAudioCtxDashboard = new AudioContextClass();
  }
  if (sharedAudioCtxDashboard.state === 'suspended') {
    sharedAudioCtxDashboard.resume().catch(() => {});
  }
  return sharedAudioCtxDashboard;
};

const playBeepDashboard = (freq: number, duration: number = 0.06) => {
  try {
    const audioCtx = getAudioContextDashboard();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {}
};

interface DashboardOverviewProps {
  isDarkMode: boolean;
  simulateStorm: boolean;
  rainfall: number;
  chartData: { h1: number; h2: number; h3: number; now: number; f1: number };
  pendingRescueCount: number;
  dispatchedRescueCount: number;
  riverLevel: number;
  overallShelterOccupancyPct: number;
  totalCurrentShelterOccupancy: number;
  totalSheltersCapacityMax: number;
  sosRequests: any[];
  isSirenActive: boolean;
  setIsSirenActive: (val: boolean) => void;
  isLeveeDamDeployed: boolean;
  setIsLeveeDamDeployed: (val: boolean) => void;
  baseShelters: any[];
  getShelterOccupancy: (shelter: any) => { cap: number; pct: number };
  shelterStatus: { [key: string]: any };
  showAllShelters: boolean;
  setShowAllShelters: (val: boolean) => void;
  setAdminView: (val: string) => void;
  showToast: (msg: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  glassCardClass: string;
  textPrimary: string;
  textSecondary: string;
  handleOpenShelterEditModal: (id: string) => void;
  adminArea: string;
  predLine: string;
  histLine: string;
  getAdminChartY: (x: number) => number;
  
  // Modal toggle / active state props
  selectedShelterDetail: any;
  setSelectedShelterDetail: (shelter: any) => void;
  citizens: any[];
  commandCenterTab: string;
  setCommandCenterTab: (tab: string) => void;
  adminMapSearch: string;
  setAdminMapSearch: (val: string) => void;
  showRouteActive: boolean;
  setShowRouteActive: (val: boolean) => void;
  bookmarkedShelters: string[];
  setBookmarkedShelters: React.Dispatch<React.SetStateAction<string[]>>;
  getShelterPhotos: (id: string) => string[];
  broadcastZone: string;
  setBroadcastZone: (val: string) => void;
  manualLocations: any[];
  broadcastType: string;
  setBroadcastType: (val: string) => void;
  broadcastMessage: string;
  setBroadcastMessage: (val: string) => void;
  handleBroadcast: () => void;
  isBroadcasting: boolean;
  handleLocateSosOnMap: (sos: any) => void;
  handleDispatchRescue: (sosId: string) => void;
  handleGoToShelterPage: (shelter: any) => void;
  toggleShelterCapacity: (shelterId: string, currentIsFull: boolean) => void;
  currentCoords: { lat: number; lon: number };
  adminMapZoom: number;
  setAdminMapZoom: (zoom: number) => void;
  adminMapType: string;
  setAdminMapType: (type: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  isDarkMode,
  simulateStorm,
  rainfall,
  chartData,
  pendingRescueCount,
  dispatchedRescueCount,
  riverLevel,
  overallShelterOccupancyPct,
  totalCurrentShelterOccupancy,
  totalSheltersCapacityMax,
  sosRequests,
  isSirenActive,
  setIsSirenActive,
  isLeveeDamDeployed,
  setIsLeveeDamDeployed,
  baseShelters,
  getShelterOccupancy,
  shelterStatus,
  showAllShelters,
  setShowAllShelters,
  setAdminView,
  showToast,
  glassCardClass,
  textPrimary,
  textSecondary,
  handleOpenShelterEditModal,
  adminArea,
  predLine,
  histLine,
  getAdminChartY,
  selectedShelterDetail,
  setSelectedShelterDetail,
  citizens,
  commandCenterTab,
  setCommandCenterTab,
  adminMapSearch,
  setAdminMapSearch,
  showRouteActive,
  setShowRouteActive,
  bookmarkedShelters,
  setBookmarkedShelters,
  getShelterPhotos,
  broadcastZone,
  setBroadcastZone,
  manualLocations,
  broadcastType,
  setBroadcastType,
  broadcastMessage,
  setBroadcastMessage,
  handleBroadcast,
  isBroadcasting,
  handleLocateSosOnMap,
  handleDispatchRescue,
  handleGoToShelterPage,
  toggleShelterCapacity,
  currentCoords,
  adminMapZoom,
  setAdminMapZoom,
  adminMapType,
  setAdminMapType
}) => {
  return (
                <>
                  {/* Core operational matrix cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Operations Level Card */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  simulateStorm 
                    ? 'border-red-500/20 bg-red-500/5' 
                    : `${isDarkMode ? 'border-white/5 bg-white/[0.015]' : 'border-zinc-200 bg-zinc-50/50'}`
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      simulateStorm 
                        ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                        : 'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                      {simulateStorm ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-sans block leading-none mb-1.5">System Status</span>
                      <h4 className="text-base font-bold tracking-tight leading-none uppercase">{simulateStorm ? 'Storm Advisory' : 'Normal Operations'}</h4>
                      <p className={`text-[10px] mt-1.5 font-sans tracking-tight font-semibold leading-none ${simulateStorm ? 'text-red-500' : 'text-green-600'}`}>
                        {simulateStorm ? 'Warning protocols active' : 'All channels normal'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Precipitation Telemetry Card */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${isDarkMode ? 'border-white/5 bg-white/[0.015]' : 'border-zinc-200 bg-zinc-50/50'}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <CloudRain size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-sans block leading-none mb-1.5">Precipitation Level</span>
                      <h4 className="text-base font-bold tracking-tight font-mono leading-none">{rainfall.toFixed(1)} mm/hr</h4>
                      <p className="text-[10px] text-zinc-500 mt-1.5 font-sans leading-none">
                        District average: {chartData.f1.toFixed(1)}mm
                      </p>
                    </div>
                  </div>
                </div>

                {/* S.O.S Active Alerts Card */}
                <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                  pendingRescueCount > 0 
                    ? 'border-red-500/20 bg-red-500/5' 
                    : `${isDarkMode ? 'border-white/5 bg-white/[0.015]' : 'border-zinc-200 bg-zinc-50/50'}`
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      pendingRescueCount > 0 
                        ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      <LifeBuoy size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-sans block leading-none mb-1.5">Emergency Beacons</span>
                      <h4 className="text-base font-bold tracking-tight leading-none">
                        {pendingRescueCount > 0 ? `${pendingRescueCount} Active Alerts` : 'Queue Empty'}
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-1.5 font-sans leading-none">{dispatchedRescueCount} dispatched responses</p>
                    </div>
                  </div>
                </div>

                {/* PPS Safehouses Card */}
                <div className={`p-6 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'border-white/5 bg-white/[0.015]' : 'border-zinc-200 bg-zinc-50/50'}`}>
                  <div className="flex flex-col flex-1 w-full relative">
                    <div className="flex justify-between items-center bg-transparent gap-1 leading-none mb-1.5 select-none animate-none">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-sans">Shelter Capacity</span>
                      <span className="text-[10px] font-bold shrink-0">{overallShelterOccupancyPct}% occupied</span>
                    </div>
                    <div className="w-full bg-zinc-500/10 h-2 rounded-full mt-2.5 overflow-hidden border border-white/[0.02]">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          overallShelterOccupancyPct >= 80 
                            ? 'bg-red-500' 
                            : overallShelterOccupancyPct >= 55 
                              ? 'bg-amber-500' 
                              : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(overallShelterOccupancyPct, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-sans mt-2.5 text-right leading-none select-none">{totalCurrentShelterOccupancy} / {totalSheltersCapacityMax} guests registered</p>
                  </div>
                </div>

              </div>

              {/* Bento Grid Command Deck */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Left 2/3 Content Base */}
                <div className="xl:col-span-2 space-y-8">
                  
                  {/* Weather Trend Graph Terminal */}
                  <div className={`p-8 rounded-[32px] border overflow-hidden relative shadow-lg ${glassCardClass} xl:h-[432px] flex flex-col justify-between`}>
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0a84ff]/30"></div>
                    <div className="flex items-center justify-between mb-6 shrink-0">
                      <div>
                        <h3 className="text-lg font-black font-display tracking-tight flex items-center space-x-2.5 uppercase">
                          <BarChart3 className="text-[#0a84ff]" size={18} />
                          <span className="font-display">Rainfall Trends & Outlook</span>
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 font-sans">Comparative analysis of historic ranges and upcoming precipitation models.</p>
                      </div>
                      <div className="flex items-center space-x-4 border border-zinc-500/10 px-4 py-1.5 rounded-xl bg-black/20 text-[8.5px] font-mono font-bold uppercase tracking-wider">
                        <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500/80 block shadow-sm border border-white/10"></span><span className="opacity-75">Historical Rates</span></div>
                        <div className="h-2 w-px bg-zinc-500/10"></div>
                        <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0a84ff] block shadow-sm border border-white/10 animate-pulse"></span><span className="opacity-75">Precipitation Forecast</span></div>
                      </div>
                    </div>

                    <div className={`w-full h-[260px] xl:h-[285px] relative rounded-2xl border ${isDarkMode ? 'border-white/5 bg-black/45 shadow-sm' : 'border-[#0a84ff]/5 bg-zinc-100/15'} overflow-hidden transition-all duration-350`}>
                      <div className="absolute inset-x-8 top-6 bottom-12 flex flex-col justify-between pointer-events-none opacity-[0.02] text-xs text-current">
                        <div className="w-full border-t border-dashed border-current"></div>
                        <div className="w-full border-t border-dashed border-current"></div>
                        <div className="w-full border-t border-dashed border-current"></div>
                        <div className="w-full border-t border-dashed border-current"></div>
                      </div>

                      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible z-10 px-8 pt-8 pb-12">
                        <defs>
                          <linearGradient id="adminChartGradNew" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#0a84ff" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Background grid */}
                        <line x1="0" y1="20" x2="400" y2="20" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="0.5" opacity="0.07" strokeDasharray="2 2" />
                        <line x1="0" y1="55" x2="400" y2="55" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="0.5" opacity="0.07" strokeDasharray="2 2" />
                        <line x1="0" y1="90" x2="400" y2="90" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="0.5" opacity="0.07" strokeDasharray="2 2" />
                        
                        <line x1="80" y1="0" x2="80" y2="120" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="0.5" opacity="0.05" />
                        <line x1="160" y1="0" x2="160" y2="120" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="0.5" opacity="0.05" />
                        <line x1="240" y1="0" x2="240" y2="120" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="0.5" opacity="0.05" />
                        <line x1="320" y1="0" x2="320" y2="120" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="0.5" opacity="0.05" />

                        {/* Chart labels */}
                        <text x="395" y="23" fill="currentColor" fontSize="6.5" opacity="0.4" textAnchor="end" className="font-sans font-bold">12 mm/h</text>
                        <text x="395" y="58" fill="currentColor" fontSize="6.5" opacity="0.4" textAnchor="end" className="font-sans font-bold">6 mm/h</text>
                        <text x="395" y="93" fill="currentColor" fontSize="6.5" opacity="0.4" textAnchor="end" className="font-sans font-bold">0 mm/h</text>

                        {/* Overflow Warning Threshold Limit line */}
                        <line x1="0" y1="45" x2="400" y2="45" stroke="#ff453a" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
                        <text x="10" y="38" fill="#ff453a" fontSize="8" fontWeight="bold" opacity="0.95" className="font-sans font-extrabold">Advisory threshold limit</text>

                        {/* Chart Area Gradient */}
                        <path d={adminArea} fill="url(#adminChartGradNew)" className="transition-all duration-1000 ease-in-out" />

                        {/* Historical Line */}
                        <path d={histLine} fill="none" stroke="#ff453a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="transition-all duration-1000 ease-in-out" />

                        {/* Predicted Line */}
                        <path d={predLine} fill="none" stroke="#0a84ff" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="transition-all duration-1000 ease-in-out" />

                        {/* Current Reference Indicator Node */}
                        <g transform={`translate(200, ${getAdminChartY(200)})`} className="transition-all duration-1000 ease-in-out">
                          <circle cx="0" cy="0" r="5" fill="#ffffff" stroke={isDarkMode ? '#333333' : '#AEAEB2'} strokeWidth="1" />
                          <circle cx="0" cy="0" r="2.5" fill="#0a84ff" />
                        </g>
                      </svg>

                      <div className="absolute bottom-3 inset-x-8 flex justify-between text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider select-none">
                        <span>-48 Hours</span>
                        <span>-24 Hours</span>
                        <div className="flex items-center space-x-1.5 text-[#0a84ff] relative">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0a84ff] animate-ping"></span>
                          <span>Live Reading</span>
                        </div>
                        <span>+24 Hours</span>
                        <span>+48 Hours</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Radar Command Wrapper */}
                  <div id="admin-incident-map" className={`p-8 rounded-[32px] border relative overflow-hidden shadow-sm ${isDarkMode ? 'border-white/5 bg-white/[0.015]' : 'border-zinc-200 bg-white'} xl:h-[630px] flex flex-col`}>
                    <div className="flex items-center justify-between mb-4 shrink-0">
                      <div>
                        <h3 className={`text-lg font-bold tracking-tight flex items-center space-x-2.5 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                          <MapIcon className="text-[#0a84ff]" size={18} />
                          <span>Incident Map Overview</span>
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 font-sans">Click on any evacuation center to see directions and route overview.</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 text-[10px] font-semibold leading-none items-center select-none">
                        <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#32d74b] block"></span><span className="opacity-75">Evacuation Shelter</span></span>
                        <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0a84ff] block"></span><span className="opacity-75">Active Route</span></span>
                      </div>
                    </div>

                    <div className="relative w-full h-[520px] xl:h-auto xl:flex-1 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-850 shadow-inner">
                      <iframe
                        src={selectedShelterDetail
                          ? (showRouteActive 
                              ? `https://maps.google.com/maps?saddr=${currentCoords.lat},${currentCoords.lon}&daddr=${encodeURIComponent(selectedShelterDetail.address)}&output=embed`
                              : `https://maps.google.com/maps?q=${encodeURIComponent(selectedShelterDetail.address)}&t=${adminMapType === 'satellite' ? 'k' : adminMapType === 'terrain' ? 'p' : ''}&z=${adminMapZoom}&ie=UTF8&iwloc=near&output=embed`
                            )
                          : `https://maps.google.com/maps?q=${encodeURIComponent("SMK Seri Garing, Rawang, Selangor")}&t=${adminMapType === 'satellite' ? 'k' : adminMapType === 'terrain' ? 'p' : ''}&z=${adminMapZoom}&ie=UTF8&iwloc=near&output=embed`
                        }
                        width="100%" height="100%"
                        style={{
                          border: 0,
                          width: '100%',
                          height: '100%',
                          position: 'relative'
                        }}
                        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Command Map"
                      />

                      {/* FUTURISTIC MAP INTERACTIVE CONTROLS OVERLAY */}
                      {/* Floating bottom-right zoom & layer control panel */}
                      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2.5 pointer-events-auto">
                        {/* Zoom Controls */}
                        <div className={`backdrop-blur-md p-1.5 rounded-xl shadow-2xl flex flex-col gap-1 border ${
                          isDarkMode 
                            ? 'bg-[#0B0F19]/90 border-[#1E293B]/60 text-white shadow-black/50' 
                            : 'bg-white/95 border-zinc-200 text-zinc-800 shadow-zinc-200/40'
                        }`}>
                          <button
                            onClick={() => {
                              setAdminMapZoom(prev => Math.min(18, prev + 1));
                              showToast('Zoom level increased', 'info');
                              playBeepDashboard(1100, 0.06);
                            }}
                            className={`p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                              isDarkMode 
                                ? 'hover:bg-[#0a84ff]/25 text-zinc-300 hover:text-white' 
                                : 'hover:bg-zinc-100 text-zinc-650 hover:text-[#0a84ff]'
                            }`}
                            title="Zoom In"
                          >
                            <Plus size={15} />
                          </button>
                          <button
                            onClick={() => {
                              setAdminMapZoom(prev => Math.max(10, prev - 1));
                              showToast('Zoom level decreased', 'info');
                              playBeepDashboard(900, 0.06);
                            }}
                            className={`p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                              isDarkMode 
                                ? 'hover:bg-[#0a84ff]/25 text-zinc-300 hover:text-white' 
                                : 'hover:bg-zinc-100 text-zinc-650 hover:text-[#0a84ff]'
                            }`}
                            title="Zoom Out"
                          >
                            <Minus size={15} />
                          </button>
                        </div>

                        {/* Layer Switchers */}
                        <div className={`backdrop-blur-md p-1.5 rounded-xl shadow-2xl flex flex-col gap-1 border ${
                          isDarkMode 
                            ? 'bg-[#0B0F19]/90 border-[#1E293B]/60 text-white shadow-black/50' 
                            : 'bg-white/95 border-zinc-200 text-zinc-800 shadow-zinc-200/40'
                        }`}>
                          <button
                            onClick={() => {
                              setAdminMapType('terrain');
                              showToast('Switched to Terrain Profile', 'success');
                              playBeepDashboard(1060, 0.08);
                            }}
                            className={`p-2 rounded-lg transition-all text-[9px] font-bold font-mono cursor-pointer flex items-center justify-center ${
                              adminMapType === 'terrain'
                                ? 'bg-[#0a84ff] text-white shadow-md shadow-[#0a84ff]/20'
                                : (isDarkMode ? 'hover:bg-white/5 text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800')
                            }`}
                            title="Terrain View"
                          >
                            TER
                          </button>
                          <button
                            onClick={() => {
                              setAdminMapType('satellite');
                              showToast('Switched to Satellite Feed', 'success');
                              playBeepDashboard(1020, 0.08);
                            }}
                            className={`p-2 rounded-lg transition-all text-[9px] font-bold font-mono cursor-pointer flex items-center justify-center ${
                              adminMapType === 'satellite'
                                ? 'bg-[#0a84ff] text-white shadow-md shadow-[#0a84ff]/20'
                                : (isDarkMode ? 'hover:bg-white/5 text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800')
                            }`}
                            title="Satellite View"
                          >
                            SAT
                          </button>
                        </div>
                      </div>

                      {/* Floating top-left list of active centers (if none selected) */}
                      {!selectedShelterDetail && (
                        <div className="absolute top-4 left-4 z-20 max-w-xs md:max-w-sm pointer-events-auto flex flex-col gap-2">
                          <div className={`backdrop-blur-md p-4 rounded-2xl shadow-2xl flex flex-col gap-3 border ${
                            isDarkMode 
                              ? 'bg-[#0B0F19]/95 border-[#1E293B]/80 text-white shadow-black/60' 
                              : 'bg-white/95 border-zinc-200 text-zinc-800 shadow-zinc-200/50'
                          }`}>
                            <div className={`flex items-center justify-between border-b pb-2 ${isDarkMode ? 'border-white/10' : 'border-zinc-200'}`}>
                              <div className={`flex items-center space-x-2 text-xs font-black tracking-wider uppercase font-mono ${isDarkMode ? 'text-zinc-100' : 'text-zinc-800'}`}>
                                <Compass size={14} className="text-[#0a84ff] animate-spin" style={{ animationDuration: '6s' }} />
                                <span>EOC SECTOR DIRECTORY</span>
                              </div>
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] text-emerald-400 font-bold font-mono">ACTIVE</span>
                              </span>
                            </div>

                            {/* Interactive SEARCH Filter input */}
                            <div className="relative">
                              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                              <input
                                type="text"
                                placeholder="Filter EOC Sector name or town..."
                                value={adminMapSearch}
                                onChange={(e) => {
                                  setAdminMapSearch(e.target.value);
                                  playBeepDashboard(1000, 0.04);
                                }}
                                className={`w-full border rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-mono focus:outline-none focus:border-[#0a84ff] transition-all ${
                                  isDarkMode 
                                    ? 'bg-black/60 border-white/10 text-zinc-200 placeholder-zinc-500' 
                                    : 'bg-zinc-50 border-zinc-200 text-zinc-800 placeholder-zinc-400'
                                }`}
                              />
                            </div>

                            {/* Dynamically Filtered EOC buttons list */}
                            <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
                              {baseShelters
                                .filter(sh => 
                                  sh.name.toLowerCase().includes(adminMapSearch.toLowerCase()) || 
                                  sh.zone.toLowerCase().includes(adminMapSearch.toLowerCase())
                                )
                                .map((sh) => (
                                  <button
                                    key={sh.id}
                                    onClick={() => {
                                      setSelectedShelterDetail(sh);
                                      setShowRouteActive(false);
                                      showToast(`Telemetry targeted on ${sh.name}`, 'success');
                                      playBeepDashboard(880, 0.12);
                                    }}
                                    className={`px-2.5 py-2 rounded-lg border transition-all duration-150 flex items-center justify-between cursor-pointer text-[10px] font-bold ${
                                      isDarkMode 
                                        ? 'border-white/5 bg-white/[0.02] hover:bg-[#0a84ff]/10 hover:border-[#0a84ff]/30 text-zinc-300 hover:text-white' 
                                        : 'border-zinc-150 bg-zinc-50 hover:bg-[#0a84ff]/5 hover:border-[#0a84ff]/25 text-zinc-650 hover:text-[#0a84ff]'
                                    }`}
                                  >
                                    <span className="flex items-center gap-1.5 truncate">
                                      <Crosshair size={10} className="text-zinc-500 shrink-0" />
                                      <span className="truncate font-mono">{sh.name}</span>
                                    </span>
                                    <span className={`text-[8px] font-mono text-zinc-500 shrink-0 px-1 py-0.5 rounded ml-1 ${
                                      isDarkMode ? 'bg-white/5' : 'bg-zinc-200'
                                    }`}>
                                      {sh.zone}
                                    </span>
                                  </button>
                                ))}
                              {baseShelters.filter(sh => 
                                sh.name.toLowerCase().includes(adminMapSearch.toLowerCase()) || 
                                sh.zone.toLowerCase().includes(adminMapSearch.toLowerCase())
                              ).length === 0 && (
                                <div className="text-center py-4 text-[9px] font-mono text-zinc-500">
                                  No targeted EOC found
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}



                      {/* Floating Top Search Bar - Google Maps Style */}
                      {selectedShelterDetail && !showRouteActive && (
                        <div className={`absolute top-4 left-4 right-4 z-20 backdrop-blur-md rounded-2xl border shadow-xl px-4 py-3 flex items-center justify-between pointer-events-auto transition-all animate-[fadeIn_0.2s_ease-out] ${
                          isDarkMode 
                            ? 'bg-[#1C1C1E]/95 border-white/10 text-white' 
                            : 'bg-white/95 border-zinc-200 text-zinc-800'
                        }`}>
                          <div className="flex items-center space-x-3 flex-1">
                            <button
                              onClick={() => {
                                setSelectedShelterDetail(null);
                                setShowRouteActive(false);
                              }}
                              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                                isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500'
                              }`}
                              title="Go back to list"
                            >
                              <ArrowLeft size={16} />
                            </button>
                            <div className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-150' : 'text-zinc-800'}`}>
                              {selectedShelterDetail.name}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedShelterDetail(null);
                              setShowRouteActive(false);
                            }}
                            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                              isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600'
                            }`}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}



                      {/* Google Maps Detail Sheet at the bottom */}
                      {selectedShelterDetail && !showRouteActive && (
                        <div className={`absolute bottom-4 left-4 right-4 z-20 backdrop-blur-md rounded-3xl border shadow-2xl p-4 flex flex-col pointer-events-auto select-none max-h-[300px] overflow-y-auto animate-[slideInUp_0.25s_ease-out] ${
                          isDarkMode 
                            ? 'bg-[#1C1C1E]/95 border-white/10 text-white' 
                            : 'bg-white border-zinc-200 text-zinc-800'
                        }`}>
                          {/* Mini top bar/drag-handle */}
                          <div className={`w-12 h-1 rounded-full mx-auto mb-2 shrink-0 ${
                            isDarkMode ? 'bg-zinc-700' : 'bg-zinc-300'
                          }`}></div>

                          {/* Title & metadata row */}
                          <div className="flex items-start justify-between shrink-0">
                            <div className="space-y-0.5 min-w-0 flex-1">
                              <h4 className={`text-base font-extrabold tracking-tight truncate ${
                                isDarkMode ? 'text-white' : 'text-zinc-900'
                              }`}>
                                {selectedShelterDetail.name}
                              </h4>
                              <p className={`text-[11px] flex flex-wrap items-center gap-1.5 font-sans ${
                                isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                              }`}>
                                <span>No reviews</span>
                                <span className={isDarkMode ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
                                <span className="flex items-center gap-0.5"><Clock size={10} /> {selectedShelterDetail.time || "9 min"}</span>
                                <span className={isDarkMode ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
                                <span className="text-[#0a84ff] font-medium truncate">National Secondary School</span>
                                <span className={isDarkMode ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
                                <span className={`inline-flex items-center justify-center rounded px-1 py-0.5 text-[9px] font-bold ${
                                  isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'
                                }`}>♿</span>
                              </p>
                            </div>
                            
                            {/* Actions icons */}
                            <div className="flex items-center space-x-1 ml-2 shrink-0">
                              <button 
                                onClick={() => {
                                  const isBookmarked = bookmarkedShelters.includes(selectedShelterDetail.id);
                                  if (isBookmarked) {
                                    setBookmarkedShelters(prev => prev.filter(id => id !== selectedShelterDetail.id));
                                    showToast('Removed from saved favorites', 'info');
                                  } else {
                                    setBookmarkedShelters(prev => [...prev, selectedShelterDetail.id]);
                                    showToast('Saved to your favorites list!', 'success');
                                  }
                                }}
                                className={`p-2 rounded-full transition-colors cursor-pointer ${
                                  bookmarkedShelters.includes(selectedShelterDetail.id)
                                    ? 'bg-amber-500/10 text-amber-500'
                                    : (isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-350' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600')
                                }`}
                                title="Bookmark location"
                              >
                                <Bookmark size={14} fill={bookmarkedShelters.includes(selectedShelterDetail.id) ? "currentColor" : "none"} />
                              </button>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(`${selectedShelterDetail.name}, ${selectedShelterDetail.address}`);
                                  showToast('Location address copied to clipboard!', 'info');
                                }}
                                className={`p-2 rounded-full transition-colors cursor-pointer ${
                                  isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-350' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                                }`}
                                title="Share location"
                              >
                                <Share2 size={14} />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedShelterDetail(null);
                                  setShowRouteActive(false);
                                }}
                                className={`p-2 rounded-full transition-colors cursor-pointer ${
                                  isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-350' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
                                }`}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Pill button actions row */}
                          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none shrink-0 pointer-events-auto">
                            <button
                              onClick={() => {
                                setShowRouteActive(true);
                                showToast(`Calculating evacuation route to ${selectedShelterDetail.name}...`, 'success');
                              }}
                              className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#007a87] text-white hover:bg-[#00636e] active:scale-95 transition-all text-xs font-bold shrink-0 cursor-pointer shadow-sm"
                            >
                              <ArrowUpRight size={13} className="rotate-45" />
                              <span>Directions</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                setShowRouteActive(true);
                                showToast(`Simulation started: Turn-by-turn guidance to ${selectedShelterDetail.name}`, 'info');
                              }}
                              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full active:scale-95 transition-all text-xs font-bold shrink-0 cursor-pointer ${
                                isDarkMode 
                                  ? 'bg-blue-900/20 hover:bg-blue-900/35 text-[#8ab4f8]' 
                                  : 'bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1a73e8]'
                              }`}
                            >
                              <Navigation size={12} className="rotate-45 fill-current" />
                              <span>Start</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                showToast(`Calling ${selectedShelterDetail.name} desk: +60 3-6091 2345`, 'success');
                              }}
                              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full active:scale-95 transition-all text-xs font-bold shrink-0 cursor-pointer ${
                                isDarkMode 
                                  ? 'bg-zinc-800 hover:bg-zinc-700 text-[#8ab4f8]' 
                                  : 'bg-zinc-100 hover:bg-zinc-200 text-[#1a73e8]'
                              }`}
                            >
                              <Phone size={12} />
                              <span>Call</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                const isBookmarked = bookmarkedShelters.includes(selectedShelterDetail.id);
                                if (isBookmarked) {
                                  setBookmarkedShelters(prev => prev.filter(id => id !== selectedShelterDetail.id));
                                  showToast('Removed from saved places', 'info');
                                } else {
                                  setBookmarkedShelters(prev => [...prev, selectedShelterDetail.id]);
                                  showToast('Saved place!', 'success');
                                }
                              }}
                              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full active:scale-95 transition-all text-xs font-bold shrink-0 cursor-pointer ${
                                isDarkMode 
                                  ? 'bg-zinc-800 hover:bg-zinc-700 text-[#8ab4f8]' 
                                  : 'bg-zinc-100 hover:bg-zinc-200 text-[#1a73e8]'
                              }`}
                            >
                              <Bookmark size={12} fill={bookmarkedShelters.includes(selectedShelterDetail.id) ? "currentColor" : "none"} />
                              <span>{bookmarkedShelters.includes(selectedShelterDetail.id) ? 'Saved' : 'Save'}</span>
                            </button>
                          </div>

                          {/* Photos Carousel */}
                          <div className={`flex items-center space-x-2 mt-3 overflow-x-auto pb-1 shrink-0 select-none scrollbar-thin ${
                            isDarkMode ? 'scrollbar-thumb-zinc-800' : 'scrollbar-thumb-zinc-300'
                          }`}>
                            {getShelterPhotos(selectedShelterDetail.id).map((photoUrl, idx) => (
                              <div key={idx} className={`relative w-36 h-24 rounded-xl overflow-hidden shrink-0 shadow border ${
                                isDarkMode ? 'border-white/5 bg-zinc-850' : 'border-black/5 bg-zinc-100'
                              }`}>
                                <img 
                                  src={photoUrl} 
                                  alt={`${selectedShelterDetail.name} preview ${idx + 1}`} 
                                  className="w-full h-full object-cover pointer-events-none select-none"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Route guidance active banner */}
                      {selectedShelterDetail && showRouteActive && (
                        <div className={`absolute top-4 left-4 right-4 z-20 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-[fadeInDown_0.2s_ease-out] pointer-events-auto font-sans border ${
                          isDarkMode 
                            ? 'bg-[#1C1C1E]/95 border-white/10 text-white' 
                            : 'bg-white border-zinc-200 text-zinc-800'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className="p-3 rounded-xl bg-[#0a84ff]/10 text-[#0a84ff] shrink-0 animate-pulse">
                              <Navigation size={20} className="rotate-45" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 flex-wrap">
                                <span className="text-[10px] font-black tracking-widest uppercase text-zinc-400">ROUTE GUIDANCE ACTIVE</span>
                                <span className="text-[9px] bg-[#0a84ff]/15 text-[#30b0ff] font-bold px-2 py-0.5 rounded-full uppercase font-mono">Google Maps</span>
                              </div>
                              <h4 className={`text-sm font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                                Routing to {selectedShelterDetail.name}
                              </h4>
                              <p className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                {selectedShelterDetail.address} • <span className="font-mono text-emerald-450 dark:text-emerald-400 font-bold">{selectedShelterDetail.distance} ({selectedShelterDetail.time})</span>
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              setShowRouteActive(false);
                              showToast('Returned to location overview', 'info');
                            }}
                            className={`px-4 py-2 rounded-xl transition-all text-xs font-bold cursor-pointer flex items-center space-x-1.5 shrink-0 border ${
                              isDarkMode 
                                ? 'bg-zinc-850 hover:bg-zinc-800 text-white hover:text-red-400 border-white/5' 
                                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 hover:text-red-500 border-zinc-200'
                            }`}
                          >
                            <X size={12} />
                            <span>Exit Route View</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right col for broadcaster, shelters, and rescues */}
                <div className="space-y-8">
                  
                  {/* Global Emergency Broadcaster */}
                  <div className={`p-6 rounded-[32px] border shadow-lg relative overflow-hidden ${glassCardClass} xl:h-[432px] flex flex-col justify-between`}>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-red-500/30"></div>
                    <div className="flex items-center space-x-3 mb-4 shrink-0 select-none">
                      <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/25 shrink-0">
                        <Radio size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-bold tracking-tight text-sm leading-snug ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                          Emergency Broadcast Desk
                        </h3>
                        <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight font-sans">Dispatch emergency bulletins and evacuation advisories instantly</p>
                      </div>
                    </div>

                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="grid grid-cols-2 gap-3 shrink-0">
                        <div className="flex flex-col space-y-1.5 min-w-0">
                          <label className="text-[8.5px] font-black uppercase tracking-wider text-[#0a84ff] font-mono whitespace-nowrap truncate select-none">Target District</label>
                          <div className="relative">
                            <select 
                              value={broadcastZone} 
                              onChange={(e) => setBroadcastZone(e.target.value)}
                              className={`px-3 pr-8 py-2.5 rounded-[12px] text-xs font-black outline-none border appearance-none transition-all duration-300 focus:ring-2 focus:ring-[#0a84ff]/25 focus:border-[#0a84ff] w-full cursor-pointer ${
                                isDarkMode ? 'bg-zinc-950/80 border-white/5 text-zinc-100' : 'bg-white border-zinc-250 text-zinc-850'
                              }`}
                            >
                              <option value="ALL ZONES">All Districts</option>
                              {manualLocations.map(loc => (
                                <option key={loc.name} value={loc.name}>{loc.name} Sector</option>
                              ))}
                            </select>
                            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0a84ff] pointer-events-none opacity-85" strokeWidth={2.5} />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1.5 min-w-0">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#0a84ff] font-sans whitespace-nowrap truncate select-none">Alert Urgency</label>
                          <div className="relative">
                            <select 
                              value={broadcastType} 
                              onChange={(e) => setBroadcastType(e.target.value)}
                              className={`px-3 pr-8 py-2.5 rounded-[12px] text-xs font-semibold outline-none border appearance-none transition-all duration-300 focus:ring-2 focus:ring-red-500/10 focus:border-red-500 w-full cursor-pointer ${
                                isDarkMode ? 'bg-zinc-950/80 border-white/5 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-800'
                              }`}
                            >
                              <option value="Evacuation Order">Evacuation Order</option>
                              <option value="Flash Flood Watch">Flash Flood Watch</option>
                              <option value="Safe to Return">Safe to Return</option>
                              <option value="System Override Notification">System Override</option>
                            </select>
                            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none opacity-85" strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5 flex-1 justify-center py-1">
                        <div className="flex justify-between items-center mb-1 select-none">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#0a84ff] font-sans">Broadcast Message Body</label>
                          <span className="text-[10px] text-zinc-400 font-sans">{broadcastMessage.length} / 250 characters</span>
                        </div>
                        <textarea
                          value={broadcastMessage} 
                          onChange={(e) => setBroadcastMessage(e.target.value)}
                          placeholder="Type alert message or evacuation details to broadcast to citizens..."
                          className={`w-full p-3.5 rounded-[16px] text-xs resize-none outline-none border transition-all duration-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 flex-1 leading-relaxed ${
                            isDarkMode ? 'bg-black/60 border-white/5 text-zinc-100 font-semibold' : 'bg-white border-zinc-200 text-zinc-800 font-semibold'
                          }`}
                          rows={3}
                          maxLength={250}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-sans text-zinc-400 tracking-wide border-t border-zinc-500/10 pt-2 shrink-0 select-none">
                        <span>Evacuation Protocol Alert</span>
                        <span>Channel: 162.400 MHz</span>
                      </div>

                      <button 
                        onClick={handleBroadcast} 
                        disabled={isBroadcasting || !broadcastMessage} 
                        className={`w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 text-center flex items-center justify-center space-x-2 select-none cursor-pointer shrink-0 shadow-sm`}
                      >
                        {isBroadcasting ? (
                          <>
                            <Loader2 size={13} className="animate-spin text-white" />
                            <span>Transmitting Broadcast...</span>
                          </>
                        ) : (
                          <>
                            <Radio size={12} />
                            <span>Send Broadcast Bulletin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Immediate Assistance Requests */}
                  <div className={`px-6 py-6 rounded-[32px] border relative ${isDarkMode ? 'border-white/5 bg-white/[0.015]' : 'border-zinc-200 bg-white'} overflow-hidden xl:h-[630px] flex flex-col shadow-sm`}>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-red-500/20"></div>
                    <div className="flex items-center gap-3 mb-5 shrink-0 select-none">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 shrink-0">
                          <Crosshair size={18} className={pendingRescueCount > 0 ? "text-red-500" : "text-zinc-400"} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className={`font-bold tracking-tight text-sm sm:text-base leading-snug ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                            Emergency Calls for Assistance
                          </h3>
                          <p className="text-[10px] text-zinc-400 font-sans mt-0.5 leading-snug">
                            Incoming citizen beacon alerts requiring dispatch assignment
                          </p>
                          <div className="mt-1.5 font-sans">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              pendingRescueCount > 0 ? 'bg-red-500/10 text-red-500 border border-red-500/10' : 'bg-zinc-500/10 text-zinc-400'
                            }`}>
                              {pendingRescueCount} active alert{pendingRescueCount === 1 ? '' : 's'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-1 space-y-4 no-scrollbar">
                      {sosRequests.filter(s => !['RESOLVED'].includes(s.status)).length === 0 ? (
                        <div className="h-44 flex flex-col items-center justify-center text-center opacity-45">
                          <CheckCircle size={32} className="text-[#32d74b] mb-3 opacity-85" />
                          <h5 className="font-bold text-xs uppercase tracking-wider">All Clear</h5>
                          <p className="text-[10px] mt-1 text-center font-sans font-medium">No active assistance calls at this time.</p>
                        </div>
                      ) : (
                        <>
                          {sosRequests.filter(s => !['RESOLVED'].includes(s.status)).slice(0, 2).map(sos => {
                            const isPendingReal = sos.status === 'PENDING';
                            return (
                              <div 
                                key={sos.id} 
                                onClick={() => handleLocateSosOnMap(sos)}
                                className={`p-4 rounded-[20px] border transition-all duration-300 relative overflow-hidden cursor-pointer hover:scale-[1.01] hover:shadow-md ${
                                  isPendingReal 
                                    ? 'bg-[#ff453a]/5 border-[#ff453a]/25 hover:border-[#ff453a]/60' 
                                    : 'bg-[#0a84ff]/5 border-[#0a84ff]/15 hover:border-[#0a84ff]/40'
                                }`}
                                title="Click to locate on map"
                              >
                                <div className="flex flex-col gap-2 mb-3">
                                  <div className="flex items-center justify-between gap-2 flex-wrap w-full select-none font-sans">
                                    <span className={`px-2 py-0.5 text-[9px] font-semibold tracking-wider rounded-md text-white shrink-0 shadow-sm ${
                                      isPendingReal ? 'bg-[#ff453a]' : 'bg-blue-600'
                                    }`}>
                                      {sos.status.replace('_', ' ')}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 font-medium shrink-0">
                                      {sos.timestamp ? new Date(sos.timestamp && typeof sos.timestamp.toDate === 'function' ? sos.timestamp.toDate() : sos.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : 'Just now'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between gap-2">
                                    <h5 className={`font-bold text-[13px] tracking-tight leading-snug break-words uppercase flex-1 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                                      {sos.zone} Sector - Beacon #{sos.id.slice(-4).toUpperCase()}
                                    </h5>
                                    <div className="text-[9px] font-bold text-[#0a84ff] flex items-center space-x-1 shrink-0 select-none bg-[#0a84ff]/10 px-2.5 py-1 rounded-lg">
                                      <MapPin size={10} />
                                      <span>Locate</span>
                                    </div>
                                  </div>
                                </div>

                                <div className={`space-y-1.5 text-[10.5px] p-3 rounded-xl border mb-3 leading-normal font-sans ${
                                  isDarkMode 
                                    ? 'text-zinc-400 bg-black/20 border-white/[0.02]' 
                                    : 'text-zinc-700 bg-zinc-50 border-zinc-150/80 font-medium shadow-sm'
                                }`}>
                                  <p className="flex justify-between">
                                    <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600 font-semibold'}>Coordinates:</span>
                                    <span className={isDarkMode ? 'text-zinc-300 font-mono font-bold' : 'text-black font-mono font-black'}>{sos.lat?.toFixed(5)} / {sos.lon?.toFixed(5)}</span>
                                  </p>
                                  <p className="flex justify-between">
                                    <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600 font-semibold'}>Register Code:</span>
                                    <span className={isDarkMode ? 'text-zinc-300 font-bold font-mono' : 'text-black font-black font-mono'}>EVAC-ID-{sos.id.slice(-6).toUpperCase()}</span>
                                  </p>
                                </div>

                                {isPendingReal ? (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDispatchRescue(sos.id);
                                    }} 
                                    className="w-full py-2.5 px-4 rounded-xl bg-[#0a84ff] hover:bg-blue-600 text-white font-bold text-xs tracking-wider shadow-sm transition-all hover:scale-[1.01] active:scale-95 text-center flex items-center justify-center space-x-1.5 cursor-pointer select-none"
                                  >
                                    <Truck size={12} className="shrink-0" />
                                    <span>Deploy Response Unit</span>
                                  </button>
                                ) : (
                                  <div className="w-full py-2 px-4 rounded-xl text-[10px] font-bold text-center border border-emerald-500/15 text-emerald-500 bg-emerald-500/5 truncate select-none">
                                    ● Response unit assigned and deployed
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {sosRequests.filter(s => !['RESOLVED'].includes(s.status)).length > 2 && (
                            <button
                              onClick={() => {
                                setAdminView('dispatch');
                                document.getElementById('root')?.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`w-full py-3 px-4 rounded-xl text-center text-xs font-bold tracking-wider transition-all duration-200 border cursor-pointer select-none flex items-center justify-center space-x-2 ${
                                isDarkMode
                                  ? 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10 hover:border-white/20'
                                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                              }`}
                            >
                              <span>Show More ({sosRequests.filter(s => !['RESOLVED'].includes(s.status)).length - 2} Alerts Hidden)</span>
                              <ChevronRight size={14} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                </div>

                {/* Evacuation Center Network - Repositioned horizontally underneath both columns */}
                <div className="xl:col-span-3 font-sans">
                  <div className={`p-6 sm:p-8 rounded-[32px] border relative overflow-hidden ${isDarkMode ? 'border-white/5 bg-white/[0.015]' : 'border-zinc-200 bg-white'} space-y-6 shadow-sm`}>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-green-500/20"></div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                      <div className="flex items-center space-x-3 min-w-0 select-none">
                        <div className="p-2.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 shrink-0">
                          <Tent size={18} className="text-green-500" />
                        </div>
                        <div className="min-w-0">
                          <h3 className={`text-base font-bold tracking-tight leading-snug ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                            Evacuation Shelter Network
                          </h3>
                          <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                            Capacity index and registered safehouse occupancies
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs bg-zinc-500/5 px-4 py-2 rounded-xl border border-zinc-500/10 font-medium self-start md:self-auto shrink-0 select-none">
                        <span className="opacity-75 font-semibold text-[11px]">Total Network Occupancy:</span>
                        <span className={`font-mono font-bold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{totalCurrentShelterOccupancy} / {totalSheltersCapacityMax} guests</span>
                        <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                          overallShelterOccupancyPct >= 80 ? 'bg-red-500/10 text-red-500' : 'bg-green-550/10 text-emerald-500'
                        }`}>{overallShelterOccupancyPct}% load</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {[...baseShelters]
                        .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                        .slice(0, showAllShelters ? baseShelters.length : 3)
                        .map(shelter => {
                        const statusObj = shelterStatus[shelter.id];
                        const occ = getShelterOccupancy(shelter);
                        const isFull = occ.pct >= 100;
                        return (
                          <div 
                            key={shelter.id} 
                            className={`p-5 rounded-[24px] border transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden ${
                              isFull 
                                ? 'bg-red-500/5 border-red-500/25 shadow-sm' 
                                : isDarkMode 
                                  ? 'bg-zinc-950/40 border-white/5 hover:border-white/10 shadow-sm' 
                                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                            }`}
                          >
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start gap-2.5 mb-3">
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider block">ID: SLG-{shelter.id.toUpperCase()}</span>
                                    <h5 className={`text-sm font-bold tracking-tight truncate mt-1 leading-tight ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                                      {statusObj?.name || shelter.name}
                                    </h5>
                                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 truncate font-medium">
                                      {statusObj?.address || shelter.address}
                                    </p>
                                  </div>
                                  <span className={`px-2.5 py-0.5 text-[10px] font-semibold tracking-wider rounded-md shrink-0 shadow-sm ${
                                    isFull ? 'bg-red-600 text-white' : ''
                                  }`} style={{ backgroundColor: isFull ? undefined : occ.color, color: isFull ? undefined : '#fff' }}>
                                    {isFull ? 'FULL' : `${occ.pct.toFixed(0)}% LOAD`}
                                  </span>
                                </div>

                                <div className={`space-y-1.5 my-3.5 text-[11px] p-3 rounded-xl border ${
                                  isDarkMode 
                                    ? 'text-zinc-400 bg-black/20 border-white/[0.02]' 
                                    : 'text-zinc-600 bg-zinc-50 border-zinc-100'
                                }`}>
                                  <div className="flex justify-between font-medium">
                                    <span>Supervisor:</span>
                                    <span className={isDarkMode ? 'text-zinc-300' : 'text-zinc-800 font-bold'}>{statusObj?.supervisor || "Ramli A."}</span>
                                  </div>
                                  <div className="flex justify-between font-medium">
                                    <span>Shelter Status:</span>
                                    <span className={isFull 
                                      ? (isDarkMode ? "text-red-400 font-bold" : "text-red-600 font-bold") 
                                      : (isDarkMode ? "text-emerald-400 font-bold" : "text-emerald-600 font-bold")
                                    }>
                                      {isFull ? "Capacity Met" : "Accepting Guests"}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center text-[11px] font-medium mt-2 select-none">
                                  <span className="text-zinc-500 dark:text-zinc-400">Registered Guests:</span>
                                  <span className={isDarkMode ? 'text-zinc-300 font-bold' : 'text-zinc-800 font-bold font-mono'}>
                                    {occ.cap} / {statusObj?.maxCapacity !== undefined ? statusObj.maxCapacity : shelter.maxCapacity}
                                  </span>
                                </div>
                                
                                <div className="w-full bg-zinc-500/10 h-1.5 rounded-full mt-2 overflow-hidden mb-3.5">
                                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(occ.pct, 100)}%`, backgroundColor: occ.color }}></div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 mt-2 select-none">
                                <button 
                                  onClick={() => handleGoToShelterPage(shelter)} 
                                  className={`py-2 rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer ${
                                    isDarkMode 
                                      ? 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10' 
                                      : 'bg-zinc-100 text-zinc-750 border-zinc-200 hover:bg-zinc-250'
                                  }`}
                                >
                                  <Edit size={12} />
                                  <span>Edit / Patch</span>
                                </button>

                                <button 
                                  onClick={() => toggleShelterCapacity(shelter.id, isFull)} 
                                  className={`py-2 rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer ${
                                    isFull 
                                      ? 'bg-zinc-500/10 text-zinc-205 hover:bg-zinc-500/15 border-zinc-500/20' 
                                      : 'bg-transparent text-red-500 border-red-500/20 hover:bg-red-500/5 hover:border-red-500/30'
                                  }`}
                                >
                                  {isFull ? (
                                    <>
                                      <CheckCircle size={12} />
                                      <span>Available</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertOctagon size={12} />
                                      <span>Mark Full</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* High-Tech Evacuation Controls / Expansion Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-zinc-500/10 select-none">
                      <button
                        onClick={() => setShowAllShelters(!showAllShelters)}
                        className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 border cursor-pointer ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 active:scale-95'
                            : 'bg-zinc-100 border-zinc-250 text-zinc-850 hover:bg-zinc-200 hover:border-zinc-300 active:scale-95'
                        }`}
                      >
                        {showAllShelters ? (
                          <>
                            <ChevronUp size={14} className="shrink-0" />
                            <span>Collapse Network View</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown size={14} className="shrink-0" />
                            <span>Show More Shelters ({baseShelters.length - 3} Hidden)</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setAdminView('shelter');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          showToast('Navigating to Relief Shelter & Stock Logistics panel...', 'info');
                        }}
                        className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-95 cursor-pointer"
                      >
                        <Tent size={14} className="shrink-0" />
                        <span>Open Shelter Logistics Portal</span>
                        <ArrowUpRight size={14} className="shrink-0" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
                </>
  );
};
```

## File: src/components/desktop/ResidentDirectory.tsx
```typescript
import React, { useState } from 'react';
import { Users, Search, X } from 'lucide-react';
import { IncidentCitizen } from '../eocTypes';

interface ResidentDirectoryProps {
  isDarkMode: boolean;
  glassCardClass: string;
  citizens: IncidentCitizen[];
  setSelectedCitizenId: (id: string | null) => void;
}

export const ResidentDirectory: React.FC<ResidentDirectoryProps> = ({
  isDarkMode,
  glassCardClass,
  citizens,
  setSelectedCitizenId,
}) => {
  const [citizenSearch, setCitizenSearch] = useState('');
  const [citizenStatusFilter, setCitizenStatusFilter] = useState('ALL');

  const filteredCitizens = citizens.filter((c) => {
    const query = citizenSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.phone.includes(query) ||
      c.zone.toLowerCase().includes(query) ||
      c.id.toLowerCase().includes(query);

    const matchesFilter = citizenStatusFilter === 'ALL' || c.status === citizenStatusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-10 max-w-[1700px] mx-auto w-full pb-20 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div className={`p-8 rounded-[32px] border shadow-2xl relative overflow-hidden ${glassCardClass}`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#0a84ff]/25"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-xl font-bold tracking-tight flex items-center space-x-2.5">
              <Users className="text-[#0a84ff]" size={20} />
              <span>Resident Directory</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              Cross-reference registered citizens, safety status, and evacuation zones.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold opacity-75 bg-zinc-500/5 px-3.5 py-1.5 rounded-lg border border-zinc-500/10">
              Active Beacons: {citizens.filter((c) => c.status.includes('SOS')).length} / {citizens.length}
            </span>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer border border-blue-500/20">
              Export Directory (.CSV)
            </button>
          </div>
        </div>

        {/* Search query input and tags selection row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative font-sans">
          <div
            className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl border ${
              isDarkMode ? 'bg-black/30 border-white/10' : 'bg-gray-50 border-zinc-200'
            }`}
          >
            <Search size={15} className="opacity-45 shrink-0" />
            <input
              type="text"
              value={citizenSearch}
              onChange={(e) => setCitizenSearch(e.target.value)}
              placeholder="Search residents by ID, name, zone..."
              className={`w-full bg-transparent border-none outline-none text-xs font-semibold ${
                isDarkMode ? 'text-white' : 'text-zinc-800'
              } placeholder-gray-500`}
            />
            {citizenSearch && (
              <button
                onClick={() => setCitizenSearch('')}
                className="text-xs opacity-45 hover:opacity-100 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="col-span-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-semibold opacity-75 mr-2">Filter status:</span>
            {['ALL', 'SAFE', 'EVACUATED', 'SOS PENDING'].map((tag) => (
              <button
                key={tag}
                onClick={() => setCitizenStatusFilter(tag)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  citizenStatusFilter === tag
                    ? 'bg-[#0a84ff]/15 text-[#0a84ff] border border-[#0a84ff]/25 shadow-sm'
                    : isDarkMode
                    ? 'bg-white/5 border border-white/5 text-zinc-400 hover:bg-white/10'
                    : 'bg-black/5 border border-black/5 text-zinc-650 hover:bg-black/10'
                }`}
              >
                {tag === 'ALL' ? 'Show All (' + citizens.length + ')' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search results database table */}
        <div
          className={`w-full overflow-x-auto border rounded-2xl ${
            isDarkMode ? 'border-white/5 bg-black/20' : 'border-zinc-200 bg-white'
          }`}
        >
          {filteredCitizens.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center opacity-45">
              <Search size={36} className="mb-3" />
              <h4 className="font-bold text-xs uppercase tracking-wider">No matching records found</h4>
              <p className="text-[10px] mt-1 font-sans">
                Refine your search search query or change filter terms.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr
                  className={`border-b ${
                    isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-200 bg-zinc-50'
                  } text-zinc-400 uppercase tracking-widest text-[9.5px] font-semibold select-none`}
                >
                  <th className="py-4 pl-6">Resident Name</th>
                  <th className="py-4">Designated Contact</th>
                  <th className="py-4">Sector Coordinates</th>
                  <th className="py-4">Evac Status Tag</th>
                  <th className="py-4 text-right pr-6">Database Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500/5">
                {filteredCitizens.map((c) => {
                  const isSos = c.status.includes('SOS');
                  const isEvac = c.status === 'EVACUATED';
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCitizenId(c.id)}
                      className={`hover:bg-white/[0.04] transition-colors group cursor-pointer ${
                        isSos ? 'bg-red-500/[0.03]' : ''
                      }`}
                    >
                      <td className="py-4 pl-6 font-semibold text-sm tracking-tight flex items-center space-x-3">
                        <div
                          className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                            isSos
                              ? 'bg-[#ff453a]/15 text-[#ff453a] border-[#ff453a]/30'
                              : isEvac
                              ? 'bg-[#0a84ff]/15 text-[#0a84ff] border-[#0a84ff]/30'
                              : 'bg-[#32d74b]/15 text-[#32d74b] border-[#32d74b]/30'
                          }`}
                        >
                          {c.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .substring(0, 2)
                            .toUpperCase()}
                        </div>
                        <div className="leading-normal">
                          <p className={`font-semibold text-sm ${isDarkMode ? 'text-zinc-100' : 'text-zinc-800'}`}>
                            {c.name}
                          </p>
                          <p className="text-[10px] text-zinc-400 uppercase font-mono">
                            {c.id.substring(0, 8)}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 opacity-80 font-mono text-zinc-400">{c.phone}</td>
                      <td className="py-4 font-bold text-[11px] opacity-85 tracking-tight font-sans text-zinc-400">
                        {c.zone}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[9px] font-semibold uppercase tracking-wider ${
                            isSos
                              ? 'bg-[#ff453a]/20 text-[#ff453a] border border-[#ff453a]/30'
                              : isEvac
                              ? 'bg-[#0a84ff]/25 text-[#0a84ff]'
                              : 'bg-[#32d74b]/15 text-[#32d74b]'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4 font-semibold text-right pr-6 text-zinc-400">
                        Verifiably Checked
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
```

## File: src/components/mobile/MobileAlertsPage.tsx
```typescript
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
```

## File: src/components/mobile/MobileCommunityPage.tsx
```typescript
import React from 'react';
import {
  Users, MessageSquare, Info, Shield, Radio, Search, Image as ImageIcon,
  MapPin, Plus, Heart, ChevronDown, ChevronUp, Check, AlertTriangle,
  CheckCircle, ArrowUpRight, HelpCircle, Phone, Globe, Trash2, Calendar,
  Compass, X, Droplet, ShieldCheck, ChevronLeft, Activity, ShieldAlert, HeartHandshake
} from 'lucide-react';

interface MobileCommunityPageProps {
  isDarkMode: boolean;
  glassCardClass: string;
  textPrimary: string;
  textSecondary: string;
  t: any;
  selectedCommunityId: number | null;
  setSelectedCommunityId: (id: number | null) => void;
  selectedDetailTab: 'about' | 'feed' | 'directory' | 'resources' | 'mutualaid';
  setSelectedDetailTab: (tab: 'about' | 'feed' | 'directory' | 'resources' | 'mutualaid') => void;
  myCommunitiesSubTab: 'communities' | 'feed';
  setMyCommunitiesSubTab: (tab: 'communities' | 'feed') => void;
  newPostText: string;
  setNewPostText: (val: string) => void;
  newPostImage: string | null;
  setNewPostImage: (val: string | null) => void;
  handleCommunityImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  composerCommunityId: string;
  setComposerCommunityId: (id: string) => void;
  handlePostCommunity: (communityId?: number) => void;
  handleToggleUpvote: (postId: string) => void;
  handleDeletePost: (postId: string) => void;
  communityDetailsAccordionOpen: boolean;
  setCommunityDetailsAccordionOpen: (open: boolean) => void;
  handleCommunityCheckin: (status: 'safe' | 'evac' | 'sos', communityId: number) => void;
  mutualAidLedger: any[];
  setMutualAidLedger: React.Dispatch<React.SetStateAction<any[]>>;
  newAidType: 'request' | 'offer';
  setNewAidType: (type: 'request' | 'offer') => void;
  newAidItem: string;
  setNewAidItem: (val: string) => void;
  newAidLoc: string;
  setNewAidLoc: (val: string) => void;
  newAidDesc: string;
  setNewAidDesc: (val: string) => void;
  handleAddAidLedgerItem: (communityId: number) => void;
  communityPosts: any[];
  showToast: (msg: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  profileName: string;
  fetchLiveLocation: () => void;
  currentLocation: string;
  ALL_COMMUNITIES: any[];
  SEED_POSTS: any[];
  deletedPostIds: string[];
  upvotedPostIds: string[];
  user: any;
  isAdmin: boolean;
  communityCheckinStats: any;
  userCheckinStates: any;
}

export const MobileCommunityPage: React.FC<MobileCommunityPageProps> = ({
  isDarkMode,
  glassCardClass,
  textPrimary,
  textSecondary,
  t,
  selectedCommunityId,
  setSelectedCommunityId,
  selectedDetailTab,
  setSelectedDetailTab,
  myCommunitiesSubTab,
  setMyCommunitiesSubTab,
  newPostText,
  setNewPostText,
  newPostImage,
  setNewPostImage,
  handleCommunityImage,
  composerCommunityId,
  setComposerCommunityId,
  handlePostCommunity,
  handleToggleUpvote,
  handleDeletePost,
  communityDetailsAccordionOpen,
  setCommunityDetailsAccordionOpen,
  handleCommunityCheckin,
  mutualAidLedger,
  setMutualAidLedger,
  newAidType,
  setNewAidType,
  newAidItem,
  setNewAidItem,
  newAidLoc,
  setNewAidLoc,
  newAidDesc,
  setNewAidDesc,
  handleAddAidLedgerItem,
  communityPosts,
  showToast,
  profileName,
  fetchLiveLocation,
  currentLocation,
  ALL_COMMUNITIES,
  SEED_POSTS,
  deletedPostIds,
  upvotedPostIds,
  user,
  isAdmin,
  communityCheckinStats,
  userCheckinStates
}) => {
  const communityImageRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col animate-[fadeIn_0.4s_ease-out] z-10">
      {selectedCommunityId === null ? (
        /* =========================================================================
           COMMUNITIES DASHBOARD VIEW (First & Second screens in reference)
           ========================================================================= */
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Header bar */}
          <div className="pt-24 px-6 pb-2 shrink-0 font-sans">
            <div className="flex justify-between items-end mb-1.5 flex-wrap gap-2">
              <h2 className={`text-3xl font-extrabold font-display tracking-tighter ${textPrimary} drop-shadow-md`}>
                Community
              </h2>
              <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full mb-1">
                4 Active Channels
              </span>
            </div>
            <p className={`text-xs font-medium ${textSecondary}`}>
              Connect with swift water rescuers, hydrologists, and weather spotters near you.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-32 space-y-5 no-scrollbar">
            {/* Top horizontal scrolled channels list */}
            <div className="pt-1">
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs font-black uppercase tracking-widest ${textPrimary} opacity-90`}>
                  All community
                </span>
                <button
                  onClick={() => setMyCommunitiesSubTab('communities')}
                  className="text-[11px] font-black uppercase tracking-wider text-[#0A84FF]"
                >
                  View all
                </button>
              </div>

              {/* Scrolling Circles List */}
              <div className="flex space-x-4 overflow-x-auto pb-2 pt-1 no-scrollbar select-none">
                {ALL_COMMUNITIES.map((community) => (
                  <button
                    key={community.id}
                    onClick={() => {
                      setSelectedCommunityId(community.id);
                      setSelectedDetailTab('about');
                    }}
                    className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
                  >
                    <div className="relative">
                      {/* Rounded avatar frame */}
                      <div className="w-[58px] h-[58px] rounded-full p-[2px] bg-gradient-to-tr from-[#0A84FF] via-purple-500 to-[#FF9F0A] shadow-md transition-transform active:scale-95 duration-300">
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#121214] relative bg-gradient-to-tr from-zinc-800 to-zinc-900 flex items-center justify-center">
                          {/* Fallback initials display */}
                          <span className="absolute text-[10px] font-black text-white tracking-widest select-none">
                            {community.shortName.substring(0, 3).toUpperCase()}
                          </span>
                          <img
                            src={community.bgImage}
                            alt={community.name}
                            className="w-full h-full object-cover transition-all relative z-10"
                            referrerPolicy="no-referrer"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-black/25 z-20"></div>
                        </div>
                      </div>
                      {/* Hot fire/star orange badge overlay */}
                      <span className="absolute -top-1 -right-1 bg-[#FF9F0A] text-white text-[8px] px-1 py-0.5 rounded-full font-black scale-90 border border-[#121214]">
                        {community.id === 'river-rescue' ? 'HOT' : community.id === 'hydrology' ? 'ACT' : 'LIVE'}
                      </span>
                    </div>
                    <span className={`text-[10px] mt-1.5 font-bold tracking-tight text-center truncate w-[68px] ${textPrimary}`}>
                      {community.shortName}
                    </span>
                  </button>
                ))}

                {/* Coming soon placeholder */}
                <div className="flex flex-col items-center flex-shrink-0 opacity-50">
                  <div className="w-[58px] h-[58px] rounded-full border-2 border-dashed border-zinc-500 flex items-center justify-center bg-black/5 dark:bg-white/5">
                    <Compass size={18} className={textSecondary} />
                  </div>
                  <span className={`text-[10px] mt-1.5 font-bold tracking-tight text-center w-[68px] ${textSecondary}`}>
                    Coming soon
                  </span>
                </div>
              </div>
            </div>

            {/* Main Dual Tab Switcher: My feed / My communities */}
            <div className="relative">
              <div className="flex border-b border-zinc-200 dark:border-white/10">
                <button
                  onClick={() => setMyCommunitiesSubTab('feed')}
                  className={`flex-1 py-2.5 text-center font-bold text-xs uppercase tracking-widest relative transition-all ${myCommunitiesSubTab === 'feed'
                      ? (isDarkMode ? 'text-white' : 'text-black')
                      : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                >
                  My feed
                  {myCommunitiesSubTab === 'feed' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0A84FF] rounded-full"></div>
                  )}
                </button>
                <button
                  onClick={() => setMyCommunitiesSubTab('communities')}
                  className={`flex-1 py-2.5 text-center font-bold text-xs uppercase tracking-widest relative transition-all ${myCommunitiesSubTab === 'communities'
                      ? (isDarkMode ? 'text-white' : 'text-black')
                      : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                >
                  My community
                  {myCommunitiesSubTab === 'communities' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0A84FF] rounded-full"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Dynamic Content Frame based on the Active Sub-tab */}
            {myCommunitiesSubTab === 'feed' ? (
              /* COMMUNITY FEED PANEL */
              <div className="space-y-4">
                {/* Write Post Box card */}
                <div className={`p-4 rounded-[28px] shadow-sm flex flex-col border ${glassCardClass}`}>
                  <div className="flex space-x-3 items-start">
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-[11px] ring-2 ring-[#0A84FF]/20 flex-shrink-0">
                      {profileName ? profileName.slice(0, 2).toUpperCase() : 'RE'}
                    </div>
                    <textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder="Report a river obstacle, downpour stream, or seek relief..."
                      className={`flex-1 bg-transparent resize-none outline-none font-medium text-sm pt-1.5 ${textPrimary} placeholder:text-zinc-500`}
                      rows={2}
                    />
                  </div>

                  {newPostImage && (
                    <div className="relative mt-2 ml-12 inline-block w-fit">
                      <img
                        src={newPostImage}
                        alt="Attachment"
                        className="h-20 w-auto rounded-xl object-cover border border-gray-500/20"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={() => setNewPostImage(null)}
                        className="absolute -top-2 -right-2 bg-[#FF453A] text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </div>
                  )}

                  {/* Options Selector and Publish row */}
                  <div className="flex justify-between items-center border-t border-gray-500/10 pt-3 mt-3">
                    {/* Left attachments and Tag Channel Dropdown */}
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={communityImageRef}
                        onChange={handleCommunityImage}
                      />
                      <button
                        onClick={() => communityImageRef.current?.click()}
                        className="text-zinc-500 p-1"
                        title="Attach image"
                      >
                        <ImageIcon size={18} />
                      </button>
                      <button
                        onClick={() => {
                          fetchLiveLocation();
                          showToast(`Location tagged: ${currentLocation}`, 'info');
                        }}
                        className="text-zinc-500 p-1"
                        title="Tag location"
                      >
                        <MapPin size={18} />
                      </button>

                      {/* Tag drop selector */}
                      <div className="border-l border-gray-500/15 pl-3 flex items-center relative">
                        <select
                          id="composer-community-id-select"
                          value={composerCommunityId}
                          onChange={(e) => setComposerCommunityId(e.target.value)}
                          className="bg-transparent text-[11px] font-black uppercase tracking-wider outline-none cursor-pointer text-[#0A84FF] pl-0 pr-3 appearance-none select-none focus:ring-0"
                          style={{
                            width:
                              composerCommunityId === 'river-rescue' ? '110px' :
                                composerCommunityId === 'hydrology' ? '128px' :
                                  composerCommunityId === 'storm-spotters' ? '110px' :
                                    composerCommunityId === 'care-sandbags' ? '138px' : '110px'
                          }}
                        >
                          {ALL_COMMUNITIES.map(c => (
                            <option key={c.id} value={c.id} className="dark:bg-[#121214] font-sans text-black dark:text-white">
                              Post in: {c.shortName}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={11} className="text-[#0A84FF] pointer-events-none absolute right-0.5 top-1/2 -translate-y-1/2 opacity-85" strokeWidth={3} />
                      </div>
                    </div>

                    <button
                      onClick={() => handlePostCommunity()}
                      disabled={!newPostText.trim() && !newPostImage}
                      className={`px-5 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-sm transition-transform active:scale-95 disabled:opacity-40 bg-[#0A84FF] text-white`}
                    >
                      Publish Post
                    </button>
                  </div>
                </div>

                {/* Dynamic Feed Post Cards */}
                {[...communityPosts, ...SEED_POSTS]
                  .filter((post: any) => !deletedPostIds.includes(post.id))
                  .map((post: any) => {
                    const relatedChan = ALL_COMMUNITIES.find(c => c.id === post.communityId) || ALL_COMMUNITIES[0];
                    return (
                      <div
                        key={post.id}
                        className={`p-4 rounded-[28px] shadow-sm border ${glassCardClass} flex flex-col space-y-3 transition-transform`}
                      >
                        {/* Community backlink indicator */}
                        <div className="flex justify-between items-center border-b border-gray-500/5 pb-2">
                          <button
                            onClick={() => {
                              setSelectedCommunityId(relatedChan.id);
                              setSelectedDetailTab('feed');
                            }}
                            className="flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-wider text-[#FF9F0A] hover:underline"
                          >
                            <Droplet size={10} fill="currentColor" />
                            <span>Posted in: {relatedChan.name}</span>
                          </button>
                          {post.isVerified && (
                            <div className="flex items-center space-x-1 py-0.5 px-1.5 rounded bg-[#32D74B]/10 text-[#32D74B] text-[8px] font-black uppercase">
                              <ShieldCheck size={10} />
                              <span>Verified Spotter</span>
                            </div>
                          )}
                        </div>

                        {/* Author Information row */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-400 flex items-center justify-center font-bold text-white text-xs select-none">
                              {post.authorName.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className={`block font-bold text-xs ${textPrimary}`}>
                                {post.authorName}
                              </span>
                              <div className={`flex items-center space-x-1.5 text-[10px] font-medium ${textSecondary}`}>
                                <MapPin size={9} />
                                <span>{post.zone || 'Flood Delta'}</span>
                                <span>·</span>
                                <span>
                                  {(() => {
                                    const m = post.timestamp?.toMillis ? post.timestamp.toMillis() : post.timestamp?.seconds ? post.timestamp.seconds * 1000 : Date.now();
                                    return new Date(m).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                  })()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Main Text & Image */}
                        {post.text && (
                          <p className={`text-xs leading-relaxed font-medium ${textPrimary} opacity-90`}>
                            {post.text}
                          </p>
                        )}
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Community dispatch update"
                            className="w-full h-auto max-h-48 object-cover rounded-2xl mt-1 border border-gray-500/10"
                            referrerPolicy="no-referrer"
                          />
                        )}

                        {/* Actions Footer row */}
                        <div className="flex items-center space-x-6 pt-2 border-t border-gray-500/5 text-gray-400 font-mono select-none">
                          <button
                            onClick={() => handleToggleUpvote(post.id)}
                            className={`flex items-center space-x-1.5 text-[9px] font-black uppercase transition-all duration-300 ${upvotedPostIds.includes(post.id) ? 'text-[#FF453A]' : ''
                              }`}
                          >
                            <Heart
                              size={13}
                              fill={upvotedPostIds.includes(post.id) ? 'currentColor' : 'none'}
                              className={upvotedPostIds.includes(post.id) ? 'animate-bounce' : ''}
                              style={{ strokeColor: 'currentColor' }}
                            />
                            <span>{(post.upvotes || 0) + (upvotedPostIds.includes(post.id) ? 1 : 0)} UPVOTES</span>
                          </button>

                          <button
                            onClick={() => {
                              showToast('Telemetry shared to localized crisis control.', 'info');
                            }}
                            className="flex items-center space-x-1.5 text-[9px] font-black uppercase hover:text-[#0A84FF] transition-colors"
                          >
                            <Compass size={13} />
                            <span>Share Radar</span>
                          </button>

                          {(post.authorId === (user ? user.uid : 'guest_resident') || isAdmin) && (
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="flex items-center space-x-1.5 text-[9px] font-black uppercase text-[#FF453A] hover:text-[#FF3B30] transition-colors ml-auto"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              /* COMMUNITIES LIST PANEL (Reiki, Crystal cards style in reference) */
              <div className="space-y-4">
                {ALL_COMMUNITIES.map((community) => (
                  <div
                    key={community.id}
                    onClick={() => {
                      setSelectedCommunityId(community.id);
                      setSelectedDetailTab('about');
                    }}
                    className={`rounded-[28px] overflow-hidden relative shadow-md h-[155px] cursor-pointer group transition-all duration-300 border border-black/5 bg-gradient-to-br from-zinc-800 to-zinc-950`}
                  >
                    {/* Background Picture with linear overlay */}
                    <img
                      src={community.bgImage}
                      alt={community.name}
                      className="w-full h-full object-cover absolute inset-0 filter brightness-[85%] transition-transform duration-500 z-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/25 z-10"></div>

                    {/* Card Content Overlay */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-between text-white font-sans z-20">
                      <div>
                        <div className="flex justify-between items-start">
                          <div className="bg-[#0A84FF]/25 border border-white/20 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#0A84FF]">
                            {community.shortName}
                          </div>
                          <div className="flex items-center space-x-1 text-xs">
                            <span className="text-[#FF9F0A]">★</span>
                            <span className="font-bold text-[11px]">{community.rating} ({community.members})</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-extrabold tracking-tight mt-2 text-white">
                          {community.name}
                        </h3>
                        <p className="text-[10px] text-zinc-300 font-medium line-clamp-2 mt-1 leading-normal">
                          {community.desc}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <span className="bg-white/10 border border-white/10 active:scale-95 transition-all text-white font-bold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-full flex items-center shadow-lg">
                          View Community →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* =========================================================================
           COMMUNITY DETAILS SCREEN (Third, Fourth & Fifth screens in references)
           ========================================================================= */
        (() => {
          const activeCommunity = ALL_COMMUNITIES.find(c => c.id === selectedCommunityId) || ALL_COMMUNITIES[0];
          const activeTabPosts = [...communityPosts, ...SEED_POSTS].filter((post: any) => !deletedPostIds.includes(post.id) && post.communityId === activeCommunity.id);

          return (
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Upper Back header */}
              <div className="pt-24 px-5 pb-2 shrink-0 flex items-center space-x-2 border-b border-gray-500/5 select-none">
                <button
                  onClick={() => setSelectedCommunityId(null)}
                  className="p-1 px-1.5 rounded-full bg-zinc-500/10 text-[#0A84FF] transition-all flex items-center"
                >
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
                <span className={`text-[11px] font-black uppercase tracking-widest ${textSecondary}`}>
                  Back to Community
                </span>
              </div>

              <div className="flex-1 overflow-y-auto px-5 pb-32 pt-2 space-y-4 no-scrollbar">
                {/* Banner Promotion Card with backdrop */}
                <div className="rounded-[28px] overflow-hidden relative shadow-md h-[180px] border border-black/5 flex-shrink-0 bg-gradient-to-br from-zinc-800 to-zinc-950">
                  <img
                    src={activeCommunity.bgImage}
                    alt={activeCommunity.name}
                    className="w-full h-full object-cover absolute inset-0 filter brightness-[85%] z-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 z-10"></div>

                  {/* Banner details */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between text-white font-sans z-20">
                    <div>
                      <div className="flex items-center space-x-1 text-[11px] font-black text-[#FF9F0A]">
                        <span>★</span>
                        <span>{activeCommunity.rating} ({activeCommunity.members} members)</span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight text-white mt-1">
                        {activeCommunity.name}
                      </h3>
                      <p className="text-[10px] text-zinc-300 font-medium leading-normal mt-1.5 opacity-90 line-clamp-2">
                        "{activeCommunity.tagline}"
                      </p>
                    </div>

                    <div className="flex justify-start">
                      <button
                        onClick={() => {
                          showToast('Successfully Joined Channel', 'success');
                        }}
                        className="bg-white/95 text-black border-2 border-white/10 active:scale-95 transition-all font-black text-[10px] uppercase tracking-wider py-1.5 px-4 rounded-full flex items-center shadow-lg"
                      >
                        Join Community →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detail Horizontal Tabs Swapper */}
                <div className="border-b border-zinc-200 dark:border-white/10 flex space-x-2 overflow-x-auto no-scrollbar select-none py-1">
                  {['about', 'feed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedDetailTab(tab as any)}
                      className={`py-1.5 px-3.5 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all whitespace-nowrap ${selectedDetailTab === tab
                          ? 'bg-[#0A84FF] text-white'
                          : 'bg-[#0A84FF]/5 dark:bg-white/5 text-zinc-400'
                        }`}
                    >
                      {tab === 'about' ? 'About Community' : 'Feed'}
                    </button>
                  ))}
                </div>

                {/* Dynamic detail subpanels */}
                {selectedDetailTab === 'about' && (
                  /* ABOUT COMMUNITY SUBPANEL (Image 3 in screenshots) */
                  <div className="space-y-4 animate-[fadeIn_0.35s_ease-out]">
                    <div className={`p-5 rounded-[28px] border ${glassCardClass} space-y-3`}>
                      <h4 className={`text-sm font-black tracking-tight ${textPrimary}`}>
                        {activeCommunity.welcome}
                      </h4>
                      <p className={`text-xs ${textSecondary} leading-loose font-medium opacity-90`}>
                        {activeCommunity.about}
                      </p>

                      {/* Gorgeous 4-Image Grid rounded-2xl */}
                      <div className="grid grid-cols-2 gap-2 pb-2">
                        {activeCommunity.gridImages.map((imgUrl, i) => (
                          <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gray-500/5 shadow-sm bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative text-zinc-500 text-[10px] font-black uppercase tracking-wider select-none">
                            <span className="absolute">Active</span>
                            <img
                              src={imgUrl}
                              alt="Activity grid"
                              className="w-full h-full object-cover grayscale-[10%] transition-all duration-300 relative z-10"
                              referrerPolicy="no-referrer"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Accordion list: What is this community for? */}
                    <div className={`rounded-[24px] border ${glassCardClass} overflow-hidden`}>
                      <button
                        onClick={() => setCommunityDetailsAccordionOpen(!communityDetailsAccordionOpen)}
                        className="w-full p-4 flex justify-between items-center bg-black/5 dark:bg-white/5"
                      >
                        <span className={`text-xs font-black uppercase tracking-wider ${textPrimary}`}>
                          What is this community for?
                        </span>
                        <span className={`text-xs transition-transform duration-300 ${communityDetailsAccordionOpen ? 'rotate-90' : ''}`}>
                          ▶
                        </span>
                      </button>

                      {communityDetailsAccordionOpen && (
                        <div className="p-4 border-t border-gray-500/10 text-xs text-zinc-500 dark:text-zinc-400 font-medium space-y-2 leading-relaxed">
                          <p>
                            This channel forms a localized grid layer for our river monitoring application. We synchronize physical telemetry observations with virtual community checklists to:
                          </p>
                          <ul className="list-disc pl-4 space-y-1.5">
                            <li>Validate automated hydrological warnings.</li>
                            <li>Coordinate swift boat operations and storm logistics.</li>
                            <li>Perform gamified safety drills (throw bags & barometric levels).</li>
                            <li>Instruct first responders using modern standards.</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedDetailTab === 'feed' && (
                  /* FILTERED FEED FOR COMPONENT (In-channel feed) */
                  <div className="space-y-4 animate-[fadeIn_0.35s_ease-out]">
                    {/* Small inline post composer */}
                    <div className={`p-4 rounded-[28px] border ${glassCardClass} flex flex-col`}>
                      <div className="flex space-x-3 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#FF9F0A]/20 flex items-center justify-center font-bold text-[#FF9F0A] text-[10px] flex-shrink-0">
                          {profileName ? profileName.slice(0, 2).toUpperCase() : 'RE'}
                        </div>
                        <textarea
                          value={newPostText}
                          onChange={(e) => setNewPostText(e.target.value)}
                          placeholder={`Post update directly in ${activeCommunity.shortName}...`}
                          className={`flex-1 bg-transparent resize-none outline-none font-medium text-xs pt-1.5 ${textPrimary} placeholder:text-zinc-500`}
                          rows={2}
                        />
                      </div>
                      <div className="flex justify-end pt-3 mt-2 border-t border-gray-500/5">
                        <button
                          onClick={() => handlePostCommunity(activeCommunity.id)}
                          disabled={!newPostText.trim() && !newPostImage}
                          className={`px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider bg-[#0A84FF] text-white shadow-sm disabled:opacity-40 transition-all`}
                        >
                          Publish in channel
                        </button>
                      </div>
                    </div>

                    {activeTabPosts.length === 0 ? (
                      <div className="text-center py-8 opacity-40">
                        <MessageSquare size={32} className="mx-auto mb-2 text-zinc-500" />
                        <p className="text-xs font-bold">No community posts in this channel yet.</p>
                      </div>
                    ) : (
                      activeTabPosts.map((post: any) => (
                        <div
                          key={post.id}
                          className={`p-4 rounded-[24px] border ${glassCardClass} flex flex-col space-y-3 shadow-sm`}
                        >
                          <div className="flex justify-between items-center pt-0.5">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center font-bold text-white text-xs">
                                {post.authorName.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <span className={`block font-bold text-xs ${textPrimary}`}>
                                  {post.authorName}
                                </span>
                                <span className={`block text-[9px] ${textSecondary}`}>
                                  {(() => {
                                    const m = post.timestamp?.toMillis ? post.timestamp.toMillis() : post.timestamp?.seconds ? post.timestamp.seconds * 1000 : Date.now();
                                    return new Date(m).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                  })()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className={`text-xs leading-relaxed font-medium ${textPrimary} opacity-90`}>
                            {post.text}
                          </p>
                          {post.image && (
                            <div className="w-full h-28 rounded-xl overflow-hidden mt-1 bg-zinc-800 flex items-center justify-center border border-gray-500/5 text-zinc-500 text-[10px] font-black uppercase tracking-wider relative select-none">
                              <span className="absolute">Attachment</span>
                              <img
                                src={post.image}
                                alt="Update visual"
                                className="w-full h-full object-cover relative z-10"
                                referrerPolicy="no-referrer"
                                onError={(e) => { e.currentTarget.parentNode?.remove(); }}
                              />
                            </div>
                          )}

                          {/* Action row with hearts */}
                          <div className="flex items-center space-x-6 pt-2 border-t border-gray-500/5 text-gray-400 font-mono select-none">
                            <button
                              onClick={() => handleToggleUpvote(post.id)}
                              className={`flex items-center space-x-1.5 text-[9px] font-black uppercase transition-colors ${upvotedPostIds.includes(post.id) ? 'text-[#FF453A]' : ''
                                }`}
                            >
                              <Heart
                                size={12}
                                fill={upvotedPostIds.includes(post.id) ? 'currentColor' : 'none'}
                                className={upvotedPostIds.includes(post.id) ? 'animate-bounce' : ''}
                              />
                              <span>{(post.upvotes || 0) + (upvotedPostIds.includes(post.id) ? 1 : 0)} Upvotes</span>
                            </button>

                            {(post.authorId === (user ? user.uid : 'guest_resident') || isAdmin) && (
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="flex items-center space-x-1.5 text-[9px] font-black uppercase text-[#FF453A] transition-colors ml-auto"
                              >
                                <Trash2 size={12} />
                                <span>Delete</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}



              </div>
            </div>
          );
        })()
      )}
    </div>
  );
};
```

## File: src/components/mobile/MobileHomePage.tsx
```typescript
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
```

## File: src/components/mobile/MobileMapPage.tsx
```typescript
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
```

## File: src/components/mobile/MobileSettingsPage.tsx
```typescript
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
```

## File: src/components/BrandIcons.tsx
```typescript
import React from 'react';

export const GoogleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const AppleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" />
  </svg>
);
```

## File: src/components/EocDispatchView.tsx
```typescript
import React from 'react';
import { 
  Users, Search, ShieldAlert, LifeBuoy, AlertTriangle, CheckCircle, 
  Trash2, User, Phone, MapPin, Heart, HelpCircle, Truck, Info, Navigation 
} from 'lucide-react';
import { Sector, IncidentCitizen } from './eocTypes';

interface EocDispatchViewProps {
  isDarkMode: boolean;
  activeSector: Sector;
  citizens: IncidentCitizen[];
  setCitizens: React.Dispatch<React.SetStateAction<IncidentCitizen[]>>;
  selectedCitizenId: string | null;
  setSelectedCitizenId: (id: string | null) => void;
  activeDispatchingId: string | null;
  setActiveDispatchingId: (id: string | null) => void;
  dispatchProgress: number;
  setDispatchProgress: React.Dispatch<React.SetStateAction<number>>;
  dispatchSearchQuery: string;
  setDispatchSearchQuery: (q: string) => void;
  selectedSquadType: string;
  setSelectedSquadType: (type: string) => void;
  onShowToast?: (message: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  soundBeep: (freq: number, type?: OscillatorType, duration?: number) => void;
}

export const EocDispatchView: React.FC<EocDispatchViewProps> = ({
  isDarkMode,
  activeSector,
  citizens,
  setCitizens,
  selectedCitizenId,
  setSelectedCitizenId,
  activeDispatchingId,
  setActiveDispatchingId,
  dispatchProgress,
  setDispatchProgress,
  dispatchSearchQuery,
  setDispatchSearchQuery,
  selectedSquadType,
  setSelectedSquadType,
  onShowToast,
  soundBeep
}) => {
  const cardBgClass = isDarkMode ? 'bg-zinc-950/80 backdrop-blur-xl' : 'bg-white';
  const cardBorderClass = isDarkMode ? 'border-white/10' : 'border-zinc-200';
  const titleColorClass = isDarkMode ? 'text-white' : 'text-zinc-900';
  const panelTextSecondary = isDarkMode ? 'text-zinc-400' : 'text-zinc-700';

  // Filter citizens belonging to active sector and search query
  const sectorCitizens = React.useMemo(() => {
    return citizens.filter(c => c.zone.toLowerCase() === activeSector.zoneMatch.toLowerCase());
  }, [citizens, activeSector]);

  const filteredCitizens = React.useMemo(() => {
    return sectorCitizens.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(dispatchSearchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(dispatchSearchQuery.toLowerCase()) ||
                          (c.healthNeeds && c.healthNeeds.toLowerCase().includes(dispatchSearchQuery.toLowerCase()));
      return matchSearch;
    });
  }, [sectorCitizens, dispatchSearchQuery]);

  const activeBeacons = sectorCitizens.filter(c => c.status === 'SOS PENDING');

  // Find selected citizen profile or default to first SOS citizen in sector
  const selectedCitizen = React.useMemo(() => {
    const found = citizens.find(c => c.id === selectedCitizenId);
    if (found && found.zone.toLowerCase() === activeSector.zoneMatch.toLowerCase()) {
      return found;
    }
    // Fallback to first SOS citizen if none is specifically selected
    return sectorCitizens.find(c => c.status === 'SOS PENDING') || sectorCitizens[0] || null;
  }, [citizens, selectedCitizenId, sectorCitizens, activeSector]);

  // Set the selected ID if fallback occurred
  React.useEffect(() => {
    if (selectedCitizen && selectedCitizen.id !== selectedCitizenId) {
      setSelectedCitizenId(selectedCitizen.id);
    }
  }, [selectedCitizen, selectedCitizenId, setSelectedCitizenId]);

  // Handle Dispatch Action
  const triggerDispatch = (citId: string, citName: string) => {
    soundBeep(650, 'sine', 0.15);
    setActiveDispatchingId(citId);
    setDispatchProgress(0);

    if (onShowToast) {
      onShowToast(`Deploying ${selectedSquadType} to ${citName}'s coordinates in ${activeSector.zoneMatch}...`, "amber");
    }

    let currentPercentage = 0;
    const interval = setInterval(() => {
      currentPercentage += 10;
      setDispatchProgress(currentPercentage);
      soundBeep(500 + currentPercentage * 3, 'sine', 0.04);
      
      if (currentPercentage >= 100) {
        clearInterval(interval);
        setCitizens(prev => prev.map(c => {
          if (c.id === citId) {
            return { ...c, status: 'EVACUATED', ping: 'Evacuated via shortwave rescue' };
          }
          return c;
        }));
        
        setActiveDispatchingId(null);
        soundBeep(880, 'sine', 0.25);
        if (onShowToast) {
          onShowToast(`Rescue Squad arrived! ${citName} evacuated safely to ${activeSector.safehouseName}!`, "success");
        }
      }
    }, 450);
  };

  const markResidentAsSafe = (citId: string, name: string) => {
    soundBeep(720, 'sine', 0.1);
    setCitizens(prev => prev.map(c => {
      if (c.id === citId) {
        const isCurrentlySafe = c.status === 'SAFE';
        const nextStatus = isCurrentlySafe ? 'SOS PENDING' : 'SAFE';
        const nextPing = isCurrentlySafe ? 'SOS Beacon Active' : 'Manually verified safe';
        
        if (onShowToast) {
          if (isCurrentlySafe) {
            onShowToast(`${name} SOS beacon re-activated. Status set to pending.`, "info");
          } else {
            onShowToast(`${name} manually logged as safe from active SOS beacon lists.`, "success");
          }
        }
        return { ...c, status: nextStatus, ping: nextPing };
      }
      return c;
    }));
  };

  const rescueSquads = [
    { name: 'Zodiac Marine-9', icon: LifeBuoy, desc: 'Inflatable high-speed boat. Swift extraction in narrow streets.', speed: 'Medium', capacity: '4 Pax' },
    { name: 'Rescue Helo Air-3', icon: Navigation, desc: 'Airband Winch helicopter. Roof-top evac and critical traumas.', speed: 'Maximum', capacity: '6 Pax' },
    { name: 'Amphibious APC Gator', icon: Truck, desc: 'Heavy tracked amphibious carrier. High-depth water crossings.', speed: 'Fast', capacity: '12 Pax' },
    { name: 'Paramedic Ground Unit-5', icon: Users, desc: 'Ground ambulance support. Immediate triage at shelter gateway.', speed: 'Standard', capacity: '2 Pax' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-[fadeIn_0.4s_ease-out]">
      
      {/* LEFT COLUMN: ACTIVE SOS QUEUE & SEARCH */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl flex flex-col flex-1 min-h-[500px]`}>
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className={`text-xs font-mono font-black tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>ZONAL BEACONS QUEUE</span>
            </div>
            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
              isDarkMode ? 'bg-red-500/10 text-red-400 border-red-500/25' : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {activeBeacons.length} ACTIVE SOS BEACONS
            </span>
          </div>

          <p className={`text-xs ${panelTextSecondary} mb-4 leading-relaxed`}>
            Showing registered residents inside <span className="font-extrabold text-[#0a84ff]">{activeSector.zoneMatch}</span>. Click a resident's card to load their target profile onto the tactical operations dispatch desk.
          </p>

          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-3 text-zinc-500" size={15} />
            <input 
              type="text" 
              placeholder="Search by name, resident ID, or medical need..."
              value={dispatchSearchQuery}
              onChange={(e) => setDispatchSearchQuery(e.target.value)}
              className={`w-full py-2.5 pl-10 pr-4 text-xs rounded-xl border outline-none font-sans transition-all ${
                isDarkMode 
                  ? 'bg-black/35 border-white/5 text-zinc-200 focus:border-[#0a84ff] focus:bg-black/60' 
                  : 'bg-zinc-50 border-zinc-250 text-zinc-800 focus:border-[#0a84ff] focus:bg-white'
              }`}
            />
          </div>

          {/* Scrollable list */}
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
            {filteredCitizens.length === 0 ? (
              <div className={`py-16 text-center border border-dashed rounded-2xl ${
                isDarkMode ? 'border-white/5 bg-black/20' : 'border-zinc-200 bg-zinc-50/50'
              }`}>
                <Users size={24} className="mx-auto mb-3 opacity-30 text-zinc-400" />
                <p className="text-xs font-mono text-zinc-500">No active residents match your filter</p>
              </div>
            ) : (
              filteredCitizens.map((cit) => {
                const isSOS = cit.status === 'SOS PENDING';
                const isSelected = selectedCitizen?.id === cit.id;

                return (
                  <div 
                    key={cit.id}
                    onClick={() => { setSelectedCitizenId(cit.id); soundBeep(450, 'sine', 0.05); }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSOS 
                        ? isSelected
                          ? (isDarkMode ? 'bg-red-500/10 border-red-500 shadow-md shadow-red-500/10' : 'bg-red-50 border-red-500 shadow-md shadow-red-500/5')
                          : (isDarkMode ? 'bg-red-950/10 border-red-500/30 hover:border-red-500/60' : 'bg-red-50/20 border-red-200 hover:border-red-400')
                        : isSelected
                          ? (isDarkMode ? 'bg-white/5 border-blue-500 shadow-md' : 'bg-blue-50 border-blue-500 shadow-md')
                          : (isDarkMode ? 'bg-black/30 border-white/5 hover:border-white/15' : 'bg-white border-zinc-200 hover:border-zinc-300')
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className={`text-xs font-black uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{cit.name}</h4>
                        <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">{cit.phone} // {cit.id}</span>
                      </div>
                      <span className={`text-[8px] font-mono font-black py-0.5 px-2 rounded-full uppercase border ${
                        isSOS 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse' 
                          : cit.status === 'EVACUATED'
                            ? 'bg-purple-500/15 text-purple-400 border-purple-500/20'
                            : 'bg-green-500/10 text-green-400 border-green-500/25'
                      }`}>
                        {cit.status}
                      </span>
                    </div>

                    {cit.healthNeeds && (
                      <div className="flex gap-1.5 items-start mt-2">
                        <Heart size={11} className="text-red-400 shrink-0 mt-0.5" />
                        <span className={`text-[10px] font-sans ${isDarkMode ? 'text-zinc-400' : 'text-zinc-800'} leading-none`}>
                          Vulnerable: {cit.healthNeeds}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE TACTICAL OPERATIONS DISPATCH DESK */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {selectedCitizen ? (
          <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl flex flex-col justify-between min-h-[500px]`}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Navigation size={15} className="text-[#0a84ff] animate-pulse" />
                <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>TACTICAL DISPATCH DESK</span>
              </div>

              {/* Citizen Details Block */}
              <div className={`p-4 rounded-2xl border mb-5 ${isDarkMode ? 'bg-black/35 border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2.5 text-left">
                    <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 block font-bold uppercase leading-none">Target Resident Profile</span>
                    <div>
                      <h3 className={`text-sm font-black uppercase ${titleColorClass}`}>{selectedCitizen.name}</h3>
                      <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">{selectedCitizen.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Phone size={12} className="text-zinc-500 dark:text-zinc-400" />
                      <span className={isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}>{selectedCitizen.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin size={12} className="text-zinc-500 dark:text-zinc-400" />
                      <span className={isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}>{selectedCitizen.zone} Sector</span>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    isDarkMode ? 'bg-black/45 border-white/5' : 'bg-white border-zinc-200'
                  }`}>
                    <div>
                      <span className="text-[8px] font-mono text-zinc-500 dark:text-zinc-400 block uppercase font-bold leading-none mb-1">Health & Vulnerability Status</span>
                      <p className={`text-xs font-bold leading-relaxed ${selectedCitizen.healthNeeds ? 'text-red-400' : 'text-green-500'}`}>
                        {selectedCitizen.healthNeeds || 'No special medical requirements flagged'}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-dashed border-zinc-250 dark:border-white/5 text-[9px] font-mono text-zinc-500 dark:text-zinc-400">
                      <span>GPS SIGNAL STRENGTH:</span>
                      <span className="text-green-400 font-extrabold">98% // EXCELLENT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rescue squad select list */}
              <div className="mb-5 text-left">
                <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 block font-bold uppercase tracking-wider mb-2.5">Select Emergency Rescue Unit</span>
                <div className="grid grid-cols-1 gap-3">
                  {rescueSquads.map((sq) => {
                    const isSelected = selectedSquadType === sq.name;
                    const Icon = sq.icon;

                    return (
                      <div
                        key={sq.name}
                        onClick={() => { setSelectedSquadType(sq.name); soundBeep(480, 'sine', 0.05); }}
                        className={`p-3 rounded-xl border cursor-pointer flex gap-3 transition-all ${
                          isSelected 
                            ? 'bg-[#0a84ff]/10 border-[#0a84ff]' 
                            : (isDarkMode ? 'bg-black/35 border-white/5 hover:border-white/10' : 'bg-white border-zinc-250/70 hover:border-zinc-300')
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-[#0a84ff]/20 text-[#0a84ff]' : 'bg-zinc-500/10 text-zinc-400'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                          <h5 className={`text-xs font-black uppercase ${isSelected ? 'text-[#0a84ff]' : (isDarkMode ? 'text-zinc-200' : 'text-zinc-800')}`}>{sq.name}</h5>
                          <p className="text-[9px] text-zinc-500 truncate">{sq.desc}</p>
                          <div className="flex gap-2 mt-1 text-[8px] font-mono text-zinc-400 font-black">
                            <span>SPEED: {sq.speed}</span>
                            <span>•</span>
                            <span>CAPACITY: {sq.capacity}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Actions and Dispatch triggers */}
            <div className={`pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-zinc-200'} space-y-4`}>
              
              {/* Progress Bar during active dispatch */}
              {activeDispatchingId === selectedCitizen.id && (
                <div className="space-y-1.5 text-left animate-[pulse_1s_infinite]">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-amber-500">
                    <span className="flex items-center gap-1 uppercase">
                      <Truck size={12} className="animate-bounce" />
                      Rescue en route...
                    </span>
                    <span>{dispatchProgress}% EVAC TIMELINE</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-zinc-200'}`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300" 
                      style={{ width: `${dispatchProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {selectedCitizen.status === 'SOS PENDING' ? (
                  <button
                    onClick={() => triggerDispatch(selectedCitizen.id, selectedCitizen.name)}
                    disabled={activeDispatchingId !== null}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-black py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-500/20 active:scale-[0.98] transition-all"
                  >
                    <Truck size={14} className="animate-pulse" />
                    <span>ACTIVATE {selectedSquadType.toUpperCase()} DISPATCH</span>
                  </button>
                ) : (
                  <div className={`flex-1 py-3 text-center rounded-xl border font-mono text-xs font-black flex items-center justify-center gap-2 ${
                    selectedCitizen.status === 'EVACUATED' 
                      ? 'bg-purple-950/15 border-purple-500/20 text-purple-400' 
                      : 'bg-green-500/10 border-green-500/20 text-green-500'
                  }`}>
                    <CheckCircle size={14} />
                    <span>RESIDENT COMPLETED EVACUATION ({selectedCitizen.status.toUpperCase()})</span>
                  </div>
                )}

                <button
                  onClick={() => markResidentAsSafe(selectedCitizen.id, selectedCitizen.name)}
                  className={`px-4 text-xs font-mono font-black rounded-xl border cursor-pointer active:scale-[0.98] transition-all group ${
                    selectedCitizen.status === 'SAFE'
                      ? isDarkMode
                        ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-rose-500/15 hover:border-rose-500/30 hover:text-rose-400'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700'
                      : isDarkMode 
                        ? 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10' 
                        : 'bg-zinc-100 border-zinc-250 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  {selectedCitizen.status === 'SAFE' ? (
                    <>
                      <span className="group-hover:hidden">RESOLVED (SAFE)</span>
                      <span className="hidden group-hover:inline">RE-OPEN SOS BEACON</span>
                    </>
                  ) : (
                    <span>LOG RESIDENT SAFE</span>
                  )}
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center min-h-[500px]`}>
            <Navigation size={32} className="text-zinc-500 opacity-20 mb-4 animate-pulse" />
            <p className="text-xs font-mono text-zinc-500">Select a resident to load EOC tactical rescue map coordinates.</p>
          </div>
        )}
      </div>

    </div>
  );
};

// TS refresh tag
```

## File: src/components/EocHydrologyView.tsx
```typescript
import React from 'react';
import { 
  MapPin, AlertTriangle, Droplet, CheckCircle, Siren, Info, Waves, TrendingUp, ChevronRight, Activity 
} from 'lucide-react';
import { Sector, SECTORS, IncidentCitizen } from './eocTypes';

interface EocHydrologyViewProps {
  isDarkMode: boolean;
  activeSector: Sector;
  isLeveeDamDeployed: boolean;
  isSirenActive: boolean;
  simulatedRiverDepth: number;
  riverStressPct: number;
  isOverflowImminent: boolean;
  handleSectorChange: (sec: Sector) => void;
  handleToggleSiren: () => void;
  handleToggleLeveeBarriers: () => void;
  citizens: IncidentCitizen[];
  isShowingAllSectors?: boolean;
}

export const EocHydrologyView: React.FC<EocHydrologyViewProps> = ({
  isDarkMode,
  activeSector,
  isLeveeDamDeployed,
  isSirenActive,
  simulatedRiverDepth,
  riverStressPct,
  isOverflowImminent,
  handleSectorChange,
  handleToggleSiren,
  handleToggleLeveeBarriers,
  citizens,
  isShowingAllSectors = false
}) => {
  const cardBgClass = isDarkMode ? 'bg-zinc-950/80 backdrop-blur-xl' : 'bg-white';
  const cardBorderClass = isDarkMode ? 'border-white/10' : 'border-zinc-200';
  const titleColorClass = isDarkMode ? 'text-white' : 'text-zinc-900';
  const panelTextSecondary = isDarkMode ? 'text-zinc-400' : 'text-zinc-700';
  const [hoveredSectorId, setHoveredSectorId] = React.useState<string | null>(null);

  // Generate dynamic points for the interactive live hydrology graph based on sector and depth
  const chartPoints = React.useMemo(() => {
    const base = activeSector.baseDepth;
    const current = simulatedRiverDepth;
    const peak = Math.max(current * 1.15, activeSector.dangerThreshold * 0.95);
    
    // Create a natural looking water surge curve leading to current reading
    const p1 = base * 0.6;
    const p2 = base * 0.75;
    const p3 = base * 1.1;
    const p4 = peak;
    const p5 = current * 0.98;
    const p6 = current;

    const values = [p1, p2, p3, p4, p5, p6];
    
    // Map values to SVG coordinates (width 520, height 160)
    // Range: 0m -> y = 140, max 9m -> y = 20
    const mapY = (val: number) => {
      const maxRange = 9;
      return Math.round(140 - (val / maxRange) * 110);
    };

    return values.map((val, idx) => ({
      x: idx * 100 + 20,
      y: mapY(val),
      val: val.toFixed(2)
    }));
  }, [activeSector, simulatedRiverDepth]);

  const svgPolylinePoints = chartPoints.map(p => `${p.x},${p.y}`).join(' ');
  const svgAreaPoints = `20,140 ` + chartPoints.map(p => `${p.x},${p.y}`).join(' ') + ` 520,140`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20 text-left">
      
      {/* LEFT COLUMN: INTERACTIVE GIS & METRICS */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl transition-all duration-300`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a84ff] animate-pulse"></div>
              <span className={`text-xs font-mono font-extrabold tracking-widest uppercase ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>SELANGOR BASIN GRAPHICS</span>
            </div>
            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase border font-black ${
              isDarkMode ? 'bg-white/5 border-white/10 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
            }`}>Interactive GIS</span>
          </div>
          
          <p className={`text-xs ${panelTextSecondary} mb-5 leading-relaxed`}>
            Select EOC catchment nodes directly on the interactive basin map below to hot-swap active hydrology monitoring targets.
          </p>

          {/* GIS SVG MAP BLOCK */}
          <div className={`w-full h-64 rounded-2xl border relative overflow-hidden flex items-center justify-center select-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] ${
            isDarkMode ? 'border-white/10 bg-black/40' : 'border-zinc-200 bg-zinc-50'
          }`}>
            <div className={`absolute inset-0 bg-[size:16px_16px] pointer-events-none ${
              isDarkMode 
                ? 'bg-[radial-gradient(rgba(255,255,255,0.1)_1.5px,transparent_1.5px)]' 
                : 'bg-[radial-gradient(rgba(0,0,0,0.04)_1.5px,transparent_1.5px)]'
            }`}>
              <div className={`absolute inset-0 bg-gradient-to-b via-transparent to-transparent h-1/2 w-full animate-scan opacity-30 pointer-events-none border-b ${
                isDarkMode ? 'from-blue-500/10 border-blue-500/30' : 'from-blue-500/5 border-blue-400/20'
              }`}></div>
              <div className="absolute top-3 left-3 text-[8px] font-mono font-bold text-zinc-700 dark:text-zinc-500/60 uppercase tracking-widest">GRID_SCAN // SELANGOR.GIS.v3</div>
              <div className="absolute bottom-3 right-3 text-[8px] font-mono font-bold text-zinc-700 dark:text-zinc-500/60 uppercase tracking-widest">SYS_STATUS // ACTIVE_PING</div>
            </div>
            
            <svg className="w-[92%] h-[92%] overflow-visible" viewBox="0 0 350 220">
              {/* Region vectors */}
              <polygon points="50,20 180,10 230,40 180,80 70,60" fill={isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"} stroke={isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"} strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="70,60 180,80 200,110 120,130 50,100" fill={isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"} stroke={isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"} strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="180,80 280,60 320,100 220,110" fill={isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"} stroke={isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"} strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="120,130 220,110 240,160 160,180 80,150" fill={isDarkMode ? "rgba(255,165,0,0.04)" : "rgba(249,115,22,0.03)"} stroke={isDarkMode ? "rgba(255,165,0,0.35)" : "rgba(249,115,22,0.25)"} strokeWidth="1.2" strokeDasharray="3 3" />
              <polygon points="50,100 120,130 80,150 160,180 140,210 20,180" fill={isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"} stroke={isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"} strokeWidth="1" strokeDasharray="3 3" />

              {/* Selangor water lines - All locations connected to Shah Alam (195, 115) */}
              {/* Penang (45, 45) -> Shah Alam (195, 115) */}
              <path d="M45,45 Q110,75 195,115" fill="none" stroke="#3b82f6" strokeWidth="4" opacity="0.85" strokeLinecap="round" />
              
              {/* Hulu Selangor (120, 45) -> Shah Alam (195, 115) */}
              <path d="M120,45 Q150,80 195,115" fill="none" stroke="#2563eb" strokeWidth="4.5" opacity="0.85" strokeLinecap="round" />
              
              {/* Batu Caves (195, 45) -> Shah Alam (195, 115) */}
              <path d="M195,45 Q195,80 195,115" fill="none" stroke="#3b82f6" strokeWidth="4" opacity="0.85" strokeLinecap="round" />
              
              {/* Kuala Lumpur (270, 45) -> Shah Alam (195, 115) */}
              <path d="M270,45 Q240,80 195,115" fill="none" stroke="#00d2ff" strokeWidth="4.5" opacity="0.95" strokeLinecap="round" />
              
              {/* Rawang (45, 115) -> Shah Alam (195, 115) */}
              <path d="M45,115 Q120,115 195,115" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.85" strokeLinecap="round" />
              
              {/* Petaling Jaya (120, 115) -> Shah Alam (195, 115) */}
              <path d="M120,115 Q155,115 195,115" fill="none" stroke="#2563eb" strokeWidth="4" opacity="0.85" strokeLinecap="round" />
              
              {/* Subang Jaya (270, 115) -> Shah Alam (195, 115) */}
              <path d="M270,115 Q230,115 195,115" fill="none" stroke="#00d2ff" strokeWidth="3.5" opacity="0.9" strokeLinecap="round" />
              
              {/* Klang Outlet (120, 180) <- Shah Alam (195, 115) */}
              <path d="M195,115 Q150,150 120,180" fill="none" stroke="#1d4ed8" strokeWidth="6" opacity="0.95" strokeLinecap="round" />
              
              {/* Johor Bahru (195, 180) -> Shah Alam (195, 115) */}
              <path d="M195,180 Q195,150 195,115" fill="none" stroke="#3b82f6" strokeWidth="4" opacity="0.85" strokeLinecap="round" />

              {!isLeveeDamDeployed && (
                <circle cx="195" cy="115" r="15" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.75)" className="animate-pulse" />
              )}

              {/* Map positions for the 10 custom locations */}
              {(() => {
                const mapPositions: Record<string, { x: number; y: number; label: string }> = {
                  huluselangor: { x: 120, y: 45, label: "H. Selangor" },
                  rawang: { x: 45, y: 115, label: "Rawang" },
                  batucaves: { x: 195, y: 45, label: "Batu Caves" },
                  shahalam: { x: 195, y: 115, label: "Shah Alam" },
                  klang: { x: 120, y: 180, label: "Klang" },
                  kualalumpur: { x: 270, y: 45, label: "Kuala Lumpur" },
                  petalingjaya: { x: 120, y: 115, label: "Petaling PJ" },
                  subangjaya: { x: 270, y: 115, label: "Subang Jaya" },
                  penang: { x: 45, y: 45, label: "Penang" },
                  johorbahru: { x: 195, y: 180, label: "Johor Bahru" }
                };

                return SECTORS.map(sec => {
                  const pos = mapPositions[sec.id];
                  if (!pos) return null;
                  const isCritical = sec.id === 'shahalam';
                  const hasPendingSos = citizens.some(c => c.zone === sec.zoneMatch && c.status === 'SOS PENDING');
                  const isSelected = isShowingAllSectors || activeSector.id === sec.id;
                  const isHovered = hoveredSectorId === sec.id;
                  return (
                    <g 
                      key={sec.id} 
                      transform={`translate(${pos.x}, ${pos.y})`} 
                      className="cursor-pointer group" 
                      onClick={() => handleSectorChange(sec)}
                      onMouseEnter={() => setHoveredSectorId(sec.id)}
                      onMouseLeave={() => setHoveredSectorId(null)}
                    >
                      <circle 
                        cx="0" 
                        cy="0" 
                        r={isCritical ? 8 : 6} 
                        fill={isSelected ? '#0a84ff' : (isCritical ? '#ff453a' : '#64748b')} 
                        stroke={isDarkMode ? '#ffffff' : '#475569'} 
                        strokeWidth={isCritical ? 2 : 1.5} 
                      />
                      {hasPendingSos && (
                        <circle cx="0" cy="0" r={isCritical ? 15 : 12} fill="none" stroke="#ef4444" strokeWidth={isCritical ? 1.5 : 1.2} className="animate-ping" />
                      )}
                      <text 
                        x={isCritical ? 11 : 9} 
                        y="3" 
                        fill={isSelected ? '#0a84ff' : (isCritical ? (isDarkMode ? '#ffb03a' : '#ea580c') : (isDarkMode ? '#ffffff' : '#334155'))} 
                        fontSize={isCritical ? "8.5" : "8"} 
                        fontWeight={isCritical ? "black" : "bold"} 
                        className={`font-mono select-none pointer-events-none transition-opacity duration-300 ${
                          (isSelected || isHovered) ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {pos.label}
                      </text>
                    </g>
                  );
                });
              })()}
            </svg>

            {isLeveeDamDeployed && (
              <div className="absolute bottom-3 right-3 py-1 px-2.5 rounded bg-green-500/15 text-green-400 text-[9px] font-bold border border-green-500/20 font-mono flex items-center gap-1 shadow-sm">
                <CheckCircle size={10} className="animate-bounce" />
                <span>BARRIERS LOCKED</span>
              </div>
            )}
          </div>
        </div>

        {/* Selected Sector Hydrology specs */}
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 text-left shadow-lg transition-all duration-300`}>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={15} className="text-[#0a84ff]" />
            <h3 className={`text-sm font-black font-mono tracking-wider ${titleColorClass}`}>{activeSector.name.toUpperCase()}</h3>
          </div>
          <p className={`text-xs ${panelTextSecondary} leading-relaxed mb-4`}>
            {activeSector.description}
          </p>

          <div className="grid grid-cols-1 gap-3">
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
              <span className="text-[8px] font-mono text-zinc-700 dark:text-zinc-500 block uppercase font-bold leading-none mb-1">Station Code</span>
              <span className={`text-xs font-mono font-black ${titleColorClass}`}>{activeSector.code}</span>
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
              <span className="text-[8px] font-mono text-zinc-700 dark:text-zinc-500 block uppercase font-bold leading-none mb-1">Target River</span>
              <span className={`text-xs font-mono font-black ${titleColorClass}`}>{activeSector.riverName}</span>
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
              <span className="text-[8px] font-mono text-zinc-700 dark:text-zinc-500 block uppercase font-bold leading-none mb-1">Flow Rate Baseline</span>
              <span className={`text-xs font-mono font-black text-blue-500`}>{activeSector.baseCfs.toLocaleString()} CFS</span>
            </div>
            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-100'}`}>
              <span className="text-[8px] font-mono text-zinc-700 dark:text-zinc-500 block uppercase font-bold leading-none mb-1">Shelter Base Capacity</span>
              <span className={`text-xs font-mono font-black ${titleColorClass}`}>{activeSector.maxCapacity} Max Pax</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: SCADA PHYSICAL OVERRIDES & LIVE RIVER CHART */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* HARDWARE OVERRIDES */}
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl transition-all duration-300`}>
          <div className="flex items-center gap-2 mb-4">
            <Siren size={15} className="text-red-400 animate-pulse" />
            <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>SCADA OVERRIDE SYSTEM CONTROLLERS</span>
          </div>
          <p className={`text-xs ${panelTextSecondary} mb-5 leading-relaxed`}>
            Directly manipulate localized sound alert broadcasting sirens and hydraulic inflatable levee barriers to offset river flood stress levels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Siren Broadcast Switch */}
            <div className={`p-4 rounded-2xl border flex flex-col justify-between h-36 transition-all ${
              isSirenActive 
                ? 'bg-red-500/10 border-red-500/30' 
                : (isDarkMode ? 'bg-black/30 border-white/5' : 'bg-zinc-50 border-zinc-200')
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <Siren size={18} className={isSirenActive ? 'text-red-500 animate-[spin_3s_linear_infinite]' : 'text-zinc-500'} />
                  <div>
                    <span className="text-xs font-black block uppercase text-zinc-800 dark:text-zinc-300">Alert Sirens</span>
                    <span className="text-[9px] font-mono text-zinc-700 dark:text-zinc-400 block">High wave acoustics broadcast</span>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${isSirenActive ? 'bg-red-500 animate-ping' : 'bg-zinc-500'}`}></div>
              </div>
              <button
                onClick={handleToggleSiren}
                className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  isSirenActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20' 
                    : (isDarkMode ? 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10' : 'bg-zinc-200/60 text-zinc-700 hover:bg-zinc-300 border border-zinc-200')
                }`}
              >
                {isSirenActive ? 'SIREN BROADCASTING: HALT' : 'TEST ACOUSTIC BROADCAST'}
              </button>
            </div>

            {/* Pneumatic Barrier Switch */}
            <div className={`p-4 rounded-2xl border flex flex-col justify-between h-36 transition-all ${
              isLeveeDamDeployed 
                ? 'bg-green-500/10 border-green-500/30' 
                : (isDarkMode ? 'bg-black/30 border-white/5' : 'bg-zinc-50 border-zinc-200')
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <Droplet size={18} className={isLeveeDamDeployed ? 'text-green-400 animate-bounce' : 'text-zinc-500'} />
                  <div>
                    <span className="text-xs font-black block uppercase text-zinc-800 dark:text-zinc-300">Pneumatic Barriers</span>
                    <span className="text-[9px] font-mono text-zinc-700 dark:text-zinc-400 block">Inflatable levee reinforcements</span>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${isLeveeDamDeployed ? 'bg-green-400 animate-ping' : 'bg-zinc-500'}`}></div>
              </div>
              <button
                onClick={handleToggleLeveeBarriers}
                className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  isLeveeDamDeployed 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-500/20' 
                    : (isDarkMode ? 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10' : 'bg-zinc-200/60 text-zinc-700 hover:bg-zinc-300 border border-zinc-200')
                }`}
              >
                {isLeveeDamDeployed ? 'COLLAPSE ACTIVE LEVEE' : 'DEPLOY INFLATABLE BARRIERS'}
              </button>
            </div>
          </div>
        </div>

        {/* RIVER OVERFLOW GAUGES & HYDROLOGICAL DEPTH AREA CHART */}
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl transition-all duration-300`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-[#0a84ff]" />
              <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${titleColorClass}`}>LIVE WAVE TELEMETRY CURVE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase">Streaming live</span>
            </div>
          </div>

          {/* Depth status bar gauge */}
          <div className={`p-4 rounded-2xl border mb-6 text-left ${isDarkMode ? 'bg-black/35 border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
            <div className="flex justify-between items-center text-xs font-mono font-black mb-2">
              <span className="text-[10px] text-zinc-700 dark:text-zinc-500 font-bold">RIVER WATER DEPTH:</span>
              <span className={isOverflowImminent ? 'text-red-500 animate-pulse' : 'text-blue-500'}>
                {simulatedRiverDepth}m / {activeSector.dangerThreshold}m Max Limit
              </span>
            </div>
            
            <div className={`w-full h-3 rounded-full overflow-hidden mb-1.5 ${isDarkMode ? 'bg-white/5' : 'bg-zinc-200'}`}>
              <div 
                className={`h-full rounded-full transition-all duration-700 ${
                  isOverflowImminent ? 'bg-red-500 animate-pulse' : riverStressPct > 75 ? 'bg-amber-500' : 'bg-blue-500'
                }`} 
                style={{ width: `${riverStressPct}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
              <span className="uppercase">Retaining Wall Pressure Stress</span>
              <span className={isOverflowImminent ? 'text-red-400' : 'text-green-500'}>
                {100 - riverStressPct}% SAFE HEADROOM MARGIN
              </span>
            </div>
          </div>

          {/* CUSTOM HIGH-FIDELITY HYDROMETRIC AREA CHART (SVG-based) */}
          <div className={`w-full rounded-2xl border p-4 text-center select-none relative ${
            isDarkMode ? 'bg-black/50 border-white/5' : 'bg-zinc-50/50 border-zinc-200'
          }`}>
            <div className="h-48 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 540 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hydrology-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference lines */}
                <line x1="20" y1="140" x2="520" y2="140" stroke={isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeWidth="1" />
                <line x1="20" y1="105" x2="520" y2="105" stroke={isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeWidth="1" />
                <line x1="20" y1="70" x2="520" y2="70" stroke={isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeWidth="1" />
                <line x1="20" y1="35" x2="520" y2="35" stroke={isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeWidth="1" />

                {/* Danger line */}
                {/* Danger threshold mapped from 0m to 9m -> y = 140 to 30 */}
                {(() => {
                  const dangerY = Math.round(140 - (activeSector.dangerThreshold / 9) * 110);
                  return (
                    <g>
                      <line x1="20" y1={dangerY} x2="520" y2={dangerY} stroke="#ff453a" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
                      <text x="25" y={dangerY - 5} fill="#ff453a" fontSize="8" fontWeight="bold" className="font-mono">DANGER CRITICAL LEVEL: {activeSector.dangerThreshold}m</text>
                    </g>
                  );
                })()}

                {/* Filled area */}
                <polygon points={svgAreaPoints} fill="url(#hydrology-grad)" />

                {/* Curved line */}
                <polyline points={svgPolylinePoints} fill="none" stroke="#0a84ff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Interactive Points / Plot Indicators */}
                {chartPoints.map((pt, idx) => (
                  <g key={idx} className="group cursor-pointer">
                    <circle cx={pt.x} cy={pt.y} r={idx === 5 ? "6.5" : "4.5"} fill={idx === 5 ? "#ff453a" : "#00bcff"} stroke={isDarkMode ? "#090a0f" : "#ffffff"} strokeWidth="2" />
                    <text x={pt.x} y={pt.y - 10} fill={isDarkMode ? "#ffffff" : "#1f2937"} fontSize="8.5" fontWeight="bold" className="font-mono" textAnchor="middle">
                      {pt.val}m
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Timelines labels */}
            <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-750 dark:text-zinc-500 mt-2 px-4 uppercase">
              <span>12 Hrs Ago</span>
              <span>9 Hrs Ago</span>
              <span>6 Hrs Ago</span>
              <span>3 Hrs Ago</span>
              <span>1 Hr Ago</span>
              <span className="text-blue-500 font-extrabold">LIVE NOW</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

// TS refresh tag
```

## File: src/components/EocMutualAidView.tsx
```typescript
import React from 'react';
import { 
  Activity, Radio, Shield, Signal, Volume2, Mic, Send, MessageSquare, Clock, Check, Info, RadioReceiver 
} from 'lucide-react';
import { Sector, LocalAidRequest } from './eocTypes';

interface EocMutualAidViewProps {
  isDarkMode: boolean;
  activeSector: Sector;
  aidRequests: LocalAidRequest[];
  handleResolveAid: (requestId: string, itemName: string) => void;
  onShowToast?: (message: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  soundBeep: (freq: number, type?: OscillatorType, duration?: number) => void;
  radioFrequency: number;
  setRadioFrequency: React.Dispatch<React.SetStateAction<number>>;
  squelch: number;
  setSquelch: React.Dispatch<React.SetStateAction<number>>;
  rfGain: number;
  setRfGain: React.Dispatch<React.SetStateAction<number>>;
  customRadioMsg: string;
  setCustomRadioMsg: (msg: string) => void;
  customCallsign: string;
  setCustomCallsign: (call: string) => void;
  spectrumBars: number[];
  radioLogs: { id: string; callsign: string; msg: string; rst: string; time: string; type: string }[];
  setRadioLogs: React.Dispatch<React.SetStateAction<{ id: string; callsign: string; msg: string; rst: string; time: string; type: string }[]>>;
}

export const EocMutualAidView: React.FC<EocMutualAidViewProps> = ({
  isDarkMode,
  activeSector,
  aidRequests,
  handleResolveAid,
  onShowToast,
  soundBeep,
  radioFrequency,
  setRadioFrequency,
  squelch,
  setSquelch,
  rfGain,
  setRfGain,
  customRadioMsg,
  setCustomRadioMsg,
  customCallsign,
  setCustomCallsign,
  spectrumBars,
  radioLogs,
  setRadioLogs
}) => {
  const cardBgClass = isDarkMode ? 'bg-zinc-950/80 backdrop-blur-xl' : 'bg-white';
  const cardBorderClass = isDarkMode ? 'border-white/10' : 'border-zinc-200';
  const titleColorClass = isDarkMode ? 'text-white' : 'text-zinc-900';
  const panelTextSecondary = isDarkMode ? 'text-zinc-400' : 'text-zinc-700';

  const [isTransmitting, setIsTransmitting] = React.useState<boolean>(false);

  // Frequency fine-tuner
  const handleTuneFrequency = (delta: number) => {
    soundBeep(850, 'sine', 0.05);
    setRadioFrequency(prev => parseFloat((prev + delta).toFixed(3)));
  };

  // Submit new shortwave message
  const handlePostRadioLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRadioMsg.trim()) return;

    soundBeep(520, 'sine', 0.12);
    setIsTransmitting(true);

    if (onShowToast) {
      onShowToast(`Broadcasting radio log over ${radioFrequency.toFixed(3)} MHz band...`, "info");
    }

    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newLog = {
        id: `RAD-${(radioLogs.length + 1).toString().padStart(2, '0')}`,
        callsign: customCallsign.trim().toUpperCase() || '9W2EOC',
        msg: customRadioMsg.trim(),
        rst: '5/9',
        time: timeStr,
        type: 'BROADCAST'
      };

      setRadioLogs(prev => [newLog, ...prev]);
      setCustomRadioMsg('');
      setIsTransmitting(false);
      soundBeep(880, 'sine', 0.2);

      if (onShowToast) {
        onShowToast(`Transmission logged! Band shortwave sync finalized successfully.`, "success");
      }
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-[fadeIn_0.4s_ease-out]">
      
      {/* LEFT COLUMN: SHORTWAVE TRANSCEIVER PANEL */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl flex flex-col`}>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-[#0a84ff]" />
              <span className={`text-xs font-mono font-extrabold tracking-widest ${titleColorClass}`}>TRANSCEIVER ST-209</span>
            </div>
            <span className="text-[8px] font-mono text-emerald-500 font-extrabold uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
              RX_SQUELCH_HOLD
            </span>
          </div>

          <p className={`text-xs ${panelTextSecondary} mb-4 leading-relaxed`}>
            Simulate high-frequency Shortwave amateur transceivers. Squelch noise filters, fine tune EOC emergency bands, and key up the mic.
          </p>

          {/* RADIO COCKPIT SCREEN */}
          <div className="w-full bg-[#050b0f] border border-blue-900/40 rounded-2xl p-4 flex flex-col gap-4 font-mono shadow-inner shadow-blue-500/10 select-none">
            
            {/* Frequency readout */}
            <div className="flex justify-between items-center bg-[#07131a] border border-blue-950/60 p-3.5 rounded-xl">
              <div>
                <span className="text-[7.5px] text-blue-500 font-bold block leading-none">HF BROADCAST FREQ</span>
                <span className="text-2xl text-cyan-400 font-black tracking-widest block mt-1.5 font-mono">
                  {radioFrequency.toFixed(3)} <span className="text-xs text-blue-500 font-bold">MHz</span>
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <button 
                  onClick={() => handleTuneFrequency(0.025)}
                  className="px-2.5 py-1 bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-900 text-cyan-400 rounded text-[9px] font-black cursor-pointer"
                >
                  TUNE +25
                </button>
                <button 
                  onClick={() => handleTuneFrequency(-0.025)}
                  className="px-2.5 py-1 bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-900 text-cyan-400 rounded text-[9px] font-black cursor-pointer"
                >
                  TUNE -25
                </button>
              </div>
            </div>

            {/* Spectrum Noise Visualizer */}
            <div className="h-16 flex items-end justify-between px-2 bg-[#03060a] border border-blue-950/40 rounded-xl relative overflow-hidden">
              <div className="absolute top-1 left-2 text-[7px] text-zinc-650 font-bold tracking-widest">RF BAND SPECTRUM NOISE</div>
              
              {spectrumBars.map((val, idx) => (
                <div 
                  key={idx} 
                  className="w-2 rounded-t transition-all duration-150 bg-gradient-to-t from-cyan-600 to-emerald-400"
                  style={{ height: `${val}%` }}
                ></div>
              ))}
            </div>

            {/* Micro metrics dials */}
            <div className="grid grid-cols-3 gap-2 text-center text-[8px] text-zinc-700 dark:text-zinc-500 font-bold uppercase">
              <div className="bg-[#03060a]/60 p-2 rounded-lg border border-blue-950/20">
                <span>S-METER</span>
                <span className="block text-emerald-400 font-black mt-1 font-mono">S9+10dB</span>
              </div>
              <div className="bg-[#03060a]/60 p-2 rounded-lg border border-blue-950/20">
                <span>BANDWIDTH</span>
                <span className="block text-cyan-400 font-black mt-1 font-mono">2.8 KHz</span>
              </div>
              <div className="bg-[#03060a]/60 p-2 rounded-lg border border-blue-950/20">
                <span>MODE</span>
                <span className="block text-amber-500 font-black mt-1 font-mono">USB/AM</span>
              </div>
            </div>
          </div>

          {/* Draggable sliders */}
          <div className="space-y-3 mt-4 text-left">
            <div>
              <div className="flex justify-between items-center text-[9px] font-mono text-zinc-700 dark:text-zinc-500 mb-1 font-black">
                <span>RF SQUELCH ATTENTUATION:</span>
                <span className="text-[#0a84ff]">{squelch}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={squelch}
                onChange={(e) => { setSquelch(parseInt(e.target.value)); soundBeep(450, 'sine', 0.02); }}
                className="w-full accent-[#0a84ff]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-[9px] font-mono text-zinc-700 dark:text-zinc-500 mb-1 font-black">
                <span>RF GAIN TELEMETRY:</span>
                <span className="text-[#0a84ff]">{rfGain}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={rfGain}
                onChange={(e) => { setRfGain(parseInt(e.target.value)); soundBeep(450, 'sine', 0.02); }}
                className="w-full accent-[#0a84ff]"
              />
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE DISPATCH LEDGER LOGGER & BROADCAST HISTORIES */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* RADIO LOGGER FORM */}
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl`}>
          <div className="flex items-center gap-2 mb-4">
            <Mic size={15} className="text-[#0a84ff]" />
            <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${titleColorClass}`}>POST DISPATCH TRANSMISSION</span>
          </div>

          <form onSubmit={handlePostRadioLog} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <label className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 block font-bold uppercase mb-1.5">Operator Call Sign</label>
                <input 
                  type="text" 
                  placeholder="e.g. 9W2EOC"
                  value={customCallsign}
                  onChange={(e) => setCustomCallsign(e.target.value)}
                  className={`w-full py-2.5 px-3.5 text-xs rounded-xl border outline-none font-mono ${
                    isDarkMode 
                      ? 'bg-black/35 border-white/5 text-zinc-200 focus:border-[#0a84ff]' 
                      : 'bg-zinc-50 border-zinc-250 text-zinc-800 focus:border-[#0a84ff]'
                  }`}
                />
              </div>

              <div className="text-left">
                <label className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 block font-bold uppercase mb-1.5">Signal Quality Report (RST)</label>
                <input 
                  type="text" 
                  disabled
                  value="5/9 // EXCELLENT"
                  className={`w-full py-2.5 px-3.5 text-xs rounded-xl border outline-none font-mono opacity-60 ${
                    isDarkMode 
                      ? 'bg-black/35 border-white/5 text-zinc-400' 
                      : 'bg-zinc-50 border-zinc-250 text-zinc-500'
                  }`}
                />
              </div>
            </div>

            <div className="text-left">
              <label className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 block font-bold uppercase mb-1.5">Emergency Radio Log Message</label>
              <textarea 
                rows={2}
                placeholder="Type transmission logs (e.g., 'Helicopter crew Alpha secured 4 residents from Shah Alam block B')..."
                value={customRadioMsg}
                onChange={(e) => setCustomRadioMsg(e.target.value)}
                className={`w-full py-2.5 px-3.5 text-xs rounded-xl border outline-none font-sans ${
                  isDarkMode 
                    ? 'bg-black/35 border-white/5 text-zinc-200 focus:border-[#0a84ff]' 
                    : 'bg-zinc-50 border-zinc-250 text-zinc-800 focus:border-[#0a84ff]'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isTransmitting || !customRadioMsg.trim()}
              className="w-full bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white font-mono text-xs font-black py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-[#0a84ff]/10"
            >
              <Send size={13} className={isTransmitting ? 'animate-bounce' : ''} />
              <span>{isTransmitting ? 'TRANSMITTING BAND OVERRIDE...' : 'PRESS TO TRANSMIT LOG'}</span>
            </button>
          </form>
        </div>

        {/* RECENT AIRBAND LOGS TIMELINE */}
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl`}>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={15} className="text-red-400" />
            <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${titleColorClass}`}>EOC BAND TRANSMISSIONS TIMELINE</span>
          </div>

          <div className="space-y-3.5 max-h-[290px] overflow-y-auto pr-1">
            {radioLogs.map((log) => {
              return (
                <div 
                  key={log.id}
                  className={`p-3.5 rounded-2xl border text-left ${
                    isDarkMode ? 'bg-black/35 border-white/5 hover:border-white/10' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-black text-[#0a84ff] tracking-wide">
                        {log.callsign}
                      </span>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase leading-none border ${
                        log.type === 'DISPATCH' 
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/15' 
                          : log.type === 'EVACUATION'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/15'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-700 dark:text-zinc-500">
                      <Clock size={11} />
                      <span>{log.time}</span>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    "{log.msg}"
                  </p>

                  <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-dashed border-zinc-250 dark:border-white/5 text-[9px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                    <span>SIGNAL REPORT RST: {log.rst}</span>
                    <span className="text-emerald-500 font-black">LOGGED VIA HF</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

// TS refresh tag - triggered module update for IDE cache correction
export default EocMutualAidView;
```

## File: src/components/EocShelterView.tsx
```typescript
import React from 'react';
import { 
  Home, Info, CheckCircle, Plus, Minus, Box, ShieldCheck, Mail, Heart, AlertTriangle, AlertOctagon, Check, Edit 
} from 'lucide-react';
import { Sector, SECTORS, ShelterSupply, LocalAidRequest, IncidentCitizen } from './eocTypes';

interface EocShelterViewProps {
  isDarkMode: boolean;
  activeSector: Sector;
  shelterSupplies: { [sectorId: string]: ShelterSupply };
  handleModifySupplies: (sectorId: string, type: 'waterBoxes' | 'foodRations' | 'medicalKits' | 'sandbags', delta: number) => void;
  aidRequests: LocalAidRequest[];
  handleResolveAid: (requestId: string, itemName: string) => void;
  handleDeleteAid?: (requestId: string) => void;
  citizens: IncidentCitizen[];
  onShowToast?: (message: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  soundBeep: (freq: number, type?: OscillatorType, duration?: number) => void;
  onEditShelter?: (shelterId: string) => void;
  isShowingAllSectors?: boolean;
}

export const EocShelterView: React.FC<EocShelterViewProps> = ({
  isDarkMode,
  activeSector,
  shelterSupplies,
  handleModifySupplies,
  aidRequests,
  handleResolveAid,
  handleDeleteAid,
  citizens,
  onShowToast,
  soundBeep,
  onEditShelter,
  isShowingAllSectors = false
}) => {
  const cardBgClass = isDarkMode ? 'bg-zinc-950/80 backdrop-blur-xl' : 'bg-white';
  const cardBorderClass = isDarkMode ? 'border-white/10' : 'border-zinc-200';
  const titleColorClass = isDarkMode ? 'text-white' : 'text-zinc-900';
  const panelTextSecondary = isDarkMode ? 'text-zinc-400' : 'text-zinc-700';

  const [selectedSafehouseId, setSelectedSafehouseId] = React.useState<string>(activeSector.id);

  // Synchronize internal selection with active EOC sector
  React.useEffect(() => {
    setSelectedSafehouseId(activeSector.id);
  }, [activeSector]);

  const activeSupplies = shelterSupplies[selectedSafehouseId] || shelterSupplies.shahalam || { id: 'fallback', waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 };
  const targetSector = SECTORS.find(s => s.id === selectedSafehouseId) || SECTORS[1];

  // Calculate live occupancy for the selected shelter
  const sectorCitizens = citizens.filter(c => c.zone.toLowerCase() === targetSector.zoneMatch.toLowerCase());
  const evacuatedCount = sectorCitizens.filter(c => c.status === 'EVACUATED').length;
  
  // Real-time occupant census: baseline estimate + actual active evacuees logged
  const liveOccupancyCount = Math.min(
    targetSector.maxCapacity,
    Math.round(targetSector.maxCapacity * 0.42) + evacuatedCount
  );

  const occupancyPercentage = Math.round((liveOccupancyCount / targetSector.maxCapacity) * 100);

  // Evaluate shortages
  const isRationsCritical = activeSupplies.foodRations < liveOccupancyCount * 0.8;
  const isWaterCritical = activeSupplies.waterBoxes < liveOccupancyCount * 0.9;
  const isMedicalCritical = activeSupplies.medicalKits < liveOccupancyCount * 0.25;
  const isSandbagsCritical = activeSupplies.sandbags < liveOccupancyCount * 0.5;

  const handleAuditSupplyChange = (type: 'waterBoxes' | 'foodRations' | 'medicalKits' | 'sandbags', delta: number) => {
    soundBeep(410, 'sine', 0.05);
    handleModifySupplies(selectedSafehouseId, type, delta);
  };

  return (
    <div className="flex flex-col gap-8 text-left animate-[fadeIn_0.4s_ease-out]">
      
      {/* ROW 1: Side-by-Side Shelter Registry & Supply Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* LEFT COLUMN: RELIEF SHELTERS REGISTRY */}
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl flex flex-col justify-between h-full`}>
          <div className="flex flex-col h-full min-h-0 justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Home size={15} className="text-[#0a84ff]" />
                  <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${titleColorClass}`}>SHELTER REGISTRY</span>
                </div>
                <span className="text-[8.5px] font-mono text-zinc-500 dark:text-zinc-400 uppercase">JKM CERTIFIED CENTERS</span>
              </div>

              <p className={`text-xs ${panelTextSecondary} mb-5 leading-relaxed`}>
                Select an active relief shelter center below to audit available inventory piles, dispatch logistic supplies, or check current census capacities.
              </p>
            </div>

            {/* Shelter cards loop with constrained max-height to match the audit card exactly */}
            <div className="space-y-4 max-h-[390px] xl:max-h-[465px] overflow-y-auto pr-1.5 scrollbar-thin flex-1">
              {(isShowingAllSectors ? SECTORS : SECTORS.filter((sec) => sec.id === activeSector.id)).map((sec) => {
                const secSupplies = shelterSupplies[sec.id] || { id: sec.id, waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 };
                const secCitizens = citizens.filter(c => c.zone.toLowerCase() === sec.zoneMatch.toLowerCase());
                const secEvacCount = secCitizens.filter(c => c.status === 'EVACUATED').length;
                const secOccupancy = Math.min(sec.maxCapacity, Math.round(sec.maxCapacity * 0.42) + secEvacCount);
                const secPct = Math.round((secOccupancy / sec.maxCapacity) * 100);
                const isSelected = selectedSafehouseId === sec.id;

                const isSecWaterCritical = secSupplies.waterBoxes < secOccupancy * 0.9;
                const isSecRationsCritical = secSupplies.foodRations < secOccupancy * 0.8;
                const isSecMedicalCritical = secSupplies.medicalKits < secOccupancy * 0.25;
                const isSecSandbagsCritical = secSupplies.sandbags < secOccupancy * 0.5;

                return (
                  <div 
                    key={sec.id}
                    onClick={() => { setSelectedSafehouseId(sec.id); soundBeep(480, 'sine', 0.05); }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#0a84ff]/10 border-[#0a84ff] shadow-md shadow-[#0a84ff]/5' 
                        : (isDarkMode ? 'bg-black/35 border-white/5 hover:border-white/10' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300')
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className={`text-xs font-black uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{sec.safehouseName}</h4>
                        <span className="text-[10px] font-mono text-zinc-700 dark:text-zinc-400 uppercase">{sec.zoneMatch} Sector // {sec.code}</span>
                      </div>
                      <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 rounded-full border ${
                        secPct > 80 
                          ? 'bg-red-500/10 text-red-500 border-red-500/25 animate-pulse' 
                          : (isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-250 text-zinc-800 font-extrabold')
                      }`}>
                        {secPct}% FULL
                      </span>
                    </div>

                    {/* Occupancy bar */}
                    <div className="space-y-1 mt-2.5">
                      <div className="flex justify-between text-[9px] font-mono text-zinc-700 dark:text-zinc-400 font-bold leading-none">
                        <span>CENSUS CAPACITY:</span>
                        <span>{secOccupancy} / {sec.maxCapacity} PAX</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-zinc-200'}`}>
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            secPct > 80 ? 'bg-red-500' : secPct > 60 ? 'bg-amber-500' : 'bg-blue-500'
                          }`} 
                          style={{ width: `${secPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stock quick meters */}
                    <div className="grid grid-cols-4 gap-2 mt-3 pt-2.5 border-t border-dashed border-zinc-250 dark:border-white/5 text-[9px] font-mono font-bold text-zinc-700 dark:text-zinc-500">
                      <div>H2O: <span className={isSecWaterCritical ? 'text-red-500 font-extrabold' : 'text-green-500'}>{secSupplies.waterBoxes}</span></div>
                      <div>RAT: <span className={isSecRationsCritical ? 'text-red-500 font-extrabold' : 'text-green-500'}>{secSupplies.foodRations}</span></div>
                      <div>MED: <span className={isSecMedicalCritical ? 'text-red-500 font-extrabold' : 'text-green-500'}>{secSupplies.medicalKits}</span></div>
                      <div>BAG: <span className={isSecSandbagsCritical ? 'text-red-500 font-extrabold' : 'text-green-500'}>{secSupplies.sandbags}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RESOURCE ALLOCATION OVERVIEW (SUPPLY STOCK PILES AUDIT) */}
        <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl flex flex-col justify-between h-full`}>
          <div className="flex flex-col justify-between h-full min-h-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>SUPPLY STOCK PILES AUDIT</span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 font-black uppercase truncate max-w-[150px]">{targetSector.safehouseName.toUpperCase()}</span>
                {onEditShelter && (
                  <button
                    onClick={() => onEditShelter(selectedSafehouseId)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer ${
                      isDarkMode 
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20' 
                        : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    <Edit size={10} />
                    <span>Patch Info</span>
                  </button>
                )}
              </div>
            </div>

            <p className={`text-xs ${panelTextSecondary} mb-4 leading-relaxed`}>
              Manually log logistics truck arrivals or dispatch immediate provisions to secure JKM compliance levels.
            </p>

            <div className="space-y-3.5 text-left">
              
              {/* 1. Water Reserves */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDarkMode ? 'bg-black/35 border-white/5' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <span className={`text-xs font-black block ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>Water Bottle Pallets (H2O)</span>
                  <span className="text-[9px] font-mono text-zinc-700 dark:text-zinc-400 block">Boxes of clean mineral drinking water</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-xs font-mono font-extrabold ${isWaterCritical ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                    {activeSupplies.waterBoxes} BOXES
                  </span>
                  <div className={`flex items-center rounded-lg border overflow-hidden shrink-0 select-none ${
                    isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-300'
                  }`}>
                    <button 
                      onClick={() => handleAuditSupplyChange('waterBoxes', -15)} 
                      className="p-1.5 hover:bg-zinc-500/10 transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <button 
                      onClick={() => handleAuditSupplyChange('waterBoxes', 15)} 
                      className="p-1.5 hover:bg-zinc-500/10 border-l border-zinc-250 dark:border-white/10 transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Rations */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDarkMode ? 'bg-black/35 border-white/5' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <span className={`text-xs font-black block ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>Food Rations & MREs (RAT)</span>
                  <span className="text-[9px] font-mono text-zinc-700 dark:text-zinc-400 block">Pre-packed dry grains, crackers & rice meals</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-xs font-mono font-extrabold ${isRationsCritical ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                    {activeSupplies.foodRations} RATIONS
                  </span>
                  <div className={`flex items-center rounded-lg border overflow-hidden shrink-0 select-none ${
                    isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-300'
                  }`}>
                    <button 
                      onClick={() => handleAuditSupplyChange('foodRations', -15)} 
                      className="p-1.5 hover:bg-zinc-500/10 transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <button 
                      onClick={() => handleAuditSupplyChange('foodRations', 15)} 
                      className="p-1.5 hover:bg-zinc-500/10 border-l border-zinc-250 dark:border-white/10 transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Medical Kits */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDarkMode ? 'bg-black/35 border-white/5' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <span className={`text-xs font-black block ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>Emergency Medical Crates (MED)</span>
                  <span className="text-[9px] font-mono text-zinc-700 dark:text-zinc-400 block">First aid, bandages, oxygen & child medication</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-xs font-mono font-extrabold ${isMedicalCritical ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                    {activeSupplies.medicalKits} CRATES
                  </span>
                  <div className={`flex items-center rounded-lg border overflow-hidden shrink-0 select-none ${
                    isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-300'
                  }`}>
                    <button 
                      onClick={() => handleAuditSupplyChange('medicalKits', -5)} 
                      className="p-1.5 hover:bg-zinc-500/10 transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <button 
                      onClick={() => handleAuditSupplyChange('medicalKits', 5)} 
                      className="p-1.5 hover:bg-zinc-500/10 border-l border-zinc-250 dark:border-white/10 transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Sandbags */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDarkMode ? 'bg-black/35 border-white/5' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div>
                  <span className={`text-xs font-black block ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>Levee Sandbags (BAG)</span>
                  <span className="text-[9px] font-mono text-zinc-700 dark:text-zinc-400 block">Cohesive sandbags for flood water blockage</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-xs font-mono font-extrabold ${isSandbagsCritical ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                    {activeSupplies.sandbags} BAGS
                  </span>
                  <div className={`flex items-center rounded-lg border overflow-hidden shrink-0 select-none ${
                    isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-300'
                  }`}>
                    <button 
                      onClick={() => handleAuditSupplyChange('sandbags', -20)} 
                      className="p-1.5 hover:bg-zinc-500/10 transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <button 
                      onClick={() => handleAuditSupplyChange('sandbags', 20)} 
                      className="p-1.5 hover:bg-zinc-500/10 border-l border-zinc-250 dark:border-white/10 transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Compliance banner */}
          <div className={`mt-5 p-3 rounded-xl border flex items-start gap-3 select-none text-left ${
            isRationsCritical || isWaterCritical 
              ? 'bg-red-500/10 border-red-500/25 text-red-300 animate-[pulse_1.5s_infinite]' 
              : (isDarkMode ? 'bg-green-500/5 border-green-500/15 text-green-400' : 'bg-green-50 border-green-200 text-green-800')
          }`}>
            <Info size={16} className="mt-0.5" />
            <div className="min-w-0 leading-tight">
              <span className="text-[8px] font-mono tracking-widest block font-black uppercase opacity-65">SAFEHOUSE AUDIT STATUS</span>
              {isRationsCritical || isWaterCritical ? (
                <span className="text-[10px] font-extrabold font-mono uppercase text-red-500">
                  CRITICAL: Stockpiles below occupancy thresholds! Replenish immediately.
                </span>
              ) : (
                <span className="text-[10px] font-extrabold font-mono uppercase text-green-650">
                  SUPPLY LEVELS SECURE - FULFILLS JKM MINIMUM STANDARD RATIOS
                </span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ROW 2: Citizen Aid Requests spanning elegantly full-width */}
      <div className={`${cardBgClass} border ${cardBorderClass} rounded-3xl p-6 shadow-xl`}>
        <div className="flex items-center gap-2 mb-4">
          <Mail size={15} className="text-red-400 animate-pulse" />
          <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${titleColorClass}`}>CITIZEN AID REQUESTS</span>
        </div>

        <p className={`text-xs ${panelTextSecondary} mb-5 leading-relaxed`}>
          Outstanding localized citizen requests intercepted from public channels. Click to dispatch supply delivery runs directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aidRequests.filter(r => isShowingAllSectors || r.zone.toLowerCase() === targetSector.zoneMatch.toLowerCase() || targetSector.id === 'shahalam').map((req) => {
            const isResolved = req.status === 'RESOLVED';
            return (
              <div 
                key={req.id} 
                onClick={() => { handleResolveAid(req.id, req.item); }}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isResolved 
                    ? (isDarkMode ? 'bg-green-500/5 border-green-500/15 opacity-75 hover:bg-green-500/10 hover:border-green-500/30' : 'bg-green-50/50 border-green-200 opacity-90 hover:bg-green-100/50 hover:border-green-300') 
                    : (isDarkMode 
                        ? 'bg-black/30 border-white/5 hover:border-white/10 hover:bg-white/[0.04]' 
                        : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100')
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[8px] font-mono text-zinc-500 dark:text-zinc-400 font-extrabold">{req.id}</span>
                    <span className={`text-[8px] font-mono font-black uppercase ${isResolved ? 'text-green-500' : 'text-amber-500 animate-pulse'}`}>
                      {isResolved ? 'DELIVERED' : 'PENDING'}
                    </span>
                  </div>
                  <h5 className={`text-xs font-black uppercase tracking-tight ${titleColorClass}`}>{req.item}</h5>
                  <p className={`text-[10px] leading-relaxed mt-1 line-clamp-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    "{req.description}"
                  </p>
                </div>

                <div className={`flex items-center justify-between border-t pt-2 mt-3 text-[9px] font-mono ${
                  isDarkMode ? 'border-white/5' : 'border-zinc-200'
                }`}>
                  <span className="text-zinc-500">REP: {req.reporter}</span>
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        if (handleDeleteAid) {
                          handleDeleteAid(req.id);
                        }
                      }}
                      className={`px-2.5 py-1 rounded text-[8.5px] font-black uppercase border cursor-pointer transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/25' 
                          : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      }`}
                    >
                      DELETE
                    </button>
                    <button
                      onClick={() => {
                        handleResolveAid(req.id, req.item);
                      }}
                      className={`px-2.5 py-1 rounded text-[8.5px] font-black uppercase border cursor-pointer transition-all duration-200 ${
                        isResolved
                          ? (isDarkMode 
                              ? 'bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25' 
                              : 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200')
                          : (isDarkMode 
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/25' 
                              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100')
                      }`}
                    >
                      {isResolved ? 'DELIVERED' : 'DELIVER'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

// TS refresh tag
```

## File: src/components/eocTypes.ts
```typescript
export interface Sector {
  id: string;
  name: string;
  zoneMatch: string; // matches zone property in mockCitizens
  riverName: string;
  code: string;
  description: string;
  baseCfs: number; // River water discharge speed
  baseDepth: number; // River depth level in meters
  safehouseName: string;
  maxCapacity: number;
  dangerThreshold: number; // Depth in meters causing bridge/lowland overflow
}

export const SECTORS: Sector[] = [
  { 
    id: 'rawang', 
    name: 'Rawang Hydrology Basin', 
    zoneMatch: 'Rawang', 
    riverName: 'Sungai Gong', 
    code: 'RAW-RG01', 
    description: 'Upstream mountainous flow near SMK Seri Garing headwater channels.',
    baseCfs: 1450, 
    baseDepth: 4.2, 
    safehouseName: 'SMK Seri Garing', 
    maxCapacity: 500,
    dangerThreshold: 5.5 
  },
  { 
    id: 'shahalam', 
    name: 'Shah Alam Urban Grid', 
    zoneMatch: 'Shah Alam', 
    riverName: 'Sungai Damansara', 
    code: 'SA-DM04', 
    description: 'Densely built flat urban terrain near low-lying Taman Sri Muda drainage.',
    baseCfs: 3120, 
    baseDepth: 5.8, 
    safehouseName: 'Dewan MBSA Seksyen 4', 
    maxCapacity: 800,
    dangerThreshold: 7.0 
  },
  { 
    id: 'klang', 
    name: 'Klang Estuary Delta', 
    zoneMatch: 'Klang', 
    riverName: 'Sungai Klang', 
    code: 'KLG-KL22', 
    description: 'Tidal-affected coastal outlet subject to saltwater intrusion and backing.',
    baseCfs: 4890, 
    baseDepth: 7.9, 
    safehouseName: 'MPK Klang', 
    maxCapacity: 400,
    dangerThreshold: 9.0 
  },
  { 
    id: 'huluselangor', 
    name: 'Hulu Selangor Valley', 
    zoneMatch: 'Hulu Selangor', 
    riverName: 'Sungai Selangor', 
    code: 'HS-SL02', 
    description: 'High-elevation reservoir headwaters safeguarding agricultural valleys.',
    baseCfs: 1100, 
    baseDepth: 2.9, 
    safehouseName: 'SK Bukit Beruntung', 
    maxCapacity: 600,
    dangerThreshold: 4.0 
  },
  { 
    id: 'batucaves', 
    name: 'Batu Caves Confluence', 
    zoneMatch: 'Batu Caves', 
    riverName: 'Sungai Batu', 
    code: 'BTC-BT11', 
    description: 'Urban stream confluence near Batu Caves Temple lowlands.',
    baseCfs: 2150, 
    baseDepth: 4.8, 
    safehouseName: 'Dewan Beringin', 
    maxCapacity: 350,
    dangerThreshold: 6.0 
  },
  { 
    id: 'kualalumpur', 
    name: 'Kuala Lumpur Central', 
    zoneMatch: 'Kuala Lumpur', 
    riverName: 'Sungai Gombak & Klang', 
    code: 'KL-CTR01', 
    description: 'High density metropolitan zone subject to rapid flash urban flooding.',
    baseCfs: 5500, 
    baseDepth: 6.5, 
    safehouseName: 'Dewan Komuniti KL', 
    maxCapacity: 1000,
    dangerThreshold: 8.0 
  },
  { 
    id: 'petalingjaya', 
    name: 'Petaling Jaya Sector', 
    zoneMatch: 'Petaling Jaya', 
    riverName: 'Sungai Penchala', 
    code: 'PJ-PN03', 
    description: 'Highly populated residential valleys with engineered runoff channels.',
    baseCfs: 2300, 
    baseDepth: 3.8, 
    safehouseName: 'Dewan MBPJ Seksyen 7', 
    maxCapacity: 600,
    dangerThreshold: 5.2 
  },
  { 
    id: 'subangjaya', 
    name: 'Subang Jaya Basin', 
    zoneMatch: 'Subang Jaya', 
    riverName: 'Sungai Damansara Link', 
    code: 'SJ-DL09', 
    description: 'Suburban hub with rapid pavement drainage and retention ponds.',
    baseCfs: 2800, 
    baseDepth: 4.5, 
    safehouseName: 'Dewan MPSJ SS15', 
    maxCapacity: 700,
    dangerThreshold: 5.8 
  },
  { 
    id: 'penang', 
    name: 'Penang Island Delta', 
    zoneMatch: 'Penang', 
    riverName: 'Sungai Pinang', 
    code: 'PNG-PG08', 
    description: 'Coastal urban zone with tidal backing and monsoon storm surge threat.',
    baseCfs: 3400, 
    baseDepth: 5.2, 
    safehouseName: 'Dewan JKKK George Town', 
    maxCapacity: 500,
    dangerThreshold: 6.5 
  },
  { 
    id: 'johorbahru', 
    name: 'Johor Bahru Straits', 
    zoneMatch: 'Johor Bahru', 
    riverName: 'Sungai Segget', 
    code: 'JB-SG12', 
    description: 'Southern border waterway with heavy urban drainage and coastal interaction.',
    baseCfs: 3900, 
    baseDepth: 5.6, 
    safehouseName: 'Dewan MBJB Taman Johor', 
    maxCapacity: 750,
    dangerThreshold: 7.0 
  }
];

export const MAP_NODE_CONFIGS: Record<string, {
  x: number;
  y: number;
  w: number;
  dh: number;
  color: 'gray' | 'orange' | 'green' | 'amber' | 'coral';
  rectWidth: number;
  labelOffsetY: number;
  nameX: number;
  depthX: number;
  shortName: string;
}> = {
  huluselangor: { x: 120, y: 45, w: 11, dh: 11, color: 'amber', rectWidth: 40, labelOffsetY: 21, nameX: -6, depthX: 28, shortName: 'H. SELANGOR' },
  rawang: { x: 45, y: 115, w: 11, dh: 11, color: 'coral', rectWidth: 34, labelOffsetY: 21, nameX: -8, depthX: 21, shortName: 'RAWANG' },
  batucaves: { x: 195, y: 45, w: 11, dh: 11, color: 'green', rectWidth: 34, labelOffsetY: 21, nameX: -8, depthX: 21, shortName: 'BATU CAVES' },
  shahalam: { x: 195, y: 115, w: 15, dh: 22, color: 'orange', rectWidth: 44, labelOffsetY: 36, nameX: -12, depthX: 26, shortName: 'SHAH ALAM' },
  klang: { x: 120, y: 180, w: 11, dh: 11, color: 'amber', rectWidth: 30, labelOffsetY: 21, nameX: -8, depthX: 18, shortName: 'KLANG' },
  kualalumpur: { x: 270, y: 45, w: 11, dh: 11, color: 'coral', rectWidth: 42, labelOffsetY: 21, nameX: -8, depthX: 29, shortName: 'K. LUMPUR' },
  petalingjaya: { x: 120, y: 115, w: 11, dh: 11, color: 'green', rectWidth: 40, labelOffsetY: 21, nameX: -8, depthX: 27, shortName: 'PETALING PJ' },
  subangjaya: { x: 270, y: 115, w: 11, dh: 11, color: 'amber', rectWidth: 40, labelOffsetY: 21, nameX: -8, depthX: 27, shortName: 'SUBANG JAYA' },
  penang: { x: 45, y: 45, w: 11, dh: 11, color: 'coral', rectWidth: 32, labelOffsetY: 21, nameX: -6, depthX: 20, shortName: 'PENANG' },
  johorbahru: { x: 195, y: 180, w: 11, dh: 11, color: 'green', rectWidth: 42, labelOffsetY: 21, nameX: -8, depthX: 29, shortName: 'JOHOR BAHRU' }
};

// Interactive local reactive citizen replica to directly handle EOC dispatches & updates
export interface IncidentCitizen {
  id: string;
  name: string;
  phone: string;
  zone: string;
  status: 'SAFE' | 'EVACUATED' | 'SOS PENDING' | 'RESCUED' | 'TEAM DISPATCHED';
  ping: string;
  healthNeeds?: string;
}

// Interactive shelter resource allocation model
export interface ShelterSupply {
  id: string;
  waterBoxes: number;
  foodRations: number;
  medicalKits: number;
  sandbags: number;
}

// Active local emergency aid requests (directly relational to Selangor zones)
export interface LocalAidRequest {
  id: string;
  zone: string;
  item: string;
  description: string;
  reporter: string;
  status: 'OPEN' | 'SQUAD_DEPLOYED' | 'RESOLVED';
}
```

## File: src/components/ExplorerSidebar.tsx
```typescript
import React from 'react';
import { 
  CloudLightning, HeartHandshake, MapPin, Sun, Moon, Bell, CheckCircle, 
  Database, ShieldCheck, HelpCircle, Laptop, Settings, ChevronRight
} from 'lucide-react';
import { ChecklistItem } from '../types';
import { i18n } from '../constants';

interface ExplorerSidebarProps {
  isVolunteerMode: boolean;
  toggleVolunteerMode: () => void;
  simulateStorm: boolean;
  toggleSimulateStorm: () => void;
  appPhase: string;
  toggleSimulateRecovery: () => void;
  currentLocation: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  checklist: ChecklistItem[];
  toggleCheck: (id: number) => void;
  checkedCount: number;
  fetchLiveLocation: () => void;
  language: 'en' | 'ms' | 'cn';
  onShowLocationModal: () => void;
  onShowLangModal: () => void;
}

export const ExplorerSidebar: React.FC<ExplorerSidebarProps> = ({
  isVolunteerMode,
  toggleVolunteerMode,
  simulateStorm,
  toggleSimulateStorm,
  appPhase,
  toggleSimulateRecovery,
  currentLocation,
  isDarkMode,
  toggleDarkMode,
  notificationsEnabled,
  toggleNotifications,
  checklist,
  toggleCheck,
  checkedCount,
  fetchLiveLocation,
  language,
  onShowLocationModal,
  onShowLangModal
}) => {
  const t = i18n[language] || i18n.en;

  const getLocLabel = (key: string): string => {
    switch (key) {
      case 'checkDoc': return t.checkDoc;
      case 'checkMed': return t.checkMed;
      case 'checkPower': return t.checkPower;
      case 'checkFlash': return t.checkFlash;
      case 'checkWater': return t.checkWater;
      default: return key;
    }
  };

  return (
    <aside className="w-72 border-r border-[#30363D] bg-[#0D1117] flex flex-col shrink-0 select-none overflow-y-auto no-scrollbar">
      {/* Workspace Header */}
      <div className="px-4 py-3 text-[10px] uppercase tracking-widest text-[#8B949E] font-bold border-b border-[#30363D]/60 flex justify-between items-center bg-[#161B22]/40">
        <span>Active Telemetry Workspace</span>
        <span className="text-[#58A6FF] text-[12px] font-mono select-none">v1.3</span>
      </div>

      <div className="flex-1 text-[13px] py-4 space-y-5">
        {/* Environment Override Section */}
        <div className="space-y-1">
          <div className="flex items-center px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#8B949E]">
            <span className="mr-1.5 opacity-75">▼</span> parameters_config
          </div>
          
          <div className="pl-6 pr-4 space-y-1 mt-1 text-[#8B949E]">
            {/* Location Selector Trigger */}
            <div 
              onClick={onShowLocationModal}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#161B22]/70 cursor-pointer text-[#C9D1D9] transition-colors"
            >
              <span className="flex items-center">
                <MapPin size={14} className="mr-2 text-[#0A84FF]" /> 
                <span className="font-medium text-[13px]">Active Zone</span>
              </span>
              <span className="text-xs bg-[#161B22] border border-[#30363D] px-2 py-0.5 rounded text-[#58A6FF] max-w-[80px] truncate">{currentLocation}</span>
            </div>

            {/* Simulate Storm Toggle */}
            <div 
              onClick={toggleSimulateStorm}
              className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#161B22]/70 cursor-pointer transition-colors ${simulateStorm ? 'text-[#FF9F0A]' : ''}`}
            >
              <span className="flex items-center">
                <CloudLightning size={14} className="mr-2" /> 
                <span>Storm Simulation</span>
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ${simulateStorm ? 'bg-[#FF9F0A] animate-pulseshadow shadow-[0_0_8px_#FF9F0A]' : 'bg-[#30363D]'}`} />
            </div>

            {/* Simulate Recovery Toggle */}
            <div 
              onClick={toggleSimulateRecovery}
              className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#161B22]/70 cursor-pointer transition-colors ${appPhase === 'recovery' ? 'text-[#58A6FF]' : ''}`}
            >
              <span className="flex items-center">
                <HeartHandshake size={14} className="mr-2" /> 
                <span>Recovery Phase</span>
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ${appPhase === 'recovery' ? 'bg-[#58A6FF] shadow shadow-[0_0_8px_#58A6FF]' : 'bg-[#30363D]'}`} />
            </div>
          </div>
        </div>

        {/* Civilian Mode vs Volunteer Mode Toggle */}
        <div className="space-y-1">
          <div className="flex items-center px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#8B949E]">
            <span className="mr-1.5 opacity-75">▼</span> responder_rbac
          </div>
          <div className="pl-6 pr-4 space-y-1 mt-1">
            <div 
              onClick={toggleVolunteerMode}
              className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#161B22]/70 cursor-pointer transition-colors ${isVolunteerMode ? 'bg-[#FF9F0A]/10 border border-[#FF9F0A]/20 text-[#FF9F0A]' : 'text-[#8B949E]'}`}
            >
              <span className="flex items-center">
                <Database size={14} className="mr-2" />
                <span className="font-semibold text-[13px]">Volunteer Mode</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest">{isVolunteerMode ? 'ACTIVE' : 'OFF'}</span>
            </div>
          </div>
        </div>

        {/* Go Bag Checklist File */}
        <div className="space-y-1">
          <div className="flex items-center px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#8B949E] justify-between">
            <span className="flex items-center">
              <span className="mr-1.5 opacity-75">▼</span> emergency_go_bag.json
            </span>
            <span className="mr-4 text-[10px] text-[#238636] font-mono">{checkedCount}/{checklist.length} Packed</span>
          </div>
          
          <div className="pl-6 pr-4 space-y-1.5 mt-2 text-[#8B949E]">
            {checklist.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-[#161B22]/70 cursor-pointer transition-all"
              >
                <div className={`w-4 h-4 flex-shrink-0 rounded border flex items-center justify-center transition-all ${item.checked ? 'bg-[#238636] border-[#238636] text-white' : 'border-[#30363D]'}`}>
                  {item.checked && <CheckCircle size={10} className="stroke-[3]" />}
                </div>
                <span className={`text-[12.5px] truncate transition-all ${item.checked ? 'text-[#8B949E]/55 line-through' : 'text-[#C9D1D9]'}`}>
                  {getLocLabel(item.key)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Quick Preferences Folder */}
        <div className="space-y-1">
          <div className="flex items-center px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#8B949E]">
            <span className="mr-1.5 opacity-75">▼</span> user_preferences
          </div>
          <div className="pl-6 pr-4 space-y-1 mt-1 text-[#8B949E]">
            {/* Lang Change Trigger */}
            <div 
              onClick={onShowLangModal}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#161B22]/70 cursor-pointer text-[#C9D1D9] transition-colors"
            >
              <span>Selected Locale</span>
              <span className="text-xs text-[#58A6FF] uppercase font-bold">{language}</span>
            </div>

            {/* Dark Mode Theme */}
            <div 
              onClick={toggleDarkMode}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#161B22]/70 cursor-pointer transition-colors"
            >
              <span>Color Theme</span>
              <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>

            {/* Push Alert Indicator */}
            <div 
              onClick={toggleNotifications}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-[#161B22]/70 cursor-pointer transition-colors"
            >
              <span>Push Notifications</span>
              <span className="text-xs uppercase font-bold" style={{ color: notificationsEnabled ? '#27C93F' : '#FF5F56' }}>
                {notificationsEnabled ? 'MUTED' : 'ENABLED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Quota Status Bar */}
      <div className="p-4 border-t border-[#30363D] bg-[#161B22]/40 mt-auto">
        <div className="text-[10px] text-[#8B949E] mb-2 uppercase font-black tracking-widest">Database Node Quota</div>
        <div className="w-full bg-[#30363D] h-1.5 rounded-full overflow-hidden">
          <div className="w-[82%] bg-[#238636] h-full" />
        </div>
        <div className="text-[10px] mt-2 flex justify-between tracking-wide text-[#8B949E]">
          <span>Firebase Sync State</span>
          <span className="text-[#C9D1D9] font-semibold">Active Node Connection</span>
        </div>
      </div>
    </aside>
  );
};
```

## File: src/components/FigmaWeatherLayout.tsx
```typescript
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
```

## File: src/components/InspectorSidebar.tsx
```typescript
import React from 'react';
import { Tent, LifeBuoy, CheckCircle, Radio, User, Navigation } from 'lucide-react';
import { Shelter, SosRequest } from '../types';

interface InspectorSidebarProps {
  baseShelters: Shelter[];
  shelterStatus: Record<string, any>;
  toggleShelterCapacity: (shelterId: string, isFull: boolean) => void;
  sosRequests: SosRequest[];
  handleDispatchRescue: (sosId: string) => void;
  getShelterOccupancy: (shelter: Shelter) => {
    label: string;
    color: string;
    cap: number;
    pct: number;
  };
  isDarkMode: boolean;
}

export const InspectorSidebar: React.FC<InspectorSidebarProps> = ({
  baseShelters,
  shelterStatus,
  toggleShelterCapacity,
  sosRequests,
  handleDispatchRescue,
  getShelterOccupancy,
  isDarkMode
}) => {
  return (
    <aside className="w-72 border-l border-[#30363D] bg-[#0D1117] flex flex-col shrink-0 select-none overflow-y-auto no-scrollbar">
      {/* Sidebar Header */}
      <div className="px-4 py-3 text-[10px] uppercase tracking-widest text-[#8B949E] font-bold border-b border-[#30363D]/60 bg-[#161B22]/40 shrink-0">
        Properties & Responders
      </div>

      {/* active shelters capacity widget */}
      <div className="p-4 border-b border-[#30363D]/60 space-y-3">
        <div className="flex items-center space-x-1 sm:space-x-2 text-[10.5px] uppercase tracking-wider text-[#8B949E] font-extrabold">
          <Tent size={12} className="text-[#58A6FF]" />
          <span>Shelter Network Capacity</span>
        </div>
        
        <div className="space-y-2 mt-1">
          {baseShelters.map((shelter) => {
            const occ = getShelterOccupancy(shelter);
            const isFull = occ.pct >= 100;

            return (
              <div 
                key={shelter.id}
                className={`p-3 rounded-xl border flex flex-col space-y-2 transition-colors ${
                  isFull 
                  ? 'bg-[#FF453A]/10 border-[#FF453A]/30 text-[#FF453A]' 
                  : 'bg-[#161B22]/50 border-[#30363D]/50 text-[#C9D1D9]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <p className="font-bold text-[12.5px] truncate">{shelter.name}</p>
                    <span 
                      className="text-[9.5px] px-1.5 py-0.5 rounded uppercase font-black tracking-wide mt-1 inline-block"
                      style={{ backgroundColor: `${occ.color}25`, color: occ.color }}
                    >
                      {occ.label} Flow ({occ.pct.toFixed(0)}%)
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleShelterCapacity(shelter.id, isFull)}
                    className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition-transform active:scale-95 ${
                      isFull 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-[#FF453A] hover:bg-[#d73a2f] text-white shadow-sm'
                    }`}
                  >
                    {isFull ? 'Open' : 'Mark Full'}
                  </button>
                </div>
                <div className="w-full bg-black/30 h-1 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, occ.pct)}%`, backgroundColor: occ.color }} />
                </div>
                <div className="flex justify-between text-[10px] text-[#8B949E] font-medium">
                  <span>Capacity</span>
                  <span className="font-semibold text-[#C9D1D9]">{occ.cap} / {shelter.maxCapacity} PAX</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* active SOS request widget from db */}
      <div className="p-4 flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex items-center space-x-1.5 text-[10.5px] uppercase tracking-wider text-[#8B949E] font-extrabold mb-3 shrink-0">
          <LifeBuoy size={12} className="text-[#FF453A] animate-pulse" />
          <span>Active SOS Alarms</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar min-h-0">
          {sosRequests.filter(s => s.status !== 'RESOLVED').length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-center opacity-40 select-none">
              <CheckCircle size={28} className="text-[#27C93F] mb-2" />
              <p className="text-xs font-bold text-[#8B949E]">All Zones Secured</p>
              <p className="text-[10px] text-[#8B949E]/75 mt-0.5">No active civilian distress requests.</p>
            </div>
          ) : (
            sosRequests.filter(s => s.status !== 'RESOLVED').map((sos) => {
              const isPending = sos.status === 'PENDING';
              return (
                <div 
                  key={sos.id} 
                  className={`p-3 rounded-xl border flex flex-col space-y-2 ${
                    isPending 
                    ? 'bg-[#FF453A]/10 border-[#FF453A]/30' 
                    : (sos.status === 'ACCEPTED' ? 'bg-[#FF9F0A]/10 border-[#FF9F0A]/30' : 'bg-[#58A6FF]/10 border-[#58A6FF]/30')
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span 
                      className={`text-[9.5px] px-2 py-0.5 rounded font-black uppercase tracking-widest text-white ${
                        isPending ? 'bg-[#FF453A]' : (sos.status === 'ACCEPTED' ? 'bg-[#FF9F0A]' : 'bg-[#58A6FF]')
                      }`}
                    >
                      {sos.status}
                    </span>
                    <span className="text-[10px] font-mono text-[#8B949E]">
                      {new Date(sos.timestamp && typeof sos.timestamp.toDate === 'function' ? sos.timestamp.toDate() : (sos.timestamp || Date.now())).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#C9D1D9]">{sos.zone} Region</h5>
                    <p className="text-[10px] text-[#8B949E] mt-0.5">Civilian rescue coordinates received.</p>
                  </div>
                  {isPending && (
                    <button 
                      onClick={() => handleDispatchRescue(sos.id)}
                      className="w-full py-1.5 rounded-lg bg-[#58A6FF] hover:bg-blue-600 text-white font-black text-xs shadow transition-colors active:scale-95"
                    >
                      Dispatch Rescue Cruiser
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Developer FYP Log Footer */}
      <div className="p-4 border-t border-[#30363D] bg-[#161B22]/40 shrink-0">
        <div className="text-[10px] text-[#8B949E] mb-2 uppercase font-black tracking-widest">Git Lens Blame</div>
        <div className="flex items-center text-[11px] text-[#C9D1D9]">
          <div className="w-5 h-5 rounded-full bg-indigo-600/30 border border-indigo-400 text-indigo-400 flex items-center justify-center mr-2 text-[9px] font-bold">
            LJ
          </div>
          <div className="truncate">
            <span className="font-bold">Lim Jun Jie</span>
            <span className="text-[#8B949E] ml-1.5">• 3 mins ago</span>
          </div>
        </div>
        <div className="text-[10.5px] text-[#8B949E] italic mt-1.5 leading-snug">
          "Update procedurally simulated regression curves for Rawang validation..."
        </div>
      </div>
    </aside>
  );
};
```

## File: src/components/LiquidGlassFluidEngine.tsx
```typescript
import React, { useEffect, useRef } from 'react';

interface LiquidGlassFluidEngineProps {
  value: number;
  maxValue: number;
  color: string;
}

export const LiquidGlassFluidEngine: React.FC<LiquidGlassFluidEngineProps> = ({ value, maxValue, color }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let angle = 0;
    const fillPercentage = Math.min(100, Math.max(10, (value / maxValue) * 100));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetHeight = canvas.height * (1 - fillPercentage / 100);
      angle += 0.04;

      ctx.fillStyle = color === '#32D74B' ? 'rgba(50, 215, 75, 0.15)' : color === '#FF9F0A' ? 'rgba(255, 159, 10, 0.15)' : 'rgba(255, 69, 58, 0.15)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = targetHeight + Math.sin(x * 0.02 + angle) * 6;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = color === '#32D74B' ? 'rgba(50, 215, 75, 0.25)' : color === '#FF9F0A' ? 'rgba(255, 159, 10, 0.25)' : 'rgba(255, 69, 58, 0.25)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = targetHeight + Math.cos(x * 0.015 + angle + 1.5) * 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, maxValue, color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};
```

## File: src/components/PhysicalRainForeground.tsx
```typescript
import React, { useEffect, useRef } from 'react';

interface PhysicalRainForegroundProps {
  isRaining: boolean;
  activeTab: string;
}

export const PhysicalRainForeground: React.FC<PhysicalRainForegroundProps> = ({ isRaining, activeTab }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isRaining) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    interface RainDrop {
      x: number;
      y: number;
      z: number;
      vy: number;
      len: number;
    }

    interface Splatter {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      decay: number;
      size: number;
    }

    const drops: RainDrop[] = [];
    const droplets: Splatter[] = [];
    const MAX_DROPS = 400;
    let wind = -1.5;
    let targetWind = -1.5;

    for (let i = 0; i < MAX_DROPS; i++) {
      drops.push({
        x: Math.random() * canvas.width * 2 - canvas.width * 0.5,
        y: Math.random() * -canvas.height,
        z: Math.random() * 0.8 + 0.2,
        vy: Math.random() * 15 + 25,
        len: Math.random() * 40 + 20
      });
    }

    const explodeDrop = (x: number, y: number, z: number) => {
      const dropCount = Math.floor(Math.random() * 4) + 3;
      for (let i = 0; i < dropCount; i++) {
        droplets.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 6 + (wind * 0.4),
          vy: -Math.random() * 5 - 2,
          life: 1.0,
          decay: Math.random() * 0.05 + 0.02,
          size: z * (Math.random() * 1.5 + 0.5)
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      wind += (targetWind - wind) * 0.02;
      if (Math.random() < 0.02) targetWind = (Math.random() - 0.5) * 5 - 1;

      if (Math.random() < 0.005) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      const floorY = canvas.height * 0.88;
      const cardTopY = canvas.height * 0.13;
      const timelineTopY = canvas.height * 0.46;

      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        let d = drops[i];

        d.x += wind * d.z;
        d.y += d.vy * d.z;

        let splattered = false;

        if (d.y > floorY) {
          splattered = true;
        } else if (activeTab === 'home' && d.z > 0.6) {
          if (d.y > cardTopY && d.y < cardTopY + 25 && Math.random() > 0.7) splattered = true;
          if (d.y > timelineTopY && d.y < timelineTopY + 25 && Math.random() > 0.7) splattered = true;
        }

        if (splattered) {
          explodeDrop(d.x, d.y, d.z);
          d.y = Math.random() * -100 - 50;
          d.x = Math.random() * canvas.width * 2 - canvas.width * 0.5;
        }

        const tailX = d.x - wind * (d.len / d.vy);
        const tailY = d.y - d.len;

        const grad = ctx.createLinearGradient(tailX, tailY, d.x, d.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, `rgba(255,255,255, ${d.z * 0.7 + 0.1})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(d.x, d.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.z * 2.5 + 0.5;
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = droplets.length - 1; i >= 0; i--) {
        let dr = droplets[i];

        dr.vy += 0.4;
        dr.x += dr.vx;
        dr.y += dr.vy;
        dr.life -= dr.decay;

        if (dr.life <= 0) {
          droplets.splice(i, 1);
        } else {
          ctx.globalAlpha = dr.life;
          ctx.beginPath();
          ctx.arc(dr.x, dr.y, dr.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      const mistGrad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 150);
      mistGrad.addColorStop(0, 'rgba(255,255,255,0.15)');
      mistGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = mistGrad;
      ctx.fillRect(0, canvas.height - 150, canvas.width, 150);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRaining, activeTab]);

  if (!isRaining) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[90]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
```

## File: src/components/SciFiCommandCenter.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Zap, 
  AlertTriangle, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Sparkles, 
  CheckCircle, 
  Compass, 
  Droplet, 
  Users, 
  Plus, 
  Minus, 
  Truck, 
  Info, 
  Siren, 
  Check, 
  Map,
  TrendingUp,
  AlertOctagon
} from 'lucide-react';

import { EocHydrologyView } from './EocHydrologyView';
import { EocDispatchView } from './EocDispatchView';
import { EocShelterView } from './EocShelterView';
// Force IDE TS Server refresh for newly created module exports
import { EocMutualAidView } from './EocMutualAidView';
import { LiquidGlassFluidEngine } from './LiquidGlassFluidEngine';

interface CommandCenterProps {
  isDarkMode: boolean;
  onShowToast?: (message: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  viewMode?: 'all' | 'hydrology' | 'dispatch' | 'shelter' | 'mutual-aid';
  onSetViewMode?: (view: 'overview' | 'hydrology' | 'dispatch' | 'shelter' | 'mutual-aid' | 'citizens') => void;
  selectedSectorId?: string;
  onSelectSectorId?: (id: string) => void;
  onEditShelter?: (shelterId: string) => void;
  citizens?: IncidentCitizen[];
  setCitizens?: React.Dispatch<React.SetStateAction<IncidentCitizen[]>>;
  
  // Real-time synchronization props
  riverLevel?: number;
  rainfall?: number;
  shelterSupplies?: { [sectorId: string]: ShelterSupply };
  setShelterSupplies?: React.Dispatch<React.SetStateAction<{ [sectorId: string]: ShelterSupply }>>;
  isSirenActive?: boolean;
  setIsSirenActive?: (active: boolean) => void;
  isLeveeDamDeployed?: boolean;
  setIsLeveeDamDeployed?: (deployed: boolean) => void;
}

import { 
  Sector, 
  SECTORS, 
  MAP_NODE_CONFIGS, 
  IncidentCitizen, 
  ShelterSupply, 
  LocalAidRequest 
} from './eocTypes';

export * from './eocTypes';

let sharedAudioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioContextClass();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
};

export const SciFiCommandCenter: React.FC<CommandCenterProps> = ({ 
  isDarkMode, 
  onShowToast, 
  viewMode = 'all', 
  onSetViewMode,
  selectedSectorId,
  onSelectSectorId,
  onEditShelter,
  citizens: propsCitizens,
  setCitizens: propsSetCitizens,
  riverLevel: propsRiverLevel,
  rainfall: propsRainfall,
  shelterSupplies: propsShelterSupplies,
  setShelterSupplies: propsSetShelterSupplies,
  isSirenActive: propsIsSirenActive,
  setIsSirenActive: propsSetIsSirenActive,
  isLeveeDamDeployed: propsIsLeveeDamDeployed,
  setIsLeveeDamDeployed: propsSetIsLeveeDamDeployed
}) => {
  const [internalActiveSector, setInternalActiveSector] = useState<Sector>(SECTORS[1]); // Default to Shah Alam
  const [isShowingAllSectors, setIsShowingAllSectors] = useState<boolean>(false);
  const [hoveredSectorId, setHoveredSectorId] = useState<string | null>(null);
  
  const activeSector = selectedSectorId 
    ? (SECTORS.find(s => s.id === selectedSectorId) || internalActiveSector)
    : internalActiveSector;

  const setActiveSector = (sector: Sector) => {
    if (onSelectSectorId) {
      onSelectSectorId(sector.id);
    }
    setInternalActiveSector(sector);
  };
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Interactive EOC states
  const renderIsoCube = (
    tx: number, 
    ty: number, 
    w: number, 
    dh: number, 
    type: 'gray' | 'orange' | 'green' | 'amber' | 'coral', 
    isSelected = false, 
    onClick?: () => void
  ) => {
    let top = '';
    let left = '';
    let right = '';
    
    if (type === 'orange') {
      top = '#ffaa66'; left = '#f97316'; right = '#ea580c';
    } else if (type === 'green') {
      top = '#86efac'; left = '#22c55e'; right = '#15803d';
    } else if (type === 'amber') {
      top = '#fde047'; left = '#fbbf24'; right = '#d97706';
    } else if (type === 'coral') {
      top = '#fca5a5'; left = '#ef4444'; right = '#b91c1c';
    } else {
      // gray
      if (isDarkMode) {
        top = '#475569'; left = '#1e293b'; right = '#0f172a';
      } else {
        top = '#cbd5e1'; left = '#94a3b8'; right = '#64748b';
      }
    }
    
    // Points
    const p1 = `${tx},${ty}`;
    const p2 = `${tx + w},${ty - w * 0.5}`;
    const p3 = `${tx},${ty - w}`;
    const p4 = `${tx - w},${ty - w * 0.5}`;
    
    const p1d = `${tx},${ty + dh}`;
    const p2d = `${tx + w},${ty - w * 0.5 + dh}`;
    const p4d = `${tx - w},${ty - w * 0.5 + dh}`;
    
    return (
      <g 
        className={`transition-all duration-300 ${onClick ? 'cursor-pointer hover:brightness-125' : ''}`}
        onClick={onClick}
      >
        {/* Glow under selected active block */}
        {isSelected && (
          <ellipse 
            cx={tx} 
            cy={ty + dh} 
            rx={w * 1.8} 
            ry={w * 0.9} 
            fill="none" 
            stroke={type === 'orange' ? '#f97316' : type === 'green' ? '#22c55e' : type === 'amber' ? '#fbbf24' : '#3b82f6'} 
            strokeWidth="3"
            className="animate-pulse"
            filter="url(#hudGlowHeavy)"
          />
        )}
        
        {/* Right Face */}
        <polygon points={`${p1} ${p2} ${p2d} ${p1d}`} fill={right} />
        {/* Left Face */}
        <polygon points={`${p4} ${p1} ${p1d} ${p4d}`} fill={left} />
        {/* Top Face */}
        <polygon points={`${p1} ${p2} ${p3} ${p4}`} fill={top} />
        
        {/* Top edge subtle highlight */}
        <polygon points={`${p1} ${p2} ${p3} ${p4}`} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
        
        {/* Outline if selected */}
        {isSelected && (
          <g stroke={isDarkMode ? '#ffffff' : '#000000'} strokeWidth="1.2" opacity="0.95" fill="none">
            <polygon points={`${p1} ${p2} ${p3} ${p4}`} />
            <polygon points={`${p4} ${p1} ${p1d} ${p4d}`} />
            <polygon points={`${p1} ${p2} ${p2d} ${p1d}`} />
          </g>
        )}
      </g>
    );
  };

  const [localSirenActive, setLocalSirenActive] = useState<boolean>(false);
  const [localLeveeDamDeployed, setLocalLeveeDamDeployed] = useState<boolean>(false);

  const isSirenActive = propsIsSirenActive !== undefined ? propsIsSirenActive : localSirenActive;
  const setIsSirenActive = propsSetIsSirenActive !== undefined ? propsSetIsSirenActive : setLocalSirenActive;

  const isLeveeDamDeployed = propsIsLeveeDamDeployed !== undefined ? propsIsLeveeDamDeployed : localLeveeDamDeployed;
  const setIsLeveeDamDeployed = propsSetIsLeveeDamDeployed !== undefined ? propsSetIsLeveeDamDeployed : setLocalLeveeDamDeployed;
  const [selectedCitizenId, setSelectedCitizenId] = useState<string | null>(null);
  const [activeDispatchingId, setActiveDispatchingId] = useState<string | null>(null);
  const [dispatchProgress, setDispatchProgress] = useState<number>(100);
  const [dispatchSearchQuery, setDispatchSearchQuery] = useState<string>('');

  // Initializing local replica of real citizens mapping for Selangor
  const [localCitizens, setLocalCitizens] = useState<IncidentCitizen[]>([
    { id: 'UID-001', name: 'Ahmad bin Yusuf', phone: '+60 12-345 6789', zone: 'Rawang', status: 'SAFE', ping: '2 mins ago', healthNeeds: 'None' },
    { id: 'UID-002', name: 'Mei Ling', phone: '+60 17-987 6543', zone: 'Shah Alam', status: 'SOS PENDING', ping: '1 hr ago', healthNeeds: 'Requires wheelchair accessibility' },
    { id: 'UID-003', name: 'Siti Nurhaliza', phone: '+60 11-112 2334', zone: 'Rawang', status: 'SOS PENDING', ping: 'Just now', healthNeeds: 'Elderly assistance, insulin storage' },
    { id: 'UID-004', name: 'John Doe', phone: '+60 19-888 7777', zone: 'Klang', status: 'SAFE', ping: '5 mins ago', healthNeeds: 'None' },
    { id: 'UID-005', name: 'Ali Rahman', phone: '+60 13-444 5555', zone: 'Hulu Selangor', status: 'SAFE', ping: '10 mins ago', healthNeeds: 'None' },
    { id: 'UID-006', name: 'Wong Kah Wei', phone: '+60 16-222 3333', zone: 'Klang', status: 'SOS PENDING', ping: '15 mins ago', healthNeeds: 'Asthma inhaler supply empty' },
    { id: 'UID-007', name: 'Raju Subramaniam', phone: '+60 14-999 8888', zone: 'Batu Caves', status: 'EVACUATED', ping: '2 hrs ago', healthNeeds: 'None' },
    { id: 'UID-008', name: 'Fatimah Awang', phone: '+60 19-383 4901', zone: 'Shah Alam', status: 'SAFE', ping: 'Just now', healthNeeds: 'None' },
    { id: 'UID-009', name: 'Tan Kah Kee', phone: '+60 11-2345 6789', zone: 'Kuala Lumpur', status: 'SAFE', ping: '8 mins ago', healthNeeds: 'None' },
    { id: 'UID-010', name: 'Lim Goh Tong', phone: '+60 17-555 4433', zone: 'Petaling Jaya', status: 'SAFE', ping: '12 mins ago', healthNeeds: 'None' },
    { id: 'UID-011', name: 'Aswad bin Bakri', phone: '+60 19-223 4455', zone: 'Subang Jaya', status: 'SAFE', ping: '14 mins ago', healthNeeds: 'None' },
    { id: 'UID-012', name: 'Lee Chong Wei', phone: '+60 12-888 9999', zone: 'Penang', status: 'SAFE', ping: '20 mins ago', healthNeeds: 'None' },
    { id: 'UID-013', name: 'Siti Saleha', phone: '+60 13-777 6655', zone: 'Johor Bahru', status: 'SAFE', ping: '30 mins ago', healthNeeds: 'None' }
  ]);

  const citizens = propsCitizens !== undefined ? propsCitizens : localCitizens;
  const setCitizens = propsSetCitizens !== undefined ? propsSetCitizens : setLocalCitizens;

  // Radio Transceiver Simulation States
  const [radioFrequency, setRadioFrequency] = useState<number>(144.550);
  const [squelch, setSquelch] = useState<number>(45);
  const [rfGain, setRfGain] = useState<number>(85);
  const [selectedSquadType, setSelectedSquadType] = useState<string>('Zodiac Boat Squad');
  const [customRadioMsg, setCustomRadioMsg] = useState<string>('');
  const [customCallsign, setCustomCallsign] = useState<string>('9W2EOC');
  const [spectrumBars, setSpectrumBars] = useState<number[]>([40, 60, 45, 90, 80, 50, 75, 40, 60, 30, 85, 55]);
  const [radioLogs, setRadioLogs] = useState<{ id: string; callsign: string; msg: string; rst: string; time: string; type: string }[]>([
    { id: 'RAD-01', callsign: '9W2EOC', msg: 'Zodiac unit Bravo dispatched to Shah Alam Section 13 for citizen pickup.', rst: '5/9', time: '12:44:10', type: 'DISPATCH' },
    { id: 'RAD-02', callsign: '9M2FL', msg: 'River embankment holding fine near Rawang Bypass outlet. Monitoring sensor RAW-L3.', rst: '5/7', time: '12:40:02', type: 'TELEMETRY' },
    { id: 'RAD-03', callsign: '9W2SAB', msg: 'Helicopter 9 returning to Subang Airbase. Completed 4 medical evacuations.', rst: '5/9', time: '12:35:15', type: 'EVACUATION' }
  ]);

  // Handle spectrum bars animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpectrumBars(prev => prev.map(() => Math.floor(Math.random() * 85) + 10));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Dynamic supply state for all 10 safehouses
  const [localShelterSupplies, setLocalShelterSupplies] = useState<{ [sectorId: string]: ShelterSupply }>({
    rawang: { id: 'rawang', waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 },
    shahalam: { id: 'shahalam', waterBoxes: 60, foodRations: 45, medicalKits: 20, sandbags: 220 }, // Started low relative to capacity 300
    klang: { id: 'klang', waterBoxes: 250, foodRations: 240, medicalKits: 110, sandbags: 400 },
    huluselangor: { id: 'huluselangor', waterBoxes: 90, foodRations: 85, medicalKits: 50, sandbags: 80 },
    batucaves: { id: 'batucaves', waterBoxes: 110, foodRations: 95, medicalKits: 60, sandbags: 150 },
    kualalumpur: { id: 'kualalumpur', waterBoxes: 300, foodRations: 280, medicalKits: 150, sandbags: 500 },
    petalingjaya: { id: 'petalingjaya', waterBoxes: 180, foodRations: 160, medicalKits: 90, sandbags: 200 },
    subangjaya: { id: 'subangjaya', waterBoxes: 210, foodRations: 190, medicalKits: 100, sandbags: 240 },
    penang: { id: 'penang', waterBoxes: 160, foodRations: 140, medicalKits: 70, sandbags: 190 },
    johorbahru: { id: 'johorbahru', waterBoxes: 230, foodRations: 210, medicalKits: 105, sandbags: 260 }
  });

  const shelterSupplies = propsShelterSupplies !== undefined ? propsShelterSupplies : localShelterSupplies;
  const setShelterSupplies = propsSetShelterSupplies !== undefined ? propsSetShelterSupplies : setLocalShelterSupplies;

  // Local aid requests linked with our 10 locations
  const [aidRequests, setAidRequests] = useState<LocalAidRequest[]>([
    { id: 'AID-REQ-101', zone: 'Shah Alam', item: '4 Child Life Jackets', description: 'Need life jackets for young children near flooded street. Current ones are only adult-size.', reporter: 'Mei Ling', status: 'OPEN' },
    { id: 'AID-REQ-102', zone: 'Rawang', item: 'Dry Sand bags', description: 'Sacks are filled but dry sand heap is running empty. Water approaching backdoor.', reporter: 'Siti Nurhaliza', status: 'OPEN' },
    { id: 'AID-REQ-103', zone: 'Klang', item: 'Baby Formula & Diapers', description: 'Immediate formula supply for 2 infants cut off by rising water level.', reporter: 'Wong Kah Wei', status: 'OPEN' },
    { id: 'AID-REQ-104', zone: 'Batu Caves', item: 'Portable Generator Supply', description: 'Medical equipment running low on charge at batu caves local temporary shelter.', reporter: 'Devan Nair', status: 'OPEN' }
  ]);

  const soundBeep = (freq: number, type: OscillatorType = 'sine', duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.18, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Browser audio restrictions bypass
    }
  };

  // Helper sound for sirens
  useEffect(() => {
    let interval: any;
    if (isSirenActive) {
      interval = setInterval(() => {
        soundBeep(580, 'triangle', 0.25);
        setTimeout(() => soundBeep(420, 'triangle', 0.25), 300);
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isSirenActive, soundEnabled]);

  const handleSectorChange = (sec: Sector) => {
    setIsShowingAllSectors(false);
    setActiveSector(sec);
    setSelectedCitizenId(null);
    soundBeep(480, 'sine', 0.08);
    if (onShowToast) {
      onShowToast(`Active EOC Focal Sector updated to: ${sec.name}`, "info");
    }
  };

  // Dispatch interactive boat/vehicle squad to citizen location
  const handleDispatchRescue = (citizenId: string, citizenName: string) => {
    soundBeep(650, 'sine', 0.15);
    setActiveDispatchingId(citizenId);
    setDispatchProgress(0);

    if (onShowToast) {
      onShowToast(`Initiating emergency boat deployment for ${citizenName}...`, "amber");
    }

    // Interactive Dispatch timer simulation
    let currentPercentage = 0;
    const interval = setInterval(() => {
      currentPercentage += 20;
      setDispatchProgress(currentPercentage);
      soundBeep(500 + currentPercentage * 2.5, 'sine', 0.04);
      
      if (currentPercentage >= 100) {
        clearInterval(interval);
        // Complete the dispatch and update citizen status
        setCitizens(prev => prev.map(c => {
          if (c.id === citizenId) {
            return { ...c, status: 'EVACUATED', ping: 'Dispatched 5s ago' };
          }
          return c;
        }));
        
        setActiveDispatchingId(null);
        soundBeep(880, 'sine', 0.25);
        if (onShowToast) {
          onShowToast(`Rescue Squad arrived! ${citizenName} evacuated safely to ${activeSector.safehouseName}!`, "success");
        }
      }
    }, 600);
  };

  const handleMarkSafe = (citizenId: string, name: string) => {
    soundBeep(720, 'sine', 0.1);
    setCitizens(prev => prev.map(c => {
      if (c.id === citizenId) {
        const isCurrentlySafe = c.status === 'SAFE';
        const nextStatus = isCurrentlySafe ? 'SOS PENDING' : 'SAFE';
        const nextPing = isCurrentlySafe ? 'SOS Beacon Active' : 'Just Now';
        
        if (onShowToast) {
          if (isCurrentlySafe) {
            onShowToast(`${name} SOS beacon re-activated. Status set to pending.`, "info");
          } else {
            onShowToast(`${name} marked as safe and offline from active SOS beacons.`, "success");
          }
        }
        return { ...c, status: nextStatus, ping: nextPing };
      }
      return c;
    }));
  };

  const handleToggleSiren = () => {
    setIsSirenActive(!isSirenActive);
    soundBeep(isSirenActive ? 220 : 600, 'sine', 0.15);
    if (onShowToast) {
      onShowToast(
        isSirenActive 
          ? `Sector acoustic siren system deactivated for ${activeSector.zoneMatch}` 
          : `WARNING: Broadcasting localized emergency siren in ${activeSector.zoneMatch}! Residents advised to proceed upstream immediately.`, 
        isSirenActive ? "info" : "error"
      );
    }
  };

  const handleToggleLeveeBarriers = () => {
    const nextState = !isLeveeDamDeployed;
    setIsLeveeDamDeployed(nextState);
    soundBeep(nextState ? 750 : 320, 'sine', 0.2);
    if (onShowToast) {
      onShowToast(
        nextState 
          ? `Pneumatic inflatable flood barriers DEPLOYED along ${activeSector.riverName}! Local river overflow stress neutralized.` 
          : `Inflatable river bank barriers DEFLATED. Returning to river baseline retaining structure.`, 
        nextState ? "success" : "amber"
      );
    }
  };

  // Adjust active shelter provisions
  const handleModifySupplies = (sectorId: string, type: 'waterBoxes' | 'foodRations' | 'medicalKits' | 'sandbags', delta: number) => {
    soundBeep(410, 'sine', 0.05);
    setShelterSupplies(prev => {
      const current = prev[sectorId] || { id: sectorId, waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 };
      const nextVal = Math.max(0, current[type] + delta);
      return {
        ...prev,
        [sectorId]: {
          ...current,
          [type]: nextVal
        }
      };
    });
  };

  // Resolve or toggle localized aid request
  const handleResolveAid = (requestId: string, itemName: string) => {
    soundBeep(780, 'sine', 0.12);
    let nextStateStatus: 'RESOLVED' | 'OPEN' = 'RESOLVED';
    setAidRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        nextStateStatus = req.status === 'RESOLVED' ? 'OPEN' : 'RESOLVED';
        return { ...req, status: nextStateStatus };
      }
      return req;
    }));
    if (onShowToast) {
      if (nextStateStatus === 'RESOLVED') {
        onShowToast(`Aid Dispatched: Distributed ${itemName} directly to local sector coordinators.`, "success");
      } else {
        onShowToast(`Aid Reset: ${itemName} request set back to pending status.`, "amber");
      }
    }
  };

  // Delete localized aid request completely
  const handleDeleteAid = (requestId: string) => {
    soundBeep(320, 'sawtooth', 0.12);
    setAidRequests(prev => prev.filter(req => req.id !== requestId));
    if (onShowToast) {
      onShowToast(`Aid Request ${requestId} has been deleted.`, "info");
    }
  };

  // Get matching list of citizens under current EOC searchlight sector
  const currentSectorCitizens = isShowingAllSectors
    ? citizens
    : citizens.filter(c => c.zone.toLowerCase() === activeSector.zoneMatch.toLowerCase());
  const activeSOSBeaconsInSector = currentSectorCitizens.filter(c => c.status === 'SOS PENDING');

  // Compute live levee wall statistics
  // If inflatable barriers are deployed, stress levels are reduced by 40%
  // Scale the base depth of each sector based on the real-time riverLevel factor from App.tsx
  // The baseline riverLevel in App.tsx is 1.30m
  const riverFactor = propsRiverLevel ? (propsRiverLevel / 1.30) : 1.0;
  const rawDepth = activeSector.baseDepth * riverFactor;
  const simulatedRiverDepth = isLeveeDamDeployed 
    ? parseFloat((rawDepth * 0.72).toFixed(2)) 
    : parseFloat(rawDepth.toFixed(2));
    
  const riverStressPct = Math.round(Math.min(99, (simulatedRiverDepth / activeSector.dangerThreshold) * 90));
  const isOverflowImminent = simulatedRiverDepth > activeSector.dangerThreshold;

  // Active shelter statistics
  const evacuatedCountInZone = currentSectorCitizens.filter(c => c.status === 'EVACUATED').length;
  // Live dynamic occupancy calculator: base simulated number + actual newly evacuated states
  const liveShelterOccupancy = Math.min(activeSector.maxCapacity, Math.round(activeSector.maxCapacity * 0.42) + evacuatedCountInZone);
  const currentSupplies = shelterSupplies[activeSector.id] || { id: activeSector.id, waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 };

  // Supply shortage evaluation checklist
  const isRationsCritical = currentSupplies.foodRations < liveShelterOccupancy * 0.8;
  const isWaterCritical = currentSupplies.waterBoxes < liveShelterOccupancy * 0.9;
  const isMedicalCritical = currentSupplies.medicalKits < liveShelterOccupancy * 0.25;

  // Dynamic theme classes for light/dark mode support
  const panelBgClass = isDarkMode ? 'bg-[#030303]/85 backdrop-blur-2xl' : 'bg-white';
  const panelTextPrimary = isDarkMode ? 'text-[#ebeef5]' : 'text-zinc-800';
  const panelTextSecondary = isDarkMode ? 'text-zinc-400' : 'text-zinc-700';
  const cardBgClass = isDarkMode ? 'bg-[#0b0b0d]/90' : 'bg-[#fcfdfe]';
  const cardBorderClass = isDarkMode ? 'border-white/[0.08]' : 'border-zinc-200';
  const titleColorClass = isDarkMode ? 'text-white' : 'text-zinc-900';
  const badgeBgClass = isDarkMode ? 'bg-white/5 border-white/5' : 'bg-zinc-100 border-zinc-200';

  return (
    <div id="eoc-operations-deck" className={`w-full ${panelBgClass} ${panelTextPrimary} font-sans p-5 sm:p-7 rounded-[24px] border ${isDarkMode ? 'border-red-500/15 shadow-[0_12px_45px_rgba(239,68,68,0.03)]' : 'border-zinc-300/60 shadow-lg shadow-zinc-200/50'} overflow-hidden relative select-none transition-all duration-300`}>
      
      {/* Sleek tactical glowing grid overlay background */}
      <div className={`absolute inset-0 bg-[size:24px_24px] pointer-events-none ${
        isDarkMode 
          ? 'bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] opacity-40' 
          : 'bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] opacity-50'
      }`}></div>
      
      {isSirenActive && (
        <div className="absolute inset-0 bg-[#ef4444]/2 pointer-events-none animate-pulse border border-[#ef4444]/30 rounded-[24px] z-10" />
      )}

      {/* HEADER CONTROLS SECTION */}
      <div className={`relative border-b pb-5 mb-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 z-20 ${
        isDarkMode ? 'border-white/[0.08]' : 'border-zinc-200'
      }`}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`w-2 h-2 rounded-full ${isSirenActive || isOverflowImminent ? 'bg-[#FF453A] animate-ping shadow-[0_0_8px_#FF453A]' : 'bg-[#34C759] shadow-[0_0_8px_#34C759]'} ${isSirenActive || isOverflowImminent ? '' : 'animate-pulse'}`}></span>
            <span className="text-[10px] tracking-[0.25em] font-mono font-bold text-red-400 uppercase">EOC LOCALIZED EMERGENCY ACTIONS PORTAL</span>
            <span className="bg-[#0A84FF]/10 text-[#0A84FF] text-[8px] font-black px-2 py-0.5 rounded border border-[#0A84FF]/25 font-mono">SECTOR COMMAND</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            <h3 className={`text-xl sm:text-2xl font-black font-sans tracking-tight uppercase leading-none ${titleColorClass}`}>
              {isShowingAllSectors ? 'ALL SECTORS OVERVIEW' : activeSector.name}
            </h3>
            <div className="flex items-center">
              <span className={`text-[10px] font-mono font-black py-1.5 px-3 rounded-lg border uppercase tracking-widest text-[#0A84FF] ${
                isDarkMode ? 'bg-[#0F111A]/80 border-white/10' : 'bg-zinc-100 border-zinc-200'
              }`}>
                {isShowingAllSectors ? 'ALL RIVERS MONITORING // MULTI-BASIN' : `${activeSector.riverName} // ${activeSector.code}`}
              </span>
            </div>
          </div>
        </div>

        {/* Action center controller bar */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Unified Location Selector Capsule */}
          <div 
            className={`flex items-center p-1 rounded-2xl max-w-full sm:max-w-xl md:max-w-2xl overflow-x-auto border ${
              isDarkMode ? 'bg-[#05070C] border-white/10' : 'bg-zinc-100 border-zinc-200'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              #unified-sector-selector::-webkit-scrollbar {
                display: none;
              }
            `}} />
            <div id="unified-sector-selector" className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none' }}>
              {/* Show All / ALL SECTORS node */}
              <button
                onClick={() => {
                  setIsShowingAllSectors(true);
                  setSelectedCitizenId(null);
                  soundBeep(480, 'sine', 0.08);
                  if (onShowToast) {
                    onShowToast("EOC View: Active EOC Focal Sector updated to: All Sectors Monitor", "info");
                  }
                }}
                id="btn-sector-select-all"
                className={`px-4 py-2 rounded-xl text-[10px] font-black font-mono tracking-widest transition-all duration-200 cursor-pointer uppercase select-none ${
                  isShowingAllSectors
                    ? 'border border-[#FF453A]/60 bg-[#FF453A]/10 text-[#FF453A] shadow-[0_0_12px_rgba(255,69,58,0.2)]'
                    : (isDarkMode ? 'text-[#8E9AA8]/60 hover:text-white px-3 py-2' : 'text-zinc-500 hover:text-zinc-900 px-3 py-2')
                }`}
              >
                ALL
              </button>

              {/* Individual sectors */}
              {SECTORS.map((s) => {
                const isSelected = !isShowingAllSectors && activeSector.id === s.id;
                const displayName = s.zoneMatch.toUpperCase();
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setIsShowingAllSectors(false);
                      handleSectorChange(s);
                    }}
                    id={`btn-sector-select-${s.id}`}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black font-mono tracking-widest transition-all duration-200 cursor-pointer uppercase select-none ${
                      isSelected
                        ? 'border border-[#FF453A]/60 bg-[#FF453A]/10 text-[#FF453A] shadow-[0_0_12px_rgba(255,69,58,0.2)]'
                        : (isDarkMode ? 'text-[#8E9AA8]/60 hover:text-white' : 'text-zinc-500 hover:text-zinc-900')
                    }`}
                  >
                    {displayName}
                  </button>
                );
              })}
            </div>
          </div>



          {/* Master Reset Button */}
          <button
            onClick={() => {
              setIsSirenActive(false);
              setIsLeveeDamDeployed(false);
              setSelectedCitizenId(null);
              setCitizens(prev => prev.map(c => {
                if (c.id === 'UID-002' || c.id === 'UID-003' || c.id === 'UID-006' || c.id === 'UID-009') {
                  return { ...c, status: 'SOS PENDING', ping: '2 mins ago' };
                }
                return { ...c, status: 'SAFE', ping: '1 hr ago' };
              }));
              setShelterSupplies({
                rawang: { id: 'rawang', waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 },
                shahalam: { id: 'shahalam', waterBoxes: 60, foodRations: 45, medicalKits: 20, sandbags: 220 },
                klang: { id: 'klang', waterBoxes: 250, foodRations: 240, medicalKits: 110, sandbags: 400 },
                huluselangor: { id: 'huluselangor', waterBoxes: 90, foodRations: 85, medicalKits: 50, sandbags: 80 },
                batucaves: { id: 'batucaves', waterBoxes: 110, foodRations: 95, medicalKits: 60, sandbags: 150 },
                kualalumpur: { id: 'kualalumpur', waterBoxes: 300, foodRations: 280, medicalKits: 150, sandbags: 500 },
                petalingjaya: { id: 'petalingjaya', waterBoxes: 180, foodRations: 160, medicalKits: 90, sandbags: 200 },
                subangjaya: { id: 'subangjaya', waterBoxes: 210, foodRations: 190, medicalKits: 100, sandbags: 240 },
                penang: { id: 'penang', waterBoxes: 160, foodRations: 140, medicalKits: 70, sandbags: 190 },
                johorbahru: { id: 'johorbahru', waterBoxes: 230, foodRations: 210, medicalKits: 105, sandbags: 260 }
              });
              setAidRequests(prev => prev.map(req => ({ ...req, status: 'OPEN' })));
              soundBeep(261.63, 'sine', 0.25);
              if (onShowToast) onShowToast("EOC Dispatch States Re-synchronized successfully.", "info");
            }}
            id="btn-re-sync-baseline"
            className={`px-4 py-2 h-10 rounded-xl border text-[10px] font-black font-mono tracking-widest flex items-center gap-2 cursor-pointer active:scale-95 transition-all ${
              isDarkMode 
                ? 'border-white/10 bg-[#0F111A]/80 hover:bg-white/5 text-[#8E9AA8]/80 hover:text-white' 
                : 'border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-850'
            }`}
          >
            <RotateCcw size={12} className={isDarkMode ? "text-[#8E9AA8]/80" : "text-zinc-500"} />
            <span>BASELINE SYNC</span>
          </button>
        </div>
      </div>

      {/* EMERGENCY STATE BANNER FOR SIRENS */}
      {isSirenActive && (
        <div className="mb-6 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-mono font-bold flex items-center justify-between animate-[pulse_1.5s_infinite] select-none">
          <div className="flex items-center gap-2">
            <Siren size={15} className="text-red-400 animate-bounce" />
            <span>CRITICAL ADVISORY: SIREN BROADCASTING LIVE WITHIN '{activeSector.zoneMatch.toUpperCase()}' BASIN</span>
          </div>
          <span className="text-[10px] bg-red-950 px-2 py-0.5 rounded text-white border border-red-500/30">LEVEL 3 SOUND WAVE active</span>
        </div>
      )}

      {/* CORE 4-QUADRANT COMMAND PORTAL DECK */}
      {viewMode !== 'mutual-aid' && (
        <div className={viewMode === 'all' ? "grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-20" : "relative z-20"}>
          
          {/* DISTRICT TACTICAL VISUAL MAP (LEFT-SIDE VIEWPORT) */}
          {(viewMode === 'all' || viewMode === 'hydrology') && (
            <div className={viewMode === 'all' ? "lg:col-span-4 flex flex-col gap-4" : "grid grid-cols-1 lg:grid-cols-2 gap-6"}>
          <div className={`${cardBgClass} border ${cardBorderClass} rounded-2xl p-4 flex flex-col justify-start gap-3.5 flex-1 transition-colors duration-300`}>
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className={`text-[10px] font-mono font-extrabold tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>SELANGOR BASIN GRAPHICS</span>
                <span className={`text-[8px] font-mono px-2 py-0.5 rounded uppercase border font-bold ${
                  isDarkMode ? 'bg-white/5 border-white/5 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
                }`}>Interactive GIS</span>
              </div>
              <p className={`text-xs ${panelTextSecondary} mb-4 leading-relaxed text-left`}>
                Click map icons or labels below to hot-swap active hydrological EOC sectors and view live data.
              </p>

              {/* GIS Vector Map */}
              <div className={`w-full h-56 rounded-xl border relative overflow-hidden flex items-center justify-center select-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] ${
                isDarkMode ? 'border-white/10 bg-black/50' : 'border-zinc-250 bg-zinc-50'
              }`}>
                <div className={`absolute inset-0 opacity-95 transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-b from-[#020304] via-[#04060b] to-[#020304]' 
                    : 'bg-gradient-to-b from-[#f4f5f7] via-[#ebedf1] to-[#f4f5f7]'
                } overflow-hidden pointer-events-none`}>
                  {/* Subtle active sonar scanline or glowing radar sweep effect inside the selected background element */}
                  <div className={`absolute inset-0 opacity-15 pointer-events-none ${
                    isDarkMode 
                      ? 'bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.15)_0%,_transparent_65%)] animate-[pulse_3s_ease-in-out_infinite]' 
                      : 'bg-[radial-gradient(circle_at_center,_rgba(10,132,255,0.12)_0%,_transparent_65%)] animate-[pulse_3s_ease-in-out_infinite]'
                  }`}></div>
                  
                  {/* Glowing perimeter border accent */}
                  <div className={`absolute inset-1.5 rounded-lg border border-current opacity-[0.03] pointer-events-none`}></div>
                </div>
                <div className={`absolute inset-0 bg-[size:16px_16px] pointer-events-none ${
                  isDarkMode 
                    ? 'bg-[radial-gradient(rgba(255,255,255,0.15)_1.5px,transparent_1.5px)]' 
                    : 'bg-[radial-gradient(rgba(0,0,0,0.06)_1.5px,transparent_1.5px)]'
                }`}>
                  {/* Digital sweep scanner beam and crosshair overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b via-transparent to-transparent h-1/2 w-full animate-scan opacity-40 pointer-events-none border-b ${
                    isDarkMode ? 'from-blue-500/10 border-blue-500/30' : 'from-blue-500/5 border-blue-400/20'
                  }`}></div>
                  <div className="absolute top-2 left-2 text-[8px] font-mono font-bold text-zinc-500/60 uppercase tracking-widest hidden sm:block">GRID_SCAN // SELANGOR.GIS.v3</div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono font-bold text-zinc-500/60 uppercase tracking-widest hidden sm:block">SYS_STATUS // ACTIVE_PING</div>
                </div>
                
                {/* SVG MAP */}
                <svg className="w-[95%] h-[95%] mx-auto my-auto block overflow-visible relative z-10 select-none" viewBox="0 0 350 220">
                  <defs>
                    {/* Glowing effects */}
                    <filter id="hudGlowHeavy" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="hudGlowSubtle" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Fills & Gradients */}
                    <linearGradient id="activeSectorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(239, 68, 68, 0.12)" />
                      <stop offset="100%" stopColor="rgba(239, 68, 68, 0.01)" />
                    </linearGradient>

                    <linearGradient id="selectedSectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(168, 85, 247, 0.15)" />
                      <stop offset="100%" stopColor="rgba(168, 85, 247, 0.02)" />
                    </linearGradient>

                    <linearGradient id="standardSectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={isDarkMode ? "rgba(255, 255, 255, 0.01)" : "rgba(0, 0, 0, 0.005)"} />
                      <stop offset="100%" stopColor={isDarkMode ? "rgba(255, 255, 255, 0.002)" : "rgba(0, 0, 0, 0.001)"} />
                    </linearGradient>

                    {/* Glassmorphic Cyber Cards */}
                    <linearGradient id="glassCardBgDark" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(15, 23, 42, 0.92)" />
                      <stop offset="100%" stopColor="rgba(30, 41, 59, 0.8)" />
                    </linearGradient>
                    <linearGradient id="glassCardBgLight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.96)" />
                      <stop offset="100%" stopColor="rgba(241, 245, 249, 0.9)" />
                    </linearGradient>
                  </defs>

                  {/* High-Tech HUD Corner Markers */}
                  <path d="M 6,12 L 6,6 L 12,6" fill="none" stroke={isDarkMode ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.2)"} strokeWidth="1" />
                  <path d="M 344,12 L 344,6 L 338,6" fill="none" stroke={isDarkMode ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.2)"} strokeWidth="1" />
                  <path d="M 6,208 L 6,214 L 12,214" fill="none" stroke={isDarkMode ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.2)"} strokeWidth="1" />
                  <path d="M 344,208 L 344,214 L 338,214" fill="none" stroke={isDarkMode ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.2)"} strokeWidth="1" />

                  {/* High-Tech HUD Border Coordinates */}
                  <g opacity="0.4" className="font-mono" pointerEvents="none" fill={isDarkMode ? "rgba(255, 255, 255, 0.85)" : "rgba(15, 23, 42, 0.85)"} fontSize="5">
                    <text x="18" y="11" textAnchor="start">03.0738° N</text>
                    <text x="332" y="11" textAnchor="end">101.5183° E</text>
                    <text x="18" y="212" textAnchor="start">ELEV: 18.2M</text>
                    <text x="332" y="212" textAnchor="end">SYS: ACT_FMD</text>
                  </g>

                  {/* High-Tech Tactical Radar Compass / Compass Rose Overlay */}
                  <g transform="translate(325, 35)" opacity={isDarkMode ? "0.35" : "0.22"} className="hidden sm:block">
                    <circle cx="0" cy="0" r="18" fill="none" stroke={isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)"} strokeWidth="0.8" />
                    <circle cx="0" cy="0" r="12" fill="none" stroke={isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)"} strokeWidth="0.8" strokeDasharray="2 3" />
                    <line x1="-22" y1="0" x2="22" y2="0" stroke={isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"} strokeWidth="0.8" />
                    <line x1="0" y1="-22" x2="0" y2="22" stroke={isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"} strokeWidth="0.8" />
                    <path d="M0 -22 L 2.5 -13 L 0 -15 L -2.5 -13 Z" fill={isDarkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.3)"} />
                    <text x="0" y="-24" fontSize="6" fontWeight="black" textAnchor="middle" className="font-mono tracking-tight" fill={isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.5)"}>N</text>
                    <line x1="0" y1="0" x2="11" y2="-6" stroke={isDarkMode ? "rgba(59, 130, 246, 0.6)" : "rgba(37, 99, 235, 0.5)"} strokeWidth="1" className="animate-pulse" />
                  </g>

                  {/* Rotating Tactical Radar Sweep */}
                  <g opacity={isDarkMode ? "0.18" : "0.12"} pointerEvents="none">
                    <line x1="175" y1="120" x2="175" y2="15" stroke={isDarkMode ? "#0ea5e9" : "#2563eb"} strokeWidth="1" strokeDasharray="3 4">
                      <animateTransform 
                        attributeName="transform" 
                        type="rotate" 
                        from="0 175 120" 
                        to="360 175 120" 
                        dur="12s" 
                        repeatCount="indefinite" 
                      />
                    </line>
                    <line x1="175" y1="120" x2="175" y2="15" stroke={isDarkMode ? "#0ea5e9" : "#2563eb"} strokeWidth="2" opacity="0.35" strokeLinecap="round">
                      <animateTransform 
                        attributeName="transform" 
                        type="rotate" 
                        from="0 175 120" 
                        to="360 175 120" 
                        dur="12s" 
                        repeatCount="indefinite" 
                      />
                    </line>
                    <circle cx="175" cy="120" r="105" fill="none" stroke={isDarkMode ? "#0ea5e9" : "#2563eb"} strokeWidth="0.6" strokeDasharray="10 40" opacity="0.4">
                      <animateTransform 
                        attributeName="transform" 
                        type="rotate" 
                        from="360 175 120" 
                        to="0 175 120" 
                        dur="32s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  </g>

                  {/* Fine Concentric Topography Contour Ripples */}
                  <g opacity={isDarkMode ? "0.06" : "0.03"} pointerEvents="none">
                    <circle cx="175" cy="120" r="45" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="175" cy="120" r="90" fill="none" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 3" />
                    <circle cx="175" cy="120" r="135" fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="8 6" />
                  </g>

                  {/* Isometric Background Grid Streets/Paths */}
                  <g stroke={isDarkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.025)"} strokeWidth="0.6" opacity="0.85" pointerEvents="none">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <g key={i}>
                        {/* Diagonal set 1 */}
                        <line x1={-100 + i * 35} y1="-50" x2={100 + i * 35} y2="300" />
                        {/* Diagonal set 2 */}
                        <line x1={450 - i * 35} y1="-50" x2={250 - i * 35} y2="300" />
                      </g>
                    ))}
                  </g>

                  {/* Scattered Background Non-interactive Isometric 3D Dark Gray Cubes */}
                  <g opacity={isDarkMode ? "0.45" : "0.3"} pointerEvents="none">
                    {renderIsoCube(45, 55, 6, 12, 'gray')}
                    {renderIsoCube(105, 48, 5, 9, 'gray')}
                    {renderIsoCube(195, 28, 7, 13, 'gray')}
                    {renderIsoCube(235, 32, 6, 11, 'gray')}
                    {renderIsoCube(285, 38, 5, 10, 'gray')}
                    {renderIsoCube(325, 68, 7, 12, 'gray')}
                    {renderIsoCube(335, 128, 6, 11, 'gray')}
                    {renderIsoCube(310, 168, 8, 15, 'gray')}
                    {renderIsoCube(285, 198, 6, 12, 'gray')}
                    {renderIsoCube(215, 208, 5, 9, 'gray')}
                    {renderIsoCube(120, 203, 7, 14, 'gray')}
                    {renderIsoCube(35, 158, 6, 10, 'gray')}
                    {renderIsoCube(55, 118, 5, 8, 'gray')}
                    {renderIsoCube(165, 98, 6, 11, 'gray')}
                  </g>

                  {/* Glowing River Basin Hydrological Pathways - All 9 locations connected to Shah Alam (195, 115) */}
                  {/* Penang to Shah Alam */}
                  <path d="M 45,45 Q 110,75 195,115" fill="none" stroke={isDarkMode ? "rgba(14, 165, 233, 0.15)" : "rgba(14, 165, 233, 0.25)"} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 45,45 Q 110,75 195,115" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 12" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" values="36;0" dur="3.2s" repeatCount="indefinite" />
                  </path>

                  {/* Hulu Selangor to Shah Alam */}
                  <path d="M 120,45 Q 150,80 195,115" fill="none" stroke={isDarkMode ? "rgba(14, 165, 233, 0.15)" : "rgba(14, 165, 233, 0.25)"} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 120,45 Q 150,80 195,115" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 12" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" values="36;0" dur="2.5s" repeatCount="indefinite" />
                  </path>

                  {/* Batu Caves to Shah Alam */}
                  <path d="M 195,45 Q 195,80 195,115" fill="none" stroke={isDarkMode ? "rgba(14, 165, 233, 0.15)" : "rgba(14, 165, 233, 0.25)"} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 195,45 Q 195,80 195,115" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 12" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" values="36;0" dur="2s" repeatCount="indefinite" />
                  </path>

                  {/* Kuala Lumpur to Shah Alam */}
                  <path d="M 270,45 Q 240,80 195,115" fill="none" stroke={isDarkMode ? "rgba(14, 165, 233, 0.15)" : "rgba(14, 165, 233, 0.25)"} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 270,45 Q 240,80 195,115" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 12" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" values="36;0" dur="2.8s" repeatCount="indefinite" />
                  </path>

                  {/* Rawang to Shah Alam */}
                  <path d="M 45,115 Q 120,115 195,115" fill="none" stroke={isDarkMode ? "rgba(14, 165, 233, 0.15)" : "rgba(14, 165, 233, 0.25)"} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 45,115 Q 120,115 195,115" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 12" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" values="36;0" dur="3s" repeatCount="indefinite" />
                  </path>

                  {/* Petaling Jaya to Shah Alam */}
                  <path d="M 120,115 Q 155,115 195,115" fill="none" stroke={isDarkMode ? "rgba(14, 165, 233, 0.15)" : "rgba(14, 165, 233, 0.25)"} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 120,115 Q 155,115 195,115" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 12" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" values="36;0" dur="2.2s" repeatCount="indefinite" />
                  </path>

                  {/* Subang Jaya to Shah Alam */}
                  <path d="M 270,115 Q 230,115 195,115" fill="none" stroke={isDarkMode ? "rgba(14, 165, 233, 0.15)" : "rgba(14, 165, 233, 0.25)"} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 270,115 Q 230,115 195,115" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 12" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" values="36;0" dur="2.4s" repeatCount="indefinite" />
                  </path>

                  {/* Shah Alam to Klang - main outlet */}
                  <path d="M 195,115 Q 150,150 120,180" fill="none" stroke={isDarkMode ? "rgba(14, 165, 233, 0.2)" : "rgba(14, 165, 233, 0.35)"} strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M 195,115 Q 150,150 120,180" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="10 14" opacity="0.9">
                    <animate attributeName="stroke-dashoffset" values="48;0" dur="1.8s" repeatCount="indefinite" />
                  </path>

                  {/* Johor Bahru to Shah Alam */}
                  <path d="M 195,180 Q 195,150 195,115" fill="none" stroke={isDarkMode ? "rgba(14, 165, 233, 0.15)" : "rgba(14, 165, 233, 0.25)"} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 195,180 Q 195,150 195,115" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" strokeDasharray="6 12" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" values="36;0" dur="2.6s" repeatCount="indefinite" />
                  </path>

                  {/* Dynamic Telemetry Neural Mesh Connection Lines */}
                  {SECTORS.filter(s => s.id !== 'shahalam').map(s => {
                    const cfg = MAP_NODE_CONFIGS[s.id];
                    if (!cfg) return null;
                    const isSecSelected = isShowingAllSectors || s.id === activeSector.id;
                    const strokeColor = isSecSelected 
                      ? '#3b82f6' 
                      : (isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)');
                    const glowColor = cfg.color === 'orange' ? '#f97316' : cfg.color === 'green' ? '#22c55e' : cfg.color === 'amber' ? '#fbbf24' : '#ef4444';
                    
                    return (
                      <g key={`cable-${s.id}`} opacity={isSecSelected ? "1" : "0.45"}>
                        <path 
                          d={`M ${cfg.x},${cfg.y} Q ${(cfg.x + 195) / 2},${(cfg.y + 115) / 2 - 15} 195,115`} 
                          fill="none" 
                          stroke={isSecSelected ? `rgba(${cfg.color === 'green' ? '34,197,94' : cfg.color === 'amber' ? '251,191,36' : '239,68,68'},0.25)` : strokeColor} 
                          strokeWidth={isSecSelected ? "1.8" : "0.8"} 
                        />
                        {isSecSelected && (
                          <path 
                            d={`M ${cfg.x},${cfg.y} Q ${(cfg.x + 195) / 2},${(cfg.y + 115) / 2 - 15} 195,115`} 
                            fill="none" 
                            stroke={glowColor} 
                            strokeWidth="1.5" 
                            strokeDasharray="4 8" 
                            filter="url(#hudGlowSubtle)"
                          >
                            <animate attributeName="stroke-dashoffset" values="60;0" dur="2.5s" repeatCount="indefinite" />
                          </path>
                        )}
                      </g>
                    );
                  })}

                  {/* Dynamic Water barrier overlay for Shah Alam Levee */}
                  {isLeveeDamDeployed ? (
                     <g transform="translate(195, 115)">
                      <circle cx="0" cy="0" r="24" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
                      <circle cx="0" cy="0" r="18" fill="rgba(34, 197, 94, 0.05)" stroke="#22c55e" strokeWidth="1" filter="url(#hudGlowSubtle)" />
                     </g>
                  ) : (
                    <g transform="translate(195, 115)" className="animate-pulse">
                      <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" />
                      <circle cx="0" cy="0" r="20" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" strokeWidth="1.2" filter="url(#hudGlowSubtle)" />
                    </g>
                  )}

                  {/* INTERACTIVE NODES (Isometric 3D Cuboids with floating labels & trigger areas) */}
                  {SECTORS.map((s) => {
                    const cfg = MAP_NODE_CONFIGS[s.id];
                    if (!cfg) return null;
                    const isSelected = isShowingAllSectors || activeSector.id === s.id;
                    const depthVal = activeSector.id === s.id ? simulatedRiverDepth : s.baseDepth;
                    const hasPendingSos = citizens.some(c => c.zone === s.zoneMatch && c.status === 'SOS PENDING');
                    
                    // Colors
                    const strokeColor = isSelected 
                      ? (cfg.color === 'orange' ? '#f97316' : cfg.color === 'green' ? '#4ade80' : cfg.color === 'amber' ? '#fbbf24' : '#ef4444')
                      : (isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)");
                      
                    const valueColor = isSelected
                      ? (isLeveeDamDeployed ? "#10b981" : (s.id === 'shahalam' ? "#f59e0b" : "#10b981"))
                      : (s.id === 'shahalam' ? "#fbbf24" : "#10b981");

                    return (
                      <g 
                        key={s.id} 
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredSectorId(s.id)}
                        onMouseLeave={() => setHoveredSectorId(null)}
                      >
                        {/* Active Sector Pulsing Sonar Halo */}
                        {isSelected && (
                          <g transform={`translate(${cfg.x}, ${cfg.y})`}>
                            <circle cx="0" cy="0" r={s.id === 'shahalam' ? 16 : 12} fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.8" filter="url(#hudGlowSubtle)">
                              <animate attributeName="r" values={s.id === 'shahalam' ? "10;30" : "8;24"} dur="1.5s" repeatCount="indefinite" />
                              <animate attributeName="opacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                          </g>
                        )}
                        
                        {/* Has Pending SOS critical alarm ring */}
                        {hasPendingSos && (
                          <g transform={`translate(${cfg.x}, ${cfg.y})`}>
                            <circle cx="0" cy="0" r={s.id === 'shahalam' ? 20 : 15} fill="none" stroke="#ef4444" strokeWidth="1.2" className="animate-ping" />
                          </g>
                        )}

                        {/* Isometric building block(s) */}
                        {s.id === 'shahalam' ? (
                          <>
                            {renderIsoCube(
                              cfg.x, 
                              cfg.y, 
                              15, 
                              22, 
                              'orange', 
                              isSelected,
                              () => handleSectorChange(s)
                            )}
                            {renderIsoCube(
                              cfg.x + 16, 
                              cfg.y + 8, 
                              10, 
                              15, 
                              'orange', 
                              false,
                              () => handleSectorChange(s)
                            )}
                          </>
                        ) : (
                          renderIsoCube(
                            cfg.x, 
                            cfg.y, 
                            cfg.w, 
                            cfg.dh, 
                            cfg.color, 
                            isSelected,
                            () => handleSectorChange(s)
                          )
                        )}

                        {/* Transparent click area overlay polygon */}
                        <polygon 
                          points={`${cfg.x - 18},${cfg.y - 18} ${cfg.x + 18},${cfg.y - 18} ${cfg.x + 18},${cfg.y + 18} ${cfg.x - 18},${cfg.y + 18}`} 
                          fill="transparent" 
                          onClick={() => handleSectorChange(s)}
                        />

                        {/* Floating Glass Label Pill */}
                        <g 
                          transform={`translate(${cfg.x}, ${cfg.y - cfg.labelOffsetY})`} 
                          onClick={() => handleSectorChange(s)} 
                          className={`cursor-pointer select-none transition-all duration-300 hover:brightness-125 ${
                            (isSelected || hoveredSectorId === s.id) ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <rect 
                            x={-cfg.rectWidth} 
                            y="-7" 
                            width={cfg.rectWidth * 2} 
                            height="12" 
                            rx="3.5" 
                            fill={isDarkMode ? "rgba(15, 23, 42, 0.88)" : "rgba(255, 255, 255, 0.94)"} 
                            stroke={strokeColor} 
                            strokeWidth={isSelected ? "1.4" : "0.7"} 
                            className={isSelected && s.id === 'shahalam' ? "animate-pulse" : ""}
                          />
                          <line x1={-cfg.rectWidth} y1="-7" x2={-cfg.rectWidth} y2="5" stroke={strokeColor} strokeWidth="2" />
                          <text x={cfg.nameX} y="1" fill={isDarkMode ? '#ffffff' : '#0f172a'} fontSize="5" fontWeight="black" textAnchor="middle" className="font-mono tracking-wider uppercase pointer-events-none">
                            {cfg.shortName}
                          </text>
                          <text x={cfg.depthX} y="1" fill={valueColor} fontSize="5" fontWeight="black" textAnchor="middle" className="font-mono pointer-events-none">
                            {depthVal.toFixed(1)}M
                          </text>
                        </g>
                      </g>
                    );
                  })}


                  {/* HIGH-END FLOATING HUD TELEMETRY WIDGETS & GLASS PANELS REMOVED */}
                </svg>

                {/* Flood gate position indicator */}
                {isLeveeDamDeployed && (
                  <div className="absolute bottom-3 right-3 py-1 px-2.5 rounded bg-green-550/15 text-green-400 text-[9px] font-bold border border-green-500/20 font-mono flex items-center gap-1">
                    <CheckCircle size={10} className="animate-bounce" />
                    <span>INFLATABLE LEVEE DEPLOYED</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick sector descriptors */}
            <div className={`mt-3 pt-3.5 border-t space-y-2 text-left ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
              <span className="text-[10px] font-mono uppercase text-zinc-700 dark:text-zinc-500 block font-bold">Sector Blueprint</span>
              <p className={`text-xs leading-relaxed font-sans ${isDarkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>{activeSector.description}</p>
              
              <div className={`flex justify-between items-center p-2 rounded-lg border mt-1 ${
                isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-200/80'
              }`}>
                <div>
                  <span className="text-[8px] font-mono text-zinc-700 dark:text-zinc-500 block leading-none">RIVER OVERFLOW DISCHARGE</span>
                  <span className={`text-sm font-mono font-black inline-block mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{Math.round(activeSector.baseCfs * riverFactor * (isLeveeDamDeployed ? 0.85 : 1.0))} CFS</span>
                </div>
                <div>
                  <span className="text-[8px] font-mono text-zinc-700 dark:text-zinc-500 block leading-none">LEVEE BARRIER WALLS</span>
                  <span className={`text-[10px] font-mono font-black py-0.5 px-2 rounded block mt-1 uppercase ${
                    isLeveeDamDeployed 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : (isDarkMode ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-amber-50 text-amber-600 border border-amber-200')
                  }`}>
                    {isLeveeDamDeployed ? 'DEPLOYED' : 'STANDARD'}
                  </span>
                </div>
              </div>
            </div>

            {viewMode === 'all' && (
              <div className={`mt-auto pt-3 border-t text-left ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-700 dark:text-zinc-400 mb-1.5 font-bold">
                  <span>RIVER LEVEL PRESSURE GAUGE:</span>
                  <span className={isOverflowImminent ? 'text-red-500 animate-pulse font-black' : (isDarkMode ? 'text-blue-400' : 'text-blue-600')}>
                    {simulatedRiverDepth}m / {activeSector.dangerThreshold}m Max
                  </span>
                </div>
                
                <div className={`w-full h-16 rounded-xl relative overflow-hidden border mb-1.5 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-[#090b11]/80 border-white/5' 
                    : 'bg-zinc-150/40 border-zinc-200/80'
                }`}>
                  <LiquidGlassFluidEngine 
                    value={simulatedRiverDepth} 
                    maxValue={activeSector.dangerThreshold} 
                    color={
                      isOverflowImminent 
                        ? '#FF453A' 
                        : riverStressPct > 75 
                          ? '#FF9F0A' 
                          : '#32D74B'
                    } 
                  />
                  {/* Status Overlay content inside the fluid wave container */}
                  <div className="absolute inset-0 flex flex-col justify-between p-2.5 z-10 pointer-events-none select-none">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[8px] font-mono font-black tracking-wider text-zinc-700 dark:text-zinc-500 uppercase">SYS_TELEMETRY</span>
                      <span className={`text-[9px] font-mono font-black ${
                        isOverflowImminent ? 'text-red-400 animate-pulse' : riverStressPct > 75 ? 'text-amber-500' : 'text-emerald-400'
                      }`}>
                        {riverStressPct.toFixed(0)}% STRESS
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-end w-full">
                      <span className="text-[12px] font-mono font-black text-blue-400 drop-shadow-sm">
                        {simulatedRiverDepth.toFixed(1)}m
                      </span>
                      <span className="text-[8px] font-mono text-zinc-700 dark:text-zinc-500 font-bold uppercase tracking-widest">
                        {isOverflowImminent ? 'OVERFLOW WARNING' : 'SURFACE ACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-1 text-[9px] font-mono text-zinc-700 dark:text-zinc-500 font-medium">
                  <span>RIVER SAFETY OVERFLOW:</span>
                  <span>{100 - riverStressPct}% MARGIN</span>
                </div>
                
                {onSetViewMode && (
                  <button
                    onClick={() => onSetViewMode('hydrology')}
                    className={`mt-4 w-full py-2.5 px-4 rounded-xl border text-[11px] font-extrabold uppercase tracking-wider font-sans transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
                      isDarkMode 
                        ? 'bg-blue-600/15 border-blue-500/25 text-blue-300 hover:bg-blue-600/30 hover:text-white' 
                        : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800'
                    }`}
                  >
                    <span>Open Hydrology & Sensor Controls →</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* CLIMATE PHYSICAL DEFENSES & DISPATCH HARDWARE SYSTEM CONTROLLER */}
          {viewMode === 'hydrology' && (
            <div className={`${cardBgClass} border ${cardBorderClass} rounded-2xl p-4 flex flex-col justify-between transition-colors duration-300`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Siren size={13} className="text-blue-500 animate-pulse" />
                    <span className={`text-[11px] font-mono font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>ZONE HARDWARE CONTROLLERS</span>
                  </div>
                  <span className="text-[8px] font-mono font-black px-1.5 py-0.5 rounded uppercase border bg-[#0A84FF]/10 text-[#0A84FF] border-[#0A84FF]/20">
                    SCADA ACTIVE
                  </span>
                </div>
                <p className={`text-xs ${panelTextSecondary} mb-4 leading-relaxed text-left`}>
                  Directly override automatic physical gates and acoustic broadcast sirens during extreme surge waves.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {/* SIREN BUTTON CONTAINER */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                    isSirenActive 
                      ? 'bg-red-500/10 border-red-500/40 text-white shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                      : (isDarkMode ? 'bg-[#0b0e14] border-white/5 text-gray-400' : 'bg-zinc-50 border-zinc-200/80 text-zinc-600')
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${isSirenActive ? 'bg-red-500/20 text-red-400' : 'bg-zinc-500/10 text-zinc-500'}`}>
                        <Siren size={16} className={isSirenActive ? 'animate-spin' : ''} />
                      </div>
                      <div className="text-left">
                        <span className={`text-xs font-black block uppercase tracking-wide ${isSirenActive ? 'text-red-200' : (isDarkMode ? 'text-zinc-200' : 'text-zinc-800')}`}>
                          Broadcasting Siren Alarm
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[8px] font-mono px-1 rounded ${isSirenActive ? 'bg-red-500/20 text-red-300' : 'bg-zinc-500/20 text-zinc-500'}`}>
                            {isSirenActive ? '112 dB LIVE' : 'STANDBY'}
                          </span>
                          <span className="text-[8px] font-mono text-zinc-500 font-semibold">
                            {isSirenActive ? 'Acoustic warnings pulse active' : 'Squeeze wave audio monitoring'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleSiren}
                      id="btn-toggle-siren-trigger"
                      className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black font-mono tracking-widest transition-all cursor-pointer select-none ${
                        isSirenActive 
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-650' 
                          : (isDarkMode ? 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5' : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300 border border-zinc-300/40')
                      }`}
                    >
                      {isSirenActive ? 'OFF' : 'TEST SIREN'}
                    </button>
                  </div>

                  {/* INFLATABLE FLOOD BARRIERS CONTROLLER */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                    isLeveeDamDeployed 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-white shadow-[0_0_15px_rgba(50,215,75,0.1)]' 
                      : (isDarkMode ? 'bg-[#0b0e14] border-white/5 text-gray-400' : 'bg-zinc-50 border-zinc-200/80 text-zinc-600')
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${isLeveeDamDeployed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-500/10 text-zinc-500'}`}>
                        <Droplet size={16} className={isLeveeDamDeployed ? 'animate-pulse' : ''} />
                      </div>
                      <div className="text-left">
                        <span className={`text-xs font-black block uppercase tracking-wide ${isLeveeDamDeployed ? 'text-emerald-300' : (isDarkMode ? 'text-zinc-200' : 'text-zinc-800')}`}>
                          Pneumatic Inflatable Dam
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[8px] font-mono px-1 rounded ${isLeveeDamDeployed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-500/20 text-zinc-500'}`}>
                            {isLeveeDamDeployed ? '3.5 BAR SEALED' : '1.0 BAR DEFLATED'}
                          </span>
                          <span className="text-[8px] font-mono text-zinc-500 font-semibold">
                            {isLeveeDamDeployed ? 'River overflow counter-stress' : 'Levee wall stress values standard'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleLeveeBarriers}
                      id="btn-toggle-dam-trigger"
                      className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black font-mono tracking-widest transition-all cursor-pointer select-none ${
                        isLeveeDamDeployed 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-650' 
                          : (isDarkMode ? 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5' : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300 border border-zinc-300/40')
                      }`}
                    >
                      {isLeveeDamDeployed ? 'DEFLATE' : 'DEPLOY'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulated Embankment Retaining Wall Pressure gauge */}
              <div className={`mt-4 pt-3.5 border-t text-left ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-1.5 font-bold">
                  <span>RIVER BASIN DEPTH LEVEL:</span>
                  <span className={isOverflowImminent ? 'text-red-500 animate-pulse font-black' : (isDarkMode ? 'text-blue-400' : 'text-blue-600')}>
                    {simulatedRiverDepth}m / {activeSector.dangerThreshold}m Max
                  </span>
                </div>
                
                <div className={`w-full h-16 rounded-xl relative overflow-hidden border mb-1.5 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-[#090b11]/80 border-white/5' 
                    : 'bg-zinc-150/40 border-zinc-200/80'
                }`}>
                  <LiquidGlassFluidEngine 
                    value={simulatedRiverDepth} 
                    maxValue={activeSector.dangerThreshold} 
                    color={
                      isOverflowImminent 
                        ? '#FF453A' 
                        : riverStressPct > 75 
                          ? '#FF9F0A' 
                          : '#32D74B'
                    } 
                  />
                  {/* Status Overlay content inside the fluid wave container */}
                  <div className="absolute inset-0 flex flex-col justify-between p-2.5 z-10 pointer-events-none select-none">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[8px] font-mono font-black tracking-wider text-zinc-500 uppercase">SYS_TELEMETRY</span>
                      <span className={`text-[9px] font-mono font-black ${
                        isOverflowImminent ? 'text-red-400 animate-pulse' : riverStressPct > 75 ? 'text-amber-500' : 'text-emerald-400'
                      }`}>
                        {riverStressPct.toFixed(0)}% STRESS
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-end w-full">
                      <span className="text-[12px] font-mono font-black text-blue-400 drop-shadow-sm">
                        {simulatedRiverDepth.toFixed(1)}m
                      </span>
                      <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-widest">
                        {isOverflowImminent ? 'OVERFLOW WARNING' : 'SURFACE ACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-1 text-[9px] font-mono text-zinc-500 font-medium">
                  <span>RIVER OVERFLOW SAFETY LIMIT:</span>
                  <span>{100 - riverStressPct}% MARGIN</span>
                </div>
              </div>
            </div>
          )}
        </div>
        )}

        {/* ACTIVE CITIZEN DISPATCH CONSOLE (CENTER-VIEW DECK) */}
        {(viewMode === 'all' || viewMode === 'dispatch') && (
          <div className={viewMode === 'all' ? "lg:col-span-4 flex flex-col gap-4" : "w-full max-w-4xl mx-auto flex flex-col gap-6"}>
          <div className={`${cardBgClass} border ${cardBorderClass} rounded-2xl p-4 flex flex-col flex-1 justify-start gap-3.5 transition-colors duration-300`}>
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className={`text-[10px] font-mono font-extrabold tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{isShowingAllSectors ? 'ACTIVE CITIZENS (ALL SECTORS)' : 'ACTIVE CITIZENS IN SECTOR'}</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                  isDarkMode ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-50 text-red-650 border-red-200'
                }`}>
                  {activeSOSBeaconsInSector.length} SOS BEACONS
                </span>
              </div>

              <p className={`text-xs ${panelTextSecondary} mb-4 leading-relaxed text-left`}>
                Locate residents under emergency threat in <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>{isShowingAllSectors ? 'All Sectors' : activeSector.zoneMatch}</span>. Click on a resident card to deploy specialized rescue boats.
              </p>

              {/* Citizen lists inside the sector */}
              <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
                {viewMode === 'all' ? (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-xl border text-left ${
                      isDarkMode ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">{isShowingAllSectors ? 'Overall SOS Status Dashboard' : 'Sector SOS Status Dashboard'}</span>
                      {activeSOSBeaconsInSector.length === 0 ? (
                        <div className="py-8 text-center text-zinc-500">
                          <CheckCircle size={20} className="mx-auto text-green-500 mb-2" />
                          <p className="text-xs font-mono">{isShowingAllSectors ? 'No pending SOS beacons across any sector.' : 'No pending SOS beacons in this sector.'}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {activeSOSBeaconsInSector.slice(0, 2).map(cit => (
                            <div key={cit.id} className="flex justify-between items-center text-xs p-2.5 rounded bg-red-500/5 border border-red-500/15">
                              <div>
                                <span className="font-bold block text-red-400">{cit.name}</span>
                                <span className="text-[10px] font-mono text-zinc-500">{cit.id} // {cit.phone}</span>
                              </div>
                              <span className="text-[9px] font-mono text-red-500 bg-red-500/10 py-0.5 px-2 rounded border border-red-500/20 font-black uppercase">PENDING</span>
                            </div>
                          ))}
                          {activeSOSBeaconsInSector.length > 2 && (
                            <p className="text-[10px] text-zinc-500 text-center font-mono mt-1">
                              + {activeSOSBeaconsInSector.length - 2} more beacons in this sector
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-xl border text-left font-mono ${
                      isDarkMode ? 'bg-blue-950/10 border-blue-500/10 text-zinc-450' : 'bg-blue-50/50 border-blue-100 text-zinc-650'
                    }`}>
                      <p className="text-[10.5px] leading-relaxed">
                        Direct resident rescue operations, dispatch timers, safety logs, and detailed medical checklists require the active SOS Rescue Dispatch module.
                      </p>
                    </div>
                  </div>
                ) : (
                  currentSectorCitizens.length === 0 ? (
                    <div className={`py-12 text-center text-zinc-500 border border-dashed rounded-xl ${
                      isDarkMode ? 'border-white/5 bg-black/25' : 'border-zinc-300 bg-zinc-50/50'
                    }`}>
                      <Users size={20} className="mx-auto mb-2 opacity-30" />
                      <p className="text-xs font-mono">No active registered residents in this catchment area</p>
                    </div>
                  ) : (
                    currentSectorCitizens.map((cit) => {
                      const isCitizenSOS = cit.status === 'SOS PENDING';
                      const isSelected = selectedCitizenId === cit.id;
                      const isDispatchingThis = activeDispatchingId === cit.id;

                      return (
                        <div 
                          key={cit.id}
                          onClick={() => { setSelectedCitizenId(cit.id); soundBeep(450, 'sine', 0.05); }}
                          id={`citizen-card-${cit.id}`}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isCitizenSOS 
                              ? isSelected
                                ? (isDarkMode ? 'bg-red-950/20 border-red-500 shadow-sm shadow-red-500/10' : 'bg-red-50 border-red-500 shadow-sm shadow-red-500/10')
                                : (isDarkMode ? 'bg-red-950/5 border-red-500/30 hover:border-red-500/50' : 'bg-red-50/30 border-red-200 hover:border-red-400')
                              : isSelected
                                ? (isDarkMode ? 'bg-white/5 border-blue-500 shadow-sm' : 'bg-blue-50 border-blue-500 shadow-sm')
                                : (isDarkMode ? 'bg-black/30 border-white/5 hover:border-white/15' : 'bg-white border-zinc-200 hover:border-zinc-300')
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className={`text-xs font-bold uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>
                                {cit.name}
                                <span className={`ml-2 text-[8.5px] font-mono px-1.5 py-0.5 rounded uppercase font-black ${isDarkMode ? 'bg-zinc-800/80 text-zinc-400 border border-white/5' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'}`}>
                                  {cit.zone}
                                </span>
                              </h4>
                              <span className="text-[10px] font-mono text-zinc-500">{cit.phone} // {cit.id}</span>
                            </div>
                            <span className={`text-[8.5px] font-mono font-black py-0.5 px-1.5 rounded uppercase leading-none ${
                              isCitizenSOS 
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                : cit.status === 'EVACUATED'
                                  ? 'bg-purple-950 text-purple-400 border border-purple-900/30'
                                  : 'bg-green-500/10 text-green-400 border border-green-500/20'
                            }`}>
                              {cit.status}
                            </span>
                          </div>

                          {/* Extra drawer if selected */}
                          {isSelected && (
                            <div className={`mt-3.5 pt-3 boundary border-t space-y-2.5 animate-[fadeIn_0.2s_ease-out] ${
                              isDarkMode ? 'border-white/10' : 'border-zinc-200'
                            }`}>
                              <div className={`p-2.5 rounded-lg border ${
                                isDarkMode ? 'bg-black/50 border-white/10' : 'bg-zinc-100 border-zinc-250/60'
                              }`}>
                                <span className="text-[8px] font-mono text-zinc-500 block uppercase leading-none mb-1 font-bold">Special Medical Needs</span>
                                <p className={`text-xs leading-normal ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{cit.healthNeeds || 'None reported'}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                {/* Dispatch Action button */}
                                {isCitizenSOS && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDispatchRescue(cit.id, cit.name);
                                    }}
                                    disabled={activeDispatchingId !== null}
                                    id={`btn-dispatch-rescue-${cit.id}`}
                                    className="flex-1 bg-[#ff453a]/15 text-red-400 border border-red-500/30 hover:bg-[#ff453a]/25 text-[10.5px] font-bold py-2 rounded-lg font-mono flex items-center justify-center gap-1.5 cursor-pointer select-none"
                                  >
                                    {isDispatchingThis ? (
                                      <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                        <span>TEAM EN-ROUTE {dispatchProgress}%</span>
                                      </div>
                                    ) : (
                                      <>
                                        <Truck size={12} className="animate-pulse" />
                                        <span>DISPATCH EMERGENCY RESCUE</span>
                                      </>
                                    )}
                                  </button>
                                )}

                                {/* De-escalate safe shortcut */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkSafe(cit.id, cit.name);
                                  }}
                                  id={`btn-resolve-citizen-${cit.id}`}
                                  className={`px-3 text-[10px] font-bold py-2 rounded-lg font-mono flex items-center justify-center gap-1 cursor-pointer border transition-all duration-200 group ${
                                    cit.status === 'SAFE'
                                      ? isDarkMode 
                                        ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-rose-500/15 hover:border-rose-500/30 hover:text-rose-400' 
                                        : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700'
                                      : isDarkMode
                                        ? 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
                                        : 'bg-zinc-100 border-zinc-250 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800'
                                  }`}
                                >
                                  {cit.status === 'SAFE' ? (
                                    <>
                                      <CheckCircle size={11} className="text-emerald-400 group-hover:hidden" />
                                      <ShieldAlert size={11} className="hidden group-hover:inline text-rose-400 animate-pulse" />
                                      <span className="group-hover:hidden">RESOLVED</span>
                                      <span className="hidden group-hover:inline">RE-OPEN SOS</span>
                                    </>
                                  ) : (
                                    <>
                                      <ShieldCheck size={11} />
                                      <span>MARK SAFE</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )
                )}
              </div>
            </div>

            {/* Total evac and active lists status numbers */}
            <div className={`grid grid-cols-2 gap-3 mt-4 pt-3.5 border-t text-center ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
              <div className={`p-2.5 rounded-lg border ${
                isDarkMode ? 'bg-black/30 border-white/5' : 'bg-zinc-50 border-zinc-250/60'
              }`}>
                <span className="text-[8.5px] font-mono text-zinc-500 block uppercase leading-none font-bold">ZONAL CITIZENS SAFE</span>
                <span className="text-lg font-mono font-black text-green-500 block mt-1.5">
                  {currentSectorCitizens.filter(c => c.status === 'SAFE').length} / {currentSectorCitizens.length}
                </span>
              </div>
              <div className={`p-2.5 rounded-lg border ${
                isDarkMode ? 'bg-black/30 border-white/5' : 'bg-zinc-50 border-zinc-250/60'
              }`}>
                <span className="text-[8.5px] font-mono text-zinc-500 block uppercase leading-none font-bold">ZONAL ACCOMMODATED</span>
                <span className="text-lg font-mono font-black text-purple-500 block mt-1.5">
                  {evacuatedCountInZone} PAX
                </span>
              </div>
            </div>

            {viewMode === 'all' && onSetViewMode && (
              <button
                onClick={() => onSetViewMode('dispatch')}
                className={`mt-auto w-full py-2.5 px-4 rounded-xl border text-[11px] font-extrabold uppercase tracking-wider font-sans transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
                  isDarkMode 
                    ? 'bg-blue-600/15 border-blue-500/25 text-blue-300 hover:bg-blue-600/30 hover:text-white' 
                    : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800'
                }`}
              >
                <span>Open Active Rescue Dispatch →</span>
              </button>
            )}
          </div>
        </div>
        )}

        {/* RELIEF CENTERS & SHELTER PROVISIONS INTEGRATION (RIGHT-SIDE VIEW) */}
        {viewMode === 'shelter' && (
          <div className="w-full relative z-20">
            <EocShelterView
              isDarkMode={isDarkMode}
              activeSector={activeSector}
              shelterSupplies={shelterSupplies}
              handleModifySupplies={handleModifySupplies}
              aidRequests={aidRequests}
              handleResolveAid={handleResolveAid}
              handleDeleteAid={handleDeleteAid}
              citizens={citizens}
              onShowToast={onShowToast}
              soundBeep={soundBeep}
              onEditShelter={onEditShelter}
              isShowingAllSectors={isShowingAllSectors}
            />
          </div>
        )}

        {viewMode === 'all' && (
          <div className="lg:col-span-4 flex flex-col gap-4 relative z-20">
            <div className={`${cardBgClass} border ${cardBorderClass} rounded-2xl p-4 flex flex-col justify-start gap-3.5 flex-1 transition-colors duration-300`}>
              <div className="flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                    <span className={`text-[10px] font-mono font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>SHELT_ALLOCATION_MATRIX</span>
                  </div>
                  <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border uppercase leading-none ${
                    isDarkMode ? 'bg-purple-950 text-purple-400 border-purple-900/30' : 'bg-purple-50 text-purple-700 border-purple-200/60'
                  }`}>
                    JKM REPOSITORY
                  </span>
                </div>

                {isShowingAllSectors ? (
                  <div className="space-y-2.5 mb-2 max-h-[440px] overflow-y-auto pr-1">
                    {SECTORS.map((sec) => {
                      const secSupplies = shelterSupplies[sec.id] || { id: sec.id, waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 };
                      const secCitizens = citizens.filter(c => c.zone.toLowerCase() === sec.zoneMatch.toLowerCase());
                      const secEvacCount = secCitizens.filter(c => c.status === 'EVACUATED').length;
                      const secOccupancy = Math.min(sec.maxCapacity, Math.round(sec.maxCapacity * 0.42) + secEvacCount);
                      const isSecWaterCritical = secSupplies.waterBoxes < secOccupancy * 0.35;
                      const isSecRationsCritical = secSupplies.foodRations < secOccupancy * 0.45;
                      const isSecMedicalCritical = secSupplies.medicalKits < secOccupancy * 0.15;
                      const isSecAnyCritical = isSecWaterCritical || isSecRationsCritical;

                      return (
                        <div key={sec.id} className={`p-2.5 rounded-xl border text-left transition-all ${
                          isDarkMode ? 'bg-white/[0.015] border-white/5' : 'bg-zinc-50 border-zinc-200'
                        }`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[8px] font-mono text-zinc-500 dark:text-zinc-400 block leading-none font-bold">SAFEHOUSE ({sec.code})</span>
                              <h4 className={`text-xs font-black block mt-0.5 uppercase ${titleColorClass}`}>{sec.safehouseName}</h4>
                            </div>
                            <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase leading-none ${
                              isSecAnyCritical
                                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                : 'bg-green-500/10 text-green-400 border-green-500/20'
                            }`}>
                              {isSecAnyCritical ? 'CRITICAL' : 'OPTIMAL'}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mt-2 text-[9px] font-mono font-bold">
                            <span className="text-zinc-500 dark:text-zinc-400">CAPACITY LOADING:</span>
                            <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>{secOccupancy} / {sec.maxCapacity} PAX</span>
                          </div>
                          <div className={`w-full h-1 rounded-full overflow-hidden mt-1 pb-0.5 ${isDarkMode ? 'bg-white/5' : 'bg-zinc-200'}`}>
                            <div 
                              className="h-full bg-purple-500 rounded-full transition-all duration-700" 
                              style={{ width: `${Math.min(100, (secOccupancy / sec.maxCapacity) * 100)}%` }}
                            ></div>
                          </div>

                          {/* Quick Stocks */}
                          <div className="grid grid-cols-3 gap-2 mt-2 pt-1.5 border-t border-dashed border-zinc-250 dark:border-white/5 text-[8px] font-mono font-bold text-zinc-500 dark:text-zinc-400">
                            <div>H2O: <span className={isSecWaterCritical ? 'text-red-500 font-extrabold' : 'text-green-500'}>{secSupplies.waterBoxes} PKs</span></div>
                            <div>RAT: <span className={isSecRationsCritical ? 'text-red-500 font-extrabold' : 'text-green-500'}>{secSupplies.foodRations} EA</span></div>
                            <div>MED: <span className={isSecMedicalCritical ? 'text-red-500 font-extrabold' : 'text-green-500'}>{secSupplies.medicalKits} UT</span></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className={`p-3 rounded-xl border text-left mb-4 ${
                      isDarkMode ? 'bg-white/[0.015] border-white/5' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <span className="text-[8.5px] font-mono text-zinc-500 dark:text-zinc-400 block uppercase leading-none font-bold">DESIGNATED SAFEHOUSE</span>
                      <h4 className={`text-sm font-black block mt-1 uppercase ${titleColorClass}`}>{activeSector.safehouseName}</h4>
                      
                      <div className="flex justify-between items-center mt-3 text-[10px] font-mono font-bold">
                        <span className="text-zinc-500 dark:text-zinc-400">CAPACITY LOADING INDEX:</span>
                        <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>{liveShelterOccupancy} / {activeSector.maxCapacity} PAX</span>
                      </div>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden mt-1 pb-0.5 ${isDarkMode ? 'bg-white/5' : 'bg-zinc-200'}`}>
                        <div 
                          className="h-full bg-purple-500 rounded-full transition-all duration-700" 
                          style={{ width: `${Math.min(100, (liveShelterOccupancy / activeSector.maxCapacity) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-[9.5px] font-mono text-zinc-500 dark:text-zinc-400 font-extrabold uppercase block mb-2 text-left">STOCK DEPLOYMENT LOGISTICS</span>
                    
                    <div className="space-y-2 text-left">
                      <div className="space-y-2">
                        {/* Compact read-only list for overview (only show 3 items) */}
                        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          isDarkMode ? 'bg-black/30 border-white/5' : 'bg-zinc-50 border-zinc-200'
                        }`}>
                          <div>
                            <span className={`text-xs font-bold block ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>Bottled Clean Water Supply</span>
                            <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 block">Packs of 12 boxes</span>
                          </div>
                          <span className={`text-xs font-mono font-black ${isWaterCritical ? 'text-red-500 font-bold' : 'text-green-500'}`}>
                            {currentSupplies.waterBoxes} PKs
                          </span>
                        </div>

                        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          isDarkMode ? 'bg-black/30 border-white/5' : 'bg-zinc-50 border-zinc-200'
                        }`}>
                          <div>
                            <span className={`text-xs font-bold block ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>Hot Meals & Dry Rations</span>
                            <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 block">Pre-packed military bags</span>
                          </div>
                          <span className={`text-xs font-mono font-black ${isRationsCritical ? 'text-red-500 font-bold' : 'text-green-500'}`}>
                            {currentSupplies.foodRations} RATIONs
                          </span>
                        </div>

                        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          isDarkMode ? 'bg-black/30 border-white/5' : 'bg-zinc-50 border-zinc-200'
                        }`}>
                          <div>
                            <span className={`text-xs font-bold block ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>First Aid & Urgent Medical</span>
                            <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 block">Urgent medical crates</span>
                          </div>
                          <span className={`text-xs font-mono font-black ${isMedicalCritical ? 'text-red-500 font-bold' : 'text-green-500'}`}>
                            {currentSupplies.medicalKits} UNITs
                          </span>
                        </div>

                        {onSetViewMode && (
                          <button
                            onClick={() => {
                              onSetViewMode('shelter');
                              soundBeep(520, 'sine', 0.08);
                            }}
                            className={`w-full py-2 px-3.5 rounded-xl border text-[10.5px] font-bold uppercase tracking-wider font-mono transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                              isDarkMode 
                                ? 'bg-purple-950/40 border-purple-800/35 text-purple-300 hover:bg-purple-900/50 hover:text-white hover:border-purple-700/50 hover:scale-[1.01]' 
                                : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:text-purple-800 hover:scale-[1.01]'
                            }`}
                          >
                            <span>+ More Supplies & Audits →</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Warning block */}
              <div className={`mt-3.5 p-2.5 rounded-xl border select-none text-left flex items-start gap-2.5 ${
                isShowingAllSectors
                  ? (SECTORS.some(sec => {
                      const secSupplies = shelterSupplies[sec.id] || { id: sec.id, waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 };
                      const secCitizens = citizens.filter(c => c.zone.toLowerCase() === sec.zoneMatch.toLowerCase());
                      const secEvacCount = secCitizens.filter(c => c.status === 'EVACUATED').length;
                      const secOccupancy = Math.min(sec.maxCapacity, Math.round(sec.maxCapacity * 0.42) + secEvacCount);
                      return secSupplies.waterBoxes < secOccupancy * 0.35 || secSupplies.foodRations < secOccupancy * 0.45;
                    })
                      ? 'bg-red-500/10 border-red-500/20 text-red-200 animate-pulse'
                      : (isDarkMode ? 'bg-green-500/5 border-green-500/15 text-green-300' : 'bg-green-50 border-green-200 text-green-800')
                    )
                  : (isRationsCritical || isWaterCritical 
                      ? 'bg-red-500/10 border-red-500/20 text-red-200 animate-pulse' 
                      : (isDarkMode ? 'bg-green-500/5 border-green-500/15 text-green-300' : 'bg-green-50 border-green-200 text-green-800'))
              }`}>
                <Info size={14} className={`mt-0.5 ${
                  isShowingAllSectors
                    ? (SECTORS.some(sec => {
                        const secSupplies = shelterSupplies[sec.id] || { id: sec.id, waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 };
                        const secCitizens = citizens.filter(c => c.zone.toLowerCase() === sec.zoneMatch.toLowerCase());
                        const secEvacCount = secCitizens.filter(c => c.status === 'EVACUATED').length;
                        const secOccupancy = Math.min(sec.maxCapacity, Math.round(sec.maxCapacity * 0.42) + secEvacCount);
                        return secSupplies.waterBoxes < secOccupancy * 0.35 || secSupplies.foodRations < secOccupancy * 0.45;
                      }) ? 'text-red-400' : (isDarkMode ? 'text-green-400' : 'text-green-600'))
                    : (isRationsCritical || isWaterCritical ? 'text-red-400' : (isDarkMode ? 'text-green-400' : 'text-green-600'))
                }`} />
                <div className="min-w-0 flex-1 leading-tight">
                  <span className="text-[8px] font-mono tracking-widest block font-black uppercase opacity-65">SAFEHOUSE AUDIT STATUS</span>
                  {isShowingAllSectors ? (
                    SECTORS.some(sec => {
                      const secSupplies = shelterSupplies[sec.id] || { id: sec.id, waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 };
                      const secCitizens = citizens.filter(c => c.zone.toLowerCase() === sec.zoneMatch.toLowerCase());
                      const secEvacCount = secCitizens.filter(c => c.status === 'EVACUATED').length;
                      const secOccupancy = Math.min(sec.maxCapacity, Math.round(sec.maxCapacity * 0.42) + secEvacCount);
                      return secSupplies.waterBoxes < secOccupancy * 0.35 || secSupplies.foodRations < secOccupancy * 0.45;
                    }) ? (
                      <span className="text-[10px] font-bold font-mono tracking-tight block mt-0.5 uppercase text-red-500">
                        SHORTAGE WARNING: One or more shelters do not fulfill occupancy counts!
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold font-mono tracking-tight block mt-0.5 uppercase text-green-650">
                        ALL SHELTER PROVISIONS SECURE & JKM COMPLIANT
                      </span>
                    )
                  ) : (
                    isRationsCritical || isWaterCritical ? (
                      <span className="text-[10px] font-bold font-mono tracking-tight block mt-0.5 uppercase text-red-500">
                        SHORTAGE WARNING: Supply stockpiles do not fulfill occupancy counts!
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold font-mono tracking-tight block mt-0.5 uppercase text-green-650">
                        SUPPLY RATIOS FULLY OPTIMIZED - JKM STANDARD SECURE
                      </span>
                    )
                  )}
                </div>
              </div>

              {onSetViewMode && (
                <button
                  onClick={() => {
                    onSetViewMode('shelter');
                    soundBeep(520, 'sine', 0.08);
                  }}
                  className={`mt-auto w-full py-2.5 px-4 rounded-xl border text-[11px] font-extrabold uppercase tracking-wider font-sans transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
                    isDarkMode 
                      ? 'bg-blue-600/15 border-blue-500/25 text-blue-300 hover:bg-blue-600/30 hover:text-white' 
                      : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800'
                  }`}
                >
                  <span>Open Shelter & Stock Logistics →</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
      )}

      {/* EMERGENCY DISPATCH RADIO BAND LOGS (MUTUAL AID LEDGER INTEGRATION) */}
      {(viewMode === 'all' || viewMode === 'mutual-aid') && (
        <div className={`relative z-20 ${
          viewMode === 'all' 
            ? `mt-6 pt-5 border-t ${isDarkMode ? 'border-white/[0.08]' : 'border-zinc-200'}` 
            : ''
        }`}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Activity size={13} className="text-red-400 animate-pulse" />
            <span className="text-[10px] font-mono font-black text-red-400 uppercase tracking-widest">LOCALIZED EMERGENCY RESCUE INTERCEPTOR</span>
          </div>
          <span className="text-[8px] font-mono text-zinc-500 dark:text-zinc-400 uppercase">Active Hydrology Band Logs</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {(() => {
            const allFiltered = aidRequests.filter(r => isShowingAllSectors || r.zone.toLowerCase() === activeSector.zoneMatch.toLowerCase() || activeSector.id === 'shahalam');
            const itemsToRender = viewMode === 'all' ? allFiltered.slice(0, 2) : allFiltered;
            return (
              <>
                {itemsToRender.map((req) => {
                  const isResolved = req.status === 'RESOLVED';
                  return (
                    <div 
                      key={req.id} 
                      onClick={() => {
                        handleResolveAid(req.id, req.item);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isResolved 
                          ? (isDarkMode ? 'bg-green-550/5 border-green-500/20 opacity-80 hover:bg-green-500/10' : 'bg-green-50/60 border-green-200/80 opacity-95 hover:bg-green-100/60') 
                          : (isDarkMode 
                              ? 'bg-black/45 border-white/5 hover:border-white/15 hover:bg-white/[0.08] shadow-sm' 
                              : 'bg-zinc-100/70 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200/50 shadow-sm')
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-[8.5px] font-mono font-black py-0.5 px-1.5 rounded uppercase leading-none border ${
                          isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-150 border-zinc-250 text-zinc-600'
                        }`}>
                          {req.id}
                        </span>
                        <span className={`text-[8.5px] font-mono font-black uppercase leading-none ${isResolved ? 'text-green-500' : 'text-amber-500 animate-pulse'}`}>
                          {isResolved ? 'DELIVERED' : req.status}
                        </span>
                      </div>
                      <h5 className={`text-[11.5px] font-black leading-tight uppercase font-sans mb-1 ${titleColorClass}`}>{req.item}</h5>
                      <p className={`text-[10px] leading-normal line-clamp-2 h-7 font-sans text-left mb-2.5 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        "{req.description}"
                      </p>
                      <div className={`flex items-center justify-between border-t pt-2 ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
                        <div className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                          REP: <span className={`font-mono text-[9.5px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{req.reporter}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              handleDeleteAid(req.id);
                            }}
                            className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase border cursor-pointer transition-all duration-200 ${
                              isDarkMode 
                                ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/25' 
                                : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                            }`}
                          >
                            DELETE
                          </button>
                          <button
                            onClick={() => {
                              handleResolveAid(req.id, req.item);
                            }}
                            className={`px-2.5 py-0.5 rounded text-[8.5px] font-black uppercase border cursor-pointer transition-all duration-200 ${
                              isResolved
                                ? (isDarkMode 
                                    ? 'bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25' 
                                    : 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200')
                                : (isDarkMode 
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/25' 
                                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100')
                            }`}
                          >
                            {isResolved ? 'DELIVERED' : 'DELIVER'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {viewMode === 'all' && allFiltered.length > 2 && onSetViewMode && (
                  <button
                    onClick={() => {
                      onSetViewMode('mutual-aid');
                      soundBeep(520, 'sine', 0.08);
                    }}
                    id="btn-show-all-radio-transmissions"
                    className={`w-full py-3 px-4 rounded-xl border text-[11px] font-bold uppercase tracking-wider font-mono transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isDarkMode 
                        ? 'bg-red-500/10 border-red-500/25 text-red-400 hover:bg-red-500/20 hover:text-white hover:border-red-500/40 hover:scale-[1.01]' 
                        : 'bg-red-50 border-red-200 text-red-750 hover:bg-red-100 hover:text-red-900 hover:scale-[1.01]'
                    }`}
                  >
                    <span>DECRYPT ALL EMERGENCY SIGNALS (+{allFiltered.length - 2} MORE) →</span>
                  </button>
                )}
              </>
            );
          })()}
        </div>
      </div>
      )}
      
    </div>
  );
};
```

## File: src/components/TerminalPanel.tsx
```typescript
import React, { useEffect, useRef } from 'react';

interface TerminalPanelProps {
  systemLogs: string[];
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ systemLogs }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [systemLogs]);

  return (
    <div className="h-44 border-t border-[#30363D] bg-[#0D1117] flex flex-col font-mono">
      <div className="h-8 flex items-center px-4 bg-[#161B22] border-b border-[#30363D] text-[10px] uppercase font-bold tracking-widest text-[#8B949E] space-x-6 shrink-0 select-none">
        <span className="text-[#C9D1D9] border-b border-[#58A6FF] pb-2 pt-2">Terminal</span>
        <span className="hover:text-white cursor-pointer transition-colors">Output</span>
        <span className="hover:text-white cursor-pointer transition-colors">Debug Console</span>
        <span className="hover:text-white cursor-pointer transition-colors flex items-center">
          Problems <span className="ml-1 px-1 bg-[#FF453A]/20 text-[#FF453A] rounded text-[9px]">0</span>
        </span>
      </div>
      <div 
        ref={containerRef}
        className="flex-1 p-3 text-[11px] text-[#79C0FF] overflow-y-auto space-y-1 custom-scrollbar leading-relaxed selection:bg-white/10"
      >
        <div className="text-[#238636] font-bold">➜ flood-ai-center git:(main) ✗ npm run telemetry:stream</div>
        <div className="text-[#C9D1D9]">ready - telemetry sync established on port 3000, tracking JKM center feeds...</div>
        <div className="text-[#8B949E]">info  - parsed live Open-Meteo precipitation indexes [Selangor Basin]</div>
        {systemLogs.map((log, index) => (
          <div key={index} className="text-[#C9D1D9] opacity-85 transition-all animate-[fadeIn_0.2s_ease-out]">
            <span className="text-[#8B949E] select-none mr-2 font-light">│</span>
            {log}
          </div>
        ))}
        <div className="text-white opacity-40 animate-pulse select-none">_</div>
      </div>
    </div>
  );
};
```

## File: src/components/WeatherBackground.tsx
```typescript
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
```

## File: src/utils/audio.ts
```typescript
export function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export function base64ToArrayBuffer(base64: string) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function pcmToWav(pcm16Array: Int16Array, sampleRate: number) {
  const buffer = new ArrayBuffer(44 + pcm16Array.length * 2);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + pcm16Array.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, pcm16Array.length * 2, true);

  for (let i = 0; i < pcm16Array.length; i++) {
    view.setInt16(44 + i * 2, pcm16Array[i], true);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}
```

## File: src/App.tsx
```typescript
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MapPin, Sun, Moon, CloudRain, Waves, Shield, Home, Map as MapIcon,
  Bell, Settings, Search, Navigation, AlertTriangle,
  CheckCircle, HelpCircle, LogOut, ChevronRight, ChevronLeft, BookOpen, Trophy, Compass, Droplet, Mail, Lock, User,
  CloudLightning, LayoutDashboard, ShieldAlert, Users,
  Activity, Radio, MapPinned, Info, Download, Signal, Wifi, Battery,
  Loader2, Sparkles, AlertOctagon, Cloud, Crosshair, LifeBuoy, UserCheck,
  Tent, BarChart3, Clock, FileText, X, Database, ShieldCheck,
  LockKeyhole, Key, Camera, Image as ImageIcon, HeartHandshake, Heart, Truck,
  MessageSquare, Globe, Sliders, GraduationCap, Footprints, ChevronDown, Menu, Trash2, ChevronUp, ArrowUpRight, Edit, Save,
  Minus, Plus, ArrowLeft, Share2, Phone, Bookmark
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithCustomToken,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  setDoc,
  increment,
  deleteDoc
} from 'firebase/firestore';

import firebaseConfig from '../firebase-applet-config.json';
import { FigmaWeatherLayout } from './components/FigmaWeatherLayout';
import { SciFiCommandCenter, IncidentCitizen } from './components/SciFiCommandCenter';
import { DashboardOverview } from './components/desktop/DashboardOverview';
import { ResidentDirectory } from './components/desktop/ResidentDirectory';
import { MobileHomePage } from './components/mobile/MobileHomePage';
import { MobileMapPage } from './components/mobile/MobileMapPage';
import { MobileCommunityPage } from './components/mobile/MobileCommunityPage';
import { MobileAlertsPage } from './components/mobile/MobileAlertsPage';
import { MobileSettingsPage } from './components/mobile/MobileSettingsPage';

// ============================================================================
// IMAGE CONFIGURATION (Option B: Website Links)
// ----------------------------------------------------------------------------
// You can easily change any of the photos in this app yourself! 
// To change a photo, simply find the corresponding variable below and replace the
// URL inside the single quotes with any public image address (from Unsplash, Imgur, 
// or any image hosting website).
// ============================================================================

// --- General Community Posts / Feeds ---
// Image displayed in general community update posts
const regeneratedImagePost1 = '/flood pictures.jpg';
// Image displayed for the regional community seeds/initiatives feed
const regeneratedImageSeed1 = '/flood pictures 2.jpg';

// --- Community Card Background Banners ---
// Background banner image for the "Rescue Ops Community"
const regeneratedImageRescueBg = '/flood pictures 3.jpg';
// Background banner image for the "Hydro-monitoring Group"
const regeneratedImageHydroBg = '/flood pictures 4.jpg';
// Background banner image for the "Storm Chasers & Weather Watchers"
const regeneratedImageStormBg = '/flood pictures 5.jpg';
// Background banner image for the "Sandbagging Network"
const regeneratedImageSandBg = '/flood pictures 8.jpg';

// --- Rescue Ops Activity Grid Images ---
// First photo in the Rescue Ops community gallery/grid
const regeneratedImageRescueGrid1 = '/flood pictures 15.jpg';
// Second photo in the Rescue Ops community gallery/grid
const regeneratedImageRescueGrid2 = '/flood pictures 16.jpg';
// Third photo in the Rescue Ops community gallery/grid
const regeneratedImageRescueGrid3 = '/flood pictures 17.jpg';

// --- Hydro-monitoring Activity Grid Images ---
// First photo in the Hydro-monitoring community gallery/grid
const regeneratedImageHydroGrid1 = '/flood pictures 11.jpg';
// Second photo in the Hydro-monitoring community gallery/grid
const regeneratedImageHydroGrid2 = '/flood pictures 12.jpg';
// Third photo in the Hydro-monitoring community gallery/grid
const regeneratedImageHydroGrid3 = '/flood pictures 13.jpg';

// --- Storm Chasers Activity Grid Images ---
// First photo in the Storm Chasers community gallery/grid
const regeneratedImageStormGrid1 = '/flood pictures 18.jpg';
// Second photo in the Storm Chasers community gallery/grid
const regeneratedImageStormGrid2 = '/flood pictures 19.jpg';
// Third photo in the Storm Chasers community gallery/grid
const regeneratedImageStormGrid3 = '/flood pictures 20.jpg';

// --- Sandbagging Network Activity Grid Images ---
// First photo in the Sandbagging Network gallery/grid
const regeneratedImageSandGrid1 = '/flood pictures 7.jpg';
// Second photo in the Sandbagging Network gallery/grid
const regeneratedImageSandGrid2 = '/flood pictures 8.jpg';
// Third photo in the Sandbagging Network gallery/grid
const regeneratedImageSandGrid3 = '/flood pictures 9.jpg';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = (firebaseConfig as any).firestoreDatabaseId
  ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
  : getFirestore(app);
const appId = 'flood-ai-fyp';

let sharedAudioCtxApp: AudioContext | null = null;

const getAudioContextApp = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioCtxApp) {
    sharedAudioCtxApp = new AudioContextClass();
  }
  if (sharedAudioCtxApp.state === 'suspended') {
    sharedAudioCtxApp.resume().catch(() => { });
  }
  return sharedAudioCtxApp;
};

const OperationType = {
  HOME: 'home',
  MAP: 'map',
  COMMUNITY: 'community',
  ALERTS: 'alerts',
  SETTINGS: 'settings',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write'
};

interface FirestoreErrorInfo {
  error: string;
  operationType: any;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: any, operationType: any, path: any) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn("Firestore Notice (Offline Fallback Mode Active): ", JSON.stringify(errInfo));
}

const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" />
  </svg>
);

const baseShelters = [
  { id: 'kotadamansara', name: 'Dewan MBPJ Kota Damansara', zone: 'SEGi University Kota Damansara', distance: '0.4 KM', time: 'Est. 1 min', address: 'Jalan Teknologi, PJU 5, Kota Damansara, PJ', maxCapacity: 550, x: 44, y: 44, tags: ['medical', 'food', 'pets', 'generator'] },
  { id: 'petalingjaya', name: 'Dewan MBPJ Seksyen 7', zone: 'Petaling Jaya', distance: '12.5 KM', time: 'Est. 16 mins', address: 'Petaling Jaya West', maxCapacity: 600, x: 35, y: 65, tags: ['pets', 'food'] },
  { id: 'subangjaya', name: 'Dewan MPSJ SS15', zone: 'Subang Jaya', distance: '14.5 KM', time: 'Est. 18 mins', address: 'Subang Jaya Sector', maxCapacity: 700, x: 32, y: 72, tags: ['generator', 'food', 'medical'] },
  { id: 'kualalumpur', name: 'Dewan Komuniti KL', zone: 'Kuala Lumpur', distance: '20.2 KM', time: 'Est. 25 mins', address: 'Kuala Lumpur Central', maxCapacity: 1000, x: 55, y: 55, tags: ['medical', 'food'] },
  { id: 'shahalam', name: 'Dewan MBSA Seksyen 4', zone: 'Shah Alam', distance: '20.8 KM', time: 'Est. 24 mins', address: 'Dewan MBSA Seksyen 4, Shah Alam', maxCapacity: 800, x: 30, y: 70, tags: ['generator', 'food'] },
  { id: 'batucaves', name: 'Dewan Beringin', zone: 'Batu Caves', distance: '21.5 KM', time: 'Est. 22 mins', address: 'Batu Caves, Selangor', maxCapacity: 350, x: 50, y: 50, tags: ['medical', 'pets'] },
  { id: 'klang', name: 'MPK Klang', zone: 'Klang', distance: '29.2 KM', time: 'Est. 32 mins', address: 'Klang, Selangor', maxCapacity: 400, x: 15, y: 85, tags: ['medical', 'generator'] },
  { id: 'rawang', name: 'SMK Seri Garing', zone: 'Rawang', distance: '30.5 KM', time: 'Est. 30 mins', address: 'SMK Seri Garing, Rawang', maxCapacity: 500, x: 45, y: 40, tags: ['medical', 'food', 'pets'] },
  { id: 'huluselangor', name: 'SK Bukit Beruntung', zone: 'Hulu Selangor', distance: '43.5 KM', time: 'Est. 38 mins', address: 'Bukit Beruntung', maxCapacity: 600, x: 40, y: 25, tags: ['pets', 'food'] },
  { id: 'johorbahru', name: 'Dewan MBJB Taman Johor', zone: 'Johor Bahru', distance: '340 KM', time: 'Est. 3 hrs 35 mins', address: 'Johor Bahru Straits', maxCapacity: 750, x: 75, y: 90, tags: ['food', 'pets'] },
  { id: 'penang', name: 'Dewan JKKK George Town', zone: 'Penang', distance: '348 KM', time: 'Est. 3 hrs 45 mins', address: 'Penang Island Delta', maxCapacity: 500, x: 25, y: 15, tags: ['medical', 'generator'] }
];

const getShelterPhotos = (id: string) => {
  const photosMap: Record<string, string[]> = {
    rawang: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
    ],
    batucaves: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80"
    ],
    shahalam: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80"
    ]
  };
  return photosMap[id] || [
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80"
  ];
};

const mockCitizens: IncidentCitizen[] = [
  { id: 'UID-001', name: 'Ahmad bin Yusuf', phone: '+60 12-345 6789', zone: 'Rawang', status: 'SAFE', ping: '2 mins ago', healthNeeds: 'None' },
  { id: 'UID-002', name: 'Mei Ling', phone: '+60 17-987 6543', zone: 'Shah Alam', status: 'SOS PENDING', ping: '1 hr ago', healthNeeds: 'Requires wheelchair accessibility' },
  { id: 'UID-003', name: 'Siti Nurhaliza', phone: '+60 11-112 2334', zone: 'Rawang', status: 'SOS PENDING', ping: 'Just now', healthNeeds: 'Elderly assistance, insulin storage' },
  { id: 'UID-004', name: 'John Doe', phone: '+60 19-888 7777', zone: 'Klang', status: 'SAFE', ping: '5 mins ago', healthNeeds: 'None' },
  { id: 'UID-005', name: 'Ali Rahman', phone: '+60 13-444 5555', zone: 'Hulu Selangor', status: 'SAFE', ping: '10 mins ago', healthNeeds: 'None' },
  { id: 'UID-006', name: 'Wong Kah Wei', phone: '+60 16-222 3333', zone: 'Klang', status: 'SOS PENDING', ping: '15 mins ago', healthNeeds: 'Asthma inhaler supply empty' },
  { id: 'UID-007', name: 'Raju Subramaniam', phone: '+60 14-999 8888', zone: 'Batu Caves', status: 'EVACUATED', ping: '2 hrs ago', healthNeeds: 'None' },
  { id: 'UID-008', name: 'Fatimah Awang', phone: '+60 19-383 4901', zone: 'Shah Alam', status: 'SAFE', ping: 'Just now', healthNeeds: 'None' },
  { id: 'UID-009', name: 'Tan Kah Kee', phone: '+60 11-2345 6789', zone: 'Kuala Lumpur', status: 'SAFE', ping: '8 mins ago', healthNeeds: 'None' },
  { id: 'UID-010', name: 'Lim Goh Tong', phone: '+60 17-555 4433', zone: 'Petaling Jaya', status: 'SAFE', ping: '12 mins ago', healthNeeds: 'None' },
  { id: 'UID-011', name: 'Aswad bin Bakri', phone: '+60 19-223 4455', zone: 'Subang Jaya', status: 'SAFE', ping: '14 mins ago', healthNeeds: 'None' },
  { id: 'UID-012', name: 'Lee Chong Wei', phone: '+60 12-888 9999', zone: 'Penang', status: 'SAFE', ping: '20 mins ago', healthNeeds: 'None' },
  { id: 'UID-013', name: 'Siti Saleha', phone: '+60 13-777 6655', zone: 'Johor Bahru', status: 'SAFE', ping: '30 mins ago', healthNeeds: 'None' }
];

const mockAlerts = [
  {
    id: 'alert-1',
    zone: 'Rawang',
    type: 'Evacuation Order',
    message: 'CRITICAL WATER OVERFLOW detected at Sungai Rawang. Residents in Low-Lying areas are instructed to evacuate immediately to SMK Seri Garing shelter.',
    timestamp: { toMillis: () => Date.now() - 300000 },
    status: 'CRITICAL',
    admin_id: 'admin_sys'
  },
  {
    id: 'alert-2',
    zone: 'Klang',
    type: 'Flood Warning',
    message: 'High tide peak expected at 11:30 PM. River levels are elevated. Please secure belongings and move vehicles to elevated ground.',
    timestamp: { toMillis: () => Date.now() - 1800000 },
    status: 'WARNING',
    admin_id: 'admin_sys'
  },
  {
    id: 'alert-3',
    zone: 'Shah Alam',
    type: 'Weather Alert',
    message: 'Continuous heavy rainfall of more than 50mm/hour expected over the next 3 hours. Stay alert for siren warnings.',
    timestamp: { toMillis: () => Date.now() - 7200000 },
    status: 'WARNING',
    admin_id: 'admin_sys'
  }
];

const mockHazards = [
  {
    id: 'hz-1',
    zone: 'Rawang',
    type: 'Flooded Road',
    severity: 'High',
    description: 'Jalan Besar flooded. Water depth exceeds 30cm. Sedans and light vehicles cannot pass.',
    x: 48,
    y: 42,
    reporter_id: 'vol-01'
  },
  {
    id: 'hz-2',
    zone: 'Batu Caves',
    type: 'Landslide',
    severity: 'Medium',
    description: 'Minor landslide near the temple bypass. Lane blocked, traffic diverted.',
    x: 52,
    y: 48,
    reporter_id: 'vol-02'
  },
  {
    id: 'hz-3',
    zone: 'Klang',
    type: 'Fallen Tree',
    severity: 'Low',
    description: 'Fallen branch partially blocking the left lane on Jalan Pantai. Drive with caution.',
    x: 18,
    y: 82,
    reporter_id: 'vol-03'
  }
];

const mockCommunityPosts = [
  {
    id: 'post-1',
    text: 'Just checked Sungai Rawang water level at the main bridge. It is rising fast, currently touching the yellow caution marker. Keep safe everyone!',
    authorId: 'user-ahmad',
    authorName: 'Ahmad bin Yusuf',
    zone: 'Rawang',
    timestamp: { toMillis: () => Date.now() - 600000 },
    image: regeneratedImagePost1
  },
  {
    id: 'post-2',
    text: 'SMK Seri Garing shelter has plenty of clean drinking water and food rations. The medical team is also on standby. Huge thanks to the volunteers!',
    authorId: 'user-fatimah',
    authorName: 'Fatimah Awang',
    zone: 'Rawang',
    timestamp: { toMillis: () => Date.now() - 3600000 },
    image: null
  }
];

const mockSosRequests = [
  {
    id: 'sos-1',
    zone: 'Shah Alam',
    lat: 3.0738,
    lon: 101.5183,
    status: 'PENDING',
    userId: 'UID-002',
    name: 'Mei Ling',
    phone: '+60 17-987 6543',
    message: 'Water rising up to porch level. Need boat evacuation for elderly mother.',
    timestamp: { toMillis: () => Date.now() - 1200000 }
  },
  {
    id: 'sos-2',
    zone: 'Rawang',
    lat: 3.3224,
    lon: 101.5739,
    status: 'ACCEPTED',
    userId: 'UID-003',
    name: 'Siti Nurhaliza',
    phone: '+60 11-112 2334',
    message: 'Asthma patient needing medical assistance and evacuation.',
    volunteerId: 'vol-01',
    volunteerName: 'Volunteer Responder',
    timestamp: { toMillis: () => Date.now() - 3600000 }
  }
];

const i18n = {
  en: {
    appTitle: "Project FloodCast", subtitle: "Advanced Risk Mitigation Pipeline",
    home: "Home", map: "Map", community: "Community", alerts: "Alerts", settings: "Settings",
    safe: "SECURE", warning: "WARNING", critical: "CRITICAL",
    safeDesc: "Normal conditions. No flood risk detected.",
    warnDesc: "Water levels rising. Prepare for potential alerts.",
    critDesc: "LEVEL 3: IMMINENT EVACUATION. PROCEED TO SHELTER IMMEDIATELY.",
    radarSys: "Evac Radar System", navTo: "Nav to", sos: "S.O.S EMERGENCY", sosSent: "SIGNAL BROADCASTED", sosDispatched: "RESCUE IS ON THE WAY!",
    demoMode: "Student Project Controls (SEGi FYP)", simStorm: "Simulate Storm", simRecovery: "Simulate Recovery Phase", fetchLoc: "Location",
    prefs: "Preferences", darkMode: "Dark Mode", pushAlerts: "Push Alerts", lang: "Language", logout: "Log Out",
    themeLabel: "Appearance", themeLight: "Light", themeDark: "Dark", themeAuto: "Auto",
    latency: "Latency", rawDepth: "Raw Depth", hardwareStatus: "Hardware Telemetry",
    evacNow: "EVACUATE NOW.", criticalMsg: "Critical overflow in", proceedShelter: "Proceed immediately to designated shelters.",
    volunteerMode: "Volunteer Responder Mode", activeMissions: "Active Rescue Missions", acceptTask: "Accept & Navigate",
    shelterFull: "SHELTER FULL", rerouting: "Rerouting to nearest available shelter...",
    checklistTitle: "Go-Bag", checkDoc: "ID & Docs", checkMed: "Meds & Care", checkPower: "Powerbank", checkFlash: "Flashlight", checkWater: "Water & Food", packed: "Packed",
    rainLabel: "Rainfall", riverLabel: "River Level", evacNotReq: "Evac Not Required", viewRoutes: "View Safe Routes",
    postCommunity: "Share an update with your zone...", postBtn: "Post"
  },
  ms: {
    appTitle: "Sistem FloodCast", subtitle: "Sistem Amaran Kedalaman Banjir",
    home: "Utama", map: "Peta", community: "Komuniti", alerts: "Amaran", settings: "Tetapan",
    safe: "SELAMAT", warning: "WASPADA", critical: "BAHAYA",
    safeDesc: "Keadaan normal. Tiada risiko banjir dikesan.",
    warnDesc: "Paras air meningkat. Bersedia untuk amaran.",
    critDesc: "TAHAP 3: PEMINDAHAN SEGERA. PERGI KE PUSAT PEMINDAHAN.",
    radarSys: "Sistem Radar Pemindahan", navTo: "Navigasi", sos: "KECEMASAN S.O.S", sosSent: "ISYARAT DIHANTAR", sosDispatched: "BANTUAN DALAM PERJALANAN!",
    demoMode: "Slaid Papan Kawalan (SEGi FYP)", simStorm: "Simulasi Ribut", simRecovery: "Simulasi Fasa Pemulihan", fetchLoc: "Lokasi",
    prefs: "Tetapan", darkMode: "Mod Gelap", pushAlerts: "Notifikasi Amaran", lang: "Bahasa", logout: "Log Keluar",
    themeLabel: "Penampilan", themeLight: "Cerah", themeDark: "Gelap", themeAuto: "Auto",
    latency: "Kependaman", rawDepth: "Kedalaman", hardwareStatus: "Telemetri Perkakasan",
    evacNow: "PINDAH SEKARANG.", criticalMsg: "Banjir kritikal dalam", proceedShelter: "Pergi ke pusat pemindahan segera.",
    volunteerMode: "Mod Sukarelawan", activeMissions: "Misi Menyelamat Aktif", acceptTask: "Terima & Arah Bantuan",
    shelterFull: "PUSAT PENUH", rerouting: "Mencari pusat pemindahan alternatif...",
    checklistTitle: "Beg Kecemasan", checkDoc: "Pasport & IC", checkMed: "Ubat & Peti", checkPower: "Powerbank", checkFlash: "Lampu Suluh", checkWater: "Air & Makanan", packed: "Selesai",
    rainLabel: "Hujan", riverLabel: "Paras Air", evacNotReq: "Selamat", viewRoutes: "Lihat Laluan",
    postCommunity: "Kongsi maklumat dengan zon anda...", postBtn: "Hantar"
  },
  cn: {
    appTitle: "Project FloodCast", subtitle: "高频气候监测系统",
    home: "主页", map: "地图", community: "社区", alerts: "警报", settings: "设置",
    safe: "安全", warning: "警告", critical: "危险",
    safeDesc: "状况正常。未检测到洪水风险。",
    warnDesc: "水位上升。请为潜在警报做好准备。",
    critDesc: "3级：即将撤离。请立即前往避难所。",
    radarSys: "撤离雷达系统", navTo: "导航至", sos: "S.O.S 紧急情况", sosSent: "信号已发送", sosDispatched: "救援已在路上！",
    demoMode: "系统覆盖 (FYP 演示)", simStorm: "模拟风暴", simRecovery: "模拟恢复阶段", fetchLoc: "位置",
    prefs: "偏好设置", darkMode: "深色模式", pushAlerts: "推送警报", lang: "语言", logout: "登出",
    themeLabel: "外观", themeLight: "浅色", themeDark: "深色", themeAuto: "自动",
    latency: "延迟", rawDepth: "原始深度", hardwareStatus: "硬件遥测",
    evacNow: "立即撤离。", criticalMsg: "严重溢出剩余", proceedShelter: "请立即前往指定的避难所。",
    volunteerMode: "志愿者响应模式", activeMissions: "活跃的救援任务", acceptTask: "接受并导航",
    shelterFull: "避难所已满", rerouting: "正在重新规划至最近的可用避难所...",
    checklistTitle: "应急包", checkDoc: "证件与文档", checkMed: "急救药品", checkPower: "充电宝", checkFlash: "手电筒", checkWater: "饮水食物", packed: "已打包",
    rainLabel: "降雨量", riverLabel: "水位", evacNotReq: "无需撤离", viewRoutes: "查看安全路线",
    postCommunity: "与您所在区域分享更新...", postBtn: "发布"
  }
};

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function pcmToWav(pcm16Array, sampleRate) {
  const buffer = new ArrayBuffer(44 + pcm16Array.length * 2);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + pcm16Array.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, pcm16Array.length * 2, true);

  for (let i = 0; i < pcm16Array.length; i++) {
    view.setInt16(44 + i * 2, pcm16Array[i], true);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

const LiquidGlassFluidEngine = ({ value, maxValue, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let angle = 0;
    const fillPercentage = Math.min(100, Math.max(10, (value / maxValue) * 100));

    // Dynamic rising bubbles array
    const bubbles = Array.from({ length: 15 }).map(() => ({
      xRatio: Math.random(), // relative width fraction
      y: canvas.height * (0.5 + Math.random() * 0.5),
      radius: 1 + Math.random() * 2.5,
      speed: 0.3 + Math.random() * 0.6,
      sinOffset: Math.random() * 100,
      sinSpeed: 0.01 + Math.random() * 0.02,
      wobble: 1 + Math.random() * 3
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetHeight = canvas.height * (1 - fillPercentage / 100);
      angle += 0.04;

      // Wave 1 - Ambient base layer
      ctx.fillStyle = color === '#32D74B' ? 'rgba(50, 215, 75, 0.12)' : color === '#FF9F0A' ? 'rgba(255, 159, 10, 0.12)' : 'rgba(255, 69, 58, 0.12)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = targetHeight + Math.sin(x * 0.02 + angle) * 6;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Rising micro-bubbles (under the wave surface)
      bubbles.forEach(b => {
        // update bubble vertical position
        b.y -= b.speed;
        const xOffset = Math.sin(angle * 1.5 + b.sinOffset) * b.wobble;
        const bubbleX = b.xRatio * canvas.width + xOffset;

        // Find local water line height at bubbleX
        const waterY = targetHeight + Math.cos(bubbleX * 0.015 + angle + 1.5) * 8;

        // respawn if bubble breaches surface or goes off screen
        if (b.y < waterY || b.y < 0) {
          b.y = canvas.height + Math.random() * 20;
          b.xRatio = Math.random();
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubbleX, b.y, b.radius, 0, Math.PI * 2);
        // Soft white bubble overlay
        ctx.fillStyle = color === '#32D74B' ? 'rgba(50, 215, 75, 0.45)' : color === '#FF9F0A' ? 'rgba(255, 159, 10, 0.45)' : 'rgba(255, 69, 58, 0.45)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Wave 2 - Foreground deeper layer with gloss gradient
      const waveGrad = ctx.createLinearGradient(0, targetHeight, 0, canvas.height);
      if (color === '#32D74B') {
        waveGrad.addColorStop(0, 'rgba(50, 215, 75, 0.28)');
        waveGrad.addColorStop(1, 'rgba(50, 215, 75, 0.04)');
      } else if (color === '#FF9F0A') {
        waveGrad.addColorStop(0, 'rgba(255, 159, 10, 0.28)');
        waveGrad.addColorStop(1, 'rgba(255, 159, 10, 0.04)');
      } else {
        waveGrad.addColorStop(0, 'rgba(255, 69, 58, 0.28)');
        waveGrad.addColorStop(1, 'rgba(255, 69, 58, 0.04)');
      }

      ctx.fillStyle = waveGrad;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = targetHeight + Math.cos(x * 0.015 + angle + 1.5) * 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Mirror gloss highlighting crest of wave
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 3) {
        const y = targetHeight + Math.cos(x * 0.015 + angle + 1.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, maxValue, color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

declare const __initial_auth_token: any;

const manualLocations = [
  { name: 'SEGi University Kota Damansara', lat: 3.1492, lon: 101.5791 },
  { name: 'Rawang', lat: 3.3213, lon: 101.5822 },
  { name: 'Shah Alam', lat: 3.0738, lon: 101.5183 },
  { name: 'Klang', lat: 3.0367, lon: 101.4433 },
  { name: 'Hulu Selangor', lat: 3.4288, lon: 101.6500 },
  { name: 'Batu Caves', lat: 3.2379, lon: 101.6811 },
  { name: 'Kuala Lumpur', lat: 3.1390, lon: 101.6869 },
  { name: 'Petaling Jaya', lat: 3.1073, lon: 101.6067 },
  { name: 'Subang Jaya', lat: 3.0567, lon: 101.5855 },
  { name: 'Penang', lat: 5.4141, lon: 100.3288 },
  { name: 'Johor Bahru', lat: 1.4927, lon: 103.7414 }
];

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
      <span className="text-white font-black">{getInitials(name)}</span>
    </div>
  );
};

const LiveClock = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = time.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();

  return (
    <div className={`flex items-center space-x-3 px-4 py-2 rounded-xl border select-none transition-all ${isDarkMode ? 'bg-black/30 border-white/5 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-800'} shadow-sm`}>
      <div className="relative flex items-center justify-center">
        <Clock className="text-[#0a84ff]" size={14} />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
      </div>
      <div className="flex flex-col text-left leading-none font-mono">
        <span className="text-[7.5px] font-black text-zinc-500 dark:text-zinc-400 tracking-widest leading-none mb-0.5">{dateStr}</span>
        <span className="text-[11px] font-black tracking-wider leading-none">
          {time.toLocaleTimeString([], { hour12: false })} MYT
        </span>
      </div>
    </div>
  );
};

const ALL_COMMUNITIES = [
  {
    id: "river-rescue",
    name: "River Rescue & Safety",
    shortName: "Rescue",
    badge: "Hot",
    desc: "Swift water survival techniques, community boat patrols, and sandbag coordinates.",
    tagline: "Swift water survival skills, emergency kayak drills, and safe evacuation paths.",
    rating: "4.9",
    members: "12K+",
    bgImage: regeneratedImageRescueBg,
    welcome: "Welcome to River Rescue & Safety",
    about: "This is a supportive space where residents and professional emergency responders come together to share live rescue updates, boat route coordinates, and flood safety checklists. Together, we ensure every neighborhood is safe, informed, and swiftly assisted.",
    gridImages: [
      regeneratedImageRescueGrid1,
      regeneratedImageRescueGrid2,
      regeneratedImageRescueGrid3
    ],
    challenges: [
      {
        id: "throw-bag",
        title: "Swift Water Throw-Bag Mastery",
        slots: "3 slots left",
        img: regeneratedImageRescueGrid1,
        desc: "Learn to deploy a rescue throw-bag accurately in moving currents. Record a video of your practice dry-run and earn safety points!",
        reward: "500 Coins"
      }
    ],
    sessions: [
      {
        id: "survival-l1",
        title: "Live Swift Water Survival Level 1",
        badge: "50% Off",
        rating: "4.8",
        img: regeneratedImageRescueGrid2,
        desc: "Join our live video class led by veteran coast guards. Learn self-rescue positions, identifying hydraulic traps, and current speed estimation.",
        enrolledText: "250+ residents enrolled"
      }
    ]
  },
  {
    id: "hydrology",
    name: "Hydrology & Telemetry",
    shortName: "Telemetry",
    badge: "Active",
    desc: "Live stream depths, telemetry science, and local river level charts.",
    tagline: "Tracking live water levels, barometric curves, and localized precipitation datasets.",
    rating: "4.8",
    members: "8.5K+",
    bgImage: regeneratedImageHydroBg,
    welcome: "Welcome to Hydrology & Telemetry",
    about: "A community designed for weather enthusiasts, hydro-tech researchers, and citizens tracking real-time sensor streams. We read data grids, translate precipitation percentiles, and exchange sensor telemetry notes to build early alert indicators.",
    gridImages: [
      regeneratedImageHydroGrid1,
      regeneratedImageHydroGrid2,
      regeneratedImageHydroGrid3
    ],
    challenges: [
      {
        id: "calibration",
        title: "Sensor Calibration Sandbox",
        slots: "5 slots left",
        img: regeneratedImageHydroGrid1,
        desc: "Calibrate your smart DIY home rainfall container and synch API streaming with the Telemetry tab.",
        reward: "250 Coins"
      }
    ],
    sessions: [
      {
        id: "decode-streams",
        title: "Decoding Sensor Streams 101",
        badge: "Free",
        rating: "4.9",
        img: regeneratedImageHydroGrid2,
        desc: "An interactive code-along webinar using Python and IoT sensors to graph rapid run-off patterns.",
        enrolledText: "180+ tech-residents registered"
      }
    ]
  },
  {
    id: "storm-spotters",
    name: "Storm Spotters & Climate",
    shortName: "Storms",
    badge: "Live",
    desc: "Tracking supercells, downpour maps, and local atmospheric indicators.",
    tagline: "Recognizing high-density cloud masses, downpour timelines, and cyclone structures.",
    rating: "4.7",
    members: "9.3K+",
    bgImage: regeneratedImageStormBg,
    welcome: "Welcome to Storm Spotters & Climate",
    about: "For dedicated sky watchers and cloud recorders. We share real-time barometric readings, photograph storm fronts, and post immediate flood-hazard spots during major monsoons or tropical cyclones.",
    gridImages: [
      regeneratedImageStormGrid1,
      regeneratedImageStormGrid2,
      regeneratedImageStormGrid3
    ],
    challenges: [
      {
        id: "cloud-height",
        title: "Cyclone Cloud Height Logging",
        slots: "8 slots left",
        img: regeneratedImageStormGrid1,
        desc: "Log three separate barometer readings and cloud altitude observations during the storm simulator peak.",
        reward: "300 Coins"
      }
    ],
    sessions: [
      {
        id: "meteorology-brief",
        title: "Meteorology Standard Briefing",
        badge: "Free",
        rating: "4.6",
        img: regeneratedImageStormGrid2,
        desc: "Understand barometric pressure drops, thermal gradients, and how to spot safe microclimates in real-time.",
        enrolledText: "120+ weather-residents joined"
      }
    ]
  },
  {
    id: "care-sandbags",
    name: "Sandbag Brigade & Care",
    shortName: "Sandbags",
    badge: "Care",
    desc: "Sandbag filling hubs, relief volunteering, and physical protection resources.",
    tagline: "Coordinating sandbag depots, neighborhood physical defense, and temporary aid.",
    rating: "4.9",
    members: "15K+",
    bgImage: regeneratedImageSandBg,
    welcome: "Welcome to Sandbag Brigade & Care",
    about: "The operational muscle of neighborhood flood relief. We post physical sandbag distribution schedules, track physical barriers along low-elevation riverbanks, and map home evacuation assist channels for vulnerable or elderly residents.",
    gridImages: [
      regeneratedImageSandGrid1,
      regeneratedImageSandGrid2,
      regeneratedImageSandGrid3
    ],
    challenges: [
      {
        id: "sandbag-prep",
        title: "5-Day Sandbag Prep Practice",
        slots: "12 slots left",
        img: regeneratedImageSandGrid1,
        desc: "Pack and secure ten sandbag structures or local sacks around low elevation doorframes. Upload proof to join the safe barrier grid.",
        reward: "600 Coins"
      }
    ],
    sessions: [
      {
        id: "sandbag-pyramid",
        title: "Fast-filling Sandbag Standard",
        badge: "Free",
        rating: "4.9",
        img: regeneratedImageSandGrid2,
        desc: "A localized safety video teaching the 'staggered pyramid stacking rule' to resist high hydrodynamic river speeds.",
        enrolledText: "410+ residents certified"
      }
    ]
  }
];

const SEED_POSTS = [
  {
    id: "seed-1",
    authorName: "Elena Rostova",
    zone: "Sector 4 Hydrology",
    timestamp: {
      toMillis: () => Date.now() - 3600000,
      seconds: Math.floor(Date.now() / 1000) - 3600,
      nanoseconds: 0
    } as any,
    text: "Critical water levels exceeded in Sector 4 residential zones. Aerial imagery confirms extensive flooding across suburban streets with water surrounding residential gables. Our telemetry models are updating flow patterns live.",
    image: regeneratedImageSeed1,
    communityId: "hydrology",
    upvotes: 42,
    isVerified: true
  }
];

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminView, setAdminView] = useState('overview');
  const [commandCenterTab, setCommandCenterTab] = useState<'standard' | 'tactical'>('tactical');
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  const [citizenSearch, setCitizenSearch] = useState('');
  const [citizenStatusFilter, setCitizenStatusFilter] = useState('ALL');
  const [citizens, _setCitizens] = useState(mockCitizens);
  const [selectedCitizenId, setSelectedCitizenId] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  // EOC command center shared real-time states
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [isLeveeDamDeployed, setIsLeveeDamDeployed] = useState(false);
  const [shelterSupplies, setShelterSupplies] = useState<any>({
    rawang: { id: 'rawang', waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 },
    shahalam: { id: 'shahalam', waterBoxes: 60, foodRations: 45, medicalKits: 20, sandbags: 220 },
    klang: { id: 'klang', waterBoxes: 250, foodRations: 240, medicalKits: 110, sandbags: 400 },
    huluselangor: { id: 'huluselangor', waterBoxes: 90, foodRations: 85, medicalKits: 50, sandbags: 80 },
    batucaves: { id: 'batucaves', waterBoxes: 110, foodRations: 95, medicalKits: 60, sandbags: 150 },
    kualalumpur: { id: 'kualalumpur', waterBoxes: 300, foodRations: 280, medicalKits: 150, sandbags: 500 },
    petalingjaya: { id: 'petalingjaya', waterBoxes: 180, foodRations: 160, medicalKits: 90, sandbags: 200 },
    subangjaya: { id: 'subangjaya', waterBoxes: 210, foodRations: 190, medicalKits: 100, sandbags: 240 },
    penang: { id: 'penang', waterBoxes: 160, foodRations: 140, medicalKits: 70, sandbags: 190 },
    johorbahru: { id: 'johorbahru', waterBoxes: 230, foodRations: 210, medicalKits: 105, sandbags: 260 }
  });

  const syncCitizensToFirestore = async (newCitizensList: IncidentCitizen[]) => {
    if (db && user) {
      const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
      if (!isRealFirebaseUser) return;
      try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'citizens_state'), {
          list: newCitizensList
        });

        // Resolve Firestore SOS requests for evacuated/safe citizens
        for (const c of newCitizensList) {
          if (c.status === 'EVACUATED' || c.status === 'SAFE') {
            const activeSos = sosRequests.find(s =>
              s.status !== 'RESOLVED' &&
              (s.userId === c.id || s.phone === c.phone || s.name === c.name)
            );
            if (activeSos) {
              await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', activeSos.id), {
                status: 'RESOLVED',
                resolvedAt: serverTimestamp()
              });
              addLog(`[SYSTEM] Auto-resolved Firestore SOS request ${activeSos.id} for evacuated/safe resident ${c.name}.`);
            }
          }
        }
      } catch (err) {
        console.error("Error syncing citizens to firestore", err);
      }
    }
  };

  const setCitizens = (value: any) => {
    _setCitizens(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      syncCitizensToFirestore(next);
      return next;
    });
  };

  const syncShelterSuppliesToFirestore = async (newSupplies: any) => {
    if (db && user) {
      const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
      if (!isRealFirebaseUser) return;
      try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'shelter_supplies'), newSupplies);
      } catch (err) {
        console.error("Error syncing supplies to firestore", err);
      }
    }
  };

  const setShelterSuppliesWithSync = (value: any) => {
    setShelterSupplies((prev: any) => {
      const next = typeof value === 'function' ? value(prev) : value;
      syncShelterSuppliesToFirestore(next);
      return next;
    });
  };

  const syncEocStateToFirestore = async (siren: boolean, levee: boolean) => {
    if (db && user) {
      const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
      if (!isRealFirebaseUser) return;
      try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'eoc_state'), {
          isSirenActive: siren,
          isLeveeDamDeployed: levee
        });
      } catch (err) {
        console.error("Error syncing EOC state to firestore", err);
      }
    }
  };

  const setIsSirenActiveWithSync = (value: any) => {
    setIsSirenActive(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      syncEocStateToFirestore(next, isLeveeDamDeployed);
      return next;
    });
  };

  const setIsLeveeDamDeployedWithSync = (value: any) => {
    setIsLeveeDamDeployed(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      syncEocStateToFirestore(isSirenActive, next);
      return next;
    });
  };

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('dark');

  // Sync themeMode with isDarkMode dynamically
  useEffect(() => {
    if (themeMode === 'light') {
      setIsDarkMode(false);
    } else if (themeMode === 'dark') {
      setIsDarkMode(true);
    } else if (themeMode === 'auto') {
      const checkAutoTheme = () => {
        const hour = new Date().getHours();
        // 7:00 AM (07:00) to 7:00 PM (19:00) is Light Mode, otherwise Dark Mode
        const shouldBeDark = hour < 7 || hour >= 19;
        setIsDarkMode(shouldBeDark);
      };
      checkAutoTheme();
      // Dynamic updates watch transitions in background
      const timer = setInterval(checkAutoTheme, 15000);
      return () => clearInterval(timer);
    }
  }, [themeMode]);
  const [activeTab, setActiveTab] = useState('home');
  const [visualTab, setVisualTab] = useState('home');
  const currentVisualTabRef = useRef('home');
  const tabSequenceTimeoutRef = useRef<any>(null);
  const activeTabUpdateTimeoutRef = useRef<any>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const isSlidingRef = useRef(false);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    return () => {
      if (tabSequenceTimeoutRef.current) {
        clearInterval(tabSequenceTimeoutRef.current);
      }
      if (activeTabUpdateTimeoutRef.current) {
        clearTimeout(activeTabUpdateTimeoutRef.current);
      }
    };
  }, []);
  const [subTab, setSubTab] = useState<'today' | 'tomorrow' | 'next3'>('today');
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showLangModal, setShowLangModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showJkmModal, setShowJkmModal] = useState(false);
  const [isJkmSyncing, setIsJkmSyncing] = useState(false);
  const [jkmSyncSteps, setJkmSyncSteps] = useState<string[]>([]);
  const [jkmSearchQuery, setJkmSearchQuery] = useState('');
  const [jkmActiveCenterDetail, setJkmActiveCenterDetail] = useState<string | null>(null);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profileName') || 'Lim Jun Jie');
  const [profileEmail, setProfileEmail] = useState(() => localStorage.getItem('profileEmail') || 'SCKD2400208@segi4u.my');
  const [profileCountry, setProfileCountry] = useState(() => localStorage.getItem('profileCountry') || 'Malaysia');
  const [profilePhone, setProfilePhone] = useState(() => localStorage.getItem('profilePhone') || '+60 12-345 6789');
  const [profileAvatar, setProfileAvatar] = useState(() => localStorage.getItem('profileAvatar') || 'initials');

  const [tempProfileName, setTempProfileName] = useState('Lim Jun Jie');
  const [tempProfileEmail, setTempProfileEmail] = useState('SCKD2400208@segi4u.my');
  const [tempProfileCountry, setTempProfileCountry] = useState('Malaysia');
  const [tempProfilePhone, setTempProfilePhone] = useState('+60 12-345 6789');
  const [tempProfileAvatar, setTempProfileAvatar] = useState('initials');

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isVolunteerMode, setIsVolunteerMode] = useState(false);
  const [appPhase, setAppPhase] = useState('monitoring');

  const [currentLocation, _setCurrentLocation] = useState('SEGi University Kota Damansara');
  const [locationMode, setLocationMode] = useState<'auto' | 'manual'>('manual');
  const [currentCoords, _setCurrentCoords] = useState({ lat: 3.1492, lon: 101.5791 });

  // Custom locked setter to ensure the location is always SEGi University
  const setCurrentLocation = (loc: any) => {
    _setCurrentLocation('SEGi University Kota Damansara');
  };

  // Custom locked setter to ensure coordinates are always SEGi University
  const setCurrentCoords = (coords: any) => {
    _setCurrentCoords({ lat: 3.1492, lon: 101.5791 });
  };
  const [mapZoom, setMapZoom] = useState(12);
  const [selectedRouteShelter, setSelectedRouteShelter] = useState<any | null>(null);
  const [selectedShelterDetail, setSelectedShelterDetail] = useState<any | null>(null);
  const [showRouteActive, setShowRouteActive] = useState<boolean>(false);
  const [adminMapZoom, setAdminMapZoom] = useState<number>(13);
  const [adminMapType, setAdminMapType] = useState<string>('terrain');
  const [adminMapSearch, setAdminMapSearch] = useState<string>('');
  const [isMapSweeping, setIsMapSweeping] = useState<boolean>(false);
  const [sweepTelemetry, setSweepTelemetry] = useState<{ signal: string; coords: string; wind: string }>({
    signal: '99.8% Strong',
    coords: '3.3214° N, 101.5768° E',
    wind: '14 km/h West'
  });
  const [bookmarkedShelters, setBookmarkedShelters] = useState<string[]>([]);
  const [isRadarScanning, setIsRadarScanning] = useState(false);
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [mapSearchResults, setMapSearchResults] = useState([]);
  const [isSearchingMap, setIsSearchingMap] = useState(false);
  const [simulateStorm, setSimulateStorm] = useState(false);
  const [showCycloneOverlay, setShowCycloneOverlay] = useState(false);
  const [showAllShelters, setShowAllShelters] = useState(false);
  const [selectedSectorId, setSelectedSectorId] = useState<string>('shahalam');
  const [editingShelter, setEditingShelter] = useState<any>(null);
  const [editShelterName, setEditShelterName] = useState('');
  const [editShelterAddress, setEditShelterAddress] = useState('');
  const [editShelterMaxCapacity, setEditShelterMaxCapacity] = useState(500);
  const [editShelterCapacity, setEditShelterCapacity] = useState(200);
  const [editShelterSupervisor, setEditShelterSupervisor] = useState('');
  const [editShelterIsFull, setEditShelterIsFull] = useState(false);

  const startEditingShelter = (shelter: any) => {
    const statusObj = shelterStatus[shelter.id];
    const occ = getShelterOccupancy(shelter);
    setEditingShelter(shelter);
    setEditShelterName(statusObj?.name || shelter.name);
    setEditShelterAddress(statusObj?.address || shelter.address);
    setEditShelterMaxCapacity(statusObj?.maxCapacity || shelter.maxCapacity);
    setEditShelterCapacity(statusObj?.capacity !== undefined ? statusObj.capacity : occ.cap);
    setEditShelterSupervisor(statusObj?.supervisor || "Ramli A.");
    setEditShelterIsFull(statusObj?.isFull || false);
  };

  const handleGoToShelterPage = (shelter: any) => {
    const sectorMap: Record<string, string> = {
      rawang: 'rawang',
      gombak: 'gombak',
      shahalam: 'shahalam',
      klang: 'klang',
      huluselangor: 'huluselangor',
      ampang: 'shahalam',
      selayang: 'gombak',
      puchong: 'shahalam',
      kajang: 'shahalam',
      sjkt_klang: 'klang',
      sepang: 'shahalam',
      kuala_langat: 'klang'
    };

    const sectorId = sectorMap[shelter.id] || 'shahalam';
    setSelectedSectorId(sectorId);
    setAdminView('shelter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Navigating to the dedicated Logistics page for ${shelter.name}...`, 'success');
  };

  const handleOpenShelterEditModal = (shelterId: string) => {
    const shelter = baseShelters.find(s => s.id === shelterId);
    if (shelter) {
      startEditingShelter(shelter);
    }
  };

  const handleLocateSosOnMap = (sos: any) => {
    setCurrentCoords({ lat: sos.lat, lon: sos.lon });
    setMapZoom(15);
    setShowAllCentersOnMap(false);
    setTimeout(() => {
      document.getElementById('admin-incident-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    showToast(`Centering incident map on beacon #SR-${sos.id.slice(-4).toUpperCase()}`, 'info');
  };

  const playRadarScanSound = () => {
    try {
      const audioCtx = getAudioContextApp();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 1.2);

      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.log('AudioContext blocked or unsupported', e);
    }
  };

  const saveShelterPatch = async () => {
    if (!editingShelter) return;
    const path = `artifacts/${appId}/public/data/shelters/${editingShelter.id}`;
    try {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', editingShelter.id), {
        name: editShelterName,
        address: editShelterAddress,
        maxCapacity: Number(editShelterMaxCapacity),
        capacity: Number(editShelterCapacity),
        supervisor: editShelterSupervisor,
        isFull: editShelterIsFull
      }, { merge: true });
      showToast(`Shelter details updated for ${editShelterName}`, 'success');
      addLog(`[ADMIN] Shelter details patched for ${editingShelter.id}.`);
      setEditingShelter(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const [rainfall, setRainfall] = useState(0);
  const [riverLevel, setRiverLevel] = useState(1.30);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [chartData, setChartData] = useState({ h1: 0, h2: 0, h3: 0, now: 0, f1: 0 });
  const [scrubHour, setScrubHour] = useState(0);

  const [hourlyRainList, setHourlyRainList] = useState([]);
  const [hourlyProbList, setHourlyProbList] = useState([]);

  // Real-time meteorological telemetry trackers
  const [liveTemp, setLiveTemp] = useState<number>(25);
  const [liveHumidity, setLiveHumidity] = useState<number>(80);
  const [liveWindSpeed, setLiveWindSpeed] = useState<number>(10);
  const [liveWeatherCode, setLiveWeatherCode] = useState<number>(3); // WMO Code (3 = Cloudy / Overcast)
  const [hourlyTempList, setHourlyTempList] = useState<number[]>([]);
  const [hourlyWeatherCodeList, setHourlyWeatherCodeList] = useState<number[]>([]);

  const [globalAlerts, setGlobalAlerts] = useState<any[]>(mockAlerts);
  const [globalHazards, setGlobalHazards] = useState<any[]>(mockHazards);
  const [communityPosts, setCommunityPosts] = useState<any[]>(mockCommunityPosts);
  const [deletedPostIds, setDeletedPostIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('deletedPostIds') || '[]');
    } catch {
      return [];
    }
  });

  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('dismissedAlertIds') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dismissedAlertIds', JSON.stringify(dismissedAlertIds));
  }, [dismissedAlertIds]);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const communityImageRef = useRef(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedDetailTab, setSelectedDetailTab] = useState<'about' | 'feed' | 'flood-hq' | 'sessions' | 'challenges'>('about');
  const [myCommunitiesSubTab, setMyCommunitiesSubTab] = useState<'feed' | 'communities'>('feed');
  const [enrolledSessions, setEnrolledSessions] = useState<string[]>([]);
  const [takenChallenges, setTakenChallenges] = useState<string[]>([]);
  const [communityDetailsAccordionOpen, setCommunityDetailsAccordionOpen] = useState(true);
  const [composerCommunityId, setComposerCommunityId] = useState('river-rescue');

  // Interactive Flood Mutual Aid Ledger State
  const [mutualAidLedger, setMutualAidLedger] = useState<any[]>([
    {
      id: "aid-1",
      communityId: "river-rescue",
      type: "request",
      item: "4 Child Life Jackets",
      description: "Need life jackets for young children near flooded street Sector 4. Our current ones are only adult-size.",
      location: "Sector 4 Hydrology (Main Street near Bridge)",
      author: "Sarah Tan",
      timestamp: new Date(Date.now() - 7200000),
      status: "open"
    },
    {
      id: "aid-2",
      communityId: "river-rescue",
      type: "offer",
      item: "Emergency Heavy Rope & Throw-Bags",
      description: "Have several commercial-grade floating rescue lines, throwbags, and metal carabiners. Can drop them off to boat patrols.",
      location: "Sector 2 Swift Patrol (Boat ramp)",
      author: "Marcus Thorne",
      timestamp: new Date(Date.now() - 3600000),
      status: "open"
    },
    {
      id: "aid-3",
      communityId: "hydrology",
      type: "offer",
      item: "DIY Sensor Power Bank Supply",
      description: "Offering portable lithium battery units to help keep DIY storm water sensors online while power grids are down.",
      location: "Tech Hub Sector 3",
      author: "Elena Rostova",
      timestamp: new Date(Date.now() - 10800000),
      status: "open"
    },
    {
      id: "aid-4",
      communityId: "care-sandbags",
      type: "request",
      item: "Coarse Dry Sand (Truckload)",
      description: "Desperately need more dry sand at block 8. Sacks are filled but sand heap is running low. Fast-flowing stream threatens lower doors.",
      location: "Sector 1 Sandbag Depot (South Ridge Gate)",
      author: "Aarav Connor",
      timestamp: new Date(Date.now() - 14400000),
      status: "open"
    },
    {
      id: "aid-5",
      communityId: "storm-spotters",
      type: "request",
      item: "Handheld Barometer/Anemometer",
      description: "Any spotter in Sector 9 have a spare weather station reader? The automatic telemetry gauge got lightning struck.",
      location: "North Ridge Crest",
      author: "Aarav Storm Watcher",
      timestamp: new Date(Date.now() - 5400000),
      status: "open"
    }
  ]);

  // Check-in numbers per community: { [communityId: string]: { safe: number, evac: number, sos: number } }
  const [communityCheckinStats, setCommunityCheckinStats] = useState<any>({
    "river-rescue": { safe: 243, evac: 86, sos: 8 },
    "hydrology": { safe: 154, evac: 32, sos: 1 },
    "storm-spotters": { safe: 98, evac: 64, sos: 3 },
    "care-sandbags": { safe: 310, evac: 121, sos: 12 }
  });

  // User's own check-in status per community: { [communityId: string]: 'safe' | 'evac' | 'sos' | null }
  const [userCheckinStates, setUserCheckinStates] = useState<any>({});

  // Local state for the new mutual aid item form
  const [newAidType, setNewAidType] = useState<'request' | 'offer'>('request');
  const [newAidItem, setNewAidItem] = useState('');
  const [newAidDesc, setNewAidDesc] = useState('');
  const [newAidLoc, setNewAidLoc] = useState('');
  const [sosRequests, setSosRequests] = useState<any[]>(mockSosRequests);
  const [myActiveSos, setMyActiveSos] = useState(null);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const [shelterStatus, setShelterStatus] = useState({});
  const [interactiveMapShelterId, setInteractiveMapShelterId] = useState(null);
  const [travelMode, setTravelMode] = useState('drive'); // 'drive' | 'walk'
  const [mapViewType, setMapViewType] = useState('roadmap');
  const [showSheltersOverlay, setShowSheltersOverlay] = useState(true);
  const [showHazardsOverlay, setShowHazardsOverlay] = useState(true);
  const [showAllCentersOnMap, setShowAllCentersOnMap] = useState(false);

  const [broadcastZone, setBroadcastZone] = useState('ALL ZONES');
  const [broadcastType, setBroadcastType] = useState('Evacuation Order');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [residentActionPlan, setResidentActionPlan] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPreparingVoice, setIsPreparingVoice] = useState(false);
  const audioRef = useRef(null);
  const activeAudioSourceRef = useRef<any>(null);
  const activeAudioCtxRef = useRef<any>(null);
  const speechUtteranceRef = useRef<any>(null);

  // New highly interactive feature states
  const [chartDisplayMode, setChartDisplayMode] = useState('river'); // 'river' | 'rainfall'
  const [shelterTagFilter, setShelterTagFilter] = useState('all'); // 'all' | 'medical' | 'generator' | 'food' | 'pets'
  const [simulationPreset, setSimulationPreset] = useState('none'); // 'none' | 'normal' | 'monsoon' | 'critical' | 'extreme' | 'recovery'
  const [upvotedPostIds, setUpvotedPostIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('upvotedPostIds') || '[]');
    } catch {
      return [];
    }
  });

  const [showHazardModal, setShowHazardModal] = useState(false);
  const [showRouteSteps, setShowRouteSteps] = useState(false);
  const [hazardForm, setHazardForm] = useState({ type: 'Flooded Road', severity: 'Medium', description: '' });
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  const [checklist, setChecklist] = useState([
    { id: 1, key: 'checkDoc', checked: false },
    { id: 2, key: 'checkMed', checked: false },
    { id: 3, key: 'checkPower', checked: false },
    { id: 4, key: 'checkFlash', checked: false },
    { id: 5, key: 'checkWater', checked: false }
  ]);
  const checkedCount = checklist.filter(i => i.checked).length;

  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [officialReport, setOfficialReport] = useState(null);
  const [activePushNotification, setActivePushNotification] = useState(null);
  const previousAlertsCount = useRef(0);

  const [systemLogs, setSystemLogs] = useState([]);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [islandMessage, setIslandMessage] = useState('');

  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const pushTimerRef = useRef(null);
  const logsContainerRef = useRef(null);

  const t = i18n[language];

  const addLog = (msg) => setSystemLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-50));

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  };

  const showPushNotification = (alert) => {
    if (!notificationsEnabled) return;
    setActivePushNotification(alert);
    if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
    pushTimerRef.current = setTimeout(() => setActivePushNotification(null), 5000);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };

  useEffect(() => {
    if (logsContainerRef.current) logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
  }, [systemLogs]);

  const callSatLinkForecast = async (prompt) => {
    let retries = 4;
    let delay = 1000;

    for (let i = 0; i < retries; i++) {
      try {
        const serverRes = await fetch("/api/satlink/forecast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        });

        if (serverRes.ok) {
          const serverData = await serverRes.json();
          if (serverData.text) return serverData.text;
        } else {
          const errorText = await serverRes.text();
          console.warn(`Server API attempt ${i + 1} failed: ${serverRes.status} - ${errorText}`);
        }
      } catch (serverErr) {
        console.warn(`Server API attempt ${i + 1} experienced connectivity error:`, serverErr);
      }

      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }

    return "Failed to generate safety advice due to temporary connectivity issues. Please proceed to designated high ground or consult live radio broadcasts.";
  };

  const handleListenToSatLinkVoice = async () => {
    if (!residentActionPlan) return;

    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (activeAudioSourceRef.current) {
        try {
          activeAudioSourceRef.current.stop();
        } catch (e) { }
        activeAudioSourceRef.current = null;
      }
      if (activeAudioCtxRef.current) {
        try {
          activeAudioCtxRef.current.close();
        } catch (e) { }
        activeAudioCtxRef.current = null;
      }
      setIsPlayingAudio(false);
      setIsPreparingVoice(false);
      return;
    }

    setIsPreparingVoice(true);
    const cleanAdviceText = residentActionPlan.replace(/•/g, "").replace(/\n/g, ". ");

    try {
      addLog(`[SYSTEM] Requesting Live Sat-Link Native Audio generation...`);
      const res = await fetch("/api/satlink/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanAdviceText })
      });
      if (!res.ok) throw new Error(`TTS server responded with status ${res.status}`);
      const data = await res.json();
      if (!data.audioData) throw new Error("No audio data returned from server");

      // Convert base64 PCM to audio buffer
      const binaryString = window.atob(data.audioData);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const numSamples = len / 2;
      const floatData = new Float32Array(numSamples);
      const dataView = new DataView(bytes.buffer);

      for (let i = 0; i < numSamples; i++) {
        const sample = dataView.getInt16(i * 2, true);
        floatData[i] = sample / 32768;
      }

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      activeAudioCtxRef.current = audioCtx;

      const buffer = audioCtx.createBuffer(1, numSamples, 24000);
      buffer.copyToChannel(floatData, 0);

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      activeAudioSourceRef.current = source;

      source.onended = () => {
        setIsPlayingAudio(false);
        setIsPreparingVoice(false);
        addLog(`[SYSTEM] Sat-Link audio broadcast completed.`);
      };

      source.start(0);
      setIsPlayingAudio(true);
      setIsPreparingVoice(false);
      showToast("Broadcasting Live Sat-Link safety voice...", "success");
      addLog(`[SYSTEM] Sat-Link vocalization broadcasting dynamically...`);
    } catch (err) {
      console.warn("Sat-Link TTS play failed, falling back to local synthesis:", err);
      showToast("Live Sat-Link cloud engine busy. Activating local synthesis backup...", "info");

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel(); // Cancel any current broadcasting

          const utterance = new SpeechSynthesisUtterance(cleanAdviceText);
          speechUtteranceRef.current = utterance;
          utterance.lang = language === 'ms' ? 'ms-MY' : language === 'cn' ? 'zh-CN' : 'en-US';

          const voices = window.speechSynthesis.getVoices();
          const targetLang = utterance.lang.toLowerCase();
          const matchingVoices = voices.filter(v =>
            v.lang.toLowerCase().includes(targetLang) ||
            v.lang.toLowerCase().startsWith(targetLang.split('-')[0])
          );

          // Specifically prioritize high-quality natural female voices
          const femaleVoice = matchingVoices.find(v => {
            const name = v.name.toLowerCase();
            return name.includes('samantha') ||
              name.includes('zira') ||
              name.includes('karen') ||
              name.includes('victoria') ||
              name.includes('moira') ||
              name.includes('hazel') ||
              name.includes('female') ||
              name.includes('girl') ||
              name.includes('google us english') ||
              name.includes('premium') ||
              name.includes('natural');
          }) || matchingVoices[0];

          if (femaleVoice) {
            utterance.voice = femaleVoice;
          }

          utterance.rate = 1.0;

          utterance.onend = () => {
            setIsPlayingAudio(false);
            setIsPreparingVoice(false);
            addLog(`[SYSTEM] Sat-Link audio broadcast completed (Local Backup).`);
          };

          utterance.onerror = (e) => {
            console.warn("Local SpeechSynthesis experienced a playback warning:", e);
            setIsPlayingAudio(false);
            setIsPreparingVoice(false);
          };

          setIsPlayingAudio(true);
          setIsPreparingVoice(false);
          window.speechSynthesis.speak(utterance);
          addLog(`[SYSTEM] Sat-Link vocalization broadcasting dynamically (Local Backup)...`);
        } catch (localErr) {
          console.warn("Local SpeechSynthesis error:", localErr);
          setIsPlayingAudio(false);
          setIsPreparingVoice(false);
          showToast("Failed to initiate fallback audio broadcast.", "error");
        }
      } else {
        showToast("Speech output is unsupported in this web browser context.", "warning");
        setIsPlayingAudio(false);
        setIsPreparingVoice(false);
      }
    }
  };

  const calculateLinearRegression = (historicalDataArray) => {
    const n = historicalDataArray.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (let i = 0; i < n; i++) {
      sumX += i; sumY += historicalDataArray[i]; sumXY += i * historicalDataArray[i]; sumXX += i * i;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return Math.max(0, +((slope * 4) + intercept).toFixed(2));
  };

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 1800);
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else if (!auth.currentUser) {
          await signInAnonymously(auth);
        }
      } catch (err: any) {
        if (err?.code === 'auth/admin-restricted-operation' || err?.message?.includes('admin-restricted-operation')) {
          console.warn("Anonymous sign-in is disabled/restricted in the Firebase project settings. Proceeding in offline mock-auth fallback mode.");
        } else {
          console.warn("Firebase Auth Notice:", err);
        }
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAuthenticated(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
    let unsubProfile = () => { };
    if (isRealFirebaseUser) {
      const userProfileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
      unsubProfile = onSnapshot(userProfileRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.checklist) setChecklist(data.checklist);
          if (data.language) setLanguage(data.language);
          if (data.profileName) setProfileName(data.profileName);
          if (data.profileEmail) setProfileEmail(data.profileEmail);
          if (data.profileCountry) setProfileCountry(data.profileCountry);
          if (data.profilePhone) setProfilePhone(data.profilePhone);
          if (data.profileAvatar) setProfileAvatar(data.profileAvatar);
          if (data.themeMode !== undefined) {
            setThemeMode(data.themeMode);
          } else if (data.isDarkMode !== undefined) {
            setThemeMode(data.isDarkMode ? 'dark' : 'light');
          }
        }
      }, (err) => handleFirestoreError(err, OperationType.GET, `artifacts/${appId}/users/${user.uid}/profile/data`));
    }

    const alertsRef = collection(db, 'artifacts', appId, 'public', 'data', 'broadcast_alerts');
    const unsubAlerts = onSnapshot(alertsRef, (snapshot) => {
      const fetchedAlerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)).sort((a, b) => {
        const timeA = a.timestamp?.toMillis() || 0;
        const timeB = b.timestamp?.toMillis() || 0;
        return timeB - timeA;
      });
      setGlobalAlerts(fetchedAlerts.length > 0 ? fetchedAlerts : mockAlerts);

      if (fetchedAlerts.length > previousAlertsCount.current && previousAlertsCount.current > 0 && !isAdmin) {
        showPushNotification(fetchedAlerts[0] || mockAlerts[0]);
        setHasUnreadAlerts(true);
      }
      previousAlertsCount.current = fetchedAlerts.length;
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/broadcast_alerts`);
      setGlobalAlerts(mockAlerts);
    });

    const hazardsRef = collection(db, 'artifacts', appId, 'public', 'data', 'hazards');
    const unsubHazards = onSnapshot(hazardsRef, (snapshot) => {
      const fetchedHazards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setGlobalHazards(fetchedHazards.length > 0 ? fetchedHazards : mockHazards);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/hazards`);
      setGlobalHazards(mockHazards);
    });

    const postsRef = collection(db, 'artifacts', appId, 'public', 'data', 'community_posts');
    const unsubPosts = onSnapshot(postsRef, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)).sort((a, b) => {
        const timeA = a.timestamp?.toMillis() || 0;
        const timeB = b.timestamp?.toMillis() || 0;
        return timeB - timeA;
      });
      setCommunityPosts(fetchedPosts.length > 0 ? fetchedPosts : mockCommunityPosts);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/community_posts`);
      setCommunityPosts(mockCommunityPosts);
    });

    const sosRef = collection(db, 'artifacts', appId, 'public', 'data', 'sos_requests');
    const unsubSos = onSnapshot(sosRef, (snapshot) => {
      const fetchedSos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)).sort((a, b) => {
        const timeA = a.timestamp?.toMillis() || 0;
        const timeB = b.timestamp?.toMillis() || 0;
        return timeB - timeA;
      });
      const finalSos = fetchedSos.length > 0 ? fetchedSos : mockSosRequests;
      setSosRequests(finalSos);

      const activeMission = finalSos.find(s =>
        (s.userId === (user?.uid || 'guest_resident') && ['PENDING', 'ACCEPTED', 'EN_ROUTE', 'ARRIVED'].includes(s.status)) ||
        (s.volunteerId === (user?.uid || 'guest_volunteer') && ['ACCEPTED', 'EN_ROUTE', 'ARRIVED'].includes(s.status))
      );
      setMyActiveSos(activeMission || null);

      // 2-way sync: Update local citizens array if there are active SOS requests
      _setCitizens(prev => {
        let changed = false;
        const updated = prev.map(c => {
          const activeSos = finalSos.find(s =>
            s.status !== 'RESOLVED' &&
            (s.userId === c.id || s.phone === c.phone || s.name === c.name || (c.id === 'cit-self' && s.userId === (user?.uid || 'guest_resident')))
          );

          if (activeSos && c.status !== 'SOS PENDING') {
            changed = true;
            return { ...c, status: 'SOS PENDING' as const };
          } else if (!activeSos && c.status === 'SOS PENDING') {
            changed = true;
            return { ...c, status: 'SAFE' as const };
          }
          return c;
        });

        if (changed) {
          const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user?.uid);
          if (isRealFirebaseUser) {
            setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'citizens_state'), {
              list: updated
            });
          }
          return updated;
        }
        return prev;
      });
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/sos_requests`);
      setSosRequests(mockSosRequests);
    });

    const sheltersRef = collection(db, 'artifacts', appId, 'public', 'data', 'shelters');
    const unsubShelters = onSnapshot(sheltersRef, (snapshot) => {
      const statuses = {}; snapshot.docs.forEach(doc => { (statuses as any)[doc.id] = doc.data(); }); setShelterStatus(statuses);

      const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user?.uid);

      // Sync citizens list
      if (statuses['citizens_state']?.list) {
        _setCitizens(statuses['citizens_state'].list);
      } else if (isRealFirebaseUser) {
        setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'citizens_state'), {
          list: mockCitizens
        });
      }

      // Sync shelter supplies
      if (statuses['shelter_supplies']) {
        setShelterSupplies(statuses['shelter_supplies']);
      } else if (isRealFirebaseUser) {
        const defaultSupplies = {
          rawang: { id: 'rawang', waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 },
          shahalam: { id: 'shahalam', waterBoxes: 60, foodRations: 45, medicalKits: 20, sandbags: 220 },
          klang: { id: 'klang', waterBoxes: 250, foodRations: 240, medicalKits: 110, sandbags: 400 },
          huluselangor: { id: 'huluselangor', waterBoxes: 90, foodRations: 85, medicalKits: 50, sandbags: 80 },
          batucaves: { id: 'batucaves', waterBoxes: 110, foodRations: 95, medicalKits: 60, sandbags: 150 },
          kualalumpur: { id: 'kualalumpur', waterBoxes: 300, foodRations: 280, medicalKits: 150, sandbags: 500 },
          petalingjaya: { id: 'petalingjaya', waterBoxes: 180, foodRations: 160, medicalKits: 90, sandbags: 200 },
          subangjaya: { id: 'subangjaya', waterBoxes: 210, foodRations: 190, medicalKits: 100, sandbags: 240 },
          penang: { id: 'penang', waterBoxes: 160, foodRations: 140, medicalKits: 70, sandbags: 190 },
          johorbahru: { id: 'johorbahru', waterBoxes: 230, foodRations: 210, medicalKits: 105, sandbags: 260 }
        };
        setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'shelter_supplies'), defaultSupplies);
      }

      // Sync siren & levee dam EOC state
      if (statuses['eoc_state']) {
        setIsSirenActive(!!statuses['eoc_state'].isSirenActive);
        setIsLeveeDamDeployed(!!statuses['eoc_state'].isLeveeDamDeployed);
      } else if (isRealFirebaseUser) {
        setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'eoc_state'), {
          isSirenActive: false,
          isLeveeDamDeployed: false
        });
      }
    }, (err) => handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/shelters`));

    return () => { unsubProfile(); unsubAlerts(); unsubHazards(); unsubPosts(); unsubSos(); unsubShelters(); };
  }, [user, isAdmin, notificationsEnabled]);

  useEffect(() => {
    const fetchRealWeather = async () => {
      setIsLoadingApi(true);
      addLog(`[API] Fetching meteorological data for ${currentLocation}...`);
      try {
        if (simulationPreset === 'normal') {
          addLog(`[SYSTEM] PRESET MODE: Switched to sunny nominal baseline parameters.`);
          await new Promise(r => setTimeout(r, 400));
          setRainfall(0.1); setRiverLevel(1.25);
          setHourlyRainList(Array.from({ length: 120 }, () => 0.1));
          setHourlyProbList(Array.from({ length: 120 }, () => 10));
          setChartData({ h1: 0.1, h2: 0.2, h3: 0.1, now: 0.1, f1: 0.2 });

          setLiveTemp(28);
          setLiveHumidity(65);
          setLiveWindSpeed(8);
          setLiveWeatherCode(0); // Clear Sky
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 24 + 4 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, () => 0));

        } else if (simulationPreset === 'monsoon') {
          addLog(`[SYSTEM] PRESET MODE: Overriding API with simulated Type 2 Monsoon rainfall.`);
          await new Promise(r => setTimeout(r, 400));
          setRainfall(4.5); setRiverLevel(2.45);
          const mockRain = Array.from({ length: 120 }, (_, index) => {
            if (index < 3) return 1.5 + index * 0.5;
            if (index === 3) return 4.5;
            const futureHour = index - 3;
            if (futureHour <= 6) return 4.5 + futureHour * 0.5;
            return Math.max(0, 7.5 - (futureHour - 6) * 0.2);
          });
          const mockProb = Array.from({ length: 120 }, () => 85);
          setHourlyRainList(mockRain);
          setHourlyProbList(mockProb);
          setChartData({ h1: 1.5, h2: 2.2, h3: 3.5, now: 4.5, f1: 5.0 });

          setLiveTemp(22);
          setLiveHumidity(95);
          setLiveWindSpeed(16);
          setLiveWeatherCode(61); // Rain Showers
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 19 + 3 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, (_, idx) => idx % 8 === 0 ? 95 : 61));

        } else if (simulationPreset === 'critical' || simulateStorm) {
          addLog(`[SYSTEM] PRESET MODE: Overriding API with Level 3 storm telemetry.`);
          await new Promise(r => setTimeout(r, 400));
          setRainfall(45.5); setRiverLevel(2.85);

          const mockRain = Array.from({ length: 120 }, (_, index) => {
            if (index < 3) return 10 + index * 5;
            if (index === 3) return 45.5;
            const futureHour = index - 3;
            if (futureHour <= 6) return 45.5 + futureHour * 3;
            return Math.max(0, 63.5 - (futureHour - 6) * 1.5);
          });
          const mockProb = Array.from({ length: 120 }, (_, index) => {
            if (index < 3) return 80;
            if (index === 3) return 95;
            const futureHour = index - 3;
            if (futureHour <= 12) return Math.min(100, 95 + futureHour);
            return Math.max(20, 100 - (futureHour - 12) * 2);
          });
          setHourlyRainList(mockRain);
          setHourlyProbList(mockProb);
          setChartData({ h1: 12, h2: 18, h3: 28, now: 45.5, f1: 48.5 });
          addLog(`[FORECAST] Linear Regression predicted next hour rainfall: 48.5 mm/hr.`);

          setLiveTemp(18);
          setLiveHumidity(100);
          setLiveWindSpeed(24);
          setLiveWeatherCode(95); // Thunderstorm
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 15 + 3 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, () => 95));

        } else if (simulationPreset === 'extreme') {
          addLog(`[SYSTEM] PRESET MODE: Overriding API with extreme catastrophic peak flood values.`);
          await new Promise(r => setTimeout(r, 400));
          setRainfall(85.0); setRiverLevel(3.95);

          const mockRain = Array.from({ length: 120 }, (_, index) => {
            if (index < 3) return 40 + index * 10;
            if (index === 3) return 85.0;
            const futureHour = index - 3;
            if (futureHour <= 6) return 85.0 + futureHour * 2;
            return Math.max(0, 97.0 - (futureHour - 6) * 2);
          });
          const mockProb = Array.from({ length: 120 }, () => 100);
          setHourlyRainList(mockRain);
          setHourlyProbList(mockProb);
          setChartData({ h1: 40, h2: 60, h3: 75, now: 85.0, f1: 89.0 });
          addLog(`[FORECAST] Linear Regression predicted peak rainfall forecast: 89.0 mm/hr.`);

          setLiveTemp(14);
          setLiveHumidity(100);
          setLiveWindSpeed(32);
          setLiveWeatherCode(99); // Heavy Thunderstorm
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 12 + 2 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, () => 99));

        } else if (simulationPreset === 'recovery' || appPhase === 'recovery') {
          setRainfall(0);
          setRiverLevel(1.15);
          setHourlyRainList(Array.from({ length: 120 }, () => 0));
          setHourlyProbList(Array.from({ length: 120 }, () => 0));
          setChartData({ h1: 0, h2: 0, h3: 0, now: 0, f1: 0 });

          setLiveTemp(24);
          setLiveHumidity(85);
          setLiveWindSpeed(10);
          setLiveWeatherCode(2); // Cloudy
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 22 + 3 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, (_, idx) => idx % 10 === 0 ? 1 : 2));

        } else {
          const { lat, lon } = currentCoords;
          try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,precipitation,precipitation_probability,weather_code&past_hours=3&timezone=Asia%2FSingapore`);
            if (!response.ok) throw new Error("API request failed");
            const data = await response.json();

            const currentRain = data.current?.precipitation || 0;
            setRainfall(currentRain);
            setRiverLevel(+(1.30 + (currentRain * 0.06)).toFixed(2));

            const currentTemp = data.current?.temperature_2m !== undefined ? data.current.temperature_2m : 25;
            const currentHumidity = data.current?.relative_humidity_2m !== undefined ? data.current.relative_humidity_2m : 80;
            const currentWind = data.current?.wind_speed_10m !== undefined ? data.current.wind_speed_10m : 10;
            const currentWeatherCode = data.current?.weather_code !== undefined ? data.current.weather_code : 3;

            setLiveTemp(currentTemp);
            setLiveHumidity(currentHumidity);
            setLiveWindSpeed(currentWind);
            setLiveWeatherCode(currentWeatherCode);

            const hourlyRain = data.hourly?.precipitation || [];
            const hourlyProb = data.hourly?.precipitation_probability || [];
            const tempList = data.hourly?.temperature_2m || [];
            const weatherCodeList = data.hourly?.weather_code || [];

            setHourlyRainList(hourlyRain);
            setHourlyProbList(hourlyProb);
            setHourlyTempList(tempList);
            setHourlyWeatherCodeList(weatherCodeList);

            let past = [0, 0, 0]; let curr = currentRain;
            if (hourlyRain.length >= 4) {
              past = hourlyRain.slice(0, 3); curr = hourlyRain[3];
            }
            const ourAiPrediction = calculateLinearRegression([...past, curr]);
            addLog(`[FORECAST] Processed prediction pipeline. Next hour forecast: ${ourAiPrediction} mm/hr.`);
            setChartData({ h1: past[0], h2: past[1], h3: past[2], now: curr, f1: ourAiPrediction });
          } catch (fetchErr) {
            console.warn("Weather API fetch failed. Using fallback telemetry.", fetchErr);
            addLog(`[WARNING] External API unreachable. Switched to offline telemetry mode.`);
            setRainfall(0); setRiverLevel(1.30);
            setHourlyRainList(Array.from({ length: 120 }, () => 0));
            setHourlyProbList(Array.from({ length: 120 }, () => 0));
            setHourlyTempList(Array.from({ length: 120 }, () => 24));
            setHourlyWeatherCodeList(Array.from({ length: 120 }, () => 3));
            setChartData({ h1: 0, h2: 0, h3: 0, now: 0, f1: 0 });
          }
        }
      } catch (error) {
        console.error("Critical API Fetch Error:", error);
      } finally {
        setIsLoadingApi(false);
      }
    };
    fetchRealWeather();
    const interval = setInterval(fetchRealWeather, 180000);
    return () => clearInterval(interval);
  }, [currentCoords, simulateStorm, appPhase, simulationPreset]);

  useEffect(() => { setScrubHour(0); setResidentActionPlan(''); }, [currentLocation, simulateStorm]);

  useEffect(() => {
    if (!mapSearchQuery || mapSearchQuery.trim().length < 2) {
      setMapSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearchingMap(true);
      try {
        const localMatches = manualLocations.filter(loc =>
          loc.name.toLowerCase().includes(mapSearchQuery.toLowerCase())
        );

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(mapSearchQuery)}&format=json&limit=5&addressdetails=1`
        );
        if (response.ok) {
          const data = await response.json();
          const apiMatches = data.map((item: any) => ({
            name: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            isApi: true
          }));

          const combined = [...localMatches.map(m => ({ ...m, isApi: false }))];
          apiMatches.forEach((apiItem: any) => {
            if (!combined.some(c => c.name.toLowerCase() === apiItem.name.toLowerCase() || (Math.abs(c.lat - apiItem.lat) < 0.01 && Math.abs(c.lon - apiItem.lon) < 0.01))) {
              combined.push(apiItem);
            }
          });

          setMapSearchResults(combined);
        } else {
          setMapSearchResults(localMatches.map(m => ({ ...m, isApi: false })));
        }
      } catch (err) {
        console.warn("Geocoding fetch error:", err);
        const localMatches = manualLocations.filter(loc =>
          loc.name.toLowerCase().includes(mapSearchQuery.toLowerCase())
        );
        setMapSearchResults(localMatches.map(m => ({ ...m, isApi: false })));
      } finally {
        setIsSearchingMap(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [mapSearchQuery]);

  let aiStatus = appPhase === 'recovery' ? 'RECOVERY' : t.safe;
  let timeToCritical = '--'; let statusText = appPhase === 'recovery' ? 'Water receding. Safe to proceed with cleanup.' : t.safeDesc;
  let dynamicAccentColor = appPhase === 'recovery' ? '#0A84FF' : (isDarkMode ? '#32D74B' : '#34C759');

  if (appPhase !== 'recovery') {
    if (rainfall >= 10 || chartData.f1 >= 10) { aiStatus = t.critical; timeToCritical = '18'; statusText = t.critDesc; dynamicAccentColor = isDarkMode ? '#FF453A' : '#FF3B30'; }
    else if (rainfall >= 1.0 || chartData.f1 >= 1.0) { aiStatus = t.warning; timeToCritical = '45'; statusText = t.warnDesc; dynamicAccentColor = isDarkMode ? '#FF9F0A' : '#FF9500'; }
  }

  useEffect(() => {
    if (!isBooting && isAuthenticated && !isAdmin && !isLoadingApi && appPhase !== 'recovery') {
      if (aiStatus === t.critical) { setIslandMessage('LEVEL 3: EVACUATE NOW'); setIslandExpanded(true); setTimeout(() => setIslandExpanded(false), 4000); }
      else if (aiStatus === t.warning) { setIslandMessage('Heavy Rain Detected'); setIslandExpanded(true); setTimeout(() => setIslandExpanded(false), 3000); }
    }
  }, [aiStatus, isAuthenticated, isBooting, isAdmin, isLoadingApi, appPhase, t.critical, t.warning]);

  const getRainAtHour = (h) => {
    const idx = h + 3;
    if (hourlyRainList && hourlyRainList.length > idx && idx >= 0) {
      return hourlyRainList[idx];
    }
    if (h === -3) return chartData.h1; if (h === -2) return chartData.h2; if (h === -1) return chartData.h3; if (h === 0) return chartData.now;
    const slope = chartData.f1 - chartData.now;
    if (slope > 0) {
      const peakH = 6;
      if (h <= peakH) return chartData.now + slope * h;
      else { const peakRain = chartData.now + slope * peakH; return Math.max(0, peakRain - (h - peakH) * (peakRain / 24)); }
    } else { return Math.max(0, chartData.now + slope * h); }
  };

  const getProbAtHour = (h) => {
    const idx = h + 3;
    if (hourlyProbList && hourlyProbList.length > idx && idx >= 0) {
      return hourlyProbList[idx];
    }
    const rain = getRainAtHour(h);
    if (rain > 15) return 95;
    if (rain > 5) return 80;
    if (rain > 0.5) return 40;
    return 0;
  };

  const graphData = useMemo(() => Array.from({ length: 49 }, (_, i) => {
    const h = i;
    const rain = getRainAtHour(h); return { h, rain, depth: +(1.30 + (rain * 0.06)).toFixed(2) };
  }), [chartData, hourlyRainList]);

  const hourlyForecast = useMemo(() => Array.from({ length: 6 }).map((_, i) => {
    const forecastHour = new Date();
    // Guarantee that hours are strictly top-of-hours with exactly 0 minutes, seconds, and milliseconds
    forecastHour.setHours(forecastHour.getHours() + i + 1, 0, 0, 0);
    const hOffset = i + 1;
    const rainAtHour = getRainAtHour(hOffset);
    const probAtHour = getProbAtHour(hOffset);

    let icon = <Cloud size={20} className="text-gray-400 animate-pulse" />;
    // Map colors dynamics to icon classes based on intensity thresholds
    if (rainAtHour >= 10.0) {
      icon = <CloudLightning size={20} className="text-[#FF453A] drop-shadow-sm animate-bounce" />;
    } else if (rainAtHour >= 1.0) {
      icon = <CloudRain size={20} className="text-[#FF9F0A] drop-shadow-sm animate-pulse" />;
    } else if (rainAtHour > 0.1 || probAtHour > 20) {
      icon = <CloudRain size={20} className="text-[#0A84FF] drop-shadow-sm" />;
    } else {
      const hourVal = forecastHour.getHours();
      const isDaytime = hourVal > 6 && hourVal < 19;
      icon = isDaytime ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-200" />;
    }

    return {
      time: forecastHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rain: rainAtHour,
      prob: probAtHour,
      icon: icon
    };
  }), [hourlyRainList, hourlyProbList, chartData, simulateStorm]);

  const FIXED_MIN_DEPTH = 1.0;
  const peakDepth = Math.max(...graphData.map(d => d.depth));
  const dynamicMaxDepth = Math.max(3.2, peakDepth + 0.2);

  const peakRain = Math.max(...graphData.map(d => d.rain));
  const dynamicMaxRain = Math.max(10.0, peakRain + 5.0);

  const getGraphX = (h: number) => 6 + (h / 48) * 88;
  const getGraphY = (val: number) => {
    if (chartDisplayMode === 'rainfall') {
      const clampedRain = Math.max(0.0, Math.min(dynamicMaxRain, val));
      return 100 - (clampedRain / dynamicMaxRain) * 100;
    } else {
      const clampedDepth = Math.max(FIXED_MIN_DEPTH, Math.min(dynamicMaxDepth, val));
      return 100 - ((clampedDepth - FIXED_MIN_DEPTH) / (dynamicMaxDepth - FIXED_MIN_DEPTH)) * 100;
    }
  };

  const pastPoints = graphData.filter(d => d.h <= scrubHour);
  const dPast = pastPoints.length > 0 ? "M " + pastPoints.map(d => `${getGraphX(d.h)},${getGraphY(chartDisplayMode === 'rainfall' ? d.rain : d.depth)}`).join(" L ") : "";

  const futurePoints = graphData.filter(d => d.h >= scrubHour);
  const dFuture = futurePoints.length > 0 ? "M " + futurePoints.map(d => `${getGraphX(d.h)},${getGraphY(chartDisplayMode === 'rainfall' ? d.rain : d.depth)}`).join(" L ") : "";
  const fullCurvePath = graphData.map(d => `${getGraphX(d.h)},${getGraphY(chartDisplayMode === 'rainfall' ? d.rain : d.depth)}`).join(" L ");
  const areaGraph = `M ${getGraphX(0)},100 L ${fullCurvePath} L ${getGraphX(48)},100 Z`;

  const currentPoint = graphData.find(d => d.h === scrubHour) || graphData.find(d => d.h === 0);
  const displayRainfall = +(currentPoint.rain).toFixed(1);
  const displayRiverLevel = currentPoint.depth;

  const getImpactText = (depth) => {
    if (depth <= 2.1) return { color: '#32D74B', icon: <Shield size={16} />, title: 'Safe / Normal', text: language === 'en' ? 'Normal river flow. No immediate threat to property.' : 'Aliran sungai normal. Tiada ancaman serta-merta.' };
    if (depth <= 2.2) return { color: '#32D74B', icon: <Info size={16} />, title: 'Elevated Water', text: language === 'en' ? 'Water levels elevated. Drains may be full, but roads are clear.' : 'Paras air meningkat. Longkang mungkin penuh, jalan raya safe.' };
    if (depth <= 2.8) return { color: '#FF9F0A', icon: <AlertTriangle size={16} />, title: 'Hazard / Watch', text: language === 'en' ? 'Street pooling likely. Roads may be impassable for standard sedans. Drive with extreme caution.' : 'Air bertakung. Jalan mungkin tidak boleh dilalui sedan. Pandu dengan berhati-hati.' };
    if (depth <= 4.0) return { color: '#FF453A', icon: <Waves size={16} />, title: 'Critical Warning', text: language === 'en' ? 'Water approaching ground floor. Move vehicles to higher ground immediately.' : 'Air menghampiri tingkat bawah. Pindahkan kenderaan ke kawasan tinggi segera.' };
    return { color: '#BA1A1A', icon: <AlertOctagon size={16} />, title: 'Severe Emergency', text: language === 'en' ? 'Life-threatening conditions. Severe property submersion. Evacuate immediately.' : 'Ancaman nyawa. Harta benda tenggelam teruk. Pindah segera.' };
  };
  const currentImpact = getImpactText(displayRiverLevel);

  const handleTabChange = (targetTab) => {
    if (tabSequenceTimeoutRef.current) {
      clearInterval(tabSequenceTimeoutRef.current);
      tabSequenceTimeoutRef.current = null;
    }

    if (targetTab === 'alerts') {
      setHasUnreadAlerts(false);
    }

    // Instantly set both visual selector and active view.
    // This allows React 18 to batch both state updates in a single tick.
    // Framer Motion's GPU-accelerated spring animations naturally glide the pill smoothly
    // across all intermediate positions on-screen at a silky-smooth 120fps.
    currentVisualTabRef.current = targetTab;
    setVisualTab(targetTab);
    setActiveTab(targetTab);
  };

  const updateTabFromCoordinates = (clientX: number, forceCommit = false) => {
    if (!tabBarRef.current) return;
    const rect = tabBarRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const fraction = relativeX / rect.width;
    const tabIndex = Math.floor(Math.max(0, Math.min(0.999, fraction)) * 5);
    const tabs = ['home', 'map', 'community', 'alerts', 'settings'];
    const targetTab = tabs[tabIndex];
    if (targetTab) {
      // Avoid redundant calculations and heavy main-thread thrashes if the segment hasn't changed.
      if (targetTab === currentVisualTabRef.current && !forceCommit) {
        return;
      }

      if (tabSequenceTimeoutRef.current) {
        clearInterval(tabSequenceTimeoutRef.current);
        tabSequenceTimeoutRef.current = null;
      }
      if (targetTab === 'alerts') {
        setHasUnreadAlerts(false);
      }

      // Update visual selection instantly so the glass indicator moves at 120fps
      currentVisualTabRef.current = targetTab;
      setVisualTab(targetTab);

      if (forceCommit) {
        if (activeTabUpdateTimeoutRef.current) {
          clearTimeout(activeTabUpdateTimeoutRef.current);
          activeTabUpdateTimeoutRef.current = null;
        }
        setActiveTab(targetTab);
      } else {
        // Debounce the heavy main-thread page commit so sliding over intermediate tabs is butter-smooth
        if (activeTabUpdateTimeoutRef.current) {
          clearTimeout(activeTabUpdateTimeoutRef.current);
        }
        activeTabUpdateTimeoutRef.current = setTimeout(() => {
          setActiveTab(targetTab);
        }, 80);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isSlidingRef.current = true;
    setIsSliding(true);
    updateTabFromCoordinates(e.touches[0].clientX, true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSlidingRef.current) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    updateTabFromCoordinates(e.touches[0].clientX, false);
  };

  const handleTouchEnd = () => {
    isSlidingRef.current = false;
    setIsSliding(false);
    if (activeTabUpdateTimeoutRef.current) {
      clearTimeout(activeTabUpdateTimeoutRef.current);
      activeTabUpdateTimeoutRef.current = null;
    }
    setActiveTab(currentVisualTabRef.current);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isSlidingRef.current = true;
    setIsSliding(true);
    updateTabFromCoordinates(e.clientX, true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSlidingRef.current) return;
    updateTabFromCoordinates(e.clientX, false);
  };

  const handleMouseUpOrLeave = () => {
    if (isSlidingRef.current) {
      isSlidingRef.current = false;
      setIsSliding(false);
      if (activeTabUpdateTimeoutRef.current) {
        clearTimeout(activeTabUpdateTimeoutRef.current);
        activeTabUpdateTimeoutRef.current = null;
      }
      setActiveTab(currentVisualTabRef.current);
    }
  };

  const fetchLiveLocation = () => {
    if (!navigator.geolocation) { showToast('Geolocation is not supported by your browser', 'error'); return; }
    showToast('Acquiring Live GPS Signal...', 'info');
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude; const lon = position.coords.longitude;
      try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        if (!res.ok) throw new Error("Reverse geocode failed");
        const data = await res.json();
        const city = data.city || data.locality || "Current Zone";
        setCurrentCoords({ lat, lon }); setCurrentLocation(city);
        setLocationMode('auto');
        showToast(`GPS Locked: ${city}`, 'success'); addLog(`[SYSTEM] GPS locked and verified: ${city} [${lat.toFixed(4)}, ${lon.toFixed(4)}]`);
      } catch (err) {
        console.warn("Reverse geocode failed, using generic name.", err);
        setCurrentCoords({ lat, lon }); setCurrentLocation("Live Zone");
        setLocationMode('auto');
        showToast(`GPS locked, but city name unavailable`, 'warning');
      }
    }, (error) => { showToast('GPS Access Denied. Please check browser permissions.', 'error'); });
  };

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      fetchLiveLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAdmin]);

  const updateProfilePref = async (key, val) => {
    if (!user) return;
    const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
    if (!isRealFirebaseUser) return;
    const path = `artifacts/${appId}/users/${user.uid}/profile/data`;
    try {
      await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data'), { [key]: val }, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, path);
    }
  };

  const toggleCheck = async (id) => {
    const newList = checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setChecklist(newList);
    updateProfilePref('checklist', newList);
  };

  const toggleSimulateStorm = () => { const newState = !simulateStorm; setSimulateStorm(newState); setSimulationPreset(newState ? 'critical' : 'none'); setAppPhase('monitoring'); showToast(newState ? 'Level 3 Emergency Simulation Activated' : 'Live API Restored', newState ? 'error' : 'success'); };

  const selectSimulationPreset = (presetId) => {
    setSimulationPreset(presetId);
    if (presetId === 'none') {
      setSimulateStorm(false);
      setAppPhase('monitoring');
      showToast('Live API Restored', 'success');
      addLog(`[SYSTEM] Live real-time physical telemetry reconnected.`);
    } else if (presetId === 'normal') {
      setSimulateStorm(false);
      setAppPhase('monitoring');
      showToast('Nominal Weather Scenario Activated', 'success');
      addLog(`[SYSTEM] PRESET LOADED: Standard Nominal Sunshine context.`);
    } else if (presetId === 'monsoon') {
      setSimulateStorm(false);
      setAppPhase('monitoring');
      showToast('Monsoonal Heavy Rain Warning Activated', 'warning');
      addLog(`[SYSTEM] PRESET LOADED: Moderate Level 2 monsoon warning.`);
    } else if (presetId === 'critical') {
      setSimulateStorm(true);
      setAppPhase('monitoring');
      showToast('Level 3 Critical Storm Activated', 'error');
      addLog(`[SYSTEM] PRESET LOADED: Critical Severe Torrent (Level 3 Evac alert).`);
    } else if (presetId === 'extreme') {
      setSimulateStorm(true);
      setAppPhase('monitoring');
      showToast('Catastrophic Extreme Pulse Alert!', 'error');
      addLog(`[SYSTEM] PRESET LOADED: Maximum Overflow Emergency (Level 3 Extreme Evac).`);
    } else if (presetId === 'recovery') {
      setSimulateStorm(false);
      setAppPhase('recovery');
      showToast('Post-Flood Recovery Operations Active', 'info');
      addLog(`[SYSTEM] PRESET LOADED: Typhoon pass-by. Water receded. Recovery mode initialized.`);
    }
  };

  const toggleSimulateRecovery = () => { const newState = appPhase === 'recovery' ? 'monitoring' : 'recovery'; setAppPhase(newState); setSimulateStorm(false); setSimulationPreset(newState === 'recovery' ? 'recovery' : 'none'); showToast(newState === 'recovery' ? 'Recovery Phase Activated' : 'Monitoring Restored', 'info'); };
  const changeThemeMode = (mode: 'light' | 'dark' | 'auto') => {
    setThemeMode(mode);
    updateProfilePref('themeMode', mode);
    updateProfilePref('isDarkMode', mode === 'dark'); // maintain schema back-compat

    let msg = mode === 'light' ? 'Theme Mode: Light' : mode === 'dark' ? 'Theme Mode: Dark' : 'Theme Mode: Auto';
    if (mode === 'auto') {
      const hour = new Date().getHours();
      const current = (hour >= 7 && hour < 19) ? 'Light' : 'Dark';
      msg = `Theme Mode: Auto (${current})`;
    }
    showToast(msg, 'info');
  };

  const toggleDarkMode = () => {
    let nextMode: 'light' | 'dark' | 'auto' = 'light';
    if (themeMode === 'light') nextMode = 'dark';
    else if (themeMode === 'dark') nextMode = 'auto';
    else if (themeMode === 'auto') nextMode = 'light';
    changeThemeMode(nextMode);
  };
  const changeLanguage = (langId) => { setLanguage(langId); setShowLangModal(false); updateProfilePref('language', langId); showToast(langId === 'en' ? 'English Selected' : langId === 'ms' ? 'Bahasa Melayu Dipilih' : '已选择中文', 'info'); };
  const toggleLanguage = () => { setShowLangModal(true); };
  const toggleNotifications = () => { setNotificationsEnabled(!notificationsEnabled); showToast(!notificationsEnabled ? 'Push Alerts Enabled' : 'Push Alerts Muted', 'info'); };
  const toggleVolunteerMode = () => { setIsVolunteerMode(!isVolunteerMode); showToast(!isVolunteerMode ? 'Volunteer Responder Active' : 'Civilian Mode Active', 'info'); };

  const validatePassword = (pw) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(pw);
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (!email.includes('@') || !email.includes('.')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setAuthError('Password must be 8+ chars with a number and special symbol (@$!%*#?&).');
      return;
    }

    setAuthError('');
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      setUser({
        uid: 'local_mock_user',
        displayName: 'Resident',
        email: email,
        isAnonymous: false,
      } as any);
      showToast('Login Successful', 'success');
      addLog(`[AUTH] Resident authenticated securely via email.`);
    }, 1500);
  };

  const verifyAdminAccess = (e) => {
    e.preventDefault();
    if (adminPin === 'FYP2026') {
      setShowAdminPin(false);
      setIsAuthenticating(true);
      setTimeout(() => {
        setIsAuthenticating(false);
        setIsAuthenticated(true);
        setIsAdmin(true);
        setUser({
          uid: 'admin_mock_user',
          displayName: 'Emergency Admin',
          email: 'admin@portal.gov',
          isAnonymous: false,
        } as any);
        showToast('Admin Console Verified', 'success');
        addLog(`[AUTH] RBAC: Administrator level access granted.`);
      }, 1000);
    } else {
      setAuthError('Invalid Admin Override Code.');
    }
  };

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      showToast('Logged in via Google', 'success');
      addLog('[AUTH] User logged in via Google SSO.');
    } catch (error) {
      showToast('Preview Env: Simulating Login...', 'warning');
      setTimeout(() => {
        setIsAuthenticating(false);
        setIsAuthenticated(true);
        setUser({
          uid: 'google_mock_user',
          displayName: 'Google User',
          email: 'user@gmail.com',
          isAnonymous: false
        } as any);
        showToast('Login Successful', 'success');
        addLog('[AUTH] User logged in via Google SSO (Simulated).');
      }, 1500);
    }
  };

  const handleAppleLogin = async () => {
    setIsAuthenticating(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      showToast('Logged in via Apple', 'success');
      addLog('[AUTH] User logged in via Apple SSO.');
    } catch (error) {
      showToast('Preview Env: Simulating Login...', 'warning');
      setTimeout(() => {
        setIsAuthenticating(false);
        setIsAuthenticated(true);
        setUser({
          uid: 'apple_mock_user',
          displayName: 'Apple User',
          email: 'user@apple.com',
          isAnonymous: false
        } as any);
        showToast('Login Successful', 'success');
        addLog('[AUTH] User logged in via Apple SSO (Simulated).');
      }, 1500);
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setShowAdminPin(false);
    setAdminPin('');
    setPassword('');
    setEmail('');
    setAuthError('');
    setActiveTab('home');
    setVisualTab('home');
    currentVisualTabRef.current = 'home';
    setResidentActionPlan('');
    setShowCycloneOverlay(false);
    showToast('Logged out securely', 'info');
    addLog(`[AUTH] Session terminated.`);
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Sign out error:", e);
    }
  };

  const generatePDFAdvisory = (reportText: string) => {
    try {
      addLog(`[SYSTEM] Initiating PDF report compilation...`);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // --- Header banner ---
      doc.setFillColor(10, 132, 255); // Brand blue #0a84ff
      doc.rect(0, 0, 210, 38, 'F');

      // Add a subtle tech line
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 38, 210, 2, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('FLOODCAST CIVIL DEFENSE INTELLIGENCE', 15, 16);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text('OFFICIAL INCIDENT EXECUTIVE SUMMARY & ACTION ADVISORY', 15, 24);
      doc.text('CONSOLIDATED EMERGENCY OPERATIONS CENTER (EOC) LOG', 15, 29);

      // --- Meta Data section ---
      doc.setTextColor(30, 41, 59); // slate-800
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('1. ADMINISTRATIVE METADATA', 15, 52);

      doc.setDrawColor(226, 232, 240); // border slate-200
      doc.line(15, 55, 195, 55);

      doc.setFontSize(8.5);
      // Row 1
      doc.setFont('Helvetica', 'bold');
      doc.text('Report ID:', 15, 63);
      doc.setFont('Helvetica', 'normal');
      doc.text(`FC-EOC-${Math.floor(Date.now() / 100000)}`, 45, 63);

      doc.setFont('Helvetica', 'bold');
      doc.text('Generation Date:', 110, 63);
      doc.setFont('Helvetica', 'normal');
      doc.text(new Date().toLocaleString(), 142, 63);

      // Row 2
      doc.setFont('Helvetica', 'bold');
      doc.text('Focal Sector:', 15, 69);
      doc.setFont('Helvetica', 'normal');
      doc.text(String(currentLocation).toUpperCase(), 45, 69);

      doc.setFont('Helvetica', 'bold');
      doc.text('Security Level:', 110, 69);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(239, 68, 68); // red-500
      doc.text('RESTRICTED // EMERGENCY RESPONSE ONLY', 142, 69);
      doc.setTextColor(30, 41, 59);

      // Row 3
      doc.setFont('Helvetica', 'bold');
      doc.text('System Status:', 15, 75);
      doc.setFont('Helvetica', 'normal');
      doc.text(String(aiStatus).toUpperCase(), 45, 75);

      // --- Telemetry Section ---
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('2. TELEMETRY LOGS & FLUID HYDROMETRICS', 15, 90);
      doc.line(15, 93, 195, 93);

      // Table headers
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(15, 97, 180, 8, 'F');
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('MONITORED METRIC PARAMETER', 18, 102.5);
      doc.text('LIVE TELEMETRY VALUE', 125, 102.5);

      const tableRows = [
        { key: 'Live Hourly Rainfall Intensity', val: `${rainfall} mm/hr` },
        { key: 'Precipitation Prediction (Next 1-Hour Band)', val: `${chartData.f1 || 0} mm/hr` },
        { key: 'Silt Waterways Depth Gauge Reading', val: `${displayRiverLevel} m` },
        { key: 'Active Community SOS Critical Missions', val: `${sosRequests.filter(s => s.status !== 'RESOLVED').length} Active` },
        { key: 'Pneumatic Retaining Sluice Gates', val: isLeveeDamDeployed ? 'DEPLOYED & SECURE' : 'STANDBY' },
        { key: 'EOC Emergency Siren Arrays', val: isSirenActive ? 'BROADCASTING WARNINGS' : 'STANDBY' }
      ];

      let tableY = 111.5;
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      tableRows.forEach((r, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(241, 245, 249); // slate-100
          doc.rect(15, tableY - 5.5, 180, 7, 'F');
        }
        doc.setFont('Helvetica', 'bold');
        doc.text(r.key, 18, tableY - 0.5);
        doc.setFont('Helvetica', 'normal');
        doc.text(r.val, 125, tableY - 0.5);
        tableY += 7;
      });

      // --- AI Intelligence advisory summary ---
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('3. EMERGENCY BRIEFING & STRATEGIC RECOMMENDATIONS', 15, 163);
      doc.line(15, 166, 195, 166);

      // Draw a neat grey border-box for the report content
      doc.setFillColor(248, 250, 252); // slate-50
      doc.setDrawColor(226, 232, 240); // slate-200

      const reportTextLines = doc.splitTextToSize(reportText, 172);
      const textBlockHeight = reportTextLines.length * 5 + 8;
      doc.rect(15, 171, 180, textBlockHeight, 'FD');

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59); // slate-800
      doc.text(reportTextLines, 19, 177);

      // --- Signature & Footer ---
      doc.setTextColor(100, 116, 139); // slate-500
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('SYSTEM DATA SIGNED & AUTHORIZED', 15, 276);
      doc.setFont('Helvetica', 'bold');
      doc.text('EOC AUTOMATED SUITE (FLOODCAST SYSTEM)', 15, 280);

      // Stamp-like decoration
      doc.setDrawColor(10, 132, 255);
      doc.rect(150, 269, 45, 12);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(10, 132, 255);
      doc.text('SECURE TRANSMISSION', 153.5, 274);
      doc.text('STATUS: VERIFIED', 153.5, 278);

      // Page stamp
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text('Page 1 of 1', 100, 280);

      // Trigger standard save/download
      doc.save(`FloodCast_Executive_Briefing_${Date.now()}.pdf`);
      showToast('Official PDF Advisory Downloaded', 'success');
      addLog(`[SYSTEM] Telemetry and briefing successfully compiled to PDF.`);
    } catch (err) {
      console.error(err);
      showToast('Failed to compile PDF', 'error');
    }
  };

  const generateOfficialReport = async () => {
    setIsGeneratingReport(true); showToast('Compiling Executive Report...', 'info'); addLog(`[SYSTEM] Generating official post-incident MIS report...`);
    const activeSosCount = sosRequests.filter(s => s.status !== 'RESOLVED').length;
    const prompt = `You are the Project FloodCast Early Warning System. Generate a brief, formal post-incident Executive Summary report for local government officials. 
    Current Data: Location: ${currentLocation}, Current Rainfall: ${rainfall}mm/hr, Peak Depth: ${displayRiverLevel}m, Status: ${aiStatus}, Active Rescues: ${activeSosCount}. 
    Format with a title, a short executive summary, and 3 bullet points of recommended actions based on the severity. Do not use markdown like asterisks (*). Keep it highly professional and under 150 words. Do NOT mention 'AI', 'Artificial Intelligence', 'Algorithm', or 'Machine Learning' anywhere in the report.`;

    const reportText = await callSatLinkForecast(prompt);
    setOfficialReport(reportText);
    setIsGeneratingReport(false);
    addLog(`[SYSTEM] Executive Report generated successfully.`);
  };

  const handleGenerateActionPlan = async () => {
    // Stop any playing or preparing voice first
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (activeAudioSourceRef.current) {
      try {
        activeAudioSourceRef.current.stop();
      } catch (e) { }
      activeAudioSourceRef.current = null;
    }
    if (activeAudioCtxRef.current) {
      try {
        activeAudioCtxRef.current.close();
      } catch (e) { }
      activeAudioCtxRef.current = null;
    }
    setIsPlayingAudio(false);
    setIsPreparingVoice(false);

    setIsGeneratingPlan(true); showToast('Consulting Sat-Link Safety Advisor...', 'info'); addLog(`[SYSTEM] Generating contextual safety plan based on live telemetry...`);
    const prompt = `You are a flood safety assistant. The user is in ${currentLocation}. Current status is ${aiStatus}. Rainfall is ${rainfall}mm/hr. Provide a highly concise, bulleted 3-step action plan for them right now. Format as plain text with bullets. Keep it under 50 words total. Do not use markdown like asterisks or hash symbols, just use standard bullet characters (•).`;
    const plan = await callSatLinkForecast(prompt); setResidentActionPlan(plan); setIsGeneratingPlan(false); showToast('Action Plan Ready', 'success');
  };

  const handleQuickQuestion = async (question, contextLabel) => {
    // Stop any playing or preparing voice first
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (activeAudioSourceRef.current) {
      try {
        activeAudioSourceRef.current.stop();
      } catch (e) { }
      activeAudioSourceRef.current = null;
    }
    if (activeAudioCtxRef.current) {
      try {
        activeAudioCtxRef.current.close();
      } catch (e) { }
      activeAudioCtxRef.current = null;
    }
    setIsPlayingAudio(false);
    setIsPreparingVoice(false);

    setIsGeneratingPlan(true); showToast(`Analyzing: ${contextLabel}...`, 'info');
    addLog(`[SYSTEM] Contextual query analysis triggered: "${question}"`);
    const prompt = `You are an integrated Flood early-warning assistant. Answer this specific query briefly: "${question}". Current location is ${currentLocation} with depth ${displayRiverLevel}m and status ${aiStatus}. Provide 3 concise bullets. Keep total word count under 50. Use standard bullets (•), no asterisks.`;
    const response = await callSatLinkForecast(prompt);
    setResidentActionPlan(response);
    setIsGeneratingPlan(false);
    showToast('Plan customized', 'success');
  };

  const handleBroadcast = async () => {
    if (!user && !isAdmin) return;
    if (!broadcastMessage) { showToast("Please draft a message first", "error"); return; }
    setIsBroadcasting(true); addLog(`[NETWORK] Pushing Global Cloud Broadcast to ${broadcastZone}`);
    const path = `artifacts/${appId}/public/data/broadcast_alerts`;
    const authorId = user?.uid || 'admin_mock_user';
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'broadcast_alerts'), { zone: broadcastZone, type: broadcastType, message: broadcastMessage, timestamp: serverTimestamp(), status: 'CRITICAL', admin_id: authorId });
      addLog(`[NETWORK] Broadcast synchronized to connected clients via FCM.`); setBroadcastMessage(''); showToast('Emergency Broadcast Sent!', 'success'); setTimeout(() => setIsBroadcasting(false), 1000);
    } catch (error) {
      setIsBroadcasting(false);
      handleFirestoreError(error, OperationType.WRITE, path);
      // Local fallback in case of write failure
      const fallbackAlert = {
        id: `alert-local-${Date.now()}`,
        zone: broadcastZone,
        type: broadcastType,
        message: broadcastMessage,
        timestamp: { toMillis: () => Date.now() },
        status: 'CRITICAL',
        admin_id: authorId
      };
      setGlobalAlerts(prev => [fallbackAlert, ...prev]);
      setBroadcastMessage('');
      showToast('Emergency Broadcast Sent (Offline Fallback Mode)!', 'success');
      addLog(`[OFFLINE FALLBACK] Saved broadcast locally.`);
    }
  };

  const handleToggleUpvote = async (postId) => {
    let newIds;
    const isUpvoted = upvotedPostIds.includes(postId);
    if (isUpvoted) {
      newIds = upvotedPostIds.filter(id => id !== postId);
    } else {
      newIds = [...upvotedPostIds, postId];
    }
    setUpvotedPostIds(newIds);
    localStorage.setItem('upvotedPostIds', JSON.stringify(newIds));
    showToast(isUpvoted ? "Removed upvote" : "Post upvoted!", "success");

    // Persist upvote back to Firestore natively if connection exists!
    if (db && user) {
      try {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'community_posts', postId);
        await updateDoc(docRef, {
          upvotes: increment(isUpvoted ? -1 : 1)
        });
      } catch (err) {
        console.warn("Could not synchronize upvote count to Firestore:", err);
      }
    }
  };

  const handleCommunityImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostCommunity = async (targetId?: string) => {
    if (!newPostText.trim() && !newPostImage) return;
    const authorUid = user?.uid || 'guest_resident';
    const authorNameLabel = profileName || 'Resident';
    const finalCommunityId = targetId || selectedCommunityId || composerCommunityId || 'river-rescue';

    // Create optimistic local post
    const localPost = {
      id: 'local-post-' + Date.now(),
      text: newPostText,
      image: newPostImage || null,
      authorId: authorUid,
      authorName: authorNameLabel,
      timestamp: {
        toMillis: () => Date.now(),
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0
      } as any,
      zone: currentLocation,
      communityId: finalCommunityId
    };

    // Optimistically update list
    setCommunityPosts(prev => [localPost, ...prev] as any);
    setNewPostText('');
    setNewPostImage(null);
    showToast('Posted to Community Channel', 'success');

    if (user && db) {
      const path = `artifacts/${appId}/public/data/community_posts`;
      try {
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'community_posts'), {
          text: localPost.text,
          image: localPost.image,
          authorId: authorUid,
          authorName: authorNameLabel,
          timestamp: serverTimestamp(),
          zone: currentLocation,
          communityId: finalCommunityId
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, path);
      }
    }
  };

  const handleDeletePost = (postId: string) => {
    const post = [...communityPosts, ...SEED_POSTS].find((p: any) => p.id === postId);
    if (!post) return;

    const isAuthor = post.authorId === (user ? user.uid : 'guest_resident');
    if (!isAuthor && !isAdmin) {
      showToast('You can only delete your own posts', 'error');
      return;
    }

    setPostToDelete(postId);
  };

  const confirmDeletePost = async (postId: string) => {
    const newDeletedIds = [...deletedPostIds, postId];
    setDeletedPostIds(newDeletedIds);
    localStorage.setItem('deletedPostIds', JSON.stringify(newDeletedIds));
    setCommunityPosts(prev => prev.filter((p: any) => p.id !== postId));

    if (!postId.startsWith('seed-') && !postId.startsWith('local-post-') && db && user) {
      try {
        const postDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'community_posts', postId);
        await deleteDoc(postDocRef);
        showToast('Post deleted permanently from database', 'success');
      } catch (err) {
        console.warn("Could not delete post directly from Firestore:", err);
      }
    } else {
      showToast('Post removed successfully', 'success');
    }
  };

  const handleCommunityCheckin = (status: 'safe' | 'evac' | 'sos', communityId: string) => {
    const prevStatus = userCheckinStates[communityId];
    if (prevStatus === status) {
      showToast(`You have already checked in as ${status.toUpperCase()} here.`, 'info');
      return;
    }

    // Calculate stats update
    setCommunityCheckinStats((prev: any) => {
      const currentStats = { ...(prev[communityId] || { safe: 100, evac: 50, sos: 0 }) };
      if (prevStatus) {
        currentStats[prevStatus] = Math.max(0, currentStats[prevStatus] - 1);
      }
      currentStats[status] = (currentStats[status] || 0) + 1;
      return {
        ...prev,
        [communityId]: currentStats
      };
    });

    setUserCheckinStates((prev: any) => ({
      ...prev,
      [communityId]: status
    }));

    if (status === 'sos') {
      showToast("EMERGENCY: SOS Trapped status logged. Nearby boat patrols and neighbors alerted!", "error");
    } else if (status === 'evac') {
      showToast("Evacuation logged. Safe shelter transit channels highlighted on your radar.", "warning");
    } else {
      showToast("Status: SAFE logged in community directory. Thank you for updating your neighbors.", "success");
    }
  };

  const handleAddAidLedgerItem = (communityId: string) => {
    if (!newAidItem.trim() || !newAidLoc.trim()) {
      showToast("Please provide supply description and location coordinates.", "error");
      return;
    }

    const newItem = {
      id: `aid-user-${Date.now()}`,
      communityId: communityId,
      type: newAidType,
      item: newAidItem,
      description: newAidDesc || "No additional description provided.",
      location: newAidLoc,
      author: profileName || "Active Resident",
      timestamp: new Date(),
      status: "open"
    };

    setMutualAidLedger(prev => [newItem, ...prev]);
    setNewAidItem('');
    setNewAidDesc('');
    setNewAidLoc('');
    showToast(`Successfully published ${newAidType === 'request' ? 'Request' : 'Offer'} to the Local Flood Ledger!`, 'success');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      showToast("Analyzing hazard telemetry...", "info");
      setIsAnalyzingImage(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];

        let retries = 3;
        let delay = 1000;
        let success = false;

        for (let i = 0; i < retries; i++) {
          try {
            const serverRes = await fetch("/api/satlink/vision", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: base64, mimeType: file.type })
            });

            if (serverRes.ok) {
              const serverData = await serverRes.json();
              if (serverData.text) {
                const parsed = JSON.parse(serverData.text);
                setHazardForm({
                  type: parsed.type || 'Flooded Road',
                  severity: parsed.severity || 'Medium',
                  description: parsed.description || 'Hazard detected automatically.'
                });
                showToast("Hazard Classification Complete", "success");
                success = true;
                break;
              }
            } else {
              const errorText = await serverRes.text();
              console.warn(`Server Vision API attempt ${i + 1} failed: ${serverRes.status} - ${errorText}`);
            }
          } catch (serverErr) {
            console.warn(`Server Vision API attempt ${i + 1} experienced connectivity error:`, serverErr);
          }

          if (i < retries - 1) {
            await new Promise(r => setTimeout(r, delay));
            delay *= 2;
          }
        }

        if (!success) {
          showToast("Automated Vision Analysis Failed. Proceed manually.", "error");
        }
        setIsAnalyzingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReportHazard = async () => {
    showToast('Submitting Hazard Report...', 'info');
    const reporterUid = user?.uid || 'guest_resident';

    // Create optimistic local hazard
    const newHazard = {
      id: 'local-hazard-' + Date.now(),
      zone: currentLocation,
      type: hazardForm.type,
      severity: hazardForm.severity,
      description: hazardForm.description,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      timestamp: {
        toMillis: () => Date.now(),
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0
      } as any,
      reporter_id: reporterUid
    };

    // Optimistically update state so user can immediately exit/see the result on map
    setGlobalHazards(prev => [...prev, newHazard]);
    setShowHazardModal(false);
    setHazardForm({ type: 'Flooded Road', severity: 'Medium', description: '' });
    showToast('Hazard Broadcasted to Community!', 'success');
    addLog(`[USER] Hazard reported at ${currentLocation}`);

    if (user && db) {
      const path = `artifacts/${appId}/public/data/hazards`;
      addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'hazards'), {
        zone: currentLocation,
        type: hazardForm.type,
        severity: hazardForm.severity,
        description: hazardForm.description,
        x: newHazard.x,
        y: newHazard.y,
        timestamp: serverTimestamp(),
        reporter_id: reporterUid
      }).catch(err => {
        handleFirestoreError(err, OperationType.WRITE, path);
      });
    }
  };

  const triggerSos = async () => {
    showToast(t.sosSent, 'error');
    const requesterUid = user?.uid || 'guest_resident';

    // Create optimistic local SOS request
    const newSos = {
      id: 'local-sos-' + Date.now(),
      zone: currentLocation,
      lat: currentCoords.lat,
      lon: currentCoords.lon,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      status: 'PENDING',
      userId: requesterUid,
      timestamp: {
        toMillis: () => Date.now(),
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0
      } as any
    };

    setSosRequests(prev => [newSos, ...prev]);
    setMyActiveSos(newSos);
    addLog(`[NETWORK] S.O.S beacon transmitted. Awaiting response.`);

    if (user && db) {
      const path = `artifacts/${appId}/public/data/sos_requests`;
      addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'sos_requests'), {
        zone: currentLocation,
        lat: currentCoords.lat,
        lon: currentCoords.lon,
        x: newSos.x,
        y: newSos.y,
        status: 'PENDING',
        userId: requesterUid,
        timestamp: serverTimestamp()
      }).catch(err => {
        handleFirestoreError(err, OperationType.WRITE, path);
      });
    }
  };

  const handleCancelMySos = async () => {
    if (!myActiveSos) return;
    const targetId = myActiveSos.id;
    const currentUserUid = user?.uid || 'guest_resident';

    // Deactivate/cancel S.O.S locally and instantly
    setSosRequests(prev => prev.map(s => {
      const isMyReq = (s.userId === currentUserUid || s.userId === 'local_mock_user' || s.userId === 'guest_resident');
      return isMyReq ? { ...s, status: 'RESOLVED' } : s;
    }));
    setMyActiveSos(null);
    showToast('S.O.S Broadcast deactivated.', 'success');
    addLog(`[USER] S.O.S Broadcast deactivated.`);

    if (user && db) {
      // Find all active requests belonging to this user or generic mock accounts
      const userActiveRequests = sosRequests.filter(s =>
        (s.userId === currentUserUid || s.userId === 'local_mock_user' || s.userId === 'guest_resident') &&
        ['PENDING', 'ACCEPTED', 'EN_ROUTE', 'ARRIVED'].includes(s.status)
      );

      for (const req of userActiveRequests) {
        if (!req.id.startsWith('local-')) {
          const path = `artifacts/${appId}/public/data/sos_requests/${req.id}`;
          updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', req.id), {
            status: 'RESOLVED',
            resolvedAt: serverTimestamp()
          }).catch(err => {
            handleFirestoreError(err, OperationType.WRITE, path);
          });
        }
      }
    }
  };

  const handleDispatchRescue = async (sosId) => {
    // Optimistically update locally so the user gets instant visual response
    setSosRequests(prev => prev.map(s => {
      if (s.id === sosId) {
        return {
          ...s,
          status: 'DISPATCHED',
          dispatchedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any
        };
      }
      return s;
    }));

    setMyActiveSos(prev => {
      if (prev && prev.id === sosId) {
        return {
          ...prev,
          status: 'DISPATCHED',
          dispatchedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any
        };
      }
      return prev;
    });

    showToast('Rescue team dispatched!', 'success');
    addLog(`[ADMIN] Rescue asset deployed to S.O.S target.`);

    if (db) {
      const path = `artifacts/${appId}/public/data/sos_requests/${sosId}`;
      try {
        await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', sosId), { status: 'DISPATCHED', dispatchedAt: serverTimestamp() });
      } catch (err) {
        console.warn("Firestore error in handleDispatchRescue, using local optimistic state:", err);
      }
    }
  };

  const handleAcceptRescue = async (sosId) => {
    const volunteerId = user ? user.uid : 'guest_volunteer';

    // Set immediate loading/accepting state
    setAcceptingId(sosId);

    // Optimistically update locally so the user gets instant visual response
    setSosRequests(prev => prev.map(s => {
      if (s.id === sosId) {
        return {
          ...s,
          status: 'ACCEPTED',
          volunteerId: volunteerId,
          acceptedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any
        };
      }
      return s;
    }));

    // Optimistically update myActiveSos
    const acceptedRequest = (sosRequests as any[]).find(s => s.id === sosId);
    if (acceptedRequest) {
      setMyActiveSos({
        ...acceptedRequest,
        status: 'ACCEPTED',
        volunteerId: volunteerId,
        acceptedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any
      });
    }

    showToast('Mission Accepted! Route calculated.', 'success');
    addLog(`[VOLUNTEER] Citizen responder accepted SOS mission.`);

    // If Firestore database is connected, try to update it as well asynchronously to not block UI
    if (db) {
      const path = `artifacts/${appId}/public/data/sos_requests/${sosId}`;
      updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', sosId), {
        status: 'ACCEPTED',
        volunteerId: volunteerId,
        acceptedAt: serverTimestamp()
      }).catch(err => {
        console.warn("Firestore error in handleAcceptRescue, using local optimistic state:", err);
      });
    }

    // Clear accepting state after a small simulated response delay (e.g. 500ms) to let the "Waiting..." text be visible
    setTimeout(() => {
      setAcceptingId(null);
    }, 500);
  };

  const handleUpdateMissionStatus = async (status) => {
    if (!myActiveSos) return;

    // Optimistic state update
    setSosRequests(prev => prev.map(s => {
      if (s.id === (myActiveSos as any).id) {
        return { ...s, status: status, updatedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any };
      }
      return s;
    }));

    setMyActiveSos(prev => prev ? { ...prev, status: status } : null);
    showToast(`Mission Status: ${status.replace('_', ' ')}`, 'success');
    addLog(`[VOLUNTEER] Mission status updated to ${status.replace('_', ' ')}.`);

    if (db) {
      const path = `artifacts/${appId}/public/data/sos_requests/${(myActiveSos as any).id}`;
      updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', (myActiveSos as any).id), {
        status: status,
        updatedAt: serverTimestamp()
      }).catch(err => {
        console.warn("Firestore error in handleUpdateMissionStatus, using local optimistic state:", err);
      });
    }
  };

  const toggleShelterCapacity = async (shelterId, currentIsFull) => {
    const path = `artifacts/${appId}/public/data/shelters/${shelterId}`;
    try {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', shelterId), { isFull: !currentIsFull }, { merge: true });
      showToast(`Shelter marked as ${!currentIsFull ? 'FULL' : 'OPEN'}`, 'success'); addLog(`[ADMIN] Shelter capacity status overridden for ${shelterId}.`);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const getShelterOccupancy = (shelter) => {
    const statusObj = shelterStatus[shelter.id];
    const maxCap = statusObj?.maxCapacity !== undefined ? statusObj.maxCapacity : shelter.maxCapacity;
    const dummyPcts = { kotadamansara: 28, rawang: 88, shahalam: 25, klang: 65, huluselangor: 15, gombak: 95 };
    let pct = dummyPcts[shelter.id] || 40;
    let cap = Math.floor((pct / 100) * maxCap);

    if (statusObj?.isFull) {
      pct = 100; cap = maxCap;
    } else if (statusObj?.capacity !== undefined) {
      cap = statusObj.capacity;
      pct = (cap / maxCap) * 100;
    }

    if (pct >= 100) return { label: 'FULL', color: '#BA1A1A', cap, pct };
    if (pct >= 80) return { label: 'HIGH', color: '#FF453A', cap, pct };
    if (pct >= 50) return { label: 'AVG', color: '#FF9F0A', cap, pct };
    return { label: 'LOW', color: '#32D74B', cap, pct };
  };

  const getActiveShelter = (): any => {
    if (interactiveMapShelterId) {
      const selected = baseShelters.find(s => s.id === interactiveMapShelterId);
      if (selected) {
        const occ = getShelterOccupancy(selected);
        return { ...selected, isFull: occ.pct >= 100, currentCapacity: occ.cap, occupancyLabel: occ.label, occColor: occ.color, isFallback: false, originalName: selected.name };
      }
    }

    const primaryShelter = baseShelters.find(s => s.zone === currentLocation) || baseShelters[0];
    const primaryOcc = getShelterOccupancy(primaryShelter);

    if (primaryOcc.pct < 80) {
      return { ...primaryShelter, isFull: false, currentCapacity: primaryOcc.cap, occupancyLabel: primaryOcc.label, occColor: primaryOcc.color, isFallback: false, originalName: primaryShelter.name };
    }

    const availableShelters = baseShelters
      .map(s => ({ ...s, occ: getShelterOccupancy(s) }))
      .filter(s => s.occ.pct < 80)
      .sort((a, b) => a.occ.pct - b.occ.pct);

    const fallbackShelter: any = availableShelters.length > 0 ? availableShelters[0] : { ...primaryShelter, occ: primaryOcc };

    return {
      ...fallbackShelter,
      isFull: fallbackShelter.occ.pct >= 100,
      currentCapacity: fallbackShelter.occ.cap,
      occupancyLabel: fallbackShelter.occ.label,
      occColor: fallbackShelter.occ.color,
      isFallback: fallbackShelter.id !== primaryShelter.id,
      originalName: primaryShelter.name
    };
  };
  const activeShelter = getActiveShelter();

  const getTravelTime = (shelter: any, mode: string) => {
    if (!shelter) return '';
    if (mode === 'walk') {
      const distNum = parseFloat(shelter.distance);
      const walkMins = Math.round(distNum * 12);
      if (walkMins >= 60) {
        const hrs = Math.floor(walkMins / 60);
        const mins = walkMins % 60;
        return `${hrs} hr${hrs > 1 ? 's' : ''}${mins > 0 ? ` ${mins} m` : ''}`;
      }
      return `${walkMins} mins`;
    }
    return shelter.time.replace('Est. ', '').replace(' drive', '');
  };

  useEffect(() => {
    if (!isAuthenticated || isAdmin) return;
    if (activeShelter.isFallback && previousAlertsCount.current > -1) {
      if (!toast) {
        showPushNotification({ type: 'Routing Update', message: `${activeShelter.originalName} is full. Redirecting to ${activeShelter.name}.` });
        previousAlertsCount.current = -1;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeShelter.isFallback, activeShelter.id]);

  const handleStartNavigation = () => {
    const origin = `${currentLocation}, Malaysia`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(activeShelter.address)}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const systemRed = isDarkMode ? '#FF453A' : '#FF3B30';
  const systemAmber = isDarkMode ? '#FF9F0A' : '#FF9500';
  const systemGreen = isDarkMode ? '#30D158' : '#34C759';

  const visibleAlerts = useMemo(() => {
    return globalAlerts.filter(alert => !dismissedAlertIds.includes(alert.id));
  }, [globalAlerts, dismissedAlertIds]);

  const handleDismissAlert = (id: string) => {
    setDismissedAlertIds(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    showToast('Alert dismissed from view', 'info');
  };

  const activeAlertCount = visibleAlerts.length;
  const activeMissions = sosRequests.filter(s =>
    s.volunteerId === (user?.uid || 'guest_volunteer') &&
    ['ACCEPTED', 'EN_ROUTE', 'ARRIVED'].includes(s.status)
  );

  const soundBeep = () => {
    playRadarScanSound();
  };

  const glassCardClass = isDarkMode
    ? 'bg-gradient-to-br from-white/10 to-white/5 border-t border-l border-white/20 border-r border-b border-white/5 shadow-2xl backdrop-blur-3xl backdrop-saturate-[1.8]'
    : 'bg-gradient-to-br from-white/80 to-white/40 border-t border-l border-white/60 border-r border-b border-black/5 shadow-xl backdrop-blur-3xl';

  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const adminBg = isDarkMode ? 'bg-[#050505]' : 'bg-[#f8f9fa]';
  const adminSidebarBg = isDarkMode ? 'bg-[#0A0A0A]/80' : 'bg-white/80';
  const adminCardBg = isDarkMode ? 'bg-[#111]/80' : 'bg-white/80';
  const adminBorder = isDarkMode ? 'border-white/10' : 'border-black/5';

  const WeatherBackground = ({ isRaining, isDarkMode, aiStatus }) => {
    const canvasRef = useRef(null);
    const [lightningFlash, setLightningFlash] = useState(false);

    // Subtle Sheet Lightning effect loop
    useEffect(() => {
      if (!isRaining) return;

      const triggerLightning = () => {
        setLightningFlash(true);
        setTimeout(() => {
          setLightningFlash(false);
          if (Math.random() > 0.5) {
            setTimeout(() => {
              setLightningFlash(true);
              setTimeout(() => {
                setLightningFlash(false);
              }, 100);
            }, 80);
          }
        }, 120);
      };

      const interval = setInterval(() => {
        if (Math.random() > 0.45) {
          triggerLightning();
        }
      }, 10000);

      return () => clearInterval(interval);
    }, [isRaining]);

    // Canvas Rain rendering loop
    useEffect(() => {
      if (!isRaining) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      // Premium, refined drop structure
      const drops = [];
      const MAX_DROPS = 120; // Crisp and elegant, avoids heavy slop cluttering the text
      let wind = -1.2;
      let targetWind = -1.2;

      for (let i = 0; i < MAX_DROPS; i++) {
        drops.push({
          x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
          y: Math.random() * -canvas.height,
          z: Math.random() * 0.7 + 0.3, // Depth scale factor
          vy: Math.random() * 10 + 20,  // Realistic fast rain terminal velocity
          len: Math.random() * 30 + 15  // Sleek trace streams
        });
      }

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Slowly update wind leaning for atmospheric fluidity
        wind += (targetWind - wind) * 0.01;
        if (Math.random() < 0.015) targetWind = (Math.random() - 0.5) * 3 - 0.5;

        ctx.lineCap = 'round';
        for (let i = 0; i < drops.length; i++) {
          let d = drops[i];

          d.x += wind * d.z;
          d.y += d.vy * d.z;

          // Recycle drop structure at boundary bottom
          if (d.y > canvas.height + 25) {
            d.y = Math.random() * -45 - 10;
            d.x = Math.random() * canvas.width * 1.5 - canvas.width * 0.25;
          }

          const tailX = d.x - wind * (d.len / d.vy);
          const tailY = d.y - d.len;

          // Highly refined cinematic semi-transparent linear gradients
          const grad = ctx.createLinearGradient(tailX, tailY, d.x, d.y);
          grad.addColorStop(0, 'rgba(255,255,255,0)');
          const baseOpacity = isDarkMode ? 0.22 : 0.42;
          grad.addColorStop(1, `rgba(255,255,255, ${d.z * baseOpacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(d.x, d.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = d.z * 1.2 + 0.4; // Exquisite thin streams
          ctx.stroke();
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }, [isRaining, isDarkMode]);

    // Adaptive ambient background colors (with lightning double flashes in real time!)
    const getStormBg = () => {
      if (lightningFlash) {
        return isDarkMode
          ? 'from-[#3a3a46] via-[#1c1c2d] to-[#04040a]'
          : 'from-[#b0c4de] via-[#dcdcdc] to-[#f5f5f7]';
      }
      return isDarkMode
        ? 'from-[#141416] via-[#09090b] to-[#020203]'
        : 'from-[#8ba3b5] via-[#aec6cf] to-[#e6ecf0]';
    };

    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {isRaining ? (
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-700 pointer-events-none ${getStormBg()}`}>
            {/* Elegant Atmospheric Overlay Shrouds */}
            <div className={`absolute inset-0 bg-[#FF453A]/3 blur-[120px] transition-all duration-1000 pointer-events-none ${aiStatus === t.critical ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute inset-0 bg-[#FF9F0A]/2 blur-[100px] transition-all duration-1000 pointer-events-none ${aiStatus === t.warning ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Unified Ambient Rain Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen', opacity: isDarkMode ? 0.85 : 0.65 }} />
          </div>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-1000 ${isDarkMode ? 'from-[#050505] to-[#000]' : 'from-[#38bdf8] to-[#bae6fd]'}`}>
            {isDarkMode ? (
              <div className="absolute top-[15%] right-[15%] w-[80px] h-[80px] bg-indigo-200/10 blur-[20px] rounded-full"></div>
            ) : (
              <>
                <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] bg-yellow-300/30 blur-[80px] rounded-full animate-[pulseGlow_6s_ease-in-out_infinite]/30 pointer-events-none"></div>
                <div className="absolute top-[8%] right-[12%] w-[80px] h-[80px] bg-gradient-to-tr from-white via-yellow-200 to-orange-400 rounded-full shadow-[0_0_50px_rgba(253,224,71,0.6)]">
                  <div className="absolute inset-0 bg-white rounded-full blur-[4px] opacity-40"></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const PushNotificationOverlay = () => {
    if (!activePushNotification) return null;
    return (
      <div className={`absolute top-16 left-4 right-4 z-[999] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#2C2C2E]/95 border-white/10' : 'bg-white/95 border-black/5'} backdrop-blur-2xl animate-[fadeInDown_0.5s_ease-out]`}>
        <div className="p-4 flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF453A] to-[#FF9F0A] flex flex-shrink-0 items-center justify-center shadow-md">
            <Waves size={24} className="text-white" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5 font-sans">
            <div className="flex justify-between items-center mb-0.5">
              {/* Refactored typography to remove tight tracking on micro text size */}
              <span className={`font-bold text-xs ${textPrimary} tracking-wide`}>FloodCast Broadcast</span>
              <span className={`text-xs font-medium ${textSecondary}`}>now</span>
            </div>
            <p className={`font-medium text-sm ${textPrimary} mb-0.5 truncate`}>{activePushNotification.type}</p>
            <p className={`text-sm ${textSecondary} leading-snug line-clamp-2`}>{activePushNotification.message}</p>
          </div>
        </div>
      </div>
    );
  };

  const ToastOverlay = () => {
    if (!toast) return null;
    return (
      <div className={`absolute top-20 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 transition-all animate-[fadeInDown_0.4s_ease-out] backdrop-blur-3xl border
        ${toast.type === 'warning' ? 'bg-[#FF9F0A] text-white border-[#FF9F0A]' :
          toast.type === 'error' ? 'bg-[#FF453A] text-white border-[#FF453A]' :
            toast.type === 'info' ? 'bg-[#0A84FF] text-white border-[#0A84FF]' : 'bg-[#32D74B] text-black border-[#32D74B]'}`}>
        {toast.type === 'success' && <CheckCircle size={20} />}
        {toast.type === 'warning' && <AlertTriangle size={20} />}
        {toast.type === 'error' && <AlertTriangle size={20} />}
        {toast.type === 'info' && <Info size={20} />}
        {/* Refactored typography to remove custom text-[14px] styling */}
        <span className="font-bold text-sm whitespace-nowrap">{toast.message}</span>
      </div>
    );
  };

  const LanguageModalOverlay = () => {
    if (!showLangModal) return null;
    return (
      <div className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4`}>
        <div className={`relative w-full max-w-[320px] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/10'}`}>
          <div className="flex items-center justify-between p-5 border-b border-gray-500/20 relative">
            {/* Refactored hierarchy to standard text-lg instead of text-[18px] */}
            <span className={`font-bold ${textPrimary} text-lg`}>Choose language</span>
            <button onClick={() => setShowLangModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={20} strokeWidth={2} />
            </button>
          </div>
          <div className="p-2 flex flex-col">
            <div className="w-full">
              {[
                { id: 'en', label: 'English' },
                { id: 'ms', label: 'Bahasa Malaysia' },
                { id: 'cn', label: 'Chinese (CN)' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => changeLanguage(lang.id)}
                  className={`w-full p-4 flex items-center space-x-4 transition-all active:bg-black/5 dark:active:bg-white/5 rounded-xl`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${language === lang.id ? 'border-[#0A84FF]' : 'border-gray-400 dark:border-gray-500'}`}>
                    {language === lang.id && <div className="w-2.5 h-2.5 rounded-full bg-[#0A84FF]" />}
                  </div>
                  {/* Refactored typography to use text-base rather than custom bracket sizing */}
                  <span className={`font-medium text-base ${textPrimary}`}>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HazardModalOverlay = () => {
    if (!showHazardModal) return null;
    return (
      <div className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4`} onClick={() => setShowHazardModal(false)}>
        <div className={`relative w-full max-w-[360px] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/10'}`} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5 border-b border-gray-500/20 relative">
            <div className="flex items-center space-x-2">
              <AlertOctagon size={20} className="text-[#FF9F0A]" />
              {/* Standardized to text-lg instead of text-[18px] */}
              <span className={`font-bold ${textPrimary} text-lg`}>Report Hazard</span>
            </div>
            <button onClick={() => setShowHazardModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div className={`p-4 rounded-[32px] border border-dashed ${isDarkMode ? 'bg-black/30 border-gray-600' : 'bg-gray-50 border-gray-300'} flex flex-col items-center justify-center relative`}>
              {isAnalyzingImage ? (
                <div className="flex flex-col items-center py-2">
                  <Loader2 size={24} className="animate-spin text-[#0A84FF] mb-2" />
                  {/* Standardized size to text-xs */}
                  <span className={`text-xs font-bold ${textSecondary}`}>Analyzing telemetry...</span>
                </div>
              ) : (
                <>
                  <Camera size={28} className={`${textSecondary} mb-2`} />
                  {/* Standardized size to text-sm */}
                  <span className={`text-sm font-bold ${textPrimary} mb-1`}>Automated Hazard Detection</span>
                  {/* Standardized size to text-xs */}
                  <span className={`text-xs font-medium text-center ${textSecondary}`}>Upload an image for automatic classification.</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </>
              )}
            </div>

            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest ${textSecondary} mb-2`}>Hazard Type</label>
              {/* Standardized select font size to text-sm */}
              <div className="relative">
                <select
                  value={hazardForm.type}
                  onChange={(e) => setHazardForm({ ...hazardForm, type: e.target.value })}
                  className={`w-full p-3.5 pr-10 rounded-xl border appearance-none outline-none font-medium text-sm transition-all duration-300 ${isDarkMode ? 'bg-[#2C2C2E] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                >
                  <option value="Flooded Road">Flooded Road</option>
                  <option value="Landslide">Landslide / Sinkhole</option>
                  <option value="Fallen Tree">Fallen Tree / Debris</option>
                </select>
                <ChevronDown size={16} className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 ${textPrimary}`} strokeWidth={2.5} />
              </div>
            </div>

            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest ${textSecondary} mb-2`}>Severity</label>
              <div className="flex space-x-2">
                {/* Standardized buttons font size to text-xs tracking-normal instead of text-[13px] */}
                {['Low', 'Medium', 'High'].map(sev => (
                  <button key={sev} onClick={() => setHazardForm({ ...hazardForm, severity: sev })} className={`flex-1 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all border ${hazardForm.severity === sev ? (sev === 'High' ? 'bg-[#FF453A] text-white border-[#FF453A]' : sev === 'Medium' ? 'bg-[#FF9F0A] text-white border-[#FF9F0A]' : 'bg-[#32D74B] text-black border-[#32D74B]') : (isDarkMode ? 'bg-transparent border-white/20 text-gray-400' : 'bg-transparent border-black/10 text-gray-500')}`}>
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest ${textSecondary} mb-2`}>Description (Optional)</label>
              {/* Standardized input size to text-sm */}
              <textarea value={hazardForm.description} onChange={(e) => setHazardForm({ ...hazardForm, description: e.target.value })} placeholder="Additional details..." className={`w-full p-3.5 rounded-xl border resize-none outline-none font-medium text-sm ${isDarkMode ? 'bg-[#2C2C2E] border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-black/10 text-black placeholder-gray-400'}`} rows={2} />
            </div>

            <div className="flex space-x-3 pt-2">
              {/* Standardized font to text-sm uppercase tracking-wider */}
              <button onClick={() => setShowHazardModal(false)} className={`flex-1 py-3.5 rounded-full font-black text-sm uppercase tracking-wider transition-transform active:scale-95 ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'}`}>
                Cancel
              </button>
              <button onClick={handleReportHazard} className="flex-[2] py-3.5 rounded-full bg-[#FF9F0A] hover:bg-[#ffb340] text-white font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-transform flex items-center justify-center space-x-2">
                <AlertOctagon size={18} />
                <span>Broadcast</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const JkmModalOverlay = () => {
    if (!showJkmModal) return null;

    const officialShelterDetails: Record<string, { jkmId: string; officer: string; phone: string; supplies: string[] }> = {
      kotadamansara: {
        jkmId: 'JKM-SLG-KD-101',
        officer: 'Encik Khairul (JKM Petaling Jaya)',
        phone: '+60 3-7954 1122',
        supplies: ['Food packs (100%)', 'Sleeping mats (100%)', 'Medical Kits', 'Generators']
      },
      rawang: {
        jkmId: 'JKM-SLG-RAW-102',
        officer: 'Tuan Mohd Syamil (JKM Gombak)',
        phone: '+60 3-6091 1042',
        supplies: ['Food packs (100%)', 'Sleeping mats (90%)', 'Medical Standby']
      },
      shahalam: {
        jkmId: 'JKM-SLG-SA-204',
        officer: 'Puan Shuhada (JKM Petaling)',
        phone: '+60 3-7842 1205',
        supplies: ['Food packs (100%)', 'Sleeping mats (100%)', 'Infant nutrition']
      },
      klang: {
        jkmId: 'JKM-SLG-KLG-508',
        officer: 'Encik Zulhelmi (JKM Klang)',
        phone: '+60 3-3371 4402',
        supplies: ['Food packs (95%)', 'Sleeping mats (80%)', 'Generator active']
      },
      huluselangor: {
        jkmId: 'JKM-SLG-HS-094',
        officer: 'Tuan Amiruddin (JKM Hulu Selangor)',
        phone: '+60 3-6064 1211',
        supplies: ['Food packs (100%)', 'Sleeping mats (100%)', 'Pet-friendly facilities']
      },
      gombak: {
        jkmId: 'JKM-SLG-GBK-115',
        officer: 'Puan Noorul Huda (JKM Gombak)',
        phone: '+60 3-6189 7701',
        supplies: ['Food packs (90%)', 'Sleeping mats (95%)', 'Hygiene units standby']
      }
    };

    const handleJkmSync = () => {
      setIsJkmSyncing(true);
      setJkmSyncSteps([]);

      const stepsList = [
        "Connecting to InfoBencana JKM Central Registry...",
        "Downloading Selangor regional telemetry payload...",
        "Analyzing active evacuees and shelter capacity...",
        "Registry synchronized successfully."
      ];

      stepsList.forEach((step, idx) => {
        setTimeout(() => {
          setJkmSyncSteps(prev => [...prev, step]);
          if (idx === stepsList.length - 1) {
            setIsJkmSyncing(false);
            showToast("InfoBencana JKM database is fully synced!", "success");
          }
        }, (idx + 1) * 850);
      });
    };

    // Auto-run sync on mount if not yet run
    useEffect(() => {
      if (jkmSyncSteps.length === 0 && !isJkmSyncing) {
        handleJkmSync();
      }
    }, []);

    const filteredShelters = baseShelters.filter(s =>
      s.name.toLowerCase().includes(jkmSearchQuery.toLowerCase()) ||
      s.zone.toLowerCase().includes(jkmSearchQuery.toLowerCase())
    );

    return (
      <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4 font-sans" onClick={() => setShowJkmModal(false)}>
        <div className={`relative w-full max-w-[380px] h-[640px] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`} onClick={e => e.stopPropagation()}>

          <div className="flex items-center justify-between p-5 border-b border-gray-500/20 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-[#0A84FF] text-white shrink-0">
                <Database size={16} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-sm tracking-tight">JKM InfoBencana Portal</h3>
                <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">Safe Connection Established</span>
              </div>
            </div>
            <button onClick={() => setShowJkmModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className={`p-4 mx-4 mt-4 rounded-2xl border flex flex-col justify-between shrink-0 ${isDarkMode ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-black/5'}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-1.5">
                <span className={`w-2 h-2 rounded-full block ${isJkmSyncing ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                <span className={`text-[9px] font-black uppercase tracking-wider ${textSecondary}`}>Registry Status</span>
              </div>
              <button
                onClick={handleJkmSync}
                disabled={isJkmSyncing}
                className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all border 
                  ${isJkmSyncing
                    ? 'opacity-55 cursor-not-allowed bg-transparent border-gray-500/10'
                    : 'bg-[#0A84FF] hover:bg-[#0070df] text-white border-[#0A84FF]'}`}
              >
                {isJkmSyncing ? "Syncing..." : "Force Sync"}
              </button>
            </div>

            <div className="space-y-1 font-mono text-[8.5px] leading-normal max-h-[50px] overflow-y-auto no-scrollbar">
              {jkmSyncSteps.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-1 opacity-80">
                  <span className="text-emerald-500">▶</span>
                  <span>{step}</span>
                </div>
              ))}
              {isJkmSyncing && (
                <div className="flex items-center space-x-1.5 mt-0.5 animate-pulse">
                  <Loader2 size={8} className="animate-spin text-blue-400" />
                  <span className="text-blue-400">Communicating with JKM API...</span>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 pt-4 shrink-0">
            <div className={`w-full flex items-center px-3.5 py-2 rounded-xl border transition-all ${isDarkMode ? 'bg-black/25 border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
              <Database size={14} className={`${textSecondary} opacity-60 mr-2`} />
              <input
                type="text"
                value={jkmSearchQuery}
                onChange={e => setJkmSearchQuery(e.target.value)}
                placeholder="Search Active PPS (e.g. Rawang, Klang)"
                className="w-full bg-transparent border-none text-xs outline-none focus:ring-0 placeholder-gray-500 font-medium"
              />
              {jkmSearchQuery && (
                <button onClick={() => setJkmSearchQuery('')} className="p-0.5 rounded-full hover:bg-gray-500/15">
                  <X size={12} className={textSecondary} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {filteredShelters.length === 0 ? (
              <div className="text-center py-12">
                <Database size={24} className="mx-auto text-zinc-500 opacity-40 mb-2" />
                <p className={`text-xs font-semibold ${textSecondary}`}>No match in direct JKM registry</p>
              </div>
            ) : (
              filteredShelters.map(shelter => {
                const occ = getShelterOccupancy(shelter);
                const gInfo = officialShelterDetails[shelter.id] || { jkmId: 'JKM-PENDING', officer: 'Pending', phone: '-', supplies: [] };
                const isExpanded = jkmActiveCenterDetail === shelter.id;

                return (
                  <div
                    key={shelter.id}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col text-left relative overflow-hidden
                      ${isExpanded
                        ? 'border-[#0A84FF] bg-[#0A84FF]/5'
                        : isDarkMode ? 'bg-white/[0.02] hover:bg-white/[0.04] border-white/5' : 'bg-zinc-50/50 hover:bg-zinc-50 border-zinc-200/50'
                      }`}
                  >
                    <div className="flex justify-between items-start cursor-pointer" onClick={() => setJkmActiveCenterDetail(isExpanded ? null : shelter.id)}>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[7px] font-mono font-black border border-[#0A84FF]/30 text-[#0A84FF] px-1 rounded-sm bg-[#0A84FF]/10 shrink-0">{gInfo.jkmId}</span>
                          <h4 className={`font-black text-xs truncate max-w-[150px] ${textPrimary}`}>{shelter.name}</h4>
                        </div>
                        <p className={`text-[9px] ${textSecondary} font-medium mt-0.5`}>{shelter.zone} • {shelter.distance}</p>
                      </div>

                      <div className="ml-2 flex items-center space-x-1 shrink-0">
                        <span className="text-[8px] font-extrabold font-mono tracking-tighter px-2 py-0.5 rounded-full" style={{ backgroundColor: `${occ.color}15`, color: occ.color }}>
                          {occ.pct.toFixed(0)}% LOAD
                        </span>
                        <span className={`text-[8px] transition-transform duration-200 opacity-60 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-500/10 space-y-2 text-[9px] animate-[fadeIn_0.15s_ease-out]">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary}`}>JKM Officer In Charge</span>
                            <span className={`font-semibold ${textPrimary}`}>{gInfo.officer}</span>
                          </div>
                          <div>
                            <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary}`}>Registry Status</span>
                            <span className="text-emerald-500 font-extrabold font-mono uppercase tracking-widest text-[8px]">GAZETTED ACTIVE</span>
                          </div>
                          <div className="pt-1">
                            <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary}`}>Contact Hotline</span>
                            <a href={`tel:${gInfo.phone}`} className="text-[#0A84FF] font-bold underline font-mono">{gInfo.phone}</a>
                          </div>
                          <div className="pt-1">
                            <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary}`}>Displaced Families</span>
                            <span className={`font-bold font-mono ${textPrimary}`}>{Math.round(occ.cap / 4)} families registered</span>
                          </div>
                        </div>

                        <div>
                          <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary} mb-1`}>Logistics Readiness</span>
                          <div className="flex flex-wrap gap-1">
                            {gInfo.supplies.map((sup, sId) => (
                              <span key={sId} className={`text-[7px] font-mono font-bold px-1.5 py-0.5 rounded-md ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-zinc-100 text-zinc-600'}`}>
                                ✔ {sup}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-1 select-none">
                          <button
                            onClick={() => {
                              setInteractiveMapShelterId(shelter.id);
                              setShowAllCentersOnMap(false);
                              setShowJkmModal(false);
                              showToast(`Active map route locked to JKM center: ${shelter.name}`, 'info');
                            }}
                            className="w-full py-2 rounded-xl bg-[#0A84FF] hover:bg-[#0070df] text-white font-black text-[9px] uppercase tracking-wider shadow-inner text-center transition-transform active:scale-95"
                          >
                            Route and Navigate
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-gray-500/20 text-center text-[7.5px] font-mono text-zinc-400 opacity-60">
            MINISTRY OF WOMEN, FAMILY AND COMMUNITY DEVELOPMENT MALAYSIA
          </div>
        </div>
      </div>
    );
  };

  const LocationModalOverlay = () => {
    if (!showLocationModal) return null;

    return (
      <div className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4`} onClick={() => setShowLocationModal(false)}>
        <div className={`relative w-full max-w-[360px] max-h-[80vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/10'}`} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5 border-b border-gray-500/20 shrink-0 relative">
            {/* Standardized text-[18px] to text-lg */}
            <span className={`font-bold ${textPrimary} text-lg`}>Set Location</span>
            <button onClick={() => setShowLocationModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
            <button onClick={() => { setShowLocationModal(false); fetchLiveLocation(); }} className={`w-full p-4 mb-5 flex items-center space-x-3 rounded-xl transition-transform active:scale-95 bg-[#0A84FF] hover:bg-[#0070df] text-white shadow-md`}>
              <MapPinned size={20} />
              {/* Standardized text-[15px] to text-sm */}
              <span className="font-bold text-sm">Auto (Fetch Live GPS)</span>
            </button>

            <div className="mb-3 px-2">
              <span className={`text-[11px] font-black uppercase tracking-widest ${textSecondary}`}>Manual Selection (Malaysia)</span>
            </div>

            <div className="space-y-2">
              {manualLocations.map(loc => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setCurrentLocation(loc.name);
                    setCurrentCoords({ lat: loc.lat, lon: loc.lon });
                    setLocationMode('manual');
                    setShowLocationModal(false);
                    showToast(`Location manually set to ${loc.name}`, 'success');
                    addLog(`[SYSTEM] Location manually overridden to: ${loc.name}`);
                  }}
                  className={`w-full p-4 flex items-center justify-between transition-all active:scale-95 rounded-xl border ${currentLocation === loc.name ? (isDarkMode ? 'border-[#0A84FF] bg-[#0A84FF]/10' : 'border-[#0A84FF] bg-blue-50') : (isDarkMode ? 'border-white/5 bg-[#2C2C2E] hover:bg-white/5' : 'border-black/5 bg-gray-50 hover:bg-black/5')}`}
                >
                  {/* Standardized text-[15px] to text-sm */}
                  <span className={`font-medium text-sm ${currentLocation === loc.name ? 'text-[#0A84FF] font-bold' : textPrimary}`}>{loc.name}</span>
                  {currentLocation === loc.name && <CheckCircle size={18} className="text-[#0A84FF]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DeleteConfirmationModalOverlay = () => {
    if (!postToDelete) return null;

    return (
      <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.15s_ease-out] p-4 font-sans" onClick={() => setPostToDelete(null)}>
        <div className={`relative w-full max-w-[340px] flex flex-col rounded-[24px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10 text-white' : 'bg-white border-black/10 text-gray-900'}`} onClick={e => e.stopPropagation()}>
          <div className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF453A]/10 text-[#FF453A] flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className={`text-lg font-bold mb-2`}>Delete Post?</h3>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
              Are you sure you want to delete this community post? This action is permanent and cannot be undone.
            </p>
          </div>
          <div className={`flex border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
            <button
              onClick={() => setPostToDelete(null)}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-r ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-gray-400' : 'border-gray-100 hover:bg-gray-50 text-gray-500'}`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const id = postToDelete;
                setPostToDelete(null);
                confirmDeletePost(id);
              }}
              className="flex-1 py-4 text-xs font-black uppercase tracking-wider text-[#FF453A] hover:bg-[#FF453A]/5 transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ShelterEditModalOverlay = () => {
    if (!editingShelter) return null;

    return (
      <div
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4"
        onClick={() => setEditingShelter(null)}
      >
        <div
          className={`relative w-full max-w-[420px] max-h-[90vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E]/95 border-white/10 text-white' : 'bg-white border-black/10 text-zinc-900'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-500/10 shrink-0 relative">
            <div className="flex items-center space-x-2.5">
              <Tent size={20} className="text-[#0A84FF]" />
              <span className={`font-bold text-lg ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>Patch Shelter Details</span>
            </div>
            <button onClick={() => setEditingShelter(null)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Shelter ID</label>
              <input
                type="text"
                value={`SLG-${editingShelter.id.toUpperCase()}`}
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-500/10 bg-zinc-500/5 font-mono text-xs text-zinc-400 select-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Shelter Name</label>
              <input
                type="text"
                value={editShelterName}
                onChange={e => setEditShelterName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                  }`}
                placeholder="e.g. SMK Seri Garing"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Address / Location</label>
              <input
                type="text"
                value={editShelterAddress}
                onChange={e => setEditShelterAddress(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                  }`}
                placeholder="e.g. Rawang, Selangor"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Supervisor Name</label>
              <input
                type="text"
                value={editShelterSupervisor}
                onChange={e => setEditShelterSupervisor(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                  }`}
                placeholder="e.g. Ramli A."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Registered Guests</label>
                <input
                  type="number"
                  value={editShelterCapacity}
                  onChange={e => setEditShelterCapacity(Number(e.target.value))}
                  min={0}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                    }`}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Max Capacity</label>
                <input
                  type="number"
                  value={editShelterMaxCapacity}
                  onChange={e => setEditShelterMaxCapacity(Number(e.target.value))}
                  min={1}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                    }`}
                />
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-zinc-50 border-zinc-200'
              }`}>
              <div>
                <span className="text-xs font-bold block">Capacity Override Status</span>
                <span className="text-[10px] text-zinc-400">Force shelter to display as Full regardless of load</span>
              </div>
              <button
                type="button"
                onClick={() => setEditShelterIsFull(!editShelterIsFull)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none relative ${editShelterIsFull ? 'bg-red-500' : 'bg-zinc-400'
                  }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${editShelterIsFull ? 'translate-x-6' : 'translate-x-0'
                  }`} />
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-gray-500/10 shrink-0 flex items-center justify-end space-x-3 bg-black/[0.02]">
            <button
              onClick={() => setEditingShelter(null)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${isDarkMode
                ? 'border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
            >
              Cancel
            </button>
            <button
              onClick={saveShelterPatch}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center space-x-1.5 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 cursor-pointer"
            >
              <Save size={14} />
              <span>Apply Patch</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const UserProfileModalOverlay = () => {
    if (!showProfileEditModal) return null;

    const PREDEFINED_AVATARS = [
      { id: 'initials', label: 'Initials', emoji: 'AA' },
      { id: 'emoji:AT', label: 'Astro', emoji: '👨‍🚀' },
      { id: 'emoji:RS', label: 'Rescuer', emoji: '👷' },
      { id: 'emoji:MD', label: 'Medic', emoji: '🧑‍⚕️' },
      { id: 'emoji:OB', label: 'Observer', emoji: '👁️' },
      { id: 'emoji:KL', label: 'Koala', emoji: '🐨' },
      { id: 'emoji:CT', label: 'Cat', emoji: '🐱' },
    ];

    const handleCustomPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 1024 * 1024) {
        showToast('Image select limit: 1MB. Please compress or choose a smaller photo!', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setTempProfileAvatar(`custom:${base64String}`);
        showToast('Selected photo applied to preview!', 'success');
      };
      reader.readAsDataURL(file);
    };

    const handleSaveProfile = () => {
      setProfileName(tempProfileName);
      setProfileEmail(tempProfileEmail);
      setProfileCountry(tempProfileCountry);
      setProfilePhone(tempProfilePhone);
      setProfileAvatar(tempProfileAvatar);

      // Save to localStorage
      localStorage.setItem('profileName', tempProfileName);
      localStorage.setItem('profileEmail', tempProfileEmail);
      localStorage.setItem('profileCountry', tempProfileCountry);
      localStorage.setItem('profilePhone', tempProfilePhone);
      localStorage.setItem('profileAvatar', tempProfileAvatar);

      // Sync with Firestore profile database
      updateProfilePref('profileName', tempProfileName);
      updateProfilePref('profileEmail', tempProfileEmail);
      updateProfilePref('profileCountry', tempProfileCountry);
      updateProfilePref('profilePhone', tempProfilePhone);
      updateProfilePref('profileAvatar', tempProfileAvatar);

      setShowProfileEditModal(false);
      showToast('Profile updated successfully!', 'success');
      addLog(`[SYSTEM] Resident profile name updated to: ${tempProfileName}`);
    };

    return (
      <div
        className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4`}
        onClick={() => setShowProfileEditModal(false)}
      >
        <div
          className={`relative w-full max-w-[400px] max-h-[90vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E]/95 border-white/10' : 'bg-white border-black/10'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-500/10 shrink-0 relative">
            <div className="flex items-center space-x-2.5">
              <UserCheck size={20} className="text-[#0A84FF]" />
              {/* Standardized typography size to standard text-lg */}
              <span className={`font-bold ${textPrimary} text-lg`}>Edit Resident Profile</span>
            </div>
            <button onClick={() => setShowProfileEditModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-5 custom-scrollbar">
            {/* Visual Avatar Preview container */}
            <div className="flex flex-col items-center justify-center py-2 mb-2">
              <div
                onClick={() => document.getElementById('custom-avatar-upload')?.click()}
                className="relative group cursor-pointer transition-transform duration-200 active:scale-95"
                title="Click to choose a custom photo"
              >
                {renderAvatar(tempProfileAvatar, tempProfileName, "w-20 h-20 text-2xl", false)}

                {/* Camera icon badge */}
                <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#0A84FF] text-white shadow-md border-2 border-white dark:border-[#1C1C1E] transition-transform group-hover:scale-110">
                  <Camera size={12} strokeWidth={2.5} />
                </div>
              </div>
              <span className={`text-[11px] font-black uppercase tracking-widest opacity-60 mt-2.5 ${textSecondary}`}>Avatar Registry Preview</span>
            </div>

            {/* Hidden Input File for custom photos */}
            <input
              type="file"
              id="custom-avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleCustomPhotoChange}
            />

            {/* Avatar Selection Grid */}
            <div className="space-y-2">
              <label className={`block text-[11px] font-black uppercase tracking-widest ml-1 ${textSecondary}`}>
                Choose Identity Avatar
              </label>

              <div className="flex items-center space-x-2.5 pb-1 overflow-x-auto no-scrollbar py-1">
                {PREDEFINED_AVATARS.map((av) => {
                  const isSelected = tempProfileAvatar === av.id;

                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setTempProfileAvatar(av.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all relative border-2 ${isSelected
                        ? 'border-[#0A84FF] scale-110 shadow-md shadow-[#0A84FF]/20'
                        : 'border-transparent hover:scale-105 opacity-80 hover:opacity-100'
                        } ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}
                      title={av.label}
                    >
                      {av.id === 'initials' ? (
                        <span className="text-[10px] font-bold tracking-tight font-sans text-gray-500 dark:text-gray-400 uppercase">{getInitials(tempProfileName)}</span>
                      ) : (
                        <span className="text-lg leading-none select-none">{av.emoji}</span>
                      )}
                    </button>
                  );
                })}

                {/* Upload own photo option button */}
                <button
                  type="button"
                  onClick={() => document.getElementById('custom-avatar-upload')?.click()}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all relative border-2 ${tempProfileAvatar.startsWith('custom:')
                    ? 'border-[#0A84FF] scale-110 shadow-md shadow-[#0A84FF]/20'
                    : 'border-dashed border-gray-400 dark:border-gray-600 hover:border-[#0A84FF] hover:scale-105'
                    } ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}
                  title="Upload Custom Photo"
                >
                  {tempProfileAvatar.startsWith('custom:') ? (
                    <img src={tempProfileAvatar.substring(7)} alt="Custom" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <Camera size={14} className="text-gray-400 dark:text-gray-500" />
                  )}
                </button>
              </div>

              <p className="text-[10px] opacity-50 ml-1 leading-normal">
                Click the avatar circle above or the camera button to upload your own photo (max 1MB).
              </p>
            </div>

            {/* Full Name Input */}
            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest mb-1.5 ml-1 ${textSecondary}`}>Full Name</label>
              <input
                type="text"
                value={tempProfileName}
                onChange={e => setTempProfileName(e.target.value)}
                placeholder="Enter full name"
                className={`w-full px-4 h-12 rounded-xl text-sm outline-none border transition-colors ${isDarkMode
                  ? 'bg-[#111] border-white/10 text-white focus:border-[#0A84FF]'
                  : 'bg-white border-black/10 text-black focus:border-[#0A84FF]'
                  }`}
              />
            </div>

            {/* Email Address Input */}
            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest mb-1.5 ml-1 ${textSecondary}`}>Email Address</label>
              <input
                type="email"
                value={tempProfileEmail}
                onChange={e => setTempProfileEmail(e.target.value)}
                placeholder="Enter email address"
                className={`w-full px-4 h-12 rounded-xl text-sm outline-none border transition-colors ${isDarkMode
                  ? 'bg-[#111] border-white/10 text-white focus:border-[#0A84FF]'
                  : 'bg-white border-black/10 text-black focus:border-[#0A84FF]'
                  }`}
              />
            </div>

            {/* Country Input */}
            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest mb-1.5 ml-1 ${textSecondary}`}>Country</label>
              <input
                type="text"
                value={tempProfileCountry}
                onChange={e => setTempProfileCountry(e.target.value)}
                placeholder="e.g. Malaysia, Singapore"
                className={`w-full px-4 h-12 rounded-xl text-sm outline-none border transition-colors ${isDarkMode
                  ? 'bg-[#111] border-white/10 text-white focus:border-[#0A84FF]'
                  : 'bg-[#fcfcfc] border-black/10 text-black focus:border-[#0A84FF]'
                  }`}
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest mb-1.5 ml-1 ${textSecondary}`}>Phone Number</label>
              <input
                type="tel"
                value={tempProfilePhone}
                onChange={e => setTempProfilePhone(e.target.value)}
                placeholder="Enter mobile number"
                className={`w-full px-4 h-12 rounded-xl text-sm outline-none border transition-colors ${isDarkMode
                  ? 'bg-[#111] border-white/10 text-white focus:border-[#0A84FF]'
                  : 'bg-[#fcfcfc] border-black/10 text-black focus:border-[#0A84FF]'
                  }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-5 border-t border-gray-500/10 shrink-0 flex items-center space-x-3 bg-gray-500/5">
            <button
              onClick={() => setShowProfileEditModal(false)}
              className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
                }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={!tempProfileName.trim() || !tempProfileEmail.trim()}
              className="flex-1 py-3 rounded-xl bg-[#0A84FF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 active:scale-95 text-center shadow-lg shadow-blue-500/10"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CitizenDetailsModalOverlay = () => {
    if (!selectedCitizenId) return null;
    const citizen = citizens.find(c => c.id === selectedCitizenId);
    if (!citizen) return null;

    const isSos = citizen.status.includes('SOS');
    const isEvac = citizen.status === 'EVACUATED';

    const handleUpdateStatus = (newStatus: string) => {
      setCitizens(prev => prev.map(c => c.id === citizen.id ? { ...c, status: newStatus } : c));
      showToast(`${citizen.name}'s status updated to ${newStatus}`, 'success');
      addLog(`[DATABASE] Updated status of resident ${citizen.name} (${citizen.id}) to ${newStatus}`);
    };

    return (
      <div
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4 font-sans"
        onClick={() => setSelectedCitizenId(null)}
      >
        <div
          className={`relative w-full max-w-[440px] max-h-[90vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E]/95 border-white/10' : 'bg-white border-black/10'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-500/10 shrink-0 relative">
            <div className="flex items-center space-x-2.5">
              <Users size={20} className="text-[#0A84FF]" />
              <span className={`font-bold ${textPrimary} text-lg`}>Resident Database Card</span>
            </div>
            <button onClick={() => setSelectedCitizenId(null)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
            {/* Top summary section */}
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border shrink-0 ${isSos
                ? 'bg-[#ff453a]/15 text-[#ff453a] border-[#ff453a]/30 animate-pulse'
                : (isEvac ? 'bg-[#0a84ff]/15 text-[#0a84ff] border-[#0a84ff]/30' : 'bg-[#32d74b]/15 text-[#32d74b] border-[#32d74b]/30')
                }`}>
                {citizen.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <h4 className={`text-base font-bold truncate ${textPrimary}`}>{citizen.name}</h4>
                <p className="text-xs text-zinc-400 font-mono tracking-wider mt-0.5">{citizen.id}</p>

                <div className="flex items-center mt-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${isSos
                    ? 'bg-[#ff453a]/25 text-[#ff453a] border border-[#ff453a]/30'
                    : (isEvac ? 'bg-[#0a84ff]/25 text-[#0a84ff] border border-[#0a84ff]/30' : 'bg-[#32d74b]/20 text-[#32d74b] border border-[#32d74b]/30')
                    }`}>
                    {citizen.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile specifications */}
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#2C2C2E]/50 border-white/5' : 'bg-zinc-50 border-zinc-200'} space-y-3 font-sans`}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Designated Contact:</span>
                <span className={`font-semibold font-mono ${textPrimary}`}>{citizen.phone}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Sector/Evacuation Zone:</span>
                <span className={`font-bold ${textPrimary}`}>{citizen.zone}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Last Active Signal:</span>
                <span className="font-semibold text-emerald-500 font-mono">{citizen.ping}</span>
              </div>
            </div>

            {/* Admin Override Controls */}
            <div className="space-y-3">
              <span className={`text-[11px] font-bold uppercase tracking-widest ${textSecondary} block`}>Database Status Override</span>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => handleUpdateStatus('SAFE')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-wide cursor-pointer transition-all border shrink-0 ${citizen.status === 'SAFE'
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                    : isDarkMode ? 'bg-[#2C2C2E]/60 border-white/5 text-zinc-300 hover:bg-[#3A3A3C]' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-105'
                    }`}
                >
                  🟢 SAFE
                </button>
                <button
                  onClick={() => handleUpdateStatus('EVACUATED')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-wide cursor-pointer transition-all border shrink-0 ${citizen.status === 'EVACUATED'
                    ? 'bg-[#0a84ff] border-[#0a84ff] text-white shadow-md'
                    : isDarkMode ? 'bg-[#2C2C2E]/60 border-white/5 text-zinc-300 hover:bg-[#3A3A3C]' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-105'
                    }`}
                >
                  🔵 EVACUATED
                </button>
                <button
                  onClick={() => handleUpdateStatus('SOS PENDING')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-wide cursor-pointer transition-all border shrink-0 ${citizen.status === 'SOS PENDING'
                    ? 'bg-[#ff453a] border-[#ff453a] text-white shadow-md'
                    : isDarkMode ? 'bg-[#2C2C2E]/60 border-white/5 text-[#ff453a] hover:bg-[#3A3A3C]' : 'bg-white border-zinc-200 text-[#ff3b30] hover:bg-zinc-105'
                    }`}
                >
                  🔴 S.O.S
                </button>
              </div>
            </div>

            {/* Simulated Live Action Controls */}
            <div className="space-y-2.5 pt-2">
              <span className={`text-[11px] font-bold uppercase tracking-widest ${textSecondary} block`}>Navigation & Tactical Interacting</span>
              <div className="flex space-x-2.5">
                <button
                  onClick={() => {
                    const matchShelter = baseShelters.find(s => s.zone.toLowerCase() === citizen.zone.toLowerCase()) || baseShelters[0];
                    setInteractiveMapShelterId(matchShelter.id);
                    setShowAllCentersOnMap(false);
                    setAdminView('overview');
                    setSelectedCitizenId(null);
                    showToast(`Routing map focused on nearest shelter relative to ${citizen.name} (${citizen.zone})`, 'success');
                    addLog(`[MAP] Focused tactical navigation routes on: ${matchShelter.name} to rescue ${citizen.name}`);
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95 shadow-md border border-blue-500/20"
                >
                  <MapPin size={14} className="shrink-0" />
                  <span>Interactive Route Focus</span>
                </button>

                <button
                  onClick={() => {
                    showToast(`SMS Broadcast instruction dispatch sent to ${citizen.phone}!`, 'info');
                    addLog(`[BROADCAST] Direct warning ping transmitted to: ${citizen.phone}`);
                  }}
                  className={`px-4 rounded-2xl border flex items-center justify-center cursor-pointer transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
                    }`}
                  title="Send Direct Emergency Cell Broadcast SMS"
                >
                  <Database size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isBooting) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#000]' : 'bg-[#f2f2f7]'}`}>
        <div className="flex flex-col items-center animate-[pulseGlow_2s_ease-in-out_infinite]">
          <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#FF453A] to-[#FF9F0A] flex items-center justify-center shadow-2xl">
            <Waves size={48} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className={`mt-6 text-2xl font-black font-display tracking-tighter ${textPrimary}`}>{t.appTitle}</h1>
          <div className="mt-8 w-32 h-1.5 bg-gray-300 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FF453A] to-[#FF9F0A] animate-[loadingBar_1.8s_ease-in-out_forwards]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && isAdmin) {
    // Derived citizen counts
    const filteredCitizens = citizens.filter(c => {
      const query = citizenSearch.toLowerCase().trim();
      const matchesSearch = !query ||
        c.name.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.zone.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query);

      const matchesFilter = citizenStatusFilter === 'ALL' || c.status === citizenStatusFilter;
      return matchesSearch && matchesFilter;
    });

    const totalSheltersCapacityMax = baseShelters.reduce((acc, curr) => {
      const statusObj = shelterStatus[curr.id];
      const maxCap = statusObj?.maxCapacity !== undefined ? statusObj.maxCapacity : curr.maxCapacity;
      return acc + maxCap;
    }, 0);
    const totalCurrentShelterOccupancy = baseShelters.reduce((acc, curr) => {
      const occ = getShelterOccupancy(curr);
      return acc + occ.cap;
    }, 0);
    const overallShelterOccupancyPct = Math.round((totalCurrentShelterOccupancy / totalSheltersCapacityMax) * 100);

    const pendingRescueCount = sosRequests.filter(s => s.status === 'PENDING').length;
    const dispatchedRescueCount = sosRequests.filter(s => s.status === 'DISPATCHED' || s.status === 'EN_ROUTE' || s.status === 'ARRIVED').length;

    const getAdminChartY = (x: number) => {
      const base = 100;
      const peakHeight = simulateStorm ? 75 : 24;
      const mainPeak = peakHeight * Math.exp(-Math.pow((x - 200) / 70, 2));
      const leftHill = (simulateStorm ? 24 : 10) * Math.exp(-Math.pow((x - 100) / 40, 2));
      const rightHill = (simulateStorm ? 30 : 8) * Math.exp(-Math.pow((x - 300) / 50, 2));
      const ripple = 3 * Math.sin(x / 10);
      return base - mainPeak - leftHill - rightHill + ripple;
    };

    const adminPathPoints = Array.from({ length: 121 }, (_, i) => {
      const x = (i / 120) * 400;
      return `${x.toFixed(1)},${getAdminChartY(x).toFixed(1)}`;
    }).join(" L ");

    const adminArea = `M 0,120 L ${adminPathPoints} L 400,120 Z`;

    const histPoints = Array.from({ length: 61 }, (_, i) => {
      const x = (i / 120) * 400;
      return `${x.toFixed(1)},${getAdminChartY(x).toFixed(1)}`;
    }).join(" L ");
    const histLine = `M 0,${getAdminChartY(0).toFixed(1)} L ${histPoints}`;

    const predPoints = Array.from({ length: 61 }, (_, i) => {
      const x = ((60 + i) / 120) * 400;
      return `${x.toFixed(1)},${getAdminChartY(x).toFixed(1)}`;
    }).join(" L ");
    const predLine = `M 200,${getAdminChartY(200).toFixed(1)} L ${predPoints}`;

    return (
      <div className={`min-h-screen w-full flex p-5 ${isDarkMode
        ? 'bg-[#000] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-black to-zinc-950 text-white'
        : 'bg-[#f2f2f7] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-zinc-100 to-zinc-200 text-[#1c1c1e]'
        } font-sans overflow-hidden selection:bg-[#0a84ff]/20 animate-[fadeIn_0.5s_ease-out] relative transition-all duration-500`}>
        <ToastOverlay />
        <DeleteConfirmationModalOverlay />

        {/* Executive report presentation layout modal */}
        {officialReport && (
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center animate-[fadeIn_0.3s_ease-out] p-4">
            <div className={`w-full max-w-2xl max-h-[85vh] flex flex-col rounded-[32px] border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden ${isDarkMode ? 'bg-[#18181b] border-white/10' : 'bg-white border-black/10'}`}>
              <div className="p-6 border-b border-zinc-500/10 flex justify-between items-center bg-gradient-to-r from-zinc-500/5 to-transparent">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-[#0a84ff]/10 text-[#0a84ff]">
                    <FileText size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-[#0a84ff] uppercase font-mono">Operations Intelligence</span>
                    <h2 className="text-xl font-black tracking-tight font-display uppercase mt-0.5">Special Briefing & Predictive Analysis</h2>
                  </div>
                </div>
                <button onClick={() => setOfficialReport(null)} className="p-2 rounded-full hover:bg-zinc-500/20 transition-colors text-zinc-400 hover:text-zinc-100"><X size={18} /></button>
              </div>
              <div className="p-8 overflow-y-auto font-sans leading-relaxed text-sm flex-1">
                <div className="mb-6 p-4 rounded-xl bg-[#0a84ff]/5 text-[#0a84ff] border border-[#0a84ff]/10 flex items-center space-x-3">
                  <ShieldCheck size={18} className="shrink-0 animate-pulse" />
                  <span className="text-[10.5px] font-black font-mono tracking-wider">OFFICIAL RECOVERY & FORECAST DIRECTIVE — VERIFIED</span>
                </div>
                <div className="whitespace-pre-wrap opacity-95">
                  {officialReport}
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-500/10 flex justify-between items-center text-[9px] font-mono font-black opacity-50 uppercase tracking-widest">
                  <span>RECORD IDENTIFIER: INCIDENT-DM-2026</span>
                  <span>PREPARED BY FLOOD COGNITIVE SUITE</span>
                </div>
              </div>
              <div className="p-6 border-t border-zinc-500/10 flex justify-end space-x-3 bg-gradient-to-r from-transparent to-zinc-500/5">
                <button onClick={() => setOfficialReport(null)} className={`px-6 py-3 rounded-xl font-mono font-bold text-[10px] uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-95 ${isDarkMode ? 'bg-[#27272a] hover:bg-[#3f3f46] text-zinc-100 border border-white/5' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200'}`}>Dismiss Draft</button>
                <button onClick={() => generatePDFAdvisory(officialReport)} className="px-6 py-3 rounded-xl font-black font-mono text-[10px] uppercase tracking-widest bg-[#0a84ff] text-white shadow-lg shadow-[#0a84ff]/25 hover:bg-blue-600 transition-all hover:scale-[1.01] active:scale-95 border border-[#0a84ff]/20">Download PDF Advisory</button>
              </div>
            </div>
          </div>
        )}

        {/* Elegant structural grid backdrop overlay */}
        <div className={`fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}_1px,transparent_1px)] [background-size:32px_32px] opacity-70`}></div>
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] bg-[#0a84ff]/3 blur-[140px] rounded-full mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-[30%] right-[15%] w-[500px] h-[500px] bg-[#ff453a]/2 blur-[160px] rounded-full mix-blend-screen animate-pulse"></div>
        </div>

        {/* Dynamic overlay backdrop when sidebar is toggled open */}
        <div
          onClick={() => setAdminSidebarOpen(false)}
          className={`absolute inset-5 bg-black/45 backdrop-blur-sm z-35 transition-all duration-500 rounded-[32px] ${adminSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none invisible'
            }`}
        />

        {/* Left operations navigation deck */}
        <div className={`transition-all duration-500 ease-in-out absolute left-5 top-5 bottom-5 w-[305px] ${adminSidebarOpen
          ? 'translate-x-0 opacity-100 z-40 pointer-events-auto border'
          : '-translate-x-[345px] opacity-0 z-0 pointer-events-none border-transparent invisible'
          } rounded-[32px] ${glassCardClass} flex flex-col shadow-2xl overflow-hidden ${isDarkMode
            ? 'border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.5)] bg-zinc-950/95 backdrop-blur-xl'
            : 'border-zinc-300/40 shadow-[0_24px_50px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-xl'
          }`}>
          <div className="w-[305px] flex flex-col h-full shrink-0 relative">
            {/* Elegant structural border top decoration */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0a84ff]"></div>

            <div className={`p-6 pb-5 flex items-center space-x-3.5 border-b ${isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}>
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[#0a84ff]/10 text-[#0a84ff] flex items-center justify-center border border-[#0a84ff]/20 shadow-sm">
                  <Waves size={18} />
                </div>
              </div>
              <div className="min-w-0">
                <h1 className={`font-sans font-extrabold tracking-tight text-base leading-none ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>FloodCast</h1>
                <p className={`text-[10px] text-zinc-500 font-medium tracking-wide mt-1`}>EOC Management Panel</p>
              </div>
            </div>

            <div className="flex-1 py-6 px-4 space-y-7 overflow-y-auto no-scrollbar">
              <div>
                <span className={`px-3 text-[10px] font-bold tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} block mb-3 font-sans`}>NAVIGATION</span>
                <div className="space-y-1">
                  <button
                    onClick={() => { setAdminView('overview'); setCitizenSearch(''); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'overview'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'overview' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <LayoutDashboard size={15} />
                      </div>
                      <span className="text-xs truncate">Dashboard Overview</span>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${simulateStorm ? 'bg-[#ff453a]' : 'bg-[#32d74b]'}`}></span>
                  </button>

                  <button
                    onClick={() => { setAdminView('citizens'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'citizens'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'citizens' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <Users size={15} />
                      </div>
                      <span className="text-xs truncate">Resident Directory</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded bg-zinc-200/50 dark:bg-white/10 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-650'}`}>{citizens.length}</span>
                  </button>
                </div>
              </div>

              <div className={`pt-5 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <span className={`px-3 text-[10px] font-bold tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} block mb-3 font-sans`}>EOC DECK MODULES</span>
                <div className="space-y-1">
                  {/* Hydrology & Sensor Grid */}
                  <button
                    onClick={() => { setAdminView('hydrology'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'hydrology'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'hydrology' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <MapPinned size={15} />
                      </div>
                      <span className="text-xs truncate">Hydrology & Sensors</span>
                    </div>
                  </button>

                  {/* Active SOS Dispatch */}
                  <button
                    onClick={() => { setAdminView('dispatch'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'dispatch'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'dispatch' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <LifeBuoy size={15} />
                      </div>
                      <span className="text-xs truncate">SOS Rescue Dispatch</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded bg-red-500/15 text-red-500`}>
                      {citizens.filter(c => c.status === 'SOS PENDING').length}
                    </span>
                  </button>

                  {/* Shelter & Stock Logistics */}
                  <button
                    onClick={() => { setAdminView('shelter'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'shelter'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'shelter' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <Tent size={15} />
                      </div>
                      <span className="text-xs truncate">Shelter & Stock Logistics</span>
                    </div>
                  </button>

                  {/* Mutual Aid Ledger */}
                  <button
                    onClick={() => { setAdminView('mutual-aid'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'mutual-aid'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'mutual-aid' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <Radio size={15} />
                      </div>
                      <span className="text-xs truncate">Mutual Aid Ledger</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className={`pt-5 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <div className="flex items-center justify-between px-3 mb-2.5">
                  <span className={`text-[10px] font-bold tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} font-sans`}>SIMULATION CONTROL</span>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.015] border-white/5' : 'bg-zinc-50 border-zinc-200'} space-y-3.5`}>
                  {/* Active Storm Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col min-w-0 flex-1 pr-2 select-none">
                      <span className="text-xs font-semibold leading-none">Simulate Storm</span>
                      <span className="text-[9px] text-zinc-500 font-medium tracking-wide mt-1">{simulateStorm ? "Active Emergency Mode" : "Normal Mode"}</span>
                    </div>
                    <button
                      onClick={toggleSimulateStorm}
                      className={`w-9 h-5 rounded-full p-0.5 transition-all duration-250 relative flex items-center shrink-0 cursor-pointer ${simulateStorm ? 'bg-[#ff453a]' : 'bg-zinc-300 dark:bg-zinc-800'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-250 ${simulateStorm ? 'translate-x-[16px]' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  <div className={`h-px w-full ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>

                  {/* Recovery Phase Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col min-w-0 flex-1 pr-2 select-none">
                      <span className="text-xs font-semibold leading-none">Recovery Phase</span>
                      <span className="text-[9px] text-zinc-500 font-medium tracking-wide mt-1">{appPhase === 'recovery' ? "Recovery Protocols On" : "Inactive Ready"}</span>
                    </div>
                    <button
                      onClick={toggleSimulateRecovery}
                      className={`px-2 py-1 rounded-lg font-bold font-sans text-[10px] transition-all flex items-center space-x-1 cursor-pointer select-none shrink-0 ${appPhase === 'recovery'
                        ? 'bg-blue-600 text-white'
                        : (isDarkMode ? 'bg-white/10 text-zinc-300 hover:bg-white/20' : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300')
                        }`}
                    >
                      <HeartHandshake size={11} />
                      <span>{appPhase === 'recovery' ? 'On' : 'Off'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Theme Control */}
              <div className={`pt-5 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <div className="flex items-center justify-between px-3 mb-2.5">
                  <span className={`text-[10px] font-bold tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} font-sans uppercase`}>
                    {t.themeLabel ? t.themeLabel.toUpperCase() : "THEME CONTROL"}
                  </span>
                </div>

                <div className={`p-2.5 rounded-2xl border ${isDarkMode ? 'bg-white/[0.015] border-white/5' : 'bg-zinc-50 border-zinc-200'} flex items-center justify-between gap-3`}>
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-white/5 text-amber-400' : 'bg-black/5 text-blue-600'}`}>
                      {themeMode === 'light' ? (
                        <Sun size={14} className="animate-[spin_12s_linear_infinite]" />
                      ) : themeMode === 'dark' ? (
                        <Moon size={14} />
                      ) : (
                        <Clock size={14} className="animate-[pulse_2s_ease-in-out_infinite]" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0 select-none">
                      <span className="text-xs font-semibold leading-none">
                        {themeMode === 'light' ? t.themeLight : themeMode === 'dark' ? t.themeDark : t.themeAuto}
                      </span>
                    </div>
                  </div>

                  {/* 3-way toggle slider adapted perfectly for sidebar width */}
                  <div
                    className={`relative w-[130px] h-[34px] rounded-full flex items-center p-0.5 cursor-pointer transition-all duration-500 overflow-hidden border select-none ${isDarkMode
                      ? "bg-[#13151a] border-white/5 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]"
                      : "bg-[#edf2f7] border-black/5 shadow-[inset_2px_2px_4px_#cbd5e1]"
                      }`}
                  >
                    {/* Overlay 3-way touch zones */}
                    <div className="absolute inset-0 flex z-30">
                      <button onClick={() => changeThemeMode('light')} className="flex-1 h-full outline-none cursor-pointer" title="Set Light Theme"></button>
                      <button onClick={() => changeThemeMode('auto')} className="flex-1 h-full outline-none cursor-pointer" title="Set Auto Theme"></button>
                      <button onClick={() => changeThemeMode('dark')} className="flex-1 h-full outline-none cursor-pointer" title="Set Dark Theme"></button>
                    </div>

                    {/* Static background text labels */}
                    <div className="absolute inset-0 px-2 flex items-center justify-between pointer-events-none select-none z-10 w-full font-black text-[8.5px] tracking-tight font-sans uppercase">
                      <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'light' ? 'opacity-0' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        LGT
                      </span>
                      <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'auto' ? 'opacity-0' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        AUTO
                      </span>
                      <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'dark' ? 'opacity-0' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        DRK
                      </span>
                    </div>

                    {/* Sliding Knob */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute top-[3px] left-[2px] z-20 ${isDarkMode
                        ? "bg-[#1c2025] shadow-[2px_2px_4px_rgba(0,0,0,0.85)] text-[#FF9F0A]"
                        : "bg-[#f8fafc] shadow-[1.5px_1.5px_3px_#cbd5e1] text-[#0A84FF]"
                        }`}
                      style={{
                        transform: themeMode === 'light'
                          ? 'translateX(0px)'
                          : themeMode === 'auto'
                            ? 'translateX(48px)'
                            : 'translateX(96px)'
                      }}
                    >
                      {themeMode === 'light' ? (
                        <Sun size={12} strokeWidth={2.5} className="animate-[spin_12s_linear_infinite]" />
                      ) : themeMode === 'dark' ? (
                        <Moon size={12} strokeWidth={2.5} />
                      ) : (
                        <Clock size={12} strokeWidth={2.5} className="animate-[pulse_2s_ease-in-out_infinite]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connected Admin Profile - Moved below Recovery Phase */}
              <div className={`pt-5 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'} flex flex-col space-y-3`}>
                <div className={`p-3 rounded-xl flex items-center space-x-3 border ${isDarkMode ? 'bg-black/30 border-white/5' : 'bg-white border-zinc-200'}`}>
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0a84ff]/10 text-[#0a84ff]">
                    <Shield size={15} />
                  </div>
                  <div className="min-w-0 flex-1 select-none">
                    <p className="font-bold text-xs leading-none">Emergency Admin</p>
                    <p className="font-mono text-[9px] opacity-50 leading-none mt-1 truncate">{user?.email || 'admin@portal.gov'}</p>
                  </div>
                </div>

                <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-red-500 bg-red-500/5 hover:bg-red-500/10 active:scale-98 transition-all font-bold text-xs select-none cursor-pointer border border-red-500/10">
                  <LogOut size={12} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Command Workspace */}
        <div className={`flex-1 flex flex-col rounded-[32px] ${glassCardClass} overflow-y-auto no-scrollbar relative z-10 scroll-smooth shadow-2xl border ${isDarkMode ? 'border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]' : 'border-zinc-300/40'}`}>
          {/* Workspace Floating Header with translucent backdrop glass */}
          <div className={`h-20 px-8 border-b ${isDarkMode ? 'border-white/5 bg-black/25' : 'border-zinc-200 bg-white/40'} backdrop-blur-md flex flex-wrap items-center justify-between sticky top-0 z-30 transition-all duration-300 gap-4`}>
            <div className="flex items-center flex-wrap gap-4">
              <button
                onClick={() => setAdminSidebarOpen(!adminSidebarOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center border hover:scale-105 active:scale-95 ${isDarkMode
                  ? 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-[#0a84ff] hover:border-[#0a84ff]/30 shadow-inner'
                  : 'border-zinc-300/60 bg-zinc-100/80 text-zinc-700 hover:bg-zinc-250 hover:text-[#0a84ff] hover:border-zinc-400 shadow-sm'
                  }`}
                title={adminSidebarOpen ? "Collapse Navigation Panel" : "Expand Navigation Panel"}
              >
                <Menu size={18} className={`transition-transform duration-350 ${adminSidebarOpen ? 'rotate-90 text-[#0a84ff]' : 'rotate-0'}`} />
              </button>

              <div>
                <div className="flex items-center space-x-2 select-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a84ff] font-sans">EOC PORTAL</span>
                </div>
                <h2 className={`text-xl font-extrabold tracking-tight mt-0.5 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {adminView === 'overview' ? 'Command Center' :
                    adminView === 'hydrology' ? 'Hydrology & Sensor Grid' :
                      adminView === 'dispatch' ? 'SOS Active Dispatch' :
                        adminView === 'shelter' ? 'Relief Shelter & Logistics' :
                          adminView === 'mutual-aid' ? 'Mutual Aid Radio Ledger' :
                            'Resident Directory'}
                </h2>
              </div>

              {adminView === 'overview' && (
                <div className={`flex p-1 rounded-xl border md:ml-4 shadow-inner select-none transition-colors duration-300 ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-zinc-200/50 border-zinc-250'
                  }`}>
                  <button
                    onClick={() => setCommandCenterTab('standard')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${commandCenterTab === 'standard'
                      ? 'bg-blue-600 text-white shadow-md'
                      : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                  >
                    Standard Feed
                  </button>
                  <button
                    onClick={() => setCommandCenterTab('tactical')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${commandCenterTab === 'tactical'
                      ? isDarkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-600 border border-red-200/60 shadow-sm'
                      : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    EOC Dispatch Deck
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3.5">
              <LiveClock isDarkMode={isDarkMode} />

              <div className="h-6 w-px bg-zinc-500/15 hidden md:block"></div>

              <div className="flex items-center gap-2">
                <button
                  onClick={generateOfficialReport}
                  disabled={isGeneratingReport}
                  className="flex items-center space-x-1.5 bg-[#0a84ff] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer border border-[#0a84ff]/10"
                >
                  {isGeneratingReport ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />}
                  <span>Generate PDF Briefing</span>
                </button>
              </div>
            </div>
          </div>

          {adminView === 'overview' ? (
            <div className="p-6 sm:p-8 lg:p-9 max-w-[1700px] mx-auto w-full pb-20 space-y-8 animate-[fadeIn_0.5s_ease-out]">
              {commandCenterTab === 'tactical' ? (
                <SciFiCommandCenter
                  isDarkMode={isDarkMode}
                  onShowToast={showToast}
                  onSetViewMode={setAdminView}
                  selectedSectorId={selectedSectorId}
                  onSelectSectorId={setSelectedSectorId}
                  onEditShelter={handleOpenShelterEditModal}
                  citizens={citizens}
                  setCitizens={setCitizens}
                  riverLevel={riverLevel}
                  rainfall={rainfall}
                  shelterSupplies={shelterSupplies}
                  setShelterSupplies={setShelterSuppliesWithSync}
                  isSirenActive={isSirenActive}
                  setIsSirenActive={setIsSirenActiveWithSync}
                  isLeveeDamDeployed={isLeveeDamDeployed}
                  setIsLeveeDamDeployed={setIsLeveeDamDeployedWithSync}
                />
              ) : (
                <DashboardOverview
                  isDarkMode={isDarkMode}
                  simulateStorm={simulateStorm}
                  rainfall={rainfall}
                  chartData={chartData}
                  pendingRescueCount={pendingRescueCount}
                  dispatchedRescueCount={dispatchedRescueCount}
                  riverLevel={riverLevel}
                  overallShelterOccupancyPct={overallShelterOccupancyPct}
                  totalCurrentShelterOccupancy={totalCurrentShelterOccupancy}
                  totalSheltersCapacityMax={totalSheltersCapacityMax}
                  sosRequests={sosRequests}
                  isSirenActive={isSirenActive}
                  setIsSirenActive={setIsSirenActiveWithSync}
                  isLeveeDamDeployed={isLeveeDamDeployed}
                  setIsLeveeDamDeployed={setIsLeveeDamDeployedWithSync}
                  baseShelters={baseShelters}
                  getShelterOccupancy={getShelterOccupancy}
                  shelterStatus={shelterStatus}
                  showAllShelters={showAllShelters}
                  setShowAllShelters={setShowAllShelters}
                  setAdminView={setAdminView}
                  showToast={showToast}
                  glassCardClass={glassCardClass}
                  textPrimary={textPrimary}
                  textSecondary={textSecondary}
                  handleOpenShelterEditModal={handleOpenShelterEditModal}
                  adminArea={adminArea}
                  predLine={predLine}
                  histLine={histLine}
                  getAdminChartY={getAdminChartY}
                  selectedShelterDetail={selectedShelterDetail}
                  setSelectedShelterDetail={setSelectedShelterDetail}
                  citizens={citizens}
                  commandCenterTab={commandCenterTab}
                  setCommandCenterTab={setCommandCenterTab}
                  adminMapSearch={adminMapSearch}
                  setAdminMapSearch={setAdminMapSearch}
                  showRouteActive={showRouteActive}
                  setShowRouteActive={setShowRouteActive}
                  bookmarkedShelters={bookmarkedShelters}
                  setBookmarkedShelters={setBookmarkedShelters}
                  getShelterPhotos={getShelterPhotos}
                  broadcastZone={broadcastZone}
                  setBroadcastZone={setBroadcastZone}
                  manualLocations={manualLocations}
                  broadcastType={broadcastType}
                  setBroadcastType={setBroadcastType}
                  broadcastMessage={broadcastMessage}
                  setBroadcastMessage={setBroadcastMessage}
                  handleBroadcast={handleBroadcast}
                  isBroadcasting={isBroadcasting}
                  handleLocateSosOnMap={handleLocateSosOnMap}
                  handleDispatchRescue={handleDispatchRescue}
                  handleGoToShelterPage={handleGoToShelterPage}
                  toggleShelterCapacity={toggleShelterCapacity}
                  currentCoords={currentCoords}
                  adminMapZoom={adminMapZoom}
                  setAdminMapZoom={setAdminMapZoom}
                  adminMapType={adminMapType}
                  setAdminMapType={setAdminMapType}
                />
              )}
            </div>
          ) : adminView === 'hydrology' || adminView === 'dispatch' || adminView === 'shelter' || adminView === 'mutual-aid' ? (
            <div className="p-6 sm:p-8 lg:p-9 max-w-[1700px] mx-auto w-full pb-20 space-y-8 animate-[fadeIn_0.5s_ease-out]">
              <SciFiCommandCenter
                isDarkMode={isDarkMode}
                onShowToast={showToast}
                viewMode={adminView}
                onSetViewMode={setAdminView}
                selectedSectorId={selectedSectorId}
                onSelectSectorId={setSelectedSectorId}
                onEditShelter={handleOpenShelterEditModal}
                citizens={citizens}
                setCitizens={setCitizens}
                riverLevel={riverLevel}
                rainfall={rainfall}
                shelterSupplies={shelterSupplies}
                setShelterSupplies={setShelterSuppliesWithSync}
                isSirenActive={isSirenActive}
                setIsSirenActive={setIsSirenActiveWithSync}
                isLeveeDamDeployed={isLeveeDamDeployed}
                setIsLeveeDamDeployed={setIsLeveeDamDeployedWithSync}
              />
            </div>
          ) : (
            <ResidentDirectory isDarkMode={isDarkMode} glassCardClass={glassCardClass} citizens={citizens} setSelectedCitizenId={setSelectedCitizenId} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-10 px-4 transition-colors duration-700 ease-out font-sans antialiased selection:bg-[#0A84FF]/30
      ${isDarkMode ? 'bg-[#000] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000]' : 'bg-[#f2f2f7]'}`}>

      <audio ref={audioRef} className="hidden" />

      <div
        className={`relative w-full max-w-[430px] h-[932px] rounded-[48px] overflow-hidden transition-all duration-700 flex flex-col z-10 animate-[fadeInUp_0.6s_ease-out] mobile-app-container
        ${isDarkMode ? 'bg-[#000]' : 'bg-[#f2f2f7]'}`}
        style={{ boxShadow: isDarkMode ? '0 0 0 14px #1a1a1c, 0 0 0 16px #333, 0 40px 80px -10px rgba(0, 0, 0, 1)' : '0 0 0 14px #fff, 0 0 0 16px #ddd, 0 40px 80px -10px rgba(0, 0, 0, 0.3)' }}
      >
        {/* Blinking Red Emergency Screen Border */}
        {(simulateStorm || aiStatus === t.critical) && (
          <div className="absolute inset-0 border-[6px] border-solid rounded-[48px] pointer-events-none z-[100] animate-emergency-blink"></div>
        )}
        <PushNotificationOverlay />
        <ToastOverlay />
        <DeleteConfirmationModalOverlay />
        <LanguageModalOverlay />
        <LocationModalOverlay />
        <UserProfileModalOverlay />
        <ShelterEditModalOverlay />
        <HazardModalOverlay />
        <JkmModalOverlay />
        <CitizenDetailsModalOverlay />
        {showAdminPin && (
          <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center animate-[fadeIn_0.2s_ease-out]">
            <div className={`w-[85%] rounded-[32px] p-6 shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/10'}`}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <Key size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
                  <span className={`font-bold ${textPrimary}`}>Admin Override</span>
                </div>
                <button onClick={() => { setShowAdminPin(false); setAuthError(''); }}><X size={20} className="text-gray-500" /></button>
              </div>
              <form onSubmit={verifyAdminAccess}>
                <input
                  type="password" autoFocus required placeholder="Enter RBAC Code (FYP2026)"
                  className={`w-full h-[60px] px-5 rounded-2xl outline-none font-bold tracking-widest text-center border ${isDarkMode ? 'bg-black/50 border-white/20 text-white' : 'bg-gray-100 border-black/10 text-black'}`}
                  value={adminPin} onChange={(e) => setAdminPin(e.target.value)}
                />
                {authError && <p className="text-[#FF453A] text-xs font-bold text-center mt-3 animate-pulse">{authError}</p>}
                <button type="submit" className="w-full mt-4 h-[50px] rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg">Verify Authority</button>
              </form>
            </div>
          </div>
        )}
        {(isAuthenticated && activeTab !== 'map' && appPhase !== 'recovery') && (<WeatherBackground isRaining={rainfall >= 1.0 || simulateStorm} isDarkMode={isDarkMode} aiStatus={aiStatus} />)}

        <div className={`absolute top-[200px] -left-[14px] w-[4px] h-[60px] rounded-l-lg z-0 ${isDarkMode ? 'bg-[#333]' : 'bg-[#ccc]'}`}></div>
        <div className={`absolute top-[280px] -left-[14px] w-[4px] h-[60px] rounded-l-lg z-0 ${isDarkMode ? 'bg-[#333]' : 'bg-[#ccc]'}`}></div>
        <div className={`absolute top-[240px] -right-[14px] w-[4px] h-[80px] rounded-r-lg z-0 ${isDarkMode ? 'bg-[#333]' : 'bg-[#ccc]'}`}></div>

        <div className={`absolute top-3 left-1/2 -translate-x-1/2 h-[36px] bg-black rounded-full z-[100] shadow-[inset_0_-2px_4px_rgba(255,255,255,0.15)] flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${islandExpanded ? 'w-[280px] px-5 py-2 h-[50px]' : 'w-[125px] px-3 justify-between group hover:w-[135px]'}`}>
          {!islandExpanded ? (
            <>
              <div className="w-3 h-3 rounded-full bg-black border-[0.5px] border-white/10"></div>
              <div className="flex space-x-2 items-center">
                {aiStatus === t.critical && isAuthenticated && !isLoadingApi && <div className="w-1.5 h-1.5 bg-[#FF453A] rounded-full animate-pulse shadow-[0_0_5px_#FF453A]"></div>}
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border-[0.5px] border-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#1a1a1a] rounded-full"></div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3 w-full animate-[fadeIn_0.3s_ease-out_0.2s] opacity-0" style={{ animationFillMode: 'forwards' }}>
              <AlertTriangle size={16} className="text-[#FF453A]" />
              {/* Refactored custom bracket size */}
              <span className="text-white text-xs font-bold tracking-wide truncate">{islandMessage}</span>
            </div>
          )}
        </div>

        <div className={`absolute top-0 left-0 w-full h-14 flex justify-between items-center px-8 z-[90] pointer-events-none ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {/* Authentic iOS typography and clock */}
          <span className="text-[15px] font-sans font-semibold tracking-tight pt-[7px] drop-shadow-md select-none">
            9:41
          </span>
          {/* Authentic iOS top-right status indicators */}
          <div className="flex items-center space-x-[5px] pt-[7px] drop-shadow-md">
            {/* Cellular strength */}
            <div className="flex items-end space-x-[2px] h-[10.5px]">
              <div className="w-[3px] h-[3px] bg-current rounded-[0.8px]"></div>
              <div className="w-[3px] h-[5.5px] bg-current rounded-[0.8px]"></div>
              <div className="w-[3px] h-[8px] bg-current rounded-[0.8px]"></div>
              <div className="w-[3px] h-[10.5px] bg-current rounded-[0.8px]"></div>
            </div>
            {/* WiFi */}
            <svg width="17" height="11.5" viewBox="0 0 17 11.5" className="text-current" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 11C9.19036 11 9.75 10.4404 9.75 9.75C9.75 9.05964 9.19036 8.5 8.5 8.5C7.80964 8.5 7.25 9.05964 7.25 9.75C7.25 10.4404 7.80964 11 8.5 11Z" fill="currentColor" />
              <path d="M4.68652 5.93652C6.79611 3.82693 10.2039 3.82693 12.3135 5.93652" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M1.8584 3.1084C5.52695 -0.560156 11.473 -0.560156 15.1416 3.1084" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
            {/* Battery */}
            <div className="flex items-center space-x-[1px]">
              <div className="w-[24.5px] h-[11.5px] border-[1px] border-current rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="h-full w-full bg-current rounded-[1.5px]"></div>
                <div className="w-[1.2px] h-[3.8px] bg-current rounded-r-[0.8px] absolute -right-[2.2px] top-[3.2px]"></div>
              </div>
            </div>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className={`absolute inset-0 overflow-y-auto px-6 pt-24 pb-8 flex flex-col no-scrollbar z-50 transition-colors duration-700 animate-[fadeIn_0.5s_ease-out] ${isDarkMode ? 'bg-[#000]' : 'bg-[#f2f2f7]'}`}>

            <div className="flex justify-end items-center gap-3 mb-4 relative z-10 animate-[fadeInUp_0.4s_ease-out]">
              {/* Beautiful Compact Neumorphic Language Slider */}
              <div
                className={`relative w-[150px] h-[42px] rounded-full flex items-center p-1 cursor-pointer transition-all duration-500 overflow-hidden border select-none ${isDarkMode
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute top-[4px] left-[4px] z-20 ${isDarkMode
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

              {/* Beautiful Compact Neumorphic Theme Slider */}
              <div
                className={`relative w-[150px] h-[42px] rounded-full flex items-center p-1 cursor-pointer transition-all duration-500 overflow-hidden border select-none ${isDarkMode
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute top-[4px] left-[4px] z-20 ${isDarkMode
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

            <div className="flex flex-col items-center mt-2 mb-10 relative z-10 animate-[fadeInUp_0.5s_ease-out]">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF453A] to-[#FF9F0A] rounded-[32px] blur-xl opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-28 h-28 rounded-[32px] bg-gradient-to-br from-[#FF453A] to-[#FF9F0A] flex items-center justify-center shadow-lg border border-white/10 mb-6">
                  <Waves size={52} className="text-white drop-shadow-md" strokeWidth={2.5} />
                </div>
              </div>
              {/* Standardized display typography to standard tailwind classes */}
              <h1 className={`text-4xl font-extrabold font-display tracking-tighter ${textPrimary} drop-shadow-sm leading-none`}>{t.appTitle}</h1>
              <p className={`text-base font-medium mt-2 ${textSecondary} tracking-widest uppercase`}>{t.subtitle}</p>
            </div>

            <div className={`p-8 rounded-[32px] shadow-lg ${glassCardClass} flex-1 flex flex-col justify-center relative z-10 animate-[fadeInUp_0.6s_ease-out] ${authError && !showAdminPin ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
              {/* Standardized header typography to text-2xl */}
              <h2 className={`text-2xl font-extrabold font-display tracking-tight mb-8 ${textPrimary} text-center`}>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div className={`group flex items-center space-x-4 h-[60px] px-5 rounded-[20px] border transition-all duration-300 focus-within:ring-4 focus-within:ring-[#0A84FF]/20 ${authError && !showAdminPin ? 'border-[#FF453A]' : (isDarkMode ? 'bg-[#1C1C1E] border-white/10 focus-within:border-[#0A84FF]' : 'bg-white border-black/5 focus-within:border-[#0A84FF]')}`}>
                    <User size={22} className={`${textSecondary} group-focus-within:text-[#0A84FF] transition-colors`} />
                    {/* Standardized size to text-base */}
                    <input required type="text" placeholder="Full Name" className={`bg-transparent outline-none w-full h-full text-base font-medium ${textPrimary} placeholder:text-gray-500`} />
                  </div>
                )}
                <div className={`group flex items-center space-x-4 h-[60px] px-5 rounded-[20px] border transition-all duration-300 focus-within:ring-4 focus-within:ring-[#0A84FF]/20 ${authError && !showAdminPin ? 'border-[#FF453A]' : (isDarkMode ? 'bg-[#1C1C1E] border-white/10 focus-within:border-[#0A84FF]' : 'bg-white border-black/5 focus-within:border-[#0A84FF]')}`}>
                  <Mail size={22} className={`${textSecondary} group-focus-within:text-[#0A84FF] transition-colors`} />
                  {/* Standardized size to text-base */}
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className={`bg-transparent outline-none w-full h-full text-base font-medium ${textPrimary} placeholder:text-gray-500`} />
                </div>
                <div className={`group flex items-center space-x-4 h-[60px] px-5 rounded-[20px] border transition-all duration-300 focus-within:ring-4 focus-within:ring-[#0A84FF]/20 ${authError && !showAdminPin ? 'border-[#FF453A]' : (isDarkMode ? 'bg-[#1C1C1E] border-white/10 focus-within:border-[#0A84FF]' : 'bg-white border-black/5 focus-within:border-[#0A84FF]')}`}>
                  <Lock size={22} className={`${textSecondary} group-focus-within:text-[#0A84FF] transition-colors`} />
                  {/* Standardized size to text-base */}
                  <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`bg-transparent outline-none w-full h-full text-base font-medium ${textPrimary} placeholder:text-gray-500`} />
                </div>

                {authError && !showAdminPin && <p className="text-[#FF453A] text-xs font-bold text-center animate-[fadeIn_0.2s_ease-out]">{authError}</p>}

                <button type="submit" disabled={isAuthenticating} className="w-full h-[60px] mt-6 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 shadow-[0_10px_30px_rgba(255,69,58,0.4)] disabled:opacity-70 border-t border-white/20 bg-gradient-to-b from-[#FF453A] to-[#D70015]">
                  {/* Standardized text-[18px] to text-base */}
                  {isAuthenticating ? <Loader2 size={24} className="animate-spin text-white" /> : <span className="text-white font-black text-base tracking-wide">Continue</span>}
                </button>
              </form>

              <div className="mt-6 space-y-3">
                <div className="relative flex items-center py-2">
                  <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-500/20' : 'border-gray-300'}`}></div>
                  <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-bold uppercase tracking-widest">Or login with</span>
                  <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-500/20' : 'border-gray-300'}`}></div>
                </div>
                <div className="flex space-x-3">
                  <button type="button" onClick={handleAppleLogin} className={`flex-1 py-3.5 rounded-[16px] flex items-center justify-center space-x-2 transition-transform active:scale-95 border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10 text-white' : 'bg-white border-black/10 text-black shadow-sm'}`}>
                    <AppleIcon size={20} />
                  </button>
                  <button type="button" onClick={handleGoogleLogin} className={`flex-1 py-3.5 rounded-[16px] flex items-center justify-center space-x-2 transition-transform active:scale-95 border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10 text-white' : 'bg-white border-black/10 text-black shadow-sm'}`}>
                    <GoogleIcon size={20} />
                  </button>
                </div>
              </div>

              {/* Standardized text-[13px] to text-xs */}
              <p className="mt-6 text-center text-xs font-bold text-gray-500">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }} className="text-[#0A84FF] hover:underline">
                  {authMode === 'login' ? 'Create Account' : 'Log In'}
                </button>
              </p>

              <div className="mt-6 pt-6 text-center relative z-10 border-t border-gray-500/20">
                {/* Standardized size to text-xs tracking-wider */}
                <button onClick={() => { setAuthError(''); setShowAdminPin(true); }} className={`text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 w-full transition-opacity hover:opacity-70 ${textSecondary}`}>
                  <LockKeyhole size={14} /><span>Access Admin Console</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full relative overflow-hidden">

            {activeTab === 'home' && (
              <MobileHomePage
                isDarkMode={isDarkMode}
                currentLocation={currentLocation}
                simulateStorm={simulateStorm}
                appPhase={appPhase}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                handleTabChange={handleTabChange}
                riverLevel={riverLevel}
                rainfall={rainfall}
                activeAlertCount={activeAlertCount}
                sosRequests={sosRequests}
                citizens={citizens}
                isVolunteerMode={isVolunteerMode}
                setIsVolunteerMode={setIsVolunteerMode}
                handleAcceptRescue={handleAcceptRescue}
                handleUpdateMissionStatus={handleUpdateMissionStatus}
                handleCancelMySos={handleCancelMySos}
                hourlyRainList={hourlyRainList}
                hourlyProbList={hourlyProbList}
                hourlyTempList={hourlyTempList}
                hourlyWeatherCodeList={hourlyWeatherCodeList}
                liveTemp={liveTemp}
                liveWeatherCode={liveWeatherCode}
                liveHumidity={liveHumidity}
                liveWindSpeed={liveWindSpeed}
                t={t}
                aiStatus={aiStatus}
                showToast={showToast}
                soundBeep={soundBeep}
                activeMissions={activeMissions}
                setAppPhase={setAppPhase}
                setShowHazardModal={setShowHazardModal}
                setShowJkmModal={setShowJkmModal}
                isSirenActive={isSirenActive}
                isLeveeDamDeployed={isLeveeDamDeployed}
                setIsSirenActive={setIsSirenActiveWithSync}
                setIsLeveeDamDeployed={setIsLeveeDamDeployedWithSync}
                systemRed={systemRed}
                systemAmber={systemAmber}
                systemGreen={systemGreen}
                visualTab={visualTab}
                chartDisplayMode={chartDisplayMode}
                setChartDisplayMode={setChartDisplayMode}
                currentPoint={currentPoint}
                currentImpact={currentImpact}
                setAuthError={setAuthError}
                setShowAdminPin={setShowAdminPin}
                myActiveSos={myActiveSos}
                user={user}
                acceptingId={acceptingId}
                profileName={profileName}
                scrubHour={scrubHour}
                setScrubHour={setScrubHour}
              />
            )}

            {activeTab === 'map' && (
              <MobileMapPage
                isDarkMode={isDarkMode}
                currentLocation={currentLocation}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                t={t}
                baseShelters={baseShelters}
                simulateStorm={simulateStorm}
                rainfall={rainfall}
                riverLevel={riverLevel}
                mapSearchQuery={mapSearchQuery}
                setMapSearchQuery={setMapSearchQuery}
                interactiveMapShelterId={interactiveMapShelterId}
                setInteractiveMapShelterId={setInteractiveMapShelterId}
                mapSearchResults={mapSearchResults}
                setMapSearchResults={setMapSearchResults}
                setCurrentLocation={setCurrentLocation}
                setCurrentCoords={setCurrentCoords}
                setLocationMode={setLocationMode}
                setShowHazardModal={setShowHazardModal}
                showCycloneOverlay={showCycloneOverlay}
                setShowCycloneOverlay={setShowCycloneOverlay}
                travelMode={travelMode}
                setTravelMode={setTravelMode}
                showAllCentersOnMap={showAllCentersOnMap}
                setShowAllCentersOnMap={setShowAllCentersOnMap}
                handleStartNavigation={handleStartNavigation}
                showRouteSteps={showRouteSteps}
                setShowRouteSteps={setShowRouteSteps}
                shelterTagFilter={shelterTagFilter}
                setShelterTagFilter={setShelterTagFilter}
                getShelterOccupancy={getShelterOccupancy}
                showToast={showToast}
                isVolunteerMode={isVolunteerMode}
                isSirenActive={isSirenActive}
                isLeveeDamDeployed={isLeveeDamDeployed}
                sosRequests={sosRequests}
                activeMissions={activeMissions}
                myActiveSosRequest={myActiveSos}
                citizens={citizens}
                soundBeep={soundBeep}
                mapViewType={mapViewType}
                aiStatus={aiStatus}
                appPhase={appPhase}
                currentCoords={currentCoords}
                activeShelter={activeShelter}
                showHazardsOverlay={showHazardsOverlay}
                globalHazards={globalHazards}
                isSearchingMap={isSearchingMap}
                addLog={addLog}
                triggerSos={triggerSos}
                getTravelTime={getTravelTime}
              />
            )}

            {activeTab === 'community' && (
              <MobileCommunityPage
                isDarkMode={isDarkMode}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                t={t}
                selectedCommunityId={selectedCommunityId}
                setSelectedCommunityId={setSelectedCommunityId}
                selectedDetailTab={selectedDetailTab}
                setSelectedDetailTab={setSelectedDetailTab}
                myCommunitiesSubTab={myCommunitiesSubTab}
                setMyCommunitiesSubTab={setMyCommunitiesSubTab}
                newPostText={newPostText}
                setNewPostText={setNewPostText}
                newPostImage={newPostImage}
                setNewPostImage={setNewPostImage}
                handleCommunityImage={handleCommunityImage}
                composerCommunityId={composerCommunityId}
                setComposerCommunityId={setComposerCommunityId}
                handlePostCommunity={handlePostCommunity}
                handleToggleUpvote={handleToggleUpvote}
                handleDeletePost={handleDeletePost}
                communityDetailsAccordionOpen={communityDetailsAccordionOpen}
                setCommunityDetailsAccordionOpen={setCommunityDetailsAccordionOpen}
                handleCommunityCheckin={handleCommunityCheckin}
                mutualAidLedger={mutualAidLedger}
                setMutualAidLedger={setMutualAidLedger}
                newAidType={newAidType}
                setNewAidType={setNewAidType}
                newAidItem={newAidItem}
                setNewAidItem={setNewAidItem}
                newAidLoc={newAidLoc}
                setNewAidLoc={setNewAidLoc}
                newAidDesc={newAidDesc}
                setNewAidDesc={setNewAidDesc}
                handleAddAidLedgerItem={handleAddAidLedgerItem}
                communityPosts={communityPosts}
                showToast={showToast}
                profileName={profileName}
                fetchLiveLocation={fetchLiveLocation}
                currentLocation={currentLocation}
                ALL_COMMUNITIES={ALL_COMMUNITIES}
                SEED_POSTS={SEED_POSTS}
                deletedPostIds={deletedPostIds}
                upvotedPostIds={upvotedPostIds}
                user={user}
                isAdmin={isAdmin}
                communityCheckinStats={communityCheckinStats}
                userCheckinStates={userCheckinStates}
              />
            )}

            {activeTab === 'alerts' && (
              <MobileAlertsPage
                isDarkMode={isDarkMode}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                t={t}
                sosRequests={sosRequests}
                isGeneratingPlan={isGeneratingPlan}
                handleGenerateActionPlan={handleGenerateActionPlan}
                handleListenToSatLinkVoice={handleListenToSatLinkVoice}
                handleQuickQuestion={handleQuickQuestion}
                residentActionPlan={residentActionPlan}
                checkedCount={checkedCount}
                checklist={checklist}
                toggleCheck={toggleCheck}
                isPlayingAudio={isPlayingAudio}
                isPreparingVoice={isPreparingVoice}
                globalAlerts={visibleAlerts}
                dynamicAccentColor={dynamicAccentColor}
                aiStatus={aiStatus}
                currentLocation={currentLocation}
                timeToCritical={timeToCritical}
                onDismissAlert={handleDismissAlert}
              />
            )}

            {activeTab === 'settings' && (
              <MobileSettingsPage
                isDarkMode={isDarkMode}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                t={t}
                currentLocation={currentLocation}
                profileName={profileName}
                profileEmail={profileEmail}
                profileCountry={profileCountry}
                profilePhone={profilePhone}
                profileAvatar={profileAvatar}
                setTempProfileName={setTempProfileName}
                setTempProfileEmail={setTempProfileEmail}
                setTempProfileCountry={setTempProfileCountry}
                setTempProfilePhone={setTempProfilePhone}
                setTempProfileAvatar={setTempProfileAvatar}
                setShowProfileEditModal={setShowProfileEditModal}
                locationMode={locationMode}
                setLocationMode={setLocationMode}
                fetchLiveLocation={fetchLiveLocation}
                setShowLocationModal={setShowLocationModal}
                handleLogout={handleLogout}
                isSirenActive={isSirenActive}
                isLeveeDamDeployed={isLeveeDamDeployed}
                setIsSirenActiveWithSync={setIsSirenActiveWithSync}
                setIsLeveeDamDeployedWithSync={setIsLeveeDamDeployedWithSync}
                setAuthError={setAuthError}
                setShowAdminPin={setShowAdminPin}
                simulateStorm={simulateStorm}
                rainfall={rainfall}
                riverLevel={riverLevel}
                showToast={showToast}
                soundBeep={soundBeep}
                language={language}
                setLanguage={setLanguage}
                systemRed={systemRed}
                systemAmber={systemAmber}
                systemGreen={systemGreen}
                changeLanguage={changeLanguage}
                themeMode={themeMode}
                changeThemeMode={changeThemeMode}
                toggleNotifications={toggleNotifications}
                notificationsEnabled={notificationsEnabled}
                toggleSimulateStorm={toggleSimulateStorm}
              />
            )}

            <div className="absolute bottom-6 left-4 right-4 z-[80] animate-[fadeInUp_0.8s_ease-out]">
              <div
                ref={tabBarRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`relative grid grid-cols-5 gap-1 px-3 py-2.5 rounded-[32px] shadow-2xl border ${glassCardClass} ${isDarkMode ? 'border-white/10 !bg-[#121214]/95' : 'border-black/5 !bg-white/95'} backdrop-blur-3xl select-none touch-none ${isSliding ? 'cursor-grabbing' : 'cursor-grab'}`}
              >

                {/* Single persistent sliding Liquid Glass Indicator */}
                <motion.div
                  className="absolute top-2.5 bottom-2.5 rounded-[20px] -z-10"
                  animate={{
                    x: `${['home', 'map', 'community', 'alerts', 'settings'].indexOf(visualTab) * 100}%`,
                    scaleX: isSliding ? 1.08 : 1.00,
                    scaleY: isSliding ? 0.94 : 1.00,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: isSliding ? 450 : 330,
                    damping: isSliding ? 27 : 23,
                    mass: 0.66
                  }}
                  style={{
                    width: 'calc((100% - 24px) / 5)', // PX-3 padding is 12px * 2 = 24px
                    left: '12px', // matches PX-3 padding
                    background: isDarkMode
                      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 100%)'
                      : 'linear-gradient(180deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.02) 100%)',
                    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(0, 0, 0, 0.09)',
                    boxShadow: isDarkMode
                      ? 'inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 8px 18px rgba(0, 0, 0, 0.45), 0 0 16px rgba(255, 255, 255, 0.03)'
                      : 'inset 0 1px 2px rgba(255, 255, 255, 0.75), 0 8px 18px rgba(0, 0, 0, 0.07), 0 0 16px rgba(0, 0, 0, 0.01)'
                  }}
                >
                  <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/14 to-transparent pointer-events-none" />
                </motion.div>

                {/* Home Tab Button */}
                <button onClick={() => handleTabChange('home')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <Home size={22} strokeWidth={visualTab === 'home' ? 2.5 : 2} style={{ color: visualTab === 'home' ? dynamicAccentColor : undefined }} className={`${visualTab === 'home' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'home' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'home' ? dynamicAccentColor : undefined }}>{t.home}</span>
                </button>

                {/* Map Tab Button */}
                <button onClick={() => handleTabChange('map')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <MapIcon size={22} strokeWidth={visualTab === 'map' ? 2.5 : 2} style={{ color: visualTab === 'map' ? dynamicAccentColor : undefined }} className={`${visualTab === 'map' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'map' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'map' ? dynamicAccentColor : undefined }}>{t.map}</span>
                </button>

                {/* Community Tab Button */}
                <button onClick={() => handleTabChange('community')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <MessageSquare size={22} strokeWidth={visualTab === 'community' ? 2.5 : 2} style={{ color: visualTab === 'community' ? dynamicAccentColor : undefined }} className={`${visualTab === 'community' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'community' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'community' ? dynamicAccentColor : undefined }}>Comm</span>
                </button>

                {/* Alerts Tab Button */}
                <button onClick={() => handleTabChange('alerts')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <div className="relative">
                    <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-[1.5px] transition-all ${hasUnreadAlerts ? 'scale-100 animate-pulse' : 'scale-0'} ${isDarkMode ? 'border-[#121214]' : 'border-white'}`} style={{ backgroundColor: systemRed }}></div>
                    <Bell size={22} strokeWidth={visualTab === 'alerts' ? 2.5 : 2} style={{ color: visualTab === 'alerts' ? dynamicAccentColor : undefined }} className={`${visualTab === 'alerts' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  </div>
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'alerts' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'alerts' ? dynamicAccentColor : undefined }}>{t.alerts}</span>
                </button>

                {/* Settings Tab Button */}
                <button onClick={() => handleTabChange('settings')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <Settings size={22} strokeWidth={visualTab === 'settings' ? 2.5 : 2} style={{ color: visualTab === 'settings' ? dynamicAccentColor : undefined }} className={`${visualTab === 'settings' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'settings' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'settings' ? dynamicAccentColor : undefined }}>{t.settings}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(50,215,75,0.3); border-radius: 4px; }
        
        .timeline-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: rgba(128, 128, 128, 0.25);
          border-radius: 4px;
          outline: none;
        }
        .timeline-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: var(--thumb-color, #0A84FF);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), inset 0 2px 3px rgba(255, 255, 255, 0.4);
          cursor: grab;
          transition: transform 0.1s, background-color 0.3s;
        }
        .timeline-slider::-webkit-slider-thumb:active {
          transform: scale(1.15);
          cursor: grabbing;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes loadingBar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 70%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(100%); }
        }
        @keyframes backgroundRainfall {
          0% { transform: translateY(-10%) rotate(15deg); }
          100% { transform: translateY(120vh) rotate(15deg); }
        }
      `}</style>
    </div>
  );
}
```

## File: src/constants.ts
```typescript
export const i18n = {
  en: {
    appTitle: "FloodCast", subtitle: "Early Warning System",
    home: "Home", map: "Map", community: "Community", alerts: "Alerts", settings: "Settings",
    safe: "SAFE", warning: "WARNING", critical: "CRITICAL",
    safeDesc: "Normal conditions. No flood risk detected.",
    warnDesc: "Water levels rising. Prepare for potential alerts.",
    critDesc: "LEVEL 3: IMMINENT EVACUATION. PROCEED TO SHELTER IMMEDIATELY.",
    radarSys: "Evac Radar System", navTo: "Nav to", sos: "S.O.S EMERGENCY", sosSent: "SIGNAL BROADCASTED", sosDispatched: "RESCUE IS ON THE WAY!",
    demoMode: "System Overrides (FYP Demo)", simStorm: "Simulate Storm", simRecovery: "Simulate Recovery Phase", fetchLoc: "Location",
    prefs: "Preferences", darkMode: "Dark Mode", pushAlerts: "Push Alerts", lang: "Language (BM/EN/CN)", logout: "Log Out",
    latency: "Latency", rawDepth: "Raw Depth", hardwareStatus: "Hardware Telemetry",
    evacNow: "EVACUATE NOW.", criticalMsg: "Critical overflow in", proceedShelter: "Proceed immediately to designated shelters.",
    volunteerMode: "Volunteer Responder Mode", activeMissions: "Active Rescue Missions", acceptTask: "Accept & Navigate",
    shelterFull: "SHELTER FULL", rerouting: "Rerouting to nearest available shelter...",
    checklistTitle: "Go-Bag", checkDoc: "ID & Docs", checkMed: "Meds & Care", checkPower: "Powerbank", checkFlash: "Flashlight", checkWater: "Water & Food", packed: "Packed",
    rainLabel: "Rainfall", riverLabel: "River Level", evacNotReq: "Evac Not Required", viewRoutes: "View Safe Routes",
    postCommunity: "Share an update with your zone...", postBtn: "Post"
  },
  ms: {
    appTitle: "Sistem FloodCast", subtitle: "Sistem Amaran Awal",
    home: "Utama", map: "Peta", community: "Komuniti", alerts: "Amaran", settings: "Tetapan",
    safe: "SELAMAT", warning: "WASPADA", critical: "BAHAYA",
    safeDesc: "Keadaan normal. Tiada risiko banjir dikesan.",
    warnDesc: "Paras air meningkat. Bersedia untuk amaran.",
    critDesc: "TAHAP 3: PEMINDAHAN SEGERA. PERGI KE PUSAT PEMINDAHAN.",
    radarSys: "Sistem Radar Pemindahan", navTo: "Navigasi", sos: "KECEMASAN S.O.S", sosSent: "ISYARAT DIHANTAR", sosDispatched: "BANTUAN DALAM PERJALANAN!",
    demoMode: "Kawalan Sistem (Demo FYP)", simStorm: "Simulasi Ribut", simRecovery: "Simulasi Fasa Pemulihan", fetchLoc: "Lokasi",
    prefs: "Tetapan", darkMode: "Mod Gelap", pushAlerts: "Notifikasi Amaran", lang: "Bahasa (BM/EN/CN)", logout: "Log Keluar",
    latency: "Kependaman", rawDepth: "Kedalaman", hardwareStatus: "Telemetri Perkakasan",
    evacNow: "PINDAH SEKARANG.", criticalMsg: "Banjir kritikal dalam", proceedShelter: "Pergi ke pusat pemindahan segera.",
    volunteerMode: "Mod Sukarelawan", activeMissions: "Misi Menyelamat Aktif", acceptTask: "Terima & Arah Bantuan",
    shelterFull: "PUSAT PENUH", rerouting: "Mencari pusat pemindahan alternatif...",
    checklistTitle: "Beg Kecemasan", checkDoc: "Pasport & IC", checkMed: "Ubat & Peti", checkPower: "Powerbank", checkFlash: "Lampu Suluh", checkWater: "Air & Makanan", packed: "Selesai",
    rainLabel: "Hujan", riverLabel: "Paras Air", evacNotReq: "Selamat", viewRoutes: "Lihat Laluan",
    postCommunity: "Kongsi maklumat dengan zon anda...", postBtn: "Hantar"
  },
  cn: {
    appTitle: "FloodCast", subtitle: "早期预警系统",
    home: "主页", map: "地图", community: "社区", alerts: "警报", settings: "设置",
    safe: "安全", warning: "警告", critical: "危险",
    safeDesc: "状况正常。未检测到洪水风险。",
    warnDesc: "水位上升。请为潜在警报做好准备。",
    critDesc: "3级：即将撤离。请立即前往避难所。",
    radarSys: "撤离雷达系统", navTo: "导航至", sos: "S.O.S 紧急情况", sosSent: "信号已发送", sosDispatched: "救援已在路上！",
    demoMode: "系统覆盖 (FYP 演示)", simStorm: "模拟风暴", simRecovery: "模拟恢复阶段", fetchLoc: "位置",
    prefs: "偏好设置", darkMode: "深色模式", pushAlerts: "推送警报", lang: "语言 (BM/EN/CN)", logout: "登出",
    latency: "延迟", rawDepth: "原始深度", hardwareStatus: "硬件遥测",
    evacNow: "立即撤离。", criticalMsg: "严重溢出剩余", proceedShelter: "请立即前往指定的避难所。",
    volunteerMode: "志愿者响应模式", activeMissions: "活跃的救援任务", acceptTask: "接受并导航",
    shelterFull: "避难所已满", rerouting: "正在重新规划至最近的可用避难所...",
    checklistTitle: "应急包", checkDoc: "证件与文档", checkMed: "急救药品", checkPower: "充电宝", checkFlash: "手电筒", checkWater: "饮水食物", packed: "已打包",
    rainLabel: "降雨量", riverLabel: "水位", evacNotReq: "无需撤离", viewRoutes: "查看安全路线",
    postCommunity: "与您所在区域分享更新...", postBtn: "发布"
  }
};

export const baseShelters = [
  { id: 'kotadamansara', name: 'PPS Dewan MBPJ Kota Damansara', zone: 'SEGi University Kota Damansara', distance: '0.4 KM', time: 'Est. 1 min', address: 'Jalan Teknologi, PJU 5, Kota Damansara, PJ', maxCapacity: 550, x: 44, y: 44 },
  { id: 'petalingjaya', name: 'PPS Dewan MBPJ Seksyen 7', zone: 'Petaling Jaya', distance: '12.5 KM', time: 'Est. 16 mins', address: 'Petaling Jaya West', maxCapacity: 600, x: 35, y: 65 },
  { id: 'subangjaya', name: 'PPS Dewan MPSJ SS15', zone: 'Subang Jaya', distance: '14.5 KM', time: 'Est. 18 mins', address: 'Subang Jaya Sector', maxCapacity: 700, x: 32, y: 72 },
  { id: 'kualalumpur', name: 'PPS Dewan Komuniti KL', zone: 'Kuala Lumpur', distance: '20.2 KM', time: 'Est. 25 mins', address: 'Kuala Lumpur Central', maxCapacity: 1000, x: 55, y: 55 },
  { id: 'shahalam', name: 'PPS Dewan MBSA Seksyen 4', zone: 'Shah Alam', distance: '20.8 KM', time: 'Est. 24 mins', address: 'Dewan MBSA Seksyen 4, Shah Alam', maxCapacity: 800, x: 30, y: 70 },
  { id: 'batucaves', name: 'PPS Dewan Beringin', zone: 'Batu Caves', distance: '21.5 KM', time: 'Est. 22 mins', address: 'Batu Caves, Selangor', maxCapacity: 350, x: 50, y: 50 },
  { id: 'klang', name: 'PPS MPK Klang', zone: 'Klang', distance: '29.2 KM', time: 'Est. 32 mins', address: 'Klang, Selangor', maxCapacity: 400, x: 15, y: 85 },
  { id: 'rawang', name: 'PPS SMK Seri Garing', zone: 'Rawang', distance: '30.5 KM', time: 'Est. 30 mins', address: 'SMK Seri Garing, Rawang', maxCapacity: 500, x: 45, y: 40 },
  { id: 'huluselangor', name: 'PPS SK Bukit Beruntung', zone: 'Hulu Selangor', distance: '43.5 KM', time: 'Est. 38 mins', address: 'Bukit Beruntung', maxCapacity: 600, x: 40, y: 25 },
  { id: 'johorbahru', name: 'PPS Dewan MBJB Taman Johor', zone: 'Johor Bahru', distance: '340 KM', time: 'Est. 3 hrs 35 mins', address: 'Johor Bahru Straits', maxCapacity: 750, x: 75, y: 90 },
  { id: 'penang', name: 'PPS Dewan JKKK George Town', zone: 'Penang', distance: '348 KM', time: 'Est. 3 hrs 45 mins', address: 'Penang Island Delta', maxCapacity: 500, x: 25, y: 15 }
];

export const mockCitizens = [
  { id: 'UID-001', name: 'Ahmad bin Yusuf', phone: '+60 12-345 6789', zone: 'Rawang', status: 'SAFE', ping: '2 mins ago' },
  { id: 'UID-002', name: 'Mei Ling', phone: '+60 17-987 6543', zone: 'Shah Alam', status: 'EVACUATED', ping: '1 hr ago' },
  { id: 'UID-003', name: 'Siti Nurhaliza', phone: '+60 11-112 2334', zone: 'Rawang', status: 'SOS PENDING', ping: 'Just now' },
  { id: 'UID-004', name: 'John Doe', phone: '+60 19-888 7777', zone: 'Klang', status: 'SAFE', ping: '5 mins ago' },
  { id: 'UID-005', name: 'Ali Rahman', phone: '+60 13-444 5555', zone: 'Hulu Selangor', status: 'SAFE', ping: '10 mins ago' },
  { id: 'UID-006', name: 'Wong Kah Wei', phone: '+60 16-222 3333', zone: 'Klang', status: 'SAFE', ping: '15 mins ago' },
  { id: 'UID-007', name: 'Raju Subramaniam', phone: '+60 14-999 8888', zone: 'Batu Caves', status: 'EVACUATED', ping: '2 hrs ago' },
  { id: 'UID-008', name: 'Fatimah Awang', phone: '+60 19-383 4901', zone: 'Shah Alam', status: 'SAFE', ping: 'Just now' },
  { id: 'UID-009', name: 'Tan Kah Kee', phone: '+60 11-2345 6789', zone: 'Kuala Lumpur', status: 'SAFE', ping: '8 mins ago' },
  { id: 'UID-010', name: 'Lim Goh Tong', phone: '+60 17-555 4433', zone: 'Petaling Jaya', status: 'SAFE', ping: '12 mins ago' },
  { id: 'UID-011', name: 'Aswad bin Bakri', phone: '+60 19-223 4455', zone: 'Subang Jaya', status: 'SAFE', ping: '14 mins ago' },
  { id: 'UID-012', name: 'Lee Chong Wei', phone: '+60 12-888 9999', zone: 'Penang', status: 'SAFE', ping: '20 mins ago' },
  { id: 'UID-013', name: 'Siti Saleha', phone: '+60 13-777 6655', zone: 'Johor Bahru', status: 'SAFE', ping: '30 mins ago' }
];
```

## File: src/index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
@import "tailwindcss";

:root {
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-display: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

.animate-scan {
  animation: scan 6s linear infinite;
}

@keyframes emergency-blink {

  0%,
  100% {
    border-color: #FF453A;
    box-shadow: inset 0 0 24px rgba(255, 69, 58, 0.8), 0 0 30px rgba(255, 69, 58, 0.5);
  }

  50% {
    border-color: transparent;
    box-shadow: inset 0 0 4px rgba(255, 69, 58, 0.15), 0 0 4px transparent;
  }
}

.animate-emergency-blink {
  animation: emergency-blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes scan {
  0% {
    transform: translateY(-50%);
  }

  100% {
    transform: translateY(200%);
  }
}

/* Disable hover scaling/transforms in simulated mobile interface to prevent un-native desktop mouse hover popped effects, except when active (clicking/tapping) */
@media (hover: hover) {
  .mobile-app-container *:hover:not(:active) {
    transform: none !important;
  }
}
```

## File: src/main.tsx
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

## File: src/types.ts
```typescript
export interface Shelter {
  id: string;
  name: string;
  zone: string;
  distance: string;
  time: string;
  address: string;
  maxCapacity: number;
  x: number;
  y: number;
}

export interface Citizen {
  id: string;
  name: string;
  phone: string;
  zone: string;
  status: string;
  ping: string;
}

export interface CommunityPost {
  id: string;
  text?: string;
  image?: string | null;
  authorId: string;
  authorName: string;
  timestamp: any;
  zone: string;
}

export interface SosRequest {
  id: string;
  zone: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
  status: string;
  userId: string;
  volunteerId?: string;
  acceptedAt?: any;
  timestamp: any;
}

export interface Hazard {
  id: string;
  zone: string;
  type: string;
  severity: string;
  description: string;
  x: number;
  y: number;
  timestamp: any;
  reporter_id: string;
}

export interface Alert {
  id: string;
  zone: string;
  type: string;
  message: string;
  timestamp: any;
  status: string;
  admin_id: string;
}

export interface ChecklistItem {
  id: number;
  key: string;
  checked: boolean;
}
```

## File: src/vite-env.d.ts
```typescript
/// <reference types="vite/client" />
```

## File: .env.example
```
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"
```

## File: .gitignore
```
node_modules/
coverage/
.DS_Store
*.log
.env*
!.env.example
```

## File: firebase-applet-config.json
```json
{
  "apiKey": "AIzaSyA5BXzwFMnnTLCU_Zf7PPtw0gNWmkkJmaE",
  "authDomain": "floodguard-system.firebaseapp.com",
  "projectId": "floodguard-system",
  "storageBucket": "floodguard-system.firebasestorage.app",
  "messagingSenderId": "1074023579015",
  "appId": "1:1074023579015:web:fd91f70de631183d39e722",
  "measurementId": "G-S0GD0N0QB2"
}
```

## File: firebase-blueprint.json
```json
{
  "entities": {
    "UserProfile": {
      "title": "User Profile",
      "description": "User preferences and emergency checklist packages.",
      "type": "object",
      "properties": {
        "checklist": {
          "type": "array",
          "description": "List of checked emergency item structures."
        },
        "language": {
          "type": "string",
          "description": "User chosen UI language (en, ms, cn)."
        },
        "isDarkMode": {
          "type": "boolean",
          "description": "Dark mode styling theme preference."
        }
      }
    },
    "BroadcastAlert": {
      "title": "Broadcast Alert",
      "description": "Broadcasting critical emergency info from command center.",
      "type": "object",
      "properties": {
        "zone": { "type": "string" },
        "type": { "type": "string" },
        "message": { "type": "string" },
        "timestamp": { "type": "string", "format": "date-time" },
        "status": { "type": "string" },
        "admin_id": { "type": "string" }
      },
      "required": ["zone", "type", "message", "timestamp", "status", "admin_id"]
    },
    "Hazard": {
      "title": "Hazard",
      "description": "Citizen filed hazard report location overlay.",
      "type": "object",
      "properties": {
        "zone": { "type": "string" },
        "type": { "type": "string" },
        "severity": { "type": "string" },
        "description": { "type": "string" },
        "x": { "type": "number" },
        "y": { "type": "number" },
        "timestamp": { "type": "string", "format": "date-time" },
        "reporter_id": { "type": "string" }
      },
      "required": ["zone", "type", "severity", "description", "x", "y", "timestamp", "reporter_id"]
    },
    "CommunityPost": {
      "title": "Community Post",
      "description": "Citizen public board query update entries.",
      "type": "object",
      "properties": {
        "text": { "type": "string" },
        "image": { "type": "string" },
        "authorId": { "type": "string" },
        "authorName": { "type": "string" },
        "timestamp": { "type": "string", "format": "date-time" },
        "zone": { "type": "string" }
      },
      "required": ["text", "authorId", "authorName", "timestamp", "zone"]
    },
    "SosRequest": {
      "title": "Sos Request",
      "description": "Emergency high-priority beacon response flow.",
      "type": "object",
      "properties": {
        "zone": { "type": "string" },
        "lat": { "type": "number" },
        "lon": { "type": "number" },
        "x": { "type": "number" },
        "y": { "type": "number" },
        "status": { "type": "string" },
        "userId": { "type": "string" },
        "timestamp": { "type": "string", "format": "date-time" },
        "dispatchedAt": { "type": "string", "format": "date-time" },
        "volunteerId": { "type": "string" },
        "acceptedAt": { "type": "string", "format": "date-time" },
        "updatedAt": { "type": "string", "format": "date-time" }
      },
      "required": ["zone", "lat", "lon", "status", "userId", "timestamp"]
    },
    "Shelter": {
      "title": "Shelter",
      "description": "Dynamic capacity statuses overlay for shelters.",
      "type": "object",
      "properties": {
        "isFull": { "type": "boolean" }
      },
      "required": ["isFull"]
    }
  },
  "firestore": {
    "/artifacts/{appId}/users/{userId}/profile/{docId}": {
      "schema": "UserProfile",
      "description": "Saves specific user state configuration details."
    },
    "/artifacts/{appId}/public/data/broadcast_alerts/{alertId}": {
      "schema": "BroadcastAlert",
      "description": "Saves incoming emergency broadcasts alerts."
    },
    "/artifacts/{appId}/public/data/hazards/{hazardId}": {
      "schema": "Hazard",
      "description": "Saves citizen submitted hazard listings details."
    },
    "/artifacts/{appId}/public/data/community_posts/{postId}": {
      "schema": "CommunityPost",
      "description": "Saves public neighborhood community post records."
    },
    "/artifacts/{appId}/public/data/sos_requests/{sosId}": {
      "schema": "SosRequest",
      "description": "Saves life safety SOS emergency beacons tracking."
    },
    "/artifacts/{appId}/public/data/shelters/{shelterId}": {
      "schema": "Shelter",
      "description": "Dynamic occupancy overrides mapping for designated PPS shelters."
    }
  }
}
```

## File: firestore.rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isSignedIn() && 
             request.auth.token.email == "junjie050506@gmail.com";
    }

    function incoming() {
      return request.resource.data;
    }

    function existing() {
      return resource.data;
    }

    // Validation Blueprints
    function isValidUserProfile(data) {
      return (data.checklist is list || !data.keys().hasAny(['checklist'])) &&
             (data.language is string && data.language.size() <= 10 || !data.keys().hasAny(['language'])) &&
             (data.isDarkMode is bool || !data.keys().hasAny(['isDarkMode']));
    }

    function isValidBroadcastAlert(data) {
      return data.keys().hasAll(['zone', 'type', 'message', 'status', 'admin_id']) &&
             data.zone is string && data.zone.size() <= 100 &&
             data.type is string && data.type.size() <= 100 &&
             data.message is string && data.message.size() <= 1000 &&
             data.status is string && data.status.size() <= 50 &&
             data.admin_id is string && data.admin_id.size() <= 128;
    }

    function isValidHazard(data) {
      return data.keys().hasAll(['zone', 'type', 'severity', 'description', 'x', 'y', 'reporter_id']) &&
             data.zone is string && data.zone.size() <= 100 &&
             data.type is string && data.type.size() <= 100 &&
             data.severity is string && data.severity.size() <= 50 &&
             data.description is string && data.description.size() <= 1000 &&
             data.x is number && data.y is number &&
             data.reporter_id is string && data.reporter_id.size() <= 128;
    }

    function isValidCommunityPost(data) {
      return data.keys().hasAll(['text', 'authorId', 'authorName', 'zone']) &&
             data.text is string && data.text.size() <= 5000 &&
             (data.image == null || data.image is string && data.image.size() <= 3000000 || !data.keys().hasAny(['image'])) &&
             data.authorId is string && data.authorId.size() <= 128 &&
             data.authorName is string && data.authorName.size() <= 100 &&
             data.zone is string && data.zone.size() <= 100;
    }

    function isValidSosRequest(data) {
      return data.keys().hasAll(['zone', 'lat', 'lon', 'status', 'userId']) &&
             data.zone is string && data.zone.size() <= 100 &&
             data.lat is number && data.lon is number &&
             data.status is string && data.status.size() <= 50 &&
             data.userId is string && data.userId.size() <= 128;
    }

    function isValidShelter(data) {
      return data.keys().hasAll(['isFull']) &&
             data.isFull is bool;
    }

    // Global Safety Net
    match /{document=**} {
      allow read, write: if false;
    }

    match /artifacts/{appId} {
      // User profiles subcollection
      match /users/{userId}/profile/{docId} {
        allow read: if isOwner(userId);
        allow create, update: if isOwner(userId) && isValidUserProfile(incoming());
        allow delete: if isOwner(userId);
      }

      // Public data nested subcollection details
      match /public/data/broadcast_alerts/{alertId} {
        allow read: if true;
        allow create: if (isAdmin() || isSignedIn()) && isValidBroadcastAlert(incoming());
        allow update, delete: if (isAdmin() || isSignedIn());
      }

      match /public/data/hazards/{hazardId} {
        allow read: if true;
        allow create: if isSignedIn() && isValidHazard(incoming()) && incoming().reporter_id == request.auth.uid;
        allow update, delete: if (isAdmin() || (isSignedIn() && existing().reporter_id == request.auth.uid));
      }

      match /public/data/community_posts/{postId} {
        allow read: if true;
        allow create: if isSignedIn() && isValidCommunityPost(incoming()) && incoming().authorId == request.auth.uid;
        allow update, delete: if (isAdmin() || (isSignedIn() && existing().authorId == request.auth.uid));
      }

      match /public/data/sos_requests/{sosId} {
        allow read: if isSignedIn();
        allow create: if isSignedIn() && isValidSosRequest(incoming()) && incoming().userId == request.auth.uid;
        allow update: if isSignedIn() && (
                        isAdmin() || 
                        existing().userId == request.auth.uid || 
                        incoming().volunteerId == request.auth.uid ||
                        existing().volunteerId == request.auth.uid
                      );
        allow delete: if (isAdmin() || isSignedIn());
      }

      match /public/data/shelters/{shelterId} {
        allow read: if true;
        allow create, update, delete: if (isSignedIn() || isAdmin());
      }
    }
  }
}
```

## File: index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FloodCast - Early Warning System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: metadata.json
```json
{
  "name": "FloodCast",
  "description": "Project FloodCast: A High-Frequency Climatology Pipeline for Advanced Risk Mitigation.",
  "requestFramePermissions": [
    "geolocation"
  ],
  "majorCapabilities": [
    "MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"
  ]
}
```

## File: package.json
```json
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.1.14",
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.4",
    "dotenv": "^17.2.3",
    "esbuild": "^0.25.0",
    "express": "^4.21.2",
    "firebase": "^12.13.0",
    "jspdf": "^4.2.1",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.21",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0"
  }
}
```

## File: README.md
```markdown
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/9a17fcf1-5e21-4840-9954-265ac1496429

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
```

## File: server.ts
```typescript
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: ".env.APIkey" });

const app = express();
const PORT = 3000;

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: External satellite link key is not set. Some telemetry features may not function properly.");
}

const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Use larger limits for vision base64 payloads to prevent payload too large errors
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Helper to generate a realistic fallback contextual response for Safety Advisor when API limits are reached / keys are invalid
function generateFallbackResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  const isDrivingQuery = lowerPrompt.includes("driving") || lowerPrompt.includes("sedans") || lowerPrompt.includes("sedan") || lowerPrompt.includes("car") || lowerPrompt.includes("vehicle");
  const isEmergencyQuery = lowerPrompt.includes("peaks") || lowerPrompt.includes("first") || lowerPrompt.includes("emergency");
  
  // Find location if specified
  let location = "your area";
  const locMatch = prompt.match(/in\s+([^.]+)\./i);
  if (locMatch && locMatch[1]) {
    location = locMatch[1].trim();
  }

  // Determine severity
  const isSevere = lowerPrompt.includes("severe") || lowerPrompt.includes("critical") || lowerPrompt.includes("emergency") || lowerPrompt.includes("danger");
  const isWatch = lowerPrompt.includes("watch") || lowerPrompt.includes("hazard") || lowerPrompt.includes("elevated");
  
  if (isDrivingQuery) {
    return `• DO NOT DRIVE: Sedans must never drive in floodwaters. Even 15cm (6 in) of water can cause stalling and loss of traction.\n• SWIFT WATER RISK: Flowing water at 30cm (12 in) can float or sweep away subcompacts and passenger vehicles easily.\n• SAFETY MEASURE: Turn around, don't drown! Park your vehicle on safe elevated ground immediately and remain inside.`;
  }
  
  if (isEmergencyQuery) {
    return `• MONITOR GAUGES: Keep track of live river level alerts and radio communication channels continuously.\n• SAFEGUARD ASSETS: Relocate primary electronics, medical kits, and vital papers to upstairs rooms or highest locations.\n• ESCAPE ROUTE: Familiarize yourself with local high-altitude community evacuation shelters and secure family contact channels.`;
  }
  
  if (isSevere) {
    return `• EVACUATE IMMEDIATELY: Pack water, prescriptions, and basic necessities, then proceed directly to designated high grounds.\n• SECURE UTILITIES: Turn off major electrical switches and your main gas control before leaving your homestead.\n• CALL RESCUE: If water blocks egress, ascend to your roof showing bright markers (flashlights or high-vis apparel) for rescuers.`;
  }
  
  if (isWatch) {
    return `• ELEVATE ITEMS: Arrange valuable appliances and floor-level items on high cabinets or secondary floors.\n• SAFE PARKING: Move vehicles and sedans from flood-threatened alleys to elevated structures or nearby multi-story decks.\n• STANDBY MODE: Fully charge battery packs and mobile devices, and standby for local sirens or sirens from warning vessels.`;
  }

  // General safe status fallback
  return `• BE PREPARED: Verify your emergency checklist items, clean batteries, and place fully charged lights nearby.\n• WATCH WEATHER: Follow local river level changes in ${location} and stay updated on the upcoming municipal forecasts.\n• CHANNEL CLEARING: Clear neighborhood curbside drains of leaves and trash to enable rapid street pooling drain-off.`;
}

// API routes FIRST
app.post("/api/satlink/forecast", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const isRealApiKey = apiKey && apiKey.trim() !== "" && apiKey !== "MY_GEMINI_API_KEY";
    if (!isRealApiKey) {
      console.log("No valid satellite credentials detected. Utilizing hyper-realistic contextual safety advisor fallback.");
      return res.json({ text: generateFallbackResponse(prompt) });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      res.json({ text: response.text });
    } catch (apiErr: any) {
      const errStr = String(apiErr?.message || apiErr);
      if (errStr.includes("429") || errStr.includes("quota") || errStr.includes("RESOURCE_EXHAUSTED")) {
        console.warn("[QUOTA EXHAUSTED] Sat-Link early-warning generation rate limited. Seamlessly triggered localized advisory backup.");
      } else {
        console.warn("Real satellite cloud-link call failed. Falling back to local advisory backup system:", errStr);
      }
      res.json({ text: generateFallbackResponse(prompt) });
    }
  } catch (err: any) {
    console.error("Sat-Link Generate Route Error:", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});

app.post("/api/satlink/audio", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const isRealApiKey = apiKey && apiKey.trim() !== "" && apiKey !== "MY_GEMINI_API_KEY";
    if (!isRealApiKey) {
      return res.status(403).json({ error: "No valid satellite configuration key. Fallback required." });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Aoede" }
            }
          }
        }
      });
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const data = part?.inlineData?.data;
      const mimeType = part?.inlineData?.mimeType || "audio/pcm;rate=24000";
      res.json({ audioData: data, mimeType });
    } catch (apiErr: any) {
      const errStr = String(apiErr?.message || apiErr);
      if (errStr.includes("429") || errStr.includes("quota") || errStr.includes("RESOURCE_EXHAUSTED")) {
        console.warn("[QUOTA EXHAUSTED] Sat-Link voice synthesis rate limited. Seamlessly routed to device-native synthesis backup.");
      } else {
        console.warn("Real satellite cloud-link TTS call failed. Informing client to activate fallback synthesis:", errStr);
      }
      res.status(429).json({ error: "Cloud synthesis busy or quota exceeded. Informing client to activate fallback synthesis." });
    }
  } catch (err: any) {
    console.error("Sat-Link Audio Route Error:", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});

app.post("/api/satlink/vision", async (req, res) => {
  try {
    const { image, mimeType } = req.body;
    if (!image || !mimeType) {
      return res.status(400).json({ error: "Image data and mimeType are required" });
    }

    const isRealApiKey = apiKey && apiKey.trim() !== "" && apiKey !== "MY_GEMINI_API_KEY";
    if (!isRealApiKey) {
      console.log("No valid credential configured for vision. Utilizing simulated hazard telemetry.");
      return res.json({ text: JSON.stringify({ type: "Flooded Road", severity: "High", description: "Telemetry analysis suggests high standing water on roadway." }) });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: {
          parts: [
            { text: "Analyze this image of a flood or natural hazard. Return a JSON object with strictly these keys: 'type' (must be exactly 'Flooded Road', 'Landslide', or 'Fallen Tree'), 'severity' (must be exactly 'Low', 'Medium', or 'High'), and 'description' (a brief 1-sentence assessment)." },
            { inlineData: { mimeType, data: image } }
          ]
        },
        config: {
          responseMimeType: "application/json"
        }
      });
      res.json({ text: response.text });
    } catch (apiErr: any) {
      const errStr = String(apiErr?.message || apiErr);
      if (errStr.includes("429") || errStr.includes("quota") || errStr.includes("RESOURCE_EXHAUSTED")) {
        console.warn("[QUOTA EXHAUSTED] Sat-Link hazard vision rate limited. Falling back to local hazard telemetry simulation.");
      } else {
        console.warn("Real satellite cloud-link vision call failed. Falling back to local hazard telemetry simulation:", errStr);
      }
      res.json({ text: JSON.stringify({ type: "Flooded Road", severity: "High", description: "Backup telemetry indicates elevated risk of surface flooding." }) });
    }
  } catch (err: any) {
    console.error("Sat-Link Vision Route Error:", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

## File: vite.config.ts
```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
```
