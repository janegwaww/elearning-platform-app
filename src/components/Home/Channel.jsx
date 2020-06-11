import React, { Fragment, useEffect, useState } from "react";
import { navigate } from "gatsby";
import GridCards from "./GridCards";
import { getChannelList } from "../../services/home";
import ChannelBar from "./ChannelBar";

export default function Channel({ location: { state = {} } }) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const { index = "001" } = state;

  const fetchSubData = () => {
    setLoading(true);
    getChannelList({ category: index }).then(data => {
      setList(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (index) {
      fetchSubData();
    } else {
      navigate("/");
    }
  }, [index]);

  return (
    <Fragment>
      <div>
        <ChannelBar />
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
