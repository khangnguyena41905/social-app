import { statusServ } from "../../service/status.service";
import { SET_STATUS } from "../constants/statusConstant";
import { off_loading, on_loading } from "./loadingActions";

export const set_status = () => {
  return async (dispatch) => {
    let statusList = [];
    dispatch(on_loading());
    try {
      let res = await statusServ.getStt();
      res.docs.forEach((doc) => {
        statusList.push({ ...doc.data(), id: doc.id });
      });
      dispatch({
        type: SET_STATUS,
        payload: statusList,
      });
      dispatch(off_loading());
    } catch (error) {
      console.log("error: ", error);
      dispatch(off_loading());
    }
  };
};
