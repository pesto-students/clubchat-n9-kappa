import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NextModal from 'react-modal';
import Image from "next/image";
import styles from "./leftdrawer.module.scss";
import { createTopics } from '../../redux/action/topics.action';
import cross from "../../../public/cross.svg";

const customStyles = {
    content: {
        top: '35%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '425px',
        maxWidth: '80%',
        height: '190px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#19181d',
        margin: '0',
        padding: '0',
    },
    overlay: {
        backgroundColor: 'rgb(25, 24, 29, 0.95)',
    }
};

export default function UpdateDPModal({ props }) {
    const dispatch = useDispatch();
    const { addTopicModal, setAddTopicModal, searchTopicName = "", setSearchText = (text) => { } } = props;
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
                        <button onClick={() => setAddTopicModal(false)}>
                            <Image src={cross} alt="plus_icon" layout="intrinsic" width={35} height={35} />
                        </button>
                    </div>
                    <div className={styles.modaltext}>
                        <input type="text" className={styles.inputtopic} value={topicName} placeholder="Add a topic" onChange={(e) => setTopicName(e.target.value)} />
                    </div>
                    <div className={styles.modalbtn}>
                        <button onClick={createNewTopic}>Add</button>
                    </div>
                </>
            </NextModal>
        </div>
    )
}
