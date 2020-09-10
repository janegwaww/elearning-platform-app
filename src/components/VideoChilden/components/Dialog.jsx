import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from "../../../assets/template/MuiDialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import './dialog.css';
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "visible",
    },
  }
}));
const stop_run = (prvprops, nextpropx) => {

  return prvprops.open == nextpropx.open;
};
const DialogModal = (props) => {
  const classes = useStyles();
  const { _login, open, children, title, onEvent, ...other } = props;

  return (
    <Dialog open={open} className={`uploader-asid ${classes.root}`}>
      <div style={{ width: 470, padding: 20 }}>
        <DialogTitle
          onClose={() => {
            props.onEvent && props.onEvent({ confirm: false, concel: true });
          }}
        >
          {title || ""}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>

        <DialogActions>
          <div className="box box-center all-width">
            {_login.type == 3 && (
              <Button
                variant="outlined"
                color="primary"
                className={`btn btn2`}
                onClick={() => {
                  onEvent && onEvent({ confirm: true, concel: false });
                }}
              >
                重新上传
              </Button>
            )}
            {_login.type == 2 && (
              <div
                variant="outlined"
                color="primary"
                className={`btn btn2`}
                onClick={() => {
                  onEvent && onEvent({ confirm: true, concel: false });
                }}
              >
                确定
              </div>
            )}
            {_login.type == 1 && (
              <div className= 'box'>
                <div
                  variant="contained"
                  className={`btn btn1`}
                  onClick={() => {
                    onEvent && onEvent({ confirm: true, concel: false });
                  }}
                >
                  去登录
                </div>
                <div
                  variant="outlined"
                  className={`btn btn3`}
                  onClick={() => {
                    onEvent && onEvent({ confirm: false, concel: true });
                  }}
                >
                  取消
                </div>
              </div>
            )}
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};
export default React.memo(DialogModal, stop_run);
