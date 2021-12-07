import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NextModal from 'react-modal';
import Image from "next/image";
import { updateProfileAvatar } from '../../redux/action/profile.action';
import { useUser } from "../../../lib/hooks";
import cross from "../../../public/cross.svg";
import styles from "./ProfileMain.module.scss";
import Avatar from '../../../public/assets/avatar.png';
import Avatar1 from '../../../public/assets/avatar1.png';
import Avatar2 from '../../../public/assets/avatar2.png';
import Avatar3 from '../../../public/assets/avatar3.png';
import Avatar4 from '../../../public/assets/avatar4.png';
import Avatar5 from '../../../public/assets/avatar5.png';
import Avatar6 from '../../../public/assets/avatar6.png';
import Avatar7 from '../../../public/assets/avatar7.png';
import Avatar8 from '../../../public/assets/avatar8.png';
import Avatar9 from '../../../public/assets/avatar9.png';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#19181d',
        margin: '0',
        padding: '18px',
        border: 'none',
    },
    overlay: {
        backgroundColor: 'rgb(25, 24, 29, 0.95)',
    }
};

export default function UpdateDPModal({ props }) {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState('avatar');
    const { modalIsOpen, closeModal } = props;
    const { user } = useUser();
    const updateAvatar = (avatar) => {
        dispatch(updateProfileAvatar(user.id, avatar, user.username));
    }
    useEffect(() => {
        if (modalIsOpen) {
            updateAvatar(avatar);
            closeModal();
        }
    }, [avatar]);
    return (
        <div>
            <NextModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className={styles.closebtn}>
                    <button onClick={closeModal}>
                        <Image src={cross} alt="plus_icon" layout="intrinsic" width={35} height={35} />
                    </button>
                </div>
                <div className={styles.avatardiv}>
                    <Image src={Avatar} onClick={() => setAvatar('avatar')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                    <Image src={Avatar1} onClick={() => setAvatar('avatar1')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                    <Image src={Avatar2} onClick={() => setAvatar('avatar2')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                    <Image src={Avatar3} onClick={() => setAvatar('avatar3')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                    <Image src={Avatar4} onClick={() => setAvatar('avatar4')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                    <Image src={Avatar5} onClick={() => setAvatar('avatar5')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                    <Image src={Avatar6} onClick={() => setAvatar('avatar6')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                    <Image src={Avatar7} onClick={() => setAvatar('avatar7')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                    <Image src={Avatar8} onClick={() => setAvatar('avatar8')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                    <Image src={Avatar9} onClick={() => setAvatar('avatar9')} alt="plus_icon" layout="intrinsic" width={100} height={100} />
                </div>
            </NextModal>
        </div>
    )
}
