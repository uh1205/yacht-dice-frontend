import { useState, useEffect, useRef } from "react";
import { connectStomp, subscribeRoom, sendMessage } from "../lib/stompClient";

export default function useYachtGame() {
  const [player, setPlayer] = useState({ id: null, nickname: null });
  const [gameState, setGameState] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [matchPopup, setMatchPopup] = useState({ show: false, roomId: null });

  const stompConnectedRef = useRef(false);
  const roomSubscriptionRef = useRef(null);

  // 초기 로컬 복구
  useEffect(() => {
    const storedPlayer = {
      id: localStorage.getItem("playerId"),
      nickname: localStorage.getItem("nickname"),
    };
    const savedMode = localStorage.getItem("mode");
    const savedRoomId = localStorage.getItem("roomId");

    if (storedPlayer.id && storedPlayer.nickname) setPlayer(storedPlayer);

    if (savedMode === "game" && savedRoomId && storedPlayer.id) {
      restoreOrStartGame(storedPlayer.id, savedRoomId);
    } else if (storedPlayer.id) {
      subscribePlayerTopic(storedPlayer.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // STOMP 연결 + player topic 구독
  const subscribePlayerTopic = (playerIdToUse) => {
    connectStomp(
      playerIdToUse,
      () => (stompConnectedRef.current = true),
      (msg) => handlePlayerMessage(JSON.parse(msg.body), playerIdToUse),
    );
  };

  const handlePlayerMessage = (data, playerIdToUse) => {
    console.log("[WS][PLAYER MESSAGE]", data);

    if (data.type === "MATCH_SUCCESS") {
      setMatchPopup({ show: true, roomId: data.roomId });
      setTimeout(() => {
        restoreOrStartGame(playerIdToUse, data.roomId);
        setMatchPopup({ show: false, roomId: null });
      }, 3000);
    } else if (data.type === "GAME_STATE") {
      setGameState({ ...data });
    }
  };

  // restoreGame + startGame 통합
  const restoreOrStartGame = async (playerIdToUse, roomIdToUse) => {
    if (!stompConnectedRef.current) {
      await new Promise((resolve) =>
        connectStomp(
          playerIdToUse,
          () => {
            stompConnectedRef.current = true;
            resolve();
          },
          (msg) => handlePlayerMessage(JSON.parse(msg.body), playerIdToUse),
        ),
      );
    }

    if (roomSubscriptionRef.current) roomSubscriptionRef.current.unsubscribe();
    roomSubscriptionRef.current = subscribeRoom(roomIdToUse, (msg) => {
      try {
        const parsed = JSON.parse(msg.body);
        console.log("[WS][ROOM MESSAGE]", parsed);
        setGameState({ ...parsed });
      } catch (err) {
        console.error("Room message parse failed", err);
      }
    });

    const res = await fetch(
      `http://localhost:8080/game/${roomIdToUse}/state?playerId=${playerIdToUse}`,
    );
    if (!res.ok) throw new Error("Failed to fetch game state");
    setGameState(await res.json());

    setRoomId(roomIdToUse);
    localStorage.setItem("mode", "game");
    localStorage.setItem("roomId", roomIdToUse);
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

  // 게임 액션
  const sendGameAction = (actionType, payload) => {
    if (!roomId) return;
    sendMessage(`/app/game/${roomId}/${actionType}`, {
      playerId: player.id,
      ...payload,
    });
  };

  // 게임 종료
  const quitGame = () => {
    if (roomSubscriptionRef.current) {
      roomSubscriptionRef.current.unsubscribe();
      roomSubscriptionRef.current = null;
    }
    setGameState(null);
    setRoomId(null);
    setIsMatching(false);
    localStorage.removeItem("mode");
    localStorage.removeItem("roomId");

    if (player.id) subscribePlayerTopic(player.id);
  };

  return {
    player,
    gameState,
    roomId,
    isMatching,
    matchPopup,
    createPlayer,
    toggleMatch,
    sendGameAction,
    quitGame,
  };
}
