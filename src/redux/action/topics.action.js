import * as TYPE from "../types";
import axios from "axios";
// import axios from "axios";
// import { request } from "../../util/request";

export const addTopics = (selectedTopics) => async (dispatch) => {
  dispatch({
    type: TYPE.ADD_SELECTEDTOPICSLIST,
    payload: selectedTopics,
  });
};

export const removeTopics = (selectedTopics) => async (dispatch) => {
  dispatch({
    type: TYPE.REMOVE_SELECTEDTOPICSLIST,
    payload: selectedTopics,
  });
};

export const setCurrentChatTopic = (currentChatTopic) => async (dispatch) => {
  dispatch({
    type: TYPE.SET_CURRENTCHATTOPIC,
    payload: currentChatTopic,
  });
};

export const setUserTopics = (userId) => async (dispatch) => {
  try {
    var response = await axios.get(
      'api/usertopics',
      {
        query: userId,
      },
      // { headers: { Authorization: getState().user.token } }
    );
    if (response) {
      dispatch({
        type: TYPE.SET_USERTOPICSLIST,
        payload: response.data.result,
      });
      dispatch({
        type: TYPE.SET_CURRENTCHATTOPIC,
        payload: response.data.result[0].topic.name,
      });
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

export const setTrendingTopics = () => async (dispatch) => {
  try {
    var response = await axios.get(
      'api/gettrendingtopics',
      // { headers: { Authorization: getState().user.token } }
    );
    if (response) {
      dispatch({
        type: TYPE.SET_TRENDINGTOPICSLIST,
        payload: response.data.result,
      });
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

export const updateUserTopics = (userId, topicId) => async (dispatch) => {
  try {
    var response = await axios.post(
      'api/usertopics',
      {
        query: { userId, topicId }
      },
      // { headers: { Authorization: getState().user.token } }
    );
    if (response) {
      dispatch({
        type: TYPE.SET_USERTOPICSLIST,
        payload: response.data.result,
      });
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

