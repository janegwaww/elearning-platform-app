import React, { Component } from "react";

import { Slider, Grid } from "@material-ui/core";

import {
  SkipNext,
  SkipPrevious,
  PlayArrow,
  Pause,
  PhotoSizeSelectActual,
} from "@material-ui/icons";

import { getObj, getPage, getWidth, getStyles } from "../../assets/js/totls";
import NewMenu from "./Menu/Menu";

import SliderTemplate from "./SliderTemplate/SliderTemplate";
import HeaderTemplate from "./Header/Header";
import TopAside from "./TopAside/TopAside";
import BottomAside from "./BottomAside/BottomAside";
import VideoChilden from "./VideoChilden";
import "./SliderTemplate/SliderTemplate.css";
import styles from "../../assets/css/video.module.css";
import { get_data } from "../../assets/js/request";
import dateConversion from "../../assets/js/dateConversion";
export default class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video_data: {},
      now_current: {},
      the_current: {}, //当前字幕
      status: false, //播放状态
      edi_show: false, //是否调起修改当前字幕弹窗
      is_suc: "",
      styles: {}, //页面中使用
      style: {}, //上传时使用
      video_img_arr: null,
      test_arr: null,
      scaleX: 1,
      // total_scroll_width: 4070,
      is_play_now: false,

      video_bottom_slider:0,
      a_few_screen:1,//移動幾屏
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
    this.context_input = this.context_input.bind(this);
    this.now_play = this.now_play.bind(this);
    this.cueing = this.cueing.bind(this);
  }
  componentDidMount() {
    this.setState({
      video_h: getObj("myvideo").clientHeight,
    });

    getObj("max-box").style.height =
      document.documentElement.offsetHeight - 1 + "px";
    window.onresize = (evnt) => {
      getObj("max-box").style.height =
        document.documentElement.offsetHeight - 1 + "px";
    };

    // getObj("gatsby-focus-wrapper").clientHeight + "px";

    // 调整滚动条宽度

    getObj("thumb").style.width =
      getWidth("edit-region", "sliderbox", "thumbbox") + "px";

    if (sessionStorage.getItem("file_data")) {
      let _data = JSON.parse(sessionStorage.getItem("file_data"));
      this.setState({
        video_data: _data,
      });

      // this.video_live.load();
      // if(_data.sub_josn){
      //   this.cueing(_data.video_data:sub_josn);
      // }
    }

    document.onkeydown = (ev) => {
      if (ev.keyCode === 32) {
        if (this.video_live.paused) {
          this.video_live.play();
          this.setState({
            status: true,
            is_play_now: false,
          });
        } else {
          this.video_live.pause();
          this.setState({
            status: false,
          });
        }
      }
    };
  }

  componentWillUnmount() {
    window.onresize = null;
    document.onkeydown = null;
  }
  cueing(textArr) {
    let total_time = this.video_live.duration;
    let test_arr = [];
    let total_w = ((total_time * 1000) / 2740) * 110; // getObj('sliderbox').scrollWidth;
    let json_sub = textArr;
    console.log(total_w, total_time);
    // console.log(total_time*1000/total_w)//每px占的毫秒
    for (let i = 0; i < json_sub.length; i++) {
      if (i === 0) {
        test_arr.push(
          <div
            className="test-nodes"
            key={i}
            style={{
              width:
                (json_sub[i].ed - json_sub[i].bg) *
                  1000 *
                  (total_w / (total_time * 1000)) +
                "px",
              marginLeft:
                (total_w / total_time / 1000) * json_sub[i].bg * 1000 + "px",
            }}
          >
            <p
              onBlur={this.context_blur}
              suppressContentEditableWarning="true"
              onFocus={this.context_focus}
              onInput={this.context_input}
              data-type="bottom"
              data-lu="zh"
              data-inx={i}
              contentEditable="true"
              title="点击文字可编辑"
            >
              {json_sub[i].cn_sub}
            </p>
            {json_sub[i].en_sub ? (
              <p
                data-lu="en"
                onBlur={this.context_blur}
                onInput={this.context_input}
                data-type="bottom"
                suppressContentEditableWarning="true"
                onFocus={this.context_focus}
                data-inx={i}
                contentEditable="true"
                title="点击文字可编辑"
              >
                {json_sub[i].en_sub}
              </p>
            ) : (
              ""
            )}
            <span title="播放當前段" data-inx={i} onClick={this.now_play}>
              <PlayArrow />
            </span>
          </div>
        );
      } else {
        test_arr.push(
          <div
            className="test-nodes"
            key={i}
            style={{
              width:
                (json_sub[i].ed - json_sub[i].bg) *
                  1000 *
                  (total_w / (total_time * 1000)) +
                "px",
              marginLeft:
                (total_w / total_time / 1000) *
                  (json_sub[i].bg - json_sub[i - 1].ed) *
                  1000 +
                1 +
                "px",
            }}
          >
            <p
              contentEditable="true"
              data-lu="zh"
              data-inx={i}
              onInput={this.context_input}
              data-type="bottom"
              onBlur={this.context_blur}
              suppressContentEditableWarning="true"
              onFocus={this.context_focus}
              title="点击文字可编辑"
            >
              {json_sub[i].cn_sub}
            </p>
            {json_sub[i].en_sub ? (
              <p
                data-lu="en"
                data-inx={i}
                onBlur={this.context_blur}
                onInput={this.context_input}
                data-type="bottom"
                suppressContentEditableWarning="true"
                onFocus={this.context_focus}
                contentEditable="true"
                title="点击文字可编辑"
              >
                {json_sub[i].en_sub}
              </p>
            ) : (
              ""
            )}
            <span title="播放當前段" data-inx={i} onClick={this.now_play}>
              <PlayArrow />
            </span>
          </div>
        );
      }
    }

    this.setState({
      test_arr: test_arr,
    });
  }
  getUpfileUrl(res) {
    //接收组件传递视频数据
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
    sessionStorage.setItem("file_data", JSON.stringify(_data));
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
    // console.log(this.state.video_data.sub_josn)
    if (this.state.video_data.sub_josn) {
      this.cueing(this.state.video_data.sub_josn);
    }
    let _obj = getObj("image-box");

    let len = res.length;
    let img_str = "";
    let img_pos = "";
    let box_w = (total_time * 1000 * 110) / 2740; // getObj("sliderbox").scrollWidth;
    let img_w = box_w / (total_time - 0.7);

    for (let i = 0; i < len - 2; i++) {
      if (i == len - 3) {
        (img_str += "url(http://api.haetek.com:9191/" + res[i + 2] + ") "),
          (img_pos += i * img_w + "px " + "0px ");
      } else {
        (img_str += "url(http://api.haetek.com:9191/" + res[i + 2] + "), "),
          (img_pos += i * img_w + "px " + "0px, ");
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
    let _data = this.state.the_current || {};
    if (this.video_live.duration) {
      _data.video_len = this.video_live.duration;
      _data.time = time;
    }

    if (this.state.video_data.sub_josn) {
      //去掉了&&time>0
      let json_sub = this.state.video_data.sub_josn;

      for (let i = 0; i < json_sub.length; i++) {
        if (time >= json_sub[i].bg && time <= json_sub[i].ed) {
          _data.zh = json_sub[i].cn_sub;
          _data.en = json_sub[i].en_sub;
          _data.time = time;
          _data.inx = i;
          _data.start_time = json_sub[i].bg;
          _data.end_time = json_sub[i].ed;
          // _data = {
          //   zh: json_sub[i].cn_sub,
          //   en: json_sub[i].en_sub,
          //   time: time,
          //   inx: i,
          // };
        }
        if (json_sub[i + 1]) {
          if (time > json_sub[i].ed && time < json_sub[i + 1].bg) {
            _data.zh = "";
            _data.en = "";
            _data.time = time;
            _data.inx = i;
            _data.start_time = json_sub[i].bg;
            _data.end_time = json_sub[i].ed;
            // _data = { zh: "", en: "", time: time, inx: i };
          }
        } else {
          if (time > json_sub[i].ed) {
            _data.zh = "";
            _data.en = "";
            _data.time = time;
            _data.inx = i;
            _data.start_time = json_sub[i].bg;
            _data.end_time = json_sub[i].ed;
            // _data = { zh: "", en: "", time: time, inx: i };
          }
        }
      }
    }

    this.setState({
      the_current: _data,
    });
  }
  now_play(ev) {
    let _video = JSON.parse(JSON.stringify(this.state.video_data));
    let _data = ev.target.dataset;
    let _now_data = JSON.parse(JSON.stringify(this.state.the_current));
    let _new_data = {};
    if (JSON.stringify(_data) == "{}") {
      _data = ev.target.parentNode.dataset;
      if (JSON.stringify(_data) == "{}") {
        _data = ev.target.parentNode.parentNode.dataset;
      }
    }
    _new_data.video_len = _now_data.video_len;
    _new_data.inx = parseInt(_data.inx);
    _new_data.end_time = _video.sub_josn[_data.inx].ed;
    _new_data.time = _video.sub_josn[_data.inx].bg;
    _new_data.start_time = _video.sub_josn[_data.inx].bg;
    _new_data.en = _video.sub_josn[_data.inx].en_sub;
    _new_data.zh = _video.sub_josn[_data.inx].cn_sub;
    this.video_live.currentTime = _new_data.start_time;
    this.video_live.play();
    this.setState({
      the_current: _new_data,
      status: true,
      is_play_now: true,
    });
  }
  context_focus(el, value) {
    el.target.className = "normal";
    this.setState({
      // top_inx: 2,// 暂时不用文字编辑，屏蔽
      status: false,
    });
    this.video_live.pause();
    this.video_live.currentTime = this.state.video_data.sub_josn[
      el.target.dataset.inx
    ].bg;
    this.sub_test(this.state.video_data.sub_josn[el.target.dataset.inx].bg);
    // console.log(this.state.the_current)
  }
  context_input(el) {
    let _the_data = JSON.parse(JSON.stringify(this.state.the_current)), //当前，
      _video_data = this.state.video_data, //所有
      lang = el.target.dataset.lu,
      _inx = parseInt(el.target.dataset.inx),
      _type = el.target.dataset.type;

    if (_type == "top") {
      if (lang == "zh") {
        if (_the_data.zh !== el.target.innerText) {
          // _the_data.zh = el.target.innerText;
          _video_data.sub_josn[_inx].cn_sub = el.target.innerText.toString();
        }
      } else {
        if (_the_data.en !== el.target.innerText) {
          // _the_data.en = el.target.innerText;
          _video_data.sub_josn[_inx].en_sub = el.target.innerText.toString();
        }
      }

      this.setState({
        // the_current: _the_data,
        video_data: _video_data,
      });
      this.cueing(_video_data.sub_josn);
    } else {
      if (lang == "zh") {
        if (_the_data.zh !== el.target.innerText) {
          _the_data.zh = el.target.innerText;
          // _video_data.sub_josn[_inx].cn_sub = el.target.innerText.toString();
        }
      } else {
        if (_the_data.en !== el.target.innerText) {
          _the_data.en = el.target.innerText;
          // _video_data.sub_josn[_inx].en_sub = el.target.innerText.toString();
        }
      }
      this.setState({
        the_current: _the_data,
      });
    }
  }
  context_blur(el) {
    el.target.classList.remove("normal");

    let _the_data = this.state.the_current, //当前，
      _video_data = this.state.video_data, //所有
      lang = el.target.dataset.lu,
      _inx = parseInt(el.target.dataset.inx);

    if (lang == "zh") {
      if (_the_data.zh !== el.target.innerText) {
        _the_data.zh = el.target.innerText;
        _video_data.sub_josn[_inx].cn_sub = el.target.innerText.toString();
      }
      if (_video_data.sub_josn[_inx].en_sub) {
        _the_data.en = _video_data.sub_josn[_inx].en_sub;
      }
    } else {
      if (_the_data.en !== el.target.innerText) {
        _the_data.en = el.target.innerText;
        _video_data.sub_josn[_inx].en_sub = el.target.innerText.toString();
      }
      if (_video_data.sub_josn[_inx].cn_sub) {
        _the_data.cn = _video_data.sub_josn[_inx].cn_sub;
      }
    }
    console.log(_the_data);
    this.setState({
      the_current: _the_data,
      video_data: _video_data,
    });
  }
  render() {
    const _this = this;
    const { video_data } = this.state;
    const on_ply = function() {
      //播放
      if (!_this.state.video_data._path) {
        return;
      }
      if (_this.video_live.currentTime === 0) {
        _this.video_live.load();
      }
      _this.video_live.play();
      _this.setState({
        status: true,
        is_play_now: false,
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
      let _data = _this.state.the_current;
      if (_this.state.is_play_now) {
        if (time >= _this.state.the_current.end_time) {
          _this.video_live.currentTime = _this.state.the_current.start_time;

          on_end();
          return;
        }
      }
     
      _data.time = time;
      
      _this.setState({
        the_current: _data,
        video_bottom_slider:getObj('video-bottom-slider').clientWidth/_this.state.the_current.video_len*time
      });
      let box_w =parseInt( getStyles('edit-region','width').split('p')[0]);
      let box_w_off = getObj('sliderbox').clientWidth/_this.state.the_current.video_len*time;
     
       let _num =Math.floor( box_w_off/box_w );
    
      
        getObj('sliderbox').style.transform='translate(-'+box_w*_num+'px)';
      
      _this.sub_test(time);
    };
    const on_end = function() {
      //播放结束
      on_pause();
    };

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
                          data-type="top"
                          onBlur={_this.context_blur}
                          suppressContentEditableWarning="true"
                          onFocus={_this.context_focus}
                          onInput={_this.context_input}
                          contentEditable="true"
                        >
                          {_this.state.the_current
                            ? _this.state.the_current.zh
                            : ""}
                        </span>
                        <br />
                        <span
                          data-lu="en"
                          data-type="top"
                          data-inx={_this.state.the_current.inx}
                          onBlur={_this.context_blur}
                          onInput={_this.context_input}
                          suppressContentEditableWarning="true"
                          onFocus={_this.context_focus}
                          contentEditable="true"
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
                      {this.state.status ? (
                        <Pause onClick={on_pause} />
                      ) : (
                        <PlayArrow onClick={on_ply} />
                      )}
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
                  {this.state.the_current ? (
                    <p
                      className="all-width"
                      id='video-bottom-slider'
                      style={{
                       
                        height: 5,
                        backgroundColor: "#ccc",
                      }}
                    >
                    <span style={{
                      display: "inline-block",
                      position: "absolute",
                      top:0,
                      left:0,
                      backgroundColor:'red',
                      // width:12,
                      height:5,
                      transition:'all 0.3s',
                      width:this.state.video_bottom_slider-10<0?0+'px':this.state.video_bottom_slider-10+'px'
                    }}></span>
                      <span
                      id="video-bottom-slider-block"
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "green",
                          position: "absolute",
                          top:'50%',
                          transform: 'translateY(-50%)',
                          transition:'all 0.3s',
                          left:this.state.video_bottom_slider-10+'px',
                        }}
                      ></span>
                    </p>
                  ) : (
                    ""
                  )}
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
                  <div
                    className={`${styles.btn} ${styles.btnPrve}`}
                    onClick={(ev) => {
                      let _w =
                        getWidth("edit-region", "sliderbox", "thumbbox") *
                        this.state.scaleX;
                      getObj("thumb").style.width = _w + "px";
                      let x = getStyles("thumb", "transform"); //当前的偏移量
                      let barX = x - getObj("edit-region").clientWidth / 2 - 10; //将要移动的量
                      let barMax = getObj("thumbbox").clientWidth - _w; //滚动条可以位移的位置
                      if (barX <= 0) {
                        barX = 0;
                      }
                      getObj("thumb").style.transform =
                        "translateX(" + barX + "px)";
                      let contentMax = //sliderbox 可以移的位置
                        getObj("sliderbox").clientWidth -
                        getObj("edit-region").clientWidth;

                      let contentX = (barX / barMax) * contentMax;
                      getObj("sliderbox").style.transform =
                        "translateX(-" + contentX + "px)";
                    }}
                  >
                    <SkipPrevious />
                  </div>
                  <div
                    className={`${styles.btn} ${styles.btnNext}`}
                    onClick={(ev) => {
                      let _w =
                        getWidth("edit-region", "sliderbox", "thumbbox") *
                        this.state.scaleX;
                      getObj("thumb").style.width = _w + "px";

                      // edit-region, sliderbox,thumbbox,thumb
                      let x = getStyles("thumb", "transform"); //当前的偏移量
                      let barX = x + getObj("edit-region").clientWidth / 2 - 10; //将要移动的量

                      let barMax = getObj("thumbbox").clientWidth - _w; //滚动条可以位移的位置
                      if (barX > barMax) {
                        barX = barMax;
                      }
                      getObj("thumb").style.transform =
                        "translateX(" + barX + "px)";
                      let contentMax = //sliderbox 可以移的位置
                        getObj("sliderbox").clientWidth -
                        getObj("edit-region").clientWidth;

                      let contentX = (barX / barMax) * contentMax;
                      getObj("sliderbox").style.transform =
                        "translateX(-" + contentX + "px)";
                    }}
                  >
                    <SkipNext />
                  </div>
                  <section
                    style={{ height: "100%", position: "absolute" }}
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
                    <div className={styles.videoImg}></div>

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
                    <div className={styles.videoImg} id="video-test">
                      {_this.state.test_arr ? _this.state.test_arr : ""}
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
                          // evt.stopPropagation();
                          // evt.preventDefault();
                          // getObj('sliderbox').style.width=parseFloat( getStyles('mark','width').split('p'))*this.state.scaleX+'px';
                          // console.log(getStyles('mark','width').split('p'))
                          //  getObj('sliderbox').style.width=getObj('sliderbox').scrollWidth+'px';
                          getObj("thumb").style.width =
                            getWidth("edit-region", "sliderbox", "thumbbox") *
                              this.state.scaleX +
                            "px";

                          // console.log(getWidth("edit-region", "mark", "thumbbox"))
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

                            // let contentMax =
                            //   getObj("sliderbox").scrollWidth -
                            //   getObj("edit-region").clientWidth;
                            let contentMax =
                              getObj("sliderbox").clientWidth -
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
                        <Grid
                          item
                          style={{
                            overflow: "hidden",
                            width: "20px",
                            height: "16px",
                            margin: "0 5px",
                            transform: "translate(-3px,8px)",
                          }}
                        >
                          <PhotoSizeSelectActual
                            style={{
                              color: "#25262c",
                              backgroundColor: "white",
                              transform: "translate(-7px, -3px) scale(1.2)",
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs
                          style={{
                            transform: "translate(0px, 4px)",
                            width: "calc(100% - 54px)",
                          }}
                        >
                          <Slider
                            value={_this.state.scaleX}
                            step={0.01}
                            min={1}
                            max={3}
                            onChange={(event, value) => {
                              getObj("mark").style.left =
                                (getStyles("mark", "width").split("p")[0] *
                                  (value - 1)) /
                                  2 +
                                "px";
                              getObj("mark").style.transform =
                                "scaleX(" + value + ")";

                              // "scaleX(" + value + ") ";
                              // translateX("+getStyles('mark','width').split('p')[0]*(value-1)/4.925+'px)

                              getObj("image-box").style.transform =
                                "scale(" + value + ")";
                              getObj("image-box").style.left =
                                (getStyles("mark", "width").split("p")[0] *
                                  (value - 1)) /
                                  2 +
                                "px";
                              _this.setState({
                                scaleX: value,
                              });
                            }}
                          />
                        </Grid>

                        <Grid
                          item
                          style={{
                            overflow: "hidden",
                            margin: "0 5px",
                            transform: "translate(0px, -2px)",
                          }}
                        >
                          <PhotoSizeSelectActual
                            style={{
                              color: "#25262c",
                              backgroundColor: "white",
                              transform: "translate(0px, 5px) scale(2)",
                            }}
                          />
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
