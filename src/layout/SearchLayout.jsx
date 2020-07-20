import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { navigate } from "gatsby";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Footer from "../components/Footer/Footer";
import ScrollTop from "./ScrollTop";
import AvatarMenu from "./AvatarMenu";
import Container from "../components/Container/KeContainer";
import config from "../../data/SiteConfig";
import theme from "./theme";
import { searchUrlParams, getIdFromHref } from "../services/utils";
import searchHistory from "../services/searchHistory";
import "./SearchLayoutStyles.sass";

const getHistory = searchHistory("kengineSearchHistory");

const SearchLayout = ({ children }) => {
  const [input, setInput] = useState("");
  const [refInput, setRefInput] = useState("搜索知识...");
  const { q } = getIdFromHref();

  const handleSearch = () => {
    if (refInput) {
      navigate(searchUrlParams(refInput));
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleSearch();
    }
  };

  useEffect(() => {
    if (q) {
      setInput(q);
      setRefInput(q);
      getHistory.add(q);
    }
  }, [q]);

  useEffect(() => {
    return () => {
      getHistory.save();
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <span id="back-to-top-anchor" style={{ height: 0, width: 0 }} />
      <AppBar position="fixed" color="inherit" className="search-layout-bar">
        <div style={{ backgroundColor: "#2c2c3b" }} id="back-to-top-anchor">
          <Container>
            <div className="h-toolbar">
              <nav>
                <Link href="/">知擎首页</Link>
                <Link href="/">下载APP</Link>
              </nav>
              {/* <Badge badgeContent={17} color="secondary">
                <NotificationsIcon color="primary" />
              </Badge> */}
              <Box display="flex" ml={5} mr={3} color="#fff">
                <AvatarMenu />
              </Box>
              <Link href="/video/" underline="none">
                <Button
                  size="small"
                  style={{
                    borderRadius: "20px",
                    marginLeft: "20px",
                    backgroundColor: "#007cff",
                    color: "#fff",
                  }}
                >
                  <Typography>投稿</Typography>
                </Button>
              </Link>
            </div>
          </Container>
        </div>

        <Container>
          <Toolbar>
            <Box className="search-input-bar">
              <Autocomplete
                freeSolo
                selectOnFocus
                handleHomeEndKeys
                clearOnBlur
                options={getHistory.values()}
                inputValue={refInput}
                onInputChange={(event, newInputValue) => {
                  setRefInput(newInputValue);
                }}
                renderInput={(params) => (
                  <InputBase
                    placeholder="支持跨模态逐帧搜索..."
                    id="search-page-input"
                    type="search"
                    inputProps={{ ...params.inputProps }}
                    ref={params.InputProps.ref}
                    onKeyDown={handleEnter}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          startIcon={<SearchIcon />}
                          className="search-bar-button"
                          onClick={handleSearch}
                        >
                          搜索
                        </Button>
                      </InputAdornment>
                    }
                  />
                )}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="search-layout-container">
        <Helmet title={`Search | ${config.siteTitle}`}>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        {children(input)}
      </div>
      <ScrollTop />
      <Footer config={config} />
    </ThemeProvider>
  );
};

export default SearchLayout;
