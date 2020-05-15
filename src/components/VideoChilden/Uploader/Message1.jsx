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


const Message1 = (props)=> {

    return (
      <Dialog open={props.open}>
        <DialogTitle>{props.msg.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.msg.msg}</DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };
  export default Message1