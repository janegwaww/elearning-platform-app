import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import MuiDialogContent from "@material-ui/core/DialogContent";

import MuiDialogActions from "@material-ui/core/DialogActions";
const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      textAlign: "center",
      width:'100%',
      display:'block'
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  export const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose,align, ...other } = props;
  
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other} style={{textAlign:align?align:'center'}}>
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
  export const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      overflowY:'visible',
      position: 'relative'
    },
  }))(MuiDialogContent);
  export const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);