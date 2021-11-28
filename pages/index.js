import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import Loader from 'react-loader';
import { useUser } from "../lib/hooks";
import { useRouter } from 'next/router';

export default function Home() {
  const [userState, setUserState] = useState(null);
  const router = useRouter();
  const user = useUser();
  useEffect(() => {
    console.log(user);
    if (user) {
      // console.log("USER::", user.id);
      if (!userState) {
        setUserState(user);
        router.push('/chat');
      }
    } else {
      router.push('/login');
    }
  }, []);

  return (
    <div className={styles.container}>
      {!userState && <Loader />}
    </div>
  )
}
