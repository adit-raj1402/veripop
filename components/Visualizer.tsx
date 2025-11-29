import React from 'react';

interface VisualizerProps {
  type: string;
}

const Visualizer: React.FC<VisualizerProps> = ({ type }) => {
  // Styles
  const strokeColor = "#4ECDC4"; // pop-blue
  const secondaryColor = "#FFE66D"; // pop-yellow (neon accent)
  const strokeWidth = 3;
  const glowFilter = "drop-shadow(0 0 4px #4ECDC4)";
  const glowYellow = "drop-shadow(0 0 4px #FFE66D)";

  const renderContent = () => {
    switch (type) {
      case 'chip_intro':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* The Chip Body */}
            <rect x="120" y="40" width="160" height="120" rx="8" fill="#1e293b" stroke={strokeColor} strokeWidth="3" style={{filter: glowFilter}} />
            <text x="200" y="100" fill="#fff" fontSize="16" fontFamily="monospace" textAnchor="middle">MODULE</text>
            <text x="200" y="120" fill="#64748b" fontSize="12" fontFamily="monospace" textAnchor="middle">top_module</text>
            
            {/* Output Pin */}
            <line x1="280" y1="100" x2="350" y2="100" stroke={secondaryColor} strokeWidth="4" />
            <text x="360" y="105" fill={secondaryColor} fontSize="14" fontFamily="monospace">1</text>
            <circle cx="280" cy="100" r="4" fill={strokeColor} />
            
            {/* VCC Symbol */}
            <line x1="200" y1="40" x2="200" y2="10" stroke={secondaryColor} strokeWidth="2" />
            <line x1="180" y1="10" x2="220" y2="10" stroke={secondaryColor} strokeWidth="2" />
            <text x="230" y="15" fill={secondaryColor} fontSize="10">VCC</text>
          </svg>
        );

      case 'output_zero':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <rect x="120" y="40" width="160" height="120" rx="8" fill="#1e293b" stroke={strokeColor} strokeWidth="3" style={{filter: glowFilter}} />
            <text x="200" y="100" fill="#fff" fontSize="16" fontFamily="monospace" textAnchor="middle">MODULE</text>
            
            {/* Output Pin */}
            <line x1="280" y1="100" x2="350" y2="100" stroke="#94a3b8" strokeWidth="4" />
            <text x="360" y="105" fill="#94a3b8" fontSize="14" fontFamily="monospace">0</text>
            
            {/* Ground Symbol connection inside */}
            <line x1="200" y1="160" x2="200" y2="180" stroke="#94a3b8" strokeWidth="2" />
            <line x1="190" y1="180" x2="210" y2="180" stroke="#94a3b8" strokeWidth="2" />
            <line x1="195" y1="185" x2="205" y2="185" stroke="#94a3b8" strokeWidth="2" />
            <line x1="198" y1="190" x2="202" y2="190" stroke="#94a3b8" strokeWidth="2" />
            <text x="215" y="180" fill="#94a3b8" fontSize="10">GND</text>
          </svg>
        );

      case 'wire':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full text-pop-blue">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ECDC4" />
              </marker>
            </defs>
            <text x="50" y="90" fill="#94a3b8" className="text-xs font-mono">Input A</text>
            <text x="300" y="90" fill="#94a3b8" className="text-xs font-mono">Output Y</text>
            
            <path d="M 50 100 L 350 100" stroke={strokeColor} strokeWidth={strokeWidth} markerEnd="url(#arrow)" className="animate-pulse" style={{filter: glowFilter}} />
            
            <circle r="4" fill={secondaryColor}>
              <animateMotion dur="2s" repeatCount="indefinite" path="M 50 100 L 350 100" />
            </circle>
          </svg>
        );

      case 'four_wires':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Wires */}
            <g style={{filter: glowFilter}}>
                <path d="M 80 50 L 320 50" stroke={strokeColor} strokeWidth="2" />
                <path d="M 80 80 L 320 80" stroke="#FF6B97" strokeWidth="2" />
                <path d="M 80 110 L 320 110" stroke="#A29BFE" strokeWidth="2" />
                <path d="M 80 140 L 320 140" stroke={secondaryColor} strokeWidth="2" />
            </g>

            {/* Labels */}
            <text x="60" y="55" fill={strokeColor} fontSize="12" fontFamily="monospace">a</text>
            <text x="60" y="85" fill="#FF6B97" fontSize="12" fontFamily="monospace">b</text>
            <text x="60" y="115" fill="#A29BFE" fontSize="12" fontFamily="monospace">c</text>
            <text x="60" y="145" fill={secondaryColor} fontSize="12" fontFamily="monospace">d</text>

            <text x="330" y="55" fill={strokeColor} fontSize="12" fontFamily="monospace">w</text>
            <text x="330" y="85" fill="#FF6B97" fontSize="12" fontFamily="monospace">x</text>
            <text x="330" y="115" fill="#A29BFE" fontSize="12" fontFamily="monospace">y</text>
            <text x="330" y="145" fill={secondaryColor} fontSize="12" fontFamily="monospace">z</text>
            
            {/* Parallel Particles */}
            <circle r="3" fill="#fff"><animateMotion dur="3s" repeatCount="indefinite" path="M 80 50 L 320 50" /></circle>
            <circle r="3" fill="#fff"><animateMotion dur="3s" repeatCount="indefinite" path="M 80 80 L 320 80" /></circle>
            <circle r="3" fill="#fff"><animateMotion dur="3s" repeatCount="indefinite" path="M 80 110 L 320 110" /></circle>
            <circle r="3" fill="#fff"><animateMotion dur="3s" repeatCount="indefinite" path="M 80 140 L 320 140" /></circle>
          </svg>
        );

      case 'not_gate':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <path d="M 100 100 L 180 100" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 180 60 L 180 140 L 260 100 Z" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} style={{filter: glowFilter}} />
            <circle cx="270" cy="100" r="10" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 280 100 L 360 100" stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x="80" y="90" fill="#94a3b8" className="font-mono">In</text>
            <text x="350" y="90" fill="#94a3b8" className="font-mono">Out</text>
            <text x="200" y="105" fill="#FF6B97" className="font-bold text-xs" textAnchor="middle">NOT</text>
          </svg>
        );

      case 'and_gate':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <path d="M 100 70 L 180 70" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 100 130 L 180 130" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 180 40 L 180 160 C 260 160 280 100 280 100 C 280 100 260 40 180 40 Z" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} style={{filter: glowFilter}} />
            <path d="M 280 100 L 360 100" stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x="80" y="70" fill="#94a3b8" className="font-mono">A</text>
            <text x="80" y="130" fill="#94a3b8" className="font-mono">B</text>
            <text x="210" y="105" fill="#FF6B97" className="font-bold text-xs" textAnchor="middle">AND</text>
          </svg>
        );

      case 'nor_gate':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <path d="M 100 70 L 170 70" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 100 130 L 170 130" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 160 40 C 180 70 180 130 160 160 C 240 160 280 100 280 100 C 280 100 240 40 160 40" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} style={{filter: glowFilter}} />
            <circle cx="290" cy="100" r="10" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 300 100 L 360 100" stroke={strokeColor} strokeWidth={strokeWidth} />
            <text x="80" y="70" fill="#94a3b8" className="font-mono">A</text>
            <text x="80" y="130" fill="#94a3b8" className="font-mono">B</text>
            <text x="220" y="105" fill="#FF6B97" className="font-bold text-xs" textAnchor="middle">NOR</text>
          </svg>
        );
        
      case 'xnor_gate':
        return (
           <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Input Lines */}
            <path d="M 100 70 L 160 70" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 100 130 L 160 130" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Double Curve for XOR/XNOR */}
            <path d="M 150 40 C 170 70 170 130 150 160" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 160 40 C 180 70 180 130 160 160 C 240 160 280 100 280 100 C 280 100 240 40 160 40" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} style={{filter: glowFilter}} />
            
            {/* Bubble */}
            <circle cx="290" cy="100" r="10" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            <path d="M 300 100 L 360 100" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            <text x="80" y="70" fill="#94a3b8" className="font-mono">A</text>
            <text x="80" y="130" fill="#94a3b8" className="font-mono">B</text>
            <text x="220" y="105" fill="#FF6B97" className="font-bold text-xs" textAnchor="middle">XNOR</text>
          </svg>
        );

      case 'internal_wires':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
             {/* Gate 1 */}
             <rect x="100" y="50" width="40" height="40" fill="none" stroke={strokeColor} strokeWidth="2" />
             <text x="120" y="75" textAnchor="middle" fill="#fff" fontSize="10">&</text>
             
             {/* Gate 2 */}
             <rect x="250" y="80" width="40" height="40" fill="none" stroke={strokeColor} strokeWidth="2" />
             <text x="270" y="105" textAnchor="middle" fill="#fff" fontSize="10">|</text>
             
             {/* The Internal Wire */}
             <path d="M 140 70 L 195 70 L 195 90 L 250 90" stroke={secondaryColor} strokeWidth="2" strokeDasharray="4 4" className="animate-flow" />
             <text x="195" y="60" textAnchor="middle" fill={secondaryColor} fontSize="10" className="font-mono">wire internal_sig</text>
             
             <path d="M 290 100 L 340 100" stroke={strokeColor} strokeWidth="2" />
          </svg>
        );

      case 'chip_7458':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Chip Package */}
            <rect x="80" y="30" width="240" height="140" rx="4" fill="#1e293b" stroke={strokeColor} strokeWidth="2" />
            
            {/* Logic internals sketch */}
            <g opacity="0.5" stroke={secondaryColor} fill="none">
               <rect x="120" y="50" width="20" height="20" />
               <rect x="120" y="80" width="20" height="20" />
               <circle cx="200" cy="80" r="10" />
            </g>
            
            <text x="200" y="100" fill="#fff" fontSize="24" fontFamily="monospace" textAnchor="middle" fontWeight="bold">7458</text>
            
            {/* Pins */}
            <line x1="80" y1="50" x2="60" y2="50" stroke={strokeColor} strokeWidth="2" />
            <line x1="80" y1="70" x2="60" y2="70" stroke={strokeColor} strokeWidth="2" />
            <line x1="80" y1="90" x2="60" y2="90" stroke={strokeColor} strokeWidth="2" />
            <line x1="80" y1="110" x2="60" y2="110" stroke={strokeColor} strokeWidth="2" />
            
            <line x1="320" y1="80" x2="340" y2="80" stroke={secondaryColor} strokeWidth="2" />
            <text x="350" y="85" fill={secondaryColor} fontSize="12">Y</text>
          </svg>
        );

      case 'dff':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <rect x="150" y="50" width="100" height="120" rx="4" fill="#1e293b" stroke={strokeColor} strokeWidth={strokeWidth} style={{filter: glowFilter}} />
            <path d="M 80 70 L 150 70" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 80 150 L 150 150" stroke={secondaryColor} strokeWidth={strokeWidth} />
            <path d="M 150 140 L 170 150 L 150 160" fill="none" stroke={strokeColor} strokeWidth="2" />
            <path d="M 250 70 L 320 70" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M 250 150 L 320 150" stroke="#94a3b8" strokeWidth="2" />
            <text x="130" y="75" fill="#94a3b8" className="font-mono text-xs" textAnchor="end">D</text>
            <text x="130" y="155" fill={secondaryColor} className="font-mono text-xs" textAnchor="end">Clk</text>
            <text x="270" y="75" fill="#94a3b8" className="font-mono text-xs">Q</text>
            <text x="270" y="155" fill="#94a3b8" className="font-mono text-xs">Qn</text>
            <circle r="3" fill={secondaryColor}><animateMotion dur="2s" repeatCount="indefinite" path="M 80 150 L 150 150" /></circle>
          </svg>
        );

      case 'vector_bus':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* The Bus */}
            <path d="M 50 100 L 350 100" stroke={strokeColor} strokeWidth="8" className="animate-pulse" style={{filter: glowFilter}} />
            
            {/* The Slash Notation */}
            <line x1="190" y1="110" x2="210" y2="90" stroke={secondaryColor} strokeWidth="3" />
            <text x="215" y="90" fill={secondaryColor} fontSize="14" className="font-bold">8</text>
            
            {/* Label */}
            <text x="200" y="140" fill="#fff" textAnchor="middle" className="font-mono text-xs">wire [7:0] bus</text>
          </svg>
        );

      case 'vector_select':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Input Bus */}
            <path d="M 50 100 L 150 100" stroke={strokeColor} strokeWidth="8" />
            <line x1="90" y1="110" x2="110" y2="90" stroke={secondaryColor} strokeWidth="3" />
            <text x="95" y="85" fill={secondaryColor} fontSize="12">16</text>

            {/* Splitting */}
            <path d="M 150 100 C 200 100 200 60 250 60" fill="none" stroke={strokeColor} strokeWidth="4" />
            <path d="M 150 100 C 200 100 200 140 250 140" fill="none" stroke={strokeColor} strokeWidth="4" />

            {/* Output Busses */}
            <path d="M 250 60 L 350 60" stroke={strokeColor} strokeWidth="4" />
            <path d="M 250 140 L 350 140" stroke={strokeColor} strokeWidth="4" />
            
            <text x="300" y="50" fill="#fff" fontSize="10" textAnchor="middle">[15:8] (High)</text>
            <text x="300" y="130" fill="#fff" fontSize="10" textAnchor="middle">[7:0] (Low)</text>
          </svg>
        );

      case 'vector_concat':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Inputs */}
            <path d="M 50 60 L 150 60" stroke={strokeColor} strokeWidth="2" />
            <text x="40" y="65" fill="#fff" fontSize="10" textAnchor="end">A[0]</text>
            
            <path d="M 50 100 L 150 100" stroke={strokeColor} strokeWidth="2" />
            <text x="40" y="105" fill="#fff" fontSize="10" textAnchor="end">B[0]</text>

            <path d="M 50 140 L 150 140" stroke={strokeColor} strokeWidth="2" />
            <text x="40" y="145" fill="#fff" fontSize="10" textAnchor="end">C[0]</text>

            {/* Merge */}
            <path d="M 150 60 C 200 60 200 100 250 100" fill="none" stroke={strokeColor} strokeWidth="2" />
            <path d="M 150 100 L 250 100" fill="none" stroke={strokeColor} strokeWidth="2" />
            <path d="M 150 140 C 200 140 200 100 250 100" fill="none" stroke={strokeColor} strokeWidth="2" />
            
            {/* Result Bus */}
            <path d="M 250 100 L 350 100" stroke={strokeColor} strokeWidth="6" />
            <text x="300" y="90" fill={secondaryColor} fontSize="12" textAnchor="middle">{`{A,B,C}`}</text>
          </svg>
        );

      default:
        return <div className="text-white">No visualization</div>;
    }
  };

  return (
    <div className="w-full aspect-[2/1] bg-slate-900/50 rounded-xl border border-slate-700/50 flex items-center justify-center overflow-hidden p-4 select-none">
      {renderContent()}
    </div>
  );
};

export default Visualizer;