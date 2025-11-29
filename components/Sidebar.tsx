import React from 'react';
import { LESSONS } from '../constants';
import { Lesson, LessonCategory } from '../types';
import { BookOpen, Cpu, Layers, Activity, Zap } from 'lucide-react';

interface SidebarProps {
  currentLessonId: string | null;
  onSelectLesson: (lesson: Lesson) => void;
  isOpen: boolean;
  toggleOpen: () => void;
}

const CategoryIcon = ({ category }: { category: LessonCategory }) => {
  switch (category) {
    case LessonCategory.GETTING_STARTED: return <Zap size={16} className="text-pop-yellow" />;
    case LessonCategory.GATES: return <Cpu size={16} className="text-pop-pink" />;
    case LessonCategory.VECTORS: return <Layers size={16} className="text-pop-blue" />;
    case LessonCategory.SEQUENTIAL: return <Activity size={16} className="text-pop-green" />;
    default: return <BookOpen size={16} />;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ currentLessonId, onSelectLesson, isOpen, toggleOpen }) => {
  // Group lessons by category
  const groupedLessons = LESSONS.reduce((acc, lesson) => {
    if (!acc[lesson.category]) acc[lesson.category] = [];
    acc[lesson.category].push(lesson);
    return acc;
  }, {} as Record<LessonCategory, Lesson[]>);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleOpen}
        />
      )}
      
      <aside className={`
        fixed md:relative z-30
        h-full w-72 bg-slate-900 border-r border-slate-800 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-800 bg-slate-900">
          <h1 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <span className="text-3xl animate-pulse-slow">⚡</span> VeriPop
          </h1>
          <p className="text-xs font-mono text-slate-500 mt-1">Interactive HDL Learning</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          {(Object.keys(groupedLessons) as LessonCategory[]).map((category) => (
            <div key={category}>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 ml-2">
                <CategoryIcon category={category} />
                {category}
              </h3>
              <div className="space-y-1">
                {groupedLessons[category].map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(lesson);
                      if (window.innerWidth < 768) toggleOpen();
                    }}
                    className={`
                      w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent
                      ${currentLessonId === lesson.id 
                        ? 'bg-slate-800 text-white border-slate-700 shadow-lg shadow-black/20 translate-x-1' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                    `}
                  >
                    {lesson.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="text-xs font-mono text-slate-600 text-center">
            Powered by Gemini AI
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;