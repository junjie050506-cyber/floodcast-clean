import React, { useState } from 'react';
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
    sharedAudioCtxDashboard.resume().catch(() => { });
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
  } catch (err) { }
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
  const [localFullOverrides, setLocalFullOverrides] = useState<Record<string, boolean>>({});

  const handleLocalToggleShelterCapacity = (shelterId: string, currentIsFull: boolean) => {
    const nextIsFull = !currentIsFull;
    setLocalFullOverrides(prev => ({
      ...prev,
      [shelterId]: nextIsFull
    }));
    toggleShelterCapacity(shelterId, currentIsFull);
  };

  return (
    <>
      {/* Core operational matrix cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Operations Level Card */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${simulateStorm
            ? 'border-red-500/20 bg-red-500/5'
            : `${isDarkMode ? 'border-white/5 bg-white/[0.015]' : 'border-zinc-200 bg-zinc-50/50'}`
          }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${simulateStorm
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
        <div className={`p-6 rounded-2xl border transition-all duration-300 ${pendingRescueCount > 0
            ? 'border-red-500/20 bg-red-500/5'
            : `${isDarkMode ? 'border-white/5 bg-white/[0.015]' : 'border-zinc-200 bg-zinc-50/50'}`
          }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${pendingRescueCount > 0
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
                className={`h-full rounded-full transition-all duration-1000 ${overallShelterOccupancyPct >= 80
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
                <div className={`backdrop-blur-md p-1.5 rounded-xl shadow-2xl flex flex-col gap-1 border ${isDarkMode
                    ? 'bg-[#0B0F19]/90 border-[#1E293B]/60 text-white shadow-black/50'
                    : 'bg-white/95 border-zinc-200 text-zinc-800 shadow-zinc-200/40'
                  }`}>
                  <button
                    onClick={() => {
                      setAdminMapZoom(prev => Math.min(18, prev + 1));
                      showToast('Zoom level increased', 'info');
                      playBeepDashboard(1100, 0.06);
                    }}
                    className={`p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${isDarkMode
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
                    className={`p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${isDarkMode
                        ? 'hover:bg-[#0a84ff]/25 text-zinc-300 hover:text-white'
                        : 'hover:bg-zinc-100 text-zinc-650 hover:text-[#0a84ff]'
                      }`}
                    title="Zoom Out"
                  >
                    <Minus size={15} />
                  </button>
                </div>

                {/* Layer Switchers */}
                <div className={`backdrop-blur-md p-1.5 rounded-xl shadow-2xl flex flex-col gap-1 border ${isDarkMode
                    ? 'bg-[#0B0F19]/90 border-[#1E293B]/60 text-white shadow-black/50'
                    : 'bg-white/95 border-zinc-200 text-zinc-800 shadow-zinc-200/40'
                  }`}>
                  <button
                    onClick={() => {
                      setAdminMapType('terrain');
                      showToast('Switched to Terrain Profile', 'success');
                      playBeepDashboard(1060, 0.08);
                    }}
                    className={`p-2 rounded-lg transition-all text-[9px] font-bold font-mono cursor-pointer flex items-center justify-center ${adminMapType === 'terrain'
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
                    className={`p-2 rounded-lg transition-all text-[9px] font-bold font-mono cursor-pointer flex items-center justify-center ${adminMapType === 'satellite'
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
                  <div className={`backdrop-blur-md p-4 rounded-2xl shadow-2xl flex flex-col gap-3 border ${isDarkMode
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
                        className={`w-full border rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-mono focus:outline-none focus:border-[#0a84ff] transition-all ${isDarkMode
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
                            className={`px-2.5 py-2 rounded-lg border transition-all duration-150 flex items-center justify-between cursor-pointer text-[10px] font-bold ${isDarkMode
                                ? 'border-white/5 bg-white/[0.02] hover:bg-[#0a84ff]/10 hover:border-[#0a84ff]/30 text-zinc-300 hover:text-white'
                                : 'border-zinc-150 bg-zinc-50 hover:bg-[#0a84ff]/5 hover:border-[#0a84ff]/25 text-zinc-650 hover:text-[#0a84ff]'
                              }`}
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <Crosshair size={10} className="text-zinc-500 shrink-0" />
                              <span className="truncate font-mono">{sh.name}</span>
                            </span>
                            <span className={`text-[8px] font-mono text-zinc-500 shrink-0 px-1 py-0.5 rounded ml-1 ${isDarkMode ? 'bg-white/5' : 'bg-zinc-200'
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
                <div className={`absolute top-4 left-4 right-4 z-20 backdrop-blur-md rounded-2xl border shadow-xl px-4 py-3 flex items-center justify-between pointer-events-auto transition-all animate-[fadeIn_0.2s_ease-out] ${isDarkMode
                    ? 'bg-[#1C1C1E]/95 border-white/10 text-white'
                    : 'bg-white/95 border-zinc-200 text-zinc-800'
                  }`}>
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => {
                        setSelectedShelterDetail(null);
                        setShowRouteActive(false);
                      }}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500'
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
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600'
                      }`}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}



              {/* Google Maps Detail Sheet at the bottom */}
              {selectedShelterDetail && !showRouteActive && (
                <div className={`absolute bottom-4 left-4 right-4 z-20 backdrop-blur-md rounded-3xl border shadow-2xl p-4 flex flex-col pointer-events-auto select-none max-h-[300px] overflow-y-auto animate-[slideInUp_0.25s_ease-out] ${isDarkMode
                    ? 'bg-[#1C1C1E]/95 border-white/10 text-white'
                    : 'bg-white border-zinc-200 text-zinc-800'
                  }`}>
                  {/* Mini top bar/drag-handle */}
                  <div className={`w-12 h-1 rounded-full mx-auto mb-2 shrink-0 ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-300'
                    }`}></div>

                  {/* Title & metadata row */}
                  <div className="flex items-start justify-between shrink-0">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <h4 className={`text-base font-extrabold tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-zinc-900'
                        }`}>
                        {selectedShelterDetail.name}
                      </h4>
                      <p className={`text-[11px] flex flex-wrap items-center gap-1.5 font-sans ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                        }`}>
                        <span>No reviews</span>
                        <span className={isDarkMode ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
                        <span className="flex items-center gap-0.5"><Clock size={10} /> {selectedShelterDetail.time || "9 min"}</span>
                        <span className={isDarkMode ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
                        <span className="text-[#0a84ff] font-medium truncate">National Secondary School</span>
                        <span className={isDarkMode ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
                        <span className={`inline-flex items-center justify-center rounded px-1 py-0.5 text-[9px] font-bold ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'
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
                        className={`p-2 rounded-full transition-colors cursor-pointer ${bookmarkedShelters.includes(selectedShelterDetail.id)
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
                        className={`p-2 rounded-full transition-colors cursor-pointer ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-350' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
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
                        className={`p-2 rounded-full transition-colors cursor-pointer ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-350' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
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
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-full active:scale-95 transition-all text-xs font-bold shrink-0 cursor-pointer ${isDarkMode
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
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-full active:scale-95 transition-all text-xs font-bold shrink-0 cursor-pointer ${isDarkMode
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
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-full active:scale-95 transition-all text-xs font-bold shrink-0 cursor-pointer ${isDarkMode
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-[#8ab4f8]'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-[#1a73e8]'
                        }`}
                    >
                      <Bookmark size={12} fill={bookmarkedShelters.includes(selectedShelterDetail.id) ? "currentColor" : "none"} />
                      <span>{bookmarkedShelters.includes(selectedShelterDetail.id) ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>

                  {/* Photos Carousel */}
                  <div className={`flex items-center space-x-2 mt-3 overflow-x-auto pb-1 shrink-0 select-none scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-zinc-800' : 'scrollbar-thumb-zinc-300'
                    }`}>
                    {getShelterPhotos(selectedShelterDetail.id).map((photoUrl, idx) => (
                      <div key={idx} className={`relative w-36 h-24 rounded-xl overflow-hidden shrink-0 shadow border ${isDarkMode ? 'border-white/5 bg-zinc-850' : 'border-black/5 bg-zinc-100'
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
                <div className={`absolute top-4 left-4 right-4 z-20 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-[fadeInDown_0.2s_ease-out] pointer-events-auto font-sans border ${isDarkMode
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
                    className={`px-4 py-2 rounded-xl transition-all text-xs font-bold cursor-pointer flex items-center space-x-1.5 shrink-0 border ${isDarkMode
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
                      className={`px-3 pr-8 py-2.5 rounded-[12px] text-xs font-black outline-none border appearance-none transition-all duration-300 focus:ring-2 focus:ring-[#0a84ff]/25 focus:border-[#0a84ff] w-full cursor-pointer ${isDarkMode ? 'bg-zinc-950/80 border-white/5 text-zinc-100' : 'bg-white border-zinc-250 text-zinc-850'
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
                      className={`px-3 pr-8 py-2.5 rounded-[12px] text-xs font-semibold outline-none border appearance-none transition-all duration-300 focus:ring-2 focus:ring-red-500/10 focus:border-red-500 w-full cursor-pointer ${isDarkMode ? 'bg-zinc-950/80 border-white/5 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-800'
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
                  className={`w-full p-3.5 rounded-[16px] text-xs resize-none outline-none border transition-all duration-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 flex-1 leading-relaxed ${isDarkMode ? 'bg-black/60 border-white/5 text-zinc-100 font-semibold' : 'bg-white border-zinc-200 text-zinc-800 font-semibold'
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${pendingRescueCount > 0 ? 'bg-red-500/10 text-red-500 border border-red-500/10' : 'bg-zinc-500/10 text-zinc-400'
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
                        className={`p-4 rounded-[20px] border transition-all duration-300 relative overflow-hidden cursor-pointer hover:scale-[1.01] hover:shadow-md ${isPendingReal
                            ? 'bg-[#ff453a]/5 border-[#ff453a]/25 hover:border-[#ff453a]/60'
                            : 'bg-[#0a84ff]/5 border-[#0a84ff]/15 hover:border-[#0a84ff]/40'
                          }`}
                        title="Click to locate on map"
                      >
                        <div className="flex flex-col gap-2 mb-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap w-full select-none font-sans">
                            <span className={`px-2 py-0.5 text-[9px] font-semibold tracking-wider rounded-md text-white shrink-0 shadow-sm ${isPendingReal ? 'bg-[#ff453a]' : 'bg-blue-600'
                              }`}>
                              {sos.status.replace('_', ' ')}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-medium shrink-0">
                              {sos.timestamp ? new Date(sos.timestamp && typeof sos.timestamp.toDate === 'function' ? sos.timestamp.toDate() : sos.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
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

                        <div className={`space-y-1.5 text-[10.5px] p-3 rounded-xl border mb-3 leading-normal font-sans ${isDarkMode
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
                      className={`w-full py-3 px-4 rounded-xl text-center text-xs font-bold tracking-wider transition-all duration-200 border cursor-pointer select-none flex items-center justify-center space-x-2 ${isDarkMode
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
                <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${overallShelterOccupancyPct >= 80 ? 'bg-red-500/10 text-red-500' : 'bg-green-550/10 text-emerald-500'
                  }`}>{overallShelterOccupancyPct}% load</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...baseShelters]
                .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                .slice(0, showAllShelters ? baseShelters.length : 3)
                .map(shelter => {
                  const statusObj = shelterStatus[shelter.id];
                  let occ = getShelterOccupancy(shelter);
                  const isFull = localFullOverrides[shelter.id] !== undefined
                    ? localFullOverrides[shelter.id]
                    : (statusObj?.isFull !== undefined ? statusObj.isFull : occ.pct >= 100);

                  if (isFull) {
                    occ = {
                      ...occ,
                      pct: 100,
                      color: '#BA1A1A',
                      cap: statusObj?.maxCapacity !== undefined ? statusObj.maxCapacity : shelter.maxCapacity,
                      label: 'FULL'
                    };
                  }

                  return (
                    <div
                      key={shelter.id}
                      className={`p-5 rounded-[24px] border transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden ${isFull
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
                            <span className={`px-2.5 py-0.5 text-[10px] font-semibold tracking-wider rounded-md shrink-0 shadow-sm ${isFull ? 'bg-red-600 text-white' : ''
                              }`} style={{ backgroundColor: isFull ? undefined : occ.color, color: isFull ? undefined : '#fff' }}>
                              {isFull ? 'FULL' : `${occ.pct.toFixed(0)}% LOAD`}
                            </span>
                          </div>

                          <div className={`space-y-1.5 my-3.5 text-[11px] p-3 rounded-xl border ${isDarkMode
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
                            className={`py-2 rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer ${isDarkMode
                                ? 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                                : 'bg-zinc-100 text-zinc-750 border-zinc-200 hover:bg-zinc-250'
                              }`}
                          >
                            <Edit size={12} />
                            <span>Edit / Patch</span>
                          </button>

                          <button
                            onClick={() => handleLocalToggleShelterCapacity(shelter.id, isFull)}
                            className={`py-2 rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer ${isFull
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/25'
                                : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/25'
                              }`}
                          >
                            {isFull ? (
                              <>
                                <CheckCircle size={12} />
                                <span>Mark Available</span>
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
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 border cursor-pointer ${isDarkMode
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
