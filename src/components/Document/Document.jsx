import React, { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import SearchLoading from "../Loading/SearchLoading";
import { getDocumentDetail } from "../../services/video";
import { secondsToDate } from "../../services/utils";
import "./DocumentStyles.sass";

export default function Document({ did }) {
  const [detail, setDetail] = useState({});
  const [expanded, setExpanded] = useState("panel1");
  const [loading, setLoading] = useState("false");

  const fetchDocumentInfo = () => {
    setLoading(true);
    getDocumentDetail({ file_id: did }).then(data => {
      setDetail(data);
      setLoading(false);
    });
  };

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    did && fetchDocumentInfo();
  }, [did]);

  const Title = ({ name }) => (
    <div className="title">
      <Typography>{name}</Typography>
      <div style={{ borderBottom: "2px solid #007CFF" }} />
    </div>
  );

  return (
    <Fragment>
      <div className="document-component">
        <br />
        <Box className="menuBox">
          <Title name="课件详情" />
          <Box className="content">
            <Typography color="textSecondary" variant="body2" gutterBottom>
              课件名称：
              {detail.file_name}
            </Typography>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              内容简介：
              {detail.description}
            </Typography>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              文件格式：
              {detail.file_type}
            </Typography>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              文件大小：
              {detail.file_size}
            </Typography>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              上传时间：
              {secondsToDate(detail.upload_time)}
            </Typography>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              价格：
              <span style={{ color: "#fc5659" }}>{`￥${detail.price}`}</span>
            </Typography>
          </Box>
        </Box>
        <br />

        <Box className="menuBox">
          <Title name="作者简介" />
          <Box className="content">
            <Typography gutterBottom noWrap>
              {detail.author_info && detail.author_info.name}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {detail.author_info && detail.author_info.introduction}
            </Typography>
          </Box>
        </Box>
        <br />

        <Box className="menuBox">
          <Title name="课件目录" />
          <Box className="content">
            {detail.catalogue &&
              detail.catalogue.map((o, i) => (
                <MuiExpansionPanel
                  square
                  expanded={expanded === `panel${i + 1}`}
                  onChange={handleChange(`panel${i + 1}`)}
                  key={i}
                  className="expansionpanel"
                >
                  <MuiExpansionPanelSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    expandIcon={<ExpandMoreIcon />}
                    className="expansionpanelsummary"
                  >
                    <Typography>{Object.keys(o)[0]}</Typography>
                  </MuiExpansionPanelSummary>
                  <MuiExpansionPanelDetails className="expansionpaneldetails">
                    {Object.values(o)[0].map((o, i) => (
                      <Typography
                        key={i}
                        gutterBottom
                        style={{ paddingLeft: 20 }}
                      >
                        {Object.keys(o)[0]}
                      </Typography>
                    ))}
                  </MuiExpansionPanelDetails>
                </MuiExpansionPanel>
              ))}
          </Box>
        </Box>
        <br />

        <Box>
          <Title name="课件预览" />
          <br />
          <Box style={{ height: 600, backgroundColor: "#d8d8d8", padding: 8 }}>
            <img src={`${detail.preview_path}`} width={400} />
          </Box>
        </Box>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ borderRadius: 24 }}
            onClick={() => window.history.back()}
          >
            返回
          </Button>
        </div>
        <br />
        <SearchLoading loading={loading} />
      </div>
    </Fragment>
  );
}
