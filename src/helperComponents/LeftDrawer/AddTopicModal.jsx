import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NextModal from 'react-modal';
import Image from "next/image";
import styles from "./LeftDrawer.module.scss";
import { createTopics } from '../../redux/action/topics.action';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '425px',
        height: '190px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
};

export default function UpdateDPModal({ props }) {
    const dispatch = useDispatch();
    const { addTopicModal, setAddTopicModal, searchTopicName="", setSearchText=(text) => {} } = props;
    const [topicName, setTopicName] = useState(searchTopicName);
    const createNewTopic = () => {
        if (topicName.length > 3) {
            dispatch(createTopics(topicName));
            setSearchText("");
            setAddTopicModal(false);
        }
    }

    return (
        <div>
            <NextModal
                isOpen={addTopicModal}
                onRequestClose={() => setAddTopicModal(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <>
                    <div className={styles.closebtn}>
                        <button onClick={() => setAddTopicModal(false)}>X</button>
                    </div>
                    <div className={styles.modaltext}>
                        <input type="text" className={styles.inputtopic} value={topicName} onChange={(e) => setTopicName(e.target.value)} />
                    </div>
                    <div className={styles.modalbtn}>
                        <button onClick={createNewTopic}>Add</button>
                    </div>
                </>
            </NextModal>
        </div>
    )
}
