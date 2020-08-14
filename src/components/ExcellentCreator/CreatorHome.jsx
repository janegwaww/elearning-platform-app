import React, { Component, useState } from "react";
import Helmet from "react-helmet";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";
import GridCards from "../GridCards/GridCards";
import ProgressBar from "../Loading/ProgressBar";
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import Container from "../Container/KeContainer";
import CreatorAvatar from "./CreatorHomeHeader";
import withId from "../EmptyNotice/withId";
import { getCreatorInfo, creatorHomeSearch } from "../../services/home";

const useStyles = makeStyles((theme) => ({
  pagination: {
    backgroundColor: "#fff",
  },
  pul: {
    justifyContent: "center",
  },
  panel: {
    minHeight: "60vh",
  },
  inputInput: {
    backgroundColor: "#f2f2f5",
    borderRadius: "50px 0 0 50px",
    paddingLeft: "1em",
    "&::placeholder": {
      fontSize: "0.875rem",
    },
  },
  searchButton: {
    backgroundColor: "#007cff",
    borderRadius: "0 50px 50px 0",
    padding: "4px 8px",
    minWidth: "50px",
    "&:hover": {
      backgroundColor: "#007cff",
    },
  },
  headImg: {
    height: 300,
    [theme.breakpoints.down("md")]: {
      height: 150,
    },
  },
  creatorHeader: {
    border: "1px solid #f2f2f5",
    borderRadius: "12px",
    overflow: "hidden",
  },
}));

const TTab = withStyles((theme) => ({
  root: {
    minWidth: 40,
    padding: "6px 0px",
    color: "#42415a",
    marginRight: 40,
    opacity: 1,
    borderRadius: 20,
    "&$selected": {
      color: "#007cff",
    },
  },
  selected: {
    color: "#007cff",
  },
}))((props) => <Tab disableRipple {...props} />);

const Pagination = ({ num = 0, handlePage }) => {
  const classes = useStyles();
  return num === 0 ? null : (
    <MuiPagination
      count={Math.ceil(num / 16)}
      variant="outlined"
      shape="rounded"
      onChange={handlePage}
      classes={{ root: classes.pagination, ul: classes.pul }}
    />
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

const SearchInput = ({ handleSearchClick, handleEnter }) => {
  const classes = useStyles();
  return (
    <InputBase
      id="creatorhome_local_search_input"
      placeholder="搜索他的视频"
      type="search"
      classes={{ input: classes.inputInput }}
      onKeyDown={handleEnter}
      endAdornment={
        <InputAdornment>
          <Button
            onClick={() => handleSearchClick()}
            className={classes.searchButton}
          >
            <SearchIcon color="primary" />
          </Button>
        </InputAdornment>
      }
    />
  );
};

const HeadBanner = ({ auth = {} }) => {
  const classes = useStyles();
  const { background } = auth;
  return background ? (
    <div className={classes.creatorHeader}>
      <div className={classes.headImg}>
        <img src={background} height="100%" width="100%" alt={auth.user_name} />
      </div>
      <div style={{ height: 158, paddingTop: 10 }}>
        <CreatorAvatar auth={auth} />
      </div>
    </div>
  ) : null;
};

class CreatorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      list: [],
      loading: true,
      cid: "",
      value: 0,
      listStack: [],
      pageCount: 1,
      isSearch: false,
    };
  }

  componentDidMount() {
    const cid = this.props.id;
    if (cid) {
      this.fetchData(cid);
      this.setState({ cid });
    }
  }

  filterData = (val) => {
    const arr = [];
    this.state.listStack.map((o) => {
      /* if (val === 0) {
       *   arr.push(o);
       * } */
      if (o.type === "video" && val === 0) {
        arr.push(o);
      }
      if (o.type === "series" && val === 1) {
        arr.push(o);
      }
    });
    return arr;
  };

  handlePage = (event, page) => {
    const { value, isSearch } = this.state;
    if (isSearch) {
      this.handleSearchClick(page);
    } else {
      const arrfil = this.filterData(value).slice((page - 1) * 16, page * 16);
      this.setState({ list: arrfil });
    }
  };

  fetchData = (id) => {
    this.setState({ loading: true });
    getCreatorInfo({ author_id: id }).then((data) => {
      this.setState({
        auth: data.auth,
        list: data.list.slice(0, 16),
        loading: false,
        listStack: data.list,
        pageCount: data.list.filter((o) => o.type === "video").length,
      });
    });
  };

  fetchSearchData = (page = 1) => {
    const { cid, value, inputValue } = this.state;
    const type = ["video", "series"][value];
    this.setState({ loading: true });
    creatorHomeSearch({
      query_string: inputValue,
      author_id: cid,
      type,
      max_size: 999,
      page,
    }).then((data) => {
      this.setState({
        loading: false,
        list: data,
        pageCount: data.length,
        isSearch: true,
      });
    });
  };

  handleTabChange = (event, newValue) => {
    if (this.state.isSearch) {
      this.setState({ value: newValue }, () => this.fetchSearchData());
      return;
    }
    const arr = this.filterData(newValue);
    this.setState({
      value: newValue,
      list: arr.slice(0, 16),
      pageCount: arr.length,
    });
  };

  handleSearchClick = (page = 1) => {
    const { value } = document.getElementById("creatorhome_local_search_input");
    if (value) {
      this.setState({ inputValue: value }, () => this.fetchSearchData(page));
    } else {
      this.setState({ inputValue: "", isSearch: false });
    }
  };

  handleEnter = (e) => {
    if (e.key === "Enter") {
      this.handleSearchClick();
    }
  };

  render() {
    const { auth, list, loading, value, pageCount } = this.state;
    const { background } = auth;

    return (
      <Layout>
        <div className="Creator-container" style={{ width: "100%" }}>
          <Helmet title={`Creator | ${config.siteTitle}`} />
          <Container>
            <div>
              <HeadBanner auth={auth} />
              <br />

              <div style={{ minHeight: "60vh" }}>
                <Box display="flex" justifyContent="space-between">
                  <Tabs onChange={this.handleTabChange} value={value}>
                    <TTab label="视频" />
                    <TTab label="系列" />
                  </Tabs>
                  <SearchInput
                    handleSearchClick={this.handleSearchClick}
                    handleEnter={this.handleEnter}
                  />
                </Box>

                <TabPanel value={value} index={0}>
                  <GridCards itemCount={16} loading={loading} items={list} />
                  <br />
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <GridCards itemCount={16} loading={loading} items={list} />
                  <br />
                </TabPanel>
                <EmptyNotice
                  empty={!(list.length || loading)}
                  type="noResult"
                  handleFresh={() => this.handleTabChange({}, 0)}
                />
              </div>
              <Pagination num={pageCount} handlePage={this.handlePage} />
              <br />
            </div>
          </Container>
          <ProgressBar loading={loading} />
        </div>
      </Layout>
    );
  }
}

export default withId(CreatorHome);
