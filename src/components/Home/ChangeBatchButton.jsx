import React from "react";
import Button from "@material-ui/core/Button";

const ChangeBatchButton = ({ handleChange }) => {
  const handleScrollTop = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#channel-bar-paper-to-back"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    handleChange();
  };

  return (
    <Button onClick={handleScrollTop} variant="contained" color="secondary">
      换一换
    </Button>
  );
};

export default ChangeBatchButton;
