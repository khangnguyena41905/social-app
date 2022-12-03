import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_status } from "../../redux/actions/statusActions";
import PostItem from "./PostItem";

export default function PostComponent() {
  let statusList = useSelector((state) => {
    return state.statusReducer.statusList;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set_status());
  }, []);
  const renderPostItem = () => {
    return statusList.map((doc) => {
      return <PostItem key={doc.id} dataItem={doc} />;
    });
  };
  return <div className="container mx-auto">{renderPostItem()}</div>;
}
