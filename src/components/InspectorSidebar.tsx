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
