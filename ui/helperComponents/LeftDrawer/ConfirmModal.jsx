import React from "react";
import { useDispatch } from "react-redux";
import NextModal from 'react-modal';
import Image from "next/image";
import styles from "./leftdrawer.module.scss";
import { updateUserTopics } from '../../redux/action/topics.action';
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
    const { modalIsOpen, closeModal, topicItem, user } = props;
    const updateUserTopic = () => {
        if (topicItem) {
            if (user) {
                dispatch(updateUserTopics(user.id, topicItem.id));
                closeModal();
            }
        }
    }

    return (
        <div>
            <NextModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {topicItem !== null &&
                    <>
                        <div className={styles.closebtn}>
                            <button onClick={closeModal}>
                                <Image src={cross} alt="plus_icon" layout="intrinsic" width={35} height={35} />
                            </button>
                        </div>
                        <div className={styles.modaltext}>
                            {`Do you want to add ${topicItem.name}?`}
                        </div>
                        <div className={styles.modalbtn}>
                            <button onClick={updateUserTopic}>Yes</button>
                            <button onClick={closeModal}>No</button>
                        </div>
                    </>}
            </NextModal>
        </div>
    )
}
