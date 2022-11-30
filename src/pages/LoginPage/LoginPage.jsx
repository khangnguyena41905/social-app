import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";

import { useDispatch } from "react-redux";
import { set_login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import login_animation from "../../asset/animations/login_animation.json";
import { userServ } from "../../service/user.service";
import { SET_LOGIN } from "../../redux/constants/userConstant";
import { localServ } from "../../service/local.service";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSuccess = () => {
    message.success("Đăng nhập thành công");
    navigate("/");
  };
  const onFinish = (values) => {
    dispatch(set_login(values, handleSuccess));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const loginWithGoogle = () => {
    userServ
      .googleLogin()
      .then((res) => {
        const user = res.user;
        console.log("user: ", user);
        localServ.set(user);
        dispatch({
          type: SET_LOGIN,
          payload: user,
        });
        handleSuccess();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  useEffect(() => {
    const isLogin = localServ.get();
    if (isLogin) {
      navigate("/");
    }
  }, []);
  return (
    <div
      style={{
        background:
          " url(https://i.pinimg.com/originals/8c/1c/b4/8c1cb498bf2e396f233621b02f95628b.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex justify-center items-center w-screen h-screen"
    >
      <div
        style={{
          background: "rgba( 255, 255, 255, 0.3 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 8px )",
          WebkitBackdropFilter: " blur( 8px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
        className="flex flex-col h-5/6 w-1/3 px-6"
      >
        {/* animation */}
        <div className="h-2/5">
          <Lottie style={{ height: "100%" }} animationData={login_animation} />
        </div>
        {/* Login method */}
        <div>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button danger type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* Google login */}
          <div
            onClick={loginWithGoogle}
            className="flex justify-start items-center w-full border-2 border-slate-300 rounded-3xl cursor-pointer hover:shadow-md hover:shadow-slate-300 hover:bg-slate-500 transition duration-300"
          >
            <div className="w-1/5 text-4xl text-green-600">
              <i class="fab fa-google"></i>
            </div>
            <p>Login with google</p>
          </div>
          {/* Facebook login */}
          <div className="flex justify-start items-center w-full border-2 border-slate-300 rounded-3xl cursor-pointer hover:shadow-md hover:shadow-slate-300 hover:bg-slate-500 transition duration-300 mt-2">
            <div className="w-1/5 text-4xl text-blue-800">
              <i class="fab fa-facebook-square"></i>
            </div>
            <p>Login with facebook</p>
          </div>
          {/* Sign up */}
          <div className="mt-2">
            <span className="text-lg text-slate-200">
              If you don't have account, please{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="text-lg text-sky-400 cursor-pointer hover:underline"
              >
                sign up here!
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
