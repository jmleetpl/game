import { useEffect, useState } from 'react';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
}

function getGrade(percentage: number): { grade: string; comment: string } {
  if (percentage === 100) {
    return {
      grade: '🏆 영화 백과사전',
      comment: '혹시 평론가세요? 발그림 사이로 영화를 꿰뚫어 보는 눈!',
    };
  }
  if (percentage >= 90) {
    return {
      grade: '🎬 시네필',
      comment: '거의 다 맞췄어요. 발그림 작가에게 위로의 박수를.',
    };
  }
  if (percentage >= 75) {
    return {
      grade: '🍿 영화광',
      comment: '주말마다 영화 한 편씩 보시죠?',
    };
  }
  if (percentage >= 60) {
    return {
      grade: '🎟️ 평범한 관객',
      comment: '영화관 가는 길은 알고 계시는군요.',
    };
  }
  if (percentage >= 40) {
    return {
      grade: '🛋️ 집순이/집돌이',
      comment: '발그림 탓이라고 우겨봅시다.',
    };
  }
  if (percentage >= 20) {
    return {
      grade: '😅 영화 입문자',
      comment: '오늘부터 한 편씩 보러 가시죠!',
    };
  }
  return {
    grade: '🥲 발그림 피해자',
    comment: '점수의 절반은 발그림 탓, 나머지 절반도 발그림 탓.',
  };
}

export default function ResultPage({ score, total, onRestart }: Props) {
  const percentage = Math.round((score / total) * 100);
  const { grade, comment } = getGrade(percentage);
  const [highScore, setHighScore] = useState(0);
  const [isNewHigh, setIsNewHigh] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    const prev = Number(localStorage.getItem('motgrin_high_score') ?? '0');
    if (score > prev) {
      localStorage.setItem('motgrin_high_score', String(score));
      setHighScore(score);
      setIsNewHigh(true);
    } else {
      setHighScore(prev);
      setIsNewHigh(false);
    }
  }, [score]);

  const shareText =
    `🎨 못그린 영화퀴즈 결과 🎨\n` +
    `점수: ${score} / ${total} (${percentage}%)\n` +
    `등급: ${grade}\n` +
    `한줄평: ${comment}\n` +
    `당신도 도전해 보세요!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('failed');
      setTimeout(() => setCopyState('idle'), 2000);
    }
  };

  return (
    <div className="result-page">
      <h2 className="result-title">결과 발표!</h2>
      <div className="result-score-box" aria-label={`최종 점수 ${score}점, 총 ${total}문제`}>
        <div className="score-label">최종 점수</div>
        <div className="score-big">{score} / {total}</div>
        <div className="score-percent">정답률 {percentage}%</div>
      </div>
      <div className="grade-box">
        <div className="grade-label">당신의 등급</div>
        <div className="grade-value">{grade}</div>
        <div className="grade-comment">"{comment}"</div>
      </div>

      <div className="highscore-box">
        {isNewHigh ? (
          <span className="new-record">⭐ 신기록 달성! 최고 점수: {highScore}</span>
        ) : (
          <span>최고 점수: {highScore} / {total}</span>
        )}
      </div>

      <div className="share-preview">
        <pre>{shareText}</pre>
      </div>

      <div className="result-actions">
        <button className="win-button big" onClick={onRestart}>
          다시 도전하기
        </button>
        <button className="win-button big" onClick={handleCopy}>
          {copyState === 'copied'
            ? '✅ 복사됨!'
            : copyState === 'failed'
            ? '❌ 복사 실패'
            : '📋 결과 공유 텍스트 복사'}
        </button>
      </div>
    </div>
  );
}
