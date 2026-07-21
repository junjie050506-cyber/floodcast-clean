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
