import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { FixedSizeList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SearchInput from "./SearchInput";
import withSearchComponent from "./withSearchComponent";
import ProgressBar from "../Loading/ProgressBar";
import "./SearchComponent.sass";

const renderRow = memo(({ index, style, data }) => {
  const { itemsArray, itemClick } = data;
  const item = itemsArray[index];
  const refStr = (str) =>
    `<span style='background-color: #007cff; border-radius: 2px'>${str}</span>`;
  const markup = {
    __html: `${item.whole_str.replace(
      item.str_for_reference,
      refStr(item.str_for_reference),
    )}`,
  };
  return (
    <ListItem
      button
      style={style}
      key={index}
      onClick={() => itemClick({ ...item, index })}
      className={`list-button ${item.isActive ? "item" : ""}`}
    >
      <Grid container>
        <Grid item xs={1}>
          <div style={{ color: "#fff" }}>{index + 1}</div>
        </Grid>
        <Grid item xs={11}>
          <Typography
            style={{ color: "#fff" }}
            dangerouslySetInnerHTML={markup}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}, areEqual);

const SearchComponent = ({
  onSearch,
  itemsArray = [],
  itemClick,
  open,
  onClose,
  loading,
}) => {
  const itemData = { itemsArray, itemClick };

  return (
    <Drawer
      className="search-component-drawer"
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div className="input-bar">
        <Grid container>
          <Grid item xs={10}>
            <SearchInput handleSearchClick={onSearch} open={open} />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={onClose} style={{ color: "#878791" }}>
              收起
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className="tab">
        <Typography noWrap>
          序号&nbsp;&nbsp;｜&nbsp;&nbsp;
          {`结果: ${itemsArray.length}`}
        </Typography>
      </div>

      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height - 160}
            width={width - 10}
            itemSize={80}
            itemCount={itemsArray.length}
            itemData={itemData}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
      <ProgressBar loading={loading} />
    </Drawer>
  );
};

export default withSearchComponent(SearchComponent);
