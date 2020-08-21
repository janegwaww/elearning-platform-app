import React, { useState, useRef } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import DocumentComponent from "./DocumentComponent";
import SearchComponent from "./SearchComponent";
import DSAppBar from "./DSAppBar";
import { getIdFromHref } from "../../services/utils";
import "./index.sass";

const api = "http://api.haetek.com:9191/api/v1/gateway";
const resType = { responseType: "blob" };
const params = (id) => ({
  model_action: "download",
  model_name: "document",
  extra_data: { file_id: id },
  model_type: "",
});
const fileDownload = (data, fileName) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const save = document.createElement("a");
  save.href = url;
  save.download = fileName;
  save.target = "_blank";
  document.body.appendChild(save);
  save.click();
  document.body.removeChild(save);
};

const DocumentSearch = () => {
  const { dsid } = getIdFromHref();
  const [position, setPosition] = useState([]);
  const [info, setInfo] = useState({});
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(5);
  const docComRef = useRef(null);

  const handlePosition = (vector) => {
    setPosition(vector);
  };

  const handleDownload = () => {
    if (dsid && info.file_name) {
      axios
        .post(api, params(dsid), resType)
        .then((res) => {
          fileDownload(res.data, info.file_name);
        })
        .catch((err) => {
          console.error("Could not Download the file from the backend.", err);
        });
    }
  };

  const showSearch = () => {
    setShow((prev) => !prev);
  };

  const handleScale = (iterate) => {
    if (iterate && scale < 12 && docComRef.current) {
      setScale((prev) => prev + 1);
      docComRef.current.reportWindowSize();
    }
    if (!iterate && scale > 2) {
      setScale((prev) => prev - 1);
      docComRef.current.reportWindowSize();
    }
  };

  return dsid ? (
    <div className="document-search-layer">
      <DSAppBar
        info={info}
        show={show}
        page={page}
        handleClick={showSearch}
        handleDownload={handleDownload}
        handleScale={handleScale}
      />

      <SearchComponent
        id={dsid}
        onClick={handlePosition}
        open={!show}
        onClose={showSearch}
      />

      <Container maxWidth="xl">
        <Grid container justify={show ? "center" : "flex-end"}>
          <Grid item xs={12} lg={show ? scale : 7}>
            <DocumentComponent
              ref={docComRef}
              id={dsid}
              show={show}
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
