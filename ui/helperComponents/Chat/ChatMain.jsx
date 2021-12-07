import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./ChatMain.module.scss";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";

export default function ChatMain({props}) {
    const { toggleKey, setTogglekey } = props;
    return (
        <div className={styles.chatmain}>
            <ChatHeader props={{ toggleKey, setTogglekey }}/>
            <ChatBody />
        </div>
    )
}
