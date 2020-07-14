import React, { useEffect, useState, useRef } from "react";
import GridCards from "../GridCards/GridCards";
import ChannelBar from "./ChannelBar";
import { getChannelList } from "../../services/home";
import { getIdFromHref } from "../../services/utils";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import ChangeBatchButton from "./ChangeBatchButton";
import Tabs from "../Tabs/Tabs";

export default function Channel() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const { ch = "" } = getIdFromHref();
  const [type, setType] = useState("all");

  const fetchSubData = ({ page = 1 } = {}, callback = () => ({})) => {
    setLoading(true);
    getChannelList({ category: ch, max_size: 16, page, type }).then((data) => {
      setList(data);
      setLoading(false);
      callback(data);
    });
  };

  const handleTab = (value) => {
    setType(value);
  };

  useEffect(() => {
    if (ch) {
      fetchSubData();
    }
  }, [ch, type]);

  return (
    <>
      <div>
        <ChannelBar id={ch} />
        <Tabs handleTab={handleTab} />
        <br />
        <div style={{ minHeight: "60vh" }}>
          <GridCards loading={loading} itemCount={16} items={list} />
          <EmptyNotice empty={!list.length && !loading} />
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <ChangeBatchButton handleChange={fetchSubData} />
        </div>
        <br />
      </div>
    </>
  );
}
