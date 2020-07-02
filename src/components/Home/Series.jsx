import React, { useState, useEffect } from "react";
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
import { getSeriesInfo } from "../../services/home";
import SearchCard from "../Search/SearchCard";
import SearchLoading from "../Loading/SearchLoading";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import Link from "../Link/Link";
import { getIdFromHref, secondsToDate, pipe } from "../../services/utils";
import "./SeriesStyles.sass";

const headCard = ({
  image_path,
  title,
  video_counts,
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
  return (
    <MuiPagination
      count={Math.ceil(num / 16)}
      variant="outlined"
      shape="rounded"
      onChange={handlePage}
    />
  );
};

export default function Series() {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [seriesLength, setSeriesLength] = useState(0);
  const [seriesInfo, setSeriesInfo] = useState({});
  const [type, setType] = useState("all");
  const [input, setInput] = useState("");
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

  const fetchSeriesData = ({ page = 1 }) => {
    setLoading(true);
    getSeriesInfo({ series_id: sid }).then((data) => {
      const sd = (d) => d.slice((page - 1) * 12, (page - 1) * 12 + 12);
      setSeries(pipe(sd, filterSearchData, filterData(type))(data.series));
      setSeriesLength(
        pipe(filterSearchData, filterData(type))(data.series).length
      );
      setSeriesInfo(data.info);
      setLoading(false);
    });
  };

  const handleTypeClick = (name) => {
    setType(name);
  };

  useEffect(() => {
    fetchSeriesData({});
  }, [type]);

  const handlePage = (event, page) => {
    fetchSeriesData({ page });
  };

  const handleSearchClick = () => {
    // 找到匹配名字的课件或视频
    const { value = "" } = document.getElementById("series_local_search_input");
    setInput(value);
  };

  useEffect(() => {
    fetchSeriesData({});
  }, [input]);

  useEffect(() => {
    if (sid) {
      fetchSeriesData({});
    } else {
      alert("系列不存在～");
    }
  }, [sid]);

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
          type="text"
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
            let j = {};
            const vtrans = (obj) => ({
              ...obj,
              data: Object.assign(obj.data, { title: obj.data.video_title }),
            });
            j = o.source === "video" ? vtrans(o) : o;
            return <SearchCard card={j} key={i} />;
          })}
          <EmptyNotice empty={!series.length && !loading} />
        </div>
      )}
      <Pagination num={seriesLength} handlePage={handlePage} />
      <br />
      <SearchLoading loading={loading} />
    </div>
  );
}
