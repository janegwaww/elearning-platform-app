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
import Link from "@material-ui/core/Link";
import { getSeriesInfo } from "../../services/home";
import SearchCard from "../Search/SearchCard";
import SearchLoading from "../Loading/SearchLoading";
import { getIdFromHref, secondsToDate } from "../../services/utils";
import "./SeriesStyles.sass";

const headCard = ({
  image_path,
  title,
  video_counts,
  description,
  author_name,
  update_time,
  headshot,
  author_id
}) => (
  <div
    style={{
      display: "grid",
      height: 190,
      gridTemplateColumns: "300px auto",
      gridTemplateRows: "repeat(6,1fr)",
      columnGap: "40px"
    }}
  >
    <div style={{ gridColumn: 1, gridRow: "1/8" }}>
      <img
        src={image_path}
        alt={title}
        style={{ height: "100%", width: 300 }}
      />
    </div>
    <Box
      style={{
        gridColumn: 2,
        gridRow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
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
    <Box style={{ gridColumn: 2, gridRow: "3/6" }}>
      <Typography variant="subtitle2">系列简介:</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
    <Link
      style={{
        gridColumn: 2,
        gridRow: 7,
        display: "flex",
        alignItems: "center"
      }}
      color="inherit"
      underline="none"
      href={`/excellentcreator/creator/?cid=${author_id}`}
      target="_blank"
      rel="noopener norefferer"
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

export default function Series() {
  const [loading, setLoading] = useState("true");
  const [series, setSeries] = useState([]);
  const [seriesStack, setSeriesStack] = useState([]);
  const [seriesInfo, setSeriesInfo] = useState({});
  const [type, setType] = useState("all");
  const { sid } = getIdFromHref();

  const fetchSeriesData = id => {
    setLoading(true);
    getSeriesInfo({ series_id: id }).then(data => {
      setSeries(data.series);
      setSeriesStack(data.series);
      setSeriesInfo(data.info);
      setLoading(false);
    });
  };

  const handleTypeClick = name => {
    const arr = [];
    seriesStack.map(o => {
      if (o.source === name || name === "all") {
        arr.push(o);
      }
    });
    setSeries(arr);
    setType(name);
  };

  const handleSearchClick = () => {
    // 找到匹配名字的课件或视频
    const { value = "" } = document.getElementById("series_local_search_input");
    const arr = [];
    seriesStack.map(o => {
      if (
        (o.data.file_name && o.data.file_name.includes(value)) ||
        (o.data.video_title && o.data.video_title.includes(value))
      ) {
        arr.push(o);
      }
    });
    setSeries(arr);
    setType("all");
  };

  useEffect(() => {
    if (sid) {
      fetchSeriesData(sid);
    } else {
      /* navigate("/"); */
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
          className={type === "all" && "action"}
          onClick={() => handleTypeClick("all")}
        >
          全部
        </Button>
        <Button
          size="small"
          className={type === "video" && "action"}
          onClick={() => handleTypeClick("video")}
        >
          视频
        </Button>
        <Button
          size="small"
          className={type === "document" && "action"}
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
                file_name: obj.data.file_name
              })
            });
            j = o.source === "video" ? vtrans(o) : dtrans(o);
            return <SearchCard card={j} key={i} />;
          })}
        </div>
      )}
      <br />
      <SearchLoading loading={loading} />
    </div>
  );
}
