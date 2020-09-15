import React, { useState } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import { is_phone } from "../../assets/js/totls";
import Zmage from 'react-zmage'
const ImageModel = ({ path = "" }) => {
  
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [isPc, setIsPc] = useState(is_phone());

  return (
    <div>
      <ButtonBase onClick={handleOpen}>
        <div className="file-container">
          <Zmage
            src={`${path}`}
            alt={`${path}`}
            style={{ maxWidth: 466, width: "100%" }}
          />
        </div>
      </ButtonBase>
   
    </div>
  );
};

export default ImageModel;
