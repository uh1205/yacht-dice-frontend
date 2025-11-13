import { useState } from "react";
import { PLAYERS } from "../constants/players.js";
import { MESSAGES } from "../constants/messages.js";
import DiceBoard from "./DiceBoard";

const DICE_COUNT = 5;
const MAX_ROLL_COUNT = 3;

export default function YachtGame() {
  const [diceValues, setDiceValues] = useState([]);
  const [keptFlags, setKeptFlags] = useState(
    Array.from({ length: DICE_COUNT }, () => false),
  );
  const [rollCount, setRollCount] = useState(0);
  const [currentPlayer] = useState(PLAYERS[0]);

  // 주사위 굴리기
  const rollDices = () => {
    if (rollCount >= MAX_ROLL_COUNT) return;

    const getRandomDiceValue = () => Math.floor(Math.random() * 6) + 1;

    setDiceValues((prev) =>
      Array.from({ length: DICE_COUNT }, (_, i) =>
        keptFlags[i] ? prev[i] : getRandomDiceValue(),
      ),
    );

    setRollCount((prev) => prev + 1);
  };

  // 주사위 고정 토글
  const toggleKeeping = (index) => {
    setKeptFlags((prev) => prev.map((kept, i) => (i === index ? !kept : kept)));
  };

  return (
    <div className="p-15">
      <div className="flex items-start justify-center gap-8">
        <div className="w-80 p-1">
          <h1 className="mb-4 text-3xl font-[1000]">{MESSAGES.gameName}</h1>
          <DiceBoard
            diceValues={diceValues}
            keptFlags={keptFlags}
            isRolled={diceValues.length > 0}
            remainingRollCount={MAX_ROLL_COUNT - rollCount}
            currentPlayer={currentPlayer}
            rollDices={rollDices}
            toggleKeeping={toggleKeeping}
          />
        </div>
      </div>
    </div>
  );
}
