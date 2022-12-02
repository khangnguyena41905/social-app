import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { off_loading, on_loading } from "../../redux/actions/loadingActions";
import { statusServ } from "../../service/status.service";
import PostItem from "./PostItem";

export default function PostComponent() {
  let [statusList, setStatusList] = useState([]);
  const dispatch = useDispatch();

  let fetchSttData = async () => {
    let statusList = [];
    dispatch(on_loading());
    try {
      let res = await statusServ.getStt();
      res.docs.forEach((doc) => {
        statusList.push({ ...doc.data(), id: data.id });
      });
      setStatusList(statusList);
      dispatch(off_loading());
    } catch (error) {
      console.log("error: ", error);
      dispatch(off_loading());
    }
  };
  useEffect(() => {
    fetchSttData();
  }, []);
  const renderPostItem = () => {
    console.log("statusList: ", statusList);

    return statusList.map((doc) => {
      return <PostItem key={doc.id} dataItem={doc} />;
    });
  };
  return <div className="container mx-auto">{renderPostItem()}</div>;
}
