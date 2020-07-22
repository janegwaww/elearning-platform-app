import React from "react";
import CardTagEle from "./CardTagEle";

const styles = {
  root: {
    position: "relative",
  },
  tag: {
    position: "absolute",
    top: 0,
    left: 18,
  },
};

const CardTag = ({ children, type }) => {
  const tags = (t) =>
    ({
      document: <CardTagEle name="文本" color="#EBBA73" />,
      documents: <CardTagEle name="系列文本" color="#EA8E63" />,
      series: <CardTagEle name="系列视频" color="#007cff" />,
    }[t]);

  return (
    <div style={styles.root}>
      {children}
      <div style={styles.tag}>{tags(type)}</div>
    </div>
  );
};

export default CardTag;
