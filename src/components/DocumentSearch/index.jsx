import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import download from "downloadjs";
import DocumentComponent from "./DocumentComponent";
import SearchComponent from "./SearchComponent";
import { getIdFromHref } from "../../services/utils";
import "./index.sass";

const DocumentSearch = () => {
  const { dsid } = getIdFromHref();
  const [position, setPosition] = useState([]);
  const [url, setUrl] = useState("");

  const handlePosition = (vector) => {
    setPosition(vector);
  };

  const handleDownload = () => {
    if (url) {
      window.open(url);
    }
  };

  return dsid ? (
    <div className="document-search-layer">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Container>
              <DocumentComponent
                id={dsid}
                position={position}
                getUrl={(url) => setUrl(url)}
              />
            </Container>
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchComponent id={dsid} itemClick={handlePosition} />
            <Button variant="contained" onClick={handleDownload}>
              下载
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  ) : null;
};

export default DocumentSearch;
