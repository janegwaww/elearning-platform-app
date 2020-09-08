import React, { memo, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import withDocumentComponent from "./withDocumentComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    height: "100vh",
    width: "100%",
  },
  image: {
    height: "auto",
    width: "100%",
    backgroundColor: "inherit",
    position: "relative",
    "& img": {
      width: "100%",
      height: "auto",
      objectFit: "fill",
      display: "block",
    },
  },
  layer: {
    background: "rgba(0,0,0,0)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  match: {
    position: "absolute",
    height: "10%",
    width: "15%",
    background:
      "radial-gradient(circle,rgba(0,124,255,0.8) 0%,rgba(0,124,255,0.43) 16%,rgba(0,124,255,0) 80%)",
    borderRadius: 100,
  },
  listItem: {
    backgroundColor: "#ebebeb",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#007cff",
  },
}));

const Layer = ({ height, width, vector = [0, 0] }) => {
  const classes = useStyles();
  const [x, y] = vector;
  return (
    <div className={classes.layer} style={{ height, width }}>
      <div
        className={classes.match}
        style={{
          top: `${y * 100 - 5}%`,
          left: `${x * 100 - 7.5}%`,
        }}
      />
    </div>
  );
};

const renderImage = memo(({ index, style, data }) => {
  const classes = useStyles();
  const { images, vector, page } = data;
  const item = images[index];
  return (
    <ListItem style={style} key={index} classes={{ root: classes.listItem }}>
      <div className={classes.image}>
        <img src={item} alt={item} className="document-search-image" />
        {index === page ? <Layer vector={vector} /> : null}
      </div>
    </ListItem>
  );
}, areEqual);

const DocumentComponent = ({
  images = [],
  position = {},
  onItemsRendered,
  itemHeight,
  loading,
}) => {
  const classes = useStyles();
  const listRef = useRef(null);
  const itemData = { vector: position.coord, page: position.page_id, images };

  const scrollToItem = ([, y]) => {
    const aligns = ["start", "center", "end"];
    const persent = y * 100;
    const align =
      persent < 33 ? aligns[0] : persent > 66 ? aligns[2] : aligns[1];
    if (listRef.current) {
      listRef.current.scrollToItem(position.page_id, align);
    }
  };

  useEffect(() => {
    if (position.coord) {
      scrollToItem(position.coord);
    }
  }, [position]);

  return (
    <div className={classes.root}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            ref={listRef}
            height={height}
            width={width}
            itemSize={itemHeight + 16}
            itemCount={images.length}
            itemData={itemData}
            onItemsRendered={onItemsRendered}
          >
            {renderImage}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default withDocumentComponent(DocumentComponent);
