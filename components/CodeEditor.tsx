
import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  readOnly?: boolean;
  filename?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, readOnly = false, filename = "solution.v" }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!readOnly) {
        onChange(e.target.value);
    }
  };

  const lines = code.split('\n').length;

  return (
    <div className={`relative font-mono text-sm h-full flex flex-col bg-slate-950 rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-800 ${readOnly ? 'opacity-80' : ''}`}>
      {/* Mac-style window header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2 select-none">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="ml-4 text-slate-500 text-xs font-bold">{filename}</div>
        {readOnly && <div className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">READ ONLY</div>}
      </div>
      
      <div className="flex-1 flex relative group">
        {/* Line Numbers */}
        <div className="w-10 bg-slate-900 text-slate-600 text-right pt-4 pr-3 select-none flex flex-col font-mono leading-6 text-xs border-r border-slate-800/50">
          {Array.from({ length: Math.max(lines, 20) }).map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        
        {/* Text Area */}
        <textarea
          value={code}
          onChange={handleChange}
          readOnly={readOnly}
          spellCheck={false}
          className={`
            flex-1 bg-slate-950 text-slate-300 p-4 pt-4 outline-none resize-none
            leading-6 font-mono code-scroll selection:bg-pop-blue/30 placeholder-slate-700
            ${readOnly ? 'cursor-default' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
