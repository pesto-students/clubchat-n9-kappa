import React, { useState, useLayoutEffect, useEffect } from "react";
import styles from "./ProfileComponent.module.scss";
import LeftDrawer from "../../helperComponents/LeftDrawer/LeftDrawer";
import ProfileMain from "../../helperComponents/ProfileMain/ProfileMain";
import Router from 'next/router'
import { useUser } from "../../../lib/hooks";

function ProfileComponent() {
  //const user = useUser('/login', '/profile');
  const [toggleKey, setTogglekey] = useState(false);
  return (
    <div className={styles.profilebody}>
      <LeftDrawer props={{ toggleKey, setTogglekey }}/>
      <ProfileMain props={{ toggleKey, setTogglekey }} />
    </div>
  );
}

export default ProfileComponent;
