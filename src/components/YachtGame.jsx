import { useState } from "react";
import { YACHT_RULE } from "../constants/yachtRule.js";
import { PLAYERS } from "../constants/players.js";
import { MESSAGES } from "../constants/messages.js";
import DiceBoard from "./DiceBoard";
import ScoreBoard from "./ScoreBoard";

export default function YachtGame() {
  const [diceValues, setDiceValues] = useState([]);
  const [keptFlags, setKeptFlags] = useState(
    Array.from({ length: YACHT_RULE.DICE_COUNT }, () => false),
  );
  const [rollCount, setRollCount] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS[0]);
  const [turnCount, setTurnCount] = useState(0);
  const [scoresMap, setScoresMap] = useState(
    new Map(PLAYERS.map((p) => [p.id, {}])),
  );
  const [isGameOver, setIsGameOver] = useState(false);

  // 주사위 굴리기
  const rollDices = () => {
    if (rollCount >= YACHT_RULE.MAX_ROLL_COUNT) {
      return;
    }
    const getRandomDiceValue = () => Math.floor(Math.random() * 6) + 1;

    setDiceValues((prev) =>
      Array.from({ length: YACHT_RULE.DICE_COUNT }, (_, i) =>
        keptFlags[i] ? prev[i] : getRandomDiceValue(),
      ),
    );
    setRollCount((prev) => prev + 1);
  };

  // 주사위 고정 토글
  const toggleKeeping = (index) => {
    setKeptFlags((prev) => prev.map((kept, i) => (i === index ? !kept : kept)));
  };

  // 주사위 초기화
  const resetDices = () => {
    setDiceValues([]);
    setKeptFlags([false, false, false, false, false]);
    setRollCount(0);
  };

  // 점수 선택
  const selectCategory = (category, score) => {
    if (!diceValues.length) {
      return;
    }

    const playerId = currentPlayer.id;
    const scores = scoresMap.get(playerId);
    if (scores[category] !== undefined) {
      return;
    }

    setScoresMap((prev) => {
      const updated = new Map(prev);
      const prevScores = updated.get(playerId);
      updated.set(playerId, { ...prevScores, [category]: score });
      return updated;
    });

    resetDices();

    const currentIndex = PLAYERS.findIndex((p) => p.id === playerId);
    const nextIndex = (currentIndex + 1) % PLAYERS.length;
    const nextPlayer = PLAYERS[nextIndex];
    setCurrentPlayer(nextPlayer);

    if (nextPlayer.id === PLAYERS[0].id) {
      increaseTurnCount();
    }
  };

  // 턴 수 증가 및 게임 종료 판단
  const increaseTurnCount = () => {
    setTurnCount((prev) => {
      const next = prev + 1;
      if (next >= YACHT_RULE.MAX_TURN_COUNT) {
        setIsGameOver(true);
        return prev;
      }
      return next;
    });
  };

  return (
    <div className="p-15">
      <div className="flex items-start justify-center gap-8">
        <div className="border border-neutral-600 p-1">
          <ScoreBoard
            turnCount={turnCount}
            scoresMap={scoresMap}
            currentPlayer={currentPlayer}
            diceValues={diceValues}
            selectCategory={selectCategory}
            players={PLAYERS}
            isGameOver={isGameOver}
          />
        </div>

        <div className="w-80 p-1">
          <h1 className="mb-4 text-3xl font-[1000]">{MESSAGES.gameName}</h1>
          <DiceBoard
            diceValues={diceValues}
            keptFlags={keptFlags}
            isRolled={diceValues.length > 0}
            remainingRollCount={YACHT_RULE.MAX_ROLL_COUNT - rollCount}
            currentPlayer={currentPlayer}
            rollDices={rollDices}
            toggleKeeping={toggleKeeping}
          />
        </div>
      </div>
    </div>
  );
}
