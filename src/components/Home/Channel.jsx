import React, { Fragment, useEffect, useState } from "react";
import { navigate } from "gatsby";
import GridCards from "./GridCards";
import ChannelBar from "./ChannelBar";
import { getChannelList } from "../../services/home";
import { getIdFromHref } from "../../services/utils";

export default function Channel() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const { ch = "001" } = getIdFromHref();

  const fetchSubData = id => {
    setLoading(true);
    getChannelList({ category: id }).then(data => {
      setList(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (ch) {
      fetchSubData(ch);
    } else {
      navigate("/");
    }
  }, [ch]);

  return (
    <Fragment>
      <div>
        <ChannelBar index={ch} />
        <br />
        <div style={{ minHeight: "90vh" }}>
          <GridCards loading={loading} itemCount={16} items={list} />
        </div>
        <br />
        <br />
      </div>
    </Fragment>
  );
}
