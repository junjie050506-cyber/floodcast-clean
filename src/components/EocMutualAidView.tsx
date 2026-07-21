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

