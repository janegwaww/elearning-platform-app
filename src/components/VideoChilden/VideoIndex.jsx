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

import "./SliderTemplate/SliderTemplate.css";
import styles from "../../assets/css/video.module.css";
import { get_data } from "../../assets/js/request";
import dateConversion from "../../assets/js/dateConversion";
import Uploder from "./Uploader/Uploader";
import videoImg from "../../assets/img/videowindows.svg";
import videoImg2 from "../../assets/img/videowindows2.svg";
import transitionImg from "../../assets/img/transition.svg";

// import viderPlay from '../../assets/img/play.svg';
export default class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      depth_of_field: true, //视频显示边框景深
      video_w: 0, //当前视频的宽度
      video_h: 0, //当前视频的高度
      t_w: 0, //当前屏幕的宽度
      video_data: {},
      is_edit: false, //true 显示编辑区
      lang: 1, //1 中文，2中英文，3英文
      // now_current: {},
      the_current: {}, //当前字幕
      status: false, //播放状态
      // edi_show: false, //是否调起修改当前字幕弹窗
      // is_suc: "",
      // styles: {}, //页面中使用
      // style: {}, //上传时使用
      // video_img_arr: null,
      test_arr: null,
      // scaleX: 1,

      is_play_now: false,

      video_bottom_slider: 0,
      a_few_screen: 1, //移動幾屏
      sliderbox_width: 0,
      sliderbox_off_x: 0,
      thumbbox_width: 0,
      thumb_off_x: 0,
    };
    this.video_live = null;
    //绑定双击事件
    this.getChildrenMsg = this.getChildrenMsg.bind(this);
    // this.get_top_inx = this.get_top_inx.bind(this);
    this.getUpfileUrl = this.getUpfileUrl.bind(this);
    // this.parent_styles = this.parent_styles.bind(this);
    this.get_image = this.get_image.bind(this);
    this.context_focus = this.context_focus.bind(this);
    this.context_blur = this.context_blur.bind(this);
    this.context_input = this.context_input.bind(this);
    this.now_play = this.now_play.bind(this); //播放当前段
    this.cueing = this.cueing.bind(this);
    this.video_w_h = this.video_w_h.bind(this);
    this.show_edit = this.show_edit.bind(this);
  }

  video_w_h() {
    let t_w = document.body.clientWidth;
    if (t_w < 1000) {
      t_w = 1000;
    }
    let scale = 880 / 1920;
    let num = t_w * scale;
    let num_h = (num / 16) * 9;

    getObj("max-box").style.height =
      document.documentElement.offsetHeight + "px";

    this.setState({
      video_w: num,
      video_h: num_h,
      t_w: t_w,
    });
  }

  componentDidMount() {
    let _this = this;
    _this.video_w_h();

    window.onresize = (evnt) => {
      _this.video_w_h();
    };

    // getObj("gatsby-focus-wrapper").clientHeight + "px";

    // 调整滚动条宽度

    // getObj("thumb").style.width =
    //   getWidth("edit-region", "sliderbox", "thumbbox") + "px";

    // if (sessionStorage.getItem("file_data")) {
    //   let _data = JSON.parse(sessionStorage.getItem("file_data"));
    //   this.setState({
    //     video_data: _data,
    //   });

    // this.video_live.load();

    // }

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
    let total_time = this.state.video_data.video_len;
    let test_arr = [];
    let total_w = this.state.sliderbox_width;
    let json_sub = textArr;
    //每px占的毫秒
    for (let i = 0; i < json_sub.length; i++) {
      let sub_w = (json_sub[i].ed - json_sub[i].bg) / (total_time / total_w);

      let sub_l = json_sub[i].bg / (total_time / total_w);

      test_arr.push(
        <div
          key={i}
          style={{
            width: sub_w + "px",
            transform: "translate(" + sub_l + "px,-50%)",
          }}
          className="test-nodes"
        >
          {(this.state.lang === 1 || this.state.lang === 2) ? (
            <div className={this.state.the_current.inx == i ? "active" : ""}>
              <p
                onBlur={this.context_blur}
                suppressContentEditableWarning="true"
                onFocus={this.context_focus}
                onInput={this.context_input}
                data-type="bottom"
                data-lu="zh"
                data-inx={i}
                contentEditable="true"
                title="此字段视频循环播放"
              >
                {json_sub[i].cn_sub}
              </p>
            </div>
          ):''}
          {(this.state.lang === 3|| this.state.lang === 2) ? (
          <div
            className={this.state.the_current.inx == i ? "active" : ""}
            style={{ marginTop: 30 }}
          >
            {json_sub[i].en_sub && (
              <p
                data-lu="en"
                onBlur={this.context_blur}
                onInput={this.context_input}
                data-type="bottom"
                suppressContentEditableWarning="true"
                onFocus={this.context_focus}
                data-inx={i}
                contentEditable="true"
                title="此字段视频可以循环播放"
              >
                {json_sub[i].en_sub}
              </p>
            )}
            </div>
            ):''}
            <div
              data-inx={i}
              style={{
                display: this.state.the_current.inx == i ? "block" : "none",
              }}
              onClick={this.now_play}
            >
              <span>
                {this.state.is_play_now ? "取消循环播放" : "此字段视频循环播放"}
              </span>
            
          </div>
        </div>
      );
    }

    // this.setState({
    //   test_arr: test_arr,
    // });
    return test_arr;
  }
  getUpfileUrl(res) {
    //接收组件传递视频数据
    let _data = this.state.video_data || {};
    if (JSON.stringify(_data) == "{}") {
      if (!res.video_len) {
        let _time = res.video_time.split(":");
        res.video_len =
          parseInt(_time[0]) * 3600 +
          parseInt(_time[1]) * 60 +
          parseInt(_time[2]);
      }
      _data = res;
    } else {
      if (res.subtitling) {
        //生成字幕
        _data.sub_josn = res.subtitling;
      }
    }
    this.setState({
      video_data: _data,
    });

    sessionStorage.setItem("file_data", JSON.stringify(_data));
    if (this.video_live) {
      this.video_live.load();
    }

    return;
    // if (res.subtitling) {
    //   _data.sub_josn = res.subtitling;
    //   _data._path = res.video_path;
    // } else {
    //   _data._path = res.video_path;
    //   _data.video_id = res._id || res.video_id;
    //   _data.image_path = res.image_path;
    // }
    // if (_data.video_data) {
    //   delete _data.video_data;
    // }

    // if (!_data.video_len && res.video_time) {
    //   if (typeof res.video_time == "string") {
    //     let _time = res.video_time.split(":");
    //     _data.video_len =
    //       parseInt(_time[0]) * 3600 +
    //       parseInt(_time[1]) * 60 +
    //       parseInt(_time[2]);
    //   } else {
    //     _data.video_len = res.video_time;
    //   }
    // }
    // this.setState({
    //   video_data: _data,
    // });
    // sessionStorage.setItem("file_data", JSON.stringify(_data));
    // this.video_live.load();
    // this.video_live.play();
  }
  // parent_styles(res) {
  //   //获取样式 writing-mode: vertical-rl; writing-mode: tb-lr;

  //   this.setState({ style: res });
  //   let _styles = this.state.styles || {};
  //   let align,
  //     textAlignLast,
  //     bold,
  //     u,
  //     i,
  //     family,
  //     size,
  //     vertical,
  //     spacing,
  //     line,
  //     color;
  //   if (res.align === 0) {
  //     (align = "inherit"), (textAlignLast = "inherit");
  //   } else if (res.align === 1) {
  //     align = "right";
  //   } else if (res.align === 2) {
  //     align = "center";
  //   } else if (res.align === 3) {
  //     align = "left";
  //   } else if (res.align === 4) {
  //     align = "justify";
  //     textAlignLast = "justify";
  //   }
  //   if (res.bold === -1) {
  //     bold = "bold";
  //   } else {
  //     bold = "normal";
  //   }
  //   if (res._u === -1) {
  //     u = "underline";
  //   } else {
  //     u = "none";
  //   }
  //   if (res._i === -1) {
  //     i = "italic";
  //   } else {
  //     i = "normal";
  //   }
  //   if (res.family) {
  //     family = res.family;
  //   } else {
  //     family = "inherit";
  //   }
  //   if (!res.size || res.size < 12) {
  //     size = "inherit";
  //   } else {
  //     size = res.size + "px";
  //   }
  //   if (res.spacing) {
  //     spacing = res.spacing + "px";
  //   } else {
  //     spacing = "normal";
  //   }
  //   if (res.line) {
  //     line = res.line + "px";
  //   } else {
  //     line = "normal";
  //   }
  //   if (res.vertical == 2) {
  //     // writing-mode: vertical-rl; writing-mode: tb-lr;
  //     vertical = "vertical-rl";
  //     // vertical1='tb-lr'
  //   } else if (res.vertical == 1) {
  //     vertical = "vertical-lr";
  //   } else {
  //     vertical = "horizontal-tb";
  //     // vertical1='horizontal-tb'
  //   }
  //   if (res.color) {
  //     color = "#" + res.color;
  //   } else {
  //     color = "inherit";
  //   }
  //   this.setState({
  //     styles: {
  //       color: color,
  //       textAlign: align,
  //       textAlignLast: textAlignLast,
  //       fontWeight: bold,
  //       textDecoration: u,
  //       fontStyle: i,
  //       fontSize: size,
  //       fontFamily: family,
  //       writingMode: vertical,
  //       lineHeight: line,
  //       letterSpacing: spacing,
  //     },
  //   });
  // }
  show_edit() {
    //展示编辑区域
    if (!this.state.is_edit) {
      this.setState({
        is_edit: true,
      });
    }
  }
  get_image(res) {
    //图片集

    let _data = JSON.parse(JSON.stringify(this.state.video_data));
    let total_time = _data.video_len;
    _data.imageArr = res;

    // let _obj = getObj("image-box");

    let len = res.length;
    let img_str = "";
    let img_pos = "";
    let box_w = this.state.sliderbox_width / len; // 每张图的宽度，
    // let img_w = box_w / (total_time - 0.7);
    for (let i = 0; i < len - 2; i++) {
      if (i == len - 3) {
        (img_str += "url(" + res[i + 2] + ") "),
          (img_pos += i * box_w + "px " + "0px ");
      } else {
        (img_str += "url(" + res[i + 2] + "), "),
          (img_pos += i * box_w + "px " + "0px, ");
      }
    }

    _data.img_pos = img_pos;
    _data.bg_str = img_str;
    _data.bg_w = box_w;
    this.setState({
      the_current: {
        video_len: total_time,
        // time: this.video_live.currentTime || 0,
      },
      video_img_arr: res,
      video_data: _data,
    });
    sessionStorage.setItem("file_data", JSON.stringify(_data));
  }
  getChildrenMsg(result, msg) {
    //时间轴滑块子件传参滑块位置过来，并且更新字幕
    if (JSON.stringify(this.state.video_data) == "{}") {
      return;
    }
    this.video_live.currentTime = msg;
    this.sub_test(msg);
    return;
  }
  // get_top_inx(result, value) {
  //   this.setState({
  //     top_inx: value,
  //   });
  // }

  sub_test(time) {
    //更新字幕

    let _data = this.state.the_current || {};
    if (_data.video_len != this.state.video_data.video_len) {
      _data.video_len = this.state.video_data.video_len;
    }
    _data.time = time;

    if (this.state.video_data.sub_josn) {
      //去掉了&&time>0
      let json_sub = this.state.video_data.sub_josn;

      for (let i = 0; i < json_sub.length; i++) {
        if (time >= json_sub[i].bg && time <= json_sub[i].ed) {
          if (i == _data.inx) {
            this.setState({
              the_current: _data,
            });
            return;
          }
          _data.zh = json_sub[i].cn_sub;
          _data.en = json_sub[i].en_sub;
          _data.time = time;
          _data.inx = i;
          _data.start_time = json_sub[i].bg;
          _data.end_time = json_sub[i].ed;
        } else if (json_sub[i + 1]) {
          if (time > json_sub[i].ed && time < json_sub[i + 1].bg) {
            _data.zh = "";
            _data.en = "";
            _data.time = time;
            _data.inx = i;
            _data.start_time = json_sub[i].bg;
            _data.end_time = json_sub[i].ed;
          }
        } else {
          if (time > json_sub[i].ed) {
            _data.zh = "";
            _data.en = "";
            _data.time = time;
            _data.inx = i;
            _data.start_time = json_sub[i].bg;
            _data.end_time = json_sub[i].ed;
          }
        }
      }
    }

    this.setState({
      the_current: _data,
    });
  }
  now_play(ev) {
    //播放当前段
    if (this.state.is_play_now) {
      this.setState({
        is_play_now: false,
      });
      return;
    }
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

    this.setState({
      the_current: _the_data,
      video_data: _video_data,
    });
    sessionStorage.setItem("file_data", JSON.stringify(_video_data));
  }
  render() {
    const _this = this;
    const { video_data, depth_of_field } = this.state;
    const on_ply = function() {
      //播放

      if (!_this.state.video_data.video_path) {
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

      _data.time = time;
      if (_this.state.is_play_now) {
        //循环播放
        if (time >= _this.state.the_current.end_time) {
          _this.video_live.currentTime = _this.state.the_current.start_time;
          _data.time = _this.state.the_current.start_time;
          on_end();
          _this.setState({
            status: false,
          });
          setTimeout(() => {
            _this.video_live.play();
            _this.setState({
              status: true,
            });
          }, 1500);
        } else {
          _data.time = time;
        }
        _this.setState({
          the_current: _data,
        });
        return;
      }

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
        <main
          className={`${styles.elMain} ${styles.top}`}
          style={{
            height: this.state.video_h + 140 + "px",
            minHeight: this.state.video_h + 140 + "px",
          }}
        >
          <section className={styles.elContainer}>
            {/** <aside className={styles.elAside}>
              <TopAside parent={this} />
            </aside>
             */}
            <main className={styles.elMain}>
              <div>
                <Uploder parent={this} />
              </div>
              <div>
                <section>
                  <div
                    className={styles.video}
                    id="myvideo"
                    style={{
                      width: this.state.video_w + "px",
                      height: this.state.video_h + "px",
                    }}
                  >
                    {depth_of_field ? (
                      <main>
                        <div className="all-width all-height">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <div></div>
                      </main>
                    ) : (
                      <i></i>
                    )}

                    <video
                      height={this.state.video_h}
                      ref={(node) => (this.video_live = node)}
                      onTimeUpdate={time_date}
                      onEnded={on_end}
                    >
                      {video_data.video_path && (
                        <source src={video_data.video_path}></source>
                      )}
                    </video>
                    {_this.state.the_current.zh ? (
                      <div
                        className={`${styles.videoTest} ${styles.subtitles}`}
                        style={_this.state.styles}
                      >
                        {_this.state.the_current.zh && (
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
                            {_this.state.the_current.zh}
                          </span>
                        )}
                        <p></p>
                        {_this.state.the_current.en && (
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
                            {_this.state.the_current.en}
                          </span>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div style={{ height: 20, backgroundColor: "#565663" }}></div>
                  <main className="box box-align-center box-between fn-size-14">
                    <div className="play-time">
                      <span className="fn-color-F2F2F5">
                        {_this.state.the_current
                          ? dateConversion(_this.state.the_current.time)
                          : 0}
                      </span>
                      <span className="fn-color-878791">
                        /
                        {_this.state.video_data
                          ? dateConversion(
                              _this.state.video_data.video_len || 0
                            )
                          : 0}
                      </span>
                    </div>
                    <div className="paly-on-off">
                      {this.state.status ? (
                        <Pause onClick={on_pause} />
                      ) : (
                        <PlayArrow onClick={on_ply} />
                      )}
                    </div>

                    <div>
                      {!depth_of_field ? (
                        <img
                          src={videoImg}
                          onClick={() => {
                            this.setState({
                              depth_of_field: !depth_of_field,
                            });
                          }}
                        />
                      ) : (
                        <img
                          src={videoImg2}
                          onClick={() => {
                            this.setState({
                              depth_of_field: !depth_of_field,
                            });
                          }}
                        />
                      )}
                    </div>
                  </main>

                  {/**   <p
                      className="all-width"
                      id="video-bottom-slider"
                      style={{
                        height: 5,
                        backgroundColor: "#ccc",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          backgroundColor: "red",
                          // width:12,
                          height: 5,
                          transition: "all 0.3s",
                          width:
                            this.state.video_bottom_slider - 10 < 0
                              ? 0 + "px"
                              : this.state.video_bottom_slider - 10 + "px",
                        }}
                      ></span>
                      <span
                        id="video-bottom-slider-block"
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "green",
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                          transition: "all 0.3s",
                          left: this.state.video_bottom_slider - 10 + "px",
                        }}
                        onMouseDown={(ev) => {
                          ev.stopPropagation();
                          ev.preventDefault();
                          console.log(ev);
                          document.onmousemove = (e) => {
                            console.log(getPage(e).offsetLeft);
                            e.stopPropagation();
                            e.preventDefault();
                          };
                          document.onmouseup = (evt) => {
                            document.onmousemove = null;
                          };
                        }}
                      ></span>
                    </p>
                 */}
                </section>
              </div>
            </main>
          </section>
        </main>

        <footer
          className={`${styles.elFooter} ${styles.bottom}`}
          style={{
            height: "calc(100% - " + (this.state.video_h + 220) + "px)",
          }}
        >
          <section className={styles.elContainer}>
            <aside className={styles.elAside}>
              <BottomAside
                parent={this}
                onEvent={(ev) => {
                  
                  this.setState({
                    lang:parseInt( ev)
                  })
                }}
              />
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
                      if (!this.state.is_edit) {
                        return;
                      }
                      let _w =
                        getWidth("edit-region", "sliderbox", "thumbbox") *
                        this.state.scaleX;
                      getObj("thumb").style.width = _w + "px";
                      let x = getObj("edit-region").clientWidth / 2;
                      if (
                        this.state.sliderbox_width !=
                        getObj("sliderbox").clientWidth
                      ) {
                        this.setState({
                          sliderbox_width: getObj("mark").clientWidth,
                        });
                      }

                      let sliderbox_x = this.state.sliderbox_off_x; //当前的偏移量
                      if (
                        sliderbox_x !=
                        Math.abs(getStyles("sliderbox", "transform"))
                      ) {
                        sliderbox_x = Math.abs(
                          getStyles("sliderbox", "transform")
                        );
                      }
                      if (sliderbox_x - x <= 0) {
                        sliderbox_x = 0;
                      } else {
                        sliderbox_x = sliderbox_x - x;
                      }
                      let thumb_x =
                        (sliderbox_x * this.state.thumbbox_width) /
                        this.state.sliderbox_width;

                      this.setState({
                        sliderbox_off_x: Math.abs(sliderbox_x),
                        thumb_off_x: thumb_x,
                      });
                    }}
                  ></div>
                  <div
                    className={`${styles.btn} ${styles.btnNext}`}
                    onClick={(ev) => {
                      if (!this.state.is_edit) {
                        return;
                      }
                      let _w =
                        getWidth("edit-region", "sliderbox", "thumbbox") *
                        this.state.scaleX;

                      getObj("thumb").style.width = _w + "px";

                      // edit-region, sliderbox,thumbbox,thumb
                      if (
                        this.state.sliderbox_width !=
                        getObj("sliderbox").clientWidth
                      ) {
                        this.setState({
                          sliderbox_width: getObj("sliderbox").clientWidth,
                        });
                      }

                      let x = getObj("edit-region").clientWidth / 2;
                      let sliderbox_x = this.state.sliderbox_off_x; // getStyles("sliderbox", "transform");

                      if (
                        sliderbox_x !=
                        Math.abs(getStyles("sliderbox", "transform"))
                      ) {
                        sliderbox_x = Math.abs(
                          getStyles("sliderbox", "transform")
                        );
                      }

                      if (
                        sliderbox_x + x >
                        this.state.sliderbox_width - 2 * x
                      ) {
                        sliderbox_x = 0 - (this.state.sliderbox_width - 2 * x);
                      } else {
                        sliderbox_x = sliderbox_x + x;
                      }

                      let thumb_x =
                        (sliderbox_x * this.state.thumbbox_width) /
                        this.state.sliderbox_width;

                      this.setState({
                        sliderbox_off_x: Math.abs(sliderbox_x),
                        thumb_off_x: thumb_x,
                      });
                    }}
                  ></div>

                  <section
                    style={{
                      height: "100%",
                      position: "absolute",

                      width: this.state.sliderbox_width + "px",
                      transform:
                        "translate(-" + this.state.sliderbox_off_x + "px)",
                    }}
                    id="sliderbox"
                    className="view-overflow"
                  >
                    <div className={`${styles.slider} ${styles.clearfix}`}>
                      <SliderTemplate
                        value={this.state.the_current.time || 0}
                        parent={this}
                        length={
                          (this.state.video_data &&
                            this.state.video_data.video_len) ||
                          100
                        }
                      />
                    </div>

                    {/*要判断*/}
                    <div
                      style={{ height: "calc(100% - 40px)", overflowY: "auto" }}
                    >
                      {!this.state.is_edit ? (
                        <div
                          style={{
                            height: "100%",
                            width: _this.state.t_w - 132 + "px",
                          }}
                          className={styles.transition}
                          onDrop={(event) => {
                            event.preventDefault();
                            if (event.dataTransfer.files[0]) {
                              return;
                            }
                            this.show_edit();
                          }}
                          onDragOver={(ev) => {
                            event.preventDefault();
                          }}
                        ></div>
                      ) : (
                        ""
                      )}
                      {/*展示图片，字幕*/}
                      {this.state.is_edit && (
                        <div>
                          <div
                            className={styles.videoImage}
                            id="image-box"
                            style={{
                              backgroundImage: this.state.video_data.bg_str
                                ? this.state.video_data.bg_str
                                : "",
                              backgroundPosition: this.state.video_data.img_pos
                                ? this.state.video_data.img_pos
                                : "",
                              backgroundSize: this.state.video_data.bg_w
                                ? this.state.video_data.bg_w + "px 100%"
                                : "",
                            }}
                          >
                            {/* onMouseOver={(e) => {
                              let _obj = getObj("new-menu");
                              _obj.style.display = "block";
                              let x =
                                getPage(e).pageX -
                                getStyles("sliderbox", "transform") -
                                132 -
                                20;
                              _obj.style.transform = "translateX(" + x + "px)";
                            }}
                            onMouseOut={() => {
                              getObj("new-menu").style.display = "none";
                            }}
                          
                          * <div id="new-menu" className={styles.newMenu}>
                              <NewMenu parent={this} />
                            </div>*/}
                          </div>
                          <div className={styles.videoImg} id="video-test">
                            {video_data.sub_josn ? (
                              _this.cueing(video_data.sub_josn)
                            ) : (
                              <p style={{ paddingLeft: 20, color: "#9E9EA6" }}>
                                {" "}
                                语音智能识别提取字幕
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </main>

                {this.state.is_edit && (
                  <footer
                    className={styles.elFooter}
                    style={{ height: "14px" }}
                  >
                    <div className={styles.bottomRight}>
                      <div className={styles.scroller} id="thumbbox">
                        <div
                          className={styles.scrollThumb}
                          id="thumb"
                          style={{
                            transform:
                              "translate(" + this.state.thumb_off_x + "px)",
                          }}
                          onMouseDown={(evt) => {
                            evt.stopPropagation();
                            evt.preventDefault();
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
                              e.stopPropagation();
                              e.preventDefault();
                              let barX = getPage(e).pageX - x;

                              barX = barX < 0 ? 0 : barX;
                              barX =
                                barX >
                                getObj("thumbbox").clientWidth - obj.clientWidth
                                  ? getObj("thumbbox").clientWidth -
                                    obj.clientWidth
                                  : barX;

                              obj.style.transform =
                                "translateX(" + barX + "px)";

                              // let contentMax =
                              //   getObj("sliderbox").scrollWidth -
                              //   getObj("edit-region").clientWidth;
                              let contentMax =
                                getObj("sliderbox").clientWidth -
                                getObj("edit-region").clientWidth;

                              let barMax =
                                getObj("thumbbox").clientWidth -
                                obj.clientWidth;

                              let contentX = (barX / barMax) * contentMax;
                              getObj("sliderbox").style.transform =
                                "translateX(-" + contentX + "px)";
                            };
                            document.onmouseup = function(ev) {
                              ev.stopPropagation();
                              ev.preventDefault();
                              document.onmousemove = null;
                            };
                          }}
                        ></div>
                      </div>
                    </div>
                  </footer>
                )}
              </section>
            </main>
          </section>
        </footer>
      </div>
    );
  }
}
