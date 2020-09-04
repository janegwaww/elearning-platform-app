import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  inputBase: {
    backgroundColor: "#f2f2f5",
    borderRadius: "20px",
    paddingLeft: "20px",
  },
}));

const SearchInput = ({
  handleInput = () => ({}),
  handleSearchClick,
  handleEnter,
}) => {
  const classes = useStyles();

  const onSearch = () => {
    const { value } = document.getElementById("series_local_search_input");
    handleSearchClick(value);
  };

  return (
    <InputBase
      id="series_local_search_input"
      className={classes.inputBase}
      placeholder="页面搜索"
      type="search"
      onChange={(e) => handleInput(e.target.value)}
      onKeyDown={handleEnter}
      endAdornment={
        <InputAdornment>
          <IconButton onClick={onSearch}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default SearchInput;
