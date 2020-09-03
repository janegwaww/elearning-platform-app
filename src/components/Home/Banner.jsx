import React from "react";
import { navigate } from "gatsby";
import Img from "gatsby-image";

const Banner = ({ data }) => {
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
      <Img
        fixed={data.file.childImageSharp.fixed}
        alt="banner"
        style={{ width: "100%", height: 480 }}
      />
    </div>
  );
};

export default Banner;
