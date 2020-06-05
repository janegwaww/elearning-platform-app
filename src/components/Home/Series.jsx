import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "@material-ui/lab/Pagination";
import { getSeriesInfo } from "../../services/home";
import SearchCard from "../Search/SearchCard";
import { remotePath } from "../../services/utils";

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    color: theme.palette.secondary.main
  },
  pagination: {
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  head: {
    display: "grid",
    height: 190,
    gridTemplateColumns: "300px auto",
    gridTemplateRows: "repeat(6,1fr)",
    gap: "10px",
    border: "1px solid #ddd"
  }
}));

export default function Series({ location: { state = {} } }) {
  const classes = useStyles();
  const [loading, setLoading] = useState("true");
  const [series, setSeries] = useState([]);
  const [seriesStack, setSeriesStack] = useState([]);
  const [seriesInfo, setSeriesInfo] = useState({});
  const { sid = "" } = state;

  const fetchSeriesData = () => {
    setLoading(true);
    getSeriesInfo({ series_id: sid }).then(data => {
      setSeries(data.series);
      setSeriesStack(data.series);
      setSeriesInfo(data.info);
      setLoading(false);
    });
  };

  const handleSearchClick = type => {
    const arr = [];
    seriesStack.map(o => {
      if (o.source === type || type === "all") {
        arr.push(o);
      }
    });
    setSeries(arr);
  };

  useEffect(() => {
    if (sid) {
      fetchSeriesData();
    } else {
      navigate("/");
    }
  }, [sid]);

  const headCard = ({
    image_path,
    title,
    video_counts,
    description,
    author_name
  }) => (
    <div className={classes.head}>
      <img
        src={remotePath(seriesInfo.image_path)}
        alt={title}
        style={{ height: "100%", width: 300, gridColumn: 1, gridRow: "1/7" }}
      />
      <Typography style={{ gridColumn: 2, gridRow: 1 }}>{title}</Typography>
      <Typography
        style={{ gridColumn: 2, gridRow: 2 }}
        variant="caption"
        color="textSecondary"
      >
        {`${video_counts} 个视频`}
      </Typography>
      <Typography style={{ gridColumn: 2, gridRow: "3/6" }} variant="body2">
        <span style={{ display: "block" }}>系列简介:</span>
        {description}
      </Typography>
      <Typography style={{ gridColumn: 2, gridRow: 7 }}>
        {author_name}
      </Typography>
    </div>
  );

  return (
    <div>
      <br />
      <Typography>
        <span className={classes.name}>{seriesInfo.title}</span>
        {` 系列课的详细信息`}
      </Typography>
      <br />
      {headCard(seriesInfo)}
      <br />
      <Divider />
      <div>
        <Button onClick={() => handleSearchClick("all")}>全部</Button>
        <Button onClick={() => handleSearchClick("video")}>视频</Button>
        <Button onClick={() => handleSearchClick("document")}>课件</Button>
      </div>
      <Divider />
      <br />
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          {series.map((o, i) => {
            let j = {};
            const vtrans = obj => ({
              ...obj,
              data: Object.assign(obj.data, { title: obj.data.video_title })
            });
            const dtrans = obj => ({
              ...obj,
              data: Object.assign(obj.data, {
                file_name: obj.data.document_name
              })
            });
            j = o.source === "video" ? vtrans(o) : dtrans(o);
            return <SearchCard card={j} key={i} />;
          })}
        </div>
      )}
      <Pagination
        count={Math.ceil(series.length / 16)}
        variant="outlined"
        shape="rounded"
        classes={{ ul: classes.pagination }}
      />
      <br />
    </div>
  );
}
