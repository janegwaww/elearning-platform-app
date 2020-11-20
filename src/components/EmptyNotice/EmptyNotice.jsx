import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import errJson from "./EmptyNotice.json";

const EmptyNotice = ({ empty = true, type = "404", handleFresh }) => {
  const emptyType = (t) => errJson[t];
  const typeObj = emptyType(type);

  return empty ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <img src={`${typeObj.img}`} alt="error" width="100%" />
      <div style={{ height: 40 }} />
      <Typography color="textSecondary">{typeObj.text}</Typography>
      <div style={{ height: 40 }} />
      <IconButton
        style={{ padding: 0, borderRadius: "50px" }}
        onClick={handleFresh}
      >
        <img src={`${typeObj.but}`} alt="button" width="100%" />
      </IconButton>
    </div>
  ) : null;
};

export default EmptyNotice;
