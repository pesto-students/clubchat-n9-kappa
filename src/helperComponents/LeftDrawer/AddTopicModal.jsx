import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NextModal from 'react-modal';
import Image from "next/image";
import styles from "./LeftDrawer.module.scss";
import { updateUserTopics } from '../../redux/action/topics.action';

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
    const { modalIsOpen, closeModal, topicItem, userId } = props;
    const updateUserTopic = () => {
        if (topicItem) {
            dispatch(updateUserTopics(userId, topicItem.id));
            closeModal();
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
                            <button onClick={closeModal}>X</button>
                        </div>
                        <div  className={styles.modaltext}>
                            
                        </div>
                        <div className={styles.modalbtn}>
                            <button onClick={updateUserTopic}>Add</button>
                        </div>
                    </>}
            </NextModal>
        </div>
    )
}
