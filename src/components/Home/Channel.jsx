import React, { Fragment, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import GridCards from "./GridCards";
import { getChannelList } from "../../services/home";
import ChannelBar from "./ChannelBar";

const useStyles = makeStyles(theme => ({
  pagination: {
    justifyContent: "center",
    backgroundColor: "#fff"
  }
}));

export default function Channel({ location: { state = {} } }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const { index = "001", name = "" } = state;

  const fetchSubData = () => {
    setLoading(true);
    getChannelList({ category: state.index }).then(data => {
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
