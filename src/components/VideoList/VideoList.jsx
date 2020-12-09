import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListIcon from "@material-ui/icons/List";
import AppsIcon from "@material-ui/icons/Apps";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import map from "lodash/fp/map";
import Link from "../Link/Link";
import VideoListRow from "./VideoListRow";
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
    "& .MuiListItem-root:last-child": {
      borderBottom: "none",
    },
  },
  fixedListVert: {
    backgroundColor: "#fff",
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
}));

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

  useEffect(() => {
    if (vid) {
      fetchData({});
    }
  }, [vid]);

  return series.length ? (
    <div>
      <Divider />
      <div className={classes.root}>
        <div className={classes.listHead}>
          <div className={classes.listHead1}>
            {
              {
                series: (
                  <Link href={`/series/?sid=${seriesId}`} underline="always">
                    <Typography>系列视频</Typography>
                  </Link>
                ),
                recommend: <Typography>推荐视频</Typography>,
              }[type]
            }
          </div>
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
          {map((o) => (
            <VideoListRow item={o} order={verticle} key={o.video_id} />
          ))(series)}
        </List>
      </div>
    </div>
  ) : null;
}
