import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { FixedSizeList, areEqual } from "react-window";
import SearchInput from "./SearchInput";
import withSearchComponent from "./withSearchComponent";

const useStyle = makeStyles({
  item: {},
});

const renderRow = memo(({ index, style, data }) => {
  const { itemsArray, itemClick } = data;
  const item = itemsArray[index];
  const refStr = (str) => `<span style='color: #007cff'>${str}</span>`;
  const markup = {
    __html: `${item.whole_str.replace(
      item.str_for_reference,
      refStr(item.str_for_reference),
    )}`,
  };
  return (
    <ListItem button style={style} key={index} onClick={() => itemClick(item)}>
      <Grid container>
        <Grid item xs={1}>
          <div>{index + 1}</div>
        </Grid>
        <Grid item xs={11}>
          <Typography dangerouslySetInnerHTML={markup} />
        </Grid>
      </Grid>
    </ListItem>
  );
}, areEqual);

const SearchComponent = ({ onSearch, itemsArray = [], itemClick }) => {
  const itemData = { itemsArray, itemClick };

  return (
    <Box pt={4} pb={2}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SearchInput handleSearchClick={onSearch} />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <FixedSizeList
              height={500}
              width="100%"
              itemSize={80}
              itemCount={itemsArray.length}
              itemData={itemData}
            >
              {renderRow}
            </FixedSizeList>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withSearchComponent(SearchComponent);
