import React, { useState, useEffect } from "react";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Slider from "react-slick";
import map from "lodash/fp/map";
import { secondsToHMS, decoratedStr } from "../../services/utils";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import "./singleLineGridListStyles.sass";

const PressMatchedLine = ({ line = {} }) => {
  const createMarkup = {
    __html: decoratedStr(line.wholeStr, line.subs),
  };
  return (
    <Typography
      className="content"
      id="grid-tile-content"
      variant="body2"
      dangerouslySetInnerHTML={createMarkup}
    />
  );
};

function SingleLineGridList({ tileList = [], clipJump = () => ({}) }) {
  const [show, setShow] = useState(false);
  const slickSetting = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    className: "subtitle-slider",
    dotsClass: "slick-dots slick-thumb",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const handleClose = () => setShow(false);

  const handleOpen = () => setShow(true);

  const getCount = () => tileList.length;

  const handleClick = (time) => clipJump(time);

  useEffect(() => {
    tileList.length > 0 && handleOpen();
  }, [tileList]);

  return (
    <div
      className={clsx("single-line-grid-list", show && "showRoot")}
      id="search-result"
    >
      <div className="head">
        <Typography variant="body2">
          {`为您找到的前${getCount()}个结果`}
        </Typography>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon style={{ color: "#9e9ea6" }} fontSize="inherit" />
        </IconButton>
      </div>
      <div className="gridList">
        <Slider {...slickSetting}>
          {map.convert({ cap: false })((tile, i) => (
            <div key={i}>
              <Box
                key={i}
                onClick={(e) => handleClick(tile.startTime)}
                className="GridListTile-tile"
              >
                <PressMatchedLine
                  line={{ wholeStr: tile.wholeStr, subs: tile.subtitleDist }}
                />
                <Paper className="title">{secondsToHMS(tile.startTime)}</Paper>
              </Box>
            </div>
          ))(tileList)}
        </Slider>
      </div>
    </div>
  );
}

export default SingleLineGridList;
