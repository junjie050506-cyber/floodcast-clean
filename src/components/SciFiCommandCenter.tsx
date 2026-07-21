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
