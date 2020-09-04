import React from "react";
import Chip from "@material-ui/core/Chip";
import "./AuthTag.sass";

const AuthTag = ({ authority }) => {
  return (
    authority === 20 && (
      <div className="officetag">
        <Chip
          variant="outlined"
          size="small"
          label="官方"
          color="secondary"
          className="chip"
        />
      </div>
    )
  );
};

export default AuthTag;
