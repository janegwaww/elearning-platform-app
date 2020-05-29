import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import HomeTab from "./HomeTab";
import GridCards from "./GridCards";

const useStyles = makeStyles(theme => ({
  pagination: {
    justifyContent: "center",
    backgroundColor: "#fff"
  }
}));

export default function Channel() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const fetchSubData = () => {};

  useEffect(() => {
    fetchSubData();
  }, []);

  return (
    <Fragment>
      <HomeTab
        tabs={[
          {
            label: "金融",
            tabContent: () => (
              <div>
                <GridCards loading={loading} itemCount={16} items={[]} />
                <br />
                <Pagination
                  count={10}
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
