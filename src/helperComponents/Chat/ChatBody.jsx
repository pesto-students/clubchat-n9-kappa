import React, { useEffect, useRef, useState } from "react";
import useChat from "../../../hooks/useChat";
import { useUser } from "../../../lib/hooks";
import styles from "./ChatMain.module.scss";
import Image from "next/image";
import sendIcon from "../../../public/send-button.png";
import { useSelector } from "react-redux";
import Router from "next/router";

function ChatBody({
  roomId,
  messages,
  newMessage,
  handleNewMessageChange,
  handleSendMessage,
  messagesEndRef,
  timestamp,
}) {
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("do validate");
      e.preventDefault();
      if (newMessage.length > 0) {
        handleSendMessage();
      }
    }
  };
  return (
    <div className={styles.chatRoomContainer}>
      <h1 className={styles.roomName}>Room: {roomId}</h1>
      <div className={styles.messagesContainer}>
        <ol className={styles.messagesList}>
          {messages.map((message, i) => (
            <div
              className={
                message.ownedByCurrentUser
                  ? styles.userImg
                  : styles.otherUsernameContainer
              }
            >
              <div>
                {/* <Image src={"logo"} width={40} height={40} /> */}
                <img
                  src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                  className={styles.profileImg}
                ></img>
              </div>
              <div>
                <div
                  className={
                    message.ownedByCurrentUser
                      ? styles.myUsernameContainer
                      : styles.otherUsernameContainer
                  }
                >
                  <li
                    // key={i}
                    className={`${styles.messageItem} ${
                      message.ownedByCurrentUser
                        ? styles.myUsername
                        : styles.otherUsername
                    }`}
                  >
                    {message.userName}
                  </li>
                  <li
                    // key={i}
                    className={`${styles.messageItem} ${
                      message.ownedByCurrentUser
                        ? styles.timestamp
                        : styles.timestamp
                    }`}
                  >
                    {message.createdAt}
                  </li>
                </div>

                <li
                  //   key={i}
                  className={`${styles.messageItem} ${
                    message.ownedByCurrentUser
                      ? styles.myMessage
                      : styles.receivedMessage
                  }`}
                >
                  {message.text}
                </li>
                <div ref={messagesEndRef} />
              </div>
            </div>
          ))}
        </ol>
      </div>
      <div className={styles.chatInputBorder}>
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className={styles.newMessageInputField}
          onKeyDown={_handleKeyDown}
        />
        <div className={styles.sendBtn} onClick={handleSendMessage}>
          <Image src={sendIcon} width={25} height={25} />
        </div>
      </div>
    </div>
  );
}

function ChatPage() {
  const [roomId, setRoomId] = useState("random");
  var { messages, sendMessage, setMessages } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [errorMsg, setErrorMsg] = useState("");
  var [shouldCallApi, setCallApi] = useState(true);

  const user = useUser();
  //   console.log("user::", user)
  //   if (!user) {
  //       Router.push('/login');
  //   }
  let timestamp;

  const createRoom = (room) => {
    setRoomId(room);

    console.log("roomid::", room)
    if (errorMsg) setErrorMsg("");
  };

  const selectedTopics = useSelector((state) => state.topics);
  console.log("selectedTopics", selectedTopics);

  useEffect(() => {
    if (shouldCallApi) {
        if (selectedTopics.currentChatTopic) {
            if (selectedTopics.currentChatTopic.topic) {
                createRoom(selectedTopics.currentChatTopic.topic.name);
                console.log(
                  "selectedTopics::",
                  selectedTopics.currentChatTopic.topic.name
                );
        
                if (selectedTopics.currentChatTopic.topic) {
                  try {
                    fetch(
                      `/api/messages?topicId=${selectedTopics.currentChatTopic.topic.id}`,
                      {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (messages.length === 0) {
                          for (let i = 0; i < data.messages.length; i++) {
                            data.messages[i].ownedByCurrentUser =
                              data.messages[i].userName === user.username;
                          }
                          setMessages(data.messages);
                          console.log("messages::", data.messages);
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } catch (error) {
                    console.error("An unexpected error occurred:", error);
                    setErrorMsg(error.message);
                  }
                }
              }
        }
      
    }
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    console.log("Ref:", messagesEndRef);
  };

  const handleNewMessageChange = (event) => {
    setCallApi(false);
    setNewMessage(event.target.value, user.username);
  };

  const handleSendMessage = () => {
    timestamp = new Date().toLocaleString();
    sendMessage(newMessage, user.username, timestamp);
    setNewMessage("");
    scrollToBottom();
    setCallApi(true);

    const body = {
      text: newMessage,
      userId: user.id,
      username: user.username,
      topicId: selectedTopics.currentChatTopic.topic.id,
      createdAt: timestamp,
    };

    try {
      const res = fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        debugger;
        console.log(res);
      } else {
        throw new Error(res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }

    console.log("SendMesseges::", messages);
  };

  return (
    <div className={styles.width_100}>
      <ChatBody
        roomId={roomId}
        messages={messages}
        newMessage={newMessage}
        username={user}
        timestamp={timestamp}
        handleNewMessageChange={handleNewMessageChange}
        handleSendMessage={handleSendMessage}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
}

export default ChatPage;