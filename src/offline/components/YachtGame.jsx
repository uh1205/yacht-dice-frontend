import DiceBoard from "./DiceBoard";
import ScoreBoard from "./ScoreBoard";
import GameOverFlow from "./GameOverFlow";

import { MESSAGES } from "../constants/messages.js";
import { PLAYERS } from "../constants/players.js";
import { useDice } from "../hooks/useDice";
import { useScores } from "../hooks/useScores";
import { useTurn } from "../hooks/useTurn";

export default function YachtGame() {
  const dice = useDice();
  const scores = useScores();
  const turn = useTurn();

  const selectCategory = (category, score) => {
    if (!dice.diceValues.length) return;
    scores.setCategoryScore(turn.currentPlayer.id, category, score);
    dice.resetDice();
    turn.nextTurn();
  };

  const restart = () => {
    dice.resetDice();
    scores.resetScores();
    turn.resetTurn();
  };

  return (
    <div className="px-4 py-15">
      <div className="flex flex-wrap-reverse justify-center content-start gap-8">
        <div className="p-1 border border-neutral-600">
          <ScoreBoard
            turnCount={turn.turnCount}
            scoresMap={scores.scoresMap}
            currentPlayer={turn.currentPlayer}
            diceValues={dice.diceValues}
            players={PLAYERS}
            isGameOver={turn.isGameOver}
            selectCategory={selectCategory}
          />
        </div>

        <div className="p-1">
          <h1 className="mb-4 w-80 font-[1000] text-3xl">
            {MESSAGES.gameName}
          </h1>
          {turn.isGameOver ? (
            <GameOverFlow finalScores={scores.finalScores} restart={restart} />
          ) : (
            <DiceBoard
              diceValues={dice.diceValues}
              keptFlags={dice.keptFlags}
              rollCount={dice.rollCount}
              rollDices={dice.rollDices}
              toggleKeeping={dice.toggleKeeping}
              currentPlayer={turn.currentPlayer}
            />
          )}
        </div>
      </div>
    </div>
  );
}
