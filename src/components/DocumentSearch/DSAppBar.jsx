import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#232325",
  },
  toolbar: {
    minHeight: 0,
  },
  searchButton: {
    borderRadius: 50,
  },
});

const DocumentSearchAppBar = ({
  info = {},
  page = 1,
  show = true,
  handleClick,
  handleDownload,
}) => {
  const classes = useStyles();
  const { file_name = "标题", image_list = [] } = info;

  return (
    <>
      <Slide appear={false} direction="down" in={show}>
        <AppBar classes={{ root: classes.root }}>
          <Toolbar>
            <Container fixed>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography noWrap>{file_name}</Typography>
                <Typography
                  noWrap
                >{`${page} / ${image_list.length}`}</Typography>
                <Box display="flex">
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<SearchIcon />}
                    onClick={handleClick}
                    className={classes.searchButton}
                  >
                    <Typography variant="body2" noWrap>
                      语义搜索
                    </Typography>
                  </Button>
                  <IconButton onClick={handleDownload}>
                    <GetAppIcon style={{ color: "#fff" }} />
                  </IconButton>
                </Box>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
      </Slide>
      <Slide appear={false} derection="down" in={show}>
        <Toolbar className={show ? "" : classes.toolbar} />
      </Slide>
    </>
  );
};

export default DocumentSearchAppBar;
