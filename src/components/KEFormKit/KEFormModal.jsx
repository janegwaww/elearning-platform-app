import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import KEForm from "./KEForm";
import keformModalHeader from "../../../static/images/keform-modal-header.png";
import keformModalClear from "../../../static/images/keform-modal-clear.png";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: "transparent",
    border: "none",
    width: "880px",
    height: "580px",
    "&:focus": {
      outline: "none"
    }
  },
  header: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: "-119px"
  },
  clear: {
    height: "119px",
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: "20px"
  }
}));

export default function KEFormModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, [open]);

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        login
      </button>
      <Modal
        aria-labelledby="keform-modal-title"
        aria-describedby="keform-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.header}>
              <div className={classes.clear}>
                <img
                  src={`${keformModalClear}`}
                  alt="clear"
                  width="26"
                  height="26"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <img
                  src={`${keformModalHeader}`}
                  alt="modal-header"
                  width="398"
                  height="119"
                />
              </div>
              <div></div>
            </div>
            <KEForm modal={`${true}`} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
