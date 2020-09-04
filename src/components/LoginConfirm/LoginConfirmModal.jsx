import React from "react";
import Modal from "@material-ui/core/Modal";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./LoginConfirmModal.sass";

const LoginConfirmModal = ({
  open = false,
  handleClose = () => ({}),
  handleConfirm = () => ({}),
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="login-confirm-contain">
        <div className="modalBody">
          <div className="img">
            <img src="/images/isLogin.svg" alt="login-icon" />
          </div>
          <div className="paper">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography className="notice">
                  亲, 此操作需登录, 是否登录?
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <ButtonBase onClick={handleConfirm} className="loginButton">
                  去登录
                </ButtonBase>
              </Grid>
              <Grid item xs={6}>
                <ButtonBase onClick={handleClose} className="cancelButton">
                  取消
                </ButtonBase>
              </Grid>
            </Grid>
            <IconButton onClick={handleClose} className="close">
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginConfirmModal;
