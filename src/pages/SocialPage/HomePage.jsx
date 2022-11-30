import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../Component/HeaderComponent/HeaderComponent";
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
      <HeaderComponent />
    </div>
  );
}
