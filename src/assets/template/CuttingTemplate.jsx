import React, { useState, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Dialog, Button, Snackbar } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { PhotoCameraOutlined } from "@material-ui/icons";

import Typography from "@material-ui/core/Typography";

import { get_data, get_alldata } from "../js/request";
import {getObj} from '../js/totls';
import CustomModal from '../js/CustomModal';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#eee",
    height: "56px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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

const DialogActions = withStyles((theme) => {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  };
})(MuiDialogActions);
const userStyles = makeStyles((them) => ({
  file: {
    width: 140,
    border: "1px dashed #D5D5D5",
    height: 80,
    display: "inline-block",
    overflow: "hidden",
    position: "relative",
    borderRadius:6,
    "& input[type=file]": {
      width: 1,
      height: 1,
    },
    "& label": {
      top: 0,
      left: 0,
      width:'100% !important ',
      color: "#999",
      margin: 0,
      display: "block",
      position: "absolute",
      textAlign: "center",
      paddingTop: 15,
      backgroundColor: "white",
      margin:'0 !important'
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
    backgroundColor:'#f2f2f5'
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
          accept='.png,.jpeg,.jpg'
          onChange={(e) => {
            e.preventDefault();
            let files;
            if (e.dataTransfer) {
              files = e.dataTransfer.files[0];
            } else if (e.target) {
              files = e.target.files[0];
            }
            if(!files){
              return false
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
        <label  className="all-width all-height fn-size-14" onClick={()=>{
          console.log(props.isClick)
          if(!props.isClick){
            getObj(props.id).click();
          }else{
            new CustomModal().alert('亲！请先添加文件/文档哦','error',3000);
           
          }
          
        }}>
          <PhotoCameraOutlined />
          <br />
          上传封面图
        </label>
      </div>
      <Dialog
       
        open={open}
        className={classes.dialog}
      >
        <DialogTitle  onClose={handleClose}>
          图片预览
        </DialogTitle>
        <DialogContent dividers>
          <div
            className={`${classes.croper} text-center `}
           
          >
          <img src={temporaryurl} alt=''  className='all-height' style={{width:'auto',margin:'0 auto'}}/>
          
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            取消
          </Button>
          <Button
<<<<<<< HEAD
            autoFocus
            variant="contained"
            color="primary"
=======
            variant="contained" color="primary"
>>>>>>> 5c8fb60... add 声明
            onClick={() => {
              let _formdata = new FormData();
              _formdata.append("model_action", "upload_file");
              _formdata.append("type", "video_image");
              _formdata.append("model_name", files.name);
              _formdata.append("file", files);
              get_data( _formdata).then((res) => {
                if (res.err == 0 && res.errmsg == "OK") {
                  props.onEvent && props.onEvent(res.result_data[0]);
                  setOpen(false);
                  setTemporaryurl("");
                  setfiles(null);
                } else {
                  new CustomModal().alert('上传失败','error',3000);
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
