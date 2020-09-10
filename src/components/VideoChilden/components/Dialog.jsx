import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from "../../../assets/template/MuiDialogTitle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paper": {
      overflowY: "visible",
    },
  },
  btn: {
    fontSize: 16,
    width: 180,
    height: 40,
    borderRadius: "27px 21px 21px 27px",
    border: "1px solid rgba(0,124,255,1)",
  },
  btn1: {
    color: "#fff",
    backgroundColor: "#007CFF",

    "&:hover": { backgroundColor: "#007CFF" },
  },
  btn2: {
    color: "#007CFF",
  },
  btn3: {
    backgroundColor: "#F2F2F5",
    color: "#878791",
    border: "none",
    marginLeft: 30,
  },
}));
const stop_run = (prvprops, nextpropx) => {

  return prvprops.open == nextpropx.open;
};
const DialogModal = (props) => {
  const classes = useStyles();
  const { _login, open, children, title, onEvent, ...other } = props;

  return (
    <Dialog open={open} className={classes.root}>
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
                className={`${classes.btn} ${classes.btn2}`}
                onClick={() => {
                  onEvent && onEvent({ confirm: true, concel: false });
                }}
              >
                重新上传
              </Button>
            )}
            {_login.type == 2 && (
              <Button
                variant="outlined"
                color="primary"
                className={`${classes.btn} ${classes.btn2}`}
                onClick={() => {
                  onEvent && onEvent({ confirm: true, concel: false });
                }}
              >
                确定
              </Button>
            )}
            {_login.type == 1 && (
              <div>
                <Button
                  variant="contained"
                  className={`${classes.btn} ${classes.btn1}`}
                  onClick={() => {
                    onEvent && onEvent({ confirm: true, concel: false });
                  }}
                >
                  去登录
                </Button>
                <Button
                  variant="outlined"
                  className={`${classes.btn} ${classes.btn3}`}
                  onClick={() => {
                    onEvent && onEvent({ confirm: false, concel: true });
                  }}
                >
                  取消
                </Button>
              </div>
            )}
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};
export default React.memo(DialogModal, stop_run);
