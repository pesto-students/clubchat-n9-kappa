import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./ProfileMain.module.scss";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileMain() {
    
    const userProfile = useSelector(
        (state) => state.profile
    );
    const { isLoaded = false, profileData = {} } = userProfile;

    return (
        <div className={styles.profilemain}>
            {isLoaded && <>
                <ProfileHeader props={{
                    username: profileData.userProfile.username,
                }} />
                <ProfileBody props={{
                    username: profileData.userProfile.username,
                    email: profileData.userProfile.email,
                    totalChat: profileData.totalChat,
                    totalTopicsFollowing: profileData.totalTopicsFollowing,
                    dpLink: profileData.dpLink,
                }} />
            </>}
        </div>
    )
}
