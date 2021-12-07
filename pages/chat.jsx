import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUser } from "../lib/hooks";
import Loader from 'react-loader';
import ChatComponent from "../ui/components/ChatComponent/ChatComponent";

const chat = () => {
  const router = useRouter();
  const { finished, hasUser = false, user, error } = useUser();
  if (finished) {
    if (!hasUser && !user) {
      router.push('/login');
    }
  }
  return (<>
    {finished ? <ChatComponent /> : <Loader />}
  </>)
}

export default chat
