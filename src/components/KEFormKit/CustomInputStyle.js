import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    marginBottom: theme.spacing(2),
    zIndex: 2
  },
  input: {
    width: "100%"
  },
  underline: {
    "&::before": {
      borderBottomColor: "#dcdfe6"
    },
    "&::after": {
      borderBottom: "1px solid #007cff"
    },
    "&:hover:not(.Mui-disabled)::before": {
      borderBottom: "1px solid #dcdfe6"
    },
    "&.Mui-error::after": {
      borderBottomColor: theme.palette.error.main
    }
  },
  helpText: {
    color: theme.palette.error.main,
    height: "16px"
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  clearIcon: {
    fontSize: 14,
    "&:hover": {
      color: "blue"
    }
  },
  divider: {
    height: 16,
    margin: 4,
    marginRight: 14
  },
  sendCode: {
    fontSize: "14px",
    color: "#007cff"
  },
  label: {
    color: "#c0c4cc",
    fontSize: "14px",
    "&.Mui-focused": {
      color: "#007cff"
    }
  }
}));

export default useStyles;
