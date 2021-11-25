import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./ProfileMain.module.scss";
import UpdateDPModal from "./UpdateDPModal";
import { useSelector } from "react-redux";

export default function ProfileBody({ props }) {
    const { username, email, totalChat, totalTopicsFollowing, dpLink } = props;
    
    const userTopicsLists = useSelector(
        (state) => state.topics.userTopics
    );
    const [modalIsOpen, setIsOpen] = useState(false);

    const avatar = require(`../../../public/assets/${dpLink}.png`);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            <div className={styles.profilebody}>
                <div className={styles.profilebodytop}>
                    <div className={styles.profileinfo}>
                        <div>
                            <div className={styles.username}><span>{username}</span></div>
                            <br />
                            <div className={styles.email}><span>{email}</span></div>
                            <br /><br />
                            <div className={styles.totalchat}><span>Total Chat - {totalChat}</span></div>
                            <br />
                            <div className={styles.totalfollowing}><span>Total Topics Following - {totalTopicsFollowing}</span></div>
                        </div>
                    </div>
                    <div className={styles.profileimage}>
                        <Image src={avatar} alt="plus_icon" layout="intrinsic" onClick={openModal} width={200} height={200} />
                    </div>
                </div>
                <div className={styles.profilebodybottom}>
                    <div className={styles.profilebodybottomheading}>Topics:</div>
                    <div className={styles.topicstack}>
                        {userTopicsLists.map((item, indx) => (
                            <div className={styles.chipstyle}
                                key={item.topic.id}
                            >
                                <span>{"#" + item.topic.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <UpdateDPModal props={{ modalIsOpen, closeModal }} />
        </>
    )
}
