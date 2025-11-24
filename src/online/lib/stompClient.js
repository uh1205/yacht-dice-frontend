import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export function connectStomp(playerId, onConnect, onMessage) {
  if (!stompClient) {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log("[STOMP DEBUG]", str),
    });

    stompClient.onConnect = () => {
      console.log("[STOMP] Connected");
      if (onMessage)
        stompClient.subscribe(`/topic/player/${playerId}`, onMessage);
      if (onConnect) onConnect();
    };

    stompClient.activate();
  } else if (stompClient.connected) {
    if (onMessage)
      stompClient.subscribe(`/topic/player/${playerId}`, onMessage);
    if (onConnect) onConnect();
  }

  return stompClient;
}

export function subscribeRoom(roomId, onMessage) {
  if (!stompClient || !stompClient.connected) return;
  return stompClient.subscribe(`/topic/room/${roomId}`, onMessage);
}

export function sendMessage(destination, payload) {
  if (stompClient && stompClient.connected) {
    stompClient.publish({ destination, body: JSON.stringify(payload) });
  } else console.error("[STOMP] not connected");
}
