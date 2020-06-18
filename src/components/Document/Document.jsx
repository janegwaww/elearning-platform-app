import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/Styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  menuBox: {
    display: "grid",
    gridTemplateColumns: "68px auto",
    gridTemplateRow: "50px auto",
    gap: "10px"
  },
  title: {
    gridColumn: 1,
    gridRow: 1,
    width: 68
  },
  content: {
    gridColumn: 2,
    gridRow: 2
  }
}));

export default function Document({ did }) {
  const classes = useStyles();

  useEffect(() => {}, []);

  const Title = ({ name }) => (
    <div className={classes.title}>
      <Typography>{name}</Typography>
      <div style={{ borderBottom: "2px solid #007CFF" }} />
    </div>
  );

  return (
    <Fragment>
      <br />
      <Box className={classes.menuBox}>
        <Title name="课件详情" />
        <Box className={classes.content}>
          <Typography color="textSecondary" variant="body2">
            课件名称：
          </Typography>
          <Typography color="textSecondary" variant="body2">
            内容简介：
          </Typography>
          <Typography color="textSecondary" variant="body2">
            文件格式：
          </Typography>
          <Typography color="textSecondary" variant="body2">
            文件大小：
          </Typography>
          <Typography color="textSecondary" variant="body2">
            上传时间：
          </Typography>
          <Typography color="textSecondary" variant="body2">
            价格：
          </Typography>
        </Box>
      </Box>
      <br />
      <Box className={classes.menuBox}>
        <Title name="作者简介" />
        <Box className={classes.content}></Box>
      </Box>
      <br />
      <Box className={classes.menuBox}>
        <Title name="课件目录" />
        <Box className={classes.content}></Box>
      </Box>
      <br />
      <Box>
        <Title name="课件预览" />
        <br />
        <Box height={600} bgcolor="#d8d8d8"></Box>
      </Box>
      <br />
    </Fragment>
  );
}
