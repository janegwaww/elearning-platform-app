import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { navigate } from "gatsby";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Footer from "../components/Footer/Footer";
import ScrollTop from "./ScrollTop";
import AvatarMenu from "./AvatarMenu";
import Container from "../components/Container/KeContainer";
import SearchAutoComplete from "../components/Search/SearchAutoComplete";
import config from "../../data/SiteConfig";
import theme from "./theme";
import { searchUrlParams, getIdFromHref } from "../services/utils";
import searchHistory from "../services/searchHistory";
import "./SearchLayoutStyles.sass";

const getHistory = searchHistory("kengineSearchHistory");
const text = "谁推导出洛伦兹变换";

const SearchLayout = ({ children }) => {
  const [input, setInput] = useState("");
  const [refInput, setRefInput] = useState("搜索知识...");
  const [placeholder, setPlaceholder] = useState("支持跨模态逐帧搜索...");
  const { q, page, type } = getIdFromHref();

  const handleSearch = () => {
    if (refInput) {
      navigate(searchUrlParams({ value: refInput }));
    }
  };

  useEffect(() => {
    if (q) {
      setInput(q);
      setRefInput(q);
      getHistory.add(q);
    } else {
      setPlaceholder(text);
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
        <div style={{ backgroundColor: "#2c2c3b" }} className="header-top">
          <Container>
            <div className="h-toolbar">
              <nav>
                <Link href="/">知擎首页</Link>
              </nav>
              <Box display="flex" ml={5} mr={3} color="#fff">
                <AvatarMenu />
              </Box>
              <Link href="/video/" underline="none" className="post-button">
                <Button size="small">
                  <Typography>投稿</Typography>
                </Button>
              </Link>
            </div>
          </Container>
        </div>

        <Container>
          <Toolbar>
            <Box className="search-input-bar">
              <SearchAutoComplete
                refInput={refInput}
                options={getHistory.values}
                onSearch={handleSearch}
                onChange={(v) => setRefInput(v)}
                onRemove={(v) => getHistory.remove(v)}
                placeholder={placeholder}
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
        {children(input, page, type)}
      </div>
      <ScrollTop />
      <Footer config={config} />
    </ThemeProvider>
  );
};

export default SearchLayout;
