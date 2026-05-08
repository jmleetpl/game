import { useEffect, useMemo, useState } from 'react';
import type { QuizItem } from '../types';

interface Props {
  quiz: QuizItem;
  currentIndex: number;
  total: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function QuizCard({
  quiz,
  currentIndex,
  total,
  onAnswer,
  onNext,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [imageBroken, setImageBroken] = useState(false);

  const shuffledChoices = useMemo(
    () => shuffle(quiz.choices),
    [quiz.id]
  );

  useEffect(() => {
    setSelected(null);
    setShowHint(false);
    setImageBroken(false);
  }, [quiz.id]);

  const handleSelect = (choice: string) => {
    if (selected !== null) return;
    setSelected(choice);
    onAnswer(choice === quiz.answer);
  };

  const isAnswered = selected !== null;
  const isCorrect = selected === quiz.answer;

  return (
    <div className="quiz-card">
      <div className="progress-bar">
        <span className="progress-text">
          {currentIndex + 1} / {total}
        </span>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="image-frame">
        {!imageBroken ? (
          <img
            src={quiz.imageUrl}
            alt={`${quiz.titleKo} 발그림`}
            className="quiz-image"
            onError={() => setImageBroken(true)}
          />
        ) : (
          <div className="image-fallback">
            <div className="fallback-label">[발그림 미완성]</div>
            <div className="fallback-prompt">{quiz.badDrawingPrompt}</div>
            <div className="fallback-hint">
              public/images/{quiz.imageUrl.split('/').pop()} 에 그림을 추가하세요.
            </div>
          </div>
        )}
      </div>

      <div className="meta-row">
        <span className="meta-chip">개봉 {quiz.releaseYear}년</span>
        <span className="meta-chip">{quiz.genre}</span>
        <span className="meta-chip">난이도: {quiz.difficulty}</span>
      </div>

      <p className="plot">{quiz.shortPlot}</p>

      <div className="hint-row">
        <button
          className="win-button small"
          onClick={() => setShowHint(true)}
          disabled={showHint || isAnswered}
        >
          힌트 보기
        </button>
        {showHint && <div className="hint-box">💡 {quiz.hint}</div>}
      </div>

      <div className="choices-grid">
        {shuffledChoices.map((choice) => {
          let cls = 'choice-button';
          if (isAnswered) {
            if (choice === quiz.answer) cls += ' correct';
            else if (choice === selected) cls += ' wrong';
            else cls += ' dimmed';
          }
          return (
            <button
              key={choice}
              className={cls}
              onClick={() => handleSelect(choice)}
              disabled={isAnswered}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
          <div className="feedback-headline">
            {isCorrect ? '🎉 정답!' : '❌ 틀렸어요!'}
          </div>
          <div className="feedback-row">
            <strong>정답:</strong> {quiz.answer}
          </div>
          <div className="feedback-row">
            <strong>해설:</strong> {quiz.explanation}
          </div>
          <button className="win-button big" onClick={onNext}>
            {currentIndex + 1 >= total ? '결과 보기 →' : '다음 문제 →'}
          </button>
        </div>
      )}
    </div>
  );
}
