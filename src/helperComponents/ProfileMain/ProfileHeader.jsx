import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./ProfileMain.module.scss";

export default function LeftDrawer({ props }) {
    const { username } = props;
    return (
        <div className={styles.profileheader}>
            <div>Welcome {username}</div>
            <div>Logout</div>
        </div>
    )
}
