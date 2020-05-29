import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Pagination from "@material-ui/lab/Pagination";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import SearchCard from "./SearchCard";
import { searchGlobal } from "../../services/home";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white"
  },
  ul: {
    listStyleType: "none",
    "& > li": {
      display: "inline-block",
      marginRight: 10
    }
  },
  searchResult: {
    minHeight: "90vh"
  },
  pagination: {
    justifyContent: "center",
    backgroundColor: "transparent"
  }
}));

const iterateItems = (arr = []) => {
  return arr.map((o, i) => <SearchCard card={o} key={i} />);
};

export default function Search({ input }) {
  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [type, setType] = useState("all");

  const fetchSearchResult = ({ page = 1 }) => {
    searchGlobal({
      query_string: input,
      video_ids: [],
      max_size: 12,
      type,
      page
    }).then(data => {
      setResult(data.resultData);
      setCount(data.count);
    });
  };

  const handlePage = (event, page) => {
    event.preventDefault();
    fetchSearchResult({ page });
  };

  const handleTypeClick = cate => {
    setType(cate);
  };

  useEffect(() => {
    fetchSearchResult({});
  }, [, input, type]);

  return (
    <div className={classes.root}>
      <Typography>{`${count}个${input}相关的`}</Typography>
      <br />
      <Divider />
      <ButtonGroup
        variant="text"
        color="secondary"
        aria-label="text primary button group"
      >
        <Button onClick={() => handleTypeClick("all")}>全部</Button>
        <Button onClick={() => handleTypeClick("video")}>单个视频</Button>
        <Button onClick={() => handleTypeClick("series")}>系列视频</Button>
        <Button onClick={() => handleTypeClick("user")}>用户</Button>
        <Button onClick={() => handleTypeClick("document")}>课件</Button>
      </ButtonGroup>
      <Divider />
      <br />
      <div className={classes.searchResult}>{iterateItems(result)}</div>
      <br />
      <Pagination
        count={Math.ceil(count / 12)}
        variant="outlined"
        shape="rounded"
        classes={{ ul: classes.pagination }}
        onChange={handlePage}
      />
    </div>
  );
}
