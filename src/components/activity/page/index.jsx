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

    this.winsize = this.winsize.bind(this);
  }
  componentDidMount() {
    // this.winsize();
    settings_html();
    // window.onresize = () => {
    //   // this.winsize();
    //   settings_html();
    // };
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
          <NavTar />
          <div>{children}</div>
        </div>
      </Layout>
    );
  }
}
