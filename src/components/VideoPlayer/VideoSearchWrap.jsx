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

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  searchButton: {
    position: "absolute",
    right: "-18px",
    top: "30px",
    visibility: "visible",
    opacity: 1
  },
  hiddenSearchButton: {
    transition: "visibility 0s linear 1s,opacity 1s",
    visibility: "hidden",
    opacity: 0
  },
  searchInput: {
    position: "absolute",
    top: "30px",
    left: "50%",
    zIndex: 2,
    display: "inline-flex",
    justifyContent: "flex-start",
    transform: "translate(-50%)",
    transition: "visibility 0s linear 0.5s,opacity 0.5s",
    visibility: "hidden",
    opacity: 0
  },
  showSearchInput: {
    opacity: 1,
    visibility: "visible"
  },
  paper: {
    backgroundColor: "rgba(44,44,59,0.6)",
    borderRadius: "20px",
    width: 400,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  clearIcon: {
    fontSize: 14,
    backgroundColor: "#ddd",
    borderRadius: "20px",
    marginLeft: "4px",
    color: "gray"
  }
}));
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
          <Button
            startIcon={<SearchIcon />}
            onClick={handleSearchClick}
            classes={{
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
            }}
          >
            知识搜索
          </Button>
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
