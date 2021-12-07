import React, { useState, useEffect } from "react";
import styles from "./ChatComponent.module.scss";
import LeftDrawer from "../../helperComponents/LeftDrawer/LeftDrawer";
import ChatMain from "../../helperComponents/Chat/ChatMain";

function ChatComponent() {
  const [toggleKey, setTogglekey] = useState(false);
  return (
    <div className={styles.chatbody}>
      <LeftDrawer  props={{ toggleKey, setTogglekey }} />
      <ChatMain props={{ toggleKey, setTogglekey }} />
    </div>
  );
}

export default ChatComponent;