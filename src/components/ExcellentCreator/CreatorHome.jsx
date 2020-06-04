import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";
import HomeTab from "../Home/HomeTab";
import GridCards from "../Home/GridCards";
import { getCreatorInfo } from "../../services/home";

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
  }
}));

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
              <span>订阅</span>
              <span>订阅者</span>
              <span>获赞数</span>
              <span>播放量</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{description_counts}</span>
              <span>{fans_counts}</span>
              <span>{like_counts}</span>
              <span>{view_counts}</span>
            </div>
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: "8px 0"
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

export default class CreatorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      list: [],
      loading: true
    };
  }

  componentDidMount() {
    const {
      location: { state }
    } = this.props;
    const { cid } = state;
    this.fetchData(cid);
  }

  handlePage = (event, page) => {
    this.fetchData();
  };

  fetchData = id => {
    this.setState({ loading: true });
    getCreatorInfo({ author_id: id }).then(data => {
      this.setState({ auth: data.auth, list: data.list, loading: false });
    });
  };

  render() {
    const { auth, list, loading } = this.state;
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
              <HomeTab
                tabs={[
                  {
                    label: "上传的作品",
                    tabContent: () => (
                      <div style={{}}>
                        <GridCards
                          itemCount={16}
                          loading={loading}
                          items={list}
                        />
                        <br />
                        <Pagination
                          count={Math.ceil(list.length / 16)}
                          variant="outlined"
                          shape="rounded"
                          style={{ backgroundColor: "#fff" }}
                          onChange={this.handlePage}
                        />
                      </div>
                    )
                  }
                ]}
              />
            </div>
          </Container>
        </div>
      </Layout>
    );
  }
}
