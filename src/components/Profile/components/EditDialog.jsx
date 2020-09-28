//编辑系列 编辑描述
import React, { useRef, useEffect, useState } from "react";
import { withStyles, makeStyles, createStyles, StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import { DialogTitle } from "../../../assets/template/MuiDialogTitle";
import userStyles from "./profileStyle";
import { updata_img, get_data } from "../../../assets/js/request";
import { DialogContent, DialogActions } from '../../../assets/template/MuiDialogTitle';
// import CustomModal from "../../../../assets/js/CustomModal";

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  seed: 't'
});

const DialogActionsCustom = withStyles(theme => ({
  root: {
    justifyContent: 'center'
  },
}))(DialogActions);

export default function EditDialog(props) {
  const classes = userStyles();

  const { children } = props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setTimeout(() => {
    setOpen(false);
    // }, 50);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        {props.icon_img ? (
          <div className="text-center">
            <img src={props.icon_img} />
          </div>
        ) : null}
        <div>{props.title}</div>
      </div>
      <Dialog
        onClose={handleClose}

        open={open}
        className={classes.dialog}
      >
        <DialogTitle onClose={handleClose}>
          {props._type == "del" ? "温馨提示" : props.title}
        </DialogTitle>
        <DialogContent
          dividers
          style={{
            borderTop:
              props._type == "del" ? "none" : " 1px solid rgba(0, 0, 0, 0.12)",
            borderBottom:
              props._type == "del" ? "none" : " 1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          {children}
          <input
            type="file"
            id="file-img"
            onChange={(ev) => {
              let _files = ev.target.files[0];
              updata_img(_files, "video_image").then((res) => {
                if (res.err == 0 && res.errmsg == "OK") {
                  props.onChange && props.onChange({ url: res.result_data[0] });
                }
              });
            }}
            style={{ display: "none" }}
          />
        </DialogContent>
        {props.btn != "no_show" && (
          <StylesProvider generateClassName={generateClassName}>
            < DialogActionsCustom >
            <StylesProvider generateClassName={generateClassName}>
              <Button
                disabled={props._disabled ? true : false}
                onClick={(evt) => {
                  evt.preventDefault();
                  evt.stopPropagation();

                  handleClose(evt);
                  props.onEvent &&
                    props.onEvent({
                      confirm: true,
                      cancel: false,
                    });
                }}
                color="primary"
                className={`${classes.btn1} ${classes.root}`}
              >
                确定
            </Button>
            </StylesProvider>
              {!props.notconcel && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClose(e);
                    props.onEvent &&
                      props.onEvent({
                        confirm: false,
                        cancel: true,
                      });
                  }}
                  className={`${classes.btn1} ${classes.btn2} `}
                >
                  取消
                </Button>
              )}
            </DialogActionsCustom>
          </StylesProvider>
        )}
      </Dialog>
    </div >
  );
}

