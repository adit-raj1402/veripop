export enum LessonCategory {
  GETTING_STARTED = 'Getting Started',
  VERILOG_LANG = 'Verilog Language',
  GATES = 'Logic Gates',
  VECTORS = 'Vectors',
  MODULES = 'Modules',
  SEQUENTIAL = 'Sequential Logic',
}

export interface Lesson {
  id: string;
  title: string;
  category: LessonCategory;
  theory: string;
  visualDescription: string; // Description for a placeholder visual
  initialCode: string;
  solutionPattern: string; // Regex or keywords to check naively before AI
  solutionCode: string; // The correct code to show after 3 fails
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export type ViewState = 'dashboard' | 'lesson';