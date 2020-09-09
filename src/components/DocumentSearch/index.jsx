import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import DocumentComponent from "./DocumentComponent";
import SearchComponent from "./SearchComponent";
import DSAppBar from "./DSAppBar";
import withId from "../EmptyNotice/withId";
import { isLoggedIn } from "../../services/auth";
import { likeTheVideo } from "../../services/video";
import { useLoginConfirm } from "../LoginConfirm";
import downloadjs from "./fileDownload";
import "./index.sass";

const DocumentSearch = ({ id }) => {
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
    downloadjs(id, info.file_name, info.file_type);
    // 未登录处理
    if (!isLoggedIn()) loginConfirm();
  };

  const handleLike = () => {
    const value = info.is_like ? 0 : 1;
    if (!isLoggedIn()) return loginConfirm();
    likeTheVideo({ relation_id: [id], value, type: "document" }).then(
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

  return (
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
        id={id}
        onClick={handlePosition}
        open={!show}
        onClose={showSearch}
      />

      <Container maxWidth="xl" disableGutters>
        <Grid container justify={show ? "center" : "flex-end"}>
          <Grid item xs={12} md={show ? scale : 7}>
            <DocumentComponent
              ref={docComRef}
              id={id}
              show={show}
              position={position}
              getInfo={(obj) => setInfo(obj)}
              getPage={(p) => setPage(p)}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default withId(DocumentSearch);
