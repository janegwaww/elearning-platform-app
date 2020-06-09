import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper,
  InputBase,
  InputAdornment,
  ButtonBase
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import SingleLineGridList from "./SingleLineGridList";
import { subtitles } from "../../services/video";
import "./VideoSearchWrapStyles.sass";

const KeSearchButton = withStyles({
  root: {}
})(Button);

const KeInput = withStyles({
  root: {
    width: "70%",
    marginLeft: "20px",
    marginTop: 0
  },
  input: {
    "&::placeholder": {
      color: "rgba(255,255,255,1)",
      fontSize: "12px"
    }
  }
})(InputBase);

const VideoSearchWrap = ({ children, vid }) => {
  const [gridList, setGridList] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [timer, setTimer] = useState("");
  const [input, setInput] = useState("");

  const closeSearchInput = () => {
    setShowButton(true);
  };

  const handleSearchClick = () => {
    setShowButton(false);
  };

  const handleInputClick = e => {
    e.preventDefault();
    subtitles({ query_string: input, video_id: [vid] }).then(data => {
      setGridList(data);
    });
  };

  const handleJump = time => {
    setTimer(time);
  };

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
            <KeInput
              id="watch-subtitle-search"
              placeholder="支持对整段视频的字幕或语义定位搜索"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <ButtonBase onClick={() => setInput("")}>
                    {input ? (
                      <ClearIcon
                        style={{ color: "rgba(189, 195, 199,0.8)" }}
                        fontSize="small"
                        className="clearIcon"
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
