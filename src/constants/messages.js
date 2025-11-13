import { YACHT_RULE } from "../constants/yachtRule.js";

export const MESSAGES = Object.freeze({
  gameName: "요트 다이스",
  rollPrompt: "주사위를 굴리세요!",
  rollButton: "굴리기",
  turn: "턴",
  category: "족보명",
  subtotal: "소계",
  bonus: `보너스+${YACHT_RULE.BONUS_SCORE}`,
  bonusDescription: `🎲 에이스 ~ 식스의 합계가 ${YACHT_RULE.BONUS_THRESHOLD}점 이상이면 보너스`,
  total: "총합 득점",

  remainingRoll: (count) => `🎲 앞으로 ${count}번`,
  playerTurn: (playerName) => `${playerName} 차례`,
  subtotalValue: (subtotal) => `${subtotal} / ${YACHT_RULE.BONUS_THRESHOLD}`,
  turnValue: (turn) => `${turn} / ${YACHT_RULE.MAX_TURN_COUNT}`,
});
