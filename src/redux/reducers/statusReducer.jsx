import { SET_STATUS } from "../constants/statusConstant";

const initialState = {
  statusList: [],
};

export const statusReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_STATUS: {
      return { ...state, statusList: payload };
    }
    default:
      return state;
  }
};
