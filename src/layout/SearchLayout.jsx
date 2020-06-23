import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import Footer from "../components/Footer/Footer";
import ScrollTop from "./ScrollTop";
import config from "../../data/SiteConfig";
import theme from "./theme";
import { isLoggedIn, logout, getUser } from "../services/auth";
import "./SearchLayoutStyles.sass";

export default function SearchLayout({ children, searchValue }) {
  const [input, setInput] = useState("");
  const [refInput, setRefInput] = useState("");
  const { headshot, name } = getUser();
  const isLogin = isLoggedIn();

  const handleSearch = e => {
    const { value } = document.getElementById("search-page-input");
    value && setInput(value);
  };

  useEffect(() => {
    if (searchValue) {
      setRefInput(searchValue);
      setInput(searchValue);
    }
  }, [searchValue]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit" className="search-layout-bar">
        <div style={{ backgroundColor: "#2c2c3b" }} id="back-to-top-anchor">
          <Container>
            <div className="h-toolbar">
              <nav>
                <Link href="/">
                  知擎首页
                </Link>
                <Link href="/channel/?ch=maths">
                  频道
                </Link>
                <Link href="/excellentcreator/">
                  优秀创作者
                </Link>
                <Link href="#">
                  下载APP
                </Link>
              </nav>
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon color="primary" />
              </Badge>
              <Box display="flex" ml={2.5}>
                {isLogin ? (
                  <Avatar
                    src={headshot}
                    alt={name}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <AccountCircle color="primary" />
                )}
              </Box>
              <Link href="/video/" underline="none">
                <Button
                  size="small"
                  style={{
                    borderRadius: "20px",
                    marginLeft: "20px",
                    backgroundColor: "#007cff",
                    color: "#fff"
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
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              className="search-input-bar"
            >
              <InputBase
                value={refInput}
                placeholder="搜索知识..."
                id="search-page-input"
                type="text"
                onChange={e => setRefInput(e.target.value)}
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="layout-container">
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        {children(input)}
      </div>
      <ScrollTop />
      <Footer config={config} />
    </ThemeProvider>
  );
}
