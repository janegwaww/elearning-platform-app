import React, { Fragment, useEffect, useState } from "react";
/* import { navigate } from "gatsby"; */
import GridCards from "./GridCards";
import ChannelBar from "./ChannelBar";
import { getChannelList } from "../../services/home";
import { getIdFromHref } from "../../services/utils";
import SearchLoading from "../Loading/SearchLoading";
import Pagination from "../Pagination/Pagination";
import EmptyNotice from "../EmptyNotice/EmptyNotice";

export default function Channel() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const { ch = "" } = getIdFromHref();

  const fetchSubData = ({ page = 1 }, callback = () => ({})) => {
    setLoading(true);
    getChannelList({ category: ch, max_size: 16, page }).then((data) => {
      setList(data);
      setLoading(false);
      callback(data);
    });
  };

  useEffect(() => {
    if (ch) {
      fetchSubData({});
    }
  }, [ch]);

  return (
    <Fragment>
      <div>
        <ChannelBar id={ch} />
        <br />
        <div style={{ minHeight: "60vh" }}>
          <GridCards loading={loading} itemCount={16} items={list} />
          <EmptyNotice empty={!list.length && !loading} />
        </div>
        <br />
        <Pagination fetch={fetchSubData} />
        <br />
      </div>
      <SearchLoading loading={loading} />
    </Fragment>
  );
}
