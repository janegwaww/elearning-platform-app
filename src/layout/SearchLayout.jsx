import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import Footer from "../components/Footer/Footer";
import ScrollTop from "./ScrollTop";
import config from "../../data/SiteConfig";
import theme from "./theme";

export default function SearchLayout({ children, searchValue }) {
  const [input, setInput] = useState("");
  const [refInput, setRefInput] = useState("");

  const handleSearch = e => {
    const { value } = document.getElementById("search-page-input");
    setInput(value);
  };

  useEffect(() => {
    if (searchValue) {
      setRefInput(searchValue);
      setInput(searchValue);
    }
  }, [, searchValue]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit">
        <div
          style={{ backgroundColor: "#2c2c3b", height: 36 }}
          id="back-to-top-anchor"
        >
          <Container>
            <nav>
              <Link to="/">知擎首页</Link>
              <Link to="/channel">频道</Link>
              <Link to="/mysubscription">订阅</Link>
              <Link to="#">下载APP</Link>
            </nav>
          </Container>
        </div>

        <Container>
          <Toolbar>
            <InputBase
              value={refInput}
              id="search-page-input"
              type="text"
              onChange={e => setRefInput(e.target.value)}
              style={{ backgroundColor: "#ddd" }}
            />
            <div onClick={handleSearch}>搜索</div>
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
