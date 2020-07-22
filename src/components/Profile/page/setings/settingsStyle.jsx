import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        "& .MuiInput-underline": {
          "&:before": { border: "none" },
          "&:after": {
            border: "none",
          },
        },
        "& .MuiInputBase-input": {
          // padding: 0,
          "&:focus": {
            border: "1px solid #007cff",
          },
        },
        "& .MuiOutlinedInput-multiline": {
          padding: 2,
        },
      },
    },
  
    input: {
      "& .MuiInputBase-input": {
        border: "1px solid rgba(231,233,238,1)",
        borderRadius: "10px",
        padding: 10,
      },
    },
    btn1: {
      width: 148,
      height: 32,
      borderRadius: 16,
      border: "1px solid #007CFF",
      color: "#007CFF",
      fontSize: 14,
    },
    btn2: {
      color: "#FC5659",
      border: "1px solid #FC5659",
    },
    btn: {
      backgroundColor: "#007CFF",
      color: "white",
      fontSize: 16,
      width: 180,
      height: 40,
      borderRadius: 20,
    },
    btn4: {
      backgroundColor: "#F2F2F5",
      color: "#878791",
    },
  
    radioRoot: {
      flexDirection: "row !important",
      "& .MuiRadio-root": {
        padding: "0 9px",
      },
    },
    usersimg: {
      width: 70,
      height: 70,
      borderRadius: "50%",
      backgroundColor: "#F3F3F3",
      position: "relative",
    },
    mask:{
      position: "absolute",
      backgroundColor: "rgba(0,0,0,.5)",
      zIndex: 0,
    },
    masknext:{
      position: "relative", zIndex: 1
    }
  }));
  export default useStyles;