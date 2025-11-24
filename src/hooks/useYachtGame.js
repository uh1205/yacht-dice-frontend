import { useState, useEffect, useRef } from "react";
import { connectStomp } from "../lib/stompClient";

export default function useYachtGame() {
  const [player, setPlayer] = useState({ id: null, nickname: null });
  const [roomId, setRoomId] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [matchPopup, setMatchPopup] = useState({ show: false, roomId: null });

  const stompConnectedRef = useRef(false);

  // 초기 로컬 복구
  useEffect(() => {
    const storedPlayer = {
      id: localStorage.getItem("playerId"),
      nickname: localStorage.getItem("nickname"),
    };

    if (storedPlayer.id && storedPlayer.nickname) setPlayer(storedPlayer);

    if (storedPlayer.id) {
      subscribePlayerTopic(storedPlayer.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // STOMP 연결 + player topic 구독
  const subscribePlayerTopic = (playerIdToUse) => {
    connectStomp(
      playerIdToUse,
      () => (stompConnectedRef.current = true),
      (msg) => handlePlayerMessage(JSON.parse(msg.body)),
    );
  };

  const handlePlayerMessage = (data) => {
    console.log("[WS][PLAYER MESSAGE]", data);

    if (data.type === "MATCH_SUCCESS") {
      setMatchPopup({ show: true, roomId: data.roomId });
      setTimeout(() => {
        setMatchPopup({ show: false, roomId: null });
      }, 3000);
    }
  };

  // 플레이어 생성
  const createPlayer = async (nickname) => {
    const res = await fetch("http://localhost:8080/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname }),
    });
    if (!res.ok) throw new Error("Failed to create player");
    const data = await res.json();
    localStorage.setItem("playerId", data.playerId);
    localStorage.setItem("nickname", data.nickname);
    setPlayer({ id: data.playerId, nickname: data.nickname });
    subscribePlayerTopic(data.playerId);
  };

  // 매칭 요청/취소
  const toggleMatch = async () => {
    if (!player.id) throw new Error("No player info");
    const url = isMatching ? "match/cancel" : "match/join";

    const res = await fetch(`http://localhost:8080/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId: player.id }),
    });
    if (!res.ok) throw new Error(`${isMatching ? "Cancel" : "Join"} failed`);
    setIsMatching(!isMatching);
  };

  return {
    player,
    roomId,
    isMatching,
    matchPopup,
    createPlayer,
    toggleMatch,
  };
}
