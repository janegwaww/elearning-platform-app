import React, { useState, forwardRef, useImperativeHandle } from "react";
import MuiPagination from "@material-ui/lab/Pagination";
import { pipe } from "../../services/utils";
import "./PaginationStyles.sass";

function Pagination({ fetch = () => ({}), size = 16 }, ref) {
  const [count, setCount] = useState(3);
  const [curPage, setCurPage] = useState(1);

  const getCount = (num = 1) => setCount(num);

  const increse = (page) => (num = 0) => {
    if (page <= count && num < size) return page;
    if (page < curPage) return count;
    if (page < count) return count;
    return count + 1;
  };

  const getLength = (data = []) => data.length;

  const handlePage = (event, page = 1) => {
    fetch({ page }, pipe(getLength, increse(page), getCount));
    setCurPage(page);
  };

  useImperativeHandle(ref, () => ({
    handlePage: (event, page) => {
      handlePage(event, page);
    },
  }));

  return (
    <MuiPagination
      className="page-pagination"
      count={count}
      variant="outlined"
      shape="rounded"
      onChange={handlePage}
      page={curPage}
    />
  );
}

export default forwardRef(Pagination);
