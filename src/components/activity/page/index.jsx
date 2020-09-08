import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Bananer from "../comments/Banner";
import NavTar from "../comments/NavTar";
import "../../../assets/activity/css/activity.css";
import { settings_html } from "../../../assets/js/totls";
import Bgimg from "../../../assets/activity/img/bg.png";
export default class PageIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page_inx: 1,
    };
    this.winsize = this.winsize.bind(this);
  }

  componentDidMount() {
    let _router = this.props["*"];
    let _inx = 1;

    if (_router === "activitydetail") {
      _inx = 3;
    } else if (_router == "activityallworks") {
      _inx = 4;
    } else if (_router == "activityabout") {
      _inx = 2;
    }
    this.setState({
      page_inx: _inx,
    });
   
   
  }
  componentWillUnmount() {
    window.onresize = null;
    document.querySelector("html").style.fontSize = "medium";
  }
  winsize() {
    let w = document.documentElement.clientWidth;

    let size = (48 / 1920) * w;
    document.querySelector("html").style.fontSize = size + "px";
  }
  render() {
    const { children } = this.props;
    const {page_inx}=this.state;
  
    return (
      <Layout>
        <div
          style={{
            backgroundImage: `url(${Bgimg})`,
            backgroundRepeat: "no-repeat",
          }}
          className="activity"
        >
          <Bananer />

          <NavTar
            inx={page_inx}
            rou={this.props["*"] || "/"}
            onEvent={id=>{
              
              this.setState({
                page_inx:id
              })
            }}
          />

          <div>{children}</div>
        </div>
      </Layout>
    );
  }
}
