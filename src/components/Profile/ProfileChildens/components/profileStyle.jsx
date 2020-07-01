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
  noMaxWidth: {
    maxWidth: 'none',
  },
  textfield:{
    background:'#F2F2F5',
    // height:40,
    padding :'10px 20px',
    border:'1px solid #F2F2F5',
    borderRadius:6,
    resize: 'none'
    // '& .MuiInputBase-fullWidth':{
    //   border:'1px solid rgba(0, 0, 0, 0.42)',
    //   borderRadius:4,
    //   "&:hover":{
    //     borderBottom:'none'
    //   },
    
    // },
    // '& .MuiInput-underline:after':{
    //   borderBottom:'1px solid rgba(0, 0, 0, 0.42)'
    // },
    // '& .MuiInput-underline:hover:not(.Mui-disabled):before':{
    //   borderBottom:'1px solid rgba(0, 0, 0, 0.42)'
    // },
    // '& .MuiInputBase-input:focus':{
    //   outline:'none',
    //   // border:'1px solid red',
     
    // },
   
    // '& .MuiOutlinedInput-notchedOutline':{
    //   top:0,
     
    // },
    // '& .MuiOutlinedInput-root.Mui-fcused.MuiOutlinedInput-notchedOutline':{
    //   borderColor:'#007CFF'
    // }
  }
}));

export default userStyles;
