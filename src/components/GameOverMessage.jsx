import { MESSAGES } from "../constants/messages.js";

export default function GameOverMessage() {
  return (
    <div className="animate-fadeIn text-center">
      <h2 className="mt-10 text-4xl font-extrabold drop-shadow-lg">
        {MESSAGES.gameOver}
      </h2>
    </div>
  );
}
