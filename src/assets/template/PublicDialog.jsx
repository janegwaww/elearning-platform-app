import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle,DialogActions} from './MuiDialogTitle';
import {DialogContent} from './DialogContent';
import userStyles from "../../components/Profile/components/profileStyle";
import  "../../components/Profile/components/profileStyle.css";
import '../css/cropper.css';

export default function CustomizedDialogs(props) {
  
    const classes=userStyles();
    const { children } = props;
    const [files,setFiles]= React.useState(null);
    const confirmClick = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      props.onEvent&&props.onEvent({ cancel: false, confirm: true });
    };
    const handleClose = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      props.onEvent&&props.onEvent({ cancel: true, confirm: false });
    };

    return (
      <div>
        <Dialog
          onClose={handleClose}
          open={props.open}
          className='dialog fn-size-14'
        >
          <DialogTitle className='text-center' onClose={handleClose}>
            {props.title}
          </DialogTitle>
          <DialogContent dividers style={{borderBottom:props.not_show?'1px solid white':'1px solid rgba(0, 0, 0, 0.12)'}}>
          {children}
          <input type='file' id={props.id} style={{width:0,height:0}}  onChange={(e)=>{
            e.preventDefault();
              let _files = e.target.files[0];
                let _reder = new FileReader();
                 _reder.onload=()=>{
                  
                   props.onChange&&props.onChange(_files,_reder.result);
                   setFiles(_reder.result);
                 }
                 _reder.readAsDataURL(_files);
          }}  />
          </DialogContent>

          {!props.not_show&&(
          <DialogActions style={{justifyContent:'center'}}>
            <Button autoFocus onClick={confirmClick} className={classes.btn1} >
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
          )}
        </Dialog>
      </div>
    );
  }

