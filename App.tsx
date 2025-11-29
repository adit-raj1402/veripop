import React, { useState } from 'react';
import { LESSONS } from './constants';
import Sidebar from './components/Sidebar';
import LessonContent from './components/LessonContent';
import { Lesson } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-3 left-3 z-40 p-2 bg-slate-800 rounded-lg shadow-lg border border-slate-700 text-white hover:bg-slate-700"
      >
        <Menu size={20} />
      </button>

      <Sidebar 
        currentLessonId={currentLesson.id}
        onSelectLesson={setCurrentLesson}
        isOpen={isSidebarOpen}
        toggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className="flex-1 h-full w-full relative bg-slate-900">
        <LessonContent lesson={currentLesson} />
      </main>
    </div>
  );
};

export default App;