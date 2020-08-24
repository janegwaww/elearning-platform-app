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
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#232325",
  },
  toolbar: {
    minHeight: 0,
  },
  searchButton: {
    borderRadius: 50,
    height: 38,
  },
  scale: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const DocumentSearchAppBar = ({
  info = {},
  page = 1,
  show = true,
  handleClick,
  handleDownload,
  handleScale,
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

                <Box display="flex" alignItems="center">
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<SearchIcon />}
                    onClick={handleClick}
                    className={classes.searchButton}
                  >
                    <Typography noWrap component="div">
                      语义搜索
                    </Typography>
                  </Button>
                  <Box className={classes.scale}>
                    <IconButton onClick={() => handleScale(true)}>
                      <AddIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton onClick={() => handleScale(false)}>
                      <RemoveIcon style={{ color: "#fff" }} />
                    </IconButton>
                  </Box>
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
