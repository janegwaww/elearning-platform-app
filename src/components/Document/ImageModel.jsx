import React, { useState } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import { is_phone } from "../../assets/js/totls";

const ImageModel = ({ path = "" }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [isPc, setIsPc] = useState(is_phone());
  const styles = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    width: "auto",
    // minWidth: '43.75rem',

    height: "100%",
    overflow: "auto",
  };
  const styles1 = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    width: "90%",
    // minWidth: '43.75rem',
    height: "auto",
    overflow: "auto",
  };
  const img_sty = {
    height: "100%",
    width: "100%",
  };
  const img_sty2 = {
    height: "auto",
    width: "auto",
    maxWidth: "100%",
  };
  return (
    <div>
      <ButtonBase onClick={handleOpen}>
        <div className="file-container">
          <img
            src={`${path}`}
            alt={`${path}`}
            style={{ maxWidth: 466, width: "100%" }}
          />
        </div>
      </ButtonBase>
      <Modal open={open} onClose={handleClose}>
        <div style={isPc ? styles1 : styles}>
          <img
            src={`${path}`}
            alt={`${path}`}
            style={isPc ? img_sty : img_sty2}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ImageModel;
