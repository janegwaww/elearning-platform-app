import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import HelpIcon from "@material-ui/icons/Help";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import download from "downloadjs";
import SearchLoading from "../Loading/SearchLoading";
import { getRelateDocs, downloadDocs } from "../../services/video";
import { secondsToDate } from "../../services/utils";

export default function FileViewButton({ vid = "" }) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFileList = (id = "") => {
    setLoading(true);
    getRelateDocs({ video_id: id }).then((data) => {
      setList(data);
      setLoading(false);
    });
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleClickOpen = () => {
    setOpen(true);
    if (!list.length) {
      fetchFileList();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloads = () => {
    list.map((o, i) => {
      if (o.file_id === checked[i]) {
        /* const anchor = document.createElement("a");
         * anchor.href = o.file_path;
         * anchor.target = "_blank";
         * anchor.download = o.file_name;
         * anchor.click(); */
        download(`${o.file_path}`);
      }
    });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          color="secondary"
          style={{
            backgroundColor: "#fc5659",
            borderRadius: "27px",
            boxShadow: "none",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#fc5659",
            },
          }}
        >
          <Typography variant="body2">视频附件下载</Typography>
        </Button>
        <Tooltip title="视频附件内容">
          <HelpIcon style={{ color: "#fc5659", fontSize: 18, margin: 4 }} />
        </Tooltip>
      </div>
      <Dialog
        open={!loading && open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            style={{
              position: "absolute",
              right: "8px",
              top: "8px",
              color: "#bdc3c7",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography align="center" variant="body1">
            本课课件下载内容
          </Typography>
          {list.length ? (
            <List style={{ width: "100%", minWidth: 360 }}>
              {list.map((obj) => {
                const labelId = `checkbox-list-label-${obj.file_id}`;
                return (
                  <ListItem
                    key={obj.file_id}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(obj.file_id)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(obj.file_id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${obj.file_name}`} />
                    <ListItemSecondaryAction>
                      <Typography edge="end" variant="caption">
                        {`${secondsToDate(obj.time)}`}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography variant="h5">本课程没有附件内容...</Typography>
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleDownloads}
            disabled={!checked.length}
            variant="contained"
            color="secondary"
            type="submit"
            style={{ borderRadius: "27px 27px 27px 27px", width: "30%" }}
          >
            下载
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{ borderRadius: "27px 27px 27px 27px", width: "30%" }}
          >
            关闭
          </Button>
        </DialogActions>
      </Dialog>
      <SearchLoading loading={loading} />
    </div>
  );
}
