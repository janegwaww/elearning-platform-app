import React from "react";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

export default function SearchInput({ handleInput, handleSearchClick }) {
  return (
    <InputBase
      id="series_local_search_input"
      className="inputBase"
      placeholder="页面搜索"
      type="search"
      onChange={(e) => handleInput(e.target.value)}
      endAdornment={
        <InputAdornment>
          <IconButton onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}
