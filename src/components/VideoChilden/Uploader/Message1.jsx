import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";


const Message1 = (props) => {
    return (
      <Dialog open={true}>
        <DialogTitle>温馨提示</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.msg}</DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };
  export default Message1;