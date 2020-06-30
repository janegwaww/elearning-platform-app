import React, { useState, useEffect } from "react";
import MuiPagination from "@material-ui/lab/Pagination";
import { pipe } from "../../services/utils";
import "./PaginationStyles.sass";

export default function Pagination({ fetch = () => ({}), method = "async" }) {
  const [count, setCount] = useState(5);
  const [curPage, setCurPage] = useState(1);

  const getCount = (num = 1) => setCount(num);

  const increse = (page) => (num = 0) => {
    if (page <= count && num < 16) return page;
    if (page < curPage) return count;
    if (page < count) return count;
    return count + 1;
  };

  const pageNum = (num = 0) => Math.ceil(num / 16);

  const getLength = (data = []) => data.length;

  const handlePage = (event, page = 1) => {
    fetch({ page }, pipe(getLength, increse(page), getCount));
    setCurPage(page);
  };

  useEffect(() => {
    if (method === "async") handlePage({}, 1);
  }, []);

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
