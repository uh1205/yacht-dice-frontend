import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MESSAGES } from "../constants/messsages";
import useYachtGame from "../hooks/useYachtGame";
import MatchPopup from "../components/online/MatchPopup";

export default function AppPage() {
  const navigate = useNavigate();
  const [inputNickname, setInputNickname] = useState("");
  const { player, isMatching, matchPopup, createPlayer, toggleMatch } =
    useYachtGame();

  const isStartDisabled = !inputNickname.trim();

  return (
    <div className="relative flex flex-col justify-center items-center gap-6 min-h-screen text-center">
      <h1 className="mb-4 w-80 font-[1000] text-3xl">
        {MESSAGES.onlineGameName}
      </h1>

      {player.id ? (
        <div className="flex flex-col items-center">
          <div className="mb-5 font-bold text-lg">
            {MESSAGES.welcome(player.nickname)}
          </div>
          <button
            className={`rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-colors duration-200 ${
              isMatching ? "bg-red-500" : "bg-green-500"
            }`}
            onClick={toggleMatch}
          >
            {isMatching ? MESSAGES.cancelMatch : MESSAGES.match}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            className="p-3 border border-gray-300 rounded-xl w-64"
            placeholder={MESSAGES.nicknameInput}
            value={inputNickname}
            onChange={(e) => setInputNickname(e.target.value)}
          />
          <button
            className={`w-64 rounded-xl px-4 py-4 font-bold text-white ${
              isStartDisabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-500"
            }`}
            disabled={isStartDisabled}
            onClick={() => createPlayer(inputNickname)}
          >
            {MESSAGES.start}
          </button>
        </div>
      )}

      <MatchPopup show={matchPopup.show} />

      {/* 오프라인 플레이 링크 */}
      <button
        className="mt-4 font-semibold text-blue-500"
        onClick={() => navigate("/offline")}
      >
        {MESSAGES.playOffline}
      </button>
    </div>
  );
}
