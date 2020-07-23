import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import SearchLoading from "../Loading/SearchLoading";
import ShopBar from "./ShopBar";
import { getDocumentDetail } from "../../services/video";
import { secondsToDate } from "../../services/utils";
import "./DocumentStyles.sass";

const Title = ({ name }) => (
  <div className="title">
    <Typography>{name}</Typography>
    <div className="divider" />
  </div>
);

const LineText = ({
  name = "",
  content = "",
  detail = "",
  color = "#2c2c3b",
  mb = 20,
}) => {
  const styles = { color, lineHeight: "24px" };
  return (
    <Box
      style={{
        display: "flex",
        marginBottom: `${mb}px`,
        alignItems: "baseline",
      }}
    >
      {name && (
        <div style={{ width: 200, marginRight: 10 }}>
          <Typography
            color="textSecondary"
            variant="body2"
            gutterBottom
            align="right"
          >
            {`${name} :`}
          </Typography>
        </div>
      )}
      <div style={{ maxWidth: "calc(100% - 210px)" }}>
        {content && (
          <Typography style={styles} variant="body2">
            {content}
          </Typography>
        )}
        {detail && (
          <Typography style={{ ...styles, marginTop: 20 }} variant="body2">
            {detail}
          </Typography>
        )}
      </div>
    </Box>
  );
};

const ImageModel = ({ path = "" }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const styles = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    width: "50%",
    minWidth: 700,
    height: "100%",
    overflowY: "auto",
  };
  return (
    <div>
      <ButtonBase onClick={handleOpen}>
        <div className="file-container">
          <img src={`${path}`} alt={`${path}`} />
        </div>
      </ButtonBase>
      <Modal open={open} onClose={handleClose}>
        <div style={styles}>
          <img src={`${path}`} alt={`${path}`} width="100%" />
        </div>
      </Modal>
    </div>
  );
};

const Document = ({ did }) => {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchDocumentInfo = () => {
    setLoading(true);
    getDocumentDetail({ file_id: did }).then((data) => {
      setDetail(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (did) {
      fetchDocumentInfo();
    }
  }, [did]);

  const menuLevel = (index = [], list) =>
    Object.values(list)[0].map((o, i) => (
      <Typography key={i} gutterBottom variant="body2">
        {`${index.concat(i + 1).join(".")} ${Object.keys(o)[0]}`}
        <div
          style={{ paddingLeft: `${13 * (index.length + 1)}px`, paddingTop: 2 }}
        >
          {menuLevel([...index, i + 1], o)}
        </div>
      </Typography>
    ));

  return (
    <>
      <div className="document-component">
        <div style={{ marginBottom: 40 }} />
        <Box className="menuBox">
          <div className="title-box">
            <Title name="课件详情" />
          </div>
          <Box className="content">
            <div>
              <LineText name="课件名称" content={detail.file_name} />
              <LineText name="课件内容" content={detail.description} />
              <LineText name="文件格式" content={detail.file_type} />
              <LineText name="文件大小" content={detail.file_size} />
              <LineText
                name="上传时间"
                content={secondsToDate(detail.upload_time)}
              />
            </div>
          </Box>
        </Box>

        <Box className="menuBox">
          <div className="title-box">
            <Title name="作者简介" />
          </div>
          <Box className="content">
            <div>
              {detail.author_info &&
                detail.author_info.map((o) => (
                  <div key={o.name}>
                    <LineText name={o.name} content={o.introduction} />
                  </div>
                ))}
            </div>
          </Box>
        </Box>

        <Box className="menuBox">
          <div className="title-box">
            <Title name="课件目录" />
          </div>
          <Box className="content">
            <div>
              {detail.catalogue &&
                detail.catalogue.map((o, i) => (
                  <MuiExpansionPanel square key={i} className="expansionpanel">
                    <MuiExpansionPanelSummary
                      aria-controls={`panel${i + 1}d-content`}
                      id={`panel${i + 1}d-header`}
                      expandIcon={<ExpandMoreIcon />}
                      className="expansionpanelsummary"
                    >
                      <LineText
                        name={`第${i + 1}章`}
                        content={`${Object.keys(o)[0]}`}
                        mb={0}
                      />
                    </MuiExpansionPanelSummary>
                    <MuiExpansionPanelDetails className="expansionpaneldetails">
                      <div style={{ paddingLeft: 230 }}>
                        {menuLevel([i + 1], o)}
                      </div>
                    </MuiExpansionPanelDetails>
                  </MuiExpansionPanel>
                ))}
            </div>
          </Box>
        </Box>

        <Box className="menuBox">
          <div className="title-box">
            <Title name="课件预览" />
          </div>
          <Box className="content">
            <div style={{ marginRight: 210 }} />
            <ImageModel path={detail.preview_path} />
          </Box>
        </Box>
        <br />
        <br />
        <ShopBar info={detail} did={did} />
        <SearchLoading loading={loading} />
      </div>
    </>
  );
};

export default Document;
