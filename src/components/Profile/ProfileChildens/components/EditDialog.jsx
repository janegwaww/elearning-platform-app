//编辑系列 编辑描述
import React, { useRef, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import userStyles from "./profileStyle";
import { updata_img, get_data } from "../../../../assets/js/request";
import CustomModal from "../../../../assets/js/CustomModal";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: "center",
  },
}))(MuiDialogActions);

export default function EditDialog(props) {
  const classes = userStyles();
  const { children } = props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        {props.icon_img ? (
          <div className="text-center">
            <img src={props.icon_img} />
          </div>
        ) : null}
        <div>{props.title}</div>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          {children}
          <input
            type="file"
            id="file-img"
            onChange={(ev) => {
              let _files = ev.target.files[0];
              updata_img(_files, "video_image").then((res) => {
                if (res.err == 0 && res.errmsg == "OK") {
                  props.onChange && props.onChange({ url: res.result_data[0] });
                }
              });
            }}
            style={{ width: 0, height: 0, display: "none" }}
          />
        </DialogContent>
        {props.btn != "no_show" && (
          <DialogActions>
            <Button
              autoFocus
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose(e);
                props.onEvent &&
                  props.onEvent({
                    confirm: true,
                    cancel: false,
                  });
              }}
              color="primary"
              className={classes.btn1}
            >
              确定
            </Button>
            <Button
              autoFocus
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose(e);
                props.onEvent &&
                  props.onEvent({
                    confirm: false,
                    cancel: true,
                  });
              }}
              className={`${classes.btn1} ${classes.btn2}`}
            >
              取消
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
