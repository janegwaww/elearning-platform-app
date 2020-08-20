import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(() => ({
  root: {
    border: "1px solid rgba(86,86,99,1)",
    borderRadius: "20px",
  },
  inputInput: {
    color: "#fff",
    "&::placeholder": {
      fontSize: "0.875rem",
      color: "#fff",
    },
  },
  searchButton: {
    backgroundColor: "inherit",
    borderRadius: "0 50px 50px 0",
    padding: "4px 8px",
    minWidth: "50px",
    color: "#fff",
  },
}));

const SearchInput = ({ handleSearchClick, open }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const inputEl = useRef(null);

  const handleSearch = () => {
    if (value) {
      handleSearchClick(value);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => setValue("");

  useEffect(() => {
    if (inputEl.current && open) {
      inputEl.current.focus();
    }
  }, [open]);

  return (
    <InputBase
      inputProps={{
        ref: inputEl,
      }}
      id="creatorhome_local_search_input"
      placeholder="语义搜索"
      type="search"
      fullWidth
      classes={{ input: classes.inputInput, root: classes.root }}
      onKeyDown={handleEnter}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      startAdornment={
        <InputAdornment>
          <IconButton onClick={handleSearch} className={classes.searchButton}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment>
          <IconButton onClick={handleClear} className={classes.searchButton}>
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default SearchInput;
