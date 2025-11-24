import { useEffect, useState } from "react";
import GameOverMessage from "../GameOverMessage";
import GameResult from "./GameResult";

export default function GameOverFlow({ finalScores, isDraw, winner, quit }) {
  const [showGameOverText, setShowGameOverText] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGameOverText(false);
      setShowResult(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center">
      {showGameOverText && <GameOverMessage />}
      {showResult && (
        <GameResult
          finalScores={finalScores}
          isDraw={isDraw}
          winner={winner}
          quit={quit}
        />
      )}
    </div>
  );
}
