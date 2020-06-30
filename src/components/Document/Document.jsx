import React, { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ButtonBase from "@material-ui/core/ButtonBase";
import Link from "@material-ui/core/Link";
import SearchLoading from "../Loading/SearchLoading";
import {
  getDocumentDetail,
  aliPayment,
  verifyAliPay,
} from "../../services/video";
import { secondsToDate } from "../../services/utils";
import "./DocumentStyles.sass";

export default function Document({ did }) {
  const [detail, setDetail] = useState({});
  const [expanded, setExpanded] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paidedHref, setPaidedHref] = useState("");

  const fetchDocumentInfo = () => {
    setLoading(true);
    getDocumentDetail({ file_id: did }).then((data) => {
      setDetail(data);
      setIsPay(!!data.is_pay);
      setLoading(false);
    });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const verifyIsPaided = (id) => {
    verifyAliPay({ order_id: id }).then((data) => {
      const { file_path } = data;
      if (file_path) {
        setPaidedHref(file_path);
        setIsPay(!!file_path);
      } else {
        setTimeout(() => {
          verifyIsPaided(id);
        }, 1000);
      }
      console.log(data);
    });
  };

  const paymentClick = () => {
    const { price } = detail;
    aliPayment({ price, file_id: did, url: window.location.href }).then(
      (data) => {
        if (data.url && data.order_id) {
          window.open(data.url);
          setOrderId(data.order_id);
          verifyIsPaided(data.order_id);
        }
      }
    );
  };

  useEffect(() => {
    if (did) {
      fetchDocumentInfo();
    }
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
        <br />
        <br />
        <Box className="menuBox">
          <Title name="课件详情" />
          <Box className="content">
            <Typography color="textSecondary" variant="body2" gutterBottom>
              课件名称：
              <span style={{ color: "#2c2c3b" }}>{detail.file_name}</span>
            </Typography>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              内容简介：
              <span style={{ color: "#2c2c3b" }}>{detail.description}</span>
            </Typography>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              文件格式：
              <span style={{ color: "#2c2c3b" }}>{detail.file_type}</span>
            </Typography>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              文件大小：
              <span style={{ color: "#2c2c3b" }}>{detail.file_size}</span>
            </Typography>
            <Typography color="textSecondary" variant="body2" gutterBottom>
              上传时间：
              <span style={{ color: "#2c2c3b" }}>
                {secondsToDate(detail.upload_time)}
              </span>
            </Typography>
            <div style={{ display: "flex" }}>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                价格：
                <span style={{ color: "#fc5659" }}>{`￥${detail.price}`}</span>
              </Typography>
              <div style={{ marginRight: "120px", display: "inline" }} />
              {isPay ? (
                <Link
                  href={`${paidedHref}`}
                  underline="none"
                  target="_blank"
                  rel="noopener norefferer"
                  color="primary"
                  style={{
                    backgroundColor: "#fc5659",
                    borderRadius: 20,
                    padding: "6px 14px",
                  }}
                >
                  查看
                </Link>
              ) : (
                <ButtonBase
                  onClick={paymentClick}
                  size="small"
                  style={{
                    backgroundColor: "#fc5659",
                    borderRadius: 20,
                    color: "#fff",
                    padding: "6px 14px",
                  }}
                >
                  立即解锁
                </ButtonBase>
              )}
            </div>
          </Box>
        </Box>
        <br />

        <Box className="menuBox">
          <Title name="作者简介" />
          <Box className="content">
            {detail.author_info &&
              detail.author_info.map((o) => (
                <div key={o.name}>
                  <Typography gutterBottom noWrap>
                    {o.name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    gutterBottom
                  >
                    {o.introduction}
                  </Typography>
                  <br />
                </div>
              ))}
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
          <Box
            style={{
              height: 600,
              backgroundColor: "#d8d8d8",
              padding: 8,
              overflowY: "scroll",
            }}
          >
            <div style={{ margin: "auto", width: "800px" }}>
              <img
                src={`${detail.preview_path}`}
                width={800}
                alt={`${detail.preview_path}`}
              />
            </div>
          </Box>
        </Box>
        <br />
        <br />
        <SearchLoading loading={loading} />
      </div>
    </Fragment>
  );
}
