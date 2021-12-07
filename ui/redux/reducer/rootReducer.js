import { combineReducers } from "redux";
import topics from "./topics.reducer";
import profile from "./profile.reducer";

const rootReducer = combineReducers({
  topics,
  profile,
});

export default rootReducer;
