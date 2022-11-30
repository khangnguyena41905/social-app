import { localServ } from "../../service/local.service";
import { SET_LOGIN, SET_LOGOUT } from "../constants/userConstant";

const initialState = {
  userInfor: localServ.get(),
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGIN: {
      return { ...state, userInfor: payload };
    }
    case SET_LOGOUT: {
      return { ...state, userInfor: payload };
    }
    default:
      return state;
  }
};
