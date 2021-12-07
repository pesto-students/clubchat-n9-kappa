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
        params: {
          query: userId,
        }
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
        payload: response.data.result[0],
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
        params: {
          query: { userId, topicId }
        }
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

export const createTopics = (topicName) => async (dispatch) => {
  try {
    var response = await axios.post(
      'api/topics',
      {
        params: {
          query: { topicName }
        }
      },
      // { headers: { Authorization: getState().user.token } }
    );
    if (response) {
      dispatch({
        type: TYPE.SET_TRENDINGTOPICSLIST,
        payload: response.data.topics,
      });
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

export const searchTopic = (searchText) => async (dispatch) => {
  try {
    var response = await axios.get(
      'api/searchtopic',
      {
        params: {
          query: searchText
        }
      },
      // { headers: { Authorization: getState().user.token } }
    );
    if (response) {
      dispatch({
        type: TYPE.SET_TOPICSEARCHRESULT,
        payload: response.data.result,
      });
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

export const clearSearchTopic = () => async (dispatch) => {
  try {
      dispatch({
        type: TYPE.SET_TOPICSEARCHRESULT,
        payload: [],
      });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
