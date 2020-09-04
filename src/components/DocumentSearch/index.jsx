import React, { useState, useRef } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import DocumentComponent from "./DocumentComponent";
import SearchComponent from "./SearchComponent";
import DSAppBar from "./DSAppBar";
import { getUser } from "../../services/auth";
import { getIdFromHref } from "../../services/utils";
import { likeTheVideo } from "../../services/video";
import { isLoggedIn } from "../../services/auth";
import { useLoginConfirm } from "../LoginConfirm";
import "./index.sass";

const api = "https://api.haetek.com:9191/api/v1/gateway";
const { token } = getUser();
const resType = {
  responseType: "blob",
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const params = (id) => ({
  model_action: "download",
  model_name: "document",
  extra_data: { file_id: id },
  model_type: "",
});
const fileDownload = (res, fileName) => {
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const save = document.createElement("a");
  save.href = url;
  save.download = `${fileName}.pdf`;
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
  const loginConfirm = useLoginConfirm();

  const handlePosition = (vector) => {
    setPosition(vector);
  };

  const handleDownload = () => {
    if (dsid && info.file_name && token) {
      axios
        .post(api, params(dsid), resType)
        .then((res) => {
          fileDownload(res, info.file_name);
        })
        .catch((err) => {
          console.error("Could not Download the file from the backend.", err);
        });
    }
    // 未登录处理
    if (!isLoggedIn()) loginConfirm();
  };

  const handleLike = () => {
    const value = info.is_like ? 0 : 1;
    if (!isLoggedIn()) return loginConfirm();
    likeTheVideo({ relation_id: [dsid], value, type: "document" }).then(
      (data) => {
        if (data) {
          setInfo((prev) => ({
            ...prev,
            is_like: value,
            like_counts: value ? prev.like_counts + 1 : prev.like_counts - 1,
          }));
        }
      },
    );
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
        handleLikeClick={handleLike}
      />

      <SearchComponent
        id={dsid}
        onClick={handlePosition}
        open={!show}
        onClose={showSearch}
      />

      <Container maxWidth="xl" disableGutters>
        <Grid container justify={show ? "center" : "flex-end"}>
          <Grid item xs={12} md={show ? scale : 7}>
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
