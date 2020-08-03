import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchLoading from "../Loading/SearchLoading";
import ShopBar from "./ShopBar";
import withId from "../EmptyNotice/withId";
import LineText from "./LineText";
import ImageModel from "./ImageModel";
import { getDocumentDetail } from "../../services/video";
import { secondsToDate } from "../../services/utils";
import "./DocumentStyles.sass";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  list: {
    '& .MuiExpansionPanelSummary-content':{
      flexGrow:'inherit'
    }
  }});
const Title = ({ name }) => (
  <div className="title">
    <Typography>{name}</Typography>
    <div className="divider" />
  </div>
);

const Document = ({ id = "" }) => {
  const cles = useStyles();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [did, setDid] = useState("");

  const fetchDocumentInfo = (_id) => {
    setLoading(true);
    getDocumentDetail({ file_id: _id }).then((data) => {
      setDetail(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    setDid(id);
    fetchDocumentInfo(id);
  }, []);

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
//此页面的rem 是2020/8/3更改，即为1920宽屏上的实际尺寸/16,1rem为：16/1920*当前屏宽
  return (
    <>
      <div className="document-component">
        <div style={{ marginBottom: '2.5rem' }} />
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
            <div style={{width:'100%'}}>
              {detail.catalogue &&
                detail.catalogue.map((o, i) => (
                  <MuiExpansionPanel square key={i} className="expansionpanel">
                    <MuiExpansionPanelSummary
                      aria-controls={`panel${i + 1}d-content`}
                      id={`panel${i + 1}d-header`}
                      expandIcon={<ExpandMoreIcon />}
                      className={`expansionpanelsummary ${cles.list}`}
                      style={{width:'100%'}}
                    >
                      <LineText
                        name={`第${i + 1}章`}
                        content={`${Object.keys(o)[0]}`}
                        mb={0}
                      /> 
                    </MuiExpansionPanelSummary>
                    <MuiExpansionPanelDetails className="expansionpaneldetails">
                      <div style={{ paddingLeft:'11.375rem' }}>
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
            <div style={{ minWidth: '6.5625rem' }} />
            <div style = {{width:'calc(100% - 6.5625rem)'}}>
            <ImageModel path={detail.preview_path} />
            </div>
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

export default withId(Document);
