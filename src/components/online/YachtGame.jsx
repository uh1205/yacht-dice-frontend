import { MESSAGES } from "../../constants/messsages";
import DiceBoard from "./DiceBoard";
import ScoreBoard from "./ScoreBoard";
import GameOverFlow from "./GameOverFlow";

export default function YachtGame({ gameState, playerId, onAction, onQuit }) {
  const {
    totalRounds,
    bonusScore,
    bonusThreshold,
    upperCategories,
    lowerCategories,
    players,
    currentPlayer,
    isGameOver,
    isRolled,
    currentRound,
    remainingRollCount,
    diceValues,
    diceLocks,
    possibleScores,
    playerStates,
    isDraw,
    winner,
  } = gameState;

  const isMyTurn = currentPlayer.playerId === playerId;

  // 주사위 굴리기
  const handleRollDice = () => {
    if (!isMyTurn || isGameOver) return;
    onAction("roll-dice", {});
  };

  // 잠금/해제
  const handleToggleLock = (index) => {
    if (!isMyTurn || isGameOver) return;
    onAction(diceLocks[index] ? "unlock-dice" : "lock-dice", {
      diceIndex: index,
    });
  };

  // 점수 선택
  const handleRecordScore = (categoryName) => {
    if (!isMyTurn || isGameOver) return;
    onAction("record-score", { categoryName });
  };

  return (
    <div className="px-4 py-15">
      <div className="flex flex-wrap-reverse justify-center content-start gap-8">
        <div className="p-1 border border-neutral-600">
          <ScoreBoard
            totalRounds={totalRounds}
            bonusScore={bonusScore}
            bonusThreshold={bonusThreshold}
            players={players}
            upperCategories={upperCategories}
            lowerCategories={lowerCategories}
            isGameOver={isGameOver}
            isRolled={isRolled}
            currentRound={currentRound}
            currentPlayer={currentPlayer}
            possibleScores={possibleScores}
            playerStates={playerStates}
            recordScore={handleRecordScore}
          />
        </div>

        <div className="p-1">
          <h1 className="mb-4 w-80 font-[1000] text-3xl">
            {MESSAGES.onlineGameName}
          </h1>

          {isGameOver ? (
            <GameOverFlow
              finalScores={playerStates.map((ps) => ({
                playerId: ps.playerId,
                nickname: players.find((p) => p.playerId === ps.playerId)
                  ?.nickname,
                total: ps.total,
              }))}
              isDraw={isDraw}
              winner={winner}
              quit={onQuit}
            />
          ) : (
            <DiceBoard
              isRolled={isRolled}
              isMyTurn={isMyTurn}
              currentPlayer={currentPlayer}
              diceValues={diceValues}
              diceLocks={diceLocks}
              remainingRollCount={remainingRollCount}
              rollDice={handleRollDice}
              toggleLock={handleToggleLock}
            />
          )}
        </div>
      </div>
    </div>
  );
}
