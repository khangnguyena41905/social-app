import React, { useEffect, useState } from "react";
import { statusServ } from "../../service/status.service";
import PostItem from "./PostItem";

export default function PostComponent() {
  let [statusList, setStatusList] = useState([]);
  useEffect(() => {
    statusServ.getStt((res) => {
      // res.docs show all documents of colection
      let statusList = [];
      res.docs.map((doc) => {
        statusList.push({ ...doc.data(), id: doc.id });
      });
      setStatusList(statusList);
      console.log("statusList: ", statusList);
    });
  }, []);
  const renderPostItem = () => {
    return statusList.map((doc) => {
      return (
        <PostItem
          key={doc.id}
          displayName={doc.displayName}
          content={doc.content}
          photoURL={doc.photoURL}
          createdAt={doc.createdAt}
        />
      );
    });
  };
  return <div className="container mx-auto">{renderPostItem()}</div>;
}
