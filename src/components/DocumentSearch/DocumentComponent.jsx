import React, { memo, useRef, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import withDocumentComponent from "./withDocumentComponent";
import "./DocumentComponent.sass";

const Layer = ({ height, width, vector = [0, 0] }) => {
  const [x, y] = vector;
  return (
    <div className="layer" style={{ height, width }}>
      <div
        className="match"
        style={{
          top: `${y * 100 - 5}%`,
          left: `${x * 100 - 7.5}%`,
        }}
      />
    </div>
  );
};

const renderImage = memo(({ index, style, data }) => {
  const { images, vector, page } = data;
  const item = images[index];
  return (
    <ListItem style={style} key={index} className="listItem">
      <div className="image">
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
    <div className="doc-component-root">
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
      <Backdrop open={loading} className="backdrop">
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default withDocumentComponent(DocumentComponent);
