import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SearchCard from "./SearchCard";
import SearchLoading from "../Loading/SearchLoading";
import Pagination from "../Pagination/Pagination";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import { searchGlobal } from "../../services/home";
import "./SearchStyles.sass";

const Search = ({ input }) => {
  const [result, setResult] = useState([]);
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchSearchResult = ({ page = 1 }, callback = () => ({})) => {
    setLoading(true);
    searchGlobal({
      query_string: input,
      video_ids: [],
      max_size: 16,
      type,
      page,
    }).then((data) => {
      const sd = (d) => d.slice((page - 1) * 16, (page - 1) * 16 + 16);
      setResult(sd(data));
      setLoading(false);
      callback(sd(data));
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
    return arr.slice(0, 16).map((o, i) => <SearchCard card={o} key={i} />);
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
          全部
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
          className={`${type === "user" && "action"}`}
          onClick={() => handleTypeClick("user")}
        >
          用户
        </Button>
        <Button
          size="small"
          className={`${type === "document" && "action"}`}
          onClick={() => handleTypeClick("document")}
        >
          课件
        </Button>
      </Box>
      <Divider />
      <br />
      <div className="searchResult">
        {iterateItems(result)}
        {!result.length && !loading && <EmptyNotice />}
      </div>
      <br />
      <Pagination fetch={fetchSearchResult} method="total" />
      <br />
      <SearchLoading loading={loading} />
    </div>
  );
};

export default Search;
