import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Typography from "@material-ui/core/Typography";
import ListIcon from "@material-ui/icons/List";
import AppsIcon from "@material-ui/icons/Apps";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import map from "lodash/fp/map";
import Link from "../Link/Link";
import { getRelativeVideos, getRecommendVideos } from "../../services/video";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "10px",
    backgroundColor: theme.palette.background.paper,
  },
  fixedList: {
    backgroundColor: "#f2f2f5",
    borderRadius: "12px",
    width: "100%",
    /* overflow: "auto", */
    /* maxHeight: 500 */
    "& .MuiListItem-root:last-child": {
      borderBottom: "none",
    },
  },
  fixedListVert: {
    backgroundColor: "#fff",
  },
  listItem: {
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "10px 0",
    width: "100%",
    overflow: "hidden",
  },
  listHead: {
    display: "flex",
    alignItems: "center",
    padding: "6px 0",
  },
  listHead1: {
    flexGrow: 1,
    color: "#2C2C3B",
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
    alignItems: "center",
    marginTop: "6px",
    justifyContent: "left",
  },
}));

function RenderRow({ item, order }) {
  const classes = useStyles();

  return order ? (
    <ListItem divider button style={{ overflow: "hidden" }} disableGutters>
      <Link href={`/watch/?vid=${item.video_id}`} style={{ width: "100%" }}>
        <Box className={classes.listItem2}>
          <div className={classes.listHeadImg}>
            <img src={`${item.image_path}`} alt={item.video_title} />
          </div>
          <Box width="calc(100% - 110px)">
            <Tooltip title={item.video_title} placement="top-start">
              <Typography noWrap align="left" variant="body2">
                {item.video_title}
              </Typography>
            </Tooltip>
            <div className={classes.listTitle}>
              <PlayCircleOutlineIcon
                style={{ fontSize: "14px", marginRight: 2 }}
              />
              <Typography variant="caption">{`${item.view_counts} 观看`}</Typography>
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

export default function VideoList({ vid, type }) {
  const classes = useStyles();
  const [series, setSeries] = useState([]);
  const [verticle, setVerticle] = useState(true);
  const [seriesId, setSeriesId] = useState("");

  const fetchData = ({ page = 1 }) => {
    const param = {
      video_id: vid,
      related_type: type,
      max_size: 10,
      page,
    };
    switch (type) {
      case "series":
        getRelativeVideos(param).then((data = {}) => {
          setSeries(data.video_data || []);
          setSeriesId(data.series_id);
        });
        break;
      case "recommend":
        getRecommendVideos(param).then((data) => setSeries(data));
        break;
      default:
        console.log("no type");
    }
  };

  const listName = {
    series: (
      <Link href={`/series/?sid=${seriesId}`} underline="always">
        <Typography>系列视频</Typography>
      </Link>
    ),
    recommend: <Typography>推荐视频</Typography>,
  };

  const iterateItem = (o) => (
    <RenderRow item={o} order={verticle} key={o.video_id} />
  );

  useEffect(() => {
    if (vid) {
      fetchData({});
    }
  }, [vid]);

  return series.length === 0 ? null : (
    <div className={classes.root}>
      <div className={classes.listHead}>
        <div className={classes.listHead1}>{listName[type]}</div>
        <IconButton size="small" onClick={() => setVerticle(false)}>
          <ListIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="small" onClick={() => setVerticle(true)}>
          <AppsIcon fontSize="inherit" />
        </IconButton>
      </div>
      <List
        className={clsx(classes.fixedList, verticle && classes.fixedListVert)}
      >
        {map(iterateItem)(series)}
      </List>
      <div>
        <br />
        <Divider />
      </div>
    </div>
  );
}
