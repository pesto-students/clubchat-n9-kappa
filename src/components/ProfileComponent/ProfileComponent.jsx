import React, { useState, useLayoutEffect, useEffect } from "react";
import styles from "./ProfileComponent.module.scss";
import LeftDrawer from "../../helperComponents/LeftDrawer/LeftDrawer";
import ProfileMain from "../../helperComponents/ProfileMain/ProfileMain";
import Router from 'next/router'
import { useUser } from "../../../lib/hooks";

function ProfileComponent() {
  //const user = useUser('/login', '/profile');

  return (
    <div className={styles.profilebody}>
      <LeftDrawer />
      <ProfileMain />
    </div>
  );
}

export default ProfileComponent;
