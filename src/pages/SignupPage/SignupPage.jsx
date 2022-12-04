import React from "react";
import { Button, Form, Input, message } from "antd";
import { userServ } from "../../service/user.service";
import { useDispatch } from "react-redux";
import { set_login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import signup_animation from "../../asset/animations/signup_animation.json";

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    message.success("Login success");
    navigate("/");
  };
  const handleLoginFalse = () => {
    message.error("Login False");
  };
  const loginWithGoogle = () => {
    userServ
      .googleLogin()
      .then((res) => {
        dispatch(set_login(handleLoginSuccess));
      })
      .catch((error) => {
        handleLoginFalse();
      });
  };

  const onFinish = (values) => {
    userServ
      .userSignUp(values)
      .then((res) => {
        dispatch(set_login(handleLoginSuccess));
      })
      .catch((err) => {
        // console.log(err.message);
        message.error(err.message);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        background:
          "url(https://i.pinimg.com/originals/af/c5/48/afc5485dc7d5812fbd856f719a251111.jpg)",
      }}
      className="flex justify-center items-center w-screen h-screen"
    >
      <div
        style={{
          background: "rgba( 255, 255, 255, 0.3 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 8px )",
          WebkitBackdropFilter: "blur( 8px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
        className="flex flex-col h-5/6 w-1/3 px-6"
      >
        <div>
          <h2 className="text-5xl text-teal-500 pt-5">PLZZ , SIGN UP!!!!!</h2>
        </div>
        <div className="h-2/5">
          <Lottie style={{ height: "100%" }} animationData={signup_animation} />
        </div>
        <div>
          <Form
            name="basic"
            layout="vertical"
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
      </div>
    </div>
  );
}
