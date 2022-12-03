import { Button, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { set_status } from "../../redux/actions/statusActions";
import { statusServ } from "../../service/status.service";

export default function ModalDelete({ id }) {
  let dispatch = useDispatch();
  return (
    <div className="py-10">
      <h2 className="text-5xl mb-4 text-center">Bạn chắc chắn xóa?</h2>
      <div className="flex justify-center">
        <img
          className="w-40"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3kBjcu617FLmogcmW5rXMFUuU31uxH7J-Znlf07SqWLSgjin2hDgFpLFh1sidDrC3A3M&usqp=CAU"
          alt=""
        />
      </div>
      <div>
        <Button
          onClick={() => {
            statusServ
              .delete(id)
              .then((res) => {
                message.success("Xóa thành công :(((");
                dispatch(set_status());
              })
              .catch((err) => {
                message.success("Xóa thất bại");
              });
          }}
          type="primary"
          block
          className="text-2xl h-10"
          danger
        >
          Chắc ! ! ! !
        </Button>
      </div>
    </div>
  );
}
