import { Button, Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { statusServ } from "../../service/status.service";
import { userServ } from "../../service/user.service";

export default function PostSttComponent() {
  let userInfor = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  const onFinish = ({ content }) => {
    let { uid, photoURL, displayName } = userInfor;
    let status = {
      uid,
      photoURL,
      displayName,
      content,
      like: 0,
    };
    statusServ.post(status).then(() => {
      handleOk();
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // modal function
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div
        onClick={showModal}
        className=" text-sm w-6 h-6 border-2 border-black rounded-lg cursor-pointer flex justify-center items-center"
      >
        <i class="fa fa-plus"></i>
      </div>
      <Modal
        title={
          <div className="flex justify-start items-center">
            <span className=" w-8 h-8 border border-rose-600 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={userInfor?.photoURL}
                alt=""
              />
            </span>
            <span className="ml-2 text-lg">{userInfor?.displayName}</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Bạn nghĩ gì?" name="content">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 float-right"
                type="primary"
                htmlType="submit"
              >
                Post
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
