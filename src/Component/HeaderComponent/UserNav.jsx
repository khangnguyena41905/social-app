import { Button, Dropdown, message } from "antd";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_logout } from "../../redux/actions/userAction";

export default function UserNav() {
  const userInfor = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    let onSuccess = () => {
      message.success("Đã đăng xuất");
      navigate("/login");
    };
    dispatch(set_logout(onSuccess));
  };
  // item menu dropdown
  const items = [
    {
      label: (
        <p>
          <span className="mr-2">
            <i class="fa fa-user"></i>
          </span>
          Trang cá nhân
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p>
          <span className="mr-2">
            <i class="fa fa-cog"></i>
          </span>
          Cài đặt
        </p>
      ),
      key: "1",
    },
    {
      label: (
        <p className=" border-t border-x-slate-300" onClick={handleLogOut}>
          <span className="mr-2">
            <i class="fa fa-sign-out-alt"></i>
          </span>
          Đăng xuất
        </p>
      ),
      key: "2",
    },
  ];
  return (
    <>
      {userInfor ? (
        <div className="flex justify-end items-center whitespace-nowrap">
          <span className="mr-2">
            {userInfor.displayName ? userInfor.displayName : userInfor.email}
          </span>
          {/* start dropdown */}
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <span
              onClick={(e) => e.preventDefault()}
              className=" w-10 h-10 overflow-hidden rounded-full border-2 border-cyan-500"
            >
              <img
                className="w-full"
                src={
                  userInfor.photoURL
                    ? userInfor.photoURL
                    : "data:image/png;base64,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"
                }
                alt=""
              />
            </span>
          </Dropdown>
          {/* end dropdwon */}
        </div>
      ) : null}
    </>
  );
}
