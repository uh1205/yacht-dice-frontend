import { MESSAGES } from "../../constants/messsages";
import Dice from "./Dice";

export default function DiceBoard({
  isRolled,
  isMyTurn,
  currentPlayer,
  diceValues,
  diceLocks,
  remainingRollCount,
  rollDice,
  toggleLock,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl">
          {isMyTurn
            ? MESSAGES.myTurn
            : MESSAGES.playerTurn(currentPlayer.nickname)}
        </h1>
        <p className="font-bold text-lg">
          {MESSAGES.remainingRoll(remainingRollCount)}
        </p>
      </div>

      <div className="h-40">
        <div className="flex justify-center items-center gap-3 mb-4 p-4 h-20 font-semibold text-lg">
          {isRolled
            ? diceValues.map((v, i) => (
                <Dice
                  key={i}
                  value={v}
                  locked={diceLocks[i]}
                  isMyTurn={isMyTurn}
                  canRoll={remainingRollCount > 0}
                  onClick={() => isMyTurn && toggleLock(i)}
                />
              ))
            : isMyTurn
              ? MESSAGES.rollPrompt
              : MESSAGES.waitPrompt}
        </div>

        {isMyTurn && (
          <div className="flex justify-center items-center">
            <button
              onClick={rollDice}
              disabled={remainingRollCount <= 0}
              className="bg-blue-500 hover:bg-blue-400 disabled:bg-gray-400 shadow-lg px-10 py-4 rounded-2xl font-bold text-white transition-all"
            >
              {MESSAGES.rollButton}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
