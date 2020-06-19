import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { navigate } from "@reach/router";
// import { getObj } from "../../../assets/js/totls";
import { get_data } from "../../../../assets/js/request";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ModalDialog(props) {

  return (
    <Dialog open={props.info.open}>
      <DialogTitle>{props.info.title || "温馨提示"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.info.msg || "提示内容"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
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
          onClick={() => {
            props.onEvent &&
              props.onEvent({
                cancel: false,
                confirm: true,
              });
          }}
        >
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
