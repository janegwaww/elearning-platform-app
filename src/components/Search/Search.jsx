import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import SearchCard from "./SearchCard";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import ProgressBar from "../Loading/ProgressBar";
import Pagination from "../Series/SePagination";
import GlobalSearchBar from "./GlobalSearchBar";
import { searchGlobal } from "../../services/home";
import { kGlobalSearchRecord } from "../../services/userActiveRecord";
import "./SearchStyles.sass";

const Search = ({ input }) => {
  const [result, setResult] = useState([]);
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(0);

  // fetch data from api
  const fetchSearchResult = ({ page = 1 } = {}, callback = () => ({})) => {
    setLoading(true);
    searchGlobal({
      query_string: input,
      video_ids: [],
      max_size: 12,
      type,
      page,
    }).then(({ resultData = [], count = 0 }) => {
      setResult(resultData);
      setNum(count);
      setLoading(false);
      callback(resultData);
    });
  };

  const handleTypeClick = (cate) => {
    setType(cate);
  };

  const handlePage = (event, page) => {
    fetchSearchResult({ page });
  };

  useEffect(() => {
    if (input) {
      fetchSearchResult();
    }
  }, [input, type]);

  const iterateItems = (arr = []) => {
    // iterate there
    return arr.slice(0, 12).map((o, i) => (
      <div key={i} onClick={() => kGlobalSearchRecord({ ...o, input })}>
        <SearchCard card={o} />
      </div>
    ));
  };

  return (
    <div className="search-root">
      <div style={{ height: 40 }} />
      <Typography
        noWrap
        dangerouslySetInnerHTML={{
          __html: `${num}个<span style='color: #007cff'>${input}</span>相关的`,
        }}
      />
      <div style={{ height: 10 }} />
      <GlobalSearchBar type={type} handleTypeClick={handleTypeClick} />
      <div style={{ minHeight: "60vh" }}>
        {iterateItems(result)}
        <EmptyNotice
          empty={!result.length && !loading}
          type="noResult"
          handleFresh={fetchSearchResult}
        />
      </div>
      <br />
      <Pagination num={num} handlePage={handlePage} />
      <br />
      <ProgressBar loading={loading} />
    </div>
  );
};

export default Search;
