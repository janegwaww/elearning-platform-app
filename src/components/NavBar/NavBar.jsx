import React from "react";
import { navigate } from "gatsby";
import SearchIcon from "@material-ui/icons/Search";
/* import NotificationsIcon from "@material-ui/icons/Notifications"; */
/* import MoreIcon from "@material-ui/icons/MoreVert"; */
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
  /* Menu,
   * MenuItem,
   * Badge,
   * IconButton,
   * Box, */
} from "@material-ui/core";
import AvatarMenu from "../../layout/AvatarMenu";
import Container from "../Container/KeContainer";
import logo from "../../../static/logos/logo.svg";
import useStyles from "./NavBarStyles";
import { searchUrlParams } from "../../services/utils";
import ContributeMenu from "../../layout/ContributeMenu";

const placeholder = "谁推导出洛伦兹变换";

const PrimarySearchAppBar = () => {
  const classes = useStyles();
  /* const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null); */
  /* const isMobileMenuOpen = Boolean(mobileMoreAnchorEl); */

  /* const handleMobileMenuClose = () => {
   *   setMobileMoreAnchorEl(null);
   * }; */

  /* const handleMobileMenuOpen = event => {
   *   setMobileMoreAnchorEl(event.currentTarget);
   * }; */

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

  /* const mobileMenuId = "primary-search-account-menu-mobile";
   * const renderMobileMenu = (
   *   <Menu
   *     anchorEl={mobileMoreAnchorEl}
   *     anchorOrigin={{ vertical: "top", horizontal: "right" }}
   *     id={mobileMenuId}
   *     keepMounted
   *     transformOrigin={{ vertical: "top", horizontal: "right" }}
   *     open={isMobileMenuOpen}
   *     onClose={handleMobileMenuClose}
   *     classes={{ list: classes.list }}
   *   >
   *     <MenuItem>
   *       <ButtonBase color="inherit" onClick={() => navigate("/")}>
   *         <Typography>知擎首页</Typography>
   *       </ButtonBase>
   *     </MenuItem>
   *     <MenuItem>
   *       <ButtonBase disabled onClick={() => navigate("/joinscholar/")}>
   *         <Typography color="textSecondary">加盟学者</Typography>
   *       </ButtonBase>
   *     </MenuItem>
   *     <MenuItem>
   *       <IconButton aria-label="show 11 new notifications" color="inherit">
   *         <Badge badgeContent={11} color="secondary">
   *           <NotificationsIcon />
   *         </Badge>
   *       </IconButton>
   *     </MenuItem>
   *     <MenuItem>
   *       <Box display="flex" justifyContent="center" width="100%">
   *         <AvatarMenu />
   *       </Box>
   *     </MenuItem>
   *   </Menu>
   * ); */

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
              <ContributeMenu />
            </div>
            <div>
            <ContributeMenu title='知擎杯'/>
           
          </div>
            {/* <div className={classes.sectionMobile}>
                          <IconButton
                          aria-label="show more"
                          aria-controls={mobileMenuId}
                          aria-haspopup="true"
                          onClick={handleMobileMenuOpen}
                          color="inherit"
                          >
                          <MoreIcon />
                          </IconButton>
                          </div> */}
          </Toolbar>
        </Container>
      </AppBar>
      {/* {renderMobileMenu} */}
    </div>
  );
};

export default PrimarySearchAppBar;
