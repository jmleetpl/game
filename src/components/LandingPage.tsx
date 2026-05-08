interface Props {
  onStart: () => void;
  totalCount: number;
}

export default function LandingPage({ onStart, totalCount }: Props) {
  const highScore = Number(localStorage.getItem('motgrin_high_score') ?? '0');

  return (
    <div className="landing">
      <h1 className="title">못그린 영화퀴즈</h1>
      <p className="subtitle">이 발그림은 어떤 영화일까요?</p>

      <div className="paint-canvas">
        <div className="paint-doodle">
          <div className="doodle-line">★ 발그림 미리보기 ★</div>
          <pre className="ascii-art">{`   o
  /|\\   <- 이게 사람?
  / \\
 ~~~~~  <- 바다(라고 우김)
 [BANANA SHIP]`}</pre>
        </div>
      </div>

      <ul className="rules">
        <li>총 {totalCount}문제, 4지선다.</li>
        <li>그림이 형편없어도 너무 미워하지 마세요.</li>
        <li>모르겠으면 "힌트" 버튼을 누르세요.</li>
      </ul>

      {highScore > 0 && (
        <p className="highscore-line">최고 점수: {highScore} / {totalCount}</p>
      )}

      <button className="win-button big" onClick={onStart}>
        시작하기
      </button>
    </div>
  );
}
