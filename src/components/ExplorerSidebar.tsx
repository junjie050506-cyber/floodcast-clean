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
