import React, { useState, useEffect } from "react";
import MuiPagination from "@material-ui/lab/Pagination";
import { pipe } from "../../services/utils";
import "./PaginationStyles.sass";

export default function Pagination({ fetch = () => ({}) }) {
  const [count, setCount] = useState(5);
  const [curPage, setCurPage] = useState(1);

  const getCount = (bool) => setCount((prev) => (bool ? prev + 1 : prev));

  const increse = (page) => (num = 0) => {
    if (num === 0) return false;
    if (page < curPage) return false;
    if (page < count) return false;
    return true;
  };

  const pageNum = (num = 0) => Math.ceil(num / 16);

  const getLength = (data = []) => data.length;

  const handlePage = (event, page = 1) => {
    fetch({ page }, pipe(getLength, pageNum, increse(page), getCount));
    setCurPage(page);
  };

  return (
    <MuiPagination
      className="page-pagination"
      count={count}
      variant="outlined"
      shape="rounded"
      onChange={handlePage}
    />
  );
}
