import React from "react";

const styles = {
  padding: "2px 4px",
  borderRadius: "0 0 4px 4px",
  color: "#fff",
};

const CardTagEle = ({ name = "", color = "#007cff" }) => {
  return <div style={{ ...styles, backgroundColor: color }}>{name}</div>;
};

export default CardTagEle;
