import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useDispatch } from "react-redux";
import { set_status } from "../../redux/actions/statusActions";
import { statusServ } from "../../service/status.service";

export default function ModalEdit({
  id,
  content,
  handleCloseModal,
  isModalOpen,
}) {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Success:", values);
    if (values.content != content) {
      statusServ
        .update(values, id)
        .then((res) => {
          message.success("update thành công");
          handleCloseModal({ ...isModalOpen, edit: false });
          dispatch(set_status());
        })
        .catch((err) => {
          message.error("update thất bại");
        });
    } else {
      message.error("Giá trị chưa thay đổi");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item initialValue={content} name="content" label="content">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" danger>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
