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
      maxWidth:850,
      margin:0,
      overflow:'hidden'
    
    },
    '& .MuiPaper-root':{
      padding:20,
      boxShadow:'2px 2px 20px 0px rgba(0,0,0,0.1)',
      borderRadius:12,
    }
    
  },
  menulist:{
    '& .MuiPaper-root':{
      borderRadius:'12px',
      
    },
    '& .MuiList-root.MuiMenu-list':{
      display:'flex',
      flexWrap: 'wrap',
      width: 320,
      height: 216,
      padding:30,
      boxShadow:'0px 2px 10px 2px rgba(0,0,0,0.1)',

      '& .MuiMenuItem-root':{
        width:'33.33%',
        fontSize:14,
        flexDirection: 'column'
      },
      '& img':{
        width:14,
        height:14
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
      backgroundColor: "#007CFF",
      // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
  btn2: {
    color: "#878791",
    backgroundColor: "#F2F2F5",
    "&:hover": {
      // backgroundColor: "#007CFF",
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
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
    resize: 'none',
  width:'100%'

  }

}));

export default userStyles;
