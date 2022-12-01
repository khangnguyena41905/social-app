import { message } from "antd";
import { localServ } from "../../service/local.service";
import { userServ } from "../../service/user.service";
import { SET_LOGIN, SET_LOGOUT } from "../constants/userConstant";

export const set_login = (onSuccess) => {
  return (dispatch) => {
    onSuccess();
    localServ.set(userServ.getUserInfor());
    dispatch({
      type: SET_LOGIN,
      payload: userServ.getUserInfor(),
    });
  };
};
export const set_logout = (onSuccess) => {
  return (dispatch) => {
    userServ
      .userLogOut()
      .then((res) => {
        localServ.remove();
        dispatch({
          type: SET_LOGOUT,
          payload: localServ.get(),
        });
        onSuccess();
      })
      .catch((err) => {
        message.error("Đăng xuất thất bại");
      });
  };
};
