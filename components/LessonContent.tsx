import React, { useState, useEffect, useRef } from 'react';
import { Lesson } from '../types';
import CodeEditor from './CodeEditor';
import { checkVerilogCode, explainConcept } from '../services/geminiService';
import { Play, Lightbulb, CheckCircle, AlertTriangle, ArrowDown, Unlock } from 'lucide-react';
import Visualizer from './Visualizer';

interface LessonContentProps {
  lesson: Lesson;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const [code, setCode] = useState(lesson.initialCode);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  
  // Track failed attempts to reveal solution
  const [attempts, setAttempts] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  
  const theoryParts = lesson.theory.split('### Verilog Implementation');
  const digitalTheory = theoryParts[0]?.replace('### Digital Logic Deep Dive', '').trim();
  const verilogTheory = theoryParts[1]?.trim();

  // Reset state when lesson changes
  useEffect(() => {
    setCode(lesson.initialCode);
    setFeedback(null);
    setAiExplanation(null);
    setAttempts(0);
    setShowSolution(false);
  }, [lesson]);

  const handleCheck = async () => {
    setIsChecking(true);
    setFeedback("Thinking...");
    
    // Quick regex check before AI (optional optimization)
    // const passedPattern = new RegExp(lesson.solutionPattern, 'i').test(code);
    
    const response = await checkVerilogCode(lesson, code);
    setFeedback(response);
    
    if (response.startsWith('✅')) {
       // Success - Reset attempts so the solution button doesn't persist if they replay
       setAttempts(0);
       setShowSolution(false);
    } else {
       // Failure
       setAttempts(prev => prev + 1);
    }
    
    setIsChecking(false);
  };

  const handleExplain = async () => {
    if (aiExplanation) return;
    setIsExplaining(true);
    const response = await explainConcept(lesson.title, lesson.theory);
    setAiExplanation(response);
    setIsExplaining(false);
  };

  const isSuccess = feedback?.startsWith('✅');
  const canShowSolution = attempts >= 3;

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
        <div>
          <div className="text-xs font-bold text-pop-pink uppercase tracking-widest mb-1">{lesson.category}</div>
          <h2 className="text-2xl md:text-3xl font-black text-white">{lesson.title}</h2>
        </div>
        
        {/* Tutor Button in Red as requested */}
        <button 
            onClick={handleExplain}
            disabled={isExplaining}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs md:text-sm bg-rose-500/10 text-rose-500 border border-rose-500/50 hover:bg-rose-500/20 transition-all shadow-[0_0_10px_rgba(244,63,94,0.2)]"
          >
            {isExplaining ? 'Asking AI...' : <><Lightbulb size={16} /> AI Tutor</>}
        </button>
      </header>

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
          
          {/* LEFT COLUMN: THEORY & VISUALS */}
          <div className="p-6 md:p-8 lg:p-10 space-y-10 border-b lg:border-b-0 lg:border-r border-slate-700">
            
            {/* 1. Deep Digital Logic Theory */}
            <section className="space-y-4 animate-fade-in-up">
              <h3 className="text-xl font-bold text-pop-green flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pop-green/20 flex items-center justify-center text-sm">1</span>
                Digital Logic Concept
              </h3>
              <div className="prose prose-invert prose-p:text-slate-300 prose-p:leading-relaxed max-w-none">
                <p className="whitespace-pre-line">{digitalTheory}</p>
              </div>
            </section>

            {/* 2. Interactive Visualizer */}
            <section className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <h3 className="text-xl font-bold text-pop-blue flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pop-blue/20 flex items-center justify-center text-sm">2</span>
                Visualization
              </h3>
              <div className="shadow-2xl shadow-pop-blue/5 rounded-2xl">
                <Visualizer type={lesson.visualDescription} />
              </div>
            </section>

             {/* 3. Verilog Explanation */}
             <section className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl font-bold text-pop-pink flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pop-pink/20 flex items-center justify-center text-sm">3</span>
                Verilog Syntax
              </h3>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                  {verilogTheory}
                </p>
              </div>
            </section>

            {/* AI Explanation Result */}
            {aiExplanation && (
              <div className="bg-rose-900/20 p-6 rounded-xl border border-rose-500/30 animate-fade-in">
                <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2">
                  <Lightbulb size={20} /> AI Tutor:
                </h4>
                <p className="text-rose-200/80 leading-relaxed text-sm">
                  {aiExplanation}
                </p>
              </div>
            )}
            
            <div className="lg:hidden flex justify-center pt-8 text-slate-500 animate-bounce">
                <ArrowDown />
            </div>
          </div>

          {/* RIGHT COLUMN: EDITOR (Follows conceptually) */}
          <div className="flex flex-col h-full bg-slate-950 p-4 md:p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4 text-slate-400">
               <div className="h-px bg-slate-800 flex-1"></div>
               <span className="text-xs font-mono uppercase tracking-widest">Interactive Sandbox</span>
               <div className="h-px bg-slate-800 flex-1"></div>
            </div>

            <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0">
               <CodeEditor code={code} onChange={setCode} />
               
               {/* Actions Bar */}
               <div className="mt-6 flex flex-col gap-4">
                 
                 {/* Feedback Area */}
                 {feedback && (
                  <div className={`
                    p-4 rounded-xl text-sm font-mono border animate-fade-in
                    ${isSuccess 
                      ? 'bg-emerald-900/20 text-emerald-300 border-emerald-500/30' 
                      : 'bg-rose-900/20 text-rose-300 border-rose-500/30'}
                  `}>
                     <div className="flex items-start gap-3">
                       {isSuccess 
                         ? <CheckCircle className="shrink-0 text-pop-green" /> 
                         : <AlertTriangle className="shrink-0 text-rose-500" />
                       }
                       <div className="whitespace-pre-wrap">{feedback}</div>
                     </div>
                  </div>
                )}
                
                {/* Solution Reveal Logic */}
                {canShowSolution && !isSuccess && (
                  <div className="animate-fade-in">
                    {!showSolution ? (
                        <button 
                            onClick={() => setShowSolution(true)}
                            className="w-full py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <Unlock size={16} /> Show Correct Solution ({attempts} failed attempts)
                        </button>
                    ) : (
                        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Reference Solution</h4>
                            <pre className="text-sm font-mono text-emerald-400 overflow-x-auto">
                                {lesson.solutionCode}
                            </pre>
                        </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={handleCheck}
                    disabled={isChecking}
                    className={`
                      w-full md:w-auto px-8 py-4 rounded-xl font-bold text-slate-900 shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3
                      ${isChecking ? 'bg-slate-700 text-slate-400 cursor-wait' : 'bg-pop-green hover:bg-emerald-300 hover:shadow-pop-green/20'}
                    `}
                  >
                    {isChecking ? 'Verifying Logic...' : <><Play size={20} fill="currentColor" /> Submit Solution</>}
                  </button>
                </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LessonContent;