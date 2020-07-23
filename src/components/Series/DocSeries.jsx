import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import withSeries from "./withSeries";
import HeadCard from "./HeadCard";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import Pagination from "./SePagination";
import ProgressBar from "../Loading/ProgressBar";
import SearchCard from "../Search/SearchCard";
import SearchInput from "./SearchInput";
import { getDocumentSeriesInfo, docSeriesSearch } from "../../services/home";

const DocSeries = ({
  seriesInfo = "",
  docSeries = [],
  docSeriesLength,
  loading,
  handlePage,
  handleInput,
  handleSearchClick,
  handleEnter,
}) => {
  return (
    <div className="series-component">
      <br />
      <br />
      <Typography>
        <span style={{ color: "#007cff" }}>{seriesInfo.title}</span>
        {` 系列文本的详细信息`}
      </Typography>
      <br />

      <HeadCard info={seriesInfo} />
      <br />
      <br />

      <Divider />
      <br />
      <SearchInput
        handleInput={handleInput}
        handleSearchClick={handleSearchClick}
        handleEnter={handleEnter}
      />

      <br />
      <div style={{ minHeight: "60vh" }}>
        {docSeries.map((o, i) => {
          return <SearchCard card={o} key={i} />;
        })}
        <EmptyNotice
          empty={!docSeries.length && !loading}
          type="noResult"
          handleFresh={handleSearchClick}
        />
      </div>

      <Pagination num={docSeriesLength} handlePage={handlePage} />
      <br />

      <ProgressBar loading={loading} />
    </div>
  );
};

export default withSeries(
  DocSeries,
  ({ dsid }) => getDocumentSeriesInfo({ series_id: dsid }),
  (params) => docSeriesSearch(params)
);
