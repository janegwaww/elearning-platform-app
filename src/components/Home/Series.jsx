import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MuiPagination from "@material-ui/lab/Pagination";
import Tooltip from "@material-ui/core/Tooltip";
import { getSeriesInfo, seriesSearch } from "../../services/home";
import SearchCard from "../Search/SearchCard";
import ProgressBar from "../Loading/ProgressBar";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import Link from "../Link/Link";
import { getIdFromHref, secondsToDate, pipe } from "../../services/utils";
import "./SeriesStyles.sass";

const useStyles = makeStyles(() => ({
  pagi: {
    backgroundColor: "#fff",
  },
  ul: {
    justifyContent: "center",
  },
}));

const headCard = ({
  image_path,
  title,
  video_counts = 0,
  description,
  author_name,
  update_time,
  headshot,
  author_id,
}) => (
  <div className="head-card-root">
    <div style={{ gridColumn: 1, gridRow: "1/8" }}>
      <img
        src={image_path}
        alt={title}
        style={{ height: "100%", width: 300 }}
      />
    </div>
    <Box className="card-title">
      <Typography>{title}</Typography>
      <Typography color="textSecondary" variant="caption">
        {`${secondsToDate(update_time)} 更新`}
      </Typography>
    </Box>
    <Typography
      style={{ gridColumn: 2, gridRow: 2 }}
      variant="caption"
      color="textSecondary"
    >
      {`${video_counts} 个视频`}
    </Typography>
    <Box
      style={{
        gridColumn: 2,
        gridRow: "3/7",
        overflow: "hidden",
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        系列简介:
      </Typography>
      <Tooltip placement="top-start" title={description}>
        <Typography variant="body2">{description}</Typography>
      </Tooltip>
    </Box>
    <Link
      href={`/excellentcreator/creator/?cid=${author_id}`}
      className="series-avatar"
    >
      <Avatar
        src={headshot}
        alt={author_name}
        style={{ height: 30, width: 30, marginRight: 10 }}
      />
      <Typography variant="caption">{author_name}</Typography>
    </Link>
  </div>
);

const Pagination = ({ num = 1, handlePage }) => {
  const classes = useStyles();
  return (
    <MuiPagination
      count={Math.ceil(num / 12)}
      variant="outlined"
      shape="rounded"
      onChange={handlePage}
      classes={{ root: classes.pagi, ul: classes.ul }}
    />
  );
};

const Series = () => {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [seriesLength, setSeriesLength] = useState(0);
  const [seriesInfo, setSeriesInfo] = useState({});
  const [type, setType] = useState("all");
  const [input, setInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const { sid } = getIdFromHref();

  const filterData = (name) => (data = []) => {
    const arr = [];
    data.map((o) => {
      if (o.source === name || name === "all") {
        arr.push(o);
      }
    });
    return arr;
  };

  const filterSearchData = (data) => {
    const arr = [];
    data.map((o) => {
      if (
        (o.data.file_name && o.data.file_name.includes(input)) ||
        (o.data.video_title && o.data.video_title.includes(input)) ||
        !input
      ) {
        arr.push(o);
      }
    });
    return arr;
  };

  const sd = (page) => (d) => d.slice((page - 1) * 12, page * 12);

  const fetchSeriesData = ({ page = 1 }) => {
    setLoading(true);
    getSeriesInfo({ series_id: sid }).then((data) => {
      setSeries(
        pipe(filterData(type), filterSearchData, sd(page))(data.series)
      );
      setSeriesLength(
        pipe(filterData(type), filterSearchData)(data.series).length
      );
      setSeriesInfo(data.info);
      setLoading(false);
    });
  };

  const fetchSearchSeriesData = (page = 1) => {
    setLoading(true);
    seriesSearch({
      query_string: input,
      series_id: sid,
      type,
      max_size: 999,
      page,
    }).then((data) => {
      setSeries(sd(page)(data));
      setLoading(false);
      setSeriesLength(data.length);
    });
  };

  const handleTypeClick = (name) => {
    setType(name);
  };

  const handlePage = (event, page) => {
    if (isSearch) {
      fetchSearchSeriesData(page);
    } else {
      fetchSeriesData({ page });
    }
  };

  const handleSearchClick = () => {
    // 找到匹配名字的课件或视频
    if (input) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };

  useEffect(() => {
    if (sid) {
      if (isSearch && input) {
        fetchSearchSeriesData();
      } else {
        fetchSeriesData({});
      }
    } else {
      alert("系列不存在～");
    }
  }, [sid, type, isSearch]);

  return (
    <div className="series-component">
      <br />
      <br />
      <Typography>
        <span style={{ color: "#007cff" }}>{seriesInfo.title}</span>
        {` 系列课的详细信息`}
      </Typography>
      <br />
      {headCard(seriesInfo)}
      <br />
      <br />

      <Divider />
      <Box className="buttonGroup">
        <Button
          size="small"
          className={`${type === "all" && "action"}`}
          onClick={() => handleTypeClick("all")}
        >
          全部
        </Button>
        <Button
          size="small"
          className={`${type === "video" && "action"}`}
          onClick={() => handleTypeClick("video")}
        >
          视频
        </Button>
        <Button
          size="small"
          className={`${type === "document" && "action"}`}
          onClick={() => handleTypeClick("document")}
        >
          课件
        </Button>
        <InputBase
          id="series_local_search_input"
          className="inputBase"
          placeholder="页面搜索"
          type="search"
          onChange={(e) => setInput(e.target.value)}
          endAdornment={
            <InputAdornment>
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
      <Divider />

      <br />
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ minHeight: "60vh" }}>
          {series.map((o, i) => {
            return <SearchCard card={o} key={i} />;
          })}
          <EmptyNotice empty={!series.length && !loading} />
        </div>
      )}
      <Pagination num={seriesLength} handlePage={handlePage} />
      <br />
      <ProgressBar loading={loading} />
    </div>
  );
};

export default Series;
