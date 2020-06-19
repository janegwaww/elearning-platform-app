import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";
import HomeTab from "../Home/HomeTab";
import GridCards from "../Home/GridCards";
import SearchLoading from "../Loading/SearchLoading";
import { getCreatorInfo } from "../../services/home";
import { getIdFromHref } from "../../services/utils";

const useStyles = makeStyles(theme => ({
  authAvatar: {
    display: "grid",
    gridTemplateColumns: "66px 600px",
    gridTemplateRows: "repeat(4,1fr)",
    gap: "2px 10px"
  },
  subButton: {
    backgroundColor: "#fc5659",
    padding: "4px 6px",
    borderRadius: 4,
    color: "#fff"
  },
  mesButton: {
    backgroundColor: "#fdc44f",
    padding: "4px 6px",
    borderRadius: 4,
    color: "#fff"
  },
  pagination: {
    backgroundColor: "#fff"
  },
  pul: {
    justifyContent: "center"
  }
}));

const Pagination = ({ num, handlePage }) => {
  const classes = useStyles();
  return (
    <MuiPagination
      count={Math.ceil(num / 16)}
      variant="outlined"
      shape="rounded"
      onChange={handlePage}
      classes={{ root: classes.pagination, ul: classes.pul }}
    />
  );
};

const CreatorAvatar = ({ auth }) => {
  const classes = useStyles();
  const {
    background,
    user_name,
    headshot,
    introduction,
    description_counts = 0,
    fans_counts = 0,
    like_counts = 0,
    view_counts = 0,
    user_id
  } = auth;

  return (
    <Container>
      <Grid container>
        <Grid item xs={9}>
          <div className={classes.authAvatar}>
            <div style={{ gridColumn: 1, gridRow: "1/5" }}>
              <Avatar
                src={headshot}
                alt={user_name}
                style={{ width: 66, height: 66 }}
              />
            </div>
            <Typography variant="body2">{user_name}</Typography>
            <Typography
              variant="caption"
              color="textSecondary"
            >{`ID: ${user_id}`}</Typography>
            <div style={{ gridRow: "3/5" }}>
              <Typography variant="subtitle1" color="textSecondary">
                {introduction}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <span>订阅</span>
                <span>{description_counts}</span>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <span>订阅者</span>
                <span>{fans_counts}</span>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <span>获赞数</span>
                <span>{like_counts}</span>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <span>播放量</span>
                <span>{view_counts}</span>
              </Box>
            </div>
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: "8px 0",
              display: "none"
            }}
          >
            <ButtonBase className={classes.subButton}>+订阅</ButtonBase>
            <ButtonBase className={classes.mesButton}>发消息</ButtonBase>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default class CreatorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      list: [],
      loading: true,
      cid: "",
      value: 0
    };
  }

  componentDidMount() {
    const { cid } = getIdFromHref();
    if (cid) {
      this.fetchData(cid);
      this.setState({ cid });
    }
  }

  handlePage = (event, page) => {
    this.fetchData(this.state.cid);
  };

  fetchData = id => {
    this.setState({ loading: true });
    getCreatorInfo({ author_id: id }).then(data => {
      this.setState({ auth: data.auth, list: data.list, loading: false });
    });
  };

  handleTabChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { auth, list, loading, value } = this.state;
    const { background } = auth;

    return (
      <Layout>
        <div className="Creator-container" style={{ width: "100%" }}>
          <Helmet title={`Creator | ${config.siteTitle}`} />
          <Container fixed>
            <div>
              <div
                style={{
                  border: "1px solid #f2f2f5",
                  borderRadius: "12px",
                  overflow: "hidden"
                }}
              >
                <div>
                  <img
                    src={background}
                    height={300}
                    width="100%"
                    alt={background}
                  />
                </div>
                <div style={{ height: 158 }}>
                  <CreatorAvatar auth={auth} />
                </div>
              </div>
              <br />

              <div>
                <Tabs onChange={this.handleTabChange} value={value}>
                  <Tab label="全部" />
                  <Tab label="视频" />
                  <Tab label="系列" />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <GridCards itemCount={16} loading={loading} items={list} />
                  <br />
                  <Pagination num={list.length} hanlePage={this.hanlePage} />
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <GridCards itemCount={16} loading={loading} items={list} />
                  <br />
                  <Pagination num={list.length} handlePage={this.handlePage} />
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <GridCards itemCount={16} loading={loading} items={list} />
                  <br />
                  <Pagination num={list.length} hanlePage={this.handlePage} />
                </TabPanel>
              </div>
            </div>
          </Container>
          <SearchLoading loading={loading} />
        </div>
      </Layout>
    );
  }
}
