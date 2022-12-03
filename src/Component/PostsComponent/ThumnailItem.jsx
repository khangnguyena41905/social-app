import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { statusServ } from "../../service/status.service";

export default function ThumnailItem({ imgList }) {
  return (
    <Carousel>
      {imgList.map((img) => {
        return (
          <div key={img.name} className="w-full h-96">
            <img
              className="w-full h-full object-contain"
              src={img.url}
              alt=""
            />
          </div>
        );
      })}
    </Carousel>
  );
}
