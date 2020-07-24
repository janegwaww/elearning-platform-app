import React, { useState } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";

const ImageModel = ({ path = "" }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const styles = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    width: "50%",
    minWidth: 700,
    height: "100%",
    overflowY: "auto",
  };
  return (
    <div>
      <ButtonBase onClick={handleOpen}>
        <div className="file-container">
          <img src={`${path}`} alt={`${path}`} />
        </div>
      </ButtonBase>
      <Modal open={open} onClose={handleClose}>
        <div style={styles}>
          <img src={`${path}`} alt={`${path}`} width="100%" />
        </div>
      </Modal>
    </div>
  );
};

export default ImageModel;
