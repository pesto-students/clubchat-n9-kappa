import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import Loader from 'react-loader';
import { useUser } from "../lib/hooks";
import { useRouter } from 'next/router';
import TopicsComponent from "../ui/components/ToipcsComponents/TopicsComponent";

export default function Home() {

  const router = useRouter();
  const { finished, hasUser = false, user, error } = useUser();
  console.log("DATACHAT", finished, hasUser, user, error);
  if (finished) {
    if (hasUser && user) {
      router.push('/chat');
    }
  }


  return (<>
    {(finished && !hasUser)  ? <TopicsComponent /> : <Loader />}
  </>)
}
