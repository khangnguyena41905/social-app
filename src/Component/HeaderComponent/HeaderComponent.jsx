import React from "react";
import PostSttComponent from "../AddSttComponent/PostSttComponent";
import UserNav from "./UserNav";

export default function HeaderComponent() {
  return (
    <div className="container mx-auto">
      <div className="w-full flex justify-between items-center h-20 px-4 rounded-2xl shadow-md">
        <div className="flex items-center">
          <span className="text-4xl">
            <i class="fa fa-ghost"></i>
          </span>
          <span className="ml-2">GHOST NET</span>
        </div>
        <div className="w-2/4 flex justify-end items-center">
          <div className="mr-2">
            <PostSttComponent />
          </div>
          <UserNav />
        </div>
      </div>
    </div>
  );
}
