import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(() => ({
  inputInput: {
    backgroundColor: "#f2f2f5",
    borderRadius: "50px 0 0 50px",
    paddingLeft: "1em",
    "&::placeholder": {
      fontSize: "0.875rem",
    },
  },
  searchButton: {
    backgroundColor: "#007cff",
    borderRadius: "0 50px 50px 0",
    padding: "4px 8px",
    minWidth: "50px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#007cff",
    },
  },
}));

const SearchInput = ({ handleSearchClick, handleEnter }) => {
  const classes = useStyles();
  const handleSearch = () => {
    const { value } = document.getElementById("creatorhome_local_search_input");
    handleSearchClick(value);
  };

  return (
    <InputBase
      id="creatorhome_local_search_input"
      placeholder="请输入搜索内容..."
      type="search"
      classes={{ input: classes.inputInput }}
      onKeyDown={handleEnter}
      endAdornment={
        <InputAdornment>
          <Button onClick={handleSearch} className={classes.searchButton}>
            <SearchIcon />
            语义搜索
          </Button>
        </InputAdornment>
      }
    />
  );
};

export default SearchInput;
