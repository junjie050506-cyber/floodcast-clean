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

