import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DocumentComponent from "./DocumentComponent";
import SearchComponent from "./SearchComponent";
import DSAppBar from "./DSAppBar";
import { getIdFromHref } from "../../services/utils";
import "./index.sass";

const DocumentSearch = () => {
  const { dsid } = getIdFromHref();
  const [position, setPosition] = useState([]);
  const [info, setInfo] = useState({});
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(1);

  const handlePosition = (vector) => {
    setPosition(vector);
  };

  const handleDownload = () => {
    if (info.file_path) {
      window.open(info.file_path);
    }
  };

  const showSearch = () => {
    setShow((prev) => !prev);
  };

  return dsid ? (
    <div className="document-search-layer">
      <DSAppBar
        info={info}
        show={show}
        page={page}
        handleClick={showSearch}
        handleDownload={handleDownload}
      />

      <SearchComponent
        id={dsid}
        onClick={handlePosition}
        open={!show}
        onClose={showSearch}
      />
      <Container maxWidth="xl">
        <Grid container justify={show ? "center" : "flex-end"}>
          <Grid item xs={0} />
          <Grid item xs={12} md={show ? 5 : 7}>
            <DocumentComponent
              id={dsid}
              position={position}
              getInfo={(obj) => setInfo(obj)}
              getPage={(p) => setPage(p)}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  ) : null;
};

export default DocumentSearch;
