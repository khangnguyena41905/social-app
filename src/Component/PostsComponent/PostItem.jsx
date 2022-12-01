import React from "react";
import moment from "moment";

export default function PostItem({
  displayName,
  content,
  photoURL,
  createdAt,
}) {
  return (
    <div className="my-6 p-4 border border-solid border-slate-300 rounded-lg">
      {/* header */}
      <div className="flex justify-between items-center border-b border-slate-300 pb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full border-2 border-rose-600 overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={photoURL}
              alt=""
            />
          </div>
          <p className="ml-2 text-lg">{displayName}</p>
        </div>
        <div>
          <span className="text-3xl cursor-pointer">
            <i class="fa fa-ellipsis-v"></i>
          </span>
        </div>
      </div>
      {/* content */}
      <div className="text-lg text-left pt-5">
        <p>{content}</p>
      </div>
      {/* footer */}
      <div>
        {/* interact */}
        <div></div>
        {/* date time */}
        <div className="text-left text-slate-400 text-sm mt-4 border-t border-slate-300">
          <p>{moment.unix(createdAt.seconds).format("DD/MM/YYYY - HH:MM")}</p>
        </div>
      </div>
    </div>
  );
}
