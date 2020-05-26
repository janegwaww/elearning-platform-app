import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import SingleLineGridList from "./SingleLineGridList";
import { subtitles } from "../../services/video";
import useStyles from "./VideoSearchWrapStyles";

const ShowSearchButton = withStyles({
  root: {
    boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.5)",
    backgroundColor: "#007cff",
    color: "#fff",
    borderRadius: "20px",
    fontSize: "12px",
    padding: "6px 12px",
    zIndex: 2,
    "&:hover": {
      backgroundColor: "#007cff"
    }
  }
})(Button);

const KeSearchButton = withStyles({
  root: {
    backgroundColor: "#007cff",
    color: "#fff",
    borderRadius: "0 20px 20px 0",
    fontSize: "12px",
    "&:hover": {
      backgroundColor: "#007cff"
    }
  }
})(Button);

const KeInput = withStyles({
  root: {
    width: "70%",
    marginLeft: "20px"
  },
  input: {
    "&::placeholder": {
      color: "rgba(255,255,255,1)",
      fontSize: "12px"
    }
  }
})(InputBase);

const VideoSearchWrap = ({ children, vid }) => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [gridList, setGridList] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [timer, setTimer] = useState(0);

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

  const handleInput = e => {
    setInput(e.target.value);
  };

  const handleJump = time => {
    setTimer(time);
  };

  const SearchInput = () => (
    <div
      className={clsx(
        classes.searchInput,
        !showButton && classes.showSearchInput
      )}
    >
      <Paper component="form" classes={{ root: classes.paper }}>
        <KeInput
          placeholder="支持对整段视频的字幕或语义定位搜索"
          inputProps={{
            "aria-label": "支持对整段视频的字幕或语义定位搜索"
          }}
          type="text"
          onChange={handleInput}
          value={input}
        />
        <KeSearchButton
          type="submit"
          aria-label="search"
          startIcon={<SearchIcon />}
          onClick={handleInputClick}
        >
          知识搜索
        </KeSearchButton>
      </Paper>
      <div>
        <ClearIcon
          classes={{ root: classes.clearIcon }}
          onClick={closeSearchInput}
        />
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className={classes.root}>
        <div
          className={clsx(
            classes.searchButton,
            !showButton && classes.hiddenSearchButton
          )}
        >
          <ShowSearchButton
            startIcon={<SearchIcon />}
            onClick={handleSearchClick}
            className={classes.searchButtonIn}
          >
            知识搜索
          </ShowSearchButton>
        </div>
        <SearchInput />
        <div>{children(timer)}</div>
        <div>
          <SingleLineGridList tileList={gridList} clipJump={handleJump} />
        </div>
      </div>
    </Fragment>
  );
};

export default VideoSearchWrap;
