import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import moment from "moment";
import Moment from "../Moment";
import Link from "../Link/Link";
import Bull from "../Search/Bull";

const useStyles = makeStyles(() => ({
  listItem: {
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "10px 0",
    width: "100%",
    overflow: "hidden",
  },
  listHeadImg: {
    height: "68px",
    width: "100px",
    borderRadius: "4px",
    marginRight: "10px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    position: "relative",
    "& img": {
      width: "auto",
      height: "100%",
    },
  },
  listItem2: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  listTitle: {
    display: "flex",
    color: "#878791",
    fontSize: "12px",
    alignItems: "stretch",
    marginTop: "6px",
    justifyContent: "left",
  },
  listHeadTime: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    borderRadius: "4px",
    color: "white",
    padding: "1px",
    lineHeight: "unset",
    backgroundColor: "rgba(32,32,32,0.6)",
  },
  listTitleName: {
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
}));

export default function RenderRow({ item, order }) {
  const classes = useStyles();
  const duration = moment(item.video_time, "HH:mm:ss");

  return order ? (
    <ListItem divider button style={{ overflow: "hidden" }} disableGutters>
      <Link
        href={`/watch/?vid=${item.video_id}`}
        style={{ width: "100%" }}
        underline="none"
      >
        <Box className={classes.listItem2}>
          <div className={classes.listHeadImg}>
            <img src={`${item.image_path}`} alt={item.video_title} />
            <span className={classes.listHeadTime}>
              {duration.hour()
                ? duration.format("H:mm:ss")
                : duration.format("mm:ss")}
            </span>
          </div>
          <Box width="calc(100% - 110px)">
            <Tooltip title={item.video_title} placement="top-start">
              <Typography
                align="left"
                variant="body2"
                className={classes.listTitleName}
              >
                {item.video_title}
              </Typography>
            </Tooltip>
            <div className={classes.listTitle}>
              <PlayCircleOutlineIcon
                style={{ fontSize: "14px", marginRight: 2 }}
              />
              <Typography variant="caption">{`${item.view_counts}次观看`}</Typography>
              <Bull />
              <Moment date={item.upload_time} />
            </div>
          </Box>
        </Box>
      </Link>
    </ListItem>
  ) : (
    <ListItem button>
      <Box className={classes.listItem}>
        <Link href={`/watch/?vid=${item.video_id}`}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <PlayCircleOutlineIcon
              fontSize="small"
              style={{ margin: "0 6px" }}
            />
            <Tooltip title={item.video_title} placement="top-start">
              <Typography noWrap align="left" display="inline" variant="body2">
                {`${item.video_title}`}
              </Typography>
            </Tooltip>
          </div>
        </Link>
      </Box>
    </ListItem>
  );
}
