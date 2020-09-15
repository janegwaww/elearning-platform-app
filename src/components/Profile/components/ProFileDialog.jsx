import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import MuiDialogContent from "@material-ui/core/DialogContent";
import {DialogTitle} from "../../../assets/template/MuiDialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";

import Typography from "@material-ui/core/Typography";
import userStyles from "./profileStyle";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const classes = userStyles();
  const [open, setOpen] = React.useState(false);

  const confirmClick = () => {
    props.onEvent({ cancel: false, confirm: true, login: props.info.login });
  };
  const handleClose = () => {
    props.onEvent({ cancel: true, confirm: false });
  };

  return (
    <div>
      {/*<Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.btn1}>
         解除绑定
  </Button>*/}
      <Dialog
        onClose={handleClose}
     
        open={props.info.isOpen}
      >
        <DialogTitle  onClose={handleClose}>
          {props.info.dialogtitle}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className="text-center">
            {props.info.dialogmsg}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={confirmClick} className={classes.btn1}>
            确定
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            className={`${classes.btn1} ${classes.btn2}`}
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
