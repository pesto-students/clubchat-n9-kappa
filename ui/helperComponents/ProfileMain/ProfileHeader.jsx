import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./ProfileMain.module.scss";
import logout from "../../../public/logout.svg";

export default function LeftDrawer({ props }) {
    const { username, toggleKey, setTogglekey } = props;
    return (
        <div className={styles.profileheader}>
             <div className={styles.togglekey} onClick={() => setTogglekey(!toggleKey)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={styles.welcometext}>Welcome {username}</div>
            <a className={styles.chatheaderlogout} href="/api/logout">
                <Image src={logout} alt="plus_icon" layout="intrinsic" width={35} height={35} />
            </a>
        </div>
    )
}
