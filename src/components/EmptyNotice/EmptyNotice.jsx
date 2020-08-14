import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

const emptyType = (t) =>
  ({
    "404": {
      img: "/images/404.svg",
      text: "哎呀,服务器出错了,刷新试试~",
      but: "/images/fresh-404.svg",
    },
    loading: {
      img: "/images/loading-fail.svg",
      text: "数据加载失败",
      but: "/images/back_home.svg",
    },
    noResult: {
      img: "/images/no-result.svg",
      text: "搜索无结果",
      but: "/images/fresh-404.svg",
    },
    networkError: {
      img: "/images/network-error.svg",
      text: "无网络",
      but: "/images/fresh-404.svg",
    },
  }[t]);

const EmptyNotice = ({ empty = true, type = "404", handleFresh }) => {
  const typeObj = emptyType(type);

  return empty ? (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <img src={`${typeObj.img}`} alt="error" width="100%" />
      <Box height={40} />
      <Typography color="textSecondary">{typeObj.text}</Typography>
      <Box height={40} />
      <IconButton
        style={{ padding: 0, borderRadius: "50px" }}
        onClick={handleFresh}
      >
        <img src={`${typeObj.but}`} alt="button" width="100%" />
      </IconButton>
    </Box>
  ) : null;
};

export default EmptyNotice;
