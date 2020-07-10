import React, { Fragment, useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import GridCards from "../GridCards/GridCards";
import ChannelBar from "./ChannelBar";
import { getChannelList } from "../../services/home";
import { getIdFromHref } from "../../services/utils";
import Pagination from "../Pagination/Pagination";
import EmptyNotice from "../EmptyNotice/EmptyNotice";

export default function Channel() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const { ch = "" } = getIdFromHref();
  const pageRef = useRef();

  const fetchSubData = ({ page = 1 }, callback = () => ({})) => {
    setLoading(true);
    getChannelList({ category: ch, max_size: 16, page }).then((data) => {
      setList(data);
      setLoading(false);
      callback(data);
    });
  };

  useEffect(() => {
    if (ch && pageRef.current) {
      pageRef.current.handlePage({}, 1);
    }
  }, [ch]);

  return (
    <>
      <div>
        <ChannelBar id={ch} />
        <br />
        <div style={{ minHeight: "60vh" }}>
          <GridCards loading={loading} itemCount={16} items={list} />
          <EmptyNotice empty={!list.length && !loading} />
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <Button onClick={fetchSubData} variant="contained" color="secondary">
            换一换
          </Button>
        </div>
        <div style={{ display: "none" }}>
          <Pagination fetch={fetchSubData} ref={pageRef} />
        </div>
        <br />
      </div>
    </>
  );
}
