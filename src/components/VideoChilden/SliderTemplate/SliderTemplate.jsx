import React from "react";
import "./SliderTemplate.css";
import dateConversion from "../../../assets/js/dateConversion";
import { getPage, getStyles } from "../../../assets/js/totls";

class SliderTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      time: props.value,
      leng: props.length,
      total_w: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.length != this.state.leng || this.state.total_w <= 0) {
      //视频的时长不一样时触发

      let frames = Math.floor(nextProps.length / 3);

      let frames_num = Math.ceil(((nextProps.length % 3) / 3) * 10);
      let total_w = 110 * frames + frames_num * 11;

      this.setState({
        total_w: total_w,
        leng: nextProps.length,
      });
      nextProps.parent.setState({
        sliderbox_width: total_w,
      });
    }
    if (nextProps.value != this.state.time) {
      //当前播放时间不一样时

      let value = Math.ceil(
        nextProps.value / (nextProps.length / this.state.total_w)
      );
      if (value > this.state.total_w) {
        value = this.state.total_w;
      }
      this.setState({
        time: nextProps.value,
        value: value,
      });
    }
    return true;
  }

  render() {
    let _this = this;
    let lists = [];
    let lists_min = [];
    let leng = this.state.leng || 100;

    let frames = Math.floor(leng / 3);
    let frames_num = Math.ceil(((leng % 3) / 3) * 10);
    for (let i = 0; i < frames_num; i++) {
      lists_min.push(
        <div key={i} className="mm" data-inx={frames + 1 + "_" + (i + 1)}></div>
      );
    }
    for (let i = 0; i < frames; i++) {
      //3秒一格
      lists.push(
        <div className="scales" key={i}>
          <span>{dateConversion(i * 3)}</span>
          <div className="sub-scales" data-index={i}>
            <div className="mm" data-inx={i + "_1"}></div>
            <div className="mm" data-inx={i + "_2"}></div>
            <div className="mm" data-inx={i + "_3"}></div>
            <div className="mm" data-inx={i + "_4"}></div>
            <div className="mm" data-inx={i + "_5"}></div>
            <div className="mm" data-inx={i + "_6"}></div>
            <div className="mm" data-inx={i + "_7"}></div>
            <div className="mm" data-inx={i + "_8"}></div>
            <div className="mm" data-inx={i + "_9"}></div>
            <div className="mm" data-inx={i + "_10"}></div>
          </div>
        </div>
      );
    }

    lists.push(
      <div className="scales" key={frames}>
        <span>{dateConversion(frames * 3)}</span>
        <div
          className="sub-scales"
          data-index={frames + 1}
          style={{ justifyContent: "flex-start" }}
        >
          {lists_min}
        </div>
      </div>
    );

    return (
      <div className="mainedit v">
        <div
          className="mark box view-overflow"
          id="mark"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            let x = getPage(e).pageX - getStyles("pointer", "left");
            let total_x = this.state.total_w;

            // 页面的位置加页面偏移的位置就是移动的位置
            let barX =
              getPage(e).pageX - 132 - getStyles("sliderbox", "transform");
            barX = barX < 0 ? 0 : barX;
            barX = barX > total_x ? total_x : barX;
            this.props.parent.video_live.pause(); //拖动滑块时暂停播放
            this.props.parent.setState({
              status: false,
            });

            _this.props.parent.getChildrenMsg(_this, (leng / total_x) * barX);
          }}
        >
          {lists}
        </div>
        <div className="draggable">
          <div
            className="pointer"
            id="pointer"
            style={{ left: this.state.value + "px" }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();

              let x = getPage(e).pageX - getStyles("pointer", "left");

              let total_x = this.state.total_w;

              document.onmousemove = (ev) => {
                let barX = getPage(ev).pageX - x;
                barX = barX >= 0 ? barX : 0;
                barX = barX > total_x - 6 ? total_x - 6 : barX;

                this.props.parent.video_live.pause(); //拖动滑块时暂停播放
                this.props.parent.setState({
                  status: false,
                });
                _this.props.parent.getChildrenMsg(
                  _this,
                  (leng / total_x) * barX
                );
              };
              document.onmouseup = (ev) => {
                document.onmousemove = null;
              };
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default SliderTemplate;
