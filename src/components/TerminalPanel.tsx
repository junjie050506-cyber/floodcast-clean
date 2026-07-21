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
