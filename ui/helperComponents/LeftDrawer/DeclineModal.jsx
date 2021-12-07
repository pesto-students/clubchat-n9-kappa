import React from "react";
import NextModal from 'react-modal';
import Image from "next/image";
import styles from "./leftdrawer.module.scss";
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

export default function DeclineModal({ props }) {
    const { declineModal, setDeclineModal } = props;
    return (
        <div>
            <NextModal
                isOpen={declineModal}
                onRequestClose={() => setDeclineModal(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className={styles.closebtn}>
                    <button onClick={() => setDeclineModal(false)}>
                        <Image src={cross} alt="plus_icon" layout="intrinsic" width={35} height={35} />
                    </button>
                </div>
                <div className={styles.modaltext}>
                    {`This topic is already added.`}
                </div>
                <div className={styles.modalbtn}>
                    <button onClick={() => setDeclineModal(false)}>Okay</button>
                </div>
            </NextModal>
        </div>
    )
}
