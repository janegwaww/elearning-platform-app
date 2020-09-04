import React from "react";
import { navigate } from "gatsby";

const Banner = () => {
  const handleClick = () => {
    if (false) {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "auto",
        width: "100%",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <img
        src="../../../images/zhiqingbei.png"
        alt="banner"
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default Banner;
