import React from "react";
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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: 0, // theme.spacing(1),
    top: 0, // theme.spacing(1),
    color: theme.palette.grey[500],
    padding: theme.spacing(1),
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
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const classes = userStyles();
  const [open, setOpen] = React.useState(false);

  const confirmClick = () => {
    props.onEvent({ cancel: false, confirm: true });
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
        aria-labelledby="customized-dialog-title"
        open={props.info.isOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
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
