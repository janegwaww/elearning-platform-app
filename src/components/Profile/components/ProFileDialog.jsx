import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle,DialogActions} from "../../../assets/template/MuiDialogTitle";
import {DialogContent} from '../../../assets/template/DialogContent';
import Typography from "@material-ui/core/Typography";
import userStyles from "./profileStyle";
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
