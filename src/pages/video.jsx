import React, { Component } from "react";
import SliderTemplate from "../components/VideoChilden/SliderTemplate/SliderTemplate";
import HeaderTemplate from "../components/VideoChilden/Header/Header";
import TopAside from "../components/VideoChilden/TopAside/TopAside";
import BottomAside from "../components/VideoChilden/BottomAside/BottomAside";
import VideoChilden from "../components/VideoChilden/VideoChilden";

import { Dialog, Button, DialogTitle, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";
import {
  SubdirectoryArrowLeft,
  SubdirectoryArrowRight,
  Image,
  SkipNext,
  SkipPrevious,
  PlayArrow,
  Pause,
} from "@material-ui/icons";
import styles from "../assets/css/video.module.css";
import getData from "../assets/js/request";
import dateConversion from "../assets/js/dateConversion";
import { func } from "prop-types";

const NewDialog = withStyles({
  paperWidthSm: {
    "max-width": "none",
  },
  paperScrollPaper: {
    display: "block",
    padding: "32px",
  },
})(Dialog);
const NewDialogTitle = withStyles({
  root: {
    padding: 0,
  },
})(DialogTitle);

export default class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video_data: {},
      the_current: {}, //当前字幕
      status: false, //播放状态
      edi_show: false, //是否调起修改当前字幕弹窗
      is_suc: "",
    };
    this.video_live = null;
    //绑定双击事件
    this.getChildrenMsg = this.getChildrenMsg.bind(this);
    this.get_top_inx = this.get_top_inx.bind(this);
    this.getUpfileUrl = this.getUpfileUrl.bind(this);
  }
  componentDidMount() {
    this.setState({
      video_h: document.getElementById("myvideo").clientHeight,
    });
    document.getElementById("max-box").style.height =
      document.getElementById("gatsby-focus-wrapper").clientHeight + "px";
    this.get_data();
    
  }

  componentWillReceiveProps(nextState) {
    return true;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  get_data() {
    //请求数据
    let video_data,
      _this = this;
    let _data = {
      model_action: "search",
      query_string: "",
      type: "global",
      video_ids: [],
    };
    getData("videos", _data, "post").then((res) => {
      video_data = res.result_data[0];
      let _data = {
        video_data: video_data,
        sub_josn: video_data.subtitling,
        _path: video_data.video_path["720P"],
      };

      _this.setState({
        video_data: _data,
      });
    });
  }
  getUpfileUrl(res) {
    //
    let _data = this.state.video_data || {};
    if (res.subtitling) {
      _data.sub_josn = res.subtitling;
      _data._path = res.video_path;
    } else {
      _data._path = res.video_path;
      _data.video_id = res._id || res.video_id;
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
  getChildrenMsg(result, msg) {
    //滑块子件传参滑块位置过来，并且更新字幕
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
    if (!this.state.video_data.sub_josn || time <= 0) {
      return;
    }
    let json_sub = this.state.video_data.sub_josn;

    let _data = {};
    for (let i = 0; i < json_sub.length; i++) {
      if (time >= json_sub[i].bg && time <= json_sub[i].ed) {
        _data = {
          zh: json_sub[i].cn_sub,
          en: json_sub[i].en_sub,
          time: time,
          inx: i,
        };
      }
      if (json_sub[i + 1]) {
        if (time > json_sub[i].ed && time < json_sub[i + 1].bg) {
          _data = { zh: "", en: "", time: time, inx: i };
        }
      } else {
        if (time > json_sub[i].ed) {
          _data = { zh: "", en: "", time: time, inx: i };
        }
      }
    }

    if (this.video_live.duration) {
      _data.video_len = this.video_live.duration;
    }
    this.setState({
      the_current: _data,
    });
  }
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
      console.log(el)
      let time = el.target.currentTime;
      _this.sub_test(time);
    };
    const on_end = function() {
      //播放结束
      on_pause();
    };
    const double_click = function(el) {
      // 双击修改字幕
      el.preventDefault();
      _this.setState({
        lu: el.target.dataset.lu, //修改语言
        sub_inx: parseFloat(el.target.dataset.inx), //修改条目
      });
      on_pause();
      handleOpen();
    };
    const handleClose = function() {
      //取消编辑

      _this.setState({
        edi_show: false,
      });
    };
    const handleOpen = function() {
      //打开编辑

      _this.setState({
        edi_show: true,
      });
    };
    const handleServer = function() {
      //保存编辑
      let _the_data = _this.state.the_current, //当前，
        _video_data = _this.state.video_data, //所有
        _lu = _this.state.lu,
        _inx = _this.state.sub_inx;

      let _v = document.querySelector("#newTest").value;
      if (_lu == "zh") {
        _the_data.zh = _v;
        _video_data.sub_josn[_inx].cn_sub = _v;
      } else {
        _the_data.en = _v;
        _video_data.sub_josn[_inx].en_sub = _v;
      }

      let r_data = {
        model_action: "update",
        extra_data: {
          subtitling: _video_data.sub_josn,
          task_id: _video_data.video_id || _video_data.video_data.video_id, // task_id,
          lang: "en",
        },
      };
      getData("video/subtitle", r_data, "post")
        .then((res) => {
          handleClose();
          _this.setState({
            the_current: _the_data,
            video_data: _video_data,
            is_suc: "suc",
          });
          setTimeout(() => {
            _this.setState({ is_suc: "" });
          }, 3000);
        })
        .catch((err) => {
          _this.setState({
            is_suc: "err",
          });
          setTimeout(() => {
            _this.setState({ is_suc: "" });
          }, 3000);
          handleClose();
        });
    };

    return (
      <div
        className={`${styles.elContainer} ${styles.isVertical} ${styles.maxBox}`}
        id="max-box"
      >
        <header className={styles.elHeader}>
          <HeaderTemplate />
        </header>
        <main className={`${styles.elMain} ${styles.top}`}>
          <section className={styles.elContainer}>
            <aside className={styles.elAside}>
              <TopAside parent={this} />
            </aside>
            <main className={styles.elMain}>
              <div>
                <div>
                  <div className={styles.navTabs}>
                    <p>新建视频</p>
                  </div>
                  
                    <VideoChilden
                      topInx={this.state.top_inx || 1}
                      parent={this}
                    />
                  
                </div>
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
                      <source
                        src={
                          "http://seeker.haetek.com:9191/" + video_data._path
                        }
                      ></source>
                    ) : (
                      ""
                    )}
                  </video>
                  {_this.state.the_current.zh ? (
                    <div className={`${styles.videoTest} ${styles.subtitles}`}>
                      <p>
                        <span
                          data-lu="zh"
                          onDoubleClick={double_click}
                          data-inx={_this.state.the_current.inx}
                        >
                          {_this.state.the_current
                            ? _this.state.the_current.zh
                            : ""}
                        </span>
                      </p>
                      <p>
                        <span
                          data-lu="en"
                          onDoubleClick={double_click}
                          data-inx={_this.state.the_current.inx}
                        >
                          {_this.state.the_current
                            ? _this.state.the_current.en
                            : ""}
                        </span>
                      </p>
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
        <div className={styles.slider}>
          <div className={styles.left}>
            <div>
              <SubdirectoryArrowLeft />
            </div>
            <div>
              <SubdirectoryArrowRight />
            </div>
          </div>
          <div className={styles.right}>
            <SliderTemplate
              value={this.state.the_current.time || 0}
              parent={this}
              length={
                this.state.the_current ? this.state.the_current.video_len : 0
              }
            />
          </div>
        </div>
        <footer className={`${styles.elFooter} ${styles.bottom}`}>
          <section className={styles.elContainer}>
            <aside className={styles.elAside}>
              <BottomAside />
            </aside>
            <main className={styles.elMain}>
              <div className={styles.videoImg}>图片</div>
              <div className={styles.videoImage}>
                <Image />
              </div>
              {_this.state.the_current.zh ? (
                <div className={styles.videoTest}>
                  <p>
                    <span
                      data-lu="zh"
                      onDoubleClick={double_click}
                      data-inx={_this.state.the_current.inx}
                    >
                      {_this.state.the_current
                        ? _this.state.the_current.zh
                        : ""}
                    </span>
                  </p>
                  <p>
                    <span
                      data-lu="en"
                      onDoubleClick={double_click}
                      data-inx={_this.state.the_current.inx}
                    >
                      {_this.state.the_current
                        ? _this.state.the_current.en
                        : ""}
                    </span>
                  </p>
                  <NewDialog onClose={handleClose} open={_this.state.edi_show}>
                    <NewDialogTitle>
                      编辑当前的{_this.state.lu == "zh" ? "中文" : "英文"}字幕
                    </NewDialogTitle>
                    <form action="">
                      <textarea
                        name="newTest"
                        id="newTest"
                        autofocus
                        defaultValue={
                          _this.state.lu == "zh"
                            ? _this.state.the_current.zh
                            : _this.state.the_current.en
                        }
                        cols="50"
                        rows="5"
                      ></textarea>
                    </form>
                    <Button variant="contained" onClick={handleClose}>
                      取消
                    </Button>
                    <Button
                      onClick={handleServer}
                      variant="contained"
                      color="primary"
                    >
                      保存
                    </Button>
                  </NewDialog>
                  <Snackbar
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    open={_this.state.is_suc ? true : false}
                    autoHideDuration={3000}
                    message={_this.state.is_suc}
                  >
                    <MuiAlert
                      severity={
                        _this.state.is_suc == "suc" ? "success" : "error"
                      }
                    >
                      {_this.state.is_suc == "suc" ? "修改成功" : "修改失败"}
                    </MuiAlert>
                  </Snackbar>
                </div>
              ) : (
                ""
              )}
            </main>
          </section>
        </footer>
      </div>
    );
  }
}
