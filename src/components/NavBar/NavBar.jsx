import React from "react";
import { navigate } from "gatsby";
import SearchIcon from "@material-ui/icons/Search";
import {
  Toolbar,
  InputBase,
  Typography,
  AppBar,
  Button,
  InputAdornment,
  Link,
  ButtonBase,
  Tooltip,
} from "@material-ui/core";
import AvatarMenu from "../../layout/AvatarMenu";
import Container from "../Container/KeContainer";
import logo from "../../../static/logos/logo.svg";
import useStyles from "./NavBarStyles";
import { searchUrlParams } from "../../services/utils";

const placeholder = "谁推导出洛伦兹变换";

const PrimarySearchAppBar = () => {
  const classes = useStyles();

  const handleSearchClick = () => {
    const { value } = document.getElementById("navbar-search-input");
    if (value) {
      navigate(searchUrlParams({ value }));
    } else {
      navigate(searchUrlParams({ value: placeholder }));
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Container>
          <Toolbar className={classes.toolbar}>
            <Link href="/" className={classes.logoLink}>
              <img src={logo} alt="logo" />
            </Link>
            <div className={classes.menus}>
              <Link
                href="/"
                color="inherit"
                underline="none"
                style={{ padding: "6px 8px" }}
              >
                <Typography noWrap component="div">
                  知擎首页
                </Typography>
              </Link>
              <Link
                color="inherit"
                href="/joinedscholar/"
                underline="none"
                target="_blank"
                rel="noopener norefferer"
                style={{ padding: "6px 8px", display: "none" }}
              >
                <Typography noWrap component="div">
                  加盟学者
                </Typography>
              </Link>
              <Tooltip title="敬请期待..." placement="bottom-start">
                <div>
                  <ButtonBase disabled>
                    <Typography noWrap color="textSecondary">
                      加盟学者
                    </Typography>
                  </ButtonBase>
                </div>
              </Tooltip>
            </div>
            <div className={classes.search}>
              <InputBase
                placeholder={placeholder}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onKeyDown={handleEnter}
                id="navbar-search-input"
                endAdornment={
                  <InputAdornment>
                    <Button
                      className={classes.searchButton}
                      startIcon={<SearchIcon />}
                      onClick={handleSearchClick}
                    >
                      跨模态
                    </Button>
                  </InputAdornment>
                }
              />
              <Button
                className={classes.searchButtonAlone}
                startIcon={<SearchIcon />}
                onClick={() => navigate("/search/")}
              >
                跨模态
              </Button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <div style={{ flexGrow: 1 }} />
              <AvatarMenu />
            </div>
            <div>
              <Button
                className={classes.createButton}
                onClick={() => navigate("/video/")}
              >
                <Typography>投稿</Typography>
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default PrimarySearchAppBar;
