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

