import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./TopicsComponent.module.scss";
import logo from "../../../public/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { addTopics, removeTopics } from "../../redux/action/topics.action";
import { useRouter } from 'next/router'

export default function TopicsComponent({ props }) {
  const selectedTopicsLists = useSelector(
    (state) => state.topics.selectedTopics
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const [topicsLists, setTopicsList] = useState([]);
  // const [selectedTopicsLists, setSelectedTopicsLists] = useState([]);

  const handleClick = (e) => {
    if (!selectedTopicsLists.includes(e.target.innerText.replace("#", ""))) {
      dispatch(addTopics(e.target.innerText.replace("#", "")));
    } else {
      dispatch(removeTopics(e.target.innerText.replace("#", "")));
    }
  };

  const fetchTopicsList = async () => {
    const response = await fetch("api/topics");
    const data = await response.json();
    setTopicsList(data.topics);
  };

  useEffect(() => {
    fetchTopicsList();
  }, []);

  return (
    <div className={styles.topicsbody}>
      <div className={styles.topicsmaincontent}>
        <div className={styles.clubchatlogo}>
          <Image src={logo} alt="Clubchat_logo" width={500} height={500} />
        </div>
        <div className={styles.features}></div>
        <div className={styles.topicssection}>
          <div className={styles.topicstack}>
            {topicsLists.map((item, indx) => (
              <div
                className={`${styles.chipstyle} ${selectedTopicsLists.includes(item.name)
                    ? styles.activechip
                    : styles.inactivechip
                  }`}
                key={item.id}
                onClick={handleClick}
              >
                <span>{"#" + item.name}</span>
              </div>
            ))}
          </div>
          <div className={styles.continuebtn}>
            <button onClick={() => router.push('/chat')}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
