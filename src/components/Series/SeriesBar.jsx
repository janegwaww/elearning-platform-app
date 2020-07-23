import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SearchInput from "./SearchInput";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    padding: "8px 0",
    "& button": {
      borderRadius: "20px",
      padding: "4px 8px",
      "&:not(:last-child)": {
        marginRight: "20px",
      },
    },
    "& button.action": {
      backgroundColor: "#007cff",
      color: "#fff",
    },
  },
}));

const SeriesBar = ({
  type = "video",
  handleTypeClick,
  handleSearchClick,
  handleInput,
  handleEnter,
}) => {
  const classes = useStyles();

  return (
    <>
      <Divider />
      <Box className={classes.buttonGroup}>
        {/* <Button
          size="small"
          className={`${type === "all" && "action"}`}
          onClick={() => handleTypeClick("all")}
        >
          全部
        </Button> */}
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
          handleEnter={handleEnter}
        />
      </Box>
      <Divider />
    </>
  );
};

export default SeriesBar;
