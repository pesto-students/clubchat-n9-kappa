import React, { useState, useEffect } from "react";
import styles from "./ChatComponent.module.scss";
import LeftDrawer from "../../helperComponents/LeftDrawer/LeftDrawer";
import ChatMain from "../../helperComponents/Chat/ChatMain";

function ChatComponent() {
  return (
    <div className={styles.chatbody}>
      <LeftDrawer />
      <ChatMain />
    </div>
  );
}

export default ChatComponent;