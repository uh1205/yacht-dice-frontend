import { useState, useMemo, useEffect } from "react";
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
  const [showGameOverText, setShowGameOverText] = useState(false);
  const [showResult, setShowResult] = useState(false);

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
    setKeptFlags(Array.from({ length: YACHT_RULE.DICE_COUNT }, () => false));
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
        setShowGameOverText(true);
        return prev;
      }
      return next;
    });
  };

  // 게임 종료 메시지 출력 1.5초 뒤 결과 출력
  useEffect(() => {
    if (showGameOverText) {
      const timer = setTimeout(() => {
        setShowGameOverText(false);
        setShowResult(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showGameOverText]);

  // 최종 점수 계산
  const finalScores = useMemo(() => {
    const result = [];
    scoresMap.forEach((scores, playerId) => {
      const total = Object.values(scores).reduce((a, b) => a + b, 0);
      const player = PLAYERS.find((p) => p.id === playerId);
      result.push({ ...player, total });
    });
    return result.sort((a, b) => b.total - a.total);
  }, [scoresMap]);

  // 게임 재시작
  const resetGame = () => {
    setScoresMap(new Map(PLAYERS.map((p) => [p.id, {}])));
    setCurrentPlayer(PLAYERS[0]);
    setTurnCount(0);
    setDiceValues([]);
    setKeptFlags(Array.from({ length: YACHT_RULE.DICE_COUNT }, () => false));
    setRollCount(0);
    setIsGameOver(false);
    setShowGameOverText(false);
    setShowResult(false);
  };

  // 게임 종료 메시지 렌더링
  const renderGameOverText = () => (
    <div className="animate-fadeIn text-center">
      <h2 className="mt-10 text-4xl font-extrabold drop-shadow-lg">
        {MESSAGES.gameOver}
      </h2>
    </div>
  );

  // 결과 화면 렌더링
  const renderGameResult = () => {
    const winner = finalScores[0];

    const topPlayers = finalScores.filter(
      (player) => player.total === winner.total,
    );

    const isDraw = topPlayers.length > 1;

    return (
      <div className="animate-fadeIn text-center">
        <h2 className="mt-10 mb-4 text-3xl font-bold">
          {MESSAGES.finalResult}
        </h2>

        {isDraw ? (
          <p className="mb-2 text-2xl font-bold">{MESSAGES.draw}</p>
        ) : (
          <p className="mb-2 text-2xl">
            <span className="font-bold">{MESSAGES.winner(winner.name)}</span>
          </p>
        )}

        <table className="m-6 mx-auto border-collapse border border-gray-400 text-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">
                {MESSAGES.player}
              </th>
              <th className="border border-gray-400 px-4 py-2">
                {MESSAGES.total}
              </th>
            </tr>
          </thead>
          <tbody>
            {finalScores.map((r) => (
              <tr key={r.id}>
                <td className="border border-gray-400 px-4 py-2">{r.name}</td>
                <td className="border border-gray-400 px-4 py-2 font-bold">
                  {r.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={resetGame}
          className="rounded-2xl bg-blue-500 px-6 py-3 font-bold text-white transition-all hover:bg-blue-400"
        >
          {MESSAGES.restartGame}
        </button>
      </div>
    );
  };

  return (
    <div className="px-4 py-15">
      <div className="flex flex-wrap-reverse content-start justify-center gap-8">
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

        <div className="p-1">
          <h1 className="mb-4 w-80 text-3xl font-[1000]">
            {MESSAGES.gameName}
          </h1>
          {isGameOver ? (
            showGameOverText ? (
              renderGameOverText()
            ) : showResult ? (
              renderGameResult()
            ) : null
          ) : (
            <DiceBoard
              diceValues={diceValues}
              keptFlags={keptFlags}
              isRolled={diceValues.length > 0}
              remainingRollCount={YACHT_RULE.MAX_ROLL_COUNT - rollCount}
              currentPlayer={currentPlayer}
              rollDices={rollDices}
              toggleKeeping={toggleKeeping}
            />
          )}
        </div>
      </div>
    </div>
  );
}
