import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import logo from "../../../public/logo.svg";
import plus from "../../../public/icons8-plus.svg";
import trending from "../../../public/hashtag.svg";
import cross from "../../../public/cross.svg";
import styles from "./leftdrawer.module.scss";
import { setUserTopics, setTrendingTopics, setCurrentChatTopic } from "../../redux/action/topics.action";
import { getProfileData } from "../../redux/action/profile.action";
import { useSelector, useDispatch } from "react-redux";
import ConfirmModal from './ConfirmModal';
import DeclineModal from './DeclineModal';
import AddTopicModal from './AddTopicModal';
import { useUser } from "../../../lib/hooks";
import Loader from 'react-loader';

export default function LeftDrawer({ props }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [userState, setUserState] = useState(null);
    const { finished, hasUser = false, user, error } = useUser();
    if (finished && hasUser) {
        // console.log("USER::", user.id);
        if (!userState) {
            setUserState(user);
        }
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    const [declineModal, setDeclineModal] = useState(false);
    const [addTopicModal, setAddTopicModal] = useState(false);
    const [topicItem, setTopicItem] = useState(null);
    const [currentChatTopicItem, setCurrentChatTopicItem] = useState(null);
    const { toggleKey, setTogglekey } = props;
    useEffect(() => {
        if (userState) {
            dispatch(setUserTopics(user.id));
            dispatch(setTrendingTopics());
            dispatch(getProfileData(user.id));
        }
    }, [userState]);

    const userProfile = useSelector(
        (state) => state.profile
    );

    const { isLoaded = false, profileData } = userProfile;

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setTopicItem(null);
        setIsOpen(false);
    }
    const userTopicsLists = useSelector(
        (state) => state.topics.userTopics
    );
    const trendingTopicsLists = useSelector(
        (state) => state.topics.trendingTopics
    );

    useEffect(() => {
        if (currentChatTopicItem) {
            dispatch(setCurrentChatTopic(currentChatTopicItem));
            if (router.pathname !== '/chat') {
                router.push('/chat');
            }
        }
    }, [currentChatTopicItem]);

    useEffect(() => {
        if (topicItem && checkDuplication(topicItem)) {
            setIsOpen(true);
        } else if (topicItem && !checkDuplication(topicItem)) {
            setTopicItem(null);
            setDeclineModal(true);
        }
    }, [topicItem]);

    const checkDuplication = (topicItem) => {
        const check = userTopicsLists.some(item => item.topic.id === topicItem.id);
        return !check;
    }

    useEffect(() => {
        if (modalIsOpen || declineModal || addTopicModal) {
            setTogglekey(false);
        }
    }, [modalIsOpen, declineModal, addTopicModal]);

    return (
        <>
            {!userState ? <Loader /> :
                <div className={`${styles.leftNav} ${toggleKey ? styles.leftNavExpand : styles.leftNavCollapse}`}>
                    <div className={styles.logoDiv}>
                        {toggleKey && <div className={styles.toggleCrossBtn} onClick={() => setTogglekey(false)}>
                            <Image src={cross} alt="plus_icon" layout="intrinsic" width={35} height={35} />
                        </div>}
                        <div className={styles.logocover}>
                            <Image src={logo} alt="Clubchat_logo" layout="responsive" width={211} height={175} />
                        </div>

                    </div>
                    {isLoaded && <div className={styles.profileName} onClick={() => { router.push('/profile') }}>
                        <span>{profileData.userProfile.username}</span>
                    </div>}
                    <div className={styles.addtopic}>
                        <button onClick={() => setAddTopicModal(true)}><span><Image src={plus} alt="plus_icon" layout="intrinsic" width={20} height={20} />
                            <span>Add Topic</span></span></button>
                    </div>
                    <div className={styles.yourtopics}>
                        <div className={styles.yourtopicsheading}><span><Image src={trending} alt="plus_icon" layout="intrinsic" width={20} height={20} />
                            <span>Your Topics</span></span>
                        </div>
                        <div className={styles.topicslist}>
                            {userTopicsLists && userTopicsLists.map(item => (
                                <span key={item.topic.id} onClick={() => { setCurrentChatTopicItem(item); setTogglekey(false); }}>{item.topic.name}</span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.trendingtopics}>
                        <div className={styles.trendingtopicsheading}><span><Image src={trending} alt="plus_icon" layout="intrinsic" width={20} height={20} />
                            <span>Trending Topics</span></span>
                        </div>
                        <div className={styles.trendingtopicslist}>
                            {trendingTopicsLists && trendingTopicsLists.map(item => (
                                <span key={item.id} onClick={() => setTopicItem(item)}>{item.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {modalIsOpen && <ConfirmModal props={{ modalIsOpen, closeModal, topicItem, user: user || null }} />}
            {declineModal && <DeclineModal props={{ declineModal, setDeclineModal }} />}
            {addTopicModal && <AddTopicModal props={{ addTopicModal, setAddTopicModal }} />}
        </>
    )
}
