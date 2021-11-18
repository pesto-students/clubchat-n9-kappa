import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/layout";
import useChat from "../../../hooks/useChat";
import { useUser } from "../../../lib/hooks";
import styles from "./ChatMain.module.scss";
import Image from "next/image";
import sendIcon from "../../../public/send-button.png";

function ChatBody({
  roomId,
  messages,
  newMessage,
  handleNewMessageChange,
  handleSendMessage,
  messagesEndRef,
}) {
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
                    key={i}
                    className={`${styles.messageItem} ${
                      message.ownedByCurrentUser
                        ? styles.myUsername
                        : styles.otherUsername
                    }`}
                  >
                    {message.userName}
                  </li>
                  <li
                    key={i}
                    className={`${styles.messageItem} ${
                      message.ownedByCurrentUser
                        ? styles.timestamp
                        : styles.timestamp
                    }`}
                  >
                    {"Nov 14, 6:47 PM"}
                  </li>
                </div>

                <li
                  key={i}
                  className={`${styles.messageItem} ${
                    message.ownedByCurrentUser
                      ? styles.myMessage
                      : styles.receivedMessage
                  }`}
                >
                  {message.body}
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
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const user = useUser();
  console.log(user);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    // window.scrollTo({
    //     top: messagesEndRef.current.offsetTop,
    //     behavior: "smooth"
    // });
    console.log("Ref:", messagesEndRef);
  };

  useEffect(() => {
    try {
      fetch("/api/topics", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const allTopics = data.topics;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMsg(error.message);
    }

    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        handleSendMessage();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const createRoom = (room) => {
    setRoomId(room);

    if (errorMsg) setErrorMsg("");
    const body = {
      userId: user.id,
      topicId: "1ee6baa8-b232-4173-829b-5ff09c36e43e",
    };

    try {
      const res = fetch("/api/user_topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        debugger;
      } else {
        throw new Error(res.text());
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setErrorMsg(error.message);
    }
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value, user.username);
    console.log(user.username);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, user.username);
    console.log(user.username);
    // console.log(user)
    setNewMessage("");
    scrollToBottom();
  };

  return (
    <div className={styles.width_100}>
      <div className={styles.topic}>
        <button onClick={() => createRoom("JavaScript")}> JavaScript </button>
        <button onClick={() => createRoom("React")}> React </button>
        <button onClick={() => createRoom("Angular")}> Angular </button>
      </div>
      <ChatBody
        roomId={roomId}
        messages={messages}
        newMessage={newMessage}
        username={user}
        handleNewMessageChange={handleNewMessageChange}
        handleSendMessage={handleSendMessage}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
}

export default ChatPage;