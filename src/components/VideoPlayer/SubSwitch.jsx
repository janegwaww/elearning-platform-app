import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const KeSwitch = withStyles((theme) => ({
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

const SubSwitch = ({
  handleChange = () => ({}),
  disabled = false,
  ...props
}) => {
  const [checked, setChecked] = useState(false);

  const toggleChecked = (e) => {
    if (disabled) return;
    setChecked(!checked);
    handleChange(!checked);
  };

  return (
    <Typography component="div" variant="caption">
      <Grid component="label" container alignItems="center" spacing={0}>
        <Grid item style={{ lineHeight: "normal" }}>
          字幕
        </Grid>
        <Grid item>
          <KeSwitch
            checked={checked}
            onChange={toggleChecked}
            disabled={disabled}
            name="subtitle switch"
            size="small"
          />
        </Grid>
      </Grid>
    </Typography>
  );
};

export default SubSwitch;
