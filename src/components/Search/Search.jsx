import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import SearchCard from "./SearchCard";

import EmptyNotice from "../EmptyNotice/EmptyNotice";
import ProgressBar from "./ProgressBar";
import { searchGlobal } from "../../services/home";
import "./SearchStyles.sass";

const Search = ({ input }) => {
  const [result, setResult] = useState([]);
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(false);

  // fetch data from api
  const fetchSearchResult = ({ page = 1 }, callback = () => ({})) => {
    setLoading(true);
    searchGlobal({
      query_string: input,
      video_ids: [],
      max_size: 10,
      type,
      page,
    }).then((data) => {
      setResult(data);
      setLoading(false);
      callback(data);
    });
  };

  const handleTypeClick = (cate) => {
    setType(cate);
  };

  useEffect(() => {
    if (input) {
      fetchSearchResult({});
    }
  }, [input, type]);

  const iterateItems = (arr = []) => {
    // iterate there
    return arr.slice(0, 10).map((o, i) => <SearchCard card={o} key={i} />);
  };

  return (
    <div className="search-root">
      <div style={{ height: 40 }} />
      <Divider />
      <Box className="buttonGrounp">
        <Button
          size="small"
          className={`${type === "all" && "action"}`}
          onClick={() => handleTypeClick("all")}
        >
          全部模态
        </Button>
        <Button
          size="small"
          className={`${type === "video" && "action"}`}
          onClick={() => handleTypeClick("video")}
        >
          单个视频
        </Button>
        <Button
          size="small"
          className={`${type === "series" && "action"}`}
          onClick={() => handleTypeClick("series")}
        >
          系列视频
        </Button>
        <Button
          size="small"
          className={`${type === "document" && "action"}`}
          onClick={() => handleTypeClick("document")}
        >
          文本模态
        </Button>
        <Button
          size="small"
          className={`${type === "user" && "action"}`}
          onClick={() => handleTypeClick("user")}
        >
          用户
        </Button>
        <Tooltip title="敬请期待..." placement="top-start">
          <span>
            <Button
              size="small"
              disabled
              className={`${type === "more" && "action"}`}
              onClick={() => handleTypeClick("more")}
            >
              更多模态...
            </Button>
          </span>
        </Tooltip>
      </Box>
      <Divider />
      <br />
      <div className="searchResult">
        {iterateItems(result)}
        {!result.length && !loading && <EmptyNotice />}
      </div>
      <br />
      <ProgressBar loading={loading} />
    </div>
  );
};

export default Search;
