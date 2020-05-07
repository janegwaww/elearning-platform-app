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



const Message = (props) => {
  // console.log(props);
    
  return (
    <Dialog open={props.parent.state.dialogOpen}>
      <DialogTitle>温馨提示</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.msg}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.parent.setState({ dialogOpen: false });
            window.location.href = __dirname + "users/login";
          }}
        >
          确定
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => {
            props.parent.setState({ dialogOpen: false });
          }}
        >
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Message;
