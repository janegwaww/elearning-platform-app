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

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    color: theme.palette.secondary.main
  },
  pagination: {
    justifyContent: "center",
    backgroundColor: "#fff"
  }
}));

export default function Series({ location: { state } }) {
  const classes = useStyles();
  const ser = "ser";
  const [loading, setLoading] = useState("true");
  const [series, setSeries] = useState([]);
  const [seriesInfo, setSeriesInfo] = useState({});

  const fetchSeriesData = () => {
    setLoading(true);
    getSeriesInfo({ series_id: state.sid }).then(data => {
      console.log(data);
      setSeries(data.series);
      setSeriesInfo(data.info);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (state.sid) {
      fetchSeriesData();
    } else {
      navigate("/");
    }
  }, [state.sid]);

  return (
    <div>
      <br />
      <Typography>
        <span className={classes.name}>{seriesInfo.title}</span>
        {` 系列课的详细信息`}
      </Typography>
      <br />
      <div></div>
      <Divider />
      <div>
        <Button>全部</Button>
        <Button>视频</Button>
        <Button>课件</Button>
      </div>
      <Divider />
      <br />
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          {series.map((o, i) => (
            <SearchCard card={o} key={i} />
          ))}
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
