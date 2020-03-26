import React, { Component } from "react";
import "./TopAside.css";

export default class TopAside extends Component {
  constructor(props){
    super(props);
    this.state={
      inx:1
    };
    this.btn_click = this.btn_click.bind(this);//绑定事件
  }
  shouldComponentUpdate(nextProps, nextState){
    //     // console.log(nextProps,nextState);
        return true;
    }
  btn_click(el){//点击切换组件
    this.setState({
      inx:parseInt(el.target.dataset.inx)
    })
    this.props.parent.get_top_inx(this,parseInt(el.target.dataset.inx))
  }
  shouldComponentUpdate(nextProps, nextState){
        return true;
    }
  render() {
    return (
      <ul className='top-aside'>
        <li data-inx ='1' className={this.state.inx==1?"active":''} onClick={this.btn_click}>媒体</li>
        <li data-inx ='2' className={this.state.inx==2?"active":''} onClick={this.btn_click}>文本</li>
        <li data-inx ='3' className={this.state.inx==3?"active":''}  onClick={this.btn_click}>剪辑</li>
        <li data-inx ='4' className={this.state.inx==4?"active":''} onClick={this.btn_click}>音频</li>
        <li data-inx ='5' className={this.state.inx==5?"active":''} onClick={this.btn_click}>特效</li>
        <li data-inx ='6' className={this.state.inx==6?"active":''} onClick={this.btn_click}>画面</li>
        <li data-inx ='7' className={this.state.inx==7?"active":''} onClick={this.btn_click}>滤镜</li>
      </ul>
    );
  }
}
