import React from "react";
import Lottie from "lottie-react";
import loading_animation from "../../asset/animations/loading_animation.json";
import { useSelector } from "react-redux";

export default function LoadingComponent() {
  let isLoading = useSelector((state) => {
    return state.loadingReducer.isLoading;
  });
  return (
    <>
      {isLoading ? (
        <div
          style={{
            background: "rgba( 155, 155, 155, 0.1 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 7.5px )",
            WebkitBackdropFilter: " blur( 7.5px )",
            borderRadius: "10px",
            border: " 1px solid rgba( 255, 255, 255, 0.18 )",
            zIndex: "99999",
          }}
          className="w-screen h-screen flex justify-center items-center fixed"
        >
          <div>
            <Lottie animationData={loading_animation} />
          </div>
        </div>
      ) : null}
    </>
  );
}
