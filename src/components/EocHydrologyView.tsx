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

