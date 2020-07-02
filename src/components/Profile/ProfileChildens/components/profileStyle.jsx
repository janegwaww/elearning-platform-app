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
    
    },
    '& .MuiPaper-root':{
      padding:20
    }
    
  },
  menulist:{
    
    '& .MuiList-root.MuiMenu-list':{
      display:'flex',
      flexWrap: 'wrap',
      width: 320,
      height: 216,
      
      '& .MuiMenuItem-root':{
        width:'33.33%',
        fontSize:14,
        flexDirection: 'column'
      }
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
  

  }

}));

export default userStyles;
