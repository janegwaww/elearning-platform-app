import React, { Component } from "react";
import UpFile from "./UpFile/UpFile";

export default class VideoChilden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inx: props.topInx
    };
  }
  returnComponets(num) {
    if (num === 1) {
      return <UpFile />;
    } else if (num === 2) {
      return <div>文本test</div>;
    } else if (num === 3) {
      return <div>剪辑</div>;
    } else if (num === 4) {
      return <div>音频</div>;
    } else if (num === 5) {
      return <div>特效</div>;
    } else if (num === 6) {
      return <div>画板</div>;
    } else {
      return <div>滤镜</div>;
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      inx: nextProps.topInx
    });
    return true;
  }
  render() {
    return this.returnComponets(this.state.inx);
  }
}
