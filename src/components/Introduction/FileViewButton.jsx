import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import HelpIcon from "@material-ui/icons/Help";

export default function FileViewButton({ vid = "" }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          color="secondary"
          style={{
            backgroundColor: "#fc5659",
            borderRadius: "27px",
            boxShadow: "none",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#fc5659"
            }
          }}
        >
          <Typography variant="body2">课件下载（付费）</Typography>
        </Button>
        <Tooltip title="付费下载内容">
          <HelpIcon style={{ color: "#fc5659", fontSize: 18, margin: 4 }} />
        </Tooltip>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            style={{
              position: "absolute",
              right: "8px",
              top: "8px",
              color: "#bdc3c7"
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            取消
          </Button>
          <Button onClick={handleClose} color="secondary" autoFocus>
            立即购买
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
