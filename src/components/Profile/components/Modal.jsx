import React from "react";
import {
  Dialog,
  Button,
  
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { navigate } from "@reach/router";
// import { getObj } from "../../../assets/js/totls";
// import { get_data } from "../../../../assets/js/request";
import userStyles from "./profileStyle";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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

export function ModalDialog(props) {
  const classes=userStyles();


  // const [open, setOpen] =React.useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.onEvent &&
    props.onEvent({
      cancel: true,
      confirm: false,
    });
  };
  return (
    <Dialog open={props.info.open} className={classes.dialog}>
      <DialogTitle  onClose={handleClose}>{props.info.title || "温馨提示"}</DialogTitle>
      <DialogContent>
        <DialogContentText >{props.info.msg || "提示内容"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
        className={`${classes.btn1} ${classes.btn2}`}
          onClick={() => {
            props.onEvent &&
              props.onEvent({
                cancel: true,
                confirm: false,
              });
          }}
        >
          取消
        </Button>
        <Button
        className={classes.btn1}
          onClick={() => {
            props.onEvent &&
              props.onEvent({
                cancel: false,
                confirm: true,
                role:props.info.role||''
              });
          }}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
