import React, { Component } from "react";

import {
  Slider,
  Grid,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import {

  SkipNext,
  SkipPrevious,
  PlayArrow,
  Pause,

  PhotoSizeSelectActual,
  
} from "@material-ui/icons";

import {
  getObj,
  getScroll,
  getPage,
  getWidth,
  getStyles,
} from "../../assets/js/totls";
import NewMenu from "./Menu/Menu";

import SliderTemplate from "./SliderTemplate/SliderTemplate";
import HeaderTemplate from "./Header/Header";
import TopAside from "./TopAside/TopAside";
import BottomAside from "./BottomAside/BottomAside";
import VideoChilden from "./VideoChilden";
import "./SliderTemplate/SliderTemplate.css";
import styles from "../../assets/css/video.module.css";
import {get_data} from "../../assets/js/request";
import dateConversion from "../../assets/js/dateConversion";
export default class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video_data: {},
      the_current: {}, //当前字幕
      status: false, //播放状态
      edi_show: false, //是否调起修改当前字幕弹窗
      is_suc: "",
      styles: {}, //页面中使用
      style: {}, //上传时使用
      video_img_arr: null,
      test_arr:null,
      scaleX:1
    };
    this.video_live = null;
    //绑定双击事件
    this.getChildrenMsg = this.getChildrenMsg.bind(this);
    this.get_top_inx = this.get_top_inx.bind(this);
    this.getUpfileUrl = this.getUpfileUrl.bind(this);
    this.parent_styles = this.parent_styles.bind(this);
    this.get_image = this.get_image.bind(this);
    this.context_focus = this.context_focus.bind(this);
    this.context_blur = this.context_blur.bind(this);
  }
  componentDidMount() {
    this.setState({
      video_h: getObj("myvideo").clientHeight,
    });
    getObj("max-box").style.height = document.body.clientHeight+'px';
      // getObj("gatsby-focus-wrapper").clientHeight + "px";

    // 调整滚动条宽度

    getObj("thumb").style.width =
      getWidth("edit-region", "sliderbox", "thumbbox") + "px";

    // this.get_data();
  }

  componentWillReceiveProps(nextState) {
    return true;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  // get_data() {
  //   //请求数据
  //   let video_data,
  //     _this = this;
  //   let _data = {
  //     model_action: "search",
  //     query_string: "",
  //     type: "global",
  //     video_ids: [],
  //   };
  //   get_data("videos", _data, "post").then((res) => {
  //     video_data = res.result_data[0];
  //     let _data = {
  //       video_data: video_data,
  //       sub_josn: video_data.subtitling,
  //       _path: video_data.video_path["720P"],
  //     };

  //     _this.setState({
  //       video_data: _data,
  //     });
  //   });
  // }
  getUpfileUrl(res) {
    //接收组件传递视频数据
    //
    let _data = this.state.video_data || {};
    if (res.subtitling) {
      _data.sub_josn = res.subtitling;
      _data._path = res.video_path;
    } else {
      _data._path = res.video_path;
      _data.video_id = res._id || res.video_id;
      _data.image_path = res.image_path;
    }
    if (_data.video_data) {
      delete _data.video_data;
    }
    this.setState({
      video_data: _data,
    });
    this.video_live.load();
    // this.video_live.play();
  }
  parent_styles(res) {
    //获取样式 writing-mode: vertical-rl; writing-mode: tb-lr;

    this.setState({ style: res });
    let _styles = this.state.styles || {};
    let align,
      textAlignLast,
      bold,
      u,
      i,
      family,
      size,
      vertical,
      spacing,
      line,
      color;
    if (res.align === 0) {
      (align = "inherit"), (textAlignLast = "inherit");
    } else if (res.align === 1) {
      align = "right";
    } else if (res.align === 2) {
      align = "center";
    } else if (res.align === 3) {
      align = "left";
    } else if (res.align === 4) {
      align = "justify";
      textAlignLast = "justify";
    }
    if (res.bold === -1) {
      bold = "bold";
    } else {
      bold = "normal";
    }
    if (res._u === -1) {
      u = "underline";
    } else {
      u = "none";
    }
    if (res._i === -1) {
      i = "italic";
    } else {
      i = "normal";
    }
    if (res.family) {
      family = res.family;
    } else {
      family = "inherit";
    }
    if (!res.size || res.size < 12) {
      size = "inherit";
    } else {
      size = res.size + "px";
    }
    if (res.spacing) {
      spacing = res.spacing + "px";
    } else {
      spacing = "normal";
    }
    if (res.line) {
      line = res.line + "px";
    } else {
      line = "normal";
    }
    if (res.vertical == 2) {
      // writing-mode: vertical-rl; writing-mode: tb-lr;
      vertical = "vertical-rl";
      // vertical1='tb-lr'
    } else if (res.vertical == 1) {
      vertical = "vertical-lr";
    } else {
      vertical = "horizontal-tb";
      // vertical1='horizontal-tb'
    }
    if (res.color) {
      color = "#" + res.color;
    } else {
      color = "inherit";
    }
    this.setState({
      styles: {
        color: color,
        textAlign: align,
        textAlignLast: textAlignLast,
        fontWeight: bold,
        textDecoration: u,
        fontStyle: i,
        fontSize: size,
        fontFamily: family,
        writingMode: vertical,
        lineHeight: line,
        letterSpacing: spacing,
      },
    });
  }
  get_image(res) {
    //图片集

    let total_time = this.video_live.duration;
    this.setState({
      the_current: {
        video_len: total_time,
        time: this.video_live.currentTime,
      },
      video_img_arr: res,
    });
    let _obj = getObj("image-box");
    
    let len = res.length;
    let img_str = "";
    let img_pos = "";
    let box_w =total_time*1000*110/2740;// getObj("sliderbox").scrollWidth;
    let img_w = box_w / (total_time-0.7);
    
    for (let i = 0; i < len-2; i++) {
      if (i == len - 3) {
        (img_str += "url(http://api.haetek.com:9191/" + res[i+2] + ") "),
          (img_pos += i * img_w + "px " +  "0px ");
      } else {
        (img_str += "url(http://api.haetek.com:9191/" + res[i+2] + "), "),
          (img_pos += i * img_w + "px " +  "0px, ");
      }
    }
    _obj.style["background-image"] = img_str;
    _obj.style.backgroundPosition = img_pos;
    _obj.style.backgroundSize = img_w + "px 46px";
    
  }
  getChildrenMsg(result, msg) {
    //滑块子件传参滑块位置过来，并且更新字幕
    // console.log(msg);
    this.video_live.currentTime = msg;
    this.sub_test(msg);
    return;
  }
  get_top_inx(result, value) {
    this.setState({
      top_inx: value,
    });
  }

  sub_test(time) {
    //更新字幕
    let _data = this.state.the_current||{};
    if (this.video_live.duration) {
      _data.video_len = this.video_live.duration;
      _data.time = time;
    }

    if (this.state.video_data.sub_josn && time > 0) {
      let json_sub = this.state.video_data.sub_josn;
      
      for (let i = 0; i < json_sub.length; i++) {
        if (time >= json_sub[i].bg && time <= json_sub[i].ed) {
          _data.zh = json_sub[i].cn_sub;
          _data.en = json_sub[i].en_sub;
          _data.time = time;
          _data.inx = i;
          // _data = {
          //   zh: json_sub[i].cn_sub,
          //   en: json_sub[i].en_sub,
          //   time: time,
          //   inx: i,
          // };
        }
        if (json_sub[i + 1]) {
          if (time > json_sub[i].ed && time < json_sub[i + 1].bg) {
            _data.zh='';
            _data.en='';
            _data.time=time;
            _data.inx=i;
            // _data = { zh: "", en: "", time: time, inx: i };
          }
        } else {
          if (time > json_sub[i].ed) {
            _data.zh='';
            _data.en='';
            _data.time=time;
            _data.inx=i;
            // _data = { zh: "", en: "", time: time, inx: i };
          }
        }
      }
    }
    
    this.setState({
      the_current: _data,
    });
  }
  context_focus(el, value) {
    
    el.target.className='normal';
    this.setState({
      top_inx: 2,
      status: false,
    });
    this.video_live.pause();
    this.video_live.currentTime=this.state.video_data.sub_josn[el.target.dataset.inx].bg;
    
   
  };
   context_blur(el) {
    
     el.target.classList.remove('normal')
    let _the_data = this.state.the_current, //当前，
      _video_data = this.state.video_data, //所有
      lang = el.target.dataset.lu,
      _inx = parseInt(el.target.dataset.inx);
      
    if (lang == "zh") {
      if (_the_data.zh !== el.target.innerText) {
        _the_data.zh = el.target.innerText;
        _video_data.sub_josn[_inx].cn_sub = el.target.innerText.toString();
      }
      if(_video_data.sub_josn[_inx].en_sub){
        _the_data.en=_video_data.sub_josn[_inx].en_sub;
      }
    } else {
      if (_the_data.en !== el.target.innerText) {
        _the_data.en = el.target.innerText;
        _video_data.sub_josn[_inx].en_sub = el.target.innerText.toString();
      }
      if(_video_data.sub_josn[_inx].cn_sub){
        the_data.cn = _video_data.sub_josn[_inx].cn_sub;
      }
    }
    this.setState({
      the_current: _the_data,
      video_data: _video_data,
    });
  };
  render() {
    const _this = this;
    const { video_data } = this.state;
    const on_ply = function() {
      //播放
      if (!_this.state.video_data._path) {
        // _this.state.is_suc
        // _this.setState({
        //   is_suc:'视频未加载完成'
        // });
        // setTimeout(() => {
        //   _this.setState({ is_suc: "" });
        // }, 3000);
        return;
      }
      if (_this.video_live.currentTime === 0) {
        _this.video_live.load();
      }
      _this.video_live.play();
      _this.setState({
        status: true,
      });
    };
    const on_pause = function() {
      //暂停
      _this.video_live.pause();
      _this.setState({
        status: false,
      });
    };
    const time_date = function(el) {
      //实时播放时间

      let time = el.target.currentTime;
     
      _this.sub_test(time);
    };
    const on_end = function() {
      //播放结束
      on_pause();
    };
    
   


    // const handleClose = function() {
    //   //取消编辑
    //   _this.setState({
    //     edi_show: false,
    //   });
    // };
    // const handleOpen = function() {
    //   //打开编辑
    //   _this.setState({
    //     edi_show: true,
    //   });
    // };
    // const handleServer = function() {
    //   //保存编辑
    //   let _the_data = _this.state.the_current, //当前，
    //     _video_data = _this.state.video_data, //所有
    //     _lu = _this.state.lu,
    //     _inx = _this.state.sub_inx;

    //   let _v = document.querySelector("#newTest").value;
    //   if (_lu == "zh") {
    //     _the_data.zh = _v;
    //     _video_data.sub_josn[_inx].cn_sub = _v;
    //   } else {
    //     _the_data.en = _v;
    //     _video_data.sub_josn[_inx].en_sub = _v;
    //   }
    //   let r_data = {
    //     model_action: "update",
    //     extra_data: {
    //       subtitling: _video_data.sub_josn,
    //       task_id: _video_data.video_id || _video_data.video_data.video_id, // task_id,
    //       lang: "en",
    //     },
    //   };
    //   get_data("video/subtitle", r_data, "post")
    //     .then((res) => {
    //       handleClose();
    //       _this.setState({
    //         the_current: _the_data,
    //         video_data: _video_data,
    //         is_suc: "suc",
    //       });
    //       setTimeout(() => {
    //         _this.setState({ is_suc: "" });
    //       }, 3000);
    //     })
    //     .catch((err) => {
    //       _this.setState({
    //         is_suc: "err",
    //       });
    //       setTimeout(() => {
    //         _this.setState({ is_suc: "" });
    //       }, 3000);
    //       handleClose();
    //     });
    // };

    let lists = [];
    for (let i = 0; i < 100; i++) {
      lists.push(
        <div className="mark-list" key={i}>
          <div className="mm"></div>
          <div className="mm"></div>
          <div className="mm"></div>
          <div className="mm"></div>
          <div className="mm"></div>
          <div className="mm"></div>
          <div className="mm"></div>
          <div className="mm"></div>
          <div className="mm"></div>
          <div className="mm"></div>
        </div>
      );
    }
    return (
      <div
        className={`${styles.elContainer} ${styles.isVertical} ${styles.maxBox}`}
        id="max-box"
      >
        <header className={styles.elHeader}>
          <HeaderTemplate parent={this} />
        </header>
        <main className={`${styles.elMain} ${styles.top}`}>
          <section className={styles.elContainer}>
            <aside className={styles.elAside}>
              <TopAside parent={this} />
            </aside>
            <main className={styles.elMain}>
              <div>
                <VideoChilden topInx={this.state.top_inx || 1} parent={this} />
              </div>
              <div>
                <section>
                  <div className={styles.video} id="myvideo">
                    <video
                      poster="http://seeker.haetek.com/houseonline/images/271581231610pic_hd13.png"
                      height={this.state.video_h}
                      ref={(node) => (this.video_live = node)}
                      onTimeUpdate={time_date}
                      onEnded={on_end}
                    >
                      {video_data._path ? (
                        <source src={video_data._path}></source>
                      ) : (
                        ""
                      )}
                    </video>
                    {_this.state.the_current.zh ? (
                      <div
                        className={`${styles.videoTest} ${styles.subtitles}`}
                        style={_this.state.styles}
                      >
                        <span
                          data-lu="zh"
                          data-inx={_this.state.the_current.inx}
                          
                          
                        >
                          {_this.state.the_current
                            ? _this.state.the_current.zh
                            : ""}
                        </span>
                            <br/>
                        <span
                          data-lu="en"
                          data-inx={_this.state.the_current.inx}
                         
                        >
                          {_this.state.the_current
                            ? _this.state.the_current.en
                            : ""}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <p>
                    <span>
                      <SkipPrevious />

                      {this.state.status ? (
                        <Pause onClick={on_pause} />
                      ) : (
                        <PlayArrow onClick={on_ply} />
                      )}

                      <SkipNext />
                    </span>
                    <span>
                      {_this.state.the_current
                        ? dateConversion(_this.state.the_current.time)
                        : 0}
                      /
                      {_this.state.the_current
                        ? dateConversion(_this.state.the_current.video_len)
                        : 0}
                    </span>
                  </p>
                </section>
              </div>
            </main>
          </section>
        </main>

        <footer className={`${styles.elFooter} ${styles.bottom}`}>
          <section className={styles.elContainer}>
            <aside className={styles.elAside}>
              <BottomAside />
            </aside>
            <main className={styles.elMain}>
              <section className={`${styles.elContainer} ${styles.isVertical}`}>
                <main
                  className={styles.elMain}
                  style={{ overflow: "hidden" }}
                  id="edit-region"
                >
                  <section
                    style={{ height: "100%", position: "absolute",transform:'scaleX('+this.state.scaleX+')' }}
                    id="sliderbox"
                  >
                    <div className={`${styles.slider} ${styles.clearfix}`}>
                      <SliderTemplate
                        value={this.state.the_current.time || 0}
                        parent={this}
                        length={
                          this.state.the_current
                            ? this.state.the_current.video_len
                            : 0
                        }
                      />
                    </div>
                    <div className={styles.videoImg} >图片</div>

                    <div
                      className={styles.videoImage}
                      id="image-box"
                     
                      onMouseOver={(e) => {
                        let _obj = getObj("new-menu");
                      
                        if (_this.state.video_img_arr) {
                          _obj.style.display = "block";
                          let x =
                            getPage(e).pageX -
                            getStyles("sliderbox", "transform") -
                            50 -
                            20;
                          
                          _obj.style.transform = "translateX(" + x + "px)";
                        }
                      }}
                      onMouseOut={() => {
                        getObj("new-menu").style.display = "none";
                      }}
                    >
                      <div id="new-menu" className={styles.newMenu}>
                        <NewMenu parent={this} />
                      </div>
                    </div>
                    <div className={styles.videoImg} id='video-test' >
                       {_this.state.test_arr?_this.state.test_arr:''}
                    </div>
                  </section>
                </main>

                <footer className={styles.elFooter} style={{ height: "24px" }}>
                  <div className={styles.bottomRight}>
                    <div className={styles.scroller} id="thumbbox">
                      <div
                        className={styles.scrollThumb}
                        id="thumb"
                        onMouseDown={(evt) => {
                          evt.stopPropagation();
                          evt.preventDefault();
                         
                          //  getObj('sliderbox').style.width=getObj('sliderbox').scrollWidth+'px';
                          getObj("thumb").style.width =
                            getWidth("edit-region", "sliderbox", "thumbbox") +
                            "px";
                          let obj = evt.target;
                          // edit-region, sliderbox,thumbbox,thumb

                          let x =
                            getPage(evt).pageX -
                            getStyles("thumb", "transform");
                          document.onmousemove = function(e) {
                            let barX = getPage(e).pageX - x;

                            barX = barX < 0 ? 0 : barX;
                            barX =
                              barX >
                              getObj("thumbbox").clientWidth - obj.clientWidth
                                ? getObj("thumbbox").clientWidth -
                                  obj.clientWidth
                                : barX;

                            obj.style.transform = "translateX(" + barX + "px)";

                            let contentMax =
                              getObj("sliderbox").scrollWidth -
                              getObj("edit-region").clientWidth;
                            let barMax =
                              getObj("thumbbox").clientWidth - obj.clientWidth;

                            let contentX = (barX / barMax) * contentMax;
                            getObj("sliderbox").style.transform =
                              "translateX(-" + contentX + "px)";
                          };
                          document.onmouseup = function() {
                            document.onmousemove = null;
                          };
                        }}
                      ></div>
                    </div>
                    <div className={styles.perBtns}>
                      <Grid container>
                        <Grid item style={{overflow:'hidden',width:'20px',height:'16px',margin:'0 5px',transform:'translate(-3px,8px)'}}>
                        <PhotoSizeSelectActual style={{color:'#25262c',backgroundColor:'white',transform: 'translate(-7px, -3px) scale(1.2)'}}/>
                        </Grid>
                        <Grid item xs style={{transform: 'translate(0px, 4px)',width: 'calc(100% - 54px)'}}>
                          <Slider
                            value={_this.state.scaleX}
                            step={0.01}
                            min={1}
                            max={3}
                            onChange ={(event,value)=>{
                              _this.setState({
                                scaleX:value
                              })
                              
                            }}
                          />
                        </Grid>
                        
                        <Grid item style={{overflow:'hidden' ,margin:'0 5px',transform: 'translate(0px, -2px)'}}>
                          
                          <PhotoSizeSelectActual style={{color:'#25262c',backgroundColor:'white',transform: 'translate(0px, 5px) scale(2)'}}/>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </footer>

                {/*
                
                  <div className={styles.videoImg}>图片</div>
                  <div className={styles.videoImage}>
                    <Image />
                  </div>
                    */}
              </section>
            </main>

            {/*<header className={styles.elHeader}>
              
            </header>

            <main className={styles.elMain}>
              <section className={styles.elContainer}>
                <aside className={styles.elAside}>
                  <BottomAside />
                </aside>

                <main className={styles.elMain}>
                 
                </main>
              </section>
            </main>
            <footer className={styles.elFooter}>
              
                  </footer>*/}
          </section>
        </footer>
      </div>
    );
  }
}
