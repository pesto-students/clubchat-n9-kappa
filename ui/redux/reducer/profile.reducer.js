import * as TYPE from "../types";

const initialState = {
  isLoaded: false,
  profileData: { }
};
const profile = (
  state = {
    ...initialState,
  },
  action
) => {
  switch (action.type) {
    case TYPE.SET_USERPROFILE:
      return {
        ...state,
        isLoaded: true,
        profileData: { ...action.payload },
      };
    case TYPE.SET_USERPROFILEAVATAR:
      const temp = state.profileData;
      const updatedState = {
        ...temp,
        dpLink: action.payload
      }
    return {
      ...state,
      isLoaded: true,
      profileData: { ...updatedState },
    };
    default:
      return { ...state };
  }
};

export default profile;
