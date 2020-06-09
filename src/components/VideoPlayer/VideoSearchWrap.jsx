import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
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
    padding: "6px 14px",
    "&:hover": {
      backgroundColor: "#007cff"
    },
    "& .MuiButton-startIcon": {
      marginLeft: 0,
      marginRight: 0
    }
  }
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
  const classes = useStyles();
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
        <div
          className={clsx(
            classes.searchInput,
            !showButton && classes.showSearchInput
          )}
        >
          <Paper component="form" classes={{ root: classes.paper }}>
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
                      />
                    ) : null}
                  </ButtonBase>
                </InputAdornment>
              }
            />
            <KeSearchButton
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
        <div>{children(timer)}</div>
        <div>
          <SingleLineGridList tileList={gridList} clipJump={handleJump} />
        </div>
      </div>
    </Fragment>
  );
};

export default VideoSearchWrap;
