import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const SearchAutoComplete = ({
  refInput = "",
  onChange,
  onSearch,
  onRemove,
  options,
  ...props
}) => {
  const [opt, setOpt] = useState(options());
  const [rvalue, setRvalue] = useState("");

  const handleRemove = (e, value) => {
    e.stopPropagation();
    setRvalue(value);
    onRemove(value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && e.target.value) {
      onSearch(e.target.value);
    }
  };

  const getOptions = () => {
    setOpt(options());
  };

  useEffect(() => {
    getOptions();
  }, [rvalue]);

  return (
    <Autocomplete
      freeSolo
      selectOnFocus
      handleHomeEndKeys
      clearOnBlur={false}
      options={opt}
      inputValue={refInput}
      getOptionLabel={(option) => option}
      onOpen={() => getOptions()}
      onInputChange={(event, newInputValue) => {
        onChange(newInputValue);
      }}
      renderOption={(option) => (
        <Box
          width="100%"
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Typography noWrap>{option}</Typography>
          <ButtonBase onClick={(e) => handleRemove(e, option)}>
            <Typography variant="caption" color="secondary" noWrap>
              删除
            </Typography>
          </ButtonBase>
        </Box>
      )}
      renderInput={(params) => (
        <InputBase
          placeholder="支持跨模态逐帧搜索..."
          id="search-page-input"
          type="search"
          inputProps={{ ...params.inputProps }}
          ref={params.InputProps.ref}
          onKeyDown={handleEnter}
          endAdornment={
            <InputAdornment position="end">
              <Button
                startIcon={<SearchIcon />}
                className="search-bar-button"
                onClick={onSearch}
              >
                搜索
              </Button>
            </InputAdornment>
          }
        />
      )}
      {...props}
    />
  );
};

export default SearchAutoComplete;
