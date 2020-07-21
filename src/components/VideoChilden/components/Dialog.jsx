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
  },
}));
export const DialogModal = (props) => {
  const classes = useStyles();
  const {
    imgurl,
    type,
    children,
    title,
    btnconfirm,
    btncancel,

    onEvent,
    ...other
  } = props;

  return (
    <Dialog open={false}>
      <div style={{ width: 470, height: 230 ,padding:20}}>
        <DialogTitle
          onClose={() => {
            props.onEvent && props.onEvent({ confirm: false, cancel: true });
          }}
        >
          {title || ""}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>

        <DialogActions >
          <div className='box box-align-center box-between'>
            <Button
              variant="outlined"
              color="primary"
              className={`${classes.btn} ${classes.btn2}`}
            >
              重新上传
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={`${classes.btn} ${classes.btn2}`}
            >
              确定
            </Button>
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
            >
              去取消
            </Button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};
