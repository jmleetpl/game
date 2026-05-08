export interface QuizItem {
  id: number;
  titleKo: string;
  titleEn: string;
  releaseYear: number;
  genre: string;
  shortPlot: string;
  famousSceneDescription: string;
  badDrawingPrompt: string;
  imageUrl: string;
  hint: string;
  choices: string[];
  answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type Screen = 'landing' | 'quiz' | 'result';
