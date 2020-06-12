import React, { useState, useEffect } from "react";
import clsx from "clsx";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { secondsToHMS } from "../../services/utils";
import "./SingleLineGridListStyles.sass";

function SingleLineGridList({ tileList = [], clipJump }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleOpen = () => setShow(true);

  const handleClick = time => {
    if (typeof clipJump === "function") {
      clipJump(time);
    }
  };

  const getCount = () => tileList.length;

  useEffect(() => {
    if (tileList.length > 0) {
      handleOpen();
    }
  }, [tileList]);

  const PressMatchedLine = ({ line }) => {
    const wrapStr = ({ wholeStr = "", matchedStr = "" }) =>
      wholeStr.replace(
        matchedStr,
        `<span style='color:#fc5659'>${matchedStr}</span>`
      );
    return (
      <div
        className="content"
        id="grid-tile-content"
        dangerouslySetInnerHTML={{ __html: wrapStr(line) }}
      ></div>
    );
  };

  return (
    <div
      className={clsx("single-line-grid-list", show && "showRoot")}
      id="search-result"
    >
      <div className="head">
        <Typography variant="body2">
          {`共为你找到${getCount()}个结果`}
        </Typography>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon style={{ color: "#9e9ea6" }} fontSize="inherit" />
        </IconButton>
      </div>
      <GridList
        className="gridList"
        cols={4}
        cellHeight={140}
        style={{ margin: "4px" }}
      >
        {tileList.map((tile, i) => (
          <GridListTile key={i} onClick={() => handleClick(tile.startTime)}>
            <PressMatchedLine
              line={{ wholeStr: tile.wholeStr, matchedStr: tile.matchedStr }}
            />
            <GridListTileBar
              actionIcon={
                <Paper className="title">{secondsToHMS(tile.startTime)}</Paper>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default SingleLineGridList;
