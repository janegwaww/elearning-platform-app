import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import {
  Button,
  Paper,
  InputBase,
  InputAdornment,
  ButtonBase,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { useSnackbar } from "notistack";
import SingleLineGridList from "./SingleLineGridList";
import { subtitles, ksearchRecord } from "../../services/video";
import { getIdFromHref, secondsToHMS } from "../../services/utils";
import "./VideoSearchWrapStyles.sass";

const VideoSearchWrap = ({ children, vid, path }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [gridList, setGridList] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [timer, setTimer] = useState(0);
  const [input, setInput] = useState("");

  const verifyTimer = () => {
    const { time } = getIdFromHref();
    if (time) {
      setTimer(time);
    }
  };

  const closeSearchInput = () => {
    setShowButton(true);
  };

  const handleSearchClick = () => {
    if (path) {
      setShowButton(false);
    } else {
      enqueueSnackbar("本视频没有字募～", { variant: "info" });
    }
  };

  const handleInputClick = (e) => {
    e.preventDefault();
    subtitles({ query_string: input, video_id: [vid] }).then((data) => {
      setGridList(data);
    });
  };

  const handleJump = (time) => {
    setTimer(time);
    // 记录搜索点击用的
    ksearchRecord({
      video_id: vid,
      query_string: input,
      match_time: secondsToHMS(time),
    });
  };

  useEffect(() => {
    setTimeout(() => {
      verifyTimer();
    }, 1200);
  }, []);

  return (
    <Fragment>
      <div className="video-search-wrap">
        <div className={`searchButton ${!showButton && "hiddenSearchButton"}`}>
          <Button
            startIcon={<SearchIcon />}
            onClick={handleSearchClick}
            className="showSearchButton"
          >
            知识搜索
          </Button>
        </div>
        <div className={clsx("searchInput", !showButton && "showSearchInput")}>
          <Paper component="form" className="paper">
            <InputBase
              className="KeInput"
              id="watch-subtitle-search"
              placeholder="支持对整段视频的字幕或语义定位搜索"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <ButtonBase onClick={() => setInput("")}>
                    {input ? (
                      <ClearIcon
                        style={{ color: "rgba(189, 195, 199,0.8)" }}
                        fontSize="small"
                      />
                    ) : null}
                  </ButtonBase>
                </InputAdornment>
              }
            />
            <Button
              className="KeSearchButton"
              aria-label="search"
              startIcon={<SearchIcon />}
              onClick={handleInputClick}
            >
              知识搜索
            </Button>
          </Paper>
          <div>
            <ClearIcon className="clearIcon" onClick={closeSearchInput} />
          </div>
        </div>
        <div>{children(timer)}</div>
        <div>
          <SingleLineGridList tileList={gridList} clipJump={handleJump} />
        </div>
      </div>
    </Fragment>
  );
};

export default VideoSearchWrap;
