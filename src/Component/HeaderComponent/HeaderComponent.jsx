import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_status } from "../../redux/actions/statusActions";
import PostSttComponent from "../AddSttComponent/PostSttComponent";
import UserNav from "./UserNav";

export default function HeaderComponent() {
  const dispatch = useDispatch();
  let userInfor = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  return (
    <div className="container mx-auto">
      <div className="w-full flex justify-between items-center h-20 px-4 rounded-2xl shadow-md">
        <div
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            dispatch(set_status());
          }}
          className="flex items-center cursor-pointer"
        >
          <span className="text-4xl">
            <i class="fa fa-ghost"></i>
          </span>
          <span className="ml-2">GHOST NET</span>
        </div>
        <div className="w-2/4 flex justify-end items-center">
          <div className="mr-2">
            {userInfor ? <PostSttComponent userInfor={userInfor} /> : null}
          </div>
          <UserNav />
        </div>
      </div>
    </div>
  );
}
