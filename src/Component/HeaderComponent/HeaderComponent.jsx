import React from "react";
import UserNav from "./UserNav";

export default function HeaderComponent() {
  return (
    <div className="container mx-auto flex justify-between items-center h-20">
      <div className="flex items-center">
        <span className="text-4xl">
          <i class="fa fa-ghost"></i>
        </span>
        <span className="ml-2">GHOST NET</span>
      </div>
      <div className="w-1/4">
        <UserNav />
      </div>
    </div>
  );
}
