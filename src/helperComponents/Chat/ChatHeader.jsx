import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./ChatMain.module.scss";
import { searchTopic, clearSearchTopic } from "../../redux/action/topics.action";
import { useSelector, useDispatch } from "react-redux";

import ConfirmModal from '../LeftDrawer/ConfirmModal';
import DeclineModal from '../LeftDrawer/DeclineModal';
import AddTopicModal from '../LeftDrawer/AddTopicModal';

export default function ChatHeader() {
    const [searchText, setSearchText] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [declineModal, setDeclineModal] = useState(false);
    const [addTopicModal, setAddTopicModal] = useState(false);
    const [topicItem, setTopicItem] = useState(null);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const searchResult = useSelector(
        (state) => state.topics.topicSearchResult
    );

    const userProfile = useSelector(
        (state) => state.profile
    );
    const userTopicsLists = useSelector(
        (state) => state.topics.userTopics
    );
    const { isLoaded = false, profileData } = userProfile;

    useEffect(() => {
        if (isLoaded) {
            setUser({ id: profileData.profileId });
        }
    }, [isLoaded]);

    useEffect(() => {
        if (searchText.length > 3) {
            dispatch(searchTopic(searchText));
        }
        if (searchText.length === 0 && searchResult.length > 0) {
            dispatch(clearSearchTopic());
        }
    }, [searchText]);

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

    function closeModal() {
        setTopicItem(null);
        setSearchText('');
        setIsOpen(false);
    }

    return (
        <>
            <div className={styles.chatheader}>
                <div className={styles.chatheadersearch}>
                    <input type="text" className={styles.searchinput} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    {searchText.length > 0 && <span className={styles.crossbtn} onClick={() => setSearchText("")}>X</span>}
                    {searchText.length > 3 &&
                        <div className={styles.chatsearchresult}>
                            {(searchResult && searchResult.length === 0) && <div onClick={() => setAddTopicModal(true)}>
                                <span>Add this topic - {searchText}</span>
                            </div>}
                            {(searchResult && searchResult.length > 0) && searchResult.map(item => (
                                <div key={item} onClick={() => setTopicItem(item)}>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>}
                </div>
                <div className={styles.chatheaderlogout}>Logout</div>
            </div>
            {modalIsOpen && (<ConfirmModal props={{ modalIsOpen, closeModal, topicItem, user: { ...user } }} />)}
            {declineModal && (<DeclineModal props={{ declineModal, setDeclineModal }} />)}
            {addTopicModal && (<AddTopicModal props={{ addTopicModal, setAddTopicModal, searchTopicName: searchText, setSearchText }} />)}

        </>
    )
}
