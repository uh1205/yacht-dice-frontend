export const MESSAGES = Object.freeze({
  onlineGameName: "온라인 요트 다이스",
  offlineGameName: "오프라인 요트 다이스",

  nicknameInput: "닉네임을 입력하세요",
  start: "시작하기",
  playOffline: "오프라인으로 플레이하기",
  cancelMatch: "매칭 취소",
  match: "랜덤 매칭",

  rollPrompt: "주사위를 굴리세요!",
  waitPrompt: "기다리는 중...",

  myTurn: "내 차례",

  rollButton: "굴리기",
  round: "턴",

  category: "족보명",
  subtotal: "소계",
  total: "총합 득점",
  gameOver: "🏁 게임 종료!",
  finalResult: "🎉 최종 결과 🎉",
  draw: "무승부!",
  player: "플레이어",

  quitGame: "나가기",
  restartGame: "새 게임 시작",

  welcome: (nickname) => `환영합니다, ${nickname}님`,
  bonus: (bonusScore) => `보너스+${bonusScore}`,
  remainingRoll: (count) => `🎲 앞으로 ${count}번`,
  playerTurn: (playerName) => `${playerName} 차례`,

  bonusDescription: (first, last, bonusThreshold) =>
    `🎲 ${first} ~ ${last}의 합계가 ${bonusThreshold}점 이상이면 보너스`,

  subtotalValue: (subtotal, bonusThreshold) =>
    `${subtotal} / ${bonusThreshold}`,
  roundValue: (roundCount, maxRoundCount) =>
    roundCount > maxRoundCount
      ? `${maxRoundCount} / ${maxRoundCount}`
      : `${roundCount} / ${maxRoundCount}`,
  winner: (winner) => `🏆 승자: ${winner}`,
});
