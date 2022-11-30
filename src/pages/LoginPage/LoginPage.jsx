import React from "react";
import { Button, Form, Input, message } from "antd";

import { useDispatch } from "react-redux";
import { set_login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import login_animation from "../../asset/animations/login_animation.json";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    let handleSuccess = () => {
      message.success("đăng nhập thành công");
      navigate("/");
    };
    dispatch(set_login(values, handleSuccess));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
        className="flex flex-col h-3/4 w-1/3 px-6"
      >
        <div className="h-1/2">
          <Lottie style={{ height: "100%" }} animationData={login_animation} />
        </div>
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
        </div>
      </div>
    </div>
  );
}
