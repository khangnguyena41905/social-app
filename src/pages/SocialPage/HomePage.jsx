import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../Component/HeaderComponent/HeaderComponent";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";
import PostComponent from "../../Component/PostsComponent/PostComponent";
import { localServ } from "../../service/local.service";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = localServ.get();
    if (isLogin == null) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <LoadingComponent />
      <div className="fixed w-screen">
        <HeaderComponent />
      </div>
      <div className="pt-20">
        <PostComponent />
      </div>
    </div>
  );
}
