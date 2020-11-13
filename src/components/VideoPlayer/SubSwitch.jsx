import React, { useState } from "react";
import { navigate } from "@reach/router";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LoginConfirmModal from "../LoginConfirm/LoginConfirmModal";

const KeSwitch = withStyles(() => ({
  switchBase: {
    color: "#fff",
    "&.Mui-checked": {
      color: "#fff",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#007cff",
      opacity: 1,
    },
  },
  track: {
    backgroundColor: "#fff",
  },
}))(Switch);

const SubSwitch = ({ handleChange = () => ({}), disabled = false }) => {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleChecked = () => {
    if (disabled) {
      setOpen(true);
      return;
    }
    setChecked(!checked);
    handleChange(!checked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    navigate("/users/login");
  };

  return disabled === "noSubtitle" ? null : (
    <Typography component="div" variant="caption">
      <Grid
        component="label"
        container
        alignItems="center"
        spacing={0}
        style={{ lineHeight: 2.8 }}
      >
        <Grid item>字幕生成</Grid>
        <Grid item>
          <KeSwitch
            checked={checked}
            onChange={toggleChecked}
            name="subtitle switch"
            size="small"
          />
        </Grid>
      </Grid>
      <LoginConfirmModal
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Typography>
  );
};

export default SubSwitch;
