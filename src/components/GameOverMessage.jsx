import { MESSAGES } from "../constants/messsages";

export default function GameOverMessage() {
  return (
    <div className="text-center animate-fadeIn">
      <h2 className="drop-shadow-lg mt-10 font-extrabold text-4xl">
        {MESSAGES.gameOver}
      </h2>
    </div>
  );
}
