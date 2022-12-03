import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../Component/HeaderComponent/HeaderComponent";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";
import PostComponent from "../../Component/PostsComponent/PostComponent";
import { localServ } from "../../service/local.service";

export default function HomePage() {
  const navigate = useNavigate();
  let [isLogin, setLogin] = useState(false);
  useEffect(() => {
    const isLogin = localServ.get();
    if (isLogin == null) {
      navigate("/login");
    } else {
      setLogin(true);
    }
  }, []);
  return (
    <>
      {isLogin ? (
        <div>
          <LoadingComponent />
          <div className="fixed w-screen z-50">
            <HeaderComponent />
          </div>
          <div className="pt-20">
            <PostComponent />
          </div>
        </div>
      ) : null}
    </>
  );
}
