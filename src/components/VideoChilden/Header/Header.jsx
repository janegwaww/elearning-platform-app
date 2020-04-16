import React, { Component } from "react";
import styles from "./Header.module.css";
import {Button,Avatar} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {Save} from '@material-ui/icons';
import getData from "../../../assets/js/request";

const NewBtn = withStyles({
  root:{
    backgroundColor:'#2E2E30',
    color:'#fff',
    'border-radius':'16px',
    width:'140px',
    height:'32px',
   'line-height':0
  }
})(Button)
const NewBtn2 = withStyles({
  root:{
    backgroundColor:'#007CFF'
  }
})(NewBtn)

export default class Header extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
      let _this = this;
      const btn_save=function(el){
        // "Default,Arial,16,&Hffffff,&Hffffff,&H0,&H0,0,0,0,  0,100,100, 0, 0,1,1,0,2,10,10,10,0";
        //Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
     
        let _video_data=_this.props.parent.state.video_data;
        let _styles = _this.props.parent.state.style;
        let bold = _styles.bold,i = _styles._i,u=_styles._u,fontName = _styles.family,color='&H'+_styles.color.substring(1),
           size = parseInt(_styles.size),spacing = _styles.spacing,name='MD',line=_styles.line,alignment =_styles.align>3?0:_styles.align;
        console.log(_styles)
       // let style = 'Style:Default,Arial,'+_styles.fontSize+',&H'+_styles.color.substring(1)+',&Hffffff,&H0,&H0,0,0,0,0,100,100,0,0,1,1,0,2,10,10,10,0\n'
        let style='Style:'+name+','+fontName+','+size+','+color+',&Hffffff,&H0,&H0,'+bold+','+i+','+u+',0,100,100,'+spacing+',0,1,1,0,'+alignment+',10,10,10,0'
      
        let r_data = {
          model_action: "update",
          extra_data: {
            subtitling: _video_data.sub_josn,
            task_id: _video_data.video_id || _video_data.video_data.video_id, // task_id,
            style:style,
            lang:'en'
          },
        };
        getData("video/subtitle", r_data, "post").then(res=>{
          console.log(res)
        }) 

      }


    return (
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <span>Z</span>
            <span>ZhiQing</span>
          </div>
          <div>
            <NewBtn > 我的创作中心</NewBtn>
          </div>
          <div>
            <span>使用教程</span>
          </div>
        </div>
        <div>
          <div>
            <NewBtn2 variant="contained" >发布视频</NewBtn2>
          </div>
          <div title='点击可保存你编辑文本样式'><Save className={styles.save} onClick={btn_save}  /> </div>
          <div className={styles.users}>
                <Avatar src='https://material-ui.com/static/images/avatar/1.jpg' />
                <span>123..</span>
          </div>
        </div>
      </header>
    );
  }
}
