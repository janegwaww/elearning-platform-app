import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { FixedSizeList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SearchInput from "./SearchInput";
import withSearchComponent from "./withSearchComponent";

const useStyles = makeStyles(theme => ({
  item: {
    backgroundColor: "#878791"
  },
  button: {
    "&:hover": {
      backgroundColor: "#878792"
    }
  },
  drawerPaper: {
    backgroundColor: "#1b1b1d",
    width: "41.666667%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  tab: {
    backgroundColor: "rgba(60,60,60,1)",
    padding: "9px",
    color: "#fff"
  }
}));

const renderRow = memo(({ index, style, data }) => {
  const classes = useStyles();
  const { itemsArray, itemClick } = data;
  const item = itemsArray[index];
  const refStr = str =>
    `<span style='background-color: #007cff; border-radius: 2px'>${str}</span>`;
  const markup = {
    __html: `${item.whole_str.replace(
      item.str_for_reference,
      refStr(item.str_for_reference)
    )}`
  };
  return (
    <ListItem
      button
      style={style}
      key={index}
      onClick={() => itemClick({ ...item, index })}
      className={item.isActive ? classes.item : ""}
      classes={{ button: classes.button }}
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
  onClose
}) => {
  const classes = useStyles();
  const itemData = { itemsArray, itemClick };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <Box pt={2} pb={4} pl={5}>
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
      </Box>

      <Box className={classes.tab}>
        <Typography noWrap>
          序号&nbsp;&nbsp;｜&nbsp;&nbsp;
          {`结果: ${itemsArray.length}`}
        </Typography>
      </Box>

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
    </Drawer>
  );
};

export default withSearchComponent(SearchComponent);
