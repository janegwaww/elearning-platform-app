import React from "react";
import Grid from "@material-ui/core/Grid";
import ProtocolTitle from "./ProtocolTitle";

const ProtocolContainer = ({ title = "", src = "" }) => {
  return (
    <>
      <div style={{ height: 40 }} />
      <Grid container>
        <Grid item xs={12}>
          <ProtocolTitle title={title} />
        </Grid>
        <Grid item xs={12} style={{ height: "90vh" }}>
          <iframe
            src={src}
            width="100%"
            height="100%"
            style={{ border: "1px solid #fff" }}
          />
        </Grid>
      </Grid>
      <br />
      <br />
    </>
  );
};

export default ProtocolContainer;
