import { Button, Form, message, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { set_status } from "../../redux/actions/statusActions";
import { statusServ } from "../../service/status.service";
import { off_loading, on_loading } from "../../redux/actions/loadingActions";

export default function ModalEdit({
  id,
  uid,
  imgList,
  content,
  handleCloseModal,
  isModalOpen,
}) {
  // hook
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([...imgList]);
  // form function
  const onFinish = (values) => {
    values = { ...values, upload: fileList, imgList };
    const handleSuccess = () => {
      message.success("update thành công");
      handleCloseModal({ ...isModalOpen, edit: false });
      dispatch(set_status());
    };
    const onLoading = () => {
      dispatch(on_loading());
    };
    const offLoading = () => {
      dispatch(off_loading());
    };
    statusServ.update(values, id, uid, handleSuccess, onLoading);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // update function
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="upload"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <>
            <Upload
              action=""
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={(file) => {
                return false;
              }}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </>
        </Form.Item>

        <Form.Item initialValue={content} name="content" label="Content">
          <TextArea rows={4} maxLength={140} />
        </Form.Item>

        <Form.Item>
          <Button className="float-right" htmlType="submit" danger>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
