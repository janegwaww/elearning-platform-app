import React from "react";
import { PDFReader } from "reactjs-pdf-reader";
import Grid from "@material-ui/core/Grid";
import ProtocolTitle from "./ProtocolTitle";

const ProtocolContainer = ({ title = "", src = "" }) => {
  return (
    <>
      <div style={{ height: 40 }} />
      <Grid container>
        <Grid item lg={2} xs={12}>
          <ProtocolTitle title={title} />
        </Grid>
        <Grid
          item
          lg={10}
          xs={12}
          style={{ height: "90vh", overflowY: "scroll" }}
        >
          {PDFReader && <PDFReader url={`${src}`} showAllPage />}
          {/* <iframe src={src} width="100%" height="100%" /> */}
        </Grid>
      </Grid>
      <br />
      <br />
    </>
  );
};

export default ProtocolContainer;
