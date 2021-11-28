import * as TYPE from "../types";

const initialState = {
  currentChatTopic: {},
  topicsList: [],
  selectedTopics: [],
  trendingTopics: [],
  userTopics: [],
  topicSearchResult: [],
};
const topics = (
  state = {
    ...initialState,
  },
  action
) => {
  switch (action.type) {
    case TYPE.ADD_SELECTEDTOPICSLIST:
      const temp = state.selectedTopics;
      temp.push(action.payload);
      return {
        ...state,
        selectedTopics: [...temp],
      };
    case TYPE.REMOVE_SELECTEDTOPICSLIST:
      let temp2 = state.selectedTopics;
      temp2 = temp2.filter((item) => item !== action.payload);
      return {
        ...state,
        selectedTopics: [...temp2],
      };
    case TYPE.SET_TRENDINGTOPICSLIST:
      return {
        ...state,
        trendingTopics: [...action.payload],
      }
    case TYPE.SET_USERTOPICSLIST:
      return {
        ...state,
        userTopics: [...action.payload],
      }
    case TYPE.SET_CURRENTCHATTOPIC:
      return {
        ...state,
        currentChatTopic: action.payload,
      }
    case TYPE.SET_TOPICSEARCHRESULT:
      return {
        ...state,
        topicSearchResult: action.payload,
      }
    default:
      return { ...state };
  }
};

export default topics;
