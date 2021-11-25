import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./ChatMain.module.scss";
import { useUser } from "../../../lib/hooks";

export default function LeftDrawer() {
    const user = useUser();
    return (
        <div className={styles.chatheader}>
            <div>Welcome {user.username}</div>
            
            <a href="/api/logout" className={styles.logoutText}>Logout</a>
        </div>
    )
}
