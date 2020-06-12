import React, { Component } from "react";
import { MovieCreation, TextFields } from "@material-ui/icons";
import styles from "./TopAside.module.css";
// 此组件没有使用
export default class TopAside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inx: 1,
    };
    this.btn_click = this.btn_click.bind(this); //绑定事件
  }
  
  shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps,nextState);
    return true;
  }
  btn_click(el) {
    //点击切换组件
    this.setState({
      inx: parseInt(el.target.dataset.inx),
    });
    // 暂时不用文字编辑，屏蔽
    // this.props.parent.get_top_inx(this, parseInt(el.target.dataset.inx));
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    return (
      <ul className={styles.topAside}>
        <li
          data-inx="1"
          className={this.state.inx === 1 ? styles.active : ""}
        >
          <MovieCreation />
          <br />
          媒体
          <div data-inx="1" onClick={this.btn_click}></div>
        </li>
        {/** 
        <li
          data-inx="3"
          className={this.state.inx === 3 ? styles.active : ""}
          onClick={this.btn_click}
        >
          <TextFields />
          <br />
          文本
          <div data-inx="3" onClick={this.btn_click}></div>
        </li>
        */}
      </ul>
    );
  }
}
