
import React from "react";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
export const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      
    },
  }))(MuiDialogContent);