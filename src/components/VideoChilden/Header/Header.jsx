import React, { Component } from "react";
import styles from "./Header.module.css";
import { navigate } from "@reach/router";

import {
  Button,
  Avatar,
  Snackbar,
  Dialog,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { Save, AccountCircle ,CloseIcon} from "@material-ui/icons";
import getData from "../../../assets/js/request";
import { getUser } from "../../../services/auth";
import { node } from "prop-types";

const NewBtn = withStyles({
  root: {
    backgroundColor: "#2E2E30",
    color: "#fff",
    "border-radius": "16px",
    width: "140px",
    height: "32px",
    "line-height": 0,
  },
})(Button);
const NewBtn2 = withStyles({
  root: {
    backgroundColor: "#007CFF",
  },
})(NewBtn);


 
  // const handleClick = () => {
  //   setOpen(true);
  // };
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };
 


export default class  Header extends Component {
  constructor(props) {
    super(props);
    this.state={open_updata:false,open:false};
    this.btn_user = this.btn_user.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (getUser().name) {
      this.setState({
        user_info: getUser()
      })
    }
  }
  
  btn_user = function (info) {
    
    if (!getUser().name) {
      localStorage.setItem(
        "no_login_page",
        window.location.href
      );
      // console.log(_host,__dirname,__filename,window.location.href)
        // console.log(window.location)
        navigate(`/users/login`)
      // window.location.href = __dirname+ "users/login";
    
    } else {
      navigate(`/users`)
      // window.location.href = __dirname + "users";
    }
  };

  render() {
    let _this = this;

  const handleClose=()=>{
    this.setState({open:false})
  }


    const btn_save = function (el) {
      // "Default,Arial,16,&Hffffff,&Hffffff,&H0,&H0,0,0,0,  0,100,100, 0, 0,1,1,0,2,10,10,10,0";
      //Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
    
      let _video_data = _this.props.parent.state.video_data;
        if(JSON.stringify(_video_data) ==='{}'){
          return
        }
      
      let _styles = _this.props.parent.state.style;
      let bold = _styles.bold,
        i = _styles._i,
        u = _styles._u,
        fontName = _styles.family,
        color =_styles.color? "&H" + _styles.color.substring(1):'',
        size = parseInt(_styles.size),
        spacing = _styles.spacing,
        name = "MD",
        line = _styles.line,
        alignment = _styles.align > 3 ? 0 : _styles.align;
      // console.log(_styles);
      // let style = 'Style:Default,Arial,'+_styles.fontSize+',&H'+_styles.color.substring(1)+',&Hffffff,&H0,&H0,0,0,0,0,100,100,0,0,1,1,0,2,10,10,10,0\n'
      let style =
        "Style:" +
        name +
        "," +
        fontName +
        "," +
        size +
        "," +
        color +
        ",&Hffffff,&H0,&H0," +
        bold +
        "," +
        i +
        "," +
        u +
        ",0,100,100," +
        spacing +
        ",0,1,1,0," +
        alignment +
        ",10,10,10,0";
      let r_data = {
        
        "model_name":"video",
        "model_action":"update_subtitle",
        extra_data: {
          subtitling: _video_data.sub_josn,
          task_id: _video_data.video_id || _video_data.video_data.video_id, // task_id,
          style: style,
          lang: "en",
        },
        "model_type":""
      };
      getData("api/v1/gateway", r_data, "post").then((res) => {
        console.log(res);
        _this.setState({open:true})
      });
    };

    return (
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <span>Z</span>
            <span>ZhiQing</span>
          </div>
          <div>
            <NewBtn> 我的创作中心</NewBtn>
          </div>
          <div>
            <span>使用教程</span>
          </div>
        </div>
        <div>
          <div>
            <NewBtn2 variant="contained" onClick={()=>{this.setState({open_updata:true})}}>发布视频</NewBtn2>
          </div>
          <div title="点击可保存你编辑文本样式">
            <Save className={styles.save} onClick={btn_save} />{" "}
          </div>
          <div className={styles.users} onClick={this.btn_user}>
            {this.state.user_info ? (<div><Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
            <span>{this.state.user_info.name}</span></div>): (<Avatar />)}

          </div>
        </div>
        <Dialog open={this.state.open_updata}>
          <div className={styles.dialogUpdata}>
            <DialogTitle>上传视频</DialogTitle>
            <form id='updata_info'>
         
                <div>
                    <label htmlFor='title'><span>*</span>标题</label>
                    <input type='text' name='title'  id='title' required/>
                </div>
                <div>
                <label htmlFor='describe'><span>*</span>描述</label>
                <textarea type='text' name='describe'  id='describe' required></textarea>
                
                </div>
                <div>
                  <label><span>*</span>添加标签</label>
                   <p>
                    {['标签1','标签1','标签1','标签1','标签1','标签1','标签1','标签1','标签1','标签1','标签1'].map((value,inx)=>(<label key={inx}>
                      <input type='checkbox' />{value}</label>))}
                      </p>
                </div>
                <div>
                      <label htmlFor='file'><span>*</span>缩略图</label>
                      <input type='file' name='file' id = 'file' />
                  </div>
                  <div>
                   <label >播放列表</label>
                    <select name='list'>
                      <option>--</option>
                    </select>
                  </div>
                  <div>
                   <Button variant="contained" onClick={()=>{this.setState({open_updata:false})}}>取消</Button>&nbsp;&nbsp;<Button variant="contained" color="primary">继续</Button>
                  </div>
               

            </form>
          </div>
        </Dialog>

        <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Note archived"
       
      />


      </header>
    );
  }
}
