import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";
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
import GridCards from "../GridCards/GridCards";
import SearchLoading from "../Loading/SearchLoading";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import Container from "../Container/KeContainer";
import { getCreatorInfo } from "../../services/home";
import { getIdFromHref } from "../../services/utils";

const useStyles = makeStyles((theme) => ({
  authAvatar: {
    display: "grid",
    gridTemplateColumns: "66px 600px",
    gridTemplateRows: "repeat(4,1fr)",
    gap: "2px 20px",
  },
  subButton: {
    backgroundColor: "#fc5659",
    padding: "4px 6px",
    borderRadius: 4,
    color: "#fff",
  },
  mesButton: {
    backgroundColor: "#fdc44f",
    padding: "4px 6px",
    borderRadius: 4,
    color: "#fff",
  },
  pagination: {
    backgroundColor: "#fff",
  },
  pul: {
    justifyContent: "center",
  },
  panel: {
    minHeight: "60vh",
  },
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
    user_id,
  } = auth;

  return (
    <Container>
      <Grid container>
        <Grid item xs={9}>
          <div className={classes.authAvatar}>
            <div
              style={{
                gridColumn: 1,
                gridRow: "1/5",
              }}
            >
              <div
                style={{
                  padding: 10,
                  marginTop: -40,
                  borderRadius: 50,
                  height: 80,
                  width: 80,
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={headshot}
                  alt={user_name}
                  style={{ width: 66, height: 66 }}
                />
              </div>
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
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              {/* <Box display="flex" flexDirection="column" alignItems="center">
                    <span>订阅</span>
                    <span>{description_counts}</span>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                    <span>订阅者</span>
                    <span>{fans_counts}</span>
                    </Box> */}
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
              display: "none",
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
  const classes = useStyles();

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
      value: 0,
      listStack: [],
    };
  }

  componentDidMount() {
    const { cid } = getIdFromHref();
    if (cid) {
      this.fetchData(cid);
      this.setState({ cid });
    }
  }

  filterData = (val) => {
    const arr = [];
    this.state.listStack.map((o) => {
      if (val === 0) {
        arr.push(o);
      }
      if (o.type === "video" && val === 1) {
        arr.push(o);
      }
      if (o.type === "series" && val === 2) {
        arr.push(o);
      }
    });
    return arr;
  };

  handlePage = (event, page) => {
    const { value } = this.state;
    const arrfil = this.filterData(value).splice((page - 1) * 16, 16);
    this.setState({ list: arrfil });
  };

  fetchData = (id) => {
    this.setState({ loading: true });
    getCreatorInfo({ author_id: id }).then((data) => {
      this.setState({
        auth: data.auth,
        list: data.list.slice(0, 16),
        loading: false,
        listStack: data.list,
      });
    });
  };

  handleTabChange = (event, newValue) => {
    const arr = this.filterData(newValue).slice(0, 16);
    this.setState({ value: newValue, list: arr });
  };

  render() {
    const { auth, list, loading, value } = this.state;
    const { background } = auth;

    return (
      <Layout>
        <div className="Creator-container" style={{ width: "100%" }}>
          <Helmet title={`Creator | ${config.siteTitle}`} />
          <Container>
            <div>
              <div
                style={{
                  border: "1px solid #f2f2f5",
                  borderRadius: "12px",
                  overflow: "hidden",
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
                <div style={{ height: 158, paddingTop: 10 }}>
                  <CreatorAvatar auth={auth} />
                </div>
              </div>
              <br />

              <div style={{ minHeight: "60vh" }}>
                <Tabs onChange={this.handleTabChange} value={value}>
                  <Tab label="全部" />
                  <Tab label="视频" />
                  <Tab label="系列" />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <GridCards itemCount={16} loading={loading} items={list} />
                  <br />
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <GridCards itemCount={16} loading={loading} items={list} />
                  <br />
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <GridCards itemCount={16} loading={loading} items={list} />
                  <br />
                </TabPanel>
                <EmptyNotice empty={!(list.length || loading)} />
              </div>
              <Pagination num={list.length} handlePage={this.handlePage} />
              <br />
            </div>
          </Container>
          <SearchLoading loading={loading} />
        </div>
      </Layout>
    );
  }
}
