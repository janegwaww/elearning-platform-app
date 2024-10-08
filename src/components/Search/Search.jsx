import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import Typography from "@material-ui/core/Typography";
import { flow, slice, map } from "lodash/fp";
import SearchCard from "./SearchCard";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import ProgressBar from "../Loading/ProgressBar";
import Pagination from "../Series/SePagination";
import GlobalSearchBar from "./GlobalSearchBar";
import { searchGlobal } from "../../services/home";
import { kGlobalSearchRecord } from "../../services/userActiveRecord";
import { searchUrlParams } from "../../services/utils";
import "./SearchStyles.sass";

const Search = ({ input, page = 1, type = "all" }) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState(0);
  const [queryWords, setQueryWords] = useState("");

  // fetch data from api
  const fetchSearchResult = () => {
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
      setQueryWords(input);
    });
  };

  const handleTypeClick = (cate) => {
    navigate(searchUrlParams({ value: input, type: cate }));
  };

  const handlePage = (event, pa) => {
    navigate(searchUrlParams({ value: input, type, page: pa }));
  };

  useEffect(() => {
    if (input) {
      fetchSearchResult();
    }
  }, [input, type, page]);

  return (
    <div className="search-root">
      <div style={{ height: 40 }} />
      <Typography
        noWrap
        dangerouslySetInnerHTML={{
          __html: `${num}个<span style='color: #007cff'>${queryWords}</span>相关的`,
        }}
      />
      <div style={{ height: 10 }} />
      <GlobalSearchBar type={type} handleTypeClick={handleTypeClick} />
      <div style={{ minHeight: "60vh" }}>
        {flow(
          slice(0, 12),
          map.convert({ cap: false })((o, i) => (
            <div key={i} onClick={() => kGlobalSearchRecord({ ...o, input })}>
              <SearchCard card={o} />
            </div>
          )),
        )(result)}
        <EmptyNotice
          empty={!result.length && !loading}
          type="noResult"
          handleFresh={fetchSearchResult}
        />
      </div>
      <br />
      <Pagination num={num} handlePage={handlePage} page={parseInt(page, 10)} />
      <br />
      <ProgressBar loading={loading} />
    </div>
  );
};

export default Search;
