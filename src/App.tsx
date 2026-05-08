import { useMemo, useState } from 'react';
import LandingPage from './components/LandingPage';
import QuizCard from './components/QuizCard';
import ResultPage from './components/ResultPage';
import quizDataRaw from './data/quizData.json';
import type { QuizItem, Screen } from './types';

const quizData = quizDataRaw as QuizItem[];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const totalCount = quizData.length;

  const handleStart = () => {
    setQuestions(shuffle(quizData));
    setCurrentIndex(0);
    setScore(0);
    setScreen('quiz');
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setScreen('result');
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleRestart = () => {
    handleStart();
  };

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex]
  );

  return (
    <div className="app-shell">
      <div className="window-frame">
        <div className="title-bar">
          <span className="title-bar-text">못그린 영화퀴즈.exe</span>
          <div className="title-bar-controls">
            <span className="tb-btn">_</span>
            <span className="tb-btn">□</span>
            <span className="tb-btn">×</span>
          </div>
        </div>
        <div className="window-body">
          {screen === 'landing' && (
            <LandingPage onStart={handleStart} totalCount={totalCount} />
          )}
          {screen === 'quiz' && currentQuestion && (
            <QuizCard
              key={currentQuestion.id}
              quiz={currentQuestion}
              currentIndex={currentIndex}
              total={questions.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          )}
          {screen === 'result' && (
            <ResultPage
              score={score}
              total={questions.length}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </div>
  );
}
