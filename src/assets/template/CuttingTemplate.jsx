import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { PhotoCameraOutlined } from "@material-ui/icons";
import { get_data } from "../js/request";
import { getObj } from "../js/totls";
import CustomModal from "../js/CustomModal";
import { DialogActions, DialogTitle } from "./MuiDialogTitle";
import { DialogContent } from "./DialogContent";

const userStyles = makeStyles((them) => ({
  file: {
    width: 140,
    border: "1px dashed #D5D5D5",
    height: 80,
    display: "inline-block",
    overflow: "hidden",
    position: "relative",
    borderRadius: 6,
    "& input[type=file]": {
      width: 1,
      height: 1,
    },
    "& label": {
      top: 0,
      left: 0,
      width: "100% !important ",
      color: "#999",
      margin: 0,
      display: "block",
      position: "absolute",
      textAlign: "center",
      paddingTop: 15,
      backgroundColor: "white",
      margin: "0 !important",
    },
  },
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "100%",
    },
  },
  croper: {
    width: 620,
    height: 350,
    backgroundPosition: "center center",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#f2f2f5",
  },
  btn: {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));

function CuttingTemplate(props) {
  const classes = userStyles();
  const [open, setOpen] = useState(false);
  const [files, setfiles] = useState(null);
  const [temporaryurl, setTemporaryurl] = useState(""); //存放临时地址
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: "success",
    msg: "上传成功!",
  });
  const handleClose = useCallback(() => {
    //关闭上传弹窗
    setOpen(false);
    setTemporaryurl("");
  }, []);
  const snackbarClose = () => {
    //关闭提示
    setOpenSnackbar({ open: false });
  };
  return (
    <section className={classes.file}>
      <div className="all-width all-height">
        <input
          type="file"
          id={props.id}
          accept=".png,.jpeg,.jpg"
          onChange={(e) => {
            e.preventDefault();
            let files;
            if (e.dataTransfer) {
              files = e.dataTransfer.files[0];
            } else if (e.target) {
              files = e.target.files[0];
            }
            if (!files) {
              return false;
            }
            setOpen(true);
            setfiles(files);
            const reader = new FileReader();
            reader.onload = () => {
              setTemporaryurl(reader.result);
            };
            reader.readAsDataURL(files);

            return false;
          }}
        />
        {/**htmlFor={props.id} */}
        <label
          className="all-width all-height fn-size-14"
          onClick={() => {
            console.log(props.isClick);
            if (!props.isClick) {
              getObj(props.id).click();
            } else {
              new CustomModal().alert("亲！请先添加文件/文档哦", "error");
            }
          }}
        >
          <PhotoCameraOutlined />
          <br />
          上传封面图
        </label>
      </div>
      <Dialog open={open} className={`${classes.dialog} dialog`}>
        <DialogTitle onClose={handleClose} align="left">
          图片预览
        </DialogTitle>
        <DialogContent dividers>
          <div className={`${classes.croper} text-center `}>
            <img
              src={temporaryurl}
              alt=""
              className="all-height"
              style={{ width: "auto", margin: "0 auto" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => {
              let _formdata = new FormData();
              _formdata.append("model_action", "upload_file");
              _formdata.append("type", "video_image");
              _formdata.append("model_name", files.name);
              _formdata.append("file", files);
              get_data(_formdata).then((res) => {
                if (res.err == 0 && res.errmsg == "OK") {
                  props.onEvent && props.onEvent(res.result_data[0]);
                  setOpen(false);
                  setTemporaryurl("");
                  setfiles(null);
                } else {
                  new CustomModal().alert("上传失败", "error");
                }
              });
            }}
          >
            提交
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar.open}
        autoHideDuration={3000}
        onClose={snackbarClose}
      >
        <Alert onClose={snackbarClose} severity={openSnackbar.type}>
          {openSnackbar.msg}
        </Alert>
      </Snackbar>
    </section>
  );
}
export default CuttingTemplate;
