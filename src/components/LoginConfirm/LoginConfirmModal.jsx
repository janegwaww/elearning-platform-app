import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  contain: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  paper: {
    width: 440,
    height: 200,
    backgroundColor: "#fff",
    boxShadow: "2px 2px 20px 0px rgba(0,0,0,0.1)",
    padding: "30px 20px",
    borderRadius: "12px",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-end",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      width: "120%",
    },
  },
  loginButton: {
    width: "100%",
    height: 32,
    background: "rgba(0,124,255,1)",
    borderRadius: "27px 27px 27px 27px",
    color: "#fff",
  },
  notice: {
    fontSize: "1rem",
    color: "#2c2c3b",
    lineHeight: "21px",
    textAlign: "center",
  },
  cancelButton: {
    width: "100%",
    height: 32,
    background: "#f2f2f5",
    borderRadius: "27px 27px 27px 27px",
    color: " #878791",
  },
  img: {
    marginBottom: -60,
    zIndex: 2,
    display: "block",
    height: 140,
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  modalBody: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

const LoginConfirmModal = ({
  open = false,
  handleClose = () => ({}),
  handleConfirm = () => ({}),
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.contain}>
        <div className={classes.modalBody}>
          <div className={classes.img}>
            <img src="/images/isLogin.svg" alt="login-icon" />
          </div>
          <div className={classes.paper}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography className={classes.notice}>
                  亲, 此操作需登录, 是否登录?
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <ButtonBase
                  onClick={handleConfirm}
                  className={classes.loginButton}
                >
                  去登录
                </ButtonBase>
              </Grid>
              <Grid item xs={6}>
                <ButtonBase
                  onClick={handleClose}
                  className={classes.cancelButton}
                >
                  取消
                </ButtonBase>
              </Grid>
            </Grid>
            <IconButton onClick={handleClose} className={classes.close}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginConfirmModal;
