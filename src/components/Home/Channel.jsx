import React, { Fragment, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import HomeTab from "./HomeTab";
import GridCards from "./GridCards";
import { getChannelList } from "../../services/home";

const useStyles = makeStyles(theme => ({
  pagination: {
    justifyContent: "center",
    backgroundColor: "#fff"
  }
}));

export default function Channel({ location: { state } }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const fetchSubData = () => {
    setLoading(true);
    getChannelList({ category: state.index }).then(data => {
      setList(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (state.index) {
      fetchSubData();
    } else {
      navigate("/");
    }
  }, [state.index]);

  return (
    <Fragment>
      <HomeTab
        tabs={[
          {
            label: state.name,
            tabContent: () => (
              <div>
                <div style={{ minHeight: "90vh" }}>
                  <GridCards loading={loading} itemCount={16} items={list} />
                </div>
                <br />
                <Pagination
                  count={Math.ceil(list.length / 16)}
                  variant="outlined"
                  shape="rounded"
                  classes={{ ul: classes.pagination }}
                />
              </div>
            )
          }
        ]}
      />
    </Fragment>
  );
}
