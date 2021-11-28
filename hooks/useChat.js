import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useUser } from "../lib/hooks";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = parseInt(process.env.PORT, 10) ? 'https://club-chat.herokuapp.com' : "http://localhost:3000";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  const user = useUser();

  useEffect(() => {
    setMessages([]);
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.userId === user.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody, userName, timestamp, dpLink) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      text: messageBody,
      userId: user.id,
      userName: userName,
      createdAt: timestamp,
      dpLink: dpLink
    });
  };

  return { messages, sendMessage, setMessages };
};

export default useChat;
