import { SET_ERRORS } from "../actionTypes";

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
