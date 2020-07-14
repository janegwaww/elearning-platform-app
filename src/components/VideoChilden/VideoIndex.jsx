import React, { Component } from "react";

import { PlayArrow, Pause } from "@material-ui/icons";

import { getObj, getPage, getWidth, getStyles } from "../../assets/js/totls";

import SliderTemplate from "./SliderTemplate/SliderTemplate";
import HeaderTemplate from "./Header/Header";

import BottomAside from "./BottomAside/BottomAside";

import "./SliderTemplate/SliderTemplate.css";
import styles from "../../assets/css/video.module.css";

import dateConversion from "../../assets/js/dateConversion";
import Uploder from "./Uploader/Uploader";
import videoImg from "../../assets/img/videowindows.svg";
import videoImg2 from "../../assets/img/videowindows2.svg";
import SearchLoading from "../Loading/SearchLoading";
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
      is_now_edit: false, //是否正在编辑字幕
      lang: 2, //1 中文，2中英文，3英文

      the_current: {}, //当前字幕
      status: false, //播放状态
      is_del: false, //是否删除除方步文件
      is_select: false, //是否选中视频文件

      test_arr: null,

      is_play_now: false,

      sliderbox_width: 0,
      sliderbox_off_x: 0,
      thumbbox_width: 0,
      thumb_off_x: 0,
      login_status: false,
    };
    this.video_live = null;
    //绑定双击事件
    this.getChildrenMsg = this.getChildrenMsg.bind(this);

    this.getUpfileUrl = this.getUpfileUrl.bind(this);

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
    let t_h = document.body.clientHeight;
    if (t_w < 1000) {
      t_w = 1000;
    }

    // let scale = 880 / 1920;
    // let num = t_w * scale;
    let scale = 370 / 1080;
    let num = t_h * scale;
    let num_w = (num / 9) * 16;
    // if(num>580){
    //   num=580
    // }
    // let num_h = (num / 16) * 9;

    getObj("max-box").style.height =
      document.documentElement.offsetHeight + "px";

    this.setState({
      // video_w: num,
      // video_h: num_h,
      video_w: num_w,
      video_h: num,
      t_w: t_w,
    });
  }

  componentDidMount() {
    let _this = this;
    _this.video_w_h();

    window.onresize = (evnt) => {
      _this.video_w_h();
    };

    document.onkeydown = (ev) => {
      // console.log(ev.keyCode,this.state.is_now_edit);
      if (this.video_live && JSON.stringify(this.state.video_data) != "{}") {
        let _time = this.video_live.currentTime;
        // console.log(_time)
        if (ev.keyCode === 35) {
          this.video_live.currentTime = this.state.video_data.video_len;
          this.setState({
            sliderbox_off_x:
              this.state.sliderbox_width - (this.state.t_w - 132),
          });
          // this.sub_test(this.state.video_data.video_len);
          return;
        }
        if (ev.keyCode === 36) {
          this.video_live.currentTime = 0;
          this.setState({
            sliderbox_off_x: 0,
          });
          // this.sub_test(0);
          return;
        }
        if (!this.state.is_now_edit) {
          if (ev.keyCode == 37) {
            _time = _time - 1;
            if (_time <= 0) {
              _time = 0;
            }
            this.video_live.currentTime = _time - 1;
            this.video_live.pause();
          }
          if (ev.keyCode === 39) {
            _time = _time + 1;
            if (_time >= this.state.video_data.video_len) {
              _time = this.state.video_data.video_len;
            }

            this.video_live.currentTime = _time;
            this.video_live.pause();
          }
        }
        if ((ev.keyCode == 46 || ev.keyCode == 8) && this.state.is_select) {
          this.setState({
            is_del: true,
          });
        }
      }

      if (ev.keyCode === 32) {
        if (this.state.is_now_edit) {
          return;
        }
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
      let sub_l = 0;
      if (i == 0) {
        sub_l = json_sub[i].bg / (total_time / total_w);
      } else {
        sub_l = (json_sub[i].bg - json_sub[i - 1].ed) / (total_time / total_w);
      }
      //json_sub[i].bg / (total_time / total_w);

      test_arr.push(
        <div
          key={i}
          style={{
            width: sub_w + "px",
            // transform: "translateX(" + sub_l + "px)",
            marginLeft: sub_l + "px",
          }}
          className="test-nodes"
        >
          {this.state.lang === 1 || this.state.lang === 2 ? (
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
          ) : (
            ""
          )}
          {this.state.lang === 3 || this.state.lang === 2 ? (
            <div
              className={this.state.the_current.inx == i ? "active" : ""}
              style={{ marginTop: 20 }}
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
          ) : (
            ""
          )}
          <div
            data-inx={i}
            style={{
              display: this.state.the_current.inx === i ? "block" : "none",
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
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
      if (!res.video_len && res.video_time) {
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
        if (res.subtitling[0].en_sub) {
          this.setState({
            lang: 2,
          });
        } else {
          this.setState({
            lang: 1,
          });
        }
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
  }

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
    // let new_img = res.splice(2);

    let img_str = "";
    let img_pos = "";
   

    let new_img = [];
    for (let j = 0; j < res.length; j++) {
      if (j % 3 == 0) {
        new_img.push(res[j + 2]);
      }
    }
    if (res.length % 3 > 0) {
      new_img.push(res[res.length - 1]);
    }

    let len = new_img.length;
    let box_w = this.state.sliderbox_width / len;
    for (let i = 0; i < len; i++) {
      //全部插入

      if (i == len - 1) {
        (img_str += "url(" + new_img[i] + ") "),
          (img_pos += i * box_w + "px " + "0px ");
      } else {
        (img_str += "url(" + new_img[i] + "), "),
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
      video_img_arr: new_img,
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
 

  sub_test(time) {
    //更新字幕

    let _data = {};
    if (_data.video_len != this.state.video_data.video_len) {
      _data.video_len = this.state.video_data.video_len;
    }
    _data.time = time;
    if (this.state.video_data.sub_josn) {
      let json_sub = this.state.video_data.sub_josn;
      let new_data = json_sub.filter((option, inx) => {
        if (time >= option.bg && time < option.ed) {
          option.inx = inx;
          return option;
        }
      });

      if (new_data[0]) {
        _data.zh = new_data[0].cn_sub;
        _data.en = new_data[0].en_sub;
        _data.time = time;
        _data.inx = new_data[0].inx;
        _data.start_time = new_data[0].bg;
        _data.end_time = new_data[0].ed;
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
    let _data = this.state.the_current || {};
    // _data.inx =parseInt( el.target.dataset.inx);
    _data.time =
      this.state.video_data.sub_josn[el.target.dataset.inx].bg + 0.01;
    this.setState({
      // top_inx: 2,// 暂时不用文字编辑，屏蔽
      status: false,
      is_play_now: false,
      the_current: _data,
      is_now_edit: true,
    });

    this.video_live.pause();
    this.video_live.currentTime =
      this.state.video_data.sub_josn[el.target.dataset.inx].bg + 0.01;
    //计算偏移
    let now_x =
      this.state.video_data.sub_josn[el.target.dataset.inx].bg /
      (this.state.video_data.video_len / this.state.sliderbox_width);
    let now_off = this.state.sliderbox_off_x;
    let cran_moiti = (this.state.t_w - 132) / 2;

    if (now_x > now_off + cran_moiti) {
      if (
        now_off + (now_x - now_off - cran_moiti) >
        this.state.sliderbox_width - (this.state.t_w - 132)
      ) {
        this.setState({
          sliderbox_off_x: this.state.sliderbox_width - (this.state.t_w - 132),
        });
      } else {
        this.setState({
          sliderbox_off_x: now_off + (now_x - now_off - cran_moiti),
        });
      }
    }
    if (now_x < now_off + cran_moiti) {
      if (now_off - (now_off + cran_moiti - now_x) < 0) {
        this.setState({
          sliderbox_off_x: 0,
        });
      } else {
        this.setState({
          sliderbox_off_x: now_off - (now_off + cran_moiti - now_x),
        });
      }
    }
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
    //  _the_data = this.state.the_current, //当前，
    let _video_data = this.state.video_data, //所有
      _data = el.target.dataset;

    if (_data.lu == "zh") {
      _video_data.sub_josn[_data.inx].cn_sub = el.target.innerText.toString();
    } else {
      _video_data.sub_josn[_data.inx].en_sub = el.target.innerText.toString();
    }

    this.setState({
      video_data: _video_data,
      is_now_edit: false,
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

      // console.log(_this.state.is_play_now);
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
   
      if (!_this.video_live.paused) {
        let now_x =
          time /
          (_this.state.video_data.video_len / _this.state.sliderbox_width);
        let now_off = _this.state.sliderbox_off_x;
        let cran_moiti = (_this.state.t_w - 132) / 2;
        if (now_x > now_off + _this.state.t_w - 132 - 200) {
          if (
            _this.state.sliderbox_width - (_this.state.t_w - 132) <
            now_off + cran_moiti
          ) {
            _this.setState({
              sliderbox_off_x:
                _this.state.sliderbox_width - (_this.state.t_w - 132),
            });
          } else {
            _this.setState({
              sliderbox_off_x: now_off + cran_moiti,
            });
          }
        }
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
        <main className={`${styles.elMain} ${styles.top}`}>
          <section className={styles.elContainer}>
            {/** <aside className={styles.elAside}>
              <TopAside parent={this} />
            </aside>
             */}
            <main className={styles.elMain}>
              <div>
                <Uploder parent={this} is_del={this.state.is_del} />
              </div>
              <div>
                <section>
                  {/**  
                    }}*/}
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
                        {_this.state.the_current.zh &&
                          (_this.state.lang == 1 || _this.state.lang == 2) && (
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
                        {_this.state.the_current.en &&
                          (_this.state.lang == 3 || _this.state.lang == 2) && (
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
                  {/**  <div style={{ height: 20, backgroundColor: "#565663" }}></div>*/}
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
                    <div
                      className="paly-on-off all-height"
                      style={{
                        cursor: "pointer",
                        width: this.state.video_w + "px",
                      }}
                    >
                      {this.state.status ? (
                        <Pause onClick={on_pause} />
                      ) : (
                        <PlayArrow onClick={on_ply} />
                      )}
                    </div>

                    <div style={{ cursor: "pointer" }}>
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
                </section>
              </div>
            </main>
          </section>
        </main>

        <footer
          className={`${styles.elFooter} ${styles.bottom}`}
          style={{
            height: "calc(100% - " + (this.state.video_h + 140) + "px)",
          }}
        >
          <section className={styles.elContainer}>
            <aside className={styles.elAside}>
              <BottomAside
                parent={this}
                lang={this.state.lang}
                onEvent={(ev) => {
                  this.setState({
                    lang: parseInt(ev),
                  });
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
                      style={{
                        height: "calc(100% - 40px)",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                      className="view-scroll"
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
                          ></div>
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

                            getObj("thumb").style.width =
                              getWidth("edit-region", "sliderbox", "thumbbox") *
                                this.state.scaleX +
                              "px";

                            let obj = evt.target;

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
        <SearchLoading loading={this.state.login_status} />
      </div>
    );
  }
}
