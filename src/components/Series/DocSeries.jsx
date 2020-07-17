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
import { getDocumentSeriesInfo } from "../../services/home";

const DocSeries = ({
  seriesInfo = "",
  series,
  seriesLength,
  loading,
  handlePage,
  handleInput,
  handleSearchClick,
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
      />

      <br />
      <div style={{ minHeight: "60vh" }}>
        {series.map((o, i) => {
          return <SearchCard card={o} key={i} />;
        })}
        <EmptyNotice empty={!series.length && !loading} />
      </div>

      <Pagination num={seriesLength} handlePage={handlePage} />
      <br />

      <ProgressBar loading={loading} />
    </div>
  );
};

export default withSeries(DocSeries, ({ dsid }) =>
  getDocumentSeriesInfo({ series_id: dsid })
);
