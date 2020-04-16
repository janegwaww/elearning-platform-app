import React, { Component } from "react";
import TestFile from "./TestFile/TestFile";
import Uploader from './Uploader/Uploader';
import TextTemplate from './TextTemplate/TextTemplate';

export default class VideoChilden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inx: props.topInx
    };
    this.get_url= this.get_url.bind(this);
    this.get_style=this.get_style.bind(this);
  }
  get_url(res){
    this.props.parent.getUpfileUrl(res)
  }
  get_style(res){
    this.props.parent.parent_styles(res)
  }
  returnComponets(num) {
    if (num === 1) {
      return   <Uploader parent={this} /> 
    } else if (num === 2) {
      return <TestFile parent={this} />
    } else if (num === 3) {
      return <TextTemplate />;
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
