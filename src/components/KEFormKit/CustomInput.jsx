import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Warning, Clear } from "@material-ui/icons";
import {
  Input,
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
  FormHelperText,
  Divider
} from "@material-ui/core";
import useStyles from "./CustomInputStyle";

const CustomInput = props => {
  const {
    field: { name },
    form: { touched, errors, setFieldValue, setTouched },
    type,
    label
  } = props;
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();

  useEffect(() => {
    console.log(props.form);
  }, [inputValue]);

  const handleChange = event => {
    const { value } = event.target;
    setInputValue(value);
    setFieldValue(name, value);
  };

  const handleClickClear = () => {
    setInputValue("");
    setFieldValue(name, "");
  };

  const handleBlur = () => {
    setTouched(name, inputValue);
    console.log("blur");
  };

  const handleFocus = () => {
    console.log("focus");
  };

  const ErrorAlert = () => {
    return touched === name && errors[name] ? (
      <span>
        <Warning style={{ fontSize: 10, marginRight: 4 }} />
        {errors[name]}
      </span>
    ) : null;
  };

  const SendButtonAdornment = () => (
    <InputAdornment position="end">
      <Divider orientation="vertical" className={classes.divider} />
      <IconButton size="small" className={classes.iconButton}>
        <span className={clsx(classes.sendCode)}>获取验证码</span>
      </IconButton>
    </InputAdornment>
  );

  const ClearInputAdornment = () => (
    <InputAdornment position="end">
      {!!inputValue && (
        <IconButton
          size="small"
          onClick={handleClickClear}
          className={classes.iconButton}
          aria-label="Clear"
        >
          <Clear className={classes.clearIcon} />
        </IconButton>
      )}
    </InputAdornment>
  );

  const CustomAdornment = () => {
    if (type === "mobile") {
      return <ClearInputAdornment />;
    }
    if (type === "smscode") {
      return <SendButtonAdornment />;
    }
    return null;
  };

  return (
    <FormControl className={classes.root}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Input
        error={false}
        endAdornment={<CustomAdornment />}
        className={classes.input}
        classes={{ underline: classes.underline }}
        value={inputValue}
        onChange={handleChange}
        /* onBlur={handleBlur} */
        /* onFocus={handleFocus} */
      />
      <FormHelperText className={classes.helpText}>
        <ErrorAlert />
      </FormHelperText>
    </FormControl>
  );
};

export default CustomInput;
