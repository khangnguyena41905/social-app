import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { statusServ } from "../../service/status.service";

export default function ThumnailItem({ imgFolder }) {
  let [imgPath, setImgPath] = useState([]);
  let fetchImgUrl = async () => {
    let pathList = await statusServ.getPath(imgFolder);
    let urlList = [];
    pathList.forEach(async (path) => {
      try {
        let res = await statusServ.getImg(path);
        urlList = [...urlList, res];
        setImgPath(urlList);
      } catch (error) {
        console.log("error: ", error);
      }
    });
  };
  useEffect(() => {
    fetchImgUrl();
  }, []);
  return (
    <Carousel>
      {imgPath.map((url) => {
        return (
          <div key={url} className="w-full h-96">
            <img className="w-full h-full object-contain" src={url} alt="" />
          </div>
        );
      })}
    </Carousel>
  );
}
