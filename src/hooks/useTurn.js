import { useState } from "react";
import { PLAYERS } from "../constants/players";
import { YACHT_RULE } from "../constants/yachtRule";

export function useTurn() {
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS[0]);
  const [turnCount, setTurnCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const nextTurn = () => {
    const idx = PLAYERS.findIndex((p) => p.id === currentPlayer.id);
    const nextIdx = (idx + 1) % PLAYERS.length;
    const next = PLAYERS[nextIdx];

    setCurrentPlayer(next);

    if (next.id === PLAYERS[0].id) {
      setTurnCount((prev) => {
        const next = prev + 1;
        if (next >= YACHT_RULE.MAX_ROUNDS) {
          setIsGameOver(true);
          return prev;
        }
        return next;
      });
    }
  };

  const resetTurn = () => {
    setCurrentPlayer(PLAYERS[0]);
    setTurnCount(0);
    setIsGameOver(false);
  };

  return {
    currentPlayer,
    turnCount,
    isGameOver,
    nextTurn,
    resetTurn,
  };
}
