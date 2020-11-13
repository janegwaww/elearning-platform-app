import React, { useState } from "react";
import clsx from "clsx";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import SingleLineGridList from "./SingleLineGridList";
import { useLoginConfirm } from "../LoginConfirm";
import { subtitles } from "../../services/video";
import { isLoggedIn } from "../../services/auth";
import "./VideoSearchWrapStyles.sass";

const VideoSearchWrap = ({ vjsComponent = {} }) => {
  const loginConfirm = useLoginConfirm();
  const { vid } = vjsComponent.state;
  const { handleJump, setState } = vjsComponent;
  const [gridList, setGridList] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [input, setInput] = useState("");

  const handleInputClick = (e) => {
    e.preventDefault();
    if (input) {
      subtitles({ query_string: input, video_id: [vid] }).then((data) => {
        setGridList(data);
        setState({ queryResult: data, queryString: input });
        !isLoggedIn() && loginConfirm();
      });
    } else {
      alert("关健字不能为空！");
    }
  };

  const handleSearchClick = () => {
    if (vjsComponent.player().textTracks()[0]) {
      setShowButton(false);
    } else {
      alert("本视频没有字幕～");
    }
  };

  return (
    <div className="video-search-wrap">
      <div className={`searchButton ${!showButton && "hiddenSearchButton"}`}>
        <Button
          startIcon={<SearchIcon />}
          className="showSearchButton"
          onClick={handleSearchClick}
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
            onKeyDown={(e) => e.key === "Enter" && handleInputClick(e)}
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
          <ClearIcon
            className="clearIcon"
            onClick={() => setShowButton(true)}
          />
        </Paper>
      </div>

      <div className="searchGridList">
        <SingleLineGridList tileList={gridList} clipJump={handleJump} />
      </div>
    </div>
  );
};

export default VideoSearchWrap;
