import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  Button,
  TextField,
  Snackbar,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputAdornment
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ContactSupport, Add, Delete,Cancel} from "@material-ui/icons";
import { green } from '@material-ui/core/colors';
import Typography from "@material-ui/core/Typography";
import getData from "../../../assets/js/request";
import { isGoLogin } from "../../../assets/js/totls";
import { navigate } from "@reach/router";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor:'#eee',
    height:'56px'
    
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
  snackbar: {
    top:'40%',
    transform: "translate(-50%,-50%)",
  },
  radiogroup: {
    flexDirection: "row",
  },
  root: {
    width: "100%",
    fontSize: "14px",
    "& span":{
      display:'inline-block',
    },
    "& button":{
      padding:0
    },
    "& b":{
      fontWeight:400,
      display:'inline-block',
      // padding:'4px 12px',
      // backgroundColor:'#D3D3D3'
    },
    "& >div": {
      alignItems: "flex-start",
      "& .file": {
        width: "80px",
        height: "80px",
        position: "relative",
        margin: "0 5px",
        overflow: "hidden",
        border: "1px solid #ccc",
        display: "inline-block",
        "& input": {
          width: "100%",
          height: "100%",
        },
        "& .delete": {
          position: "absolute",
          top: 0,
          right: 0,
          color: "green",
          "& :hover": {
            color: "#ccc",
          },
        },
        "& img": {
          width: "100%",
          height: "100%",
          display: "block",
        },
        "& label": {
          width: "80px",
          height: "80px",
          display: "block",
          position: "absolute",
          left: 0,
          top: 0,
          backgroundColor: "#ccc",
          color: "#fff",
          lineHeight: "80px",
          textAlign: "center",
         
        },
      },
    },

    "& p": {
      margin: 0,
    },
    "& .sign": {
      backgroundColor: "#EEEEEE",
      padding:'12px',
      "& label": {
        display: "inline-block",
        margin:'6px',
        minWidth: "auto",
        // marginLeft:0,
        fontSize:'12px',
      },
    },
    "& label": {
      minWidth: "65px",
      transform: "translate(0, 1.5px) scale(1.1)",
    },
    "&  .item span": {
      color: "red",
      position:'relative',
      
      '& span':{
        display:'none',
        position:'absolute',
        right:'-10px',
        bottom:0,
        width:'397px',
        boxShadow:'0px 0px 2px 0px rgba(118,131,144,1)',
        color:'#666',
       transform:'translateY(100%)',
       zIndex:1000,
        padding:'16px',
        backgroundColor:'#fff',
        
      }
    },
    "& .MuiFormControlLabel-root ": {
      minWidth: "auto",
      '& .MuiRadio-root':{
        padding:0,
      }
    },
    '& .MuiOutlinedInput-input':{
      padding:'8px 6px',
      backgroundColor:'#fff'
    },
    '& .MuiOutlinedInput-multiline':{
      padding:'1px'
    },
    '& .MuiInputAdornment-root':{
      fontSize:'20px',
     color:'#D5D5D5'
    }
  },
}));

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    type: "success",
    msg: "上传成功!",
  });
  const [videoTitle, setVideoTitle] = React.useState(''); //视频标题
  const [videodescription, setVideodescription] = React.useState(''); //视频描述
  const [videosign, setVideosign] = React.useState([]); //视频标签
  const [file, setFile] = React.useState(null); //文件
  const [fileSrc, setFileSrc] = React.useState(''); //图片文件的临时路径
  const [currency, setCurrency] = React.useState(''); //视频系列
  const [addseries,setAddseries] = React.useState(false);//新建系列
  const [newseries,setNewseries] = React.useState('');//暂存新系列
  const [seriesdescription,setSeriesdescription] = React.useState('');//系列描述
  const [currencies, setCurrencies] = React.useState([]);
  const usersClass = usersStyles();
  const handleClickOpen = () => {
    //打开上传弹窗
    if (JSON.stringify(props.parent.props.parent.state.video_data) === "{}") {
      setOpenSnackbar({
        open: true,
        type: "error",
        msg: "亲！还没有添加文件呢！",
      });
      return;
    }
    getData("api/v1/gateway", {
      model_name: "series",
      model_action: "get_series",
      extra_data: {},
      model_type: "",
    }).then((res) => {
      if(res.err==0&&res.result_data.length>0){
        setCurrencies(res.result_data)
      }
      
    });

    setOpen(true);
  };
  const handleClose = () => {
    //关闭上传弹窗
    setOpen(false);
    setCurrency('');
    setVideoTitle('');
    setVideodescription('');
    setVideosign([]);
    setFile(null);
    setFileSrc('');
    setNewseries('');
  
  };

  const snackbarClose = () => {
    //关闭提示
    setOpenSnackbar({ open: false });
  };

  const confimSubmit = () => {
    //提交表单

    let _data = new FormData();

    _data.set("model_name", "video");
    _data.set("model_action", "check");
    _data.set("model_type", "");
    _data.set("task_id", props.parent.props.parent.state.video_data.video_id);
    if (!videoTitle) {
      setOpenSnackbar({ open: true, type: "error", msg: "标题不能为空!" }); //error
      return;
    } else {
      _data.set("title", videoTitle);
    }
    if (!videodescription) {
      setOpenSnackbar({ open: true, type: "error", msg: "描述不能为空!" });
      return;
    } else {
      _data.set("description", videodescription);
    }
    if (!videosign || videosign.length < 1) {
      setOpenSnackbar({
        open: true,
        type: "error",
        msg: "请先择1个或多个标签!",
      });
      return;
    } else {
      _data.set("category", JSON.stringify(videosign));
    }
    if (file) {
      _data.set("image", file);
    }
    if (currency) {
      _data.set("series_title", currency);
      if(seriesdescription){
        _data.set('description_title',seriesdescription);
      }
    }
    getData("api/v1/gateway", _data).then((res) => {
      console.log(res);
      if(res.err==0&&res.errmsg=='OK'){
        setOpenSnackbar({open:true,type:'success',msg:'提交成功,系统将会自动审核,个人中心将会看到此视频的实时状态!'});
        handleClose();
       
      }else{
        setOpenSnackbar({open:true,type:'error',msg:'网络出错'});
      }
    });
  };
  const handleChange = (event) => {
    //添加系列
    setCurrency(event.target.value);
    
  };
  const titleChange = (event) => {
    //添加标题
    setVideoTitle(event.target.value);
  };
  const descriptionChange = (event) => {
    //添加描述
    setVideodescription(event.target.value);
  };
  const signChane = (event) => {
    //添加标签
    let v_arr = [];
    let obj_arr = document.querySelectorAll('input[name="videoSign"]');
    for (let i = 0; i < obj_arr.length; i++) {
      if (obj_arr[i].checked) {
        v_arr.push(obj_arr[i].value);
      }
    }
    if (v_arr.length > 0) {
      setVideosign(v_arr);
    } else {
      setVideosign(null);
    }
  };
  const fileChane = (event) => {
    //添加文件
    let img_arr = event.target.files[0];
    let img_src = "";
    if (window.createObjectURl != undefined) {
      img_src = window.createObjectURl(img_arr);
    } else if (window.URL != undefined) {
      img_src = window.URL.createObjectURL(img_arr);
    } else {
      img_src = window.webkitURL.createObjectURL(img_arr);
    }
    setFile(img_arr);
    setFileSrc(img_src);
  };

  return (
    <div>
      <NewBtn2 variant="outlined" color="primary" onClick={handleClickOpen}>
        发布视频
      </NewBtn2>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          上传视频
        </DialogTitle>
        <DialogContent dividers>
          <form id="updata_info" className={usersClass.root}>
            <div className="item">
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
              <span>
                <ContactSupport />
                <span>一个引人注目的标题可以帮助您吸引观看者。在确定视频标<br/>题时，最好加入观众在查找类似视频时可能会使用的关键<br/>字。</span>
              </span>
            </div>
            <div className="item">
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
              <span >
                <ContactSupport />
                <span >在说明中加入适当的关键字，可以帮助观看者通过搜索更轻<br/>松地找到您的视频。您可以在说明中大致介绍视频的内容，<br/>并将关键字放在说明的开头部</span>
              </span>
            </div>

            <div className="item">
              <label>
                <span>*</span>添加标签
              </label>
              <p className="sign">
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
                    <input
                      type="checkbox"
                      name="videoSign"
                      value={value + inx}
                      onChange={signChane}
                    />
                    <b>{value}</b>
                    
                  </label>
                ))}
              </p>
              <span >
                <ContactSupport />
                <span>添加适当的标签，可以帮助观看者通过搜索更轻松地找到您的视频。</span>
              </span>
            </div>
            <div>
              <label>封面图</label>
              <section>
                <p>
                  选择或上传一张可展示您视频内容的图片。好的缩略图能脱颖而出，吸引观看者的眼球。
                </p>
                <div>
                  {props.parent.props.parent.state.video_data.image_path &&
                  !fileSrc ? (
                    <div className="file">
                      <img
                        src={
                          "http://api.haetek.com:9191/" +
                          props.parent.props.parent.state.video_data.image_path
                        }
                        title="缩略图"
                        alt="缩略图"
                      />
                    </div>
                  ) : (
                    <i></i>
                  )}
                  {fileSrc ? (
                    <div className="file">
                      <img src={fileSrc} title="缩略图" alt="缩略图" />
                      <span className="delete">
                        <Delete
                          onClick={() => {
                            setFileSrc('');
                            setFile(null);
                            document.getElementById("coverfile").value = "";
                          }}
                        />
                      </span>
                    </div>
                  ) : (
                    <i></i>
                  )}

                  <div className="file">
                    <input
                      type="file"
                      name="file"
                      id="coverfile"
                      onChange={fileChane}
                    />
                    <label htmlFor="coverfile">
                      <Add />
                    </label>
                  </div>
                </div>
              </section>
            </div>

            <div>
              <label>播放系列</label>
              <section>
                <p>
                  将您的视频添加到一个或多个播放列表中。播放列表有助于观看者更快地发现您的内容。
                </p>
                <section className='sign' style={{borderBottom:'1px solid #ccc'}}>
                {!addseries?(<Button color='primary' variant="contained" onClick={()=>{setAddseries(true)}}><add />新建</Button>):(
                  <section>
                    <TextField fullWidth type='text' label='系列标题' variant="outlined" value={newseries} 
                    onChange={(e)=>{
                      setNewseries(e.target.value)
                    }}  
                    InputProps={{endAdornment:<InputAdornment position='end'><Cancel  onClick={()=>{setNewseries('')}}/></InputAdornment> }}/>
                    <TextField
                    
                    rows={3}
                    variant="outlined"
                    multiline
                    fullWidth
                    value= {seriesdescription}
                    label='系列描述'
                    onChange={(event)=>{
                      setSeriesdescription(event.target.value)
                    }}
                  />
                    <DialogActions>
                      <Button  variant="contained" onClick={()=>{setAddseries(false)}}>取消</Button>
                      <Button color='primary' variant="contained" onClick={()=>{
                        let _data  = currencies;
                        if(_data.some((option)=>newseries==option.title)){
                          setOpenSnackbar({open:true,type:'error',msg:'新建系列失败，您所新建的系列已存在!'});
                          return
                        }
                        if(!seriesdescription){
                          setOpenSnackbar({open:true,type:'error',msg:'亲，新建了系列，系列描述不要忘记填写哦!'});
                          return
                        }
                        if(_data[_data.length-1].type){
                          _data[_data.length-1]={title:newseries,label:newseries,type:'new'}
                        }else{
                          _data.push({title:newseries,label:newseries,type:'new'});
                        }
                        
                        setCurrencies(_data);
                        setAddseries(false);
                      }}>确认</Button>
                    </DialogActions>
                  </section>
                )}
                </section>
                <section className="sign">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={currency}
                    onChange={handleChange}
                    className={usersClass.radiogroup}
                  >
                  
                    {currencies.map((option) => (
                      <FormControlLabel
                        key={option.title}
                        value={option.title}
                        label={option.title}
                        control={<Radio color='primary' />}
                      />
                    ))}
                  </RadioGroup>
                </section>
              </section>
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
            提交
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
      
        open={openSnackbar.open}
        autoHideDuration={3000}
        onClose={snackbarClose}
        className={usersClass.snackbar}
      >
        <Alert onClose={snackbarClose} severity={openSnackbar.type}>
          {openSnackbar.msg}
        </Alert>
      </Snackbar>
      {/*<Dialog open={true}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          添加系列
        </DialogTitle>
        <DialogContent dividers>
            <TextField  type='text' variant="outlined" fullWidth  placeholder='输入你要添加的系列名。'/>
        </DialogContent>
        <DialogActions>
        <Button>取消</Button><Button>确定</Button>
        </DialogActions>
                </Dialog>*/}
    </div>
  );
}
