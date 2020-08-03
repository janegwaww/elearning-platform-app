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
    width: "80%",
    // minWidth: '43.75rem',
    height: "80%",
    overflow: "auto",
  };
  return (
    <div>
      <ButtonBase onClick={handleOpen}>
        <div className="file-container">
          <img src={`${path}`} alt={`${path}`} style={{width:'100%'}} />
        </div>
      </ButtonBase>
      <Modal open={open} onClose={handleClose}>
        <div style={styles}>
          <img src={`${path}`} alt={`${path}`}  style={{height:'100%',wdith:'100%'}}/>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModel;
