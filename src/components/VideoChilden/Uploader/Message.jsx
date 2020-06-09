import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import { navigate } from "@reach/router";
import {getObj} from '../../../assets/js/totls';
import { get_data } from "../../../assets/js/request";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function return_run(prevProps, nextProps) {
  return prevProps.promp_info.open == nextProps.promp_info.open;
}
const Message = (props) => {
  let promp_info = JSON.parse(JSON.stringify(props.parent.state.promp_info));
  const [open, setOpen] = React.useState(false);
  const calback = ()=>{setOpen(false)};
  const handClose=React.useCallback(calback,[]);
  
  return (
    <div>
      <Dialog open={promp_info.open}>
        <DialogTitle>{promp_info.title || ""}</DialogTitle>
        <DialogContent>
          <DialogContentText>{promp_info.msg || ""}</DialogContentText>
        </DialogContent>

        {promp_info.type < 3 ? (
          <DialogActions>
            <Button
              variant="contained"
              color="default"
              onClick={() => {
                let _data = promp_info;
                _data.open = false;
                props.parent.setState({ promp_info: _data });
              }}
            >
              取消
            </Button>

            <Button
              variant="contained"
              color={promp_info.type == 1 ? "primary" : "secondary"}
              onClick={() => {
                if (promp_info.type === 1) {
                  //
                  navigate(`/users/login`);
                  let _data = promp_info;
                  _data.open = false;
                  props.parent.setState({ promp_info: _data });
                } else {
                 
                  get_data('/api/v1/gateway', {
                    "model_name": "video",
                    "model_action": "delete_video",
                    "extra_data": {
                    "video_id":[ props.parent.state.files[0].video_id]
                    },
                    
                    }).then(res=>{
                      getObj('image-box').style.backgroundImage='';
                      getObj('video-test').innerHTML='';
                      promp_info.open = false;
                      props.parent.setState({
                        status: 1,
                        progress: 0,
                        promp_info: promp_info,
                        files: [],
                        the_current:{}
                      
                      });
                      if(sessionStorage.getItem('file_data')){
                        sessionStorage.removeItem('file_data');
                      }
                      
                      props.parent.props.parent.setState({
                        style:{},
                        styles:{},
                        video_data:{}
                      })
                      setOpen(true)
                      console.log(res)
                    })
                    return
                  
                }
              }}
            >
              {promp_info.type == 1 ? "确定" : "删除"}
            </Button>
          </DialogActions>
        ) : (
          <DialogActions />
        )}
      </Dialog>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={3000}
        onClose={handClose}
      >
        <Alert
          onClose={handClose}
          severity="success"
        >
          删除成功
        </Alert>
      </Snackbar>
    </div>
  );
};
export default React.memo(Message, return_run);
