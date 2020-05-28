import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Pagination from "@material-ui/lab/Pagination";
import SearchCard from "./SearchCard";
import { searchGlobal } from "../../services/home";

const useStyles = makeStyles(theme => ({
  ul: {
    listStyleType: "none",
    "& > li": {
      display: "inline-block",
      marginRight: 10
    }
  }
}));

const iterateItems = (arr = []) => {
  return arr.map((o, i) => <SearchCard card={o} key={i} />);
};

export default function Search({ input }) {
  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);

  const fetchSearchResult = () => {
    searchGlobal({
      query_string: input,
      video_ids: [],
      type: "all",
      max_size: 12,
      page: 1
    }).then(data => {
      setResult(data.data);
      setCount(data.count);
    });
  };

  useEffect(() => {
    fetchSearchResult();
  }, [, input]);

  return (
    <div>
      <Typography>{`${count}个${input}相关的`}</Typography>
      <br />
      <Divider />
      <ul className={classes.ul}>
        <li>全部</li>
        <li>单个视频</li>
        <li>系列视频</li>
        <li>用户</li>
        <li>订阅</li>
      </ul>
      <Divider />
      <br />
      <div>{iterateItems(result)}</div>
      <br />
      <Pagination count={11} variant="outlined" shape="rounded" />
    </div>
  );
}
