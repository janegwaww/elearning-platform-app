import { makeStyles,createStyles } from "@material-ui/core/styles";
import '../../../assets/css/input.css';
const userStyles = makeStyles((theme)=> createStyles({
  toolbar: {
    padding: 0,
  },
  btn: {
    color: "#fff",
    "border-radius": "16px",
    width: "140px",
    height: "32px",
    "line-height": 0,
    backgroundColor: "#007CFF",
    margin: "0 56px",
    "&:hover": {
      backgroundColor: "#007CFF",
    },
  },
  btn1: {
    backgroundColor: "#f2f2f5",
    color: "#878791",
    margin: 0,
    "&:hover": {
      backgroundColor: "#878791",
      color: "#fff",
    },
  },
  avatar: {
    width: 24,
    height: 24,
  },
  save: {
    width: 22,
    height: 22,
  },
  main: {
    padding: 40,

    "& .MuiFormControl-fullWidth": {
      width: "80%",
    },
  },
  //   主体
  textDoc: {
    "& span:hover": {
      cursor: "pointer",
    },
  },
  snackbar: {
    top: "40%",
    transform: "translate(-50%,-50%)",
  },
  radiogroup: {
    flexDirection: "row",
  },
  root: {
    width: "100%",
    fontSize: "14px",
    '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl':{
      border:'2px solid transparent',
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.Mui-focused": {
      border: "2px solid #007cff",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
        borderWidth:0
      },
    },

    "& .MuiOutlinedInput-notchedOutline": {
      top: -4,
    },
    "& span": {
      display: "inline-block",
    },
    "& button": {
      padding: 0,
    },
    "& b": {
      fontWeight: 400,
      display: "inline-block",
    },

    "& .file": {
      width: "140px",
      height: "80px",
      position: "relative",
      border: "1px dashed #D5D5D5",
      overflow: "hidden",
      borderRadius:6
      // backgroundRepeat: "no-repeat",
      // backgroundPosition: "center center",
      // backgroundSize: "100%",
      // display: "inline-block",
      // "& input": {
      //   width: "100%",
      //   height: "100%",
      // },

      // "& label": {
      //   display: "block",
      //   position: "absolute",
      //   left: 0,
      //   top: 0,
      //   backgroundColor: "white",
      //   color: "#999",
      //   paddingTop: 15,
      //   textAlign: "center ",
      //   margin: 0,
      // },
    },

    

    "& p": {
      margin: 0,
    },

    "& .sign": {
      backgroundColor: "#F2F2F5",
      padding: "12px",
      borderRadius:8,
      // "& label": {
      //   // display: "inline-block",
      //   margin: "6px",
      //   minWidth: "auto",
      //   fontSize: "12px",
      // },
    },
    // "& label": {
    //   minWidth: "65px",
    //   transform: "translate(0, 1.5px) scale(1.1)",
    // },
    "&  .item": {
      marginTop: 22,

      "& .del": {
        color: "#878791",
        "&:hover": {
          color: "#F86B6B",
        },
      },

      "& span": {
        position: "relative",
        "&:hover span": {
          display: "block",
        },

        "& span": {
          display: "none",
          position: "absolute",
          right: "-10px",
          bottom: 0,
          width: "397px",
          boxShadow: "0px 0px 2px 0px rgba(118,131,144,1)",
          color: "#666",
          transform: "translateY(100%)",
          zIndex: 1000,
          padding: "16px",
          backgroundColor: "#fff",
        },
      },
    },
    "& svg": {
      verticalAlign: "middle",
    },
    "& .MuiFormControlLabel-root ": {
      minWidth: "auto",
      "& .MuiRadio-root": {
        padding: 0,
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "8px 6px",
      backgroundColor: "#fff",
      fontSize: 14,
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "1px",
    },
    "& .MuiInputAdornment-root": {
      fontSize: "20px",
      color: "#D5D5D5",
    },
  },
}));
export default userStyles;
