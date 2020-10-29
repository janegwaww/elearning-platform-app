import React from "react";
import {
  Dialog,
  Button,
  
  DialogContent,
  DialogContentText,
  DialogActions,

} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import {DialogTitle} from '../../../assets/template/MuiDialogTitle';

import userStyles from "./profileStyle";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export function ModalDialog(props) {
  const classes=userStyles();
  const { children } = props;

 
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
        {children?children:(
        <DialogContentText >{props.info.msg || "提示内容"}</DialogContentText>
        )}
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
