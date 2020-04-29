import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Iframe from "react-iframe";
import urlParse from "url-parse";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    zIndex: theme.zIndex.modal,
    backgroundColor: "white",
    border: "none"
  }
}));

const ThirdIframe = ({ url = "", handleCode }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const showIframe = () => setShow(true);
  const closeIframe = () => setShow(false);
  const getCode = () => urlParse(currentUrl, true).query.code || "";

  useEffect(() => {
    if (url) {
      showIframe();
    }
    console.log(show, url, getCode(), currentUrl);
    if (show && url && getCode()) {
      closeIframe();
      handleCode(getCode());
    }
  }, [url, currentUrl]);

  return show ? (
    <Iframe
      url={url}
      id="third-party-login"
      display={show}
      className={classes.root}
      allowFullScreen="true"
      onLoad={e => alert(e.currentTarget.src)}
    />
  ) : null;
};

export default ThirdIframe;
