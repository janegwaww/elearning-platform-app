import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Dialog, Button, TextField,Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert'
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ContactSupport ,Add,Delete} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import getData from '../../../assets/js/request';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  };
})(MuiDialogActions);
const NewBtn2 = withStyles({
  root: {
    color: "#fff",
    "border-radius": "16px",
    width: "140px",
    height: "32px",
    "line-height": 0,
    backgroundColor: "#007CFF",
  },
})(Button);

const usersStyles = makeStyles((them) => ({
    snackbar:{
        top:'50%',
        bottom:'auto',
        transform:'translate(-50%,-50%)'
    },
  root: {
    width: "100%",
    fontSize:"14px",
    '& div':{
        alignItems:'flex-start',
        '& .file':{
            width:'80px',
            height:'80px',
            position:'relative', 
            margin:'0 5px',
            overflow:'hidden',
            '& input':{
                width:'100%',
                height:'100%',
            },
           '& .delete':{
            position:'absolute',
            top:0,
            right:0,
            color:'green',
            '& :hover':{
                color:'#ccc'
            }
           },
            '& img':{
                width:'100%',
                height:'100%',
                display:'block'
            },
            "& label":{
                width:'80px',
                height:'80px',
                display:'block',
                position:'absolute',
                left:0,
                top:0,
                backgroundColor:'#ccc',
                color:'#fff',
                lineHeight:'80px',
                textAlign:'center',
                fontSize:'20px'
            }
            
        }
    },


    '& p':{
        margin:0
    },
    '& .sign':{
       
        backgroundColor:'#EEEEEE',
        "& label":{
            display:'inline-block',
            marginRight:'10px',
            minWidth:'auto',
        }
    },
    "& label": {
      minWidth:'80px',
      transform: "translate(0, 1.5px) scale(1.1)",
    },
    "& span": {
      color: "red",
    },
  },
  
}));

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState({open:false,type:'success',msg:'上传成功!'});
  const [currency, setCurrency] = React.useState("EUR");//视频系列
  const [videoTitle,setVideoTitle] = React.useState(null);//视频标题
  const [videodescription,setVideodescription] = React.useState(null);//视频描述
  const [videosign,setVideosign] = React.useState(null);//视频标签
  const [file,setFile] = React.useState(null);//文件
  const [fileSrc,setFileSrc] = React.useState(null);//图片文件的临时路径
  const [currencies,setCurrencies]= React.useState([{
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },])
  const usersClass = usersStyles();
  const handleClickOpen = () => {//打开上传弹窗
    if(JSON.stringify(props.parent.props.parent.state.video_data)==="{}"){
        setOpenSnackbar({open:true,type:'error',msg:'亲！还没有添加文件呢！'})
        // return
    }
    setOpen(true);
  };
  const handleClose = () => {//关闭上传弹窗
    setOpen(false);
  };
// const snackbarOpen=()=>{

// }
const snackbarClose=()=>{//关闭提示
    setOpenSnackbar({open:false})
}

  const confimSubmit=()=>{//提交表单
        
        let _data = new FormData();
        console.log(_data)
        _data.set('model_name','video');
        _data.set('model_action','check');
        _data.set('model_type','');
        _data.set('task_id',123)
        if(!videoTitle){
            setOpenSnackbar({open:true,type:'error',msg:'标题不能为空!'})//error
            return
        }else{
            _data.set('title',videoTitle);
        };
        if(!videodescription){
            setOpenSnackbar({open:true,type:'error',msg:'描述不能为空!'})
            return
        }else{
            _data.set("description",videodescription);
        };
        if(!videosign||videosign.length<1){
            setOpenSnackbar({open:true,type:'error',msg:'请先择1个或多个标签!'})
        }else{
            _data.set('category',JSON.stringify(videosign))
        };
       if(file){
           _data.set('image',file);
       };
       if(currency){
           _data.set('series_title',currency)
       }
       getData("api/v1/gateway",_data).then(res=>{
           console.log(res)
       })
        
  };
  const handleChange = (event) => {//添加系列
    setCurrency(event.target.value);
    
  };
  const titleChange=(event)=>{//添加标题
      setVideoTitle(event.target.value);
      
  };
  const descriptionChange =(event)=>{//添加描述
      setVideodescription(event.target.value);
     
  };
  const signChane = (event)=>{//添加标签
      let v_arr = [];
      let obj_arr = document.querySelectorAll('input[name="videoSign"]');
      for(let i=0;i<obj_arr.length;i++){
        if(obj_arr[i].checked){
            v_arr.push(obj_arr[i].value);
        }
      }
      if(v_arr.length>0){
        setVideosign(v_arr)
      }else{
        setVideosign(null)
      }
      
     
  };
  const fileChane=(event)=>{//添加文件
      let img_arr = event.target.files[0];
      let img_src='';
    if(window.createObjectURl !=undefined){
        img_src=window.createObjectURl(img_arr);
    }else if(window.URL!=undefined){
        img_src=window.URL.createObjectURL(img_arr);
    }else {
        img_src=window.webkitURL.createObjectURL(img_arr);
    }
    setFile(img_arr);setFileSrc(img_src)
      
        
  };

  return (
    <div>
      <NewBtn2 variant="outlined" color="primary" onClick={handleClickOpen}>
        上传视频
      </NewBtn2>
      <Dialog
       
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          上传视频
        </DialogTitle>
        <DialogContent dividers>
          <form id="updata_info" className={usersClass.root}>
            <div>
              <label>
                <span>*</span> 标题
              </label>
              <TextField
                required
                id="standard-required"
                variant="outlined"
                fullWidth
                onChange={titleChange}
              />
              <span title='一个引人注目的标题可以帮助您吸引观看者。在确定视频标题时，最好加入观众在查找类似视频时可能会使用的关键字。'>
                <ContactSupport />
              </span>
            </div>
            <div>
              <label>
                <span>*</span> 描述
              </label>
              <TextField
                required
                id="standard-required"
                rows={5}
                variant="outlined"
                multiline
                fullWidth
                onChange={descriptionChange}
              />
              <span title='在说明中加入适当的关键字，可以帮助观看者通过搜索更轻松地找到您的视频。您可以在说明中大致介绍视频的内容，并将关键字放在说明的开头部'>
                <ContactSupport />
              </span>
            </div>

            <div>
              <label>
                <span>*</span>添加标签
              </label>
              <p className='sign'>
                {[
                  "标签",
                  "标签",
                  "标签",
                  "标签",
                  "标签",
                  "标签",
                  "标签",
                  "标签",
                  "标签",
                  "标签",
                  "标签",
                ].map((value, inx) => (
                  <label key={inx}>
                    <input type="checkbox" name='videoSign' value={value+inx}  onChange={signChane}/>
                    {value}
                  </label>
                ))}
              </p>
              <span title='添加适当的标签，可以帮助观看者通过搜索更轻松地找到您的视频。'>
                <ContactSupport />
              </span>
            </div>
            <div>
              <label >
                封面图
              </label>
                <p>选择或上传一张可展示您视频内容的图片。好的缩略图能脱颖而出，吸引观看者的眼球。</p>
              
            </div>
            <div>
                <label></label>
                {fileSrc?(<div className='file'> 
                <img src={fileSrc} title='缩略图' alt='缩略图' />
                    <span className='delete'><Delete  onClick={()=>{
                        setFileSrc(null);setFile(null);
                        document.getElementById('coverfile').value='';
                    }} /></span>
                     </div>):(<i></i>)
                }
                
                <div className='file'>
                    <input type="file" name="file" id="coverfile" onChange={fileChane} />
                    <label htmlFor="coverfile"><Add /></label>
                </div>
                
            </div>
            <div>
              <label>播放系列</label>
              <p>
                将您的视频添加到一个或多个播放列表中。播放列表有助于观看者更快地发现您的内容。
              </p>
            </div>
            <div>
              <label></label>
              <TextField
                id="standard-select-currency-native"
                select
                value={currency}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
              >
                {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
               
              </TextField>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            取消
          </Button>
          <Button
            autoFocus
            onClick={confimSubmit}
            variant="contained"
            color="primary"
          >
            确定
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar.open} autoHideDuration={3000} onClose={snackbarClose} className={usersClass.snackbar}>
        <Alert onClose={snackbarClose} severity={openSnackbar.type}>
            {openSnackbar.msg}
        </Alert>
      
      </Snackbar>
    </div>
  );
}
