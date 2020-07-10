import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import QRCode from "qrcode.react";
import { userShare } from "../../services/video";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover({ children }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [url, setUrl] = useState("");

  const fetchUrl = ({ type }, callback) => {
    userShare({
      url: "http://kengine.haetek.com/watch/vid=",
      title: "share",
      pics: "http://example.com",
      summary: "http://example.com",
      desc: "share",
      type,
      source: "video",
      share_id: "7938feeef6a037e5c0c4497fb531cb56",
    }).then((data) => {
      callback(data);
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (!url) {
      fetchUrl({ type: "wechat" }, (u) => setUrl(u));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = (type) => {
    fetchUrl({ type }, (u) => {
      window.open(u);
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div>{children(handleClick)}</div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Paper className={classes.paper}>
          <div>
            <IconButton>微信</IconButton>
            <IconButton onClick={() => handleShare("microblog")}>
              微博
            </IconButton>
            <IconButton onClick={() => handleShare("qZone")}>QQ空间</IconButton>
            <IconButton onClick={() => handleShare("qq")}>QQ</IconButton>
          </div>
          <div style={{ textAlign: "center" }}>
            {!!url && <QRCode value={url} level="L" size={160} />}
          </div>
        </Paper>
      </Popover>
    </div>
  );
}
