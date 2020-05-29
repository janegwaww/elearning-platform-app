import { makeStyles } from "@material-ui/core/styles";
const userStyles = makeStyles((theme) => ({
  gird: {
    margin: -10,
    width: "calc(100% + 20px)",
    marginTop: 30,
    "& >.MuiGrid-item": {
      padding: "0 10px",
    },
  },
  dialog:{
    '& .MuiDialog-paperWidthSm':{
      maxWidth:650,
      margin:0,
    
    }
    
  },
  input:{
    '& .MuiInputBase-input':{
      border:'1px solid rgba(231,233,238,1)',
  borderRadius:'10px',
    }

  },
  btn1: {
    backgroundColor: "#007CFF",
    fontSize: 16,
    color: "white",
    width: 180,
    height: 40,
    borderRadius: 20,
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
  btn2: {
    color: "#878791",
    backgroundColor: "#F2F2F5",
  },
}));

export default userStyles;
