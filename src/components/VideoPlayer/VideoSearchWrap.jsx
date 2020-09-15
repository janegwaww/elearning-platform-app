import React, { useState, useEffect } from "react";
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
import { delay, toNumber } from "lodash";
import SingleLineGridList from "./SingleLineGridList";
import { useLoginConfirm } from "../LoginConfirm";
import { subtitles, ksearchRecord } from "../../services/video";
import { getIdFromHref, secondsToHMS } from "../../services/utils";
import { isLoggedIn } from "../../services/auth";
import "./VideoSearchWrapStyles.sass";

const VideoSearchWrap = ({ children, vid, path }) => {
  const { enqueueSnackbar } = useSnackbar();
  const loginConfirm = useLoginConfirm();
  const [gridList, setGridList] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [timer, setTimer] = useState(0);
  const [input, setInput] = useState("");

  const verifyTimer = () => {
    const { time } = getIdFromHref();
    if (time) {
      setTimer(toNumber(time));
    }
  };

  const closeSearchInput = () => {
    setShowButton(true);
  };

  const handleSearchClick = () => {
    if (path) {
      setShowButton(false);
    } else {
      enqueueSnackbar("本视频没有字幕～", { variant: "info" });
    }
  };

  const handleInputClick = (e) => {
    e.preventDefault();
    subtitles({ query_string: input, video_id: [vid] }).then((data) => {
      setGridList(data);
      !isLoggedIn() && loginConfirm();
    });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleInputClick(e);
    }
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
    delay(verifyTimer, 300);
  }, []);

  return (
    <>
      <div className="video-search-wrap">
        <div className={`searchButton ${!showButton && "hiddenSearchButton"}`}>
          <Button
            startIcon={<SearchIcon />}
            onClick={handleSearchClick}
            className="showSearchButton"
          >
            逐帧搜索
          </Button>
        </div>
        <div className={clsx("searchInput", !showButton && "showSearchInput")}>
          <Paper component="form" className="paper">
            <InputBase
              className="KeInput"
              id="watch-subtitle-search"
              placeholder="支持语义理解..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
              endAdornment={
                <InputAdornment position="end">
                  <ButtonBase onClick={() => setInput("")}>
                    <ClearIcon
                      fontSize="small"
                      style={{ visibility: `${input ? "visible" : "hidden"}` }}
                    />
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
              逐帧搜索
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
    </>
  );
};

export default VideoSearchWrap;
