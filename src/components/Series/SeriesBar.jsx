import React from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SearchInput from "./SearchInput";

const SeriesBar = ({
  type = "all",
  handleTypeClick,
  handleSearchClick,
  handleInput,
}) => {
  return (
    <>
      <Divider />
      <Box className="buttonGroup">
        <Button
          size="small"
          className={`${type === "all" && "action"}`}
          onClick={() => handleTypeClick("all")}
        >
          全部
        </Button>
        <Button
          size="small"
          className={`${type === "video" && "action"}`}
          onClick={() => handleTypeClick("video")}
        >
          视频
        </Button>
        <Button
          size="small"
          className={`${type === "document" && "action"}`}
          onClick={() => handleTypeClick("document")}
        >
          课件
        </Button>

        <SearchInput
          handleInput={handleInput}
          handleSearchClick={handleSearchClick}
        />
      </Box>
      <Divider />
    </>
  );
};

export default SeriesBar;
