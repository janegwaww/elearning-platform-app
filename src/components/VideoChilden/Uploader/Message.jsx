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
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";

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
                  promp_info.open = false;
                  props.parent.setState({
                    status: 1,
                    progress: 0,
                    files: [],
                    promp_info: promp_info,
                  });
                  props.parent.props.parent.setState({
                    style:{},
                    styles:{},
                    video_data:{}
                  })
                  setOpen(true)
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
