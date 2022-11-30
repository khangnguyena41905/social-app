import { message } from "antd";
import { localServ } from "../../service/local.service";
import { userServ } from "../../service/user.service";
import { SET_LOGIN, SET_LOGOUT } from "../constants/userConstant";

export const set_login = (values, onSuccess) => {
  return (dispatch) => {
    userServ
      .userLogin(values)
      .then((res) => {
        localServ.set(res.user);
        onSuccess();
        dispatch({
          type: SET_LOGIN,
          payload: res.user,
        });
      })
      .catch((err) => {
        message.error("Đăng nhập thất bại");
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
